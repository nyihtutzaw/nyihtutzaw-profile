const EducationColumn = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
    <div className="space-y-8">
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/ucsm-logo.png"
            alt="UCSM Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-h-[100px] flex flex-col justify-center">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">2015 - 2020</div>
          <h3 className="text-xl font-bold mb-1">Bachelor of Computer Science</h3>
          <p className="text-gray-600 dark:text-gray-300">University of Computer Studies, Mandalay</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="/mit-logo.png"
            alt="MIT Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">2021</div>
          <h3 className="text-xl font-bold mb-1">Professional Certificate in Cloud Development</h3>
          <p className="text-gray-600 dark:text-gray-300">MIT Professional Education</p>
        </div>
      </div>
    </div>
  </div>
);

export default EducationColumn;