import { buildKnowledgeBase } from '@/lib/chatKnowledge';

// Capable, low-cost model on OpenRouter (shared with CV adjustment).
const MODEL = process.env.OPENROUTER_CV_MODEL || 'google/gemini-2.5-flash';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MAX_INPUT_LENGTH = 6000;
const MAX_EXISTING_LENGTH = 12000;

function systemPrompt(addMissingSkills: boolean): string {
  const missingSkillsRule = addMissingSkills
    ? `- ADDING MISSING SKILLS (enabled): For skills/technologies the job requires that he does not currently have (e.g. Java, Spring Boot, Angular), you MAY present him as working with them so the letter matches the posting. This applies ONLY to skills/technologies — you must STILL NOT invent employers, job titles, dates, degrees, quantified metrics, or specific project achievements that did not happen.`
    : `- If he lacks a required skill, emphasize the nearest transferable strength instead of inventing it.`;

  return `You are a professional cover-letter writer and career strategist working on behalf of Nyi Htut Zaw.

Your job: given a specific job description / role / company provided by the user, write a tailored, compelling cover letter for Nyi Htut Zaw that positions him for THAT role.

OUTPUT FORMAT (important):
- The FIRST line of your response must be exactly: TARGET_ROLE: <the job's role title>
  - Use the exact role title from the job description (e.g. "Senior Full Stack Developer"). If no clear title is given, infer the most fitting one. Do not add company names or extra words.
- Then a blank line, then the cover letter itself starting at the salutation.

TAILORING RULES:
- Read the job description and extract the target role title, seniority, must-have skills, technologies, and domains.
- Position Nyi Htut Zaw FOR the target role and seniority (e.g. for a "Senior Java Engineer" posting, present him as a senior backend/software engineer). He is currently a Senior AI Engineer; frame his background as a fit for the target role rather than repeating a fixed title.
- For each key requirement in the job description, find the matching or closest adjacent skill/experience he has in the KNOWLEDGE and connect it explicitly to what the role needs.
${missingSkillsRule}

RULES:
- Base factual claims about Nyi Htut Zaw on the KNOWLEDGE below (his real experience, skills, education, projects). Never invent employers, titles, dates, degrees, metrics, or achievements (skills are governed by the ADDING MISSING SKILLS line above).
- Tailor the letter to the specific role/company the user describes: connect his genuine experience to what the role needs.
- Tone: confident, warm, professional, and concise (roughly 250-400 words, 3-5 short paragraphs).
- Structure: a salutation (use "Dear Hiring Manager," if no name is given), an opening that states the role and hook, 1-2 body paragraphs mapping his experience to the role, a closing paragraph, and a sign-off ("Sincerely,\\nNyi Htut Zaw").
- Do NOT include the sender's address block, the date, or the recipient's address — only the letter itself starting at the salutation. (These are added separately.)
- If a company or role name is given, reference it naturally. If details are sparse, write a strong general letter for the described role.
- Output ONLY the cover letter text. No preamble, no explanations, no markdown code fences, no headings.

=== KNOWLEDGE ABOUT NYI HTUT ZAW ===
${buildKnowledgeBase()}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'AI generation is not configured. Set OPENROUTER_API_KEY.' },
      { status: 503 }
    );
  }

  let body: { input?: string; existing?: string; addMissingSkills?: boolean };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const input = (body.input || '').trim().slice(0, MAX_INPUT_LENGTH);
  const existing = (body.existing || '').trim().slice(0, MAX_EXISTING_LENGTH);
  const addMissingSkills = Boolean(body.addMissingSkills);

  if (!input) {
    return Response.json(
      { error: 'Please describe the role, company, or paste the job description.' },
      { status: 400 }
    );
  }

  const userContent = existing
    ? `Here is the current draft of the cover letter:\n\n${existing}\n\n---\nRevise it according to these details/instructions:\n${input}\n\nReturn the full updated cover letter.`
    : `Write a cover letter for this opportunity:\n\n${input}`;

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nyihtutzaw.dev',
        'X-Title': 'Nyi Htut Zaw - Admin Cover Letter',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.6,
        max_tokens: 1200,
        messages: [
          { role: 'system', content: systemPrompt(addMissingSkills) },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('OpenRouter cover letter error:', res.status, detail);
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

    reply = reply.replace(/^```[a-z]*\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

    // Extract the target role from the leading "TARGET_ROLE:" line, if present.
    let role: string | undefined;
    const roleMatch = reply.match(/^\s*TARGET_ROLE:\s*(.+)\s*$/im);
    if (roleMatch) {
      role = roleMatch[1].trim().slice(0, 120);
      // Remove that line (and any leading blank lines) from the letter body.
      reply = reply.replace(/^\s*TARGET_ROLE:.*$/im, '').replace(/^\s+/, '').trim();
    }

    return Response.json({ letter: reply, role });
  } catch (err) {
    console.error('Cover letter route error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
