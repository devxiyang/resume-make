import { ResumeData } from './types';

export const sampleData: ResumeData = {
  personal: {
    name: "John Smith",
    jobTitle: "Senior Software Engineer",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    personalWebsite: "johnsmith.dev",
    summary: "Experienced software engineer with a passion for building scalable applications and leading development teams. Proven track record of delivering high-quality solutions and driving technical innovation.",
  },
  experiences: [
    {
      id: "exp1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      currentlyWork: true,
      city: "San Francisco",
      state: "CA",
      description: "Leading the development of cloud-native applications and mentoring junior developers.",
      bulletPoints: [
        "Architected and implemented microservices architecture using Node.js and Kubernetes",
        "Improved system performance by 40% through optimization and caching strategies",
        "Led a team of 5 developers and implemented agile development practices",
      ],
    },
    {
      id: "exp2",
      company: "Innovation Labs",
      position: "Software Engineer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      currentlyWork: false,
      city: "Seattle",
      state: "WA",
      description: "Full-stack development of web applications using modern technologies.",
      bulletPoints: [
        "Developed and maintained multiple React-based web applications",
        "Implemented CI/CD pipelines using GitHub Actions and AWS",
        "Reduced deployment time by 60% through automation",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "Master of Computer Science",
      state: "California",
      startDate: "Sep 2015",
      endDate: "Jun 2017",
      description: "Focus on Distributed Systems and Cloud Computing",
    },
    {
      id: "edu2",
      school: "State University",
      degree: "Bachelor of Science in Computer Science",
      state: "Washington",
      startDate: "Sep 2011",
      endDate: "Jun 2015",
      description: "Minor in Mathematics",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Cloud Platform",
      description: "Developed a scalable cloud platform for microservices deployment",
      bulletPoints: [
        "Implemented automated CI/CD pipeline",
        "Containerized applications using Docker",
        "Set up monitoring and alerting using Prometheus and Grafana",
      ],
      technologies: ["Kubernetes", "Docker", "AWS", "Node.js", "TypeScript"],
    },
    {
      id: "proj2",
      name: "E-commerce Platform",
      description: "Built a modern e-commerce platform with real-time features",
      bulletPoints: [
        "Implemented real-time inventory management",
        "Integrated multiple payment gateways",
        "Built responsive UI with Next.js and Tailwind",
      ],
      technologies: ["React", "Next.js", "PostgreSQL", "Redis", "Stripe"],
    },
  ],
  skills: [
    {
      id: "skill1",
      name: "Programming Languages",
      description: "JavaScript, TypeScript, Python, Go, SQL",
    },
    {
      id: "skill2",
      name: "Technologies",
      description: "React, Node.js, Docker, Kubernetes, AWS",
    },
    {
      id: "skill3",
      name: "Tools",
      description: "Git, GitHub Actions, Jest, Webpack, VS Code",
    },
  ],
  customSections: [],
}; 