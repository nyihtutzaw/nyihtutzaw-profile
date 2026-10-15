import jsPDF from 'jspdf';
import { buildCVMarkdown } from '@/lib/cvContent';

type RGB = [number, number, number];

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BOTTOM = PAGE_HEIGHT - 16;
const BULLET_INDENT = 4;

const TEXT: RGB = [33, 37, 41];
const MUTED: RGB = [95, 101, 110];
const ACCENT: RGB = [30, 64, 175];

const PT_TO_MM = 0.3528;
const lineHeight = (size: number) => size * PT_TO_MM * 1.32;
const ascent = (size: number) => size * PT_TO_MM * 0.78;

const stripBold = (text: string) => text.replace(/\*\*/g, '');

/** Link target for a contact entry such as "Email: a@b.com" or "LinkedIn: linkedin.com/in/x". */
const contactLink = (label: string, value: string): string | undefined => {
    if (value.includes('@')) return `mailto:${value}`;
    if (/phone/i.test(label)) return `tel:${value.replace(/[^\d+]/g, '')}`;
    if (/^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(value)) return `https://${value}`;
    return undefined;
};

/** Download the public CV, built from the same Markdown the admin CV tool starts from. */
export const generateCV = () => generateCVFromMarkdown(buildCVMarkdown());

/**
 * Render a Markdown CV (as produced/edited in the admin CV Adjustment tool) to a
 * PDF. Supports the subset of Markdown used by the CV: `#` name, a `##` headline
 * straight after it, `##` section headings, `###` job/degree titles (the next line
 * is treated as its date/location line), `- ` bullets, `**bold**` lines and
 * `**Label:** rest` lines. In the header, a line of `Label: value | ...` pairs is
 * rendered as clickable contact links.
 */
