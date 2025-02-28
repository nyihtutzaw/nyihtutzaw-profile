import { educationData } from '@/data/education';
import jsPDF from 'jspdf';
import { workExperienceData } from '@/data/experience';
import { skillGroups } from '@/data/skills';

export const generateCV = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    const pageHeight = 297;
    const maxY = pageHeight - margin;

    // Helper functions
    const addText = (text: string, size = 12, isBold = false, customLineHeight?: number, xPosition = margin) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        const lines = doc.splitTextToSize(text, contentWidth); // Full width for normal content

        if (yPos + (lines.length * (customLineHeight || lineHeight)) > maxY) {
            doc.addPage();
            yPos = margin;
        }

        doc.text(lines, xPosition, yPos, { align: 'left' });
        yPos += (lines.length * (customLineHeight || lineHeight));
    };

    const addSection = (title: string) => {
        if (yPos + 20 > maxY) {
            doc.addPage();
            yPos = margin;
        }

        yPos += 5;
        addText(title, 16, true);
        yPos += 3;
        doc.setDrawColor(0);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
    };

    // Header with two columns
    const initialYPos = yPos;
    // Left column
    addText('Nyi Htut Zaw', 20, true);
    addText('Senior Software Engineer', 14);

    // Right column
    yPos = initialYPos;
    const rightColumnX = pageWidth / 2 + 10;
    addText('Email: nyihtutzaw.2015@gmail.com', 12, false, lineHeight, rightColumnX);
    addText('LinkedIn: linkedin.com/in/nyihtutzaw', 12, false, lineHeight, rightColumnX);
    addText('GitHub: github.com/nyihtutzaw', 12, false, lineHeight, rightColumnX);

    // Reset yPos after header
    yPos = Math.max(yPos, initialYPos + 25);

    // Experience Section
    addSection('Professional Experience');
    workExperienceData.filter(e => e.showInCV).forEach(exp => {

        yPos += 3;

        addText(`${exp.title} at ${exp.company}`, 14, true);
        addText(`${exp.period} | ${exp.location}`, 12, false, 5);
        yPos += 3;
       
        // Extract and add only <li> items from HTML content
        const liItems = exp.details.match(/<li>(.*?)<\/li>/g)?.map(item =>
            item.replace(/<\/?li>/g, '').trim()
        ) || [];
        liItems.forEach(item => {
            // Remove any remaining HTML tags and decode HTML entities
            const decodedItem = item
                .replace(/<[^>]*>/g, '') // Remove any HTML tags
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
            addText(`• ${decodedItem}`, 12, false, 5);
        });

        yPos += 6;
    });

    // Education Section
    addSection('Education');
    educationData.forEach(edu => {
        addText(`${edu.degree}`, 14, true);
        addText(`${edu.institution}`);
        addText(`${edu.period}`);
        yPos += 3;
    });

    // Skills Section
    addSection('Technical Skills');
    skillGroups.forEach(group => {
        addText(`${group.name}:`, 12, true);
        addText(group.skills.map(skill => skill.name).join(', '));
        yPos += 3;
    });

    // Save the PDF
    doc.save('NyiHtutZaw_CV.pdf');
};