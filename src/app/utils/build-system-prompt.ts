import { bio, experience, education } from "@/app/data/resume";
import { projects } from "@/app/data/projects";
import { skills } from "@/app/data/skills";

export function buildSystemPrompt(): string {
  const experienceText = experience
    .map((e) => `**${e.role} at ${e.company}** (${e.period})\n${e.description}`)
    .join("\n\n");

  const educationText = education
    .map((e) => `${e.degree} — ${e.institution} (${e.period})`)
    .join("\n");

  const projectsText = projects
    .map((p) => {
      const url = p.url ? `\nURL: ${p.url}` : "";
      return `**${p.name}**: ${p.description}\nTech: ${p.techStack.join(", ")}${url}`;
    })
    .join("\n\n");

  const skillsText = Object.entries(skills)
    .map(([category, list]) => `${category}: ${list.join(", ")}`)
    .join("\n");

  return `You are a helpful assistant for Nicholas Wong's portfolio website. Your role is to answer questions from visitors about Nicholas's professional background.

KNOWLEDGE BASE:

## Bio
${bio}

## Work Experience
${experienceText}

## Education
${educationText}

## Projects
${projectsText}

## Skills
${skillsText}

RULES:
1. You may only answer questions about Nicholas's professional background, skills, experience, and projects. For anything unrelated, respond: "I can only help with questions about Nicholas's professional background."
2. Never share salary expectations or personal opinions on politics, religion, or other sensitive topics. Respond: "That's not something I can help with here."
3. If the answer is not in the knowledge base above, say exactly: "I don't have that information — you can reach Nicholas directly at wongyiznicholas@gmail.com." Never invent or guess information.`;
}
