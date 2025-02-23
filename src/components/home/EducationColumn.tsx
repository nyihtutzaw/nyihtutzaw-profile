interface Education {
  logo: string;
  logoAlt: string;
  period: string;
  degree: string;
  institution: string;
  skills?: string[];
  grade?: string;
}

const educationData: Education[] = [
  {
    logo: "/education/uclan.png",
    logoAlt: "UCLan Logo",
    period: "Dec 2016 - July 2018",
    degree: "Business Communication and Information Systems",
    institution: "University of Central Lancashire",
    grade: "Degree"
  },
  {
    logo: "/education/ncc.jpeg",
    logoAlt: "NCC Logo",
    period: "Dec 2015 - Dec 2016",
    degree: "Level 5 Diploma In Computing",
    institution: "NCC Education",
    grade: "Level 5"
  },
  {
    logo: "/education/ncc.jpeg",
    logoAlt: "NCC Logo",
    period: "Dec 2014 - Dec 2015",
    degree: "Level 4 diploma in Computing",
    institution: "NCC Education",
    grade: "Level 4"
  }
];

const EducationColumn = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((education, index) => (
          <div key={index} className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 mb-4 mx-auto">
              <img
                src={education.logo}
                alt={education.logoAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center text-center">
              <div className="text-sm text-myColor-500 dark:text-myColor-300 font-semibold">{education.period}</div>
              <h3 className="text-xl font-bold mb-1">{education.degree}</h3>
              <p className="text-gray-600 dark:text-gray-300">{education.institution}</p>
              {education.grade && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Grade: {education.grade}</p>
              )}
              {education.skills && education.skills.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Skills: {education.skills.join(' • ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EducationColumn;