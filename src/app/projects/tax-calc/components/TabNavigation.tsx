"use client";

interface TabNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({
  currentTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-lg bg-gray-800 p-1 gap-1">
        <button
          onClick={() => onTabChange("salary")}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            currentTab === "salary"
              ? "bg-green-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          💰 Salary Breakdown
        </button>
        <button
          onClick={() => onTabChange("expenses")}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
            currentTab === "expenses"
              ? "bg-green-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          📋 Required Salary
        </button>
      </div>
    </div>
  );
}
