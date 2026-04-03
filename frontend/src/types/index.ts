export type HiringCategory = "planner" | "performer" | "crew";

export interface EventBasics {
  eventName: string;
  eventType: string;
  dateType: "single" | "range";
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  hiringFor: HiringCategory;
}

export interface PlannerDetails {
  plannerType: string;
  guestCount?: number;
  budget: string;
  servicesNeeded: string[];
  experienceRequired: string;
  additionalNotes?: string;
  urgency: string;
  preferredContactMethod: string;
}

export interface PerformerDetails {
  performerType: string;
  genre?: string;
  performanceDuration: string;
  numberOfPerformers?: number;
  equipmentProvided: boolean;
  budgetRange: string;
  specialRequirements?: string;
  previousExperience?: string;
  preferredStyle?: string;
}

export interface CrewDetails {
  crewType: string;
  numberOfCrewNeeded?: number;
  shiftDuration: string;
  experienceLevel: string;
  certificationsRequired: string[];
  equipmentFamiliarity?: string;
  budgetPerPerson: string;
  uniformRequired: boolean;
  briefingTime?: string;
}

export interface FormData {
  eventBasics: EventBasics;
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
}

export type StepId = 1 | 2 | 3 | 4;
