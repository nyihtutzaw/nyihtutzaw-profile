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
        addText(title.toUpperCase(), 14, true);
        yPos += 3;
        doc.setDrawColor(0);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 5;
    };

    // ATS-Friendly Header with clear contact information
    const initialYPos = yPos;
    // Left column - Name and Title
    addText('NYI HTUT ZAW', 20, true);
    addText('Senior Software Engineer', 14, true);
    addText('AI & Full-Stack Development', 12, true);
    addText('Bangkok, Thailand', 10);

    // Right column - Contact Information
    yPos = initialYPos;
    const rightColumnX = pageWidth / 2 + 10;
    addText('Email: nyihtutzaw.2015@gmail.com', 10, false, lineHeight, rightColumnX);
    addText('LinkedIn: linkedin.com/in/nyihtutzaw', 10, false, lineHeight, rightColumnX);
    addText('GitHub: github.com/nyihtutzaw', 10, false, lineHeight, rightColumnX);
    addText('Medium: medium.com/@nyihtutzaw.2015', 10, false, lineHeight, rightColumnX);

    // Reset yPos after header
    yPos = Math.max(yPos, initialYPos + 40);

    // Professional Summary with ATS keywords
    addSection('Professional Summary');
    addText('Senior Software Engineer with 7+ years of experience developing scalable AI-powered applications, full-stack web solutions, and enterprise-level systems. Expertise in Python, Golang, TypeScript, React.js, Node.js, cloud architecture (AWS, Google Cloud), and modern AI technologies including Generative AI, Machine Learning, and LangChain. Proven track record of leading development teams, implementing CI/CD pipelines, and delivering high-performance solutions for healthcare, e-commerce, and cybersecurity industries.');
    yPos += 5;

    // Experience Section with ATS-friendly formatting
    addSection('Professional Experience');
    workExperienceData.filter(e => e.showInCV).forEach(exp => {

        yPos += 3;

        addText(`${exp.title.toUpperCase()} | ${exp.company.toUpperCase()}`, 12, true);
        addText(`${exp.period} | ${exp.location}`, 10, false, 5);
        
        // Add company description if available
        if (exp.description) {
            addText(exp.description, 9, false, 5);
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
                
            addText(`• ${decodedItem}`, 9, false, 5);
        });

        // Add key skills for this position
        if (exp.skills && exp.skills.length > 0) {
          yPos += 2;
          addText(`Key Technologies: ${exp.skills.slice(0, 6).join(', ')}`, 9, true, 4);
        }

        yPos += 4;
    });

    // Education Section with ATS formatting
    addSection('Education');
    educationData.forEach(edu => {
        addText(`${edu.degree.toUpperCase()}`, 11, true);
        addText(`${edu.institution.toUpperCase()}`, 10);
        addText(`${edu.period} | Grade: ${edu.grade}`, 9);
        if (edu.skills && edu.skills.length > 0) {
            addText(`Focus: ${edu.skills.join(', ')}`, 9);
        }
        yPos += 2;
    });

    // Skills Section with ATS-friendly categorization
    addSection('Technical Skills');
    
    // Programming Languages
    addText('Programming Languages:', 10, true);
    addText('Python, Golang, JavaScript, TypeScript, PHP, Dart, Java, C++', 9);
    yPos += 2;
    
    // Frontend Technologies
    addText('Frontend Technologies:', 10, true);
    addText('React.js, React Native, Next.js, HTML5, CSS3, Tailwind CSS, Redux.js, Material-UI', 9);
    yPos += 2;
    
    // Backend Technologies
    addText('Backend Technologies:', 10, true);
    addText('Node.js, Express.js, FastAPI, Echo, Laravel, Strapi, Elysia, GraphQL, Apollo GraphQL', 9);
    yPos += 2;
    
    // Database & Storage
    addText('Database & Storage:', 10, true);
    addText('PostgreSQL, MySQL, MongoDB, Redis, Firebase, AWS S3, Google Cloud Storage', 9);
    yPos += 2;
    
    // Cloud & DevOps
    addText('Cloud & DevOps:', 10, true);
    addText('AWS, Google Cloud Platform, Docker, Kubernetes, CI/CD, GitHub Actions, GitLab, Jenkins', 9);
    yPos += 2;
    
    // AI & Machine Learning
    addText('AI & Machine Learning:', 10, true);
    addText('Generative AI, LangChain, LangGraph, OpenAI APIs, Gemini APIs, Hugging Face, TensorFlow, PyTorch, Scikit-learn', 9);
    yPos += 2;
    
    // Tools & Frameworks
    addText('Tools & Frameworks:', 10, true);
    addText('Git, JIRA, Agile, Scrum, Figma, Postman, Swagger, Webpack, Jest, Cypress', 9);

    // Languages Section
    addSection('Languages');
    addText('English (Professional Working Proficiency)', 9, false, 4);
    addText('Burmese (Native)', 9, false, 4);
    addText('Thai (Basic)', 9, false, 4);

    // Save the PDF
    doc.save('NyiHtutZaw_CV.pdf');
};