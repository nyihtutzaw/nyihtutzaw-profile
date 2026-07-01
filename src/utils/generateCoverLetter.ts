import jsPDF from 'jspdf';

/**
 * Render a cover letter (plain paragraphs, produced/edited in the admin Cover
 * Letter tool) to a professional-looking PDF with a contact header and date.
 */
export const generateCoverLetterPDF = (
  letter: string,
  dateLabel: string,
  role = 'Senior AI Engineer',
  filename = 'NyiHtutZaw_CoverLetter.pdf'
) => {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 6;
  const margin = 20;
  const pageWidth = 210;
  const contentWidth = pageWidth - margin * 2;
  const pageHeight = 297;
  const maxY = pageHeight - margin;

  const addText = (text: string, size = 11, isBold = false, gap = lineHeight) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, contentWidth);
    if (yPos + lines.length * gap > maxY) {
      doc.addPage();
      yPos = margin;
    }
    doc.text(lines, margin, yPos, { align: 'left' });
    yPos += lines.length * gap;
  };

  // Header
  addText('NYI HTUT ZAW', 18, true, 8);
  addText(role || 'Senior AI Engineer', 11, false, 5);
  addText('nyihtutzaw.2015@gmail.com | +66 92 540 2997', 10, false, 5);
  addText('linkedin.com/in/nyihtutzaw | github.com/nyihtutzaw', 10, false, 5);

  yPos += 3;
  doc.setDrawColor(180);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Date
  if (dateLabel) {
    addText(dateLabel, 10, false, 8);
  }

  // Body paragraphs
  const paragraphs = letter.replace(/\r\n/g, '\n').split(/\n{2,}/);
  paragraphs.forEach((para) => {
    const clean = para.trim();
    if (!clean) return;
    // Keep single newlines inside a paragraph (e.g. sign-off) as line breaks.
    clean.split('\n').forEach((subline) => {
      addText(subline.trim(), 11, false, lineHeight);
    });
    yPos += 3;
  });

  doc.save(filename);
};
