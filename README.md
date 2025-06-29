# 🎥 ReelZone

ReelZone is a modern video-sharing platform built with the latest technologies in the JavaScript ecosystem. It allows users to register, upload videos, view profiles, and explore content, all in a clean, responsive UI.

## 🚀 Live Demo

[🔗 [https://your-netlify-site.netlify.app](https://crazyreelzone.netlify.app/)]  

---

## 📌 Features

- 🧑‍💻 User Authentication with **NextAuth**
- 📹 Upload and stream videos via **ImageKit**
- 🔐 Secure API routes with **JWT** sessions
- 📄 User profiles with personal video posts
- 🧼 Responsive UI built with **Tailwind CSS** & **DaisyUI**
- ⚙️ Backend powered by **MongoDB & Mongoose**
- 📁 Modular folder structure using **Next.js App Router**
- 🧠 Fully typed with **TypeScript**

---

## 🧰 Tech Stack

| Layer       | Tech                            |
|-------------|---------------------------------|
| Frontend    | Next.js 15 (App Router)         |
| Styling     | Tailwind CSS, DaisyUI           |
| Backend     | API Routes in Next.js           |
| Auth        | NextAuth.js (JWT Session)       |
| DB          | MongoDB with Mongoose           |
| Media       | ImageKit for video upload       |
| Language    | TypeScript                      |
| Deployment  | Netlify                         |

---

## 📂 Folder Structure (Highlights)

```bash
/
├── app/
│   ├── login/                # Login page
│   ├── register/             # Register page
│   ├── profile/              # User profile page
│   ├── upload/               # Upload form
│   └── api/
│       ├── videos/           # Video API routes
│       ├── auth/             # Auth API (NextAuth)
│       └── imagekit-auth/    # ImageKit signing route
├── components/               # Reusable UI components (e.g., VideoCard)
├── lib/                      # Database, API client, auth helpers
├── models/                   # Mongoose schemas
├── public/                   # Static assets
└── styles/                   # Global styles (if any)
