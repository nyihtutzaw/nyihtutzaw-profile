'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  CodeBracketIcon, 
  CloudArrowUpIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const timelineEvents = [
    {
      year: '2017-2019',
      title: 'Early Development Journey',
      description: 'Started as a freelance developer while teaching programming, gaining hands-on experience with modern web technologies and building foundational skills.',
      icon: CodeBracketIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      year: '2019-2024',
      title: 'Healthcare Tech Leadership',
      description: 'Led development teams at Union Myanmar, implementing scalable healthcare solutions and mentoring junior developers while mastering cloud technologies.',
      icon: HeartIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      year: '2023-2024',
      title: 'E-Commerce Excellence',
      description: 'Developed robust e-commerce platforms for Japanese brands, specializing in Magento customization and React-based frontend solutions.',
      icon: CloudArrowUpIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      year: '2024-2025',
      title: 'Cybersecurity Innovation',
      description: 'Led AI-powered security solutions development at RV Connex, integrating advanced technologies for enterprise-level protection systems.',
      icon: LightBulbIcon,
      color: 'from-red-500 to-red-600'
    },
    {
      year: '2024-Present',
      title: 'AI-Powered Future',
      description: 'Senior Software Engineer at ArcFusion, developing cutting-edge Generative AI applications using Python, Golang, and modern cloud technologies.',
      icon: RocketLaunchIcon,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const coreValues = [
    {
      title: 'Innovation',
      description: 'Constantly exploring new technologies and approaches to solve complex problems',
      icon: LightBulbIcon
    },
    {
      title: 'Quality',
      description: 'Committed to writing clean, maintainable code and delivering exceptional user experiences',
      icon: CodeBracketIcon
    },
    {
      title: 'Growth',
      description: 'Continuous learning and skill development to stay at the forefront of technology',
      icon: AcademicCapIcon
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About My Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            From a passionate developer teaching programming to a Senior Software Engineer shaping the future of AI. 
            My journey is driven by curiosity, innovation, and the pursuit of excellence in every line of code.
          </p>
        </div>

        {/* Personal Introduction */}
        <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-20 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              More Than Just Code
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I believe technology should serve humanity. Throughout my career, I've focused on creating solutions 
                that make a real difference - whether it's healthcare systems that save lives or AI applications 
                that unlock human potential.
              </p>
              <p>
                Based in Bangkok, Thailand, I bring a global perspective to every project, having worked with 
                clients and teams across Asia and beyond. My approach combines technical expertise with a deep 
                understanding of business needs and user experiences.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Career Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline Line - Mobile: Left aligned, Desktop: Center */}
            <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            
            {/* Timeline Events */}
            <div className="space-y-8 sm:space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                
                return (
                  <div 
                    key={event.year}
                    className={`relative flex items-start sm:items-center ${
                      index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'
                    }`}
                    style={{ transitionDelay: `${600 + index * 150}ms` }}
                  >
                    {/* Mobile: Full width content, Desktop: Alternating layout */}
                    <div className="w-full sm:w-5/12 pl-12 sm:pl-0 sm:pr-8">
                      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${event.color} mb-3`}>
                          {event.year}
                        </div>
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot - Mobile: Left aligned, Desktop: Center */}
                    <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-500 dark:border-blue-400 flex items-center justify-center z-10">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${event.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              I'm always excited to collaborate on innovative projects that push the boundaries of technology. 
              Whether you need a full-stack application, AI solution, or technical consultation, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 sm:px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="px-6 sm:px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors text-sm sm:text-base"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;