-- =============================================
-- Seed Data - Migrate existing static content
-- Run this in Supabase SQL Editor AFTER schema.sql
-- =============================================

-- =============================================
-- PROFILE
-- =============================================
INSERT INTO profile (name, title, bio, email, location, linkedin_url, github_url, medium_url)
VALUES (
  'Nyi Htut Zaw',
  'Senior Software Engineer',
  'With extensive experience in web, mobile, and AI-powered applications, I deliver robust solutions across diverse technology stacks. I provide technical consulting for IT projects and share my expertise through software development mentorship.',
  'nyihtutzaw.2015@gmail.com',
  'Bangkok, Thailand',
  'https://www.linkedin.com/in/nyi-htut-zaw-9b741115a/',
  'https://github.com/nyihtutzaw',
  'https://medium.com/@nyihtutzaw.2015'
);

-- =============================================
-- ABOUT SECTION
-- =============================================
INSERT INTO about (intro_title, intro_paragraphs)
VALUES (
  'More Than Just Code',
  ARRAY[
    'I believe technology should serve humanity. Throughout my career, I''ve focused on creating solutions that make a real difference - whether it''s healthcare systems that save lives or AI applications that unlock human potential.',
    'Based in Bangkok, Thailand, I bring a global perspective to every project, having worked with clients and teams across Asia and beyond. My approach combines technical expertise with a deep understanding of business needs and user experiences.'
  ]
);

-- Core Values
INSERT INTO core_values (title, description, icon, sort_order) VALUES
('Innovation', 'Constantly exploring new technologies and approaches to solve complex problems', 'LightBulbIcon', 1),
('Quality', 'Committed to writing clean, maintainable code and delivering exceptional user experiences', 'CodeBracketIcon', 2),
('Growth', 'Continuous learning and skill development to stay at the forefront of technology', 'AcademicCapIcon', 3);

-- Timeline Events
INSERT INTO timeline_events (year, title, description, icon, color, sort_order) VALUES
('2017-2019', 'Early Development Journey', 'Started as a freelance developer while teaching programming, gaining hands-on experience with modern web technologies and building foundational skills.', 'CodeBracketIcon', 'from-blue-500 to-blue-600', 1),
('2019-2024', 'Healthcare Tech Leadership', 'Led development teams at Union Myanmar, implementing scalable healthcare solutions and mentoring junior developers while mastering cloud technologies.', 'HeartIcon', 'from-green-500 to-green-600', 2),
('2023-2024', 'E-Commerce Excellence', 'Developed robust e-commerce platforms for Japanese brands, specializing in Magento customization and React-based frontend solutions.', 'CloudArrowUpIcon', 'from-purple-500 to-purple-600', 3),
('2024-2025', 'Cybersecurity Innovation', 'Led AI-powered security solutions development at RV Connex, integrating advanced technologies for enterprise-level protection systems.', 'LightBulbIcon', 'from-red-500 to-red-600', 4),
('2024-Present', 'AI-Powered Future', 'Senior Software Engineer at ArcFusion, developing cutting-edge Generative AI applications using Python, Golang, and modern cloud technologies.', 'RocketLaunchIcon', 'from-indigo-500 to-indigo-600', 5);

