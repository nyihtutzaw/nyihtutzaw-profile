import { educationData } from '@/data/education';
import { workExperienceData } from '@/data/experience';
import { formatPeriod } from '@/utils/dateUtils';

/**
 * Canonical CV content as Markdown, assembled from the same data that powers the
 * PDF download. This is the starting point for the admin "CV Adjustment" tool:
 * it can be previewed, hand-edited, adjusted by AI, and rendered back to a PDF.
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

export function buildCVMarkdown(): string {
  const lines: string[] = [];

  // Header
  lines.push('# NYI HTUT ZAW');
  lines.push('## Senior AI Engineer');
  lines.push('Generative AI | Full-Stack Development | Cloud Architecture');
  lines.push('Bangkok, Thailand (Open to Remote/Hybrid)');
  lines.push('');
  lines.push('Email: nyihtutzaw.2015@gmail.com | Phone: +66 92 540 2997');
  lines.push('Portfolio: zaw27.com | LinkedIn: linkedin.com/in/nyihtutzaw | GitHub: github.com/nyihtutzaw');
  lines.push('');

  // Summary
  lines.push('## Professional Summary');
  lines.push(
    'Senior AI Engineer with 7+ years of experience building AI-powered applications and enterprise solutions for consumer brands. Specialized in AI Agents for Revenue Growth Management - Trade, Pricing, Promotions, Assortment, and Forecast. Expert in Generative AI, LangChain, LangGraph, Python, and Golang with AWS cloud deployment. Proven track record leading development teams and delivering high-performance solutions across healthcare, e-commerce, and consumer goods industries.'
  );
  lines.push('');

  // Experience
  lines.push('## Professional Experience');
  workExperienceData
    .filter((e) => e.showInCV)
    .forEach((exp) => {
      lines.push(`### ${exp.title} | ${exp.company}`);
      lines.push(`${formatPeriod(exp.startDate, exp.endDate)} | ${exp.location}`);
      if (exp.description) lines.push(exp.description);

      const liItems =
        exp.details?.match(/<li>(.*?)<\/li>/g)?.map((item) => decodeAndStripHtml(item)) || [];
      liItems.slice(0, 8).forEach((item) => {
        if (item) lines.push(`- ${item}`);
      });

      if (exp.skills && exp.skills.length > 0) {
        lines.push(`**Key Technologies:** ${exp.skills.slice(0, 6).join(', ')}`);
      }
      lines.push('');
    });

  // Education
  lines.push('## Education');
  educationData.forEach((edu) => {
    lines.push(`### ${edu.degree}`);
    lines.push(edu.institution);
    lines.push(`${edu.period} | Grade: ${edu.grade}`);
    if (edu.skills && edu.skills.length > 0) {
      lines.push(`Focus: ${edu.skills.join(', ')}`);
    }
    lines.push('');
  });

  // Core Competencies
  lines.push('## Core Competencies');
  lines.push('**AI & Machine Learning:** Generative AI, LangChain, LangGraph, Langfuse, OpenAI APIs, Gemini APIs, Hugging Face, RAG, Prompt Engineering, Vector Databases, TensorFlow, PyTorch');
  lines.push('**Programming Languages:** Python, Golang, JavaScript, TypeScript, PHP, Dart');
  lines.push('**Frontend & Mobile:** React.js, React Native, Next.js, HTML5, CSS3, Tailwind CSS, Redux.js, Material-UI');
  lines.push('**Backend & APIs:** Node.js, Express.js, FastAPI, Echo, Laravel, GraphQL, Apollo GraphQL, REST APIs');
  lines.push('**Database & Storage:** PostgreSQL, MySQL, MongoDB, Redis, Firebase, AWS S3');
  lines.push('**Cloud & DevOps:** AWS, Google Cloud Platform, Docker, Kubernetes, CI/CD, GitHub Actions, GitLab');
  lines.push('');

  // Languages
  lines.push('## Languages');
  lines.push('- English (Professional Working Proficiency)');
  lines.push('- Burmese (Native)');
  lines.push('- Thai (Basic)');

  return lines.join('\n');
}
