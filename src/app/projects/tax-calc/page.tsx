"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ActionBar } from "./components/ActionBar";
import { SettingsPanel } from "./components/SettingsPanel";
import { TabNavigation } from "./components/TabNavigation";
import { SalaryBreakdown } from "./components/SalaryBreakdown";
import { ExpensesTab } from "./components/ExpensesTab";
import { Toast } from "./components/Toast";
import { defaultSettings, STORAGE_KEY } from "./lib/constants";
import { saveToStorage, loadFromStorage, exportData, importData } from "./lib/storage";
import type { Settings, Expense } from "./lib/constants";

export default function TaxCalcPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("salary");
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [toast, setToast] = useState({ show: false, message: "", icon: "✅" });

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.settings) {
        setSettings({ ...defaultSettings, ...saved.settings });
      }
      if (saved.salary) {
        setSalary(saved.salary);
      }
      if (saved.expenses && Array.isArray(saved.expenses)) {
        setExpenses(saved.expenses);
      }
      if (saved.tab) {
        setCurrentTab(saved.tab);
      }
    }
  }, []);

  useEffect(() => {
    saveToStorage({
      salary,
      expenses,
      tab: currentTab,
      settings,
    });
  }, [salary, expenses, currentTab, settings]);

  const showToast = (message: string, icon = "✅") => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast({ show: false, message: "", icon });
    }, 2500);
  };

  const handleExport = () => {
    exportData(salary, expenses, settings);
    showToast("Data exported successfully", "📤");
  };

  const handleImport = async (file: File) => {
    try {
      const data = await importData(file);
      if (data.salary !== undefined) {
        setSalary(data.salary);
      }
      if (data.expenses && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
        showToast(
          `Imported ${data.expenses.length} expense(s) successfully`,
          "📥"
        );
      }
      if (data.settings) {
        setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch (err) {
      console.error(err);
      showToast("Invalid file format", "❌");
    }
  };

  const handleClear = () => {
    if (
      !confirm(
        "Are you sure you want to clear all data? This cannot be undone."
      )
    )
      return;
    setExpenses([]);
    setSalary("");
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
    showToast("All data cleared", "🗑️");
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Header />
        <ActionBar
          onExport={handleExport}
          onImport={handleImport}
          onClear={handleClear}
          onToggleSettings={() => setSettingsVisible(!settingsVisible)}
        />
        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          visible={settingsVisible}
        />
        <TabNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
        {currentTab === "salary" ? (
          <SalaryBreakdown
            settings={settings}
            salary={salary}
            onSalaryChange={setSalary}
          />
        ) : (
          <ExpensesTab
            settings={settings}
            expenses={expenses}
            onExpensesChange={setExpenses}
            salary={salary}
          />
        )}
        <div className="mt-12 text-center text-gray-600 text-xs">
          <p>
            NZ tax rates from 1 April 2025 (IRD). Estimates only — ACC,
            KiwiSaver, and student loan are configurable in Settings.
          </p>
        </div>
      </div>
      <Toast
        message={toast.message}
        icon={toast.icon}
        show={toast.show}
      />
    </div>
  );
}
