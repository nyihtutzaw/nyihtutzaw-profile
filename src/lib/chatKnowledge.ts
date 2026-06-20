import { workExperienceData } from '@/data/experience';
import { skillGroups } from '@/data/skills';
import { educationData } from '@/data/education';
import { certifications } from '@/data/certifications';

/**
 * Knowledge base for the "Chat with Me" bot.
 *
 * Everything the bot is allowed to know about Nyi Htut Zaw is assembled here
 * from the same data that powers the website, so answers never drift from what
 * a visitor can actually see. Each section is tagged with the page it lives on
 * so the model can return a clickable link (UI awareness).
 */

// Site routes available for "UI aware" deep links.
export const SITE_ROUTES = {
  home: '/',
  about: '/about',
  experience: '/experience',
  education: '/education',
  skills: '/skills',
  projects: '/projects',
  blog: '/blog',
  contact: '/contact',
} as const;

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function buildExperience(): string {
  return workExperienceData
    .map((job) => {
      const period = `${job.startDate} - ${job.endDate ?? 'Present'}`;
      const skills = job.skills?.length ? `Skills: ${job.skills.join(', ')}.` : '';
      const details = job.details ? stripHtml(job.details) : '';
      return [
        `- ${job.title} at ${job.company} (${job.type}, ${period}, ${job.location}).`,
        job.description ? `  ${job.description}` : '',
        skills ? `  ${skills}` : '',
        details ? `  Details: ${details}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');
}

function buildSkills(): string {
  return skillGroups
    .map((group) => `- ${group.name}: ${group.skills.map((s) => s.name).join(', ')}`)
    .join('\n');
}

function buildEducation(): string {
  return educationData
    .map(
      (e) =>
        `- ${e.degree}, ${e.institution} (${e.period}${e.grade ? `, ${e.grade}` : ''})${
          e.skills?.length ? `. Focus: ${e.skills.join(', ')}` : ''
        }`
    )
    .join('\n');
}

function buildCertifications(): string {
  return certifications
    .map((c) => `- ${c.title} — issued by ${c.issuedBy} (${c.date})`)
    .join('\n');
}

const PROFILE = `Name: Nyi Htut Zaw.
Current role: Senior AI Engineer at ArcFusion (AI for consumer brands), delivering AI solutions for a US-based consumer goods client, Bangkok, Thailand.
Summary: A Senior AI Engineer and full-stack engineer who builds AI agents for Revenue Growth Management (pricing, promotions, assortment, demand forecasting), and has a strong background in full-stack web/mobile development, healthcare tech, e-commerce, and cybersecurity platforms.
Based in: Bangkok, Thailand.
Email: nyihtutzaw.2015@gmail.com.
LinkedIn: https://www.linkedin.com/in/nyi-htut-zaw-9b741115a/
GitHub: https://github.com/nyihtutzaw
Medium: https://medium.com/@nyihtutzaw.2015
Projects page currently shows "Coming Soon" — detailed project case studies are not published yet.`;

/**
 * Returns the full knowledge string injected into the system prompt.
 * Page paths are included so the bot can link visitors to the right place.
 */
export function buildKnowledgeBase(): string {
  return `
=== PROFILE (page: ${SITE_ROUTES.about}) ===
${PROFILE}

=== WORK EXPERIENCE (page: ${SITE_ROUTES.experience}) ===
${buildExperience()}

=== SKILLS (page: ${SITE_ROUTES.skills}) ===
${buildSkills()}

=== EDUCATION (page: ${SITE_ROUTES.education}) ===
${buildEducation()}

=== CERTIFICATIONS (page: ${SITE_ROUTES.education}) ===
${buildCertifications()}

=== CONTACT (page: ${SITE_ROUTES.contact}) ===
For anything not covered above, or to discuss opportunities/collaboration, direct the visitor to the contact page (${SITE_ROUTES.contact}).

=== BLOG (page: ${SITE_ROUTES.blog}) ===
Nyi writes technical articles on Medium, surfaced on the blog page (${SITE_ROUTES.blog}).
`.trim();
}
