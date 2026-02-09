"use client";

interface ActionBarProps {
  onExport: () => void;
  onImport: (file: File) => void;
  onClear: () => void;
  onToggleSettings: () => void;
}

export function ActionBar({
  onExport,
  onImport,
  onClear,
  onToggleSettings,
}: ActionBarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={onExport}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors flex items-center gap-2"
      >
        <span>📤</span> Export Data
      </button>
      <label className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
        <span>📥</span> Import Data
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-800 hover:bg-red-900/50 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors flex items-center gap-2"
      >
        <span>🗑️</span> Clear All
      </button>
      <button
        onClick={onToggleSettings}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors flex items-center gap-2"
      >
        <span>⚙️</span> Settings
      </button>
    </div>
  );
}
