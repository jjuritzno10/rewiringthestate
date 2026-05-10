export type Role = {
  id: string;
  title: string;
  team: string;
  teamId: TeamId;
  location: string;
  url: string;
  category: Category;
  featured?: boolean;
  desc?: string;
};

export type TeamId =
  | "justice"
  | "iai"
  | "fellowship"
  | "no10ds"
  | "aisi"
  | "police";

export type Category =
  | "Engineering"
  | "Product"
  | "Security"
  | "Platform"
  | "Research"
  | "Design";

export const TEAMS: Record<TeamId, { name: string; blurb: string; site: string }> = {
  justice: {
    name: "Justice AI",
    blurb: "Shipping AI inside the Ministry of Justice — courts, prisons, probation.",
    site: "https://ai.justice.gov.uk",
  },
  iai: {
    name: "i.AI",
    blurb: "The government's incubator for AI products, building across departments.",
    site: "https://ai.gov.uk",
  },
  fellowship: {
    name: "No10 Fellowship",
    blurb:
      "Senior engineers seconded into the centre on the Prime Minister's hardest problems.",
    site: "https://fellows.ai.gov.uk",
  },
  no10ds: {
    name: "No10 Data Science",
    blurb: "Data scientists at the centre of government.",
    site: "https://10ds.ai.gov.uk",
  },
  aisi: {
    name: "AI Security Institute",
    blurb: "Evaluating frontier models and advancing the science of safe AI.",
    site: "https://aisi.gov.uk",
  },
  police: {
    name: "Police AI",
    blurb: "AI across UK policing — frontline tools to force-wide platforms.",
    site: "#",
  },
};

export const ROLES: Role[] = [
  {
    id: "justice-fde",
    title: "Forward Deployed Engineer",
    team: "Justice AI",
    teamId: "justice",
    location: "London, UK",
    url: "https://ai.justice.gov.uk/careers",
    category: "Engineering",
    featured: true,
    desc: "Ship code in the field. Work shoulder-to-shoulder with users in prisons, courts and probation.",
  },
  {
    id: "justice-platform",
    title: "Platform Engineer",
    team: "Justice AI",
    teamId: "justice",
    location: "London, UK",
    url: "https://ai.justice.gov.uk/careers",
    category: "Platform",
    desc: "Design and maintain the secure systems that power AI at scale.",
  },
  {
    id: "justice-pm",
    title: "AI Product Manager",
    team: "Justice AI",
    teamId: "justice",
    location: "London, UK",
    url: "https://ai.justice.gov.uk/careers",
    category: "Product",
    desc: "Translate user needs into AI products that are usable, ethical and impactful.",
  },
  {
    id: "iai-applied",
    title: "Applied AI Engineer",
    team: "i.AI",
    teamId: "iai",
    location: "London, UK",
    url: "https://ai.gov.uk/opportunities/",
    category: "Engineering",
    featured: true,
    desc: "Rapidly designing, testing and deploying AI products across government.",
  },
  {
    id: "iai-head",
    title: "Head of Applied AI",
    team: "i.AI",
    teamId: "iai",
    location: "London, UK",
    url: "https://ai.gov.uk/opportunities/",
    category: "Engineering",
    desc: "Lead the engineers shipping frontier AI into government.",
  },
  {
    id: "fellowship-fde",
    title: "Forward Deployed Engineer",
    team: "No10 Fellowship",
    teamId: "fellowship",
    location: "London, UK",
    url: "https://fellows.ai.gov.uk/",
    category: "Engineering",
    featured: true,
    desc: "Senior engineers seconded into the centre on the Prime Minister's hardest problems.",
  },
  {
    id: "aisi-research",
    title: "Research Engineer",
    team: "AI Security Institute",
    teamId: "aisi",
    location: "London, UK",
    url: "https://aisi.gov.uk/careers",
    category: "Research",
    desc: "Evaluate frontier models. Stress-test capability and safety claims.",
  },
  {
    id: "aisi-redteam",
    title: "Red Team Lead",
    team: "AI Security Institute",
    teamId: "aisi",
    location: "London, UK",
    url: "https://aisi.gov.uk/careers",
    category: "Security",
    desc: "Lead adversarial evaluations of frontier AI systems.",
  },
  {
    id: "no10ds-eng",
    title: "Data Scientist",
    team: "No10 Data Science",
    teamId: "no10ds",
    location: "London, UK",
    url: "https://10ds.ai.gov.uk",
    category: "Engineering",
    desc: "Turning data into insight for the Prime Minister's priorities.",
  },
];

export const UPCOMING: { teamId: TeamId; note: string }[] = [
  { teamId: "police", note: "Hiring soon — frontline AI tools across UK policing." },
];
