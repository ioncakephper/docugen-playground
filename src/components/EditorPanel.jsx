import { useState } from "react";
import { useSplitPane } from "../hooks/useSplitPane";
import "./EditorPanel.css";
import prettier from "prettier/standalone";
import yamlParser from "prettier/parser-yaml";

function EditorPanel({
  mode,
  markdown,
  setMarkdown,
  yaml,
  setYaml,
  lintMessages,
  onFileLoad,
  onClearAll,
}) {
  const { containerRef, leftWidth, startDrag } = useSplitPane("50%");
  const [copyStatus, setCopyStatus] = useState(null); // 'markdown', 'yaml', or null

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileLoad = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileLoad) {
      onFileLoad(file);
    }
  };

  // Determine which content to show in which panel
  const leftContent = mode === "markdown-to-yaml" ? markdown : yaml;
  const rightContent = mode === "markdown-to-yaml" ? yaml : markdown;

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (mode === "markdown-to-yaml") {
      setMarkdown(value);
    } else {
      setYaml(value);
    }
  };

  const handleFormatYaml = async () => {
    try {
      const formattedYaml = await prettier.format(yaml, {
        parser: "yaml",
        plugins: [yamlParser],
      });
      setYaml(formattedYaml);
    } catch (error) {
      console.error("Failed to format YAML:", error);
    }
  };

  const handleCopy = async (content, type) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <>
      <div className="toolbar mb-4">
        <label className="button">
          📂 Load File
          <input
            type="file"
            hidden
            accept=".md,.yaml,.txt"
            onChange={handleFileLoad}
          />
        </label>
        <button onClick={() => downloadFile(markdown, "markdown.md")}>
          💾 Save Markdown
        </button>
        <button onClick={() => handleCopy(markdown, "markdown")}>
          {copyStatus === "markdown" ? "✅ Copied!" : "📋 Copy Markdown"}
        </button>
        <button onClick={() => downloadFile(yaml, "output.yaml")}>
          💾 Save YAML
        </button>
        <button onClick={() => handleCopy(yaml, "yaml")}>
          {copyStatus === "yaml" ? "✅ Copied!" : "📋 Copy YAML"}
        </button>
        <button onClick={handleFormatYaml}>💅 Format YAML</button>
        <button onClick={onClearAll}>🗑️ Clear All</button>
      </div>

      <div className="split-container" ref={containerRef}>
        <div className="panel left" style={{ width: leftWidth }}>
          <textarea
            value={leftContent}
            onChange={handleInputChange}
            className="editor"
            spellCheck={false}
          />
        </div>
        <div className="divider" onMouseDown={startDrag} />
        <div
          className="panel right"
          style={{ width: `calc(100% - ${leftWidth})` }}
        >
          <pre className="preview">{rightContent || ""}</pre>
        </div>
      </div>

      <div className="lint-container">
        <h3>Lint Messages</h3>
        {lintMessages.length === 0 ? (
          <p className="lint-ok">✅ No issues detected</p>
        ) : (
          <ul>
            {lintMessages.map((msg, i) => (
              <li key={i} className={`lint-${msg.type}`}>
                {msg.line && (
                  <span
                    className="lint-location"
                    title={`Line ${msg.line}, Column ${msg.column || 1}`}
                  >
                    {msg.line}:{msg.column || 1}
                  </span>
                )}
                <strong>{msg.type.toUpperCase()}</strong>
                {": "}
                {msg.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default EditorPanel;
