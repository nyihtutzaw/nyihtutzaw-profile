export interface Skill {
  name: string;
  logo: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}