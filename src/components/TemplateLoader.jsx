// src/components/TemplateLoader.jsx
import React from "react";

export default function TemplateLoader({ onSelect }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">📘 Template:</label>
      <select className="button" onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- select --</option>
        <option value="brd">BRD</option>
        <option value="ssd">SSD</option>
        <option value="sidebar">Sidebar</option>
        <option value="metadata">Metadata Demo</option>
      </select>
    </div>
  );
}
