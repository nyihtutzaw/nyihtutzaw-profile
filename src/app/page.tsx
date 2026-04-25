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
    description: 'Discover my journey from developer to Senior AI Engineer'
  },
  { 
    name: 'Experience', 
    href: '/experience', 
    icon: BriefcaseIcon,
    description: 'See what I\'ve built and the teams I\'ve worked with'
  },
  { 
    name: 'Education', 
    href: '/education', 
    icon: AcademicCapIcon,
    description: 'View my academic qualifications and certifications'
  },
  { 
    name: 'Skills', 
    href: '/skills', 
    icon: CodeBracketIcon,
    description: 'Explore my technical expertise and toolset'
  },
  { 
    name: 'Projects', 
    href: '/projects', 
    icon: DocumentTextIcon,
    description: 'Browse my recent work and portfolio'
  },
  { 
    name: 'Blog', 
    href: '/blog', 
    icon: BookOpenIcon,
    description: 'Read my latest thoughts and tutorials'
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Explore My Portfolio
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Navigate through different sections to discover my work, skills, and journey as a software engineer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {link.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      Explore
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48Y2lyY2xlIGN4PSIzMCIgeT0iMzAiIHI9IjEwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative max-w-4xl mx-auto text-center px-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              I'm always excited to collaborate on innovative projects that push the boundaries of technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300"
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
