const templates = {
  brd: {
    markdown: `## BRD: User Access Management  
_owner_: \`Product Team\`  

_Sections_:  
- Business Goals  
- Stakeholders  
- Functional Requirements`,

    yaml: `title: "User Access Management"
type: "BRD"
owner: "Product Team"
sections:
  - label: "Business Goals"
  - label: "Stakeholders"
  - label: "Functional Requirements"`,
  },

  ssd: {
    markdown: `## SSD: Access Control API  
_owner_: \`Engineering\`  

_Sections_:  
- Architecture Overview  
- Endpoints  
- Rate Limiting`,

    yaml: `title: "Access Control API"
type: "SSD"
owner: "Engineering"
sections:
  - label: "Architecture Overview"
  - label: "Endpoints"
  - label: "Rate Limiting"`,
  },

  sidebar: {
    markdown: `## Docs Overview

- Getting Started  
  _slug_: \`getting-started\`  
  _tags_: \`[intro, core]\`

  _Headings_:  
  - Install  
  - Configure`,

    yaml: `sidebars:
  - label: "Docs Overview"
    items:
      - label: "Getting Started"
        slug: "getting-started"
        tags: ["intro", "core"]
        headings:
          - "Install"
          - "Configure"`,
  },

  metadata: {
    markdown: `<!---
title: Metadata Demo
version: 3.0
tags: [api, internal]
outputPath: ./docs/
--->

## API Reference  
_slug_: \`api-reference\`  
_tags_: \`[core, public]\`  

_Headings_:  
- Authentication  
- Rate Limiting`,

    yaml: `title: "Metadata Demo"
version: "3.0"
tags: ["api", "internal"]
outputPath: "./docs/"
sidebars:
  - label: "API Reference"
    items:
      - label: "API Reference"
        slug: "api-reference"
        tags: ["core", "public"]
        headings:
          - "Authentication"
          - "Rate Limiting"`,
  },
};

export default templates;
