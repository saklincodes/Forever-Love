# Forever Love ❤️ — Interactive 3D Romantic Memory Experience

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?style=for-the-badge&logo=github)

<br />

**[🌐 Experience Live Demo](https://saklincodes.github.io/Forever-Love/)** • **[📖 Documentation](#-customization-guide)** • **[🚀 Quick Start](#-quick-start)**

</div>

---

## 🌟 Executive Overview

**Forever Love ❤️** is an ultra-lightweight, high-performance web experience crafted to display romantic photo albums with immersive 3D spatial transformations, dynamic HTML5 canvas particle physics, and glassmorphic micro-interactions.

Engineered with zero external runtime dependencies, it utilizes hardware-accelerated CSS 3D transforms (`rotateX`, `rotateY`, `scale`) alongside an optimized RequestAnimationFrame particle engine to deliver smooth 60 FPS transitions across desktop, tablet, and mobile displays.

---

## ✨ Key Technical Features

- 🎨 **Glassmorphism & Polaroid Scrapbook Aesthetic**: Layered card rendering with soft ambient aura glows (`radial-gradient`), tilted backdrops, and floating emoji micro-decorations.
- 🌌 **Custom Canvas Particle Physics Engine**: Real-time canvas particle renderer generating floating heart vector math, HSL color variations, sinusoidal wobble movements, and dynamic alpha fading.
- 🎆 **Grand Finale Confetti & Celebration Cannons**: Automatic climax sequence triggering procedural confetti rain and dual corner emoji cannon bursts upon completing the slideshow.
- 📱 **Multi-Modal Controls**: Built-in support for:
  - **Auto-Play Progression**: Smooth linear progress tracking bar.
  - **Mobile Touch Gestures**: Responsive left/right touch swipe listeners.
  - **Keyboard Navigation**: Native `ArrowLeft`, `ArrowRight`, and `Space` key handlers.
- ⚡ **Zero-Dependency Architecture**: Built using standard Web APIs (HTML5, CSS3, ES6 JavaScript) for maximum load speeds and long-term codebase maintainability.
- 🤖 **Automated CI/CD**: GitHub Actions workflow pre-configured for instant zero-downtime deployment to GitHub Pages.

---

## 📁 Repository Architecture

```text
Forever-Love/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions automated deployment pipeline
├── assets/
│   ├── css/
│   │   └── styles.css           # Modular stylesheet with CSS variables & keyframes
│   ├── js/
│   │   └── app.js               # ES6 Application logic (Slideshow, Canvas, FX)
│   └── images/
│       ├── slide-1.jpg          # High-resolution photo asset 1
│       ├── slide-2.jpg          # High-resolution photo asset 2
│       ├── slide-3.jpg          # High-resolution photo asset 3
│       ├── slide-4.jpg          # High-resolution photo asset 4
│       └── slide-5.jpg          # High-resolution photo asset 5
├── .gitignore                   # Workspace git exclusion configurations
├── index.html                   # Primary application entry point (SEO optimized)
├── love.html                    # Backward-compatible client-side redirect
├── LICENSE                      # Open-source MIT License
└── README.md                    # Project documentation & guidelines
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/saklincodes/Forever-Love.git
cd Forever-Love
```

### 2. Run Locally
Since the project relies purely on standard front-end web standards, no build step or node module installation is required! You can open `index.html` directly in your web browser:

- **VS Code Live Server**: Right-click `index.html` and select **Open with Live Server**.
- **Python HTTP Server**:
  ```bash
  python -m http.server 8000
  ```
  Navigate to `http://localhost:8000` in your browser.

---

## 🛠️ Customization Guide

### Adding or Replacing Photos
Place your images inside the `assets/images/` directory and update the `SLIDES_DATA` configuration array in [`assets/js/app.js`](assets/js/app.js):

```javascript
const SLIDES_DATA = [
  { img: 'assets/images/slide-1.jpg', alt: 'Moment 1' },
  { img: 'assets/images/slide-2.jpg', alt: 'Moment 2' },
  // Add additional slides here...
];
```

### Adjusting Timing & Speed
You can modify slideshow speed by tweaking `CONFIG` values in [`assets/js/app.js`](assets/js/app.js):

```javascript
const CONFIG = {
  SLIDE_DURATION: 3000, // Duration per slide in milliseconds (default: 3s)
  INTRO_DURATION: 2000, // Splash intro screen display time in milliseconds
  PARTICLE_COUNT: 45,   // Background particle intensity
};
```

---

## 💻 Tech Stack & Standards

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Structure** | HTML5 | Semantic markup with ARIA roles & Open Graph SEO tags |
| **Styling** | Vanilla CSS3 | Design tokens (`:root`), Flexbox, CSS 3D perspective |
| **Scripting** | ES6+ JavaScript | Modern OOP class architecture & event delegation |
| **Graphics** | HTML5 Canvas API | Hardware-accelerated 2D particle system |
| **CI/CD** | GitHub Actions | Automated GitHub Pages build & deployment workflow |

---

## 🌐 Browser Compatibility

| Browser | Supported Version |
| :--- | :---: |
| Google Chrome / Chromium | 80+ |
| Mozilla Firefox | 75+ |
| Apple Safari | 13.1+ |
| Microsoft Edge | 80+ |
| Mobile Safari (iOS) | 13.4+ |
| Chrome for Android | 80+ |

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.

---

<div align="center">
  <sub>Crafted with ❤️ by <a href="https://github.com/saklincodes">Saklin Codes</a></sub>
</div>
