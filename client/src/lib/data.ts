export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'AI/ML' | 'Web Dev' | 'Frontend' | 'Full Stack';
  technologies: string[];
  github?: string;
  liveDemo?: string;
  inProgress?: boolean;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  score: string;
}

export interface Certification {
  id: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Achievement';
  icon: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface Concept {
  name: string;
}

export const navigationLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Text Summarization Using NLP",
    description: "Implemented automated text summarization with stop words removal, POS tagging, and parsing for efficient content digestion.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "AI/ML",
    technologies: ["Python", "SpaCy", "Flask", "HTML/CSS"],
    github: "https://github.com/abhaybajpai",
    liveDemo: "#",
  },
  {
    id: 2,
    title: "Jackie's Pet Store – Ecommerce Website",
    description: "Complete responsive e-commerce solution featuring product catalog, sliders, and intuitive user interface.",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Web Dev",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/abhaybajpai",
    liveDemo: "#",
  },
  {
    id: 3,
    title: "Sports Activity Dashboard",
    description: "Interactive landing page providing comprehensive overview of sports activities with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/abhaybajpai",
    liveDemo: "#",
  },
  {
    id: 4,
    title: "AI Healthcare Chatbot",
    description: "Natural language processing chatbot that understands and responds to healthcare queries with accurate information.",
    image: "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    category: "AI/ML",
    technologies: ["Python", "Flask", "ML Models"],
    github: "https://github.com/abhaybajpai",
    inProgress: true,
  },
  {
    id: 5,
    title: "Ticketing System for Indian Heritage Sites",
    description: "Cloud-optimized and scalable ticketing platform using ATRO algorithm for Indian heritage sites.",
    image: "https://images.unsplash.com/photo-1597008641621-deee4a8d05c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Full Stack",
    technologies: ["Open-source", "ATRO algorithm", "Cloud"],
    github: "https://github.com/abhaybajpai",
    liveDemo: "#",
  },
];

export const programmingSkills: Skill[] = [
  { name: "Python", percentage: 85 },
  { name: "JavaScript", percentage: 75 },
  { name: "Java", percentage: 70 },
  { name: "HTML/CSS", percentage: 80 },
  { name: "SQL", percentage: 65 },
];

export const tools: Tool[] = [
  { name: "React", icon: "react" },
  { name: "Git", icon: "git-alt" },
  { name: "GitHub", icon: "github" },
  { name: "Flask", icon: "flask" },
  { name: "Tailwind", icon: "wind" },
  { name: "Vite", icon: "bolt" },
];

export const concepts: Concept[] = [
  { name: "AI/ML" },
  { name: "NLP" },
  { name: "DSA" },
  { name: "DBMS" },
  { name: "OS" },
  { name: "Computer Networks" },
  { name: "REST APIs" },
  { name: "Distributed Databases" },
];

export const education: Education[] = [
  {
    id: 1,
    degree: "B.Tech – CSE (AI & ML)",
    institution: "Babu Banarasi Das Institute of Technology & Management",
    duration: "2021 – 2025",
    score: "CGPA: 6.4",
  },
  {
    id: 2,
    degree: "12th Standard",
    institution: "St. Mary's Day Inter College",
    duration: "Completed",
    score: "Percentage: 79.6%",
  },
  {
    id: 3,
    degree: "10th Standard",
    institution: "St. Mary's Day Inter College",
    duration: "Completed",
    score: "Percentage: 83.4%",
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Intro to DSA & Machine Learning",
    description: "Comprehensive introduction to data structures, algorithms, and machine learning fundamentals.",
    status: "Completed",
    icon: "brain",
  },
  {
    id: 2,
    title: "Intro to Cyber Security",
    description: "Duke University's comprehensive introduction to cybersecurity principles and practices.",
    status: "Completed",
    icon: "lock",
  },
  {
    id: 3,
    title: "Hackathon Participation",
    description: "Participated in multiple hackathons as a team lead and contributor, developing innovative solutions to complex problems.",
    status: "Achievement",
    icon: "trophy",
  },
];

export const socialLinks = [
  { name: "GitHub", icon: "github", url: "https://github.com/abhaybajpai" },
  { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/abhay-bajpai-" },
  { name: "Email", icon: "envelope", url: "mailto:abhayofc59@gmail.com" },
];

export const contactInfo = [
  {
    id: 1,
    title: "Email",
    value: "abhayofc59@gmail.com",
    link: "mailto:abhayofc59@gmail.com",
    icon: "envelope",
  },
  {
    id: 2,
    title: "Phone",
    value: "+91 6386648923",
    link: "tel:+916386648923",
    icon: "phone-alt",
  },
  {
    id: 3,
    title: "LinkedIn",
    value: "linkedin.com/in/abhay-bajpai-",
    link: "https://www.linkedin.com/in/abhay-bajpai-",
    icon: "linkedin-in",
  },
  {
    id: 4,
    title: "GitHub",
    value: "github.com/abhaybajpai",
    link: "https://github.com/abhaybajpai",
    icon: "github",
  },
];
