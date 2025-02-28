'use client';

import { workExperienceData } from "@/data/experience";
import { useState } from "react";



const WorkExperienceColumn = () => {'use client';
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
      <div className="space-y-8">
        {workExperienceData.map((experience, index) => (
          <div key={index} className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
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
                {
                  experience.details && (
                    <button
                    onClick={() => toggleDetails(index)}
                    className="mt-4 px-4 py-2 bg-myColor-500 text-white rounded-md hover:bg-myColor-600 transition-colors"
                  >
                    {expandedIndex === index ? 'Hide Details' : 'View Details'}
                  </button>
                  )
                }
             
              </div>
            </div>
            {expandedIndex === index && experience.details && (
              <div className="mt-4 pl-20">
                <div 
                    className="border-l-2 border-myColor-500 pl-4 space-y-2"
                    dangerouslySetInnerHTML={{ __html: experience.details }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceColumn;