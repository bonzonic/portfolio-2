export interface ProjectImage {
  src: string;
  caption?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  images?: ProjectImage[];
  url?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "portfolio-v2",
    name: "Portfolio v2",
    description:
      "Personal portfolio website inspired by Claude.ai's UI. Features a dark warm theme, AI-powered chat interface backed by OpenRouter, curated conversation showcases, and smooth sidebar navigation.",
    longDescription:
      "This is the very site you're exploring right now. Designed and developed from scratch, taking roughly 2 months from initial concept to deployment. The design draws heavily from Claude.ai's aesthetic — dark warm tones, clean sidebar navigation, and a chat-first experience that lets visitors interact with an AI trained on my background instead of reading a static resume.",
    highlights: [
      "AI chat interface powered by OpenRouter — streams responses in real time via SSE",
      "Per-session chat history stored in IndexedDB; each new chat gets its own UUID route",
      "Collapsible sidebar with Recents, Background sections, and contact modal",
      "Tailwind v4 config-free setup with custom CSS tokens for the warm dark palette",
      "Deployed on Vercel with automatic CI/CD on every push to main",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "OpenRouter API"],
    images: [
      { src: "/projects/portfolio-v2-chat.png" },
      { src: "/projects/portfolio-v2-sidebar.png" },
    ],
    url: "https://portfolio-2-beige-xi.vercel.app",
  },
  {
    id: "portfolio-v1",
    name: "Portfolio v1",
    description:
      "First iteration of my personal portfolio. A clean, card-based layout showcasing projects, skills, and experience — the foundation that led to the current redesign.",
    longDescription:
      "The first version of my personal portfolio, built before the current redesign. It established the core content structure — projects, work experience, skills, and contact — in a traditional card-based layout, and the lessons learned here directly shaped the chat-first redesign in v2.",
    highlights: [
      "Card-based layout presenting projects, skills, and work experience",
      "Served as the baseline that informed the v2 redesign decisions",
      "Deployed on Vercel",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    images: [
      {
        src: "/projects/portfolio-v1-figma.png",
        caption:
          "Before writing any code, I designed the whole site in Figma — from rough scribbles to a polished UI. Along the way I learnt to build components with text and boolean properties, making them scalable so the design stayed easy to change. From there, I ported the design over to code, starting with the smallest components and building them up into full pages. Designing in Figma first made it easy to nail down exactly what I was looking for, since visual changes are far quicker to make there than in code — so once I moved to development, I could focus purely on the code itself.",
      },
      { src: "/projects/portfolio-v1-home.png" },
      { src: "/projects/portfolio-v1-projects.png" },
    ],
    url: "https://portfolio-steel-eta-78.vercel.app",
  },
];
