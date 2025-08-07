
interface WorkExperience {
    logo: string;
    logoAlt: string;
    title: string;
    company: string;
    type: string;
    period: string;
    location: string;
    description?: string;
    skills?: string[];
    details?: string;
    showInCV?:boolean;
}

export const workExperienceData: WorkExperience[] = [
    {
        logo: "/work/rv.jpeg",
        logoAlt: "RV Connex Logo",
        title: "Senior Full Stack Engineer",
        company: "RV Connex",
        type: "Full-time",
        period: `Sep 2024 - Present ·  ${((d, y = d.getUTCFullYear() - 2024, m = d.getUTCMonth() - 8 + (y * 12)) => y < 1 ? `${m} months` : `${Math.floor(m/12)>=1?Math.floor(m/12) "yr, ":""} ${m % 12} months`)(new Date())}`,
        location: "Pathum Thani, Thailand · On-site",
        showInCV:true,
        description: "Leading a software development team for AI-Powered Cypher Security Software Solution.",
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
        period: "Aug 2023 - Sep 2024 · 1 yr 2 mos",
        showInCV:true,
        location: "Bangkok, Bangkok City, Thailand",
        description: "Developed e-commerce projects for Japanese brands and global clothing company.",
        skills: ["Magento", "React Native", "React.js", "nextjs", "nodejs", "Amazon Web Services (AWS)", "Gitlab"],
        details: `<div class="space-y-4">
        <p>Highly skilled and results-oriented full-stack developer with a proven track record of designing, developing, deploying, and maintaining robust e-commerce applications. Possesses expertise in various technologies like Express.js, Next.js, ASP.NET Core, and PHP, coupled with a strong understanding of AWS services for efficient deployment and monitoring. Demonstrated experience in system migration projects for e-commerce platforms, ensuring seamless transitions and maintaining a focus on performance and scalability.</p>
        
        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Key Skills</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li><span class="font-medium">Full-Stack Development:</span> Proficient in front-end (Next.js) and back-end (Express.js, ASP.NET Core, PHP) development, creating seamless user experiences and implementing complex business logic.</li>
            <li><span class="font-medium">E-Commerce Development:</span> Extensive experience in building and maintaining e-commerce applications, ensuring robust functionalities like product management, shopping cart, payment processing, and user accounts.</li>
            <li><span class="font-medium">System Migration:</span> Successfully migrated commerce applications to new platforms, minimizing downtime and ensuring data integrity.</li>
            <li><span class="font-medium">Deployment and Monitoring:</span> Adept at deploying applications to AWS using best practices and leveraging AWS services for monitoring performance and identifying potential issues.</li>
            <li><span class="font-medium">Cloud Technologies:</span> Skilled in utilizing AWS services for scaling, security, and efficient resource management.</li>
            <li><span class="font-medium">Adaptability and Learning:</span> Enthusiastic about learning new technologies and adapting to evolving e-commerce trends.</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold text-lg">Experience</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li><span class="font-medium">Kindcare V2</span> - (2023) - Present : Maintain online store website developed by PHP Magento for UI modification, Order Management and customer management.</li>
            <li><span class="font-medium">Kindcare V3</span> - (2023) - Present : Develop new version of online store which is developed by PHP Magento. I have to mainly work for important modules such as authentication, checkout flow, online payment, cash on delivery management, order management and reward point management.</li>
            <li><span class="font-medium">Migration Kindcare V2 to V3</span> - (2023)- Present : Developed migration scripts by Javascript for importing old data and assets into new system.</li>
          </ul>
        </div>
      </div>`
    },
    {
        logo: "/work/heymm.jpeg",
        logoAlt: "Hey Myanmar Logo",
        title: "Software Engineer",
        company: "Hey Myanmar",
        type: "Contract",
        period: "Oct 2023 - May 2024 · 8 mos",
        location: "Online · Remote",
        description: "Help for a project called heymyanmar.com as a senior software engineer.",
        skills: ["nextjs", "Express.js", "PostgreSQL", "MUI", "AWS Elastic Beanstalk"]
    },
    {
        logo: "/work/senyou.jpeg",
        logoAlt: "Senyou Logo",
        title: "React Developer",
        company: "株式会社Senyou",
        type: "Full-time",
        period: "Feb 2022 - Jul 2023 · 1 yr 6 mos",
        location: "Remote",
        description: "Developing React Web Application for a japanses client",
        skills: ["Next.js", "React.js", "TypeScript"]
    },
    {
        logo: "/work/union.jpeg",
        logoAlt: "The Union Logo",
        showInCV:true,
        title: "Software Developer",
        company: "International Union Against Tuberculosis and Lung Disease (The Union), Myanmar Office",
        type: "Full-time",
        period: "Jan 2019 - Jul 2023 · 4 yrs 7 mos",
        location: "Mandalay, Myanmar",
        description: "Developing webapps and mobile apps for data recording and reporting processes.",
        skills: ["Containerization", "Bootstrap", "React Native", "PHP", "Redux.js"],
        details: `<div class="space-y-4">
  <p>Highly motivated and results-oriented software engineer with extensive experience leading junior developers, designing and developing complex in-house projects, and fostering a culture of quality and continuous improvement. Proven ability to manage all aspects of the software development lifecycle, from CI/CD pipelines and containerization to data recording and reporting systems. Skilled in training and mentoring junior developers, ensuring code quality and test coverage, and collaborating effectively with diverse stakeholders such as doctors, volunteers, and patients. Adept at leveraging various technologies including Laravel, Express.js, React, Flutter, Agora, AWS Lambda, Kong, and AWS API Gateway.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Skills</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li><span class="font-medium">Technical Leadership:</span> Leading and mentoring junior developers, fostering collaboration and knowledge sharing.</li>
      <li><span class="font-medium">Full-Stack Development:</span> Proficient in front-end (React, Flutter), back-end (Laravel, Express.js), and serverless development (AWS Lambda).</li>
      <li><span class="font-medium">CI/CD and Containerization:</span> Implementing automated build, test, and deployment pipelines using robust CI/CD practices and containerization technologies.</li>
      <li><span class="font-medium">Data Management:</span> Designing and developing data recording and reporting systems to extract valuable insights.</li>
      <li><span class="font-medium">API Gateway Development:</span> Leveraging Kong and AWS API Gateway to create efficient API gateways for microservices architectures.</li>
      <li><span class="font-medium">Communication and Training:</span> Effectively communicating technical concepts to diverse stakeholders (doctors, volunteers, patients) and training junior developers for skill enhancement.</li>
      <li><span class="font-medium">Quality Assurance:</span> Maintaining high code quality and test coverage through code reviews, best practices, and unit testing.</li>
      <li><span class="font-medium">Technical Expertise:</span> Skilled in a wide range of technologies including Laravel, Express.js, React, Flutter, Agora, AWS Lambda, Kong, and AWS API Gateway.</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Projects</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li><span class="font-medium">Union Volunteer</span> - (2019) - (2023) Mobile application that volunteers of organization are using to collect data, submit data to main office, track and monitor patients. It is developed by Flutter.</li>
      <li><span class="font-medium">Union Volunteer PA Web</span> - (2019) - (2023) Web application that users can analyze and report patient data. Provide monitoring to the patients. Users from management level are also using this application to view overall report of the project.</li>
      <li><span class="font-medium">C19 Data Report</span> - (2020) - (2021) application that we developed to collect data of Covid patients and monitor them. It also include inventory management for the medicine, tools and prevention materials for Covid patients.</li>
      <li><span class="font-medium">API Gateway for patients</span> - (2022) - (2023) a platform that is used as national level. Clients from different organizations can consume our api to submit their patient data and validate the patients are existing or not by using similarly.</li>
    </ul>
  </div>
</div>`
    },
    {
        logo: "/work/nexstack.png",
        logoAlt: "Nexstack Logo",
        showInCV:true,
        title: "Full Stack Engineer",
        company: "Nexstack",
        type: "Part-time",
        period: "Mar 2017 - Jan 2019 · 1 yr 11 mos",
        location: "Singapore · Remote",
        description: "Participated in developing  the system called Supplier Portal.",
        skills: ["Containerization", "TypeScript", "Next.js", "Figma", "Software Development", "Strapi.js", "Agile Project Management", "React Native", "React.js", "GraphQL", "Apollo GraphQL"],
        details: `<div class="space-y-4">
  <p>Seasoned Lead Software Engineer with extensive experience leading and mentoring cross-functional developer teams (12+ developers). Proven ability to drive efficient system design, code structure, and microservice implementation while fostering a culture of quality and continuous improvement. Adept at collaborating with foreign clients, conducting technical training, and establishing clear coding standards. Skilled in leveraging Git, CI/CD pipelines, and API gateways to ensure streamlined development and data integration.</p>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Key Responsibilities</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li>Lead and mentor 3 distinct developer teams, fostering collaboration and knowledge sharing.</li>
      <li>Champion strong system design principles, code structure best practices, and microservice architecture.</li>
      <li>Participate in client meetings with foreign stakeholders, presenting technical solutions and roadmaps.</li>
      <li>Train junior developers on coding best practices and quality assurance methodologies.</li>
      <li>Review and merge code contributions from junior developers, ensuring code quality and adherence to standards.</li>
      <li>Define and enforce standard rules for code structure and unit testing methodologies.</li>
      <li>Design and implement API gateways for efficient data sharing across microservices.</li>
      <li>Develop and maintain robust CI/CD pipelines utilizing Github Actions for automated testing and deployment.</li>
    </ul>
  </div>

  <div class="space-y-3">
    <h4 class="font-semibold text-lg">Projects</h4>
    <ul class="list-disc pl-5 space-y-2">
      <li><span class="font-medium">Supplier Portal</span> - (2017) - (2019) Developed an online platform for a singapore supermarket that suppliers can submit product information utilizing Nodejs, Strapijs for backend functionality and a user-friendly Nextjs Typescript frontend.</li>
      <li><span class="font-medium">Procard</span> - (2017) - (2018) Developed an application platform that business owner can share business card and personal card utilizing Nodejs, Strapijs for backend functionality and a user-friendly Nextjs Typescript frontend.</li>
    </ul>
  </div>
</div>`
    }
];