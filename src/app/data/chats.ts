export interface CuratedMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CuratedChat {
  id: string;
  title: string;
  preview: string;
  messages: CuratedMessage[];
}

export const curatedChats: CuratedChat[] = [
  {
    id: "background",
    title: "Background & Experience",
    preview: "Tell me about yourself...",
    messages: [
      {
        role: "user",
        content: "Tell me about yourself and your background.",
      },
      {
        role: "assistant",
        content:
          "I'm Nicholas Wong, a full-stack developer with 3 years of experience building and shipping products in fast-paced environments. I've worked across the stack — from React and TypeScript on the frontend to Node.js, Java Spring Boot, and Django on the backend.\n\nI currently work at Trontal Group, a trading analytics startup, where I build real-time systems handling live market data, WebSocket alerts, and a scripting language for trading indicators called kScript. Before that, I was at Dassault Systèmes where I led a frontend team of 3 and built features for a logistics visualization platform.\n\nI studied Computer Science at Monash University Malaysia, graduating with a GPA of 3.9.",
      },
    ],
  },
  {
    id: "current-work",
    title: "What I'm working on now",
    preview: "What are you working on at Trontal?",
    messages: [
      {
        role: "user",
        content: "What are you working on right now at Trontal Group?",
      },
      {
        role: "assistant",
        content:
          "At Trontal Group I wear a lot of hats. Here's what I've shipped recently:\n\n**Performance:** Cut app load time from ~4s to ~1.5s by eliminating barrel imports, implementing code splitting, and lazy-loading heavy chart components.\n\n**Trading execution:** Integrated execution trading via a third-party provider connecting to Binance, Bybit, and Hyperliquid — supporting 100+ users. I did the load testing with k6 and coordinated with partner engineers to ship within a 1-month deadline.\n\n**kScript:** I'm a core contributor to our proprietary scripting language for trading indicators. I architected the data-fetching layer, handling concurrent async requests with retry and fallback logic.\n\n**Price alerts:** Built a real-time alerting system using WebSockets for active users and email APIs for offline users — over 60,000 alerts created since it launched.",
      },
    ],
  },
  {
    id: "tech-stack",
    title: "Tech stack & tools",
    preview: "What technologies do you work with?",
    messages: [
      {
        role: "user",
        content: "What's your primary tech stack?",
      },
      {
        role: "assistant",
        content:
          "**Frontend:** React and TypeScript are my bread and butter. I've also worked extensively with Vue and Angular. For specialized rendering I've used WebGL and Canvas for data-heavy visualizations.\n\n**Backend:** Node.js with Express for most things, Java Spring Boot for enterprise work at Dassault Systèmes, and Django when the project called for it.\n\n**Infrastructure:** Docker for containerization, AWS (Solutions Architect Associate certified) and Google Cloud (Associate Cloud Engineer certified) for deployment.\n\n**Testing:** React Testing Library and Vitest/Jasmine. At Dassault I took coverage from 55% → 95% and introduced page object patterns for end-to-end test maintainability.\n\n**AI tooling:** I use Claude Code heavily — it's in my resume under Tools & Platforms. AI-assisted workflows are core to how I stay productive.",
      },
    ],
  },
  {
    id: "achievements",
    title: "Notable achievements",
    preview: "What are you most proud of?",
    messages: [
      {
        role: "user",
        content: "What professional achievement are you most proud of?",
      },
      {
        role: "assistant",
        content:
          "A few things stand out:\n\n**Published research:** My university team published a paper to the ACM on preprocessing techniques for deep learning models in smart manufacturing — specifically grading Edible Bird's Nest quality using computer vision. We used generative AI to augment our training data. It was a real end-to-end research project, not just coursework.\n\n**KL Mini Hack:** We placed 2nd in a 1-week blockchain hackathon by ETHKL. We built an anonymous, secure voting system using zero-knowledge proofs, complete with an incentive token (Cabbage Coin) built in Solidity.\n\n**Test coverage at Dassault:** Taking a production codebase from 55% to 95% test coverage isn't glamorous, but it made a real difference to release stability and team confidence. I also introduced reusable page object patterns that the team still uses.",
      },
    ],
  },
];
