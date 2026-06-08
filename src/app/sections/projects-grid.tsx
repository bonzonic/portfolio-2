"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/projects";

export function ProjectsGrid() {
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--shimmer-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--shimmer-y", `${e.clientY - rect.top}px`);
      }}
      className="group/shimmer relative px-8 py-8 max-w-225 mx-auto"
    >
      <div
        aria-hidden="true"
        className="shimmer-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/shimmer:opacity-100"
      />

      <div className="relative">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-primary tracking-tight">Projects</h1>
          <p className="text-sm text-muted mt-1">Things I&apos;ve built and shipped</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group bg-surface border border-border rounded-xl overflow-hidden flex flex-col hover:border-white/20 transition-colors"
            >
              {project.images?.[0] && (
                <div className="relative w-full aspect-video overflow-hidden border-b border-border">
                  <Image
                    src={project.images[0].src}
                    alt={`${project.name} preview`}
                    width={1440}
                    height={900}
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h2 className="text-[14px] font-semibold text-primary">{project.name}</h2>
                  <p className="text-[13px] text-muted mt-1 line-clamp-2">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] text-dim border border-border rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border">
                  <span className="text-[12px] text-muted group-hover:text-primary transition-colors">
                    View details →
                  </span>
                  {project.url && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.url, "_blank", "noopener,noreferrer");
                      }}
                      className="text-[12px] text-muted hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 10L10 2M10 2H5M10 2v5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Live
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