export const generateCVFromMarkdown = (markdown: string, filename = 'NyiHtutZaw_CV.pdf') => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    let y = MARGIN;
    let name = '';
    let previous: 'start' | 'name' | 'headline' | 'section' | 'title' | 'meta' | 'text' = 'start';
    let inHeader = true;

    const setFont = (size: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: RGB = TEXT) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.setTextColor(...color);
    };

    const ensureSpace = (height: number) => {
        if (y + height > BOTTOM) {
            doc.addPage();
            y = MARGIN;
        }
    };

    const drawLines = (lines: string[], size: number, x: number) => {
        lines.forEach((line) => {
            ensureSpace(lineHeight(size));
            doc.text(line, x, y + ascent(size));
            y += lineHeight(size);
        });
    };

    const paragraph = (text: string, size: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: RGB = TEXT) => {
        setFont(size, style, color);
        drawLines(doc.splitTextToSize(text, CONTENT_WIDTH), size, MARGIN);
    };

    const bullet = (text: string) => {
        const size = 9.5;
        setFont(size);
        const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH - BULLET_INDENT);
        ensureSpace(lineHeight(size));
        doc.text('•', MARGIN + 0.5, y + ascent(size));
        drawLines(lines, size, MARGIN + BULLET_INDENT);
        y += 0.6;
    };

    // "**Label:** rest" with the bold label and the text on the same line.
    const labelLine = (label: string, rest: string) => {
        const size = 9.5;
        const labelText = `${label}: `;
        setFont(size, 'bold');
        const labelWidth = doc.getTextWidth(labelText);
        setFont(size);
        const first: string = doc.splitTextToSize(rest, CONTENT_WIDTH - labelWidth)[0] ?? '';
        ensureSpace(lineHeight(size));
        setFont(size, 'bold');
        doc.text(labelText, MARGIN, y + ascent(size));
        setFont(size);
        doc.text(first, MARGIN + labelWidth, y + ascent(size));
        y += lineHeight(size);
        const remaining = rest.slice(first.length).trimStart();
        if (remaining) drawLines(doc.splitTextToSize(remaining, CONTENT_WIDTH), size, MARGIN);
        y += 0.8;
    };

    const contactLine = (text: string) => {
        const size = 9;
        const separator = '   |   ';
        setFont(size);
        const separatorWidth = doc.getTextWidth(separator);
        let x = MARGIN;
        y += 0.8;
        text.split('|').map((part) => part.trim()).filter(Boolean).forEach((part, index) => {
            const match = part.match(/^([^:]+):\s*(.+)$/);
            const value = match ? match[2] : part;
            const url = match ? contactLink(match[1], value) : undefined;
            const width = doc.getTextWidth(value);
            if (index > 0) {
                if (x + separatorWidth + width > MARGIN + CONTENT_WIDTH) {
                    x = MARGIN;
                    y += lineHeight(size);
                } else {
                    setFont(size, 'normal', MUTED);
                    doc.text(separator, x, y + ascent(size));
                    x += separatorWidth;
                }
            }
            setFont(size, 'normal', url ? ACCENT : TEXT);
            if (url) {
                doc.textWithLink(value, x, y + ascent(size), { url });
            } else {
                doc.text(value, x, y + ascent(size));
            }
            x += width;
        });
        y += lineHeight(size);
    };

    const section = (title: string) => {
        ensureSpace(16);
        y += inHeader ? 3 : 4;
        inHeader = false;
        setFont(11, 'bold', ACCENT);
        doc.text(title.toUpperCase(), MARGIN, y + ascent(11));
        y += lineHeight(11) + 0.3;
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
        y += 2.5;
    };

    // "Title | Company" as a bold title followed by the company on the same line.
    const title = (text: string) => {
        ensureSpace(22);
        if (previous !== 'section') y += 2.5;
        const size = 10.5;
        const [role, ...rest] = text.split(' | ');
        const company = rest.join(' | ');
        setFont(size, 'bold');
        const roleWidth = doc.getTextWidth(role);
        const companyText = company ? `  —  ${company}` : '';
        setFont(size);
        if (!company || roleWidth + doc.getTextWidth(companyText) > CONTENT_WIDTH) {
            paragraph(text, size, 'bold');
            return;
        }
        setFont(size, 'bold');
        doc.text(role, MARGIN, y + ascent(size));
        setFont(size, 'normal', ACCENT);
        doc.text(companyText, MARGIN + roleWidth, y + ascent(size));
        y += lineHeight(size);
    };

    markdown.replace(/\r\n/g, '\n').split('\n').forEach((raw) => {
        const line = raw.trim();

        if (line === '') {
            y += 1.5;
            return;
        }
        if (line.startsWith('# ')) {
            name = stripBold(line.slice(2));
            setFont(22, 'bold');
            doc.text(name.toUpperCase(), MARGIN, y + ascent(22));
            y += lineHeight(22);
            previous = 'name';
            return;
        }
        if (line.startsWith('## ')) {
            if (previous === 'name') {
                paragraph(stripBold(line.slice(3)), 12.5, 'bold', ACCENT);
                y += 0.5;
                previous = 'headline';
            } else {
                section(stripBold(line.slice(3)));
                previous = 'section';
            }
            return;
        }
        if (line.startsWith('### ')) {
            title(stripBold(line.slice(4)));
            previous = 'title';
            return;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
            bullet(stripBold(line.slice(2)));
            previous = 'text';
            return;
        }
        const labelMatch = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        if (labelMatch) {
            labelLine(labelMatch[1], stripBold(labelMatch[2]));
            previous = 'text';
            return;
        }
        if (/^\*\*.+\*\*$/.test(line)) {
            ensureSpace(14);
            y += 1;
            paragraph(stripBold(line), 9.5, 'bold');
            y += 0.4;
            previous = 'text';
            return;
        }
        if (inHeader && /\S+@\S+\.\S+/.test(line)) {
            contactLine(stripBold(line));
            previous = 'text';
            return;
        }
        if (previous === 'title') {
            paragraph(stripBold(line), 9, 'italic', MUTED);
            y += 0.6;
            previous = 'meta';
            return;
        }

        paragraph(stripBold(line), inHeader ? 9.5 : 9.5, 'normal', inHeader ? MUTED : TEXT);
        if (previous === 'meta') y += 0.8;
        previous = 'text';
    });

    const pageCount = doc.getNumberOfPages();
    for (let page = 1; page <= pageCount; page++) {
        doc.setPage(page);
        setFont(8, 'normal', MUTED);
        doc.text(`${name}  ·  Page ${page} of ${pageCount}`, PAGE_WIDTH / 2, PAGE_HEIGHT - 9, { align: 'center' });
    }

    doc.setProperties({ title: `${name} — CV`, author: name });
    doc.save(filename);
};
