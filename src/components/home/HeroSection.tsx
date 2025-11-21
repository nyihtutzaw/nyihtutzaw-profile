'use client';
import { generateCV } from '@/utils/generateCV';

const HeroSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-center gap-8 py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/20">
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 md:w-64 md:h-64 relative mb-4">
        <img
          src="/profile.png"
          alt="Profile"
          className="rounded-full object-cover w-full h-full border-4 border-blue-500 shadow-lg"
        />
      </div>
      <div className="flex gap-4">
        <a
          href="mailto:nyihtutzaw.2015@gmail.com"
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Email"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/nyi-htut-zaw-9b741115a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="LinkedIn"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
          </svg>
        </a>
        <a
          href="https://github.com/nyihtutzaw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200"
          aria-label="GitHub"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 000 10.333c0 4.411 2.889 8.133 6.889 9.444.5.089.678-.2.678-.444 0-.222-.012-.967-.012-1.767-2.522.466-3.178-.611-3.378-1.178-.113-.289-.6-1.178-1.023-1.178-.35 0-.856.311-.856.611 0 .444.6.444 1.011.467 1.2.222 1.556 1.178 1.556 1.178.889 1.533 2.444.989 3.056.756.089-.667.356-1.122.644-1.378-2.244-.244-4.6-1.111-4.6-4.956 0-1.1.389-2 1.044-2.711-.1-.255-.452-1.3.1-2.711 0 0 .856-.267 2.8 1.044.811-.222 1.689-.333 2.556-.333s1.744.111 2.556.333c1.944-1.333 2.8-1.044 2.8-1.044.552 1.411.2 2.456.1 2.711.655.711 1.044 1.611 1.044 2.711 0 3.867-2.356 4.711-4.6 4.956.378.322.7.944.7 1.922 0 1.389-.011 2.489-.011 2.833 0 .244.178.533.678.444A10.036 10.036 0 0020 10.333C20 4.778 15.523.333 10 .333z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Nyi Htut Zaw</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
        Senior Software Engineer
      </p>
      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mb-6">
        With extensive experience in web, mobile, and AI-powered applications, I deliver robust solutions
        across diverse technology stacks. I provide technical consulting for IT projects and share my
        expertise through software development mentorship.
      </p>
      <button
        onClick={generateCV}
        className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      >
        Download CV
      </button>
    </div>
  </section>
);

export default HeroSection;