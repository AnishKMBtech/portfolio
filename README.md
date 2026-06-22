<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Personal Portfolio & AI Assistant

An interactive, scroll-animated portfolio showcasing a journey from mobile Linux to AI engineering on Arch Linux.

## Features

- **Journey Page**: An interactive terminal-themed timeline showcasing a journey through different projects and phases.
- **Projects**: Highlights of selected AI, Linux, and developer tool projects.
- **AI Assistant**: A custom AI chat interface powered by Gemini.

## Run Locally

### Prerequisites

- **Node.js** (v18+)
- **Gemini API Key** (for the AI Chat functionality)

### Setup & Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory (you can copy `.env.example`):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
