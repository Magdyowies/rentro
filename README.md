# Renotra - Vehicle Rental Platform

A full-stack web application for vehicle rental management built with modern web technologies. Renotra allows users to browse, search, and rent vehicles with a seamless user experience.

## 🚀 Project Overview

Renotra is a comprehensive vehicle rental platform featuring:
- **Vehicle Browsing & Search**: Browse and search vehicles with advanced filtering
- **Vehicle Details**: View detailed information about each vehicle including specs, ratings, and reviews
- **User Management**: User registration and authentication system
- **Database Integration**: PostgreSQL with Drizzle ORM for data persistence
- **Modern UI**: Built with React and Radix UI components with Tailwind CSS styling

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Features](#features)

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Query** - Server state management
- **Wouter** - Lightweight routing library
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database query builder
- **Drizzle Kit** - Database migration tools

### Development Tools
- **TSX** - TypeScript execution for scripts
- **PostCSS** - CSS transformation
- **Vite Plugins** - Runtime error overlay, dev banner, cartographer

## 📁 Project Structure

```
renotra_v1.0/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── App.tsx           # Main app component with routing
│   │   ├── main.tsx          # React entry point
│   │   ├── index.css         # Global styles
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   │   ├── ui/           # Reusable UI components (from Radix UI)
│   │   │   └── vehicle/      # Vehicle-specific components
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Homepage
│   │   │   ├── Search.tsx    # Vehicle search page
│   │   │   ├── VehicleDetail.tsx  # Individual vehicle details
│   │   │   └── not-found.tsx # 404 page
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/              # Utility functions and helpers
│   │   │   ├── mockData.ts   # Mock vehicle data
│   │   │   ├── queryClient.ts # React Query setup
│   │   │   └── utils.ts      # Helper utilities
│   │   └── public/           # Static assets
│   └── index.html            # HTML entry point
│
├── server/                    # Backend application
│   ├── index.ts              # Express server setup
│   ├── routes.ts             # API route definitions
│   ├── static.ts             # Static file serving
│   ├── storage.ts            # Database operations layer
│   └── vite.ts               # Vite integration
│
├── shared/                    # Shared code between client & server
│   └── schema.ts             # Database schema and types (Drizzle)
│
├── script/                    # Build scripts
│   ├── build.ts              # Production build script
│   └── remove-bg.ts          # Image processing script
│
├── attached_assets/          # Project assets and generated files
│   ├── Audi_RS_e-tron_GT_2024_1765266212935/
│   └── generated_images/
│
├── Configuration Files
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   ├── postcss.config.js     # PostCSS configuration
│   ├── drizzle.config.ts     # Drizzle ORM configuration
│   ├── components.json       # Component library config
│   └── package.json          # Dependencies and scripts
│
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **PostgreSQL** database (configured via `DATABASE_URL` environment variable)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Magdyowies/rentro.git
   cd rentro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/renotra
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

## 💻 Development

### Run Development Servers

**Start both client and server in development mode:**
```bash
npm run dev
```

**Client only** (Vite dev server on port 5000):
```bash
npm run dev:client
```

**Server only** (Express on port 5173 or configured port):
```bash
npm run dev
```

### Type Checking
Verify TypeScript types across the project:
```bash
npm run check
```

### Database Operations
Push schema changes to the database:
```bash
npm run db:push
```

## 🏗 Build & Deploy

### Build for Production
Create an optimized production build:
```bash
npm run build
```

This generates:
- `dist/public/` - Built frontend assets
- `dist/index.cjs` - Bundled backend

### Start Production Server
```bash
npm start
```

## 📡 API Routes

The server uses a modular routing system. All API routes are prefixed with `/api`:

**Currently implemented in `server/routes.ts`:**
- *Routes can be added here following Express conventions*

**Storage Layer** (`server/storage.ts`):
- Provides CRUD operations for database entities
- Methods: `insertUser()`, `getUserByUsername()`, `insertVehicle()`, etc.

## 🗄 Database Schema

### Users Table
```sql
- id (UUID, primary key)
- username (string, unique)
- password (string, hashed)
- email (string, unique)
- fullName (string)
```

### Vehicles Table
```sql
- id (UUID, primary key)
- name (string)
- category (string)
- pricePerDay (decimal)
- transmission (string)
- seats (integer)
- luggage (integer)
- fuelType (string)
- features (text array)
- description (text)
- available (boolean)
- rating (decimal 0-5)
- reviewCount (integer)
```

### Vehicle Images Table
```sql
- id (UUID, primary key)
- vehicleId (foreign key to vehicles)
- imageUrl (string)
- isPrimary (boolean)
```

## ✨ Features

### Frontend Features
- ✅ Responsive design with Tailwind CSS
- ✅ Component-based architecture with React
- ✅ Type-safe development with TypeScript
- ✅ Advanced form handling with React Hook Form
- ✅ Form validation with Zod schemas
- ✅ Server state management with React Query
- ✅ Accessible UI components from Radix UI
- ✅ Toast notifications with Sonner
- ✅ Client-side routing with Wouter

### Pages
- **Home Page** - Landing page with featured vehicles
- **Search Page** - Advanced vehicle search and filtering
- **Vehicle Detail Page** - Comprehensive vehicle information
- **404 Page** - Not found error handling

### Backend Features
- ✅ Express.js REST API
- ✅ PostgreSQL database integration
- ✅ Type-safe ORM with Drizzle
- ✅ Request logging and monitoring
- ✅ Static file serving
- ✅ JSON body parsing
- ✅ Error handling middleware

## 📦 Key Dependencies

### Frontend
- `@radix-ui/*` - Unstyled, accessible components
- `@tanstack/react-query` - Server state management
- `class-variance-authority` - CSS variant management
- `cmdk` - Command palette component
- `date-fns` - Date utilities
- `react-hook-form` - Form state management
- `zod` - Schema validation

### Backend
- `express` - Web framework
- `drizzle-orm` - ORM
- `drizzle-kit` - Migrations
- `pg` - PostgreSQL driver
- `connect-pg-simple` - PostgreSQL session store

## 🔒 Security

- Password hashing (implementation in storage layer)
- UUID primary keys for better security
- CORS configuration
- Input validation with Zod schemas
- SQL injection prevention through Drizzle ORM
- Session management with connect-pg-simple

## 📚 Additional Scripts

- **`tsx script/build.ts`** - Custom production build script
- **`tsx script/remove-bg.ts`** - Image background removal utility
- **`tsc`** - TypeScript type checking

## 🌐 Environment Configuration

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string

### Optional Configuration
- `NODE_ENV` - Set to 'production' for production builds
- `PORT` - Server port (default: 5173)
- `REPL_ID` - Replit-specific ID (for Replit deployments)

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Contributing

Contributions are welcome! Please follow the project structure and coding standards.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Renotra** - Making vehicle rental simple and accessible! 🚗
