// src/data/site.ts
import type {
  ClubEvent,
  NavLink,
  Officer,
  ResourceGroup,
  SocialLink,
} from "../types";

export const club = {
  name: "UNCG InfoSec Club",
  short: "InfoSec",
  school: "UNC Greensboro",
  tagline: "Learn offense. Build defense. Break things ethically.",
  description:
    "A student-run community at UNC Greensboro for anyone curious about cybersecurity — from first-semester students who have never opened a terminal to seniors prepping for their OSCP.",
  meeting: {
    cadence: "Every Tuesday",
    time: "4:30 – 5:30 PM",
    room: "Petty Building",
  },
  email: "infosec@uncg.edu", // TODO: confirm real address
  discord: "https://discord.gg/uncg-infosec", // TODO: real invite
  spartanConnect: "https://uncg.campuslabs.com/engage/", // TODO: org page URL
};

/** Rotating phrases for the hero typewriter. Module-level so the ref is stable. */
export const heroPhrases: string[] = [
  "capture the flag.",
  "reverse the binary.",
  "read the packet capture.",
  "patch the vuln.",
  "land the internship.",
];

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Officers", href: "#officers" },
  { label: "Resources", href: "#resources" },
  { label: "Join", href: "#join" },
];

export const pillars = [
  {
    title: "Weekly Hands-On Labs",
    body: "Live walkthroughs on HackTheBox and TryHackMe boxes. Bring a laptop; we supply the VMs and the hints.",
  },
  {
    title: "Competitive CTF Team",
    body: "We field teams for NCAE Cyber Games, CCDC, and open CTFs. Practice sessions run the two weeks before each event.",
  },
  {
    title: "Career & Cert Roadmap",
    body: "We help you map a path through industry certs — Security+, CySA+, OSCP — based on where you want to end up, plus resume and mock-interview support.",
  },
  {
    title: "Zero Prereqs",
    body: "No major requirement, no experience requirement. Half our members started with no idea what a subnet was.",
  },
];

export const events: ClubEvent[] = [
  {
    id: "kickoff-f26",
    title: "Fall Kickoff + Pizza",
    start: "2026-09-16T18:30:00-04:00",
    location: "Petty 219",
    kind: "social",
    blurb:
      "Meet the officers, see the semester roadmap, and claim a club sticker. Free pizza while it lasts.",
  },
  {
    id: "linux-101",
    title: "Workshop: Linux & the Terminal from Zero",
    start: "2026-09-30T18:30:00-04:00",
    location: "Petty 219",
    kind: "workshop",
    blurb:
      "Filesystem, permissions, pipes, and grep. The single highest-leverage session for beginners — start here.",
  },
  {
    id: "webexploit",
    title: "Workshop: Web Exploitation Basics",
    start: "2026-10-14T18:30:00-04:00",
    location: "Petty 219",
    kind: "workshop",
    blurb:
      "SQL injection, XSS, and broken access control against a deliberately vulnerable app we host locally.",
  },
  {
    id: "speaker-ir",
    title: "Speaker Night: Incident Response in the Real World",
    start: "2026-10-28T18:30:00-04:00",
    location: "Bryan 160",
    kind: "speaker",
    blurb:
      "A SOC analyst walks through an actual ransomware engagement, timeline to postmortem. Bring questions.",
  },
  {
    id: "spartanctf",
    title: "SpartanCTF — Fall Internal Competition",
    start: "2026-11-14T10:00:00-05:00",
    location: "Petty Atrium",
    kind: "ctf",
    blurb:
      "Eight hours, five categories, beginner track included. Teams of up to four. Prizes for the top three.",
    link: "#join",
  },
];

export const officers: Officer[] = [
  {
    name: "Yash Patel",
    role: "President",
    focus: "Sets the semester roadmap and runs weekly meetings.",
    email: "infosec@uncg.edu",
  },
  {
    name: "Bridger Hansen",
    role: "Vice President",
    focus: "Backs up the president, handles logistics and scheduling.",
    email: "infosec@uncg.edu",
  },
  {
    name: "Adrian Escobar",
    role: "Technical",
    focus: "Builds labs, CTF infrastructure, and workshop content.",
    email: "infosec@uncg.edu",
  },
  {
    name: "Gopal Vulli",
    role: "Event Management",
    focus: "Plans and runs club events end to end.",
    email: "infosec@uncg.edu",
  },
  {
    name: "Varshini Kaleru",
    role: "Outreach Lead",
    focus: "Recruiting, socials, and partnerships with other orgs.",
    email: "infosec@uncg.edu",
  },
  {
    name: "Xiaochen Li",
    role: "Professor Advisor",
    focus: "Department of Computer Science",
    email: "infosec@uncg.edu",
  },
];

export const resourceGroups: ResourceGroup[] = [
  {
    category: "Start Here",
    items: [
      {
        name: "TryHackMe",
        href: "https://tryhackme.com",
        description: "Guided rooms with hand-holding. Best on-ramp if you're new.",
        cost: "freemium",
      },
      {
        name: "OverTheWire: Bandit",
        href: "https://overthewire.org/wargames/bandit/",
        description: "34 levels of pure Linux/SSH fundamentals. Do all of them.",
        cost: "free",
      },
      {
        name: "PicoCTF",
        href: "https://picoctf.org",
        description: "Beginner CTF archive that stays online year-round.",
        cost: "free",
      },
    ],
  },
  {
    category: "Go Deeper",
    items: [
      {
        name: "Hack The Box",
        href: "https://hackthebox.com",
        description: "Less guidance, more realism. Where our CTF team practices.",
        cost: "freemium",
      },
      {
        name: "PortSwigger Web Security Academy",
        href: "https://portswigger.net/web-security",
        description: "The definitive free web-exploitation curriculum.",
        cost: "free",
      },
      {
        name: "pwn.college",
        href: "https://pwn.college",
        description: "University-grade binary exploitation and systems security.",
        cost: "free",
      },
    ],
  },
  {
    category: "Career",
    items: [
      {
        name: "NICE Framework",
        href: "https://niccs.cisa.gov/workforce-development/nice-framework",
        description: "Maps real job roles to the skills you need. Use it to aim.",
        cost: "free",
      },
      {
        name: "UNCG Career Services",
        href: "https://careers.uncg.edu",
        description: "Resume reviews and the Handshake job board.",
        cost: "student",
      },
      {
        name: "CyberSeek Heat Map",
        href: "https://www.cyberseek.org",
        description: "Live openings by state and role. NC demand is strong.",
        cost: "free",
      },
    ],
  },
];

export const socials: SocialLink[] = [
  { label: "Discord", href: club.discord },
  { label: "GitHub", href: "https://github.com/uncg-infosec" },
  { label: "LinkedIn", href: "https://linkedin.com/company/uncg-infosec" },
  { label: "Spartan Connect", href: club.spartanConnect },
];
