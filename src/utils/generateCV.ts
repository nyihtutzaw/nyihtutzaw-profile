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
    addText('Generative AI & Full-Stack Development', 11);
    addText('Bangkok, Thailand', 11);

    // Right column
    yPos = initialYPos;
    const rightColumnX = pageWidth / 2 + 10;
    addText('Email: nyihtutzaw.2015@gmail.com', 10, false, lineHeight, rightColumnX);
    addText('LinkedIn: linkedin.com/in/nyihtutzaw', 10, false, lineHeight, rightColumnX);
    addText('GitHub: github.com/nyihtutzaw', 10, false, lineHeight, rightColumnX);
    addText('Medium: medium.com/@nyihtutzaw.2015', 10, false, lineHeight, rightColumnX);

    // Reset yPos after header
    yPos = Math.max(yPos, initialYPos + 35);

    // Professional Summary
    addSection('Professional Summary');
    addText('Senior Software Engineer with expertise in Generative AI development, full-stack applications, and cloud architecture. Proven track record of leading AI-powered projects, implementing scalable solutions, and delivering enterprise-grade applications using Python, Golang, TypeScript, and modern cloud technologies.');
    yPos += 5;

    // Experience Section
    addSection('Professional Experience');
    workExperienceData.filter(e => e.showInCV).forEach(exp => {

        yPos += 3;

        addText(`${exp.title} at ${exp.company}`, 14, true);
        addText(`${exp.period} | ${exp.location}`, 11, false, 5);
        
        // Add company description if available
        if (exp.description) {
            addText(exp.description, 10, false, 5);
            yPos += 2;
        }
        
        yPos += 3;
       
        // Extract and add only <li> items from HTML content
        const liItems = exp.details?.match(/<li>(.*?)<\/li>/g)?.map(item =>
            item.replace(/<\/?li>/g, '').trim()
        ) || [];
        
        // Limit to top 6-8 key points for CV
        const keyPoints = liItems.slice(0, 8);
        
        keyPoints.forEach(item => {
            // Remove any remaining HTML tags and decode HTML entities
            const decodedItem = item
                .replace(/<[^>]*>/g, '') // Remove any HTML tags
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/Currently developing /g, 'Developing ') // Remove "Currently" for CV
                .replace(/Currently /g, '') // Remove other "Currently" references
                .replace(/Leading /g, 'Led ') // Convert present to past tense where appropriate
                .replace(/Implementing /g, 'Implemented ')
                .replace(/Building /g, 'Built ')
                .replace(/Utilizing /g, 'Utilized ')
                .replace(/Integrating /g, 'Integrated ')
                .replace(/Designing /g, 'Designed ')
                .replace(/Deploying /g, 'Deployed ');
                
            addText(`• ${decodedItem}`, 10, false, 5);
        });

        // Add key skills for this position
        if (exp.skills && exp.skills.length > 0) {
            yPos += 2;
            addText(`Key Technologies: ${exp.skills.slice(0, 6).join(', ')}`, 9, true, 4);
        }

        yPos += 6;
    });

    // Education Section
    addSection('Education');
    educationData.forEach(edu => {
        addText(`${edu.degree}`, 12, true);
        addText(`${edu.institution}`, 11);
        addText(`${edu.period} | Grade: ${edu.grade}`, 10);
        if (edu.skills && edu.skills.length > 0) {
            addText(`Focus: ${edu.skills.join(', ')}`, 10);
        }
        yPos += 3;
    });

    // Skills Section
    addSection('Technical Skills');
    skillGroups.forEach(group => {
        addText(`${group.name}:`, 11, true);
        addText(group.skills.map(skill => skill.name).join(', '), 10);
        yPos += 3;
    });

    // Add additional sections
    addSection('Certifications & Training');
    addText('• Google Cloud Professional Certification', 10, false, 5);
    addText('• AWS Solutions Architect Certification', 10, false, 5);
    addText('• Advanced Machine Learning & AI Training', 10, false, 5);
    yPos += 3;

    addSection('Languages');
    addText('• English (Professional Working Proficiency)', 10, false, 5);
    addText('• Burmese (Native)', 10, false, 5);
    addText('• Thai (Basic)', 10, false, 5);

    // Save the PDF
    doc.save('NyiHtutZaw_CV.pdf');
};