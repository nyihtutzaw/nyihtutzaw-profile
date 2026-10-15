import { formatPeriod } from '@/utils/dateUtils';

interface WorkExperience {
    logo: string;
    logoAlt: string;
    title: string;
    company: string;
    type: string;
    startDate: string;
    endDate: string | null;
    location: string;
    description?: string;
    skills?: string[];
    details?: string;
    showInCV?: boolean;
    /** Shorter company name for the CV, when `company` is too long for one line. */
    cvCompany?: string;
    /** Curated CV bullets. When omitted, the CV uses the <h4>/<li> groups in `details`. */
    cvSections?: { heading?: string; bullets: string[] }[];
}

export const workExperienceData: WorkExperience[] = [
    {
        logo: "/work/arcfusion.png",
        logoAlt: "ArcFusion Logo",
        title: "Senior AI Engineer",
        company: "ArcFusion",
        type: "Full-time",
        startDate: "Oct 2025",
        endDate: null,
        location: "Bangkok, Thailand · On-site",
        showInCV: true,
        description: "Senior AI Engineer building AI data products and agents: text-to-SQL, multi-tenant cloud platforms and data apps for enterprise clients.",
        skills: ["Python", "AWS (Fargate, ECS)", "GitHub Actions", "LangChain", "LangGraph", "Langfuse", "Text-to-SQL", "DuckDB", "Databricks", "Spark", "Delta Lake", "Sentry", "PostHog", "Playwright"],
        details: `
<div class="space-y-4">
  <p>Senior AI Engineer at ArcFusion, working on ArcFusion's own AI product and on client projects. I work across the whole stack: AI agents, cloud infrastructure, backend and frontend.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Customer segmentation platform for a leading Thai retailer</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Set up cloud infrastructure and CI/CD on AWS Fargate with GitHub Actions</li>
      <li>Added error monitoring with Sentry and web analytics with PostHog</li>
      <li>Load-tested the AI app and agents to make sure they handle many users at the same time</li>
      <li>Researched faster ways to process large datasets with DuckDB, Databricks, Spark and Delta Lake</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">AI assistant for promotion managers (AI startup client)</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Built multi-tenant AWS infrastructure and CI/CD, giving each of their customers an isolated environment</li>
      <li>Built a shared authentication service used across all their customers</li>
      <li>Integrated the assistant with a third-party trade promotion management platform using browser automation</li>
      <li>Built "chat with your data" over Parquet files using text-to-SQL</li>
      <li>Frontend work: notifications, Slack integration and performance optimisation</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">ArcFusion's data analytics product</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Worked on the AI agent that lets users chat with their data, create charts and generate data stories</li>
      <li>Tuned prompts and built evaluations for the text-to-SQL agent to improve answer accuracy</li>
    </ul>
  </div>
</div>
        `
    },
    {
        logo: "/work/rv.jpeg",
        logoAlt: "RV Connex Logo",
        title: "Senior Full Stack Engineer",
        company: "RV Connex",
        type: "Full-time",
        startDate: "Sep 2024",
        endDate: "Sep 2025",
        location: "Pathum Thani, Thailand · On-site",
        showInCV: true,
        cvSections: [{
            bullets: [
                "Led development of an AI-powered cybersecurity platform, coordinating SOC, Customer Success, Data Engineering and AI teams",
                "Designed data pipelines that unified siloed security alert sources into one platform for SOC analysts",
                "Delivered a real-time alert processing system for security events",
                "Integrated AI-driven automated investigation and chatbot features, reducing manual triage for analysts",
                "Architected the platform's mobile applications and shaped system design for a scalable, secure architecture",
                "Set up CI/CD with security testing, defined coding standards and mentored engineers"
            ]
        }],
        description: "Senior Full Stack Engineer leading development of AI-powered cybersecurity platform, coordinating cross-functional teams to deliver comprehensive security solutions with data pipelines, automated investigation systems, and mobile applications.",
        skills: ["TypeScript", "Python", "Cypher Security", "Redux.js", "Tailwind CSS", "Apollo GraphQL", "monorepo", "XDR", "EDR", "Flowbite"],
        details: `
         <div class="space-y-4">
  <p>Leading the development of an AI-powered Cyber Security platform, orchestrating collaboration between multiple teams to deliver comprehensive security solutions. Expertise in integrating security systems, data pipelines, and AI capabilities while maintaining high standards of code quality and system architecture.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Responsibilities</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Lead and coordinate cross-functional teams including SOC, Customer Success, Data Engineering, and AI teams for seamless integration of security solutions.</li>
      <li>Design and implement data pipelines for security alert management, integrating with various security systems and devices.</li>
      <li>Collaborate with AI team to integrate automated investigation systems and intelligent chatbot capabilities.</li>
      <li>Architect and oversee the development of mobile applications for the security platform.</li>
      <li>Participate in high-level system design decisions for scalable and secure architecture.</li>
      <li>Establish coding standards and best practices for security-focused development.</li>
      <li>Implement robust CI/CD pipelines with emphasis on security testing and compliance.</li>
      <li>Mentor team members on security best practices and modern development methodologies.</li>
      <li>Drive technical discussions with stakeholders to align security solutions with business requirements.</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Achievements</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Unified previously siloed security data sources into a single platform, giving SOC analysts one source of truth.</li>
      <li>Delivered a real-time alert processing system handling thousands of security events per day.</li>
      <li>Streamlined the SOC-to-AI investigation handoff, cutting manual triage effort for analysts.</li>
    </ul>
  </div>
</div>
        `
    },
    {
        logo: "/work/mbs.jpeg",
        logoAlt: "Magic Box Solutions Logo",
        title: "Senior Full Stack Engineer",
        company: "Magic Box Solutions",
        type: "Full-time",
        startDate: "Aug 2023",
        endDate: "Sep 2024",
        location: "Bangkok, Thailand",
        showInCV: true,
        cvSections: [{
            bullets: [
                "Built and maintained Magento e-commerce stores with React frontends for Japanese and global clothing brands",
                "Led a client's platform migration to a new major version with zero downtime, including custom data migration scripts",
                "Launched the new platform with multiple payment gateways, including cash on delivery and online payments",
                "Implemented authentication, checkout, order management and reward point systems",
                "Set up CI/CD and deployed and monitored applications on AWS"
            ]
        }],
        description: "Senior Full Stack Engineer developing robust e-commerce solutions for Japanese brands and global clothing companies using Magento, React, and modern web technologies.",
        skills: ["Magento", "React Native", "React.js", "Node.js", "Amazon Web Services (AWS)", "GitLab"],
        details: `<div class="space-y-4">
        <p>Senior Full Stack Engineer specializing in e-commerce development for international clients. Expertise in Magento platform customization, React-based frontend development, and AWS cloud deployment. Successfully led multiple high-stakes projects including major system migrations and new platform implementations.</p>
        
        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Responsibilities</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Develop and maintain e-commerce applications using PHP Magento for backend functionality</li>
            <li>Create responsive frontend interfaces with React.js for optimal user experience</li>
            <li>Implement complex business logic for authentication, checkout flows, and payment processing</li>
            <li>Design and execute system migration strategies from legacy platforms to modern architectures</li>
            <li>Develop custom migration scripts using JavaScript for seamless data transfer</li>
            <li>Manage order processing, customer management, and reward point systems</li>
            <li>Deploy and monitor applications on AWS infrastructure ensuring high availability</li>
            <li>Collaborate with cross-functional teams including designers and project managers</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Achievements</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Successfully migrated Kindcare V2 to V3 platform with zero downtime during transition</li>
            <li>Developed and launched Kindcare V3 with advanced features including multi-payment gateway integration</li>
            <li>Implemented comprehensive order management system reducing processing time by 40%</li>
            <li>Created automated migration scripts that processed 50,000+ customer records without data loss</li>
            <li>Established CI/CD pipeline improving deployment frequency from weekly to daily releases</li>
            <li>Led integration of cash on delivery and online payment systems increasing conversion rates by 25%</li>
          </ul>
        </div>
      </div>`
    },
    {
        logo: "/work/union.jpeg",
        logoAlt: "The Union Logo",
        showInCV: true,
        cvCompany: "The Union (Myanmar Office)",
        cvSections: [{
            bullets: [
                "Led development of web and mobile apps for tuberculosis and lung disease programmes across Myanmar, and mentored junior developers",
                "Built the Union Volunteer mobile app (React Native) used by healthcare workers across Myanmar",
                "Delivered a COVID-19 data reporting system during the pandemic",
                "Developed a national-level API gateway shared by multiple healthcare organisations",
                "Built web applications and REST APIs with PHP and Laravel, gathering requirements directly from doctors and volunteers",
                "Introduced Docker-based deployment and CI/CD, and migrated legacy systems to a modern architecture without data loss"
            ]
        }],
        title: "Software Developer",
        company: "International Union Against Tuberculosis and Lung Disease (The Union), Myanmar Office",
        type: "Full-time",
        startDate: "Jan 2019",
        endDate: "Jul 2023",
        location: "Mandalay, Myanmar",
        description: "Software Developer leading healthcare technology initiatives, developing web and mobile applications for patient data management and disease monitoring systems.",
        skills: ["Containerization", "Bootstrap", "React Native", "PHP", "Redux.js"],
        details: `<div class="space-y-4">
        <p>Software Developer and technical leader specializing in healthcare technology solutions for tuberculosis and lung disease programs. Led development of critical data management systems used by healthcare organizations across Myanmar. Expertise in full-stack development, mobile applications, and mentoring junior developers while maintaining high code quality standards.</p>
        
        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Responsibilities</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Lead and mentor junior developers in best practices and technical skill development</li>
            <li>Design and develop web applications using PHP, Laravel, and modern JavaScript frameworks</li>
            <li>Create cross-platform mobile applications using React Native for iOS and Android</li>
            <li>Implement responsive frontend designs with Bootstrap and custom CSS</li>
            <li>Build RESTful APIs and manage state using Redux.js for complex applications</li>
            <li>Establish CI/CD pipelines and containerization using Docker for deployment</li>
            <li>Collaborate with healthcare professionals including doctors and volunteers to gather requirements</li>
            <li>Ensure data security and compliance with healthcare regulations</li>
            <li>Conduct code reviews and maintain high standards of code quality and test coverage</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Achievements</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Led development of Union Volunteer mobile app used by 500+ healthcare workers across Myanmar</li>
            <li>Successfully deployed C19 Data Report system during COVID-19 pandemic processing 10,000+ patient records</li>
            <li>Developed national-level API Gateway serving multiple healthcare organizations with 99.8% uptime</li>
            <li>Reduced data processing time by 70% through optimized database design and query optimization</li>
            <li>Established development team mentoring program improving team productivity by 40%</li>
            <li>Implemented container-based deployment reducing deployment issues by 85%</li>
            <li>Created comprehensive patient monitoring systems improving healthcare delivery efficiency</li>
            <li>Successfully migrated legacy systems to modern architecture with zero data loss</li>
          </ul>
        </div>
      </div>`
    }
];