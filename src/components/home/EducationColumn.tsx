import { educationData } from "@/data/education";


const EducationColumn = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((education, index) => (
          <div 
            key={index} 
            className={`flex flex-col p-6 rounded-lg shadow-md relative overflow-hidden ${
              education.isHighlighted 
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-600' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            {/* Current Badge */}
            {education.isCurrent && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  CURRENT
                </span>
              </div>
            )}
            
            {/* Highest Degree Badge */}
            {education.isHighlighted && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  HIGHEST DEGREE
                </span>
              </div>
            )}
            
            <div className={`w-16 h-16 mb-4 mx-auto ${education.isHighlighted ? 'mt-6' : ''}`}>
              <img
                src={education.logo}
                alt={education.logoAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center text-center">
              <div className={`text-sm font-semibold ${
                education.isHighlighted 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-myColor-500 dark:text-myColor-300'
              }`}>
                {education.period}
              </div>
              <h3 className={`text-xl font-bold mb-1 ${
                education.isHighlighted 
                  ? 'text-gray-900 dark:text-white text-lg' 
                  : 'text-xl'
              }`}>
                {education.degree}
              </h3>
              <p className={`${
                education.isHighlighted 
                  ? 'text-gray-700 dark:text-gray-200 font-medium' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {education.institution}
              </p>
              {education.grade && (
                <p className={`text-sm mt-1 ${
                  education.isHighlighted 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {education.grade}
                </p>
              )}
              {education.skills && education.skills.length > 0 && (
                <div className="mt-3">
                  <p className={`text-sm ${
                    education.isHighlighted 
                      ? 'text-gray-700 dark:text-gray-200' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <span className="font-semibold">Focus:</span> {education.skills.join(' • ')}
                  </p>
                </div>
              )}
              
              {/* Special indicator for highlighted degree */}
              {education.isHighlighted && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Advancing expertise in AI & Machine Learning
                    </span>
                  </div>
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