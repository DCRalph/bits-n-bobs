import { STORAGE_KEY } from "./constants";
import type { Settings, Expense } from "./constants";

export interface StoredData {
  salary: string;
  expenses: Expense[];
  tab: string;
  settings: Settings;
}

export function saveToStorage(data: StoredData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage(): StoredData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredData;
  } catch (e) {
    console.warn("Failed to load saved data", e);
    return null;
  }
}

export function exportData(
  salary: string,
  expenses: Expense[],
  settings: Settings
): void {
  const data = {
    version: 2,
    exportedAt: new Date().toISOString(),
    salary,
    expenses,
    settings,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nz-income-calc-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file: File): Promise<{
  salary?: string;
  expenses?: Expense[];
  settings?: Settings;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = e.target?.result;
        const data = JSON.parse(
          typeof raw === "string" ? raw : ""
        ) as Record<string, unknown>;
        resolve({
          salary: data.salary as string | undefined,
          expenses: data.expenses as Expense[] | undefined,
          settings: data.settings as Settings | undefined,
        });
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    };
    reader.onerror = () =>
      reject(new Error(reader.error?.message ?? "Failed to read file"));
    reader.readAsText(file);
  });
}
