# CraftBit Tech BD — Frontend

> Pixel-perfect company website for **CraftBit Tech BD**, a Dhaka-based MERN stack software agency.

---

## 🚀 Tech Stack

| Layer         | Technology                                      |
|---------------|-------------------------------------------------|
| Framework     | React 19 + Vite 8                               |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite` plugin)    |
| Animations    | Framer Motion                                   |
| Routing       | React Router DOM v7                             |
| Icons         | Lucide React + React Icons                      |
| Counters      | React CountUp                                   |
| Intersection  | React Intersection Observer                      |
| UI Headless   | @headlessui/react                               |
| Font          | Inter + Plus Jakarta Sans (Google Fonts)        |

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/            # Images, SVGs
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx     # Sticky navbar with active link tracking
│   │   ├── Hero.jsx       # Hero section with typing animation + stats
│   │   ├── Services.jsx   # 6-service grid with icon cards
│   │   ├── About.jsx      # About + values + team section
│   │   ├── Portfolio.jsx  # Filterable project grid
│   │   ├── TechStack.jsx  # MERN + skill bars + logo chips
│   │   ├── Testimonials.jsx  # Auto-play carousel
│   │   ├── Contact.jsx    # Contact form + info cards
│   │   └── Footer.jsx     # Full footer with newsletter
│   ├── data/
│   │   └── siteData.js    # All site content (single source of truth)
│   ├── App.jsx            # Root component, section composition
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind + custom CSS utilities
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 🎨 Design System

### Colors
- **Primary**: `#3b82f6` (Blue 500) — main brand color
- **Accent**: `#8b5cf6` (Violet 500) — gradient accent
- **Cyan**: `#22d3ee` — gradient highlight
- **Background**: `#020408` — near-black dark base
- **Card BG**: `rgba(15, 31, 53, 0.6)` — glass card surface

### Typography
- **Display / Headings**: Plus Jakarta Sans (font-display)
- **Body / UI**: Inter (font-sans)

### Key CSS Utilities (in `index.css`)
| Class           | Purpose                                              |
|-----------------|------------------------------------------------------|
| `.gradient-text`| Blue → violet → cyan gradient text                  |
| `.glass-card`   | Frosted glass card with hover lift                  |
| `.section-badge`| Small uppercase badge with glow border              |
| `.btn-glow`     | Button with blue glow shadow                        |
| `.grid-bg`      | Subtle dot grid background                          |
| `.float-anim`   | Gentle floating keyframe animation                  |
| `.cursor-blink` | Blinking cursor for typing animation                |

---

## 📑 Sections

| Section        | ID             | Description                                               |
|----------------|----------------|-----------------------------------------------------------|
| Hero           | `#home`        | Typing headline, CTA buttons, animated stats              |
| Services       | `#services`    | 6 service cards with icon, features list, hover effects   |
| About          | `#about`       | Company story, values grid, team members                  |
| Portfolio      | `#portfolio`   | Filterable project cards by category                      |
| Tech Stack     | `#tech`        | MERN highlight, skill bar tabs, logo grid                 |
| Testimonials   | `#testimonials`| Auto-play carousel with 5 client testimonials             |
| Contact        | `#contact`     | Contact form (with budget picker), info cards, social     |
| Footer         | —              | Links, newsletter, social, back-to-top                    |

---

## ⚡ Performance Features

- Lazy scroll-triggered animations via `IntersectionObserver`
- CSS `backdrop-filter` for glass effects (GPU-accelerated)
- `framer-motion` `AnimatePresence` for page transitions
- Skeleton-free loading via staggered reveal animations
- Optimized web fonts with `preconnect` + `display=swap`
- `will-change` handled by Framer Motion automatically

---

## 🔧 Customization

All site content lives in `src/data/siteData.js`. To update:
- Company name, badge, hero stats → `heroData`
- Services → `services` array
- Team members → `aboutData.team`
- Projects → `projects` array
- Tech skills → `techCategories` + `techLogos`
- Testimonials → `testimonials` array
- Contact info → `contactInfo` + `socialLinks`

---

## 🌐 Environment

- Node.js >= 18
- npm >= 9

---

## 📄 License

© 2025 CraftBit Tech BD Ltd. All rights reserved.
