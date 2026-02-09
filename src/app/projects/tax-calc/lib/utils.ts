import { TAX_BRACKETS, FREQ_TO_ANNUAL } from "./constants";
import type { Settings, DeductionsResult, TaxBreakdown, Expense } from "./constants";

export function money(n: number): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  const formatted =
    "$" +
    abs.toLocaleString("en-NZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return neg ? "-" + formatted : formatted;
}

export function parseMoney(str: string): number {
  return parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
}

export function formatSalaryInput(value: string): string {
  const raw = value.replace(/[^0-9]/g, "");
  if (raw) return parseInt(raw).toLocaleString("en-NZ");
  return "";
}

export function formatExpenseInput(value: string): string {
  let raw = value.replace(/[^0-9.]/g, "");
  const parts = raw.split(".");
  if (parts.length > 2) raw = parts[0] + "." + parts.slice(1).join("");
  return raw;
}

export function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function calcIncomeTax(annualIncome: number): {
  totalTax: number;
  breakdown: TaxBreakdown[];
} {
  let remaining = annualIncome;
  let totalTax = 0;
  const breakdown: TaxBreakdown[] = [];

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const bracketWidth =
      bracket.max === Infinity ? remaining : bracket.max - bracket.min;
    const taxable = Math.min(remaining, bracketWidth);
    const tax = Math.max(0, taxable) * bracket.rate;
    totalTax += tax;
    if (taxable > 0) {
      breakdown.push({
        min: bracket.min,
        max: bracket.max,
        rate: bracket.rate,
        taxable,
        tax,
      });
    }
    remaining -= taxable;
  }
  return { totalTax, breakdown };
}

export function calcAcc(annualIncome: number, settings: Settings): number {
  if (!settings.accEnabled) return 0;
  const liable = Math.min(annualIncome, settings.accCap);
  return liable * settings.accRate;
}

export function calcKiwiSaver(annualIncome: number, settings: Settings): number {
  const rate = settings.ksEmployee || 0;
  return annualIncome * rate;
}

export function calcStudentLoan(
  annualIncome: number,
  settings: Settings
): number {
  if (!settings.slEnabled) return 0;
  const over = Math.max(0, annualIncome - settings.slThreshold);
  return over * settings.slRate;
}

export function calcAllDeductions(
  annualIncome: number,
  settings: Settings
): DeductionsResult {
  const { totalTax, breakdown } = calcIncomeTax(annualIncome);
  const acc = calcAcc(annualIncome, settings);
  const ks = calcKiwiSaver(annualIncome, settings);
  const sl = calcStudentLoan(annualIncome, settings);
  const total = totalTax + acc + ks + sl;
  const net = annualIncome - total;
  return { totalTax, acc, ks, sl, total, net, breakdown };
}

// Reverse: find gross needed so that net (after income tax, acc, sl, ks) equals targetNet
export function grossFromTargetNet(
  targetNet: number,
  settings: Settings
): number {
  let lo = 0;
  let hi = Math.max(targetNet * 2.5, 1);
  // Increase hi until net(hi) >= targetNet
  for (let i = 0; i < 20; i++) {
    const netHi = calcAllDeductions(hi, settings).net;
    if (netHi >= targetNet) break;
    hi *= 2;
    if (hi > 1e8) break;
  }
  let ans = hi;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const netMid = calcAllDeductions(mid, settings).net;
    if (netMid >= targetNet) {
      ans = mid;
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return ans;
}

export function totalAnnualExpenses(expenses: Expense[]): number {
  return expenses.reduce(
    (sum, e) => sum + e.amount * (FREQ_TO_ANNUAL[e.freq] || 1),
    0
  );
}
