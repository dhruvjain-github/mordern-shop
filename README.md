# ModernShop - E-commerce Application

A modern, dynamic shopping application built with Next.js, featuring a clean UI, dark/light theme, search suggestions, category filters, authentication, and cart functionality.

## Features

- 🛍️ **Complete Shopping Experience**: Product catalog, search, filters, cart management
- 🔍 **Smart Search**: Real-time search suggestions for products, categories, and brands
- 🌙 **Dark/Light Theme**: Built-in theme switching with next-themes
- 🔐 **Authentication**: Email/password login and OAuth (Google, GitHub)
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🚀 **Performance**: Optimized with Next.js 14, TypeScript, and modern React patterns
- 🎨 **Modern UI**: Clean, professional interface with Framer Motion animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Authentication**: Custom JWT + OAuth
- **State Management**: React Context + useReducer
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Configure your environment variables
5. Run development server: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables Required for Production

### Essential Variables
```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key
JWT_SECRET=your-jwt-secret-key
```

### OAuth Configuration
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Optional Services
```env
DATABASE_URL=your-database-connection-string
STRIPE_PUBLIC_KEY=pk_your-stripe-public-key
STRIPE_SECRET_KEY=sk_your-stripe-secret-key
```

## Building for Production

```bash
npm run build
npm start
```

## License

MIT License
