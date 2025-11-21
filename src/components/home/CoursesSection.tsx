const courses = [
  {
    title: "Full-stack Development with JavaScript",
    image: "/courses/fullstack-js.jpg",
    description: "Master modern full-stack development using Node.js, React, and MongoDB. Learn to build scalable web applications from scratch with industry best practices."
  },
  {
    title: "Dockerizing Node.js Application",
    image: "/courses/docker-nodejs.jpg",
    description: "Learn how to containerize Node.js applications using Docker. Cover deployment, scaling, and microservices architecture with practical examples."
  },
  {
    title: "React Specialization",
    image: "/courses/react-course.jpg",
    description: "Deep dive into React ecosystem including Redux, Testing. Build production-ready applications with modern React patterns."
  }
];

const CoursesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Upcoming Courses</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I am excited to announce upcoming video courses in Myanmar language on YouTube, designed to share practical development knowledge and industry experience. These courses will provide comprehensive, hands-on learning opportunities for aspiring developers.
          <br/>PLEASE JUST KEEP IT TOUCH
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;