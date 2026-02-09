// NZ Tax Brackets (from 1 April 2025)
export const TAX_BRACKETS = [
  { min: 0, max: 15600, rate: 0.105 },
  { min: 15600, max: 53500, rate: 0.175 },
  { min: 53500, max: 78100, rate: 0.3 },
  { min: 78100, max: 180000, rate: 0.33 },
  { min: 180000, max: Infinity, rate: 0.39 },
];

export const PERIODS = [
  { label: "Weekly", divisor: 52 },
  { label: "Fortnightly", divisor: 26 },
  { label: "Monthly", divisor: 12 },
  { label: "Quarterly", divisor: 4 },
  { label: "Annually", divisor: 1 },
];

export const FREQ_TO_ANNUAL = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
} as const;

export const CHART_COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#6366f1",
  "#84cc16",
  "#e879f9",
  "#fb923c",
  "#2dd4bf",
  "#818cf8",
];

export const STORAGE_KEY = "nz_income_calc";

export interface Settings {
  ksEmployee: number; // 0..0.10
  slEnabled: boolean;
  slRate: number;
  slThreshold: number;
  accEnabled: boolean;
  accRate: number;
  accCap: number;
}

export const defaultSettings: Settings = {
  ksEmployee: 0,
  slEnabled: false,
  slRate: 0.12,
  slThreshold: 22828,
  accEnabled: false,
  accRate: 0.0167,
  accCap: 142283,
};

export interface Expense {
  name: string;
  amount: number;
  freq: keyof typeof FREQ_TO_ANNUAL;
}

export interface TaxBreakdown {
  min: number;
  max: number;
  rate: number;
  taxable: number;
  tax: number;
}

export interface DeductionsResult {
  totalTax: number;
  acc: number;
  ks: number;
  sl: number;
  total: number;
  net: number;
  breakdown: TaxBreakdown[];
}
