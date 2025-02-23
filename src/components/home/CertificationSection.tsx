'use client';

import { useState } from 'react';
import Image from 'next/image';
import { certifications } from '@/data/certifications';

const CertificationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Certification Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mx-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full h-64">
                <Image
                  src={certifications[currentIndex].image}
                  alt={certifications[currentIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {certifications[currentIndex].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {certifications[currentIndex].issuedBy}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {certifications[currentIndex].date}
                </p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;