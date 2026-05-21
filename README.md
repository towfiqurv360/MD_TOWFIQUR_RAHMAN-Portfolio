# Modern Full-Stack Developer Portfolio & Project Registry

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

A high-performance, visually striking, and fully dynamic full-stack portfolio built using **Next.js (App Router)** and **Supabase**. This system moves completely away from static JSON file dependencies, serving real-time data seamlessly from a database. It features an enterprise-grade **Admin Dashboard (Project Registry)** to manage, preview, and deploy modern web applications on the fly.

## 🚀 Key Features

- **Real-Time Database Architecture:** Driven completely by Supabase SSR Client, eliminating static asset recompilation for data updates.
- **Dynamic Project Registry (CMS):** A powerful, private Admin Dashboard allowing multi-source project initialization (Manual Configurations, GitHub Repository tracking, and direct ZIP file mounts).
- **Interactive Live Preview System:** Real-time state synchronization within the dashboard that showcases exactly how cards, descriptions, and technology badges will render before deploying to the public stream.
- **Cinematic Frontend Layer:** Immersive user experience powered by **Framer Motion** physics, sleek cyber-grid layout systems, fluid responsive layouts, and an isolated custom cursor mesh.
- **Unified Action Buttons:** Streamlined deployment cards featuring isolated, single-click entry gates for both production live servers and GitHub open-source repositories.
- **Secure Infrastructure:** Centralized state routing with decoupled system architectures, customizable table protocols, and optimized Row Level Security (RLS) pipelines.

## 🛠️ Technology Stack Matrix

| Architecture Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router), React, TypeScript |
| **Styling & Theme** | Tailwind CSS, Cyberpunk-Dark Mesh Utilities |
| **Motion & Physics** | Framer Motion, Hardware-Accelerated GPU Transforms |
| **Database & Auth** | Supabase Backend, SSR Client Integration |
| **Icons & Assets** | Lucide React |
| **Hosting & CI/CD** | Vercel Edge Networks / Netlify |

## ⚙️ Environment Variables Setup

To spin up this architecture locally, create a `.env.local` file in the root directory and append the following cryptographic keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anonymous_key

```

## 📦 Local Installation Guide

  1. Clone the master repository to your workstation:
```
git clone https://github.com/towfiqurv360/MD_TOWFIQUR_RAHMAN-Portfolio.git

```
   2. Access the root file directory:
      
    cd your-repo-name


   3. Install the enterprise dependency manifests:
    
     npm install
     
    
 4. Launch the local development pipeline server:

      npm run dev
      

  5. Open your local interface gateway:

     Development Environment: http://localhost:3000

     Registry Panel: http://localhost:3000/admin/projects


## 🗄️ Supabase Table Specifications
To establish proper data streaming pipelines, ensure your projects relational database model reflects the following schema parameters:
 - **id :**   (uuid, Primary Key)
 - **created_at :**  (timestampz, default)
 - **title :**   (text)
 - **description :**(text)
 - **tech_stack :**(text[], Array configuration)
 - **live_link :** (text, nullable)
 - **github_link :** (text, nullable)
 - **image :** (text, nullable)
 - **status :** (text, default: 'Deployed')
 - **date :** (text)



---


<div align="center">


  <a href="https://github.com/towfiqurv360">
    <img src="https://img.shields.io/badge/Developed_By-Md_Towfiqur_Rahman-02040a?style=for-the-badge&amp;logo=github&amp;logoColor=22d3ee" alt="Md Towfiqur Rahman" />
  </a>
  <br />
  <p><i>Engineered for excellence. Open sourced under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.</i></p>

</div>
