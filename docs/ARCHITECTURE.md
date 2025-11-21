# Component Architecture Documentation

This document details the architectural decisions, component structure, and data flow of the portfolio website.

## 🏗️ Architecture Overview

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
├─────────────────────────────────────────────────────────────┤
│  Layout (Theme Provider + Global Styles)                    │
│  └── Page (Sequential Section Components)                   │
│      └── Sections (Data + UI Components)                    │
│          └── UI Components (Styling + Interactions)         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Component Hierarchy

### Root Layout (`src/app/layout.tsx`)

```typescript
RootLayout
├── ThemeProvider (Context)
├── ThemeToggle (Fixed Position)
├── Main Content Wrapper
│   └── Page Content (max-w-5xl container)
├── Footer
└── ScrollToTop
```

**Key Responsibilities:**
- Global theme provider setup
- Fixed positioning for theme toggle
- Consistent layout wrapper
- Footer with dynamic copyright
- Scroll-to-top functionality

### Home Page (`src/app/page.tsx`)

```typescript
Home
├── HeroSection (Profile + Social Links)
├── AboutSection (Professional Summary)
├── EducationExperienceSection (Combined Timeline)
├── SkillsSection (Technical Skills Grid)
├── ProjectShowcase (Featured Projects)
├── CertificationSection (Certifications Grid)
├── CoursesSection (Additional Courses)
└── BlogSection (Medium Blog Integration)
```

## 🎨 Component Design Patterns

### 1. Section Components Pattern

All main sections follow a consistent structure:

```typescript
const SectionComponent = () => {
  // Static data import
  const data = require('@/data/sectionData');
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Section Title</h2>
        {/* Section content */}
      </div>
    </section>
  );
};
```

**Benefits:**
- Consistent spacing and layout
- Responsive container management
- Reusable section structure

### 2. Data Component Pattern

Data is managed through TypeScript objects:

```typescript
// src/data/experience.ts
export const workExperienceData: WorkExperience[] = [
  {
    logo: "/work/company.png",
    title: "Senior Software Engineer",
    company: "Company Name",
    // ... other properties
  }
];
```

**Benefits:**
- Type safety
- Easy content updates
- Separation of data and presentation

### 3. Context Pattern for Theme

```typescript
// src/context/ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  // Theme logic with localStorage and system preference
};
```

**Benefits:**
- Global state management
- Persistent user preferences
- System preference detection

## 🔄 Data Flow Architecture

### Static Data Flow

```
Data Files (TypeScript) 
    ↓ Import
Component Files
    ↓ Props
UI Rendering
```

### Dynamic Data Flow (Blog)

```
Medium RSS Feed
    ↓ API Route (/api/posts)
    ↓ fetch() in Component
    ↓ State Management
    ↓ UI Rendering
```

### Theme State Flow

```
User Action (Toggle)
    ↓ ThemeContext
    ↓ localStorage + DOM Class
    ↓ Tailwind CSS Classes
    ↓ UI Update
```

## 🧩 Component Breakdown

### HeroSection

**Purpose**: Profile introduction and social links

**Structure:**
```typescript
HeroSection
├── Profile Image (Circle)
├── Social Links (Email, LinkedIn, GitHub)
└── Text Content (Name, Title, Description, CV Button)
```

**Key Features:**
- Responsive layout (mobile-first)
- CV generation on button click
- Social link icons with hover states

### EducationExperienceSection

**Purpose**: Combined timeline of education and work experience

**Structure:**
```typescript
EducationExperienceSection
├── EducationColumn
│   └── Education Cards
└── WorkExperienceColumn
    └── Experience Cards (with HTML content)
```

**Key Features:**
- Two-column responsive layout
- HTML content parsing for rich text
- Conditional CV inclusion (`showInCV` flag)

### BlogSection

**Purpose**: Dynamic blog post integration

**Structure:**
```typescript
BlogSection
├── Loading State (Spinner)
├── Error State (Fallback)
└── Posts Grid
    └── Blog Cards (Image + Metadata)
```

**Key Features:**
- Async data fetching
- Image extraction from HTML content
- Error handling and loading states

## 🎯 Styling Architecture

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        myColor: { /* custom palette */ }
      }
    }
  }
};
```

### Color System

- **Primary**: Custom `myColor` palette for branding
- **Semantic**: Standard Tailwind colors for actions
- **Dark Mode**: Automatic class-based theming

### Responsive Strategy

```typescript
// Mobile-first approach
className="base-classes md:medium-classes lg:large-classes"
```

## 🔧 Utility Architecture

### CV Generation (`src/utils/generateCV.ts`)

**Purpose**: Dynamic PDF creation from portfolio data

**Architecture:**
```typescript
generateCV
├── PDF Setup (jsPDF)
├── Helper Functions
│   ├── addText() (Formatting + Pagination)
│   └── addSection() (Headers + Dividers)
├── Data Processing
│   ├── Filter Experience (showInCV)
│   └── HTML Parsing (details content)
└── PDF Generation
```

**Key Features:**
- Automatic pagination
- HTML content parsing
- Responsive text layout
- Multi-column formatting

## 🏛️ Architectural Decisions

### 1. App Router over Pages Router

**Decision**: Use Next.js 15 App Router

**Rationale:**
- Better TypeScript support
- Improved performance
- Modern React patterns
- Server components capability

### 2. Static Data over CMS

**Decision**: Use TypeScript data files

**Rationale:**
- Simplicity for personal portfolio
- Type safety
- No external dependencies
- Easy version control

### 3. Tailwind CSS over CSS-in-JS

**Decision**: Use Tailwind CSS

**Rationale:**
- Consistent design system
- Smaller bundle size
- Better performance
- Developer productivity

### 4. Class-based Dark Mode

**Decision**: Use Tailwind's class strategy

**Rationale:**
- Better browser support
- Manual control
- System preference detection
- localStorage persistence

## 🔍 Performance Considerations

### Current Optimizations

- **Next.js Image**: Automatic image optimization
- **Static Generation**: Pre-built pages
- **Code Splitting**: Automatic route-based splitting
- **CSS Purging**: Unused CSS removal

### Potential Improvements

- **Lazy Loading**: Component-level lazy loading
- **Image Optimization**: WebP format, proper sizing
- **Bundle Analysis**: Identify large dependencies
- **Caching**: API response caching

## 🧪 Testing Architecture

### Current State

- No test suite implemented
- Manual testing only

### Recommended Architecture

```
__tests__/
├── components/
│   ├── HeroSection.test.tsx
│   └── BlogSection.test.tsx
├── utils/
│   └── generateCV.test.ts
└── __mocks__/
    └── fileMocks.ts
```

### Testing Strategy

- **Unit Tests**: Component rendering and behavior
- **Integration Tests**: API endpoints and data flow
- **E2E Tests**: Critical user journeys
- **Visual Tests**: UI consistency

## 🔄 Future Architecture Considerations

### 1. State Management

**Current**: React Context for theme only
**Future**: Consider Zustand/Redux for complex state

### 2. Data Management

**Current**: Static TypeScript files
**Future**: Consider MDX or headless CMS

### 3. Component Library

**Current**: Custom components
**Future**: Consider shadcn/ui or similar

### 4. Performance

**Current**: Standard Next.js optimization
**Future**: Consider micro-frontends or edge functions

---

## 📚 Best Practices Applied

1. **Component Composition**: Small, focused components
2. **Type Safety**: Comprehensive TypeScript usage
3. **Separation of Concerns**: Data, logic, and UI separated
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: Semantic HTML and ARIA labels
6. **Performance**: Optimized images and code splitting
7. **Maintainability**: Clear file structure and naming
