// src/types.ts

export type EventKind = "meeting" | "workshop" | "ctf" | "social" | "speaker";

export interface ClubEvent {
  id: string;
  title: string;
  /** ISO date-time, e.g. "2026-09-24T18:30:00-04:00" */
  start: string;
  location: string;
  kind: EventKind;
  blurb: string;
  /** Optional sign-up / RSVP link */
  link?: string;
}

export interface Officer {
  name: string;
  role: string;
  focus: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

export interface Resource {
  name: string;
  href: string;
  description: string;
  cost: "free" | "freemium" | "paid" | "student";
}

export interface ResourceGroup {
  category: string;
  items: Resource[];
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface SocialLink {
  label: string;
  href: string;
}
