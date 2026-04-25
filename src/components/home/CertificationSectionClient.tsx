'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Certification } from '@/types/database';

interface CertificationSectionClientProps {
  certifications: Certification[];
}

const CertificationSectionClient = ({ certifications }: CertificationSectionClientProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {cert.image_url ? (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <span className="text-white font-bold text-4xl">
                      {cert.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issued_by}
                  </p>
                  {cert.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {cert.date}
                    </p>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSectionClient;
