import profileData from "./profile.json";
import focusData from "./focus.json";
import experienceData from "./experience.json";
import educationData from "./education.json";
import researchData from "./research.json";
import projectsData from "./projects.json";
import journeyData from "./journey.json";
import venturesData from "./ventures.json";
import contentData from "./content.json";
import leadershipData from "./leadership.json";
import galleryData from "./gallery.json";
import skillsData from "./skills.json";

export type FocusStatus = "up" | "in progress" | "learning" | "planned";
export type JourneyStatus = "done" | "now" | "next";

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
  cv: string | null;
  links: Record<"linkedin" | "github" | "youtube" | "facebook" | "instagram", string | null>;
  siteUrl: string;
};

export type Project = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  link: string | null;
  featured: boolean;
  upcoming: boolean;
};

export type Video = { title: string; url: string; thumbnail: string; series?: string };

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  exif?: string;
};

export type Exhibition = { name: string; date: string; venue: string; detail?: string };

export const profile = profileData as Profile;
export const focus = focusData as { interface: string; status: FocusStatus; description: string }[];
export const experience = experienceData as {
  title: string;
  org: string;
  place: string;
  period: string;
  current: boolean;
  summary: string;
  bullets: string[];
  todo?: string;
}[];
export const education = educationData;
export const research = researchData as {
  title: string;
  type: string;
  status: string;
  summary: string;
  tags: string[];
  link: string | null;
}[];
export const projects = projectsData as Project[];
export const journey = journeyData as { date: string; title: string; detail: string; status: JourneyStatus }[];
export const ventures = venturesData as {
  name: string;
  place: string;
  launch: string;
  summary: string;
  link: string | null;
}[];
export const content = contentData as {
  summary: string;
  series: { name: string; detail: string }[];
  videos: Video[];
};
export const leadership = leadershipData as {
  roles: { title: string; period: string; summary: string }[];
  gear: string[];
  exhibitions: Exhibition[];
};
export const gallery = galleryData as Photo[];
export const skills = skillsData;

export const projectCategories = [
  "Networking",
  "Automation",
  "Security",
  "Cloud",
  "Research",
  "Software design",
] as const;
