import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { sketchbook } from "../../styles/sketchbook";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="max-w-4xl mx-auto px-6 pt-8 pb-16"
      aria-labelledby="proj-heading"
    >
      <p style={{ fontFamily: "Caveat, cursive" }} className="text-2xl mb-1 opacity-70">
        {t("sections.page")} 01 ·
      </p>
      <h2 id="proj-heading" className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
        {t("sections.projects")}{" "}
        <span style={{ fontFamily: "Caveat, cursive", color: sketchbook.red }}>
          {t("sections.projectsAccent")}
        </span>
      </h2>
      <div className="space-y-0">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
