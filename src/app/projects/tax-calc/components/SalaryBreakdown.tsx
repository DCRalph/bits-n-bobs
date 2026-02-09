"use client";

import { useState, useEffect } from "react";
import { money, parseMoney, formatSalaryInput, calcAllDeductions } from "../lib/utils";
import { PERIODS } from "../lib/constants";
import type { Settings } from "../lib/constants";
import { DonutChart } from "./DonutChart";

interface SalaryBreakdownProps {
  settings: Settings;
  salary: string;
  onSalaryChange: (salary: string) => void;
}

export function SalaryBreakdown({
  settings,
  salary,
  onSalaryChange,
}: SalaryBreakdownProps) {
  const [formattedSalary, setFormattedSalary] = useState(salary);
  const [results, setResults] = useState<ReturnType<typeof calcAllDeductions> | null>(null);

  useEffect(() => {
    const parsed = parseMoney(salary);
    if (parsed > 0) {
      const calculated = calcAllDeductions(parsed, settings);
      setResults(calculated);
    } else {
      setResults(null);
    }
  }, [salary, settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSalaryInput(e.target.value);
    setFormattedSalary(formatted);
    const parsed = parseMoney(formatted);
    onSalaryChange(parsed.toString());
  };

  const handleCalculate = () => {
    const parsed = parseMoney(formattedSalary);
    if (parsed > 0) {
      const calculated = calcAllDeductions(parsed, settings);
      setResults(calculated);
    }
  };

  const effectiveRate = results && parseMoney(salary) > 0
    ? (results.totalTax / parseMoney(salary)) * 100
    : 0;

  return (
    <div>
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
        <h2 className="text-xl font-semibold mb-6 text-green-400">
          Enter Your Annual Salary
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label
              className="block text-sm text-gray-400 mb-1.5"
              htmlFor="salaryInput"
            >
              Gross Annual Salary (NZD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                $
              </span>
              <input
                type="text"
                id="salaryInput"
                placeholder="e.g. 75,000"
                value={formattedSalary}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 space-y-6">
          {/* Summary Cards */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Income Tax</p>
                <p className="text-2xl font-bold text-red-400">
                  {money(results.totalTax)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">ACC</p>
                <p className="text-2xl font-bold text-red-300">
                  {money(results.acc)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Student Loan</p>
                <p className="text-2xl font-bold text-orange-300">
                  {money(results.sl)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">KiwiSaver</p>
                <p className="text-2xl font-bold text-blue-300">
                  {money(results.ks)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">After-Deductions</p>
                <p className="text-2xl font-bold text-green-400">
                  {money(results.net)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Total Deductions</p>
                <p className="text-2xl font-bold text-red-400">
                  {money(results.total)}
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Effective Tax Rate</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {effectiveRate.toFixed(2)}%
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-1">Gross Annual</p>
                <p className="text-2xl font-bold text-gray-200">
                  {money(parseMoney(salary))}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Income Tax Bracket Breakdown
              </h4>
              <div className="space-y-2">
                {results.breakdown.map((b, i) => {
                  const maxLabel =
                    b.max === Infinity
                      ? "+"
                      : " – " + money(b.min + b.taxable);
                  const pct = (b.rate * 100).toFixed(1);
                  const barWidth =
                    results.totalTax > 0
                      ? ((b.tax / results.totalTax) * 100).toFixed(1)
                      : "0";
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-36 text-gray-400 text-xs shrink-0">
                        {money(b.min)}
                        {maxLabel}
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-full h-5 overflow-hidden">
                        <div
                          className="h-full bg-green-600/70 rounded-full flex items-center pl-2 text-xs text-white font-medium"
                          style={{ width: `${Math.max(parseFloat(barWidth), 8)}%` }}
                        >
                          {pct}%
                        </div>
                      </div>
                      <div className="w-28 text-right text-gray-300 text-xs shrink-0">
                        {money(b.tax)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-green-400 self-start">
                Gross Income Split
              </h3>
              <DonutChart
                segments={[
                  { label: "Take Home", value: results.net, color: "#22c55e" },
                  {
                    label: "Income Tax",
                    value: results.totalTax,
                    color: "#ef4444",
                  },
                  { label: "ACC", value: results.acc, color: "#f97316" },
                  {
                    label: "Student Loan",
                    value: results.sl,
                    color: "#fb7185",
                  },
                  {
                    label: "KiwiSaver",
                    value: results.ks,
                    color: "#3b82f6",
                  },
                ].filter((s) => s.value > 0)}
                centerLines={[money(results.net), "Take Home"]}
              />
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Income Breakdown
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">
                    Period
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    Gross
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    Income Tax
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    ACC
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    Student Loan
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    KiwiSaver
                  </th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">
                    Net (After All)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {PERIODS.map((p) => {
                  const gross = parseMoney(salary) / p.divisor;
                  const tax = results.totalTax / p.divisor;
                  const accP = results.acc / p.divisor;
                  const slP = results.sl / p.divisor;
                  const ksP = results.ks / p.divisor;
                  const netP = results.net / p.divisor;
                  return (
                    <tr key={p.label} className="hover:bg-gray-800/50">
                      <td className="py-3 px-2 font-medium">{p.label}</td>
                      <td className="py-3 px-2 text-right text-gray-300">
                        {money(gross)}
                      </td>
                      <td className="py-3 px-2 text-right text-red-400">
                        {money(tax)}
                      </td>
                      <td className="py-3 px-2 text-right text-red-300">
                        {money(accP)}
                      </td>
                      <td className="py-3 px-2 text-right text-orange-300">
                        {money(slP)}
                      </td>
                      <td className="py-3 px-2 text-right text-blue-300">
                        {money(ksP)}
                      </td>
                      <td className="py-3 px-2 text-right text-green-400 font-semibold">
                        {money(netP)}
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
