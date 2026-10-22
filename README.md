# My-mcq-s: NPTEL Interactive Exam Preparation Platform

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kushal200514/My-mcq-s)

An interactive exam preparation web application for practicing questions from the **NPTEL Design and Implementation of Human-Computer Interfaces (HCI)** course.

Built with **React, TypeScript, Vite, and Tailwind CSS**.

## ✨ Features

- **3,000 Questions Comprehensive Bank**:
  - Dedicated practice section featuring **2,250 questions** across Weeks 1 to 12 extracted from 752 lecture pages.
  - Separated according to weeks for focused preparation.
  - Flexible batch modes: 25-Question Sprint, 50-Question Focused, 100-Question Marathon, or Full Week Set.
  - In-line question browser with answer & explanation toggles.
- **Live Exam Countdown**: Real-time ticker counting down to the exam date (23 October 2026).
- **Assignment Question Bank (148 Qs)**: Extracted from official NPTEL assignment submissions (2024, 2025) and IIT Guwahati detailed solution keys.
- **Practice Mode**:
  - Instant answer validation (green/red feedback).
  - Source PDF and page references for every question.
  - Comprehensive explanations and syllabus rationale.
  - Keyboard shortcuts (`A`–`E` to pick options, `Enter` to submit, `Arrow` keys to navigate).
- **Timed Exam Mode**:
  - Hidden answers until test submission.
  - Configurable countdown timer (15, 30, 45, 60 minutes).
  - Unattempted question warning modal.
  - Detailed scorecard and accuracy analytics upon completion.
- **Repeated Practice & Smart Filtering**:
  - Unlimited retries with isolated attempt histories.
  - Focus filters: *Retry Missed Questions*, *Bookmarked Questions*, *Difficult Questions*, *Full Mock Exam*, and *Unseen Questions*.
- **Performance Analytics**:
  - Week-by-week accuracy breakdown chart.
  - Historical score progression.
  - Topic-level diagnostics identifying weak areas.
- **Verification & In-App Editor**:
  - Searchable audit table with source PDF traceability.
  - In-app question editing and JSON import workflow for adding more questions.
- **Local Persistence & Portability**:
  - Progress saved locally in browser storage (no login required).
  - Full JSON backup export and restore.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **State & Storage**: React Context + LocalStorage API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kushal200514/My-mcq-s.git

# Navigate to the project directory
cd My-mcq-s

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```
