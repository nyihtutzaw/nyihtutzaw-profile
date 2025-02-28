interface Education {
    logo: string;
    logoAlt: string;
    period: string;
    degree: string;
    institution: string;
    skills?: string[];
    grade?: string;
  }
  
  export const educationData: Education[] = [
    {
      logo: "/education/uclan.png",
      logoAlt: "UCLan Logo",
      period: "Dec 2016 - July 2018",
      degree: "Business Communication and Information Systems",
      institution: "University of Central Lancashire",
      grade: "Degree"
    },
    {
      logo: "/education/ncc.jpeg",
      logoAlt: "NCC Logo",
      period: "Dec 2015 - Dec 2016",
      degree: "Level 5 Diploma In Computing",
      institution: "NCC Education",
      grade: "Level 5"
    },
    {
      logo: "/education/ncc.jpeg",
      logoAlt: "NCC Logo",
      period: "Dec 2014 - Dec 2015",
      degree: "Level 4 diploma in Computing",
      institution: "NCC Education",
      grade: "Level 4"
    }
  ];