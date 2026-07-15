import type {
  DashboardData,
  DemoCredentials,
  EligibilityResult,
  Farmer,
  FarmerEligibility,
  Scheme,
} from "./types";

import authJson from "@/data/auth.json";
import dashboardJson from "@/data/dashboard.json";
import eligibilityJson from "@/data/eligibility.json";
import farmersJson from "@/data/farmers.json";
import schemesJson from "@/data/schemes.json";

const schemes = schemesJson as Scheme[];
const farmers = farmersJson as Farmer[];
const eligibility = eligibilityJson as FarmerEligibility[];
const dashboard = dashboardJson as DashboardData;
const demoCredentials = authJson as DemoCredentials;

export function getDashboard(): DashboardData {
  return dashboard;
}

export function getDemoCredentials(): DemoCredentials {
  return demoCredentials;
}

export function getSchemes(): Scheme[] {
  return schemes;
}

export function getSchemeById(id: string): Scheme | undefined {
  return schemes.find((scheme) => scheme.id === id);
}

export function getFarmer(id: string): Farmer | undefined {
  return farmers.find((farmer) => farmer.id === id);
}

export function getFarmerEligibility(
  farmerId: string,
): FarmerEligibility | undefined {
  return eligibility.find((entry) => entry.farmerId === farmerId);
}

export interface SchemeResult {
  scheme: Scheme;
  result: EligibilityResult;
}

/** Joins a farmer's eligibility results with scheme records, dropping not_eligible. */
export function getFarmerSchemeResults(farmerId: string): SchemeResult[] {
  const entry = getFarmerEligibility(farmerId);
  if (!entry) return [];

  return entry.results
    .filter((result) => result.status !== "not_eligible")
    .flatMap((result) => {
      const scheme = getSchemeById(result.schemeId);
      return scheme ? [{ scheme, result }] : [];
    });
}

export interface FarmerSummary {
  eligibleCount: number;
  totalBenefitInr: number;
  actionRequiredCount: number;
  missingDocsSchemeCount: number;
}

export function getFarmerSummary(farmerId: string): FarmerSummary {
  const results = getFarmerEligibility(farmerId)?.results ?? [];
  const eligible = results.filter((r) => r.status === "eligible");

  return {
    eligibleCount: eligible.length,
    totalBenefitInr: eligible.reduce(
      (sum, r) => sum + r.estimatedAnnualBenefitInr,
      0,
    ),
    actionRequiredCount: results.filter(
      (r) => r.status === "missing_documents" || r.status === "pending",
    ).length,
    missingDocsSchemeCount: results.filter(
      (r) => r.status === "missing_documents",
    ).length,
  };
}
