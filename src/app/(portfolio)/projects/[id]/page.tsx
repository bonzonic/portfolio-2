"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { projects } from "@/app/data/projects";
import { ProjectDetail } from "@/app/sections/project-detail";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
