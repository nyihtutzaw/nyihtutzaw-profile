import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import Link from 'next/link';
import { 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CodeBracketIcon, 
  DocumentTextIcon,
  BookOpenIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const quickLinks = [
  { 
    name: 'About Me', 
    href: '/about', 
    icon: UserIcon,
    description: 'Learn more about my background and journey'
  },
  { 
    name: 'Experience', 
    href: '/experience', 
    icon: BriefcaseIcon,
    description: 'Explore my professional work history'
  },
  { 
    name: 'Education', 
    href: '/education', 
    icon: AcademicCapIcon,
    description: 'View my academic qualifications'
  },
  { 
    name: 'Skills', 
    href: '/skills', 
    icon: CodeBracketIcon,
    description: 'Discover my technical expertise'
  },
  { 
    name: 'Projects', 
    href: '/projects', 
    icon: DocumentTextIcon,
    description: 'See my recent work and portfolio'
  },
  { 
    name: 'Blog', 
    href: '/blog', 
    icon: BookOpenIcon,
    description: 'Read my latest articles and thoughts'
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Navigation */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore My Portfolio
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Navigate through different sections to learn more about my work and skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {link.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      Explore
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              I'm always interested in hearing about new opportunities and exciting projects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get In Touch
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
