# 🐾 PetCare Hub — Pet Adoption & Inventory Management Platform

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

A modern, responsive Single Page Application (SPA) built with **React**, **TypeScript**, and **Tailwind CSS**, consuming the public **Swagger Petstore REST API**. 

The platform allows users to browse adoptable pets with real-time status filtering and search, inspect item details, and register new pets with fallback image handling and strict data validation.

---

## 🚀 Live Demo

- **Production URL:** [https://petstore-app.onrender.com](https://petstore-app.onrender.com) *(Update with your live URL)*
- **API Documentation:** [Swagger Petstore v2](https://petstore.swagger.io/)

---

## ✨ Features

- **Dynamic Status Filtering:** Seamlessly switch between pet availability states (`Available`, `Pending`, `Sold`).
- **Real-Time Client-Side Search:** Instant name filtering with debounced state updates.
- **Robust Data Sanitization:** Client-side filtering layer that purges noisy or malformed records from the shared public API.
- **Fallback Asset Handling:** Automatic fallback images for entries missing external photo URLs.
- **Responsive Dashboard UI:** Clean card grid layout crafted with modern Tailwind CSS utilities and accessible badges.
- **Multi-Stage Containerization:** Production-ready `Dockerfile` leveraging an Nginx alpine image to serve static assets efficiently.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Tooling & Bundler:** Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Containerization & Deployment:** Docker, Nginx, Render

---

## 🏗️ Architecture & Project Structure

```text
petstore-app/
├── public/                 # Static assets
├── src/
│   ├── api/                # API integration layer & type definitions
│   │   └── petApi.ts       # Typed fetch requests & response transformers
│   ├── components/         # Reusable presentation & container components
│   │   ├── AddPetForm.tsx  # Controlled pet registration form
│   │   └── PetList.tsx     # Card grid, status tabs & live search
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Tailwind directives & base styles
│   └── main.tsx            # DOM root mounting
├── Dockerfile              # Multi-stage production build configuration
├── nginx.conf              # SPA routing reverse-proxy rules
├── tailwind.config.js      # Tailwind design system configuration
└── vite.config.ts          # Vite build & development server config
