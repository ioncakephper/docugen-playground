# 🧪 Docugen Playground

[![Build Status](https://img.shields.io/travis/com/ioncakephper/docugen-playground.svg?style=for-the-badge)](https://travis-ci.com/ioncakephper/docugen-playground)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

A live, side-by-side editor for converting between Markdown and YAML formats, complete with validation, linting, and theming. This tool is designed to help developers and content creators visualize structured data transformations in real-time.

![Docugen Playground Screenshot](./.github/assets/screenshot.png)
_(A screenshot of the application would go here)_

## ✨ Features

- **Real-time Conversion**: Instantly see the output as you type in either the Markdown or YAML editor.
- **Bidirectional**: Convert from Markdown to YAML, or from YAML back to Markdown.
- **YAML Validation & Linting**: The linter panel provides detailed, actionable feedback on your generated YAML, including line and column numbers for errors.
- **Syntax Highlighting**: Both editor panels feature syntax highlighting for improved readability.
- **Light & Dark Modes**: Switch between themes for your viewing comfort.
- **File Operations**:
  - Load local `.md` or `.yaml` files directly into the editor.
  - Automatically detects file type on load and switches the conversion mode.
  - Save your Markdown or YAML content to local files.
- **Pre-loaded Templates**: Get started quickly by loading common document structures like a BRD or SSD.
- **Auto-Formatting**: Clean up your YAML output with a single click using the "Format YAML" button powered by Prettier.
- **Clipboard Support**: Easily copy the content of either panel to your clipboard.

## 🚀 Live Demo

[**Try Docugen Playground Live!**](https://ioncakephper.github.io/docugen-playground/)

## 🛠️ Installation

### Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your system. This project's required versions are listed in the `engines` field of the `package.json` file (e.g., Node.js `v20.19.0` or higher).

npm (which comes with Node.js) is used for dependency management.

### Steps

To run the Docugen Playground locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ioncakephper/docugen-playground.git
   cd docugen-playground
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 💻 Usage

The playground is designed for a straightforward workflow:

1.  **Select Your Mode**: Use the **Conversion Mode** dropdown to choose between `Markdown → YAML` or `YAML → Markdown`.
2.  **Provide Input**:
    - Type or paste directly into the left-hand editor panel.
    - Use the **Template** dropdown to load a pre-defined structure.
    - Click **📂 Load File** to open a local `.md` or `.yaml` file.
3.  **View Real-time Output**: The right-hand panel will instantly display the converted result.
4.  **Use the Toolbar**: A full suite of tools is available to 💾 save the content of either panel, 📋 copy it to your clipboard, 💅 auto-format the YAML, or 🗑️ clear the editors.
5.  **Check the Linter**: Any structural or syntax errors in the generated YAML will be detailed in the **Lint Messages** panel at the bottom.

## ቴክ Technology Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **YAML Parsing**: js-yaml
- **Code Formatting**: Prettier
- **Linting**: ESLint

## 🗺️ Roadmap

Here are some of the features and improvements we're planning for the future:

- [ ] **State Persistence**: Save the current editor content and theme to `localStorage` so your work is not lost on page refresh. (#1)
- [ ] **Performance Enhancements**: Implement debouncing on editor input to improve performance with large documents. (#2)
- [ ] **Shareable Links**: Generate a unique URL to share your playground session with others. (#3)
- [ ] **CI/CD Integration**: Set up GitHub Actions for automated testing and deployment. (#4)

## ❤️ Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please review and abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
