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
          "I'm Wong Nicholas, a full-stack developer with 3 years of experience building and shipping products in fast-paced environments. I've worked across the stack — from React and TypeScript on the frontend to Node.js, Java Spring Boot, and Django on the backend.\n\nI currently work at Trontal Group, a trading analytics startup, where I build real-time systems handling live market data, WebSocket alerts, and a scripting language for trading indicators called kScript. Before that, I was at Dassault Systèmes where I led a frontend team of 3 and built features for a logistics visualization platform.\n\nI studied Computer Science at Monash University Malaysia, graduating with a GPA of 3.9.",
      },
      {
        role: "user",
        content: "What got you into software development in the first place?",
      },
      {
        role: "assistant",
        content:
          "I got into it around age 16 — watching CS Dojo on YouTube and learning Python, then picking up HTML and realizing I could actually build websites. That felt cool, and since I'd always loved math, the logic side of programming clicked naturally. Hearing how much software engineers could earn definitely sealed it as a career choice too.\n\nBut what really hooked me was competitive programming — data structures, algorithms, puzzles. Building websites is satisfying, but there's a different kind of thrill in solving a problem that stumps everyone else. That competitive streak is honestly what turned this from \"a good career path\" into something I actually loved.",
      },
      {
        role: "user",
        content: "What was the jump from Dassault Systèmes to Trontal Group like?",
      },
      {
        role: "assistant",
        content:
          "Dassault Systèmes felt like a company you could retire at — stable, well-run, and I learned a ton about how a real MNC operates. Their QA process was rigorous; everything was tested thoroughly to make sure customers got a product with as few bugs as possible. The downside was that a lot of their tech was proprietary, so the specific tools and systems I learned there don't transfer cleanly to other companies.\n\nMoving to Trontal, a trading startup, was a big shift. One thing I've realized about software is that domain knowledge usually isn't a dealbreaker the way it might be in, say, sales — but being at a trading company did give me a real appreciation for trading indicators, and just how much data accuracy and speed matter when people are making decisions with real money.\n\nI don't regret the move at all. Trontal isn't always sure of its direction, which means goalposts move a lot, but it's taught me to work fast and efficiently — a lot of how I use Claude Code and agents today came from this environment. And the team is genuinely full of talented, amazing people.",
      },
      {
        role: "user",
        content: "Anything about your time at Monash worth mentioning?",
      },
      {
        role: "assistant",
        content:
          "Outside of coursework, my sister actually got me into board games — she showed me Saboteur, and I was hooked. Board games are basically puzzles: figuring out the optimal strategy to win. I joined Monash's board gaming club and worked my way up from member to vice president to president — great club, great people, great mindset.\n\nAcademically, the project I remember most is the Edible Bird's Nest grading research — the one that became our ACM paper. Getting to see real, unprocessed bird nests and apply computer vision to grade them by color, shape, and size was genuinely cool — it felt like solving a real-world problem, not just a class assignment. Our lecturer, Dr. Lim Mei Kuan, was amazing — she gave us this opportunity and was incredibly thoughtful throughout. The whole team pulled their weight, and getting that paper published felt like a huge milestone.",
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
      {
        role: "user",
        content:
          "You mentioned kScript — what does writing an indicator in it actually look like, and what's been the hardest design decision?",
      },
      {
        role: "assistant",
        content:
          "Writing an indicator in kScript looks something like this:\n\n```\n//@version=2\n\ndefine(title=\"My First Indicator\", position=\"onchart\", axis=true);\n\ntimeseries prices = ohlcv(symbol=currentSymbol, exchange=currentExchange);\ntimeseries average = sma(source=prices.close, period=20);\n\nplotLine(value=average, colors=[\"blue\"], width=2, label=[\"20 SMA\"], desc=[\"20-period Simple Moving Average\"]);\n```\n\nUnder the hood it's an AST-based language — we parse and compile scripts like this into something that can run against live market data.\n\nThe hardest design decision I made was around plot styling. The CEO wanted as many style options as possible — thickness, color, gradient, opacity, glow, line style (dashed/dotted/solid) — applied across every plot type: lines, shapes, bars, candles. My first instinct as a developer was to create a shared `style()` object that all plot functions could reference — add one style, every plot benefits, and you stop maintaining styling logic per-plot.\n\nBut it introduced real complexity: not every style applies to every plot. `lineStyle` makes sense for `plotLine` but means nothing for `plotBar`. So now I'd need to maintain a shared style object *and* per-plot exceptions for which styles actually apply. After thinking it through, I decided to remove the shared style property entirely. It would've reduced some boilerplate, but most kScript scripts are small enough that the reduction wasn't worth the extra logic developers would need to reason about. Sometimes the right call is the one that keeps the system simpler, even if it means slightly more repetition.",
      },
      {
        role: "user",
        content: "That price alerts system hit 60k+ alerts — any interesting scaling story there?",
      },
      {
        role: "assistant",
        content:
          "Not the most thrilling story, but a good lesson in data modeling. Originally, our schema had one document per user holding *all* of their alerts as an array. The problem: users rarely delete alerts, so these documents kept growing — and MongoDB caps document size at 16MB.\n\nObservability is what caught it early. We were tracking the payload size of data sent to one of our other services, and started seeing requests taking ~2 seconds to transfer ~3MB — which was a red flag well before anything actually broke.\n\nThe fix was migrating to one-document-per-alert. I did this with a dual-write approach: first, allow inserts into both the old (one big document per user) and new (one document per alert) shapes simultaneously. Then I ran a migration script that fetched all the existing big documents, broke them down into individual alert documents, and inserted those. Once everything was migrated and verified, I removed the old big documents and the dual-write logic. Clean, low-risk migration with no downtime.",
      },
      {
        role: "user",
        content: "What's the day-to-day like at a startup compared to an MNC like Dassault?",
      },
      {
        role: "assistant",
        content:
          "They're really different worlds. At a startup, you wear a lot of hats — PM, UI/UX, frontend, backend, infra, code reviewer, architect, sometimes all in the same week. Tasks are often vague, and you're expected to think about the company's interests and figure out the right scope yourself. The CEO might be too busy to spell things out, so you fill in the gaps — but you'll still get a daily check-in to stay aligned. Everything moves fast: I shipped a full CLI authorization flow — APIs, UI, register/login/logout, local key storage — in about 2 days.\n\nAt an MNC like Dassault, the process is much more structured. Tasks come pre-scoped with clear acceptance criteria, sprint planning estimates story points, and retrospectives optimize the process over time. Something like building a dialog might take 3 days — slower, but the requirements are airtight and QA has a clear spec to test against. It was more relaxing, and I learned a lot about proper unit testing and writing each piece of code carefully.\n\nBoth taught me a ton — one for speed, one for rigor — and honestly, what I'd love long-term is somewhere that balances both.",
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
      {
        role: "user",
        content: "Is there a tool you've really fallen in love with recently?",
      },
      {
        role: "assistant",
        content:
          "Honestly, Claude Code — though it's a bit of a love-hate relationship. It's sped up my development by roughly 5x. The workflow is: know what you want to build and the requirements, then let it build at a pace you couldn't write code by hand. Combined with git worktrees, I can work on multiple features in parallel without losing context. It's like having a sharp senior engineer next to you doing research and implementation.\n\nThe flip side: expectations from leadership go up accordingly, and the code it produces isn't always the cleanest — I've seen a fair amount of defensive `if` conditions for cases that can never actually happen. It's also shifted *what* I think about day to day. I spend less time thinking about the code itself and more about architecture, UX — how the user actually experiences this — and security.",
      },
      {
        role: "user",
        content: "How do you actually use Claude Code day to day?",
      },
      {
        role: "assistant",
        content:
          "I try to limit myself to two big features at a time — say, CLI authentication and a partner integration — plus a few smaller side tasks like reviewing MRs. Switching between too many big features at once burns context and slows everything down.\n\nFor each one, my workflow is almost always: **plan mode first**, then execute. Most of the back-and-forth happens during planning — reading through the existing code, working out the requirements, and getting the plan right before any code is written. By the time I move to execution, very few iterations are needed. It's the fastest workflow I've found that doesn't sacrifice understanding of the codebase.",
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
      {
        role: "user",
        content: "For the ACM paper — what was your specific contribution, and did anything surprising come out of the research?",
      },
      {
        role: "assistant",
        content:
          "My specific contribution was on the data side — I took the photos of the actual edible bird's nests we used as our raw dataset, and generated synthetic data to help fill the gaps where real samples were limited. I also helped write up the paper itself.\n\nThe big realization for that project was that synthetic data could meaningfully improve a model's performance when the real dataset is too small or hard to collect — which, for a niche domain like bird's nest grading, was exactly our situation. Nothing groundbreaking came out of it beyond that — we were final-year students — but going from \"here's a dataset problem\" to an actual published ACM paper felt like a real milestone.",
      },
    ],
  },
];
