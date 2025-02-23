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
}

const workExperienceData: WorkExperience[] = [
  {
    logo: "/work/rv.jpeg",
    logoAlt: "RV Connex Logo",
    title: "Senior Full Stack Engineer",
    company: "RV Connex",
    type: "Full-time",
    period: "Sep 2024 - Present · 6 mos",
    location: "Pathum Thani, Thailand · On-site",
    description: "Leading a software development team for AI-Powered Cypher Security Software Solution.",
    skills: ["TypeScript","Pythong","Cypher Security", "Redux.js", "Tailwind CSS", "Apollo GraphQL", "monorepo", "XDR", "EDR", "Flowbite"]
  },
  {
    logo: "/work/mbs.jpeg",
    logoAlt: "Magic Box Solutions Logo",
    title: "Senior Full Stack Engineer",
    company: "Magic Box Solutions",
    type: "Full-time",
    period: "Aug 2023 - Sep 2024 · 1 yr 2 mos",
    location: "Bangkok, Bangkok City, Thailand",
    description: "Developed e-commerce projects for Japanese brands and global clothing company.",
    skills: ["Magento", "React Native", "React.js", "nextjs", "nodejs", "Amazon Web Services (AWS)", "Gitlab"]
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
    title: "Software Developer",
    company: "International Union Against Tuberculosis and Lung Disease (The Union), Myanmar Office",
    type: "Full-time",
    period: "Jan 2019 - Jul 2023 · 4 yrs 7 mos",
    location: "Mandalay, Myanmar",
    description: "Developing webapps and mobile apps for data recording and reporting processes.",
    skills: ["Containerization", "Bootstrap", "React Native", "PHP", "Redux.js"]
  },
  {
    logo: "/work/nexstack.png",
    logoAlt: "Nexstack Logo",
    title: "Full Stack Engineer",
    company: "Nexstack",
    type: "Part-time",
    period: "Mar 2017 - Jan 2019 · 1 yr 11 mos",
    location: "Singapore · Remote",
    description:"Participated in developing  the system called Supplier Portal.",
    skills: ["Containerization", "TypeScript", "Next.js", "Figma", "Software Development", "Strapi.js", "Agile Project Management", "React Native", "React.js", "GraphQL", "Apollo GraphQL"]
  }
];

const WorkExperienceColumn = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
    <div className="space-y-8">
      {workExperienceData.map((experience, index) => (
        <div key={index} className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={experience.logo}
              alt={experience.logoAlt}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="text-sm text-myColor-500 dark:text-myColor-300 font-semibold">{experience.period}</div>
            <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{experience.company}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {experience.type} · {experience.location}
            </p>
            {experience.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {experience.description}
              </p>
            )}
            {experience.skills && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs bg-myColor-100 text-myColor-700 dark:bg-myColor-800 dark:text-myColor-200 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WorkExperienceColumn;