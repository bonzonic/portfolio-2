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
  images?: string[];
  links?: AchievementLink[];
}

export const achievements: Achievement[] = [
  {
    id: "acm-paper",
    title: "Published Paper: Preprocessing Variations for Classification in Smart Manufacturing",
    subtitle: "Developer & Writer — Association for Computing Machinery (ACM)",
    date: "2023",
    description:
      "Collaborated with university FYP teammates to publish a paper to the ACM investigating the impact of preprocessing techniques — including brightness and blurriness adjustments — on deep learning model performance when dealing with low-quality visual data in industrial settings. The paper focuses on grading Edible Bird's Nest quality. Key outcomes: successful AI prototype for automated grading, potential automation for quality control, and utilization of generative AI for training data augmentation. My contribution centered on the dataset — photographing real, unprocessed bird's nest samples and generating synthetic data to augment training — under the mentorship of Dr. Lim Mei Kuan.\n\nIt took about a month to write the paper and roughly 4,000 MYR to get it published. Couldn't have done it without my teammates Brian, Christine, and Caleb, and especially Dr. Lim Mei Kuan, our FYP supervisor, who made the whole project possible in the first place.",
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
      "Recognized for a Final Year Project that automated the grading of Edible Bird's Nest quality using deep learning models — Faster R-CNN, YOLOv8, and MobileNet-V2 — trained on perturbed and synthetic datasets to improve robustness against low-quality visual data. MobileNet-V2 emerged as the optimal choice, striking a balance between speed and accuracy in grading predictions.\n\nThis was the same FYP that became our ACM publication, so getting Monash's Best FYP Award on top of that — sponsored by BP — was a great bonus. Two awards from one project felt like validation that the extra effort of building a full working prototype, not just a report, was worth it.",
    category: "achievement",
    image: "/achievements/bp.png",
    images: ["/achievements/bp.png", "/achievements/bp2.png", "/achievements/bp3.png"],
    links: [{ label: "GitHub", url: "https://github.com/MCS04/MCS04-AI" }],
  },
  {
    id: "kl-mini-hack",
    title: "KL Mini Hack — 2nd Place",
    subtitle: "Hackathon — ETHKL",
    date: "February 2023",
    description:
      "Participated in a 1-week blockchain hackathon organized by ETHKL in a team of four. Built an anonymous and secure voting system using zero-knowledge proof while incentivizing users with Cabbage Coin — a token developed in a Solidity smart contract. Built the frontend dashboard in React and Express to display token value and voting activity.\n\nNone of us had touched blockchain, smart contracts, or zero-knowledge proofs before that week, so it felt more like a 1-day hackathon's worth of building squeezed into 7 days of learning Truffle and Solidity from scratch. Placing 2nd against teams with more crypto experience was a great surprise — and a good reminder that being comfortable picking up unfamiliar tech fast under pressure counts for a lot.",
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
      "What started as a hobby — my sister introducing me to board games like Saboteur and the appeal of finding the optimal strategy to win — grew into a leadership role. In 2021, with lockdown still in effect, our sessions were online, but it wasn't the same without being able to read people's reactions across the table. That semester I became vice president, and we ran our first collaboration — an online event with the Monash Boardgaming Club from Australia, a chance to connect with another club in the same lockdown boat.\n\nIn 2022 I was promoted to president and pushed to bring sessions back in person. What started as 10–20 people grew to over 100 members by the second semester. I led a team of 12 committee members, mentoring them on event management and sponsorship negotiation, and collaborated with 10+ board game cafes for member discounts — growing the club's social media from near-zero: +3,900% accounts reached, +264% accounts engaged, and +34.4% total followers over 2 months.\n\nThe photos here are from a collaboration with an external party, borrowing games we didn't own in exchange for giving them publicity — a partnership that later inspired them to host their own board game event in KL.",
    category: "leadership",
    image: "/achievements/mbgc.jpg",
    images: ["/achievements/mbgc.jpg", "/achievements/mbgc2.jpg", "/achievements/mbgc3.jpg"],
  },
];
