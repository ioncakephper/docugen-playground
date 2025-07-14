import React from "react";

export default function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Conversion Mode:</label>
      <select
        className="button"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="markdown-to-yaml">Markdown → YAML</option>
        <option value="yaml-to-markdown">YAML → Markdown</option>
      </select>
    </div>
  );
}
