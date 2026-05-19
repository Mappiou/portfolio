import { describe, it, expect } from "vitest";
import { projects, getProjectById } from "../../src/data/projects";
import { experiences } from "../../src/data/experiences";
import { education } from "../../src/data/education";
import { skills } from "../../src/data/skills";
import { profile } from "../../src/data/profile";
import { SUPPORTED_LANGUAGES } from "../../src/i18n";

describe("data integrity", () => {
  it("has exactly 3 projects with translated content for all languages", () => {
    expect(projects).toHaveLength(3);
    for (const project of projects) {
      for (const lang of SUPPORTED_LANGUAGES) {
        expect(project.tagline[lang]).toBeTruthy();
        expect(project.description[lang]).toBeTruthy();
      }
      // APK is hosted in public/apks/ alongside the site, served from the deployed origin
      expect(project.apkUrl).toMatch(/^\/apks\/[\w-]+\.apk$/);
      // githubUrl is optional — only validated when set (the source repo isn't public yet)
      if (project.githubUrl !== undefined) {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
      }
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.features.length).toBeGreaterThan(0);
    }
  });

  it("getProjectById returns the right project", () => {
    expect(getProjectById("volley-meteo")?.name).toBe("Volley Météo");
    expect(getProjectById("scan2pdf")?.name).toBe("Scan2PDF");
    expect(getProjectById("triolinguo")?.name).toBe("Triolinguo");
    expect(getProjectById("nope")).toBeUndefined();
  });

  it("each experience has translations for all languages", () => {
    expect(experiences.length).toBeGreaterThan(0);
    for (const exp of experiences) {
      for (const lang of SUPPORTED_LANGUAGES) {
        expect(exp.role[lang]).toBeTruthy();
        expect(exp.period[lang]).toBeTruthy();
        expect(exp.description[lang]).toBeTruthy();
        for (const bullet of exp.bullets) {
          expect(bullet[lang]).toBeTruthy();
        }
      }
    }
  });

  it("each education entry has translations + valid kind + a year", () => {
    expect(education.length).toBeGreaterThan(0);
    for (const edu of education) {
      expect(["milestone", "exchange", "internship", "degree", "job", "travel"]).toContain(
        edu.kind,
      );
      expect(edu.school).toBeTruthy();
      expect(edu.location).toBeTruthy();
      expect(typeof edu.year).toBe("number");
      for (const lang of SUPPORTED_LANGUAGES) {
        expect(edu.title[lang]).toBeTruthy();
        expect(edu.period[lang]).toBeTruthy();
        expect(edu.summary[lang]).toBeTruthy();
        expect(edu.description[lang]).toBeTruthy();
      }
    }
  });

  it("timeline covers the full journey including all milestones", () => {
    const ids = education.map((e) => e.id);
    expect(ids).toContain("bac");
    expect(ids).toContain("utt-start");
    expect(ids).toContain("utt-prepa-end");
    expect(ids).toContain("internship-orange-labs");
    expect(ids).toContain("exchange-canada");
    expect(ids).toContain("internship-aubay");
    expect(ids).toContain("exchange-china");
    expect(ids).toContain("engineering-utt");
    expect(ids).toContain("internship-capgemini");
    expect(ids).toContain("master-cybersecurity");
    expect(ids).toContain("job-lincoln");
    expect(ids).toContain("world-trip");
    expect(ids).toContain("job-hexamind");
    // Year range: bac (2015) → Hexamind (2025)
    const years = education.map((e) => e.year);
    expect(Math.min(...years)).toBe(2015);
    expect(Math.max(...years)).toBe(2025);
  });

  it("each skill category has translations and items", () => {
    for (const skill of skills) {
      for (const lang of SUPPORTED_LANGUAGES) {
        expect(skill.category[lang]).toBeTruthy();
      }
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  it("profile has the expected canonical fields", () => {
    expect(profile.name).toBe("Mathieu Diep");
    expect(profile.email).toMatch(/@/);
    expect(profile.links.linkedin).toMatch(/linkedin/);
    // github is optional — only validated when set
    if (profile.links.github !== undefined) {
      expect(profile.links.github).toMatch(/^https:\/\/github\.com\//);
    }
  });
});
