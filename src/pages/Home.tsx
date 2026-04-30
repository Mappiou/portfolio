import { Hero } from "../components/home/Hero";
import { ProjectsSection } from "../components/projects/ProjectsSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { EducationSection } from "../components/home/EducationSection";
import { SkillsSection } from "../components/home/SkillsSection";
import { PageTear } from "../components/illustrations/Illustrations";
import { SEO } from "../components/seo/SEO";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("meta.siteTitle")} description={t("meta.siteDescription")} />
      <Hero />
      <PageTear />
      <ProjectsSection />
      <PageTear />
      <ExperienceSection />
      <PageTear />
      <EducationSection />
      <PageTear />
      <SkillsSection />
    </>
  );
}
