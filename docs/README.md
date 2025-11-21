# Nyi Htut Zaw Portfolio Documentation

This documentation provides comprehensive information about the portfolio website, including setup, architecture, and improvement recommendations.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Data Management](#data-management)
- [Styling & Theming](#styling--theming)
- [Features](#features)
- [Improvement Recommendations](#improvement-recommendations)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Overview

This is a personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The site showcases professional experience, education, skills, certifications, projects, and blog posts.

### Key Technologies

- **Framework**: Next.js 15.1.7 with App Router
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **PDF Generation**: jsPDF 3.0.0
- **Blog Integration**: RSS-to-JSON for Medium feed

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nyihtutzaw-profile

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

### Build & Production

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm run start
# or
yarn start
# or
pnpm start
```

---

## 📁 Project Structure

```
nyihtutzaw-profile/
├── docs/                          # Documentation
│   ├── README.md                  # Main documentation file
│   ├── ARCHITECTURE.md            # Component architecture
│   └── IMPROVEMENTS.md            # Improvement recommendations
├── public/                        # Static assets
│   ├── profile.png               # Profile image
│   └── work/                     # Company logos
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   └── posts/            # Blog API endpoint
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── home/                 # Page sections
│   │   ├── Navbar.tsx            # Navigation (unused)
│   │   ├── ScrollToTop.tsx       # Scroll utility
│   │   └── ThemeToggle.tsx       # Theme switcher
│   ├── context/                  # React contexts
│   │   └── ThemeContext.tsx      # Theme management
│   ├── data/                     # Static data
│   │   ├── experience.ts         # Work experience
│   │   ├── education.ts          # Education history
│   │   ├── skills.ts             # Skills data
│   │   └── certifications.ts     # Certifications
│   ├── types/                    # TypeScript types
│   │   ├── blog.ts               # Blog post types
│   │   ├── skills.ts             # Skill types
│   │   └── certifications.ts     # Certification types
│   └── utils/                    # Utility functions
│       └── generateCV.ts         # PDF CV generation
├── package.json                  # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.ts               # Next.js configuration
```

---

## 🏗️ Component Architecture

### Page Structure

The main page (`src/app/page.tsx`) is composed of sequential sections:

1. **HeroSection** - Profile introduction and social links
2. **AboutSection** - Professional summary
3. **EducationExperienceSection** - Combined education and experience
4. **SkillsSection** - Technical skills display
5. **ProjectShowcase** - Featured projects
6. **CertificationSection** - Professional certifications
7. **CoursesSection** - Additional courses
8. **BlogSection** - Latest blog posts from Medium

### Key Components

#### Theme Management
- `ThemeContext.tsx` - Provides dark/light theme functionality
- `ThemeToggle.tsx` - Theme switcher component
- Uses localStorage for persistence and system preference detection

#### Data Components
- All data is stored in TypeScript files under `src/data/`
- Components consume data directly without state management
- Experience data includes HTML content for rich formatting

#### CV Generation
- `generateCV.ts` utility creates downloadable PDF using jsPDF
- Filters experience data based on `showInCV` flag
- Handles HTML parsing and text formatting

---

## 📊 Data Management

### Static Data Structure

All portfolio data is managed through TypeScript objects:

```typescript
// Example: Work Experience
interface WorkExperience {
  logo: string;
  logoAlt: string;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description?: string;
  skills?: string[];
  details?: string; // HTML content
  showInCV?: boolean;
}
```

### Dynamic Data

- **Blog Posts**: Fetched from Medium RSS feed via `/api/posts`
- **Theme State**: Managed through React Context with localStorage persistence

---

## 🎨 Styling & Theming

### Color System

Custom color palette defined in `tailwind.config.ts`:

```typescript
colors: {
  myColor: {
    "50": "#e8e8f4",   // Lightest
    "900": "#04051e"   // Darkest
  }
}
```

### Theme Implementation

- **Dark Mode**: Class-based implementation using Tailwind's `dark:` prefix
- **Responsive Design**: Mobile-first approach with `md:` and `lg:` breakpoints
- **Custom Components**: Consistent spacing and typography throughout

---

## ✨ Features

### Current Features

- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: System preference detection with manual override
- **CV Download**: Dynamic PDF generation from portfolio data
- **Blog Integration**: Automatic fetch from Medium RSS feed
- **Smooth Scrolling**: Scroll-to-top functionality
- **SEO Optimized**: Proper meta tags and semantic HTML

### Interactive Elements

- Theme toggle with smooth transitions
- CV download button
- External link handling with proper attributes
- Loading states for dynamic content

---

## 📈 Improvement Recommendations

### High Priority

1. **Fix Email Typo**
   - **File**: `src/components/home/HeroSection.tsx:16`
   - **Issue**: Email contains "gmaill.com" instead of "gmail.com"
   - **Impact**: Broken email functionality

2. **Remove Console Logs**
   - **Files**: `src/app/api/posts/route.ts:8`, `src/components/home/BlogSection.tsx:23`
   - **Issue**: Production console logs
   - **Impact**: Poor production hygiene

3. **Add Error Handling**
   - **Issue**: Missing error boundaries and loading states
   - **Impact**: Poor user experience on failures

### Medium Priority

4. **Type Safety Improvements**
   - **Issue**: Missing `WorkExperience` interface in types folder
   - **Impact**: Inconsistent type definitions

5. **Component Organization**
   - **Issue**: Unused `Navbar.tsx` component
   - **Impact**: Code bloat and confusion

6. **Performance Optimization**
   - **Issue**: No image optimization, missing lazy loading
   - **Impact**: Slow load times

### Low Priority

7. **Accessibility**
   - **Issue**: Missing ARIA labels and keyboard navigation
   - **Impact**: Poor accessibility

8. **Testing**
   - **Issue**: No test suite
   - **Impact**: Risk of regressions

9. **Documentation**
   - **Issue**: Missing inline documentation
   - **Impact**: Harder maintenance

---

## 🚀 Deployment

### Environment Setup

```bash
# Production build
npm run build

# Environment variables (if needed)
NEXT_PUBLIC_MEDIUM_RSS=https://medium.com/feed/@nyihtutzaw.2015
```

### Deployment Platforms

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative static deployment
- **AWS Amplify**: Full-stack deployment option

### Build Considerations

- Ensure all images are optimized
- Test CV generation functionality
- Verify blog API endpoints
- Check responsive behavior

---

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow existing TypeScript and Tailwind patterns
2. **Component Structure**: Keep components focused and reusable
3. **Type Safety**: Maintain strict TypeScript usage
4. **Performance**: Consider bundle size and loading performance

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create pull request
git push origin feature/new-feature
```

---

## 📝 License

© 2024 Nyi Htut Zaw. All rights reserved.

---

## 📞 Contact

- **Email**: nyihtutzaw.2015@gmail.com
- **LinkedIn**: linkedin.com/in/nyi-htut-zaw-9b741115a/
- **GitHub**: github.com/nyihtutzaw
- **Medium**: medium.com/@nyihtutzaw.2015
