# Blys Task Manager
A modern, professional task management application built with React, TypeScript, and Tailwind CSS.

## Demo Credentials

- **Email:** demo@blys.com
- **Password:** password

## Getting Started

1. **Clone the repository:**

git clone https://github.com/sagun-k/blys-task-manager-server.git
cd blys-task-manager-server

2. **Install dependencies:**
   pnpm install

3. **Api generation**
pnpm run generate:api 

This will genrate the api services inside src/generated-api from the deployed backend
    "generate:api": "openapi --input https://blys-task-manager-server.onrender.com/api-docs.json --output ./src/generated-api --client axios"

If you are using the local backend server just update     

  "generate:api": "openapi --input https://localhost:<PORT>/api-docs.json --output ./src/generated-api --client axios"


4. **Start development server:**
   pnpm run dev

5. **Build for production:**
   pnpm run build

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Formik + Yup** - Form handling and validation
