import { educationData } from '@/data/education';
import { workExperienceData } from '@/data/experience';
import { formatPeriod } from '@/utils/dateUtils';

/**
 * Canonical CV content as Markdown. This is the single source for both the public
 * "Download CV" PDF and the admin "CV Adjustment" tool, where it can be previewed,
 * hand-edited, adjusted by AI, and rendered back to a PDF.
 */

const decodeAndStripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

/** Split a job's `details` HTML into its <h4> headings and the <li> bullets under each. */
const sectionsFromDetails = (details: string) => {
  const sections: { heading?: string; bullets: string[] }[] = [];
  const tokens = details.match(/<h4[^>]*>[\s\S]*?<\/h4>|<li>[\s\S]*?<\/li>/g) || [];
  tokens.forEach((token) => {
    const text = decodeAndStripHtml(token);
    if (token.startsWith('<h4')) {
      sections.push({ heading: text, bullets: [] });
    } else {
      if (sections.length === 0) sections.push({ bullets: [] });
      sections[sections.length - 1].bullets.push(text);
    }
  });
  return sections;
};

const competencies: [string, string][] = [
  ['AI & LLM', 'AI Agents, Text-to-SQL, RAG, Prompt Engineering, LLM Evaluation, LangChain, LangGraph, Langfuse, OpenAI APIs, Hugging Face, Vector Databases'],
  ['AI-Assisted Development', 'Claude Code, Codex'],
  ['Languages', 'Python, TypeScript, JavaScript, PHP, Dart'],
  ['Frontend & Mobile', 'React, Next.js, React Native, Flutter, Redux, Tailwind CSS, Material UI'],
  ['Backend & APIs', 'Node.js, Express, FastAPI, Laravel, Magento, GraphQL, Apollo GraphQL, REST APIs'],
  ['Data', 'PostgreSQL, MySQL, MongoDB, Redis, DuckDB, Databricks, Spark, Delta Lake'],
  ['Cloud & DevOps', 'AWS (ECS, Fargate, Lambda, S3), Docker, Kubernetes, GitHub Actions, GitLab CI'],
  ['Monitoring & Testing', 'Sentry, PostHog, Playwright, Load Testing'],
];

export function buildCVMarkdown(): string {
  const lines: string[] = [];

  // Header
  lines.push('# NYI HTUT ZAW');
  lines.push('## Senior Full-Stack & AI Engineer');
  lines.push('AI Agents & Data Apps | Full-Stack Development | Cloud & DevOps');
  lines.push('Bangkok, Thailand (Open to Remote/Hybrid)');
  lines.push('Email: nyihtutzaw.2015@gmail.com | Phone: +66 92 540 2997 | Portfolio: zaw27.com | LinkedIn: linkedin.com/in/nyi-htut-zaw-9b741115a | GitHub: github.com/nyihtutzaw');
  lines.push('');

  // Summary
  lines.push('## Professional Summary');
  lines.push(
    'Senior Full-Stack & AI Engineer with 7+ years of experience building web, mobile, e-commerce, healthcare, cybersecurity and AI products end to end. Currently building AI data products at ArcFusion: text-to-SQL agents, multi-tenant AWS platforms and data apps for enterprise clients. A daily power user of AI coding assistants (Claude Code, Codex), combining deep engineering experience with AI-assisted development to ship production-ready apps quickly.'
  );
  lines.push('');

  // Experience
  lines.push('## Professional Experience');
  workExperienceData
    .filter((e) => e.showInCV)
    .forEach((exp) => {
      lines.push(`### ${exp.title} | ${exp.cvCompany ?? exp.company}`);
      lines.push(`${formatPeriod(exp.startDate, exp.endDate)} | ${exp.location}`);

      const sections = exp.cvSections ?? sectionsFromDetails(exp.details ?? '');
      sections.forEach((section) => {
        if (section.heading) lines.push(`**${section.heading}**`);
        section.bullets.forEach((bullet) => lines.push(`- ${bullet}`));
      });

      if (exp.skills && exp.skills.length > 0) {
        lines.push(`**Key Technologies:** ${exp.skills.join(', ')}`);
      }
      lines.push('');
    });

  // Education
  lines.push('## Education');
  educationData.forEach((edu) => {
    lines.push(`### ${edu.degree}`);
    lines.push(`${edu.institution} | ${edu.period}`);
    if (edu.skills && edu.skills.length > 0) {
      lines.push(`Focus: ${edu.skills.join(', ')}`);
    }
    lines.push('');
  });

  // Core Competencies
  lines.push('## Core Competencies');
  competencies.forEach(([label, items]) => lines.push(`**${label}:** ${items}`));
  lines.push('');

  // Languages
  lines.push('## Languages');
  lines.push('English (Professional Working Proficiency) | Burmese (Native) | Thai (Basic)');

  return lines.join('\n');
}
