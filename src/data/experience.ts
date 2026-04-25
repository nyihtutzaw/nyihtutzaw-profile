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
        description: "Senior AI Engineer developing AI agents for consumer brands - optimizing pricing, promotions, and assortment for revenue growth.",
        skills: ["Python", "Golang", "AWS", "Gemini APIs", "OpenAI APIs", "Hugging Face", "LangChain", "LangGraph", "Langfuse"],
        details: `
         <div class="space-y-4">
  <p>Senior AI Engineer at Sciemo (AI built for consumer brands) developing AI agents for Revenue Growth Management. Building intelligent automation for trade spend optimization, pricing, promotion calendars, assortment, and demand forecasting for consumer goods brands.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Responsibilities</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Develop and maintain AI agents for Revenue Growth Management (Trade, Pricing, Promotion, Assortment, Forecast)</li>
      <li>Build AI automation for promotion optimization - simulate outcomes, monitor performance, optimize trade spend</li>
      <li>Implement pricing agents using cross elasticities and competitive dynamics modeling</li>
      <li>Create assortment optimization agents for SKU rationalization and regional localization</li>
      <li>Build demand forecasting agents unifying consumer signals and market trends</li>
      <li>Design and implement AI agent frameworks using LangChain and LangGraph</li>
      <li>Create CI/CD pipelines for multi-tenant client deployments on AWS ensuring scalability and isolation</li>
      <li>Integrate with BluePlanner for unified promotion management</li>
      <li>Develop and deploy Generative AI applications using Python and Golang on AWS (ECS, Lambda, SageMaker)</li>
      <li>Implement Langfuse for monitoring and observability of AI applications</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Achievements</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Built AI agents for trade spend optimization reducing wasted promotions</li>
      <li>Developed promotion optimization agents with outcome simulation capabilities</li>
      <li>Implemented CI/CD pipelines for multi-tenant SaaS deployments on AWS</li>
      <li>Integrated BluePlanner for seamless promotion management across channels</li>
      <li>Deployed scalable AI services on AWS (ECS, SageMaker, Lambda)</li>
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
      <li>Successfully integrated multiple security data sources into a unified platform.</li>
      <li>Implemented real-time alert processing system handling thousands of security events.</li>
      <li>Developed mobile application framework for secure access to the platform.</li>
      <li>Established efficient workflow between SOC analysts and AI-powered investigation system.</li>
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
        location: "Bangkok, Bangkok City, Thailand",
        showInCV: true,
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
        logo: "/work/heymm.jpeg",
        logoAlt: "Hey Myanmar Logo",
        title: "Senior Software Engineer",
        company: "Hey Myanmar",
        type: "Contract",
        startDate: "Oct 2023",
        endDate: "May 2024",
        location: "Online · Remote",
        description: "Senior AI Engineer providing technical expertise for heymyanmar.com platform development using Express.js and cloud technologies.",
        skills: ["Express.js", "PostgreSQL", "MUI", "AWS Elastic Beanstalk"],
        details: `<div class="space-y-4">
        <p>Senior AI Engineer contracted to develop and enhance the heymyanmar.com platform. Focused on building scalable web applications with modern JavaScript stack, implementing robust backend services, and ensuring optimal deployment on AWS cloud infrastructure.</p>
        
        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Responsibilities</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Develop full-stack web applications using React.js for frontend and Express.js for backend services</li>
            <li>Design and implement PostgreSQL database schemas for efficient data management</li>
            <li>Create responsive user interfaces using Material-UI (MUI) component library</li>
            <li>Build RESTful APIs for data communication between frontend and backend systems</li>
            <li>Deploy and manage applications on AWS Elastic Beanstalk for scalable hosting</li>
            <li>Implement authentication and authorization systems for secure user access</li>
            <li>Optimize application performance and ensure cross-browser compatibility</li>
            <li>Collaborate with remote team members using agile development methodologies</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Achievements</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Successfully deployed heymyanmar.com platform on AWS with 99.9% uptime</li>
            <li>Implemented responsive design improving mobile user engagement by 35%</li>
            <li>Optimized database queries reducing page load times by 50%</li>
            <li>Established automated deployment pipeline reducing release time by 70%</li>
            <li>Created modular component architecture improving code maintainability</li>
            <li>Integrated third-party APIs enhancing platform functionality and user experience</li>
          </ul>
        </div>
      </div>`
    },
    {
        logo: "/work/senyou.jpeg",
        logoAlt: "Senyou Logo",
        title: "React Developer",
        company: "株式会社Senyou",
        type: "Full-time",
        startDate: "Feb 2022",
        endDate: "Jul 2023",
        location: "Remote",
        description: "React Developer building modern web applications for Japanese clients using React.js and TypeScript with focus on performance and user experience.",
        skills: ["React.js", "TypeScript"],
        details: `<div class="space-y-4">
        <p>React Developer specializing in building modern web applications for Japanese clients. Expertise in React ecosystem including hooks, context API, and modern web technologies. Strong focus on creating responsive, high-performance applications with TypeScript for type safety and better developer experience.</p>
        
        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Responsibilities</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Develop interactive and responsive user interfaces using React.js and modern JavaScript patterns</li>
            <li>Implement modern web technologies for improved performance and SEO</li>
            <li>Utilize TypeScript for type-safe development and better code maintainability</li>
            <li>Create reusable React components following best practices and design patterns</li>
            <li>Implement state management using React Context API and custom hooks</li>
            <li>Optimize application performance through code splitting and lazy loading</li>
            <li>Collaborate with Japanese clients to gather requirements and deliver solutions</li>
            <li>Conduct code reviews and ensure adherence to coding standards</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Achievements</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li>Successfully delivered multiple React applications to Japanese clients with 100% satisfaction rate</li>
            <li>Improved application performance by 60% through optimization techniques</li>
            <li>Reduced bug reports by 45% through TypeScript implementation and better type safety</li>
            <li>Created component library used across multiple projects saving 30% development time</li>
            <li>Implemented responsive design achieving 95% mobile usability score</li>
            <li>Established coding standards and best practices adopted by the development team</li>
          </ul>
        </div>
      </div>`
    },
    {
        logo: "/work/union.jpeg",
        logoAlt: "The Union Logo",
        showInCV: true,
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