export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
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
    url: "https://portfolio-2-beige-xi.vercel.app",
  },
  {
    id: "portfolio-v1",
    name: "Portfolio v1",
    description:
      "First iteration of my personal portfolio. A clean, card-based layout showcasing projects, skills, and experience — the foundation that led to the current redesign.",
    longDescription:
      "The first version of my personal portfolio, built before the current redesign. It established the core content structure — projects, work experience, skills, and contact — in a more traditional card-based layout. Building v1 clarified what I wanted to improve: more personality, faster navigation, and an interactive way for visitors to learn about me beyond a static page. Those lessons directly shaped the chat-first approach in v2.",
    highlights: [
      "Card-based layout presenting projects, skills, and work experience",
      "Served as the baseline that informed the v2 redesign decisions",
      "Deployed on Vercel",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://portfolio-steel-eta-78.vercel.app",
  },
  {
    id: "kl-mini-hack",
    name: "KL Mini Hack — Anonymous Voting System",
    description:
      "2nd place at a 1-week blockchain hackathon organized by ETHKL. Built an anonymous and secure voting system using zero-knowledge proof, incentivizing users with a custom Cabbage Coin ERC-20 token.",
    longDescription:
      "A 1-week hackathon hosted by ETHKL where our team placed 2nd overall. The challenge was to build a trustless voting system that guaranteed both anonymity and verifiability — two properties that typically conflict. We solved this using zero-knowledge proofs so voters could prove eligibility without revealing identity.",
    highlights: [
      "Zero-knowledge proof implementation to ensure anonymous yet verifiable votes",
      "Custom ERC-20 token (Cabbage Coin) distributed as incentive for participation",
      "Smart contract written in Solidity and deployed via Truffle",
      "Dashboard UI built in React with an Express backend for off-chain coordination",
      "Designed the full contract architecture and led frontend development",
    ],
    techStack: ["React", "Express", "Solidity", "Truffle", "Zero-Knowledge Proofs"],
  },
  {
    id: "fyp-birds-nest",
    name: "Edible Bird's Nest AI Grading System",
    description:
      "Final year project resulting in a published ACM paper. Developed an AI prototype for grading edible bird's nest, investigating the impact of preprocessing techniques on deep learning model performance.",
    longDescription:
      "Final year capstone project that resulted in a peer-reviewed ACM publication: \"Preprocessing Variations for Classification in Smart Manufacturing\". The goal was to automate the grading of edible bird's nest — a high-value product whose quality is currently assessed by hand by trained experts — using computer vision and deep learning.",
    highlights: [
      "Published in ACM Digital Library as part of the Smart Manufacturing research track",
      "Investigated how preprocessing variables (brightness normalisation, blur filtering) affect CNN classification accuracy",
      "Used generative AI (GANs) to synthesise training images and address the limited dataset problem",
      "Achieved classification accuracy competitive with manual expert grading",
      "Entire ML pipeline built in Python using standard deep learning frameworks",
    ],
    techStack: ["Python", "Deep Learning", "Generative AI", "Computer Vision"],
    url: "https://dl.acm.org",
  },
];
