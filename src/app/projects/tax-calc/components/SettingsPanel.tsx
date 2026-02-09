"use client";

import type { Settings } from "../lib/constants";
import { clamp } from "../lib/utils";

interface SettingsPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
  visible: boolean;
}

export function SettingsPanel({
  settings,
  onChange,
  visible,
}: SettingsPanelProps) {
  const handleChange = (updates: Partial<Settings>) => {
    onChange({ ...settings, ...updates });
  };

  return (
    <div
      className={`bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 mb-8 ${
        visible ? "" : "hidden"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        Deductions & Options
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KiwiSaver */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="font-semibold text-green-300 mb-3">KiwiSaver</h3>
          <label className="block text-sm text-gray-400 mb-1">
            Employee Contribution
          </label>
          <select
            value={settings.ksEmployee}
            onChange={(e) =>
              handleChange({ ksEmployee: parseFloat(e.target.value) })
            }
            className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
          >
            <option value="0">0%</option>
            <option value="0.03">3%</option>
            <option value="0.04">4%</option>
            <option value="0.06">6%</option>
            <option value="0.08">8%</option>
            <option value="0.10">10%</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Applied on gross salary (employee share only).
          </p>
        </div>

        {/* Student Loan */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="font-semibold text-green-300 mb-3">Student Loan</h3>
          <label className="inline-flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={settings.slEnabled}
              onChange={(e) => handleChange({ slEnabled: e.target.checked })}
              className="w-4 h-4 accent-green-500"
            />
            <span>Enable repayments</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={settings.slRate}
                  onChange={(e) =>
                    handleChange({
                      slRate: clamp(parseFloat(e.target.value) || 0, 0, 1),
                    })
                  }
                  className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  /1
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Annual Threshold
              </label>
              <input
                type="number"
                step="1"
                value={settings.slThreshold}
                onChange={(e) =>
                  handleChange({
                    slThreshold: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            12% on income over threshold by default.
          </p>
        </div>

        {/* ACC Earner's Levy */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h3 className="font-semibold text-green-300 mb-3">
            ACC Earner&apos;s Levy
          </h3>
          <label className="inline-flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={settings.accEnabled}
              onChange={(e) => handleChange({ accEnabled: e.target.checked })}
              className="w-4 h-4 accent-green-500"
            />
            <span>Include ACC levy</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  max="1"
                  value={settings.accRate}
                  onChange={(e) =>
                    handleChange({
                      accRate: clamp(parseFloat(e.target.value) || 0, 0, 1),
                    })
                  }
                  className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  /1
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Max Liable Earnings
              </label>
              <input
                type="number"
                step="1"
                value={settings.accCap}
                onChange={(e) =>
                  handleChange({ accCap: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Turn off to match &quot;income tax only&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
