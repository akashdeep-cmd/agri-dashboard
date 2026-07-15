export type SchemeLevel = "central" | "state";
export type SchemeAccent = "brand" | "success" | "warning";

export interface Portal {
  name: string;
  url: string;
}

export interface Scheme {
  id: string;
  name: string;
  level: SchemeLevel;
  category: string;
  description: string;
  benefit: {
    summary: string;
    annualValueInr: number | null;
  };
  portal: Portal;
  secondaryPortal?: Portal;
  applicationRoute: string;
  requiredDocuments: string[];
  tags: string[];
  icon: string;
  accent: SchemeAccent;
}

export type FarmerCategory = "marginal" | "small" | "semi-medium" | "medium";

export interface Farmer {
  id: string;
  name: string;
  initials: string;
  village: string;
  taluka: string;
  district: string;
  landHoldingAcres: number;
  category: FarmerCategory;
  crops: string[];
  age: number;
  aadhaarLinked: boolean;
  landRecordVerified: boolean;
  bankLinked: boolean;
}

export type EligibilityStatus =
  | "eligible"
  | "missing_documents"
  | "pending"
  | "not_eligible";

export interface EligibilityResult {
  schemeId: string;
  status: EligibilityStatus;
  estimatedAnnualBenefitInr: number;
  missingDocuments: string[];
  note?: string;
}

export interface FarmerEligibility {
  farmerId: string;
  results: EligibilityResult[];
  aiNotice: {
    extraMatches: number;
    cropTrigger: string;
  };
}

export interface DemoCredentials {
  email: string;
  password: string;
  operator: { name: string; centerId: string };
}

export type BadgeTone = "success" | "warning" | "danger" | "brand" | "neutral";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  badge?: { text: string; tone: BadgeTone };
  footnote: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ActivityDay {
  day: string;
  inPerson: number;
  online: number;
}

export interface DashboardData {
  center: {
    name: string;
    subtitle: string;
    operator: { name: string; centerId: string };
    lastSyncedLabel: string;
  };
  stats: DashboardStat[];
  quickActions: QuickAction[];
  weeklyActivity: {
    rangeLabel: string;
    series: { key: "inPerson" | "online"; label: string }[];
    days: ActivityDay[];
  };
  policyNotice: {
    title: string;
    message: string;
    linkText: string;
  };
}
