const ProjectShowcase = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">   
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-blue-600 dark:text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold">COMING SOON</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Exciting projects are being prepared for showcase. Stay tuned for updates on my latest work and contributions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;