-- =============================================
-- WORK EXPERIENCE
-- =============================================
INSERT INTO work_experience (logo_alt, title, company, employment_type, period, location, description, skills, details, show_in_cv, sort_order) VALUES
('ArcFusion Logo', 'Senior Software Engineer', 'ArcFusion', 'Full-time', 'Oct 2024 - Present · 2 mos', 'Bangkok, Thailand · On-site', 'Senior Software Engineer developing cutting-edge Generative AI applications and solutions for enterprise clients.', ARRAY['Python', 'Golang', 'Google Cloud', 'Gemini APIs', 'OpenAI APIs', 'Hugging Face', 'LangChain', 'LangGraph', 'Langfuse'], '<div class="space-y-4">
  <p>Senior Software Engineer specializing in Generative AI development at ArcFusion, a leading AI company based in Bangkok. Focused on building innovative AI-powered applications and solutions that leverage cutting-edge machine learning technologies to solve complex business problems.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Responsibilities</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Develop and deploy Generative AI applications using Python and Golang for high-performance solutions</li>
      <li>Design and implement AI-powered solutions leveraging Google Cloud infrastructure for scalability</li>
      <li>Utilize LangChain and LangGraph for building complex AI workflows and agent-based systems</li>
      <li>Integrate Gemini APIs and OpenAI APIs for advanced natural language processing and generation tasks</li>
      <li>Implement Hugging Face models for custom AI applications and fine-tuning</li>
      <li>Build scalable backend services using Golang for AI model serving and API endpoints</li>
      <li>Deploy and manage AI applications on Google Cloud Platform ensuring high availability</li>
      <li>Implement Langfuse for monitoring and observability of AI applications and model performance</li>
      <li>Optimize AI model performance and implement efficient inference pipelines</li>
      <li>Collaborate with cross-functional teams including data scientists and product managers</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Achievements</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Currently developing DataStory - a cutting-edge Generative AI application for enterprise data analysis and insights</li>
      <li>Implementing advanced AI workflows using LangChain and LangGraph for complex data processing pipelines</li>
      <li>Integrating Gemini and OpenAI APIs to power intelligent data storytelling and visualization features</li>
      <li>Building scalable backend services with Golang to handle large-scale data processing and AI model serving</li>
      <li>Deploying and optimizing the application on Google Cloud Platform for enterprise-level performance</li>
    </ul>
  </div>
</div>', true, 1),

('RV Connex Logo', 'Senior Full Stack Engineer', 'RV Connex', 'Full-time', 'Sep 2024 - Sep 2025 · 1 yr 1 mos', 'Pathum Thani, Thailand · On-site', 'Senior Full Stack Engineer leading development of AI-powered cybersecurity platform, coordinating cross-functional teams to deliver comprehensive security solutions with data pipelines, automated investigation systems, and mobile applications.', ARRAY['TypeScript', 'Python', 'Cypher Security', 'Redux.js', 'Tailwind CSS', 'Apollo GraphQL', 'monorepo', 'XDR', 'EDR', 'Flowbite'], '<div class="space-y-4">
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
</div>', true, 2),

('Magic Box Solutions Logo', 'Senior Full Stack Engineer', 'Magic Box Solutions', 'Full-time', 'Aug 2023 - Sep 2024 · 1 yr 2 mos', 'Bangkok, Bangkok City, Thailand', 'Senior Full Stack Engineer developing robust e-commerce solutions for Japanese brands and global clothing companies using Magento, React, and modern web technologies.', ARRAY['Magento', 'React Native', 'React.js', 'Node.js', 'Amazon Web Services (AWS)', 'GitLab'], '<div class="space-y-4">
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
      </div>', true, 3),

('Hey Myanmar Logo', 'Software Engineer', 'Hey Myanmar', 'Contract', 'Oct 2023 - May 2024 · 8 mos', 'Online · Remote', 'Senior Software Engineer providing technical expertise for heymyanmar.com platform development using Express.js and cloud technologies.', ARRAY['Express.js', 'PostgreSQL', 'MUI', 'AWS Elastic Beanstalk'], '<div class="space-y-4">
        <p>Senior Software Engineer contracted to develop and enhance the heymyanmar.com platform. Focused on building scalable web applications with modern JavaScript stack, implementing robust backend services, and ensuring optimal deployment on AWS cloud infrastructure.</p>
        
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
      </div>', false, 4),

('Senyou Logo', 'React Developer', '株式会社Senyou', 'Full-time', 'Feb 2022 - Jul 2023 · 1 yr 6 mos', 'Remote', 'React Developer building modern web applications for Japanese clients using React.js and TypeScript with focus on performance and user experience.', ARRAY['React.js', 'TypeScript'], '<div class="space-y-4">
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
      </div>', false, 5),

('The Union Logo', 'Software Developer', 'International Union Against Tuberculosis and Lung Disease (The Union), Myanmar Office', 'Full-time', 'Jan 2019 - Jul 2023 · 4 yrs 7 mos', 'Mandalay, Myanmar', 'Software Developer leading healthcare technology initiatives, developing web and mobile applications for patient data management and disease monitoring systems.', ARRAY['Containerization', 'Bootstrap', 'React Native', 'PHP', 'Redux.js'], '<div class="space-y-4">
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
      </div>', true, 6);

-- =============================================
-- EDUCATION
-- =============================================
INSERT INTO education (logo_alt, period, degree, institution, grade, skills, is_current, is_highlighted, sort_order) VALUES
('Mahidol University Logo', 'Dec 2025 - Present', 'Master of Science in Computer Science', 'Mahidol University', 'In Progress', ARRAY['Machine Learning', 'Artificial Intelligence', 'Advanced Algorithms', 'Data Structures'], true, true, 1),
('UCLan Logo', 'Dec 2016 - July 2018', 'Business Communication and Information Systems', 'University of Central Lancashire', 'Degree', NULL, false, false, 2),
('NCC Logo', 'Dec 2015 - Dec 2016', 'Level 5 Diploma In Computing', 'NCC Education', 'Level 5', NULL, false, false, 3),
('NCC Logo', 'Dec 2014 - Dec 2015', 'Level 4 diploma in Computing', 'NCC Education', 'Level 4', NULL, false, false, 4);

-- =============================================
-- SKILL GROUPS AND SKILLS
-- =============================================
INSERT INTO skill_groups (id, name, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Programming', 1),
('22222222-2222-2222-2222-222222222222', 'Frameworks', 2),
('33333333-3333-3333-3333-333333333333', 'Devops', 3),
('44444444-4444-4444-4444-444444444444', 'AI', 4),
('55555555-5555-5555-5555-555555555555', 'Web3', 5);

-- Programming Skills
INSERT INTO skills (group_id, name, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Javascript', 1),
('11111111-1111-1111-1111-111111111111', 'Typescript', 2),
('11111111-1111-1111-1111-111111111111', 'PHP', 3),
('11111111-1111-1111-1111-111111111111', 'Dart', 4),
('11111111-1111-1111-1111-111111111111', 'Python', 5),
('11111111-1111-1111-1111-111111111111', 'Go', 6);

-- Framework Skills
INSERT INTO skills (group_id, name, sort_order) VALUES
('22222222-2222-2222-2222-222222222222', 'React', 1),
('22222222-2222-2222-2222-222222222222', 'React.js', 2),
('22222222-2222-2222-2222-222222222222', 'Fast Api', 3),
('22222222-2222-2222-2222-222222222222', 'Echo', 4),
('22222222-2222-2222-2222-222222222222', 'Laravel', 5),
('22222222-2222-2222-2222-222222222222', 'Express', 6),
('22222222-2222-2222-2222-222222222222', 'Strapi', 7),
('22222222-2222-2222-2222-222222222222', 'Elysia', 8),
('22222222-2222-2222-2222-222222222222', 'Flutter', 9),
('22222222-2222-2222-2222-222222222222', 'React Native', 10);

-- DevOps Skills
INSERT INTO skills (group_id, name, sort_order) VALUES
('33333333-3333-3333-3333-333333333333', 'AWS', 1),
('33333333-3333-3333-3333-333333333333', 'Docker', 2),
('33333333-3333-3333-3333-333333333333', 'Kubernetes', 3),
('33333333-3333-3333-3333-333333333333', 'Github Actions', 4),
('33333333-3333-3333-3333-333333333333', 'Circle CI', 5),
('33333333-3333-3333-3333-333333333333', 'Jenkins', 6),
('33333333-3333-3333-3333-333333333333', 'Terraform', 7),
('33333333-3333-3333-3333-333333333333', 'Grafana', 8),
('33333333-3333-3333-3333-333333333333', 'ELK Stack', 9);

-- AI Skills
INSERT INTO skills (group_id, name, sort_order) VALUES
('44444444-4444-4444-4444-444444444444', 'OpenAI GPT', 1),
('44444444-4444-4444-4444-444444444444', 'Claude', 2),
('44444444-4444-4444-4444-444444444444', 'Langchain', 3),
('44444444-4444-4444-4444-444444444444', 'Hugging Face', 4),
('44444444-4444-4444-4444-444444444444', 'PyTorch', 5),
('44444444-4444-4444-4444-444444444444', 'Vercel AI', 6);

-- Web3 Skills
INSERT INTO skills (group_id, name, sort_order) VALUES
('55555555-5555-5555-5555-555555555555', 'Solidity', 1),
('55555555-5555-5555-5555-555555555555', 'Hardhat', 2),
('55555555-5555-5555-5555-555555555555', 'Truffle', 3),
('55555555-5555-5555-5555-555555555555', 'Web3.js', 4),
('55555555-5555-5555-5555-555555555555', 'Ethers.js', 5),
('55555555-5555-5555-5555-555555555555', 'MetaMask', 6);

-- =============================================
-- CERTIFICATIONS
-- =============================================
INSERT INTO certifications (title, issued_by, date, sort_order) VALUES
('AI For Everyone', 'Deep Learning AI', '2025', 1),
('Supervised Machine Learning: Regression and Classification', 'Deep Learning AI', '2024', 2),
('Blockchain Expert', 'Algoexport', '2024', 3),
('English Proficiency', 'Duolingo', '2024', 4),
('Advanced React', 'Meta', '2023', 5);
