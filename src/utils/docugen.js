import yaml from "js-yaml";

export function parseMarkdown(mdText) {
  const lines = mdText.split("\n");
  const result = { sidebars: [] };
  let currentSidebar = null;
  const stack = [];

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || /^---+$/.test(line)) return;

    if (/^##\s+/.test(line)) {
      const label = line.replace(/^##\s+/, "");
      currentSidebar = { label, items: [] };
      result.sidebars.push(currentSidebar);
      stack.length = 0;
      stack.push({ indent: 0, item: null, items: currentSidebar.items });
      return;
    }

    const itemMatch = /^-\s+(.*)/.exec(line);
    if (itemMatch) {
      const indent = rawLine.search(/\S/);
      let rawLabel = itemMatch[1];
      const item = {};

      // Extract metadata
      const metaRegex = /_(\w+)_:\s*(\[[^\]]*\]|[^\s]+)\s*/g;
      let metaMatch;
      while ((metaMatch = metaRegex.exec(rawLabel))) {
        const [_, key, value] = metaMatch;
        try {
          item[key] = value.startsWith("[") ? JSON.parse(value) : value;
        } catch {
          item[key] = value;
        }
        rawLabel = rawLabel.replace(metaMatch[0], "").trim();
      }

      item.label = rawLabel;

      while (stack.length && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1] || { items: currentSidebar.items };
      if (!parent.items) {
        parent.item.items = [];
        parent.items = parent.item.items;
      }
      parent.items.push(item);

      stack.push({ indent, item, items: null });
      return;
    }

    if (/^_Headings_:/.test(line)) {
      const indent = rawLine.search(/\S/);
      const parent = stack.find((s) => s.indent < indent);
      const lastItem = parent?.item;

      if (lastItem && !lastItem.items) {
        lastItem.headings = [];
        stack.push({ indent, item: null, items: lastItem.headings });
      } else {
        console.warn(
          `Skipping _Headings_ under "${lastItem?.label}" because it has children`,
        );
      }
      return;
    }
  });

  result.sidebars.forEach((sidebar) => {
    const clean = (items) => {
      items.forEach((item) => {
        if (item.items?.length) {
          clean(item.items);
        } else {
          delete item.items;
        }
      });
    };
    if (Array.isArray(sidebar.items)) clean(sidebar.items);
  });

  return yaml.dump(result);
}

export function serializeYAML(yamlText) {
  try {
    const obj = yaml.load(yamlText);
    if (!obj || typeof obj !== "object" || !Array.isArray(obj.sidebars))
      return "";

    const renderItems = (items = [], depth = 0) =>
      items
        .map((item) => {
          if (!item || !item.label) return "";
          let line = `${" ".repeat(depth * 2)}- ${item.label}`;

          const meta = Object.entries(item)
            .filter(([k]) => !["label", "items", "headings"].includes(k))
            .map(([k, v]) => {
              const val = Array.isArray(v) ? JSON.stringify(v) : v;
              return `_${k}_: ${val}`;
            })
            .join(" ");
          if (meta) line += " " + meta;

          if (Array.isArray(item.headings)) {
            line +=
              `\n${" ".repeat((depth + 1) * 2)}_Headings_:\n` +
              item.headings
                .map((h) => `${" ".repeat((depth + 2) * 2)}- ${h.label}`)
                .join("\n");
          }

          if (Array.isArray(item.items) && item.items.length > 0) {
            line += "\n" + renderItems(item.items, depth + 1);
          }

          return line;
        })
        .join("\n");

    return obj.sidebars
      .map(
        (sidebar) =>
          `## ${sidebar.label}\n\n${renderItems(sidebar.items || [])}`,
      )
      .join("\n\n");
  } catch (err) {
    throw new Error("Invalid YAML: " + err.message);
  }
}

export function runLinter(yamlText) {
  const messages = [];
  try {
    const obj = yaml.load(yamlText);
    if (!obj || typeof obj !== "object") {
      messages.push({ type: "error", message: "YAML must be an object" });
      return messages;
    }

    if (!Array.isArray(obj.sidebars)) {
      messages.push({
        type: "error",
        message: "`sidebars` should be an array",
      });
      return messages;
    }

    obj.sidebars.forEach((sidebar, sIdx) => {
      if (!sidebar.label) {
        messages.push({
          type: "warning",
          message: `Sidebar #${sIdx + 1} missing label`,
        });
      }

      if (!Array.isArray(sidebar.items)) {
        messages.push({
          type: "error",
          message: `Sidebar "${sidebar.label}" items must be an array`,
        });
        return;
      }

      const validateItems = (items, path = "") => {
        items.forEach((item, idx) => {
          const label = item.label || `Item #${idx + 1}`;
          const prefix = path ? `${path}/${label}` : label;

          if (!item.label) {
            messages.push({
              type: "warning",
              message: `${prefix} missing label`,
            });
          }

          if (item.tags && !Array.isArray(item.tags)) {
            messages.push({
              type: "warning",
              message: `${prefix} tags must be an array`,
            });
          }

          if (item.headings) {
            if (!Array.isArray(item.headings)) {
              messages.push({
                type: "warning",
                message: `${prefix} headings must be an array`,
              });
            } else if (item.items && item.items.length > 0) {
              messages.push({
                type: "error",
                message: `${prefix} has both child items and _Headings_ — only one is allowed`,
              });
            }
          }

          if (Array.isArray(item.items)) {
            validateItems(item.items, prefix);
          }
        });
      };

      validateItems(sidebar.items, sidebar.label);
    });
  } catch (err) {
    messages.push({
      type: "error",
      message: "YAML parse failed: " + err.message,
    });
  }

  return messages;
}
