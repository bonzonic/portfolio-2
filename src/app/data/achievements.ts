export interface AchievementLink {
  label: string;
  url: string;
}

export type AchievementCategory = "achievement" | "leadership";

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  category: AchievementCategory;
  image?: string;
  links?: AchievementLink[];
}

export const achievements: Achievement[] = [
  {
    id: "acm-paper",
    title: "Published Paper: Preprocessing Variations for Classification in Smart Manufacturing",
    subtitle: "Developer & Writer — Association for Computing Machinery (ACM)",
    date: "2023",
    description:
      "Collaborated with university FYP teammates to publish a paper to the ACM investigating the impact of preprocessing techniques — including brightness and blurriness adjustments — on deep learning model performance when dealing with low-quality visual data in industrial settings. The paper focuses on grading Edible Bird's Nest quality. Key outcomes: successful AI prototype for automated grading, potential automation for quality control, and utilization of generative AI for training data augmentation.",
    category: "achievement",
    image: "/achievements/paper.png",
    links: [
      {
        label: "View on ACM Digital Library",
        url: "https://dl.acm.org/doi/10.1145/3611380.3629545",
      },
    ],
  },
  {
    id: "best-fyp-award",
    title: "Best FYP Award 2023 — Monash University Malaysia",
    subtitle: "Awarded by British Petroleum (BP)",
    date: "2023",
    description:
      "Recognized for a Final Year Project that automated the grading of Edible Bird's Nest quality using deep learning models — Faster R-CNN, YOLOv8, and MobileNet-V2 — trained on perturbed and synthetic datasets to improve robustness against low-quality visual data. MobileNet-V2 emerged as the optimal choice, striking a balance between speed and accuracy in grading predictions.",
    category: "achievement",
    image: "/achievements/bp.png",
    links: [{ label: "GitHub", url: "https://github.com/MCS04/MCS04-AI" }],
  },
  {
    id: "kl-mini-hack",
    title: "KL Mini Hack — 2nd Place",
    subtitle: "Hackathon — ETHKL",
    date: "February 2023",
    description:
      "Participated in a 1-week blockchain hackathon organized by ETHKL in a team of four. Built an anonymous and secure voting system using zero-knowledge proof while incentivizing users with Cabbage Coin — a token developed in a Solidity smart contract. Built the frontend dashboard in React and Express to display token value and voting activity.",
    category: "achievement",
    image: "/achievements/klminihack2023.png",
    links: [
      { label: "Demo", url: "https://bonzonic.github.io/KL-Mini-Hack" },
      { label: "GitHub", url: "https://github.com/bonzonic/KL-Mini-Hack" },
    ],
  },
  {
    id: "monash-board-gaming",
    title: "Club President — Monash Board Gaming Club",
    subtitle: "Leadership — Monash University Malaysia",
    date: "February 2022 – November 2022",
    description:
      "Led a team of 12 committee members, mentoring them on event management and sponsorship negotiation. Collaborated with 10+ board game cafes to provide member discounts. Grew club social media from near-zero: +3,900% accounts reached, +264% accounts engaged, +34.4% total followers over 2 months.",
    category: "leadership",
  },
];
