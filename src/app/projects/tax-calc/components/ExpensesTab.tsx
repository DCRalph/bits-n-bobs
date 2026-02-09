"use client";

import { useState } from "react";
import { money, parseMoney, formatExpenseInput, escapeHtml, calcAllDeductions, grossFromTargetNet, totalAnnualExpenses } from "../lib/utils";
import { PERIODS, FREQ_TO_ANNUAL, CHART_COLORS } from "../lib/constants";
import type { Settings, Expense } from "../lib/constants";
import { DonutChart } from "./DonutChart";
import { HorizontalBarChart } from "./HorizontalBarChart";
import { GroupedBarChart } from "./GroupedBarChart";
import { WaterfallChart } from "./WaterfallChart";
import { GaugeChart } from "./GaugeChart";

interface ExpensesTabProps {
  settings: Settings;
  expenses: Expense[];
  onExpensesChange: (expenses: Expense[]) => void;
  salary: string;
}

export function ExpensesTab({
  settings,
  expenses,
  onExpensesChange,
  salary,
}: ExpensesTabProps) {
  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expFreq, setExpFreq] = useState<keyof typeof FREQ_TO_ANNUAL>("monthly");

  const totalExp = totalAnnualExpenses(expenses);
  const requiredGross = expenses.length > 0 ? grossFromTargetNet(totalExp, settings) : 0;
  const requiredDeds = expenses.length > 0 ? calcAllDeductions(requiredGross, settings) : null;
  const actualGross = parseMoney(salary);
  const actualDeds = actualGross > 0 ? calcAllDeductions(actualGross, settings) : null;
  const surplus = actualDeds ? actualDeds.net - totalExp : 0;
  const showComparison = actualGross > 0 && expenses.length > 0;

  const handleAddExpense = () => {
    const name = expName.trim();
    const amount = parseFloat(expAmount.replace(/[^0-9.]/g, ""));

    if (!name) {
      return;
    }
    if (!amount || amount <= 0) {
      return;
    }

    onExpensesChange([...expenses, { name, amount, freq: expFreq }]);
    setExpName("");
    setExpAmount("");
    setExpFreq("monthly");
  };

  const handleRemoveExpense = (idx: number) => {
    onExpensesChange(expenses.filter((_, i) => i !== idx));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpAmount(formatExpenseInput(e.target.value));
  };

  const requiredEffRate = requiredDeds && requiredGross > 0
    ? (requiredDeds.totalTax / requiredGross) * 100
    : 0;

  return (
    <div>
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-green-400">
          Your Expenses
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Add all your regular expenses. We&apos;ll calculate the gross annual
          salary you need (before tax) to cover them all.
        </p>

        {/* Expense Form */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end mb-4">
          <div className="sm:col-span-4">
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <input
              type="text"
              value={expName}
              onChange={(e) => setExpName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddExpense();
              }}
              placeholder="e.g. Rent"
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm text-gray-400 mb-1">Amount (NZD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="text"
                value={expAmount}
                onChange={handleAmountChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddExpense();
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm text-gray-400 mb-1">Frequency</label>
            <select
              value={expFreq}
              onChange={(e) => setExpFreq(e.target.value as keyof typeof FREQ_TO_ANNUAL)}
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              onClick={handleAddExpense}
              className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-2 mt-4">
          {expenses.map((e, i) => {
            const annual = e.amount * (FREQ_TO_ANNUAL[e.freq] || 1);
            return (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="font-medium">{escapeHtml(e.name)}</div>
                  <div className="text-gray-400 text-sm">
                    {money(e.amount)} • {e.freq}
                  </div>
                  <div className="text-gray-300 text-sm hidden sm:block">
                    Annual: {money(annual)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveExpense(i)}
                  className="px-3 py-1.5 text-sm bg-red-600/60 hover:bg-red-600 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* No expenses message */}
        {expenses.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-700 rounded-xl mt-4">
            <p className="text-lg mb-1">No expenses added yet</p>
            <p className="text-sm">
              Add your regular expenses above to get started
            </p>
          </div>
        )}
      </div>

      {/* Expense Results */}
      {expenses.length > 0 && requiredDeds && (
        <div className="mt-8 space-y-6">
          {/* Summary Cards */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Required Salary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Total Annual Expenses</p>
                <p className="text-2xl font-bold text-orange-400">
                  {money(totalExp)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center border-2 border-green-500/30">
                <p className="text-sm text-gray-400 mb-1">Required Gross Salary</p>
                <p className="text-2xl font-bold text-green-400">
                  {money(requiredGross)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Total Deductions</p>
                <p className="text-2xl font-bold text-red-400">
                  {money(requiredDeds.total)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Effective Tax Rate</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {requiredEffRate.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-green-400 self-start">
                Expense Breakdown
              </h3>
              <DonutChart
                segments={expenses.map((e, i) => ({
                  label: e.name,
                  value: e.amount * (FREQ_TO_ANNUAL[e.freq] || 1),
                  color: CHART_COLORS[i % CHART_COLORS.length]!,
                }))}
                centerLines={[money(totalExp), "Annual Expenses"]}
              />
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-green-400 self-start">
                Required Salary Split
              </h3>
              <DonutChart
                segments={[
                  { label: "Expenses (Net)", value: totalExp, color: "#22c55e" },
                  {
                    label: "Income Tax",
                    value: requiredDeds.totalTax,
                    color: "#ef4444",
                  },
                  ...(settings.accEnabled
                    ? [{ label: "ACC", value: requiredDeds.acc, color: "#f97316" }]
                    : []),
                  ...(settings.slEnabled
                    ? [
                        {
                          label: "Student Loan",
                          value: requiredDeds.sl,
                          color: "#fb7185",
                        },
                      ]
                    : []),
                  ...(settings.ksEmployee > 0
                    ? [
                        {
                          label: "KiwiSaver",
                          value: requiredDeds.ks,
                          color: "#3b82f6",
                        },
                      ]
                    : []),
                ]}
                centerLines={[money(requiredGross), "Required Gross"]}
              />
            </div>
          </div>

          {/* Expenses horizontal bar */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Annual Cost per Expense
            </h3>
            <HorizontalBarChart
              items={expenses.map((e, i) => ({
                label: e.name,
                value: e.amount * (FREQ_TO_ANNUAL[e.freq] || 1),
                color: CHART_COLORS[i % CHART_COLORS.length]!,
              }))}
            />
          </div>

          {/* Comparison Section */}
          {showComparison && actualDeds && (
            <>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex-1 h-px bg-gray-700"></div>
                <h2 className="text-xl font-bold text-cyan-400 shrink-0 flex items-center gap-2">
                  📊 Compared to Your Salary
                </h2>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* Comparison summary cards */}
              <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 mb-1">Your Gross Salary</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {money(actualGross)}
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 mb-1">Your Net Salary</p>
                    <p className="text-2xl font-bold text-blue-300">
                      {money(actualDeds.net)}
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 mb-1">Expenses (% of Net)</p>
                    <p className="text-2xl font-bold">
                      {actualDeds.net > 0
                        ? ((totalExp / actualDeds.net) * 100).toFixed(1) + "%"
                        : "—"}
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 mb-1">
                      {surplus >= 0 ? "Surplus / Year" : "Shortfall / Year"}
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        surplus >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {money(surplus)}
                    </p>
                  </div>
                </div>

                {/* Surplus period breakdown */}
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PERIODS.map((p) => {
                      const periodValue = surplus / p.divisor;
                      return (
                        <div
                          key={p.label}
                          className="bg-gray-800 rounded-lg p-3 text-center"
                        >
                          <div className="text-xs text-gray-400">{p.label}</div>
                          <div
                            className={`text-lg font-semibold ${
                              periodValue >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {money(periodValue)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Comparison charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400 self-start">
                    Your Salary Allocation
                  </h3>
                  <DonutChart
                    segments={[
                      {
                        label: "Expenses",
                        value: Math.min(totalExp, actualDeds.net),
                        color: "#22c55e",
                      },
                      {
                        label: "Income Tax",
                        value: actualDeds.totalTax,
                        color: "#ef4444",
                      },
                      ...(settings.accEnabled
                        ? [{ label: "ACC", value: actualDeds.acc, color: "#f97316" }]
                        : []),
                      ...(settings.slEnabled
                        ? [
                            {
                              label: "Student Loan",
                              value: actualDeds.sl,
                              color: "#fb7185",
                            },
                          ]
                        : []),
                      ...(settings.ksEmployee > 0
                        ? [
                            {
                              label: "KiwiSaver",
                              value: actualDeds.ks,
                              color: "#3b82f6",
                            },
                          ]
                        : []),
                      {
                        label: "Surplus",
                        value: Math.max(0, surplus),
                        color: "#06b6d4",
                      },
                    ].filter((s) => s.value > 0)}
                    centerLines={[money(actualGross), "Your Gross"]}
                  />
                </div>
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                    Actual vs Required Salary
                  </h3>
                  <GroupedBarChart
                    labels={["Annual", "Monthly", "Weekly"]}
                    datasets={[
                      {
                        label: "Required Gross",
                        color: "#22c55e",
                        values: [
                          requiredGross,
                          requiredGross / 12,
                          requiredGross / 52,
                        ],
                      },
                      {
                        label: "Your Gross",
                        color: "#3b82f6",
                        values: [actualGross, actualGross / 12, actualGross / 52],
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Where Your Money Goes */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                  Where Your Money Goes
                </h3>
                <WaterfallChart
                  items={[
                    {
                      label: "Gross Salary",
                      value: actualGross,
                      color: "#60a5fa",
                      type: "start",
                    },
                    {
                      label: "Income Tax",
                      value: actualDeds.totalTax,
                      color: "#ef4444",
                      type: "subtract",
                    },
                    ...(settings.accEnabled
                      ? [
                          {
                            label: "ACC",
                            value: actualDeds.acc,
                            color: "#f97316",
                            type: "subtract" as const,
                          },
                        ]
                      : []),
                    ...(settings.slEnabled
                      ? [
                          {
                            label: "Student Loan",
                            value: actualDeds.sl,
                            color: "#fb7185",
                            type: "subtract" as const,
                          },
                        ]
                      : []),
                    ...(settings.ksEmployee > 0
                      ? [
                          {
                            label: "KiwiSaver",
                            value: actualDeds.ks,
                            color: "#3b82f6",
                            type: "subtract" as const,
                          },
                        ]
                      : []),
                    {
                      label: "Net Pay",
                      value: actualDeds.net,
                      color: "#22c55e",
                      type: "end",
                    },
                  ]}
                />
              </div>

              {/* Monthly budget gauge */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                  Monthly Budget Overview
                </h3>
                <GaugeChart
                  segments={[
                    {
                      label: "Expenses",
                      value: Math.min(totalExp / 12, actualDeds.net / 12),
                      color: "#22c55e",
                    },
                    {
                      label: "Surplus",
                      value: Math.max(0, (actualDeds.net - totalExp) / 12),
                      color: "#06b6d4",
                    },
                  ]}
                  total={actualDeds.net / 12 > 0 ? actualDeds.net / 12 : totalExp / 12}
                />
              </div>
            </>
          )}

          {/* Period breakdown table */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Required Gross Salary by Period
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-2 text-gray-400 font-medium">
                    Period
                  </th>
                  <th className="text-right py-2 px-2 text-gray-400 font-medium">
                    Gross
                  </th>
                  <th className="text-right py-2 px-2 text-gray-400 font-medium">
                    Net (After Deductions)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {PERIODS.map((p) => {
                  const gross = requiredGross / p.divisor;
                  const net = totalExp / p.divisor;
                  return (
                    <tr key={p.label} className="hover:bg-gray-800/50">
                      <td className="py-3 px-2 font-medium">{p.label}</td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {money(gross)}
                      </td>
                      <td className="py-3 px-2 text-right text-green-400 font-semibold">
                        {money(net)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
