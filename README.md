# Travel Insurance Inquiry & Claim Chat App (Frontend)

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/Framework-Next.js%20%2F%20React-blue?style=flat-square&logo=next.js)](https://nextjs.org/)

This repository contains the user interface for the **Travel Insurance Inquiry & Claim Chat Application**. Built as a modern, accessible web application, it provides customers with an interactive chat interface to query insurance coverage boundaries and seamlessly file claims via an intelligent AI assistant.

**Backend Repo:** https://github.com/vincent168e/travel-insurance-rag-chat-backend

The application is fully optimized for speed, utilizes streaming technologies to minimize perceived latency, and is deployed via **Vercel**.

---

## 🚀 Core Features

- **Real-Time Token Streaming:** Implements native handling for Server-Sent Events (SSE - real-time token streaming) to render the AI assistant's responses word-by-word, mimicking a desktop typing experience.
- **Dynamic Claim Capture UI:** Renders rich interactive UI widgets or form fields directly inside the chat layout when the backend agent requests structured claim details.
- **Mobile-First Responsive Design:** Fully adaptive layouts designed to run flawlessly on mobile browsers for travelers needing to file claims directly from an airport or transit hub.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) / React 18+
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS & Radix UI / Shadcn UI components
- **Icons:** Lucide React
- **Streaming Client:** Native Fetch API / `@microsoft/fetch-event-source` (for reliable header pass-through during streaming connections)
