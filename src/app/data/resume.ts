export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export const bio = `Wong Nicholas is a full-stack developer based in Malaysia with 3 years of experience building and shipping products in fast-paced environments. He specializes in React, TypeScript, Vue, and WebGL, with a focus on low-latency, data-intensive and real-time systems. He leverages AI-assisted workflows to rapidly deliver scalable, production-ready applications, and holds cloud certifications from both AWS (Solutions Architect Associate) and Google Cloud (Associate Cloud Engineer).`;

export const experience: WorkExperience[] = [
  {
    company: "Trontal Group",
    role: "Full Stack Developer",
    period: "Jun 2025 – Present",
    description:
      "Trontal Group is a startup developing a platform for advanced trading analytics, including multi-exchange data aggregation and real-time market insights. Optimized application load time from ~4s to ~1.5s through bundle analysis, eliminating barrel imports, code splitting, and lazy loading. Integrated execution trading via a third-party provider connecting to Binance, Bybit, and Hyperliquid, supporting 100+ users; conducted load testing with k6. Built a real-time crypto price alerting system using WebSockets for in-app alerts and backend APIs for email delivery — 60,000+ alerts created. Core contributor to kScript, a scripting language for trading indicators with 140+ user-written scripts; architected async data flow handling, retry/fallback mechanisms, and polling strategies.",
  },
  {
    company: "Dassault Systemes",
    role: "Full Stack Developer",
    period: "Dec 2023 – Jun 2025",
    description:
      "Led a frontend team of 3, owning task planning, code reviews, and delivery quality. Partnered with Product Managers to proactively identify risks and ensure stable releases. Increased test coverage from 55% to 95% using React Testing Library and Jasmine, introducing reusable page object patterns. Implemented core features for a logistics visualization platform — full-stack using React, TypeScript, Java, and Spring Boot — including REST APIs and access control logic for resource ownership and visibility.",
  },
  {
    company: "Plentisoft Sdn Bhd",
    role: "Web Developer",
    period: "Nov 2022 – Feb 2023",
    description:
      "Developed static web pages using HTML, Tailwind CSS, and JavaScript. Built data collection and visualization features — graphs and tables — using Express, Angular, Angular Material, and ECharts.",
  },
];

export const education: Education[] = [
  {
    institution: "Monash University Malaysia",
    degree: "Bachelor of Computer Science",
    period: "Feb 2021 – Nov 2023",
    details: "GPA: 3.80/4, CGPA: 3.9/4, WAM: 84/100",
  },
];
