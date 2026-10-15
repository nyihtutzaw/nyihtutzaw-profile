import Reveal from './Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => (
  <Reveal className="mb-10 md:mb-14 max-w-3xl">
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h1 className="text-4xl md:text-5xl font-bold text-fg">{title}</h1>
    {description && <p className="mt-4 text-lg text-muted leading-relaxed">{description}</p>}
  </Reveal>
);

export default PageHeader;
