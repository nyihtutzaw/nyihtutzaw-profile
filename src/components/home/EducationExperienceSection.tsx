import EducationColumn from './EducationColumn';
import WorkExperienceColumn from './WorkExperienceColumn';

const EducationExperienceSection = () => (
  <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <EducationColumn />
        <WorkExperienceColumn />
      </div>
    </div>
  </section>
);

export default EducationExperienceSection;