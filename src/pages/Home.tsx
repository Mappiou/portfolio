import { useTranslation } from "react-i18next";
import { Hero } from "../components/sections/Hero";
import { BioSection } from "../components/sections/BioSection";
import { TimelineSection } from "../components/sections/TimelineSection";
import { EducationSection } from "../components/sections/EducationSection";
import { PassionsSection } from "../components/sections/PassionsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SEO } from "../components/seo/SEO";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("meta.siteTitle")} description={t("meta.siteDescription")} />
      <Hero />
      <BioSection />
      <TimelineSection />
      <EducationSection />
      <PassionsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
