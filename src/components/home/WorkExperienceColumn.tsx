const WorkExperienceColumn = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
    <div className="space-y-8">
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/rv-connex-logo.png"
            alt="RV Connex Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">2024 - Present</div>
          <h3 className="text-xl font-bold mb-1">Lead Software Developer</h3>
          <p className="text-gray-600 dark:text-gray-300">RV Connex - Cypher Security</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/magic-box-logo.png"
            alt="Magic Box Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">2023 - 2024</div>
          <h3 className="text-xl font-bold mb-1">Senior Software Engineer</h3>
          <p className="text-gray-600 dark:text-gray-300">Magic Box Solution</p>
        </div>
      </div>
    </div>
  </div>
);

export default WorkExperienceColumn;