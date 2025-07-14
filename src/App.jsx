import React, { useState, useEffect } from "react";
import EditorPanel from "./components/EditorPanel.jsx";
import TemplateLoader from "./components/TemplateLoader.jsx";
import ModeSwitcher from "./components/ModeSwitcher.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import templates from "./utils/templates.js";
import { parseMarkdown, serializeYAML, runLinter } from "./utils/docugen.js";
import "./styles/main.css";

export default function App() {
  const [mode, setMode] = useState("markdown-to-yaml"); // 'markdown-to-yaml' or 'yaml-to-markdown'
  const [markdown, setMarkdown] = useState(templates.brd.markdown);
  const [yaml, setYaml] = useState("");
  const [lintMessages, setLintMessages] = useState([]);
  const [theme, setTheme] = useState("light");

  const handleTemplate = (templateKey) => {
    const selected = templates[templateKey];
    if (selected) {
      setMarkdown(selected.markdown || "");
      // The effect below will handle the conversion to YAML
    }
  };

  const handleFileLoad = (file) => {
    if (!file) return;

    file.text().then((text) => {
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith(".yaml") || fileName.endsWith(".yml")) {
        setMode("yaml-to-markdown");
        setYaml(text);
      } else {
        // Default to markdown for .md, .markdown, .txt, or anything else
        setMode("markdown-to-yaml");
        setMarkdown(text);
      }
    });
  };

  const handleClearAll = () => {
    setMarkdown("");
    setYaml("");
    setLintMessages([]);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    // This effect handles Markdown -> YAML conversion
    if (mode !== "markdown-to-yaml") return;
    try {
      const generatedYaml = parseMarkdown(markdown);
      setYaml(generatedYaml);
      setLintMessages(runLinter(generatedYaml));
    } catch (err) {
      const message = err.reason || err.message;
      setYaml(`# Error parsing Markdown: ${message}`);
      setLintMessages([
        {
          type: "error",
          message: message,
          line: err.mark?.line ? err.mark.line + 1 : undefined,
          column: err.mark?.column ? err.mark.column + 1 : undefined,
        },
      ]);
    }
  }, [markdown, mode]);

  useEffect(() => {
    // This effect handles YAML -> Markdown conversion
    if (mode !== "yaml-to-markdown") return;
    try {
      const generatedMarkdown = serializeYAML(yaml);
      setMarkdown(generatedMarkdown);
      setLintMessages(runLinter(yaml)); // Lint the source YAML
    } catch (err) {
      const message = err.reason || err.message;
      setMarkdown(`# Error parsing YAML: ${message}`);
      setLintMessages([
        {
          type: "error",
          message: message,
          line: err.mark?.line ? err.mark.line + 1 : undefined,
          column: err.mark?.column ? err.mark.column + 1 : undefined,
        },
      ]);
    }
  }, [yaml, mode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="flex-grow">
          <h1 className="app-title">🧪 Docugen Playground</h1>
          <p className="app-subtitle">
            Live Markdown ↔ YAML conversion, linting, and structure validation
          </p>
        </div>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </header>

      <div className="main-toolbar">
        <ModeSwitcher mode={mode} setMode={setMode} />
        <TemplateLoader onSelect={handleTemplate} />
      </div>

      <EditorPanel
        mode={mode}
        markdown={markdown}
        setMarkdown={setMarkdown}
        yaml={yaml}
        setYaml={setYaml}
        lintMessages={lintMessages}
        onFileLoad={handleFileLoad}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
