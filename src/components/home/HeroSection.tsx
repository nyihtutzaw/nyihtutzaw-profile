'use client';
import { generateCV } from '@/utils/generateCV';

const HeroSection = () => (
  <section className="relative py-16 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAzIj48Y2lyY2xlIGN4PSIzMCIgeT0iMzAiIHI9IjEwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
    
    <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
      <div className="flex flex-col items-center lg:items-start">
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative w-48 h-48 md:w-56 md:h-56 relative">
            <img
              src="/profile.png"
              alt="Profile"
              className="rounded-2xl object-cover w-full h-full border-4 border-white/50 dark:border-gray-700 shadow-2xl"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <a
            href="mailto:nyihtutzaw.2015@gmail.com"
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-red-500 hover:text-red-600"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nyi-htut-zaw-9b741115a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-blue-600 hover:text-blue-700 dark:text-blue-400"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
            </svg>
          </a>
          <a
            href="https://github.com/nyihtutzaw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 000 10.333c0 4.411 2.889 8.133 6.889 9.444.5.089.678-.2.678-.444 0-.222-.012-.967-.012-1.767-2.522.466-3.178-.611-3.378-1.178-.113-.289-.6-1.178-1.023-1.178-.35 0-.856.311-.856.611 0 .444.6.444 1.011.467 1.2.222 1.556 1.178 1.556 1.178.889 1.533 2.444.989 3.056.756.089-.667.356-1.122.644-1.378-2.244-.244-4.6-1.111-4.6-4.956 0-1.1.389-2 1.044-2.711-.1-.255-.452-1.3.1-2.711 0 0 .856-.267 2.8 1.044.811-.222 1.689-.333 2.556-.333s1.744.111 2.556.333c1.944-1.333 2.8-1.044 2.8-1.044.552 1.411.2 2.456.1 2.711.655.711 1.044 1.611 1.044 2.711 0 3.867-2.356 4.711-4.6 4.956.378.322.7.944.7 1.922 0 1.389-.011 2.489-.011 2.833 0 .244.178.533.678.444A10.036 10.036 0 0020 10.333C20 4.778 15.523.333 10 .333z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="text-center lg:text-left flex-1">
        <div className="inline-flex items-center px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Available for new opportunities
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-gray-900 dark:text-white">Hi, I'm </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Nyi Htut Zaw</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
          Senior AI Engineer
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Building AI-powered solutions that transform businesses. With expertise in Generative AI, 
          LLM integration, and full-stack development, I craft robust solutions across diverse technology stacks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            onClick={generateCV}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </button>
          <a
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            View My Work
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;