import { projects } from "@/app/data/projects";

export function ProjectsGrid() {
  return (
    <div className="px-8 py-8 max-w-225 mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primary tracking-tight">Projects</h1>
        <p className="text-sm text-muted mt-1">Things I&apos;ve built and shipped</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-colors"
          >
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

            {project.url && (
              <div className="flex gap-3 pt-1 border-t border-border">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-muted hover:text-primary transition-colors flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 10L10 2M10 2H5M10 2v5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
