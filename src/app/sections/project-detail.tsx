"use client";

import Link from "next/link";
import type { Project } from "@/app/data/projects";

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 10L10 2M10 2H5M10 2v5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M9 2L3 7l6 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="px-8 py-8 max-w-180 mx-auto">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors mb-8"
      >
        <BackIcon />
        Projects
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primary tracking-tight">{project.name}</h1>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] text-dim border border-border rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-[14px] text-muted leading-relaxed mb-6">{project.longDescription}</p>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[12px] font-semibold uppercase tracking-widest text-dim mb-3">
            Highlights
          </h2>
          <ul className="flex flex-col gap-2">
            {project.highlights.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-muted leading-relaxed">
                <span className="mt-[6px] w-1 h-1 rounded-full bg-dim shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      {(project.url || project.github) && (
        <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.75 rounded-lg text-[13px] border border-border text-muted hover:text-primary hover:border-white/20 transition-colors"
            >
              <ExternalLinkIcon />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.75 rounded-lg text-[13px] border border-border text-muted hover:text-primary hover:border-white/20 transition-colors"
            >
              <ExternalLinkIcon />
              GitHub
            </a>
          )}
        </div>
      )}
    </div>
  );
}
