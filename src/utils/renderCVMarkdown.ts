/**
 * Render the CV Markdown subset to a styled HTML string for the admin preview.
 * All text is HTML-escaped before any Markdown markup is applied, so arbitrary
 * (or AI-generated) content cannot inject markup.
 */

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Apply inline **bold** on already-escaped text.
const inline = (text: string): string =>
  escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export function renderCVMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line === '') {
      closeList();
      continue;
    }
    if (line.startsWith('# ')) {
      closeList();
      html.push(`<h1 class="cv-h1">${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2 class="cv-h2">${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3 class="cv-h3">${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        html.push('<ul class="cv-ul">');
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    closeList();
    html.push(`<p class="cv-p">${inline(line)}</p>`);
  }
  closeList();
  return html.join('\n');
}
