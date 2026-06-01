import { useTranslation } from "react-i18next";
import { useHashScroll } from "@shared/hooks/useHashScroll";
import { Hero } from "../components/sections/Hero";
import { BioSection } from "../components/sections/BioSection";
import { EducationSection } from "../components/sections/EducationSection";
import { TravelSection } from "../components/sections/TravelSection";
import { PassionsSection } from "../components/sections/PassionsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SEO } from "../components/seo/SEO";

export default function Home() {
  const { t } = useTranslation();
  useHashScroll();
  return (
    <>
      <SEO title={t("meta.siteTitle")} description={t("meta.siteDescription")} />
      <Hero />
      <BioSection />
      <EducationSection />
      <PassionsSection />
      <TravelSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
