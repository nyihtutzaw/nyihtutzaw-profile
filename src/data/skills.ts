import { SkillGroup } from '@/types/skills';

export const skillGroups: SkillGroup[] = [
  {
    name: 'Programming',
    skills: [
      { name: 'Javascript', logo: '/skills/js.png' },
      { name: 'Typescript', logo: '/skills/typescript.png' },
      { name: 'PHP', logo: '/skills/php.png' },
      { name: 'Dart', logo: '/skills/dart.png' },
      { name: 'Python', logo: '/skills/python.png' },
      { name: 'Go', logo: '/skills/go.png' },
    ]
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'React', logo: '/skills/react.png' },
      { name: 'Next.js', logo: '/skills/nextjs.png' },
      { name: 'Fast Api', logo: '/skills/fastapi.png' },
      { name: 'Echo', logo: '/skills/echo.png' },
      { name: 'Laravel', logo: '/skills/laravel.png' },
      { name: 'Express', logo: '/skills/expressjs.png' },
      { name: 'Strapi', logo: '/skills/strapi.png' },
      { name: 'Elysia', logo: '/skills/elysia.png' },
      { name: 'Flutter', logo: '/skills/flutter.png' },
      { name: 'React Native', logo: '/skills/react native.png' },
    ]
  },
  {
    name: 'Devops',
    skills: [
      { name: 'AWS', logo: '/skills/aws.png' },
      { name: 'Docker', logo: '/skills/docker.png' },
      { name: 'Kubernetes', logo: '/skills/kubernetes.png' },
      { name: 'Github Actions', logo: '/skills/githubaction.png' },
      { name: 'Circle CI', logo: '/skills/circle.png' },
      { name: 'Jenkins', logo: '/skills/jenkin.png' },
      { name: 'Terraform', logo: '/skills/Terraform.png' },
      { name: 'Grafana', logo: '/skills/Grafana.png' },
      { name: 'ELK Stack', logo: '/skills/elk.png' },
    ]
  },
  {
    name: 'AI',
    skills: [
      { name: 'OpenAI GPT', logo: '/skills/openai.png' },
      { name: 'Claude', logo: '/skills/claude.png' },
      { name: 'Langchain', logo: '/skills/langchain.png' },
      { name: 'Hugging Face', logo: '/skills/hugface.png' },
      { name: 'PyTorch', logo: '/skills/pytorch.png' },
      { name: 'Vercel AI', logo: '/skills/vercel.png' },
    ]
  },
];