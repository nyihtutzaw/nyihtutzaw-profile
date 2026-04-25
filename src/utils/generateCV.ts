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
    addText('Senior AI Engineer', 14, true);
    addText('Generative AI | Full-Stack Development | Cloud Architecture', 10);
    addText('Bangkok, Thailand (Open to Remote/Hybrid)', 10);

    // Right column - Contact Information
    yPos = initialYPos;
    const rightColumnX = pageWidth / 2 + 10;
    
    // Get dynamic portfolio URL
    const portfolioUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}` 
      : 'https://nyihtutzaw.github.io';
    
    addText('Email: nyihtutzaw.2015@gmail.com', 10, false, lineHeight, rightColumnX);
    addText('Phone: +66 92 540 2997', 10, false, lineHeight, rightColumnX);
    addText('Portfolio: ' + portfolioUrl, 10, false, lineHeight, rightColumnX);
    addText('LinkedIn: linkedin.com/in/nyihtutzaw', 10, false, lineHeight, rightColumnX);
    addText('GitHub: github.com/nyihtutzaw', 10, false, lineHeight, rightColumnX);

    // Reset yPos after header
    yPos = Math.max(yPos, initialYPos + 40);

    // Professional Summary with ATS keywords
    addSection('Professional Summary');
    addText('Senior AI Engineer with 7+ years of experience building AI-powered applications and enterprise solutions for consumer brands. Specialized in AI Agents for Revenue Growth Management - Trade, Pricing, Promotions, Assortment, and Forecast. Expert in Generative AI, LangChain, LangGraph, Python, and Golang with AWS cloud deployment. Proven track record leading development teams and delivering high-performance solutions across healthcare, e-commerce, and consumer goods industries.');
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
    addSection('Core Competencies');
    
    // AI & Machine Learning
    addText('AI & Machine Learning:', 10, true);
    addText('Generative AI, LangChain, LangGraph, Langfuse, OpenAI APIs, Gemini APIs, Hugging Face, RAG, Prompt Engineering, Vector Databases, TensorFlow, PyTorch', 9);
    yPos += 3;
    
    // Programming Languages
    addText('Programming Languages:', 10, true);
    addText('Python, Golang, JavaScript, TypeScript, PHP, Dart', 9);
    yPos += 3;
    
    // Frontend Technologies
    addText('Frontend & Mobile:', 10, true);
    addText('React.js, React Native, Next.js, HTML5, CSS3, Tailwind CSS, Redux.js, Material-UI', 9);
    yPos += 3;
    
    // Backend Technologies
    addText('Backend & APIs:', 10, true);
    addText('Node.js, Express.js, FastAPI, Echo, Laravel, GraphQL, Apollo GraphQL, REST APIs', 9);
    yPos += 3;
    
    // Database & Storage
    addText('Database & Storage:', 10, true);
    addText('PostgreSQL, MySQL, MongoDB, Redis, Firebase, AWS S3', 9);
    yPos += 3;
    
    // Cloud & DevOps
    addText('Cloud & DevOps:', 10, true);
    addText('AWS, Google Cloud Platform, Docker, Kubernetes, CI/CD, GitHub Actions, GitLab', 9);

    // Languages Section
    addSection('Languages');
    addText('English (Professional Working Proficiency)', 9, false, 4);
    addText('Burmese (Native)', 9, false, 4);
    addText('Thai (Basic)', 9, false, 4);

    // Save the PDF
    doc.save('NyiHtutZaw_CV.pdf');
};