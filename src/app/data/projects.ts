export interface Project {
  name: string;
  description: string;
  techStack: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    name: "Portfolio",
    description:
      "Personal portfolio website inspired by Instagram's UI. Took 2 months to design and 1 month to develop (excluding working days). Features dark mode, responsive design, and was coded without AI assistance.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://wongyizhen.com",
  },
  {
    name: "KL Mini Hack — Anonymous Voting System",
    description:
      "2nd place at a 1-week blockchain hackathon organized by ETHKL. Built an anonymous and secure voting system using zero-knowledge proof, incentivizing users with a custom Cabbage Coin ERC-20 token. Developed the smart contract and dashboard UI.",
    techStack: ["React", "Express", "Solidity", "Truffle"],
  },
  {
    name: "Edible Bird's Nest AI Grading System (FYP)",
    description:
      "Final year project resulting in a published ACM paper: 'Preprocessing Variations for Classification in Smart Manufacturing'. Developed an AI prototype for grading edible bird's nest, investigating the impact of preprocessing techniques (brightness, blurriness) on deep learning model performance. Used generative AI to create training images.",
    techStack: ["Python", "Deep Learning", "Generative AI", "Computer Vision"],
    url: "https://dl.acm.org",
  },
];
