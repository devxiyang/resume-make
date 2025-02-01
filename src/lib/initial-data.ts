import { ResumeData } from "./types"

export const initialResumeData: ResumeData = {
  personal: {
    name: "Xiyang Dev",
    jobTitle: "ML ENGINEERING EXPERT",
    email: "devxiyang@mock.com",
    phone: "123456",
    personalWebsite: "devxiyang.com",
    summary: "Experienced ML Engineering Expert with a strong background in building and scaling AI infrastructure. Proven track record in leading teams and delivering high-impact machine learning solutions.",
  },
  experiences: [
    {
      id: "1",
      company: "Mihoyo",
      position: "ML Engineering Expert",
      startDate: "Dec 2022",
      endDate: "Present",
      currentlyWork: true,
      description: "Leading the ML Infrastructure team to build and scale AI platforms.",
      bulletPoints: [
        "Designed and implemented a distributed training platform supporting 1000+ GPU clusters",
        "Led the development of ML pipeline automation tools, improving team efficiency by 40%",
        "Architected real-time model serving infrastructure handling 10M+ requests per day",
        "Mentored a team of 5 ML engineers and established best practices for ML systems"
      ],
    },
    {
      id: "2",
      company: "Haluo",
      position: "ML Engineering Expert",
      startDate: "Oct 2019",
      endDate: "Aug 2022",
      currentlyWork: false,
      description: "Built the AI infrastructure from ground up, establishing core ML platforms and practices.",
      bulletPoints: [
        "Spearheaded the development of company's first ML platform from scratch",
        "Implemented end-to-end ML pipelines for model training, evaluation, and deployment",
        "Reduced model deployment time from days to hours through automation",
        "Collaborated with research teams to optimize model performance and resource utilization"
      ],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Shanghai for Science and Technology",
      degree: "Master of Computer Science",
      state: "Shanghai",
      startDate: "Sep 2014",
      endDate: "Jun 2017",
      description: "Focus on Machine Learning and Distributed Systems",
    },
  ],
  projects: [
    {
      id: "1",
      name: "AI Platform",
      description: "Enterprise-scale machine learning platform built from the ground up",
      bulletPoints: [
        "Developed a scalable ML platform supporting multiple ML frameworks",
        "Implemented automated model training and deployment pipelines",
        "Built monitoring and observability systems for ML models",
        "Integrated with cloud services for cost-effective resource management"
      ],
      technologies: ["Python", "Kubernetes", "TensorFlow", "PyTorch", "Docker"],
    },
    {
      id: "2",
      name: "ML Pipeline Automation",
      description: "Automated ML workflow system for streamlining model development",
      bulletPoints: [
        "Created a unified pipeline for data preprocessing, training, and model deployment",
        "Implemented A/B testing framework for model evaluation",
        "Built real-time monitoring dashboards for model performance",
        "Reduced model iteration cycle time by 60%"
      ],
      technologies: ["Python", "Apache Airflow", "MLflow", "Redis", "PostgreSQL"],
    },
  ],
  skills: [
    {
      id: "1",
      name: "Programming",
      description: "Python, Java, C++, Go, SQL",
    },
    {
      id: "2",
      name: "ML Technologies",
      description: "TensorFlow, PyTorch, Scikit-learn, Kubernetes, Docker",
    },
    {
      id: "3",
      name: "Cloud Platforms",
      description: "AWS, GCP, Azure, Kubernetes, Docker",
    },
    {
      id: "4",
      name: "Tools & Frameworks",
      description: "Git, CI/CD, MLflow, Kubeflow, Apache Airflow",
    },
  ],
  customSections: [],
} 