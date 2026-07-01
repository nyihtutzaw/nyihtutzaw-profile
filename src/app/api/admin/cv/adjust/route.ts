import { buildKnowledgeBase } from '@/lib/chatKnowledge';

// Capable, low-cost model on OpenRouter for CV rewriting.
const MODEL = process.env.OPENROUTER_CV_MODEL || 'google/gemini-2.5-flash';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MAX_CV_LENGTH = 20000;
const MAX_INSTRUCTION_LENGTH = 1000;
const MAX_JOB_LENGTH = 8000;

function systemPrompt(addMissingSkills: boolean): string {
  const missingSkillsRule = addMissingSkills
    ? `
ADDING MISSING SKILLS (enabled for this request):
- The job description may list required skills, frameworks, tools, or platforms that are NOT in the CURRENT CV or KNOWLEDGE (e.g. Java, Spring Boot, Angular, Vue.js, Azure).
- You MAY add those job-required skills to the "Core Competencies" section so the CV matches the posting's keywords, placing each under the most fitting category line (or a suitable new one).
- List them as skills he works with. Prefer weaving them into existing category lines over creating obviously padded lists.
- This permission applies ONLY to the skills/competencies listing. You must STILL NOT invent employers, job titles, dates, degrees, quantified metrics, or fabricated project achievements/experience bullets.`
    : `
ADDING MISSING SKILLS (disabled for this request):
- If the job requires a skill he genuinely does not have, DO NOT invent it — emphasize the nearest transferable skill he does have instead.`;

  return `You are a professional CV/resume editor and career strategist working on the CV of Nyi Htut Zaw.

Your job: given the CURRENT CV (in Markdown), an optional TARGET JOB DESCRIPTION, and an optional INSTRUCTION, return a single updated version of the CV tailored to win that specific role.
${missingSkillsRule}

TAILORING TO A JOB DESCRIPTION (when one is provided):
- Read the job description and extract its key requirements: the target role title, seniority level, must-have skills, technologies, domains, and responsibilities.
- Reframe the headline title (the '##' line under the name) and the Professional Summary to align with the TARGET ROLE and seniority — e.g. for a "Senior Java Engineer" posting, position him as a senior backend/software engineer — but ONLY in ways his real experience and skills support. Never claim a title or seniority the facts don't back up; make the closest truthful framing instead.
- Surface and prioritize the skills and experience he ACTUALLY has (from the CURRENT CV or KNOWLEDGE) that match the job's requirements. Reorder Core Competencies and reorder/rewrite experience bullets so the most job-relevant items come first and use the job's terminology where truthful.
- For each required skill in the job description, look through the KNOWLEDGE for a matching or closely adjacent skill he genuinely has and bring it forward. For skills he does not have, follow the "ADDING MISSING SKILLS" policy above.
- Keep the CV honest and complete: do not delete his real core experience just because it is less relevant, but you may condense it.

GENERAL RULES:
- Base the CV on factual information present in the CURRENT CV or in the KNOWLEDGE below. Never invent employers, dates, degrees, quantified metrics, titles, seniority, or experience bullets that are not supported by these sources. (Adding job-required skills to the competencies list is governed solely by the "ADDING MISSING SKILLS" policy above.)
- If an INSTRUCTION is provided, apply it too (emphasize, reorder, condense, expand, reword) using the available facts. If it conflicts with the job description, the INSTRUCTION wins.
- Preserve the Markdown structure: '#' for the name, '##' for section headings, '###' for job/degree titles, '- ' for bullet points, and '**Label:**' lead-in lines. Keep it ATS-friendly.
- Output ONLY the full updated CV in Markdown. No preamble, no explanations, no code fences.

=== KNOWLEDGE ABOUT NYI HTUT ZAW ===
${buildKnowledgeBase()}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'AI adjustment is not configured. Set OPENROUTER_API_KEY.' },
      { status: 503 }
    );
  }

  let body: {
    instruction?: string;
    cv?: string;
    jobDescription?: string;
    addMissingSkills?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const instruction = (body.instruction || '').trim().slice(0, MAX_INSTRUCTION_LENGTH);
  const jobDescription = (body.jobDescription || '').trim().slice(0, MAX_JOB_LENGTH);
  const cv = (body.cv || '').trim().slice(0, MAX_CV_LENGTH);
  // Only meaningful when tailoring to a job description.
  const addMissingSkills = Boolean(body.addMissingSkills) && Boolean(jobDescription);

  if (!instruction && !jobDescription) {
    return Response.json(
      { error: 'Provide a job description to tailor to, or an instruction.' },
      { status: 400 }
    );
  }
  if (!cv) return Response.json({ error: 'Missing current CV content.' }, { status: 400 });

  const userContent = [
    `CURRENT CV (Markdown):\n\n${cv}`,
    jobDescription ? `---\nTARGET JOB DESCRIPTION:\n\n${jobDescription}` : '',
    instruction ? `---\nINSTRUCTION: ${instruction}` : '',
    '---\nReturn the full updated CV in Markdown, tailored as described above.',
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nyihtutzaw.dev',
        'X-Title': 'Nyi Htut Zaw - Admin CV Adjustment',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 4000,
        messages: [
          { role: 'system', content: systemPrompt(addMissingSkills) },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('OpenRouter CV error:', res.status, detail);
      return Response.json(
        { error: 'The AI service is busy right now. Please try again.' },
        { status: 502 }
      );
    }

    const data = await res.json();
    let reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return Response.json({ error: 'No response generated. Please try again.' }, { status: 502 });
    }

    // Strip accidental code fences.
    reply = reply.replace(/^```(?:markdown)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    return Response.json({ cv: reply });
  } catch (err) {
    console.error('CV adjust route error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
