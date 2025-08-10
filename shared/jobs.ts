export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: string;
  deadline?: string;
  isRemote: boolean;
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead";
  logo?: string;
  companySize?: string;
  industry?: string;
}

export interface JobFilter {
  location?: string;
  type?: string;
  experienceLevel?: string;
  salary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  isRemote?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  location?: string;
  skills: string[];
  experience: string;
  savedJobs: string[];
  appliedJobs: string[];
}
