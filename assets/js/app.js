/**
 * ==========================================
 * Forever Love ❤️ - Main Application Script
 * Immersive 3D Slideshow, Particle Engine & Celebration FX
 * Author: Saklin Codes (https://github.com/saklincodes)
 * License: MIT
 * ==========================================
 */

'use strict';

// ------------------------------------------
// 1. CONFIGURATION & STATE
// ------------------------------------------
const CONFIG = {
  SLIDE_DURATION: 3000, // 3 seconds per slide for fast-paced Reels feel
  INTRO_DURATION: 2000, // Intro splash display time in ms
  PARTICLE_COUNT: 45,   // Background floating particles
  CONFETTI_COUNT: 40,   // Grand finale confetti pieces
  CANNON_COUNT: 18,     // Cannon emoji blasts
};

// Slide image definitions
const SLIDES_DATA = [
  { img: 'assets/images/slide-1.jpg', alt: 'Forever Love Moment 1' },
  { img: 'assets/images/slide-2.jpg', alt: 'Forever Love Moment 2' },
  { img: 'assets/images/slide-3.jpg', alt: 'Forever Love Moment 3' },
  { img: 'assets/images/slide-4.jpg', alt: 'Forever Love Moment 4' },
  { img: 'assets/images/slide-5.jpg', alt: 'Forever Love Moment 5' }
];

// Decorative Floating Emojis per Slide
const DECO_PRESETS = [
  [
    { t: '-65px', l: '-195px', e: '💕', d: '0s'   },
    { t: '-60px', r: '-190px', e: '✨', d: '1.2s' },
    { b: '-5px',  l: '-205px', e: '💖', d: '.6s'  },
    { b: '0px',   r: '-195px', e: '🌸', d: '1.8s' }
  ],
  [
    { t: '-58px', r: '-200px', e: '💗', d: '.4s'  },
    { t: '-66px', l: '-188px', e: '✨', d: '1.4s' },
    { b: '10px',  r: '-210px', e: '💕', d: '.9s'  },
    { b: '-10px', l: '-192px', e: '🌸', d: '2s'   }
  ],
  [
    { t: '-70px', l: '-198px', e: '💖', d: '.2s'  },
    { t: '-55px', r: '-190px', e: '🌸', d: '1.3s' },
    { b: '0px',   l: '-185px', e: '✨', d: '.7s'  },
    { b: '5px',   r: '-200px', e: '💗', d: '1.9s' }
  ],
  [
    { t: '-52px', r: '-192px', e: '💕', d: '.5s'  },
    { t: '-72px', l: '-204px', e: '💖', d: '1.6s' },
    { b: '2px',   r: '-188px', e: '🌸', d: '.8s'  },
    { b: '12px',  l: '-196px', e: '✨', d: '2.1s' }
  ],
  [
    { t: '-70px', l: '-200px', e: '👑', d: '0s'   },
    { t: '-65px', r: '-200px', e: '🎉', d: '1.0s' },
    { b: '-10px', l: '-205px', e: '💖', d: '.5s'  },
    { b: '-5px',  r: '-205px', e: '🍾', d: '1.5s' },
    { t: '45%',   l: '-225px', e: '✨', d: '0.3s' },
    { t: '45%',   r: '-225px', e: '🌹', d: '1.2s' }
  ]
];

// ------------------------------------------
// 2. BACKGROUND CANVASES & PARTICLES ENGINE
// ------------------------------------------
class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Instantiate initial particle pool
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      this.particles.push(new Particle(this.canvas, i < 32));
    }
    
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.update();
      p.draw(this.ctx);
    });
    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(canvas, isScattered) {
    this.canvas = canvas;
    this.reset(isScattered);
  }

  reset(isScattered = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = isScattered ? Math.random() * this.canvas.height : this.canvas.height + 20 + Math.random() * 50;
    this.vy = -(Math.random() * 0.55 + 0.12);
    this.vx = (Math.random() - 0.5) * 0.32;
    this.alpha = Math.random() * 0.32 + 0.06;
    this.fade = Math.random() * 0.002 + 0.0004;
    this.isHeart = Math.random() < 0.4;
    this.heartSize = Math.random() * 7 + 4;
    this.radius = Math.random() * 2.2 + 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationVel = (Math.random() - 0.5) * 0.012;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.018 + 0.004;

    const colors = [
      [345, 68, 78], [350, 62, 82], [335, 55, 76],
      [325, 58, 80], [0, 65, 82],   [355, 48, 85], [315, 40, 80]
    ];
    const c = colors[Math.floor(Math.random() * colors.length)];
    this.h = c[0];
    this.s = c[1];
    this.l = c[2];
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.22;
    this.y += this.vy;
    this.rotation += this.rotationVel;

    if (this.y < this.canvas.height * 0.12) {
      this.alpha -= this.fade * 3.5;
    }
    if (this.y < -20 || this.alpha <= 0) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    
    if (this.isHeart) {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
      const scale = this.heartSize / 12;
      ctx.beginPath();
      ctx.moveTo(0, scale * 3);
      ctx.bezierCurveTo(0, 0, -scale * 5, 0, -scale * 5, scale * 3);
      ctx.bezierCurveTo(-scale * 5, scale * 6, 0, scale * 9, 0, scale * 11);
      ctx.bezierCurveTo(0, scale * 9, scale * 5, scale * 6, scale * 5, scale * 3);
      ctx.bezierCurveTo(scale * 5, 0, 0, 0, 0, scale * 3);
      ctx.fill();
    } else {
      ctx.fillStyle = `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// ------------------------------------------
// 3. VISUAL EFFECTS ENGINE (BURST & FINALE)
// ------------------------------------------
class VisualEffects {
  static createHeartBurst() {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:40;overflow:hidden;';
    document.body.appendChild(container);

    const emojis = ['💕', '💖', '✨', '🌸', '💗', '❤️', '🌹', '🎀'];
    const count = 18;
    const styleEl = document.createElement('style');
    let cssRules = '';

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const emo = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 140 + Math.random() * 160;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 30;
      const sz = 1.3 + Math.random() * 1.2;
      const rot = (Math.random() - 0.5) * 60;
      const animName = `eburst_${Date.now()}_${i}`;

      cssRules += `
        @keyframes ${animName} {
          0% {
            transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.18) rotate(${rot}deg);
            opacity: 0;
          }
        }
      `;

      p.innerText = emo;
      p.style.cssText = `
        position: absolute;
        left: 50%; top: 46%;
        font-size: ${sz}rem;
        animation: ${animName} 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        filter: drop-shadow(0 4px 12px rgba(255, 100, 150, 0.45));
      `;
      container.appendChild(p);
    }

    styleEl.innerHTML = cssRules;
    document.head.appendChild(styleEl);

    setTimeout(() => {
      container.remove();
      styleEl.remove();
    }, 2000);
  }

  static triggerGrandFinale() {
    this.clearFinale();
    const container = document.createElement('div');
    container.id = 'finaleContainer';
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:45;overflow:hidden;';
    document.body.appendChild(container);

    const colors = ['#ff4d6d', '#ffd700', '#ff758c', '#e84393', '#a29bfe', '#fd79a8', '#ff7675', '#ffffff'];
    const emojis = ['🎉', '🥳', '✨', '💖', '👑', '🌹', '🍾', '💕', '💗'];
    const styleEl = document.createElement('style');
    let css = '';

    // 1. Confetti Rain
    for (let i = 0; i < CONFIG.CONFETTI_COUNT; i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 100;
      const sizeW = 7 + Math.random() * 7;
      const sizeH = 11 + Math.random() * 10;
      const duration = 2.2 + Math.random() * 1.8;
      const delay = Math.random() * 1.2;
      const rot = Math.random() * 720;
      const animName = `confetti_${Date.now()}_${i}`;

      css += `
        @keyframes ${animName} {
          0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(${(Math.random() - 0.5) * 120}px, 105vh, 0) rotate(${rot}deg); opacity: 0; }
        }
      `;

      p.style.cssText = `
        position: absolute;
        left: ${startX}vw; top: -20px;
        width: ${sizeW}px; height: ${sizeH}px;
        background: ${color};
        border-radius: ${Math.random() < 0.5 ? '50%' : '3px'};
        animation: ${animName} ${duration}s ${delay}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      `;
      container.appendChild(p);
    }

    // 2. Celebration Cannons
    for (let i = 0; i < CONFIG.CANNON_COUNT; i++) {
      const p = document.createElement('div');
      const emo = emojis[Math.floor(Math.random() * emojis.length)];
      const isLeft = i % 2 === 0;
      const startLeft = isLeft ? 12 : 88;
      const angle = isLeft ? (-Math.PI / 4 - Math.random() * 0.4) : (-Math.PI * 3 / 4 + Math.random() * 0.4);
      const dist = 180 + Math.random() * 240;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const animName = `cannon_${Date.now()}_${i}`;

      css += `
        @keyframes ${animName} {
          0% { transform: translate(0, 0) scale(0.3) rotate(0deg); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translate(${tx}px, ${ty}px) scale(1.35) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
      `;

      p.innerText = emo;
      p.style.cssText = `
        position: absolute;
        left: ${startLeft}%; bottom: 12%;
        font-size: ${1.4 + Math.random() * 1.4}rem;
        animation: ${animName} 2.2s ${Math.random() * 1.0}s ease-out infinite;
        filter: drop-shadow(0 4px 12px rgba(255, 100, 150, 0.5));
      `;
      container.appendChild(p);
    }

    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
  }

  static clearFinale() {
    const fc = document.getElementById('finaleContainer');
    if (fc) fc.remove();
  }
}

// ------------------------------------------
// 4. SLIDESHOW MANAGER
// ------------------------------------------
class Slideshow {
  constructor() {
    this.container = document.getElementById('ss');
    this.progressBar = document.getElementById('pbar');
    this.replayBtn = document.getElementById('rbtn');
    this.currentIndex = -1;
    this.timer = null;
    this.rafId = null;
    this.startTime = 0;
    this.isDone = false;

    this.buildSlides();
    this.setupControls();
  }

  buildSlides() {
    if (!this.container) return;
    this.container.innerHTML = '';

    SLIDES_DATA.forEach((data, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (index === SLIDES_DATA.length - 1 ? ' is-final' : '');

      const wrap = document.createElement('div');
      wrap.className = 'sticker-wrap';

      const backLayer = document.createElement('div');
      backLayer.className = 'card-back-layer';
      wrap.appendChild(backLayer);

      // Attach floating decos
      const decos = DECO_PRESETS[index] || [];
      decos.forEach(d => {
        const decoEl = document.createElement('div');
        decoEl.className = 'deco';
        
        const posKeys = { t: 'top', b: 'bottom', l: 'left', r: 'right' };
        const posStr = Object.entries(posKeys)
          .filter(([k]) => d[k])
          .map(([k, v]) => `${v}:${d[k]}`).join(';');
        
        decoEl.style.cssText = posStr;
        decoEl.innerHTML = `<span style="animation-delay:${d.d}">${d.e}</span>`;
        wrap.appendChild(decoEl);
      });

      const img = document.createElement('img');
      img.src = data.img;
      img.className = 'sticker-img';
      img.alt = data.alt || 'Romantic Love Moment';
      img.loading = index === 0 ? 'eager' : 'lazy';
      wrap.appendChild(img);

      slide.appendChild(wrap);
      this.container.appendChild(slide);
    });
  }

  setupControls() {
    if (this.replayBtn) {
      this.replayBtn.addEventListener('click', () => this.restart());
    }

    // Keyboard Arrow navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    });

    // Touch swipe handling
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (diff > 40) {
        this.next();
      } else if (diff < -40) {
        this.prev();
      }
    }, { passive: true });
  }

  show(idx) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    // Bounds check
    const targetIdx = Math.max(0, Math.min(idx, slides.length - 1));

    slides.forEach(s => s.classList.remove('active'));
    this.currentIndex = targetIdx;
    slides[targetIdx].classList.add('active');

    VisualEffects.createHeartBurst();

    if (targetIdx === slides.length - 1) {
      VisualEffects.triggerGrandFinale();
    } else {
      VisualEffects.clearFinale();
    }

    this.startProgress();
    clearTimeout(this.timer);

    if (targetIdx < slides.length - 1) {
      this.timer = setTimeout(() => this.show(targetIdx + 1), CONFIG.SLIDE_DURATION);
    } else {
      this.timer = setTimeout(() => {
        this.isDone = true;
        if (this.replayBtn) this.replayBtn.classList.add('show');
      }, CONFIG.SLIDE_DURATION);
    }
  }

  next() {
    if (this.currentIndex < SLIDES_DATA.length - 1) {
      this.show(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.show(this.currentIndex - 1);
    }
  }

  startProgress() {
    if (!this.progressBar) return;
    this.startTime = Date.now();
    cancelAnimationFrame(this.rafId);

    const updateProgress = () => {
      const elapsed = Date.now() - this.startTime;
      const total = CONFIG.SLIDE_DURATION * SLIDES_DATA.length;
      const pct = Math.min((this.currentIndex / SLIDES_DATA.length + elapsed / total) * 100, 100);
      
      this.progressBar.style.width = pct + '%';
      
      if (!this.isDone) {
        this.rafId = requestAnimationFrame(updateProgress);
      } else {
        this.progressBar.style.width = '100%';
      }
    };
    
    updateProgress();
  }

  restart() {
    this.isDone = false;
    VisualEffects.clearFinale();
    if (this.replayBtn) this.replayBtn.classList.remove('show');
    if (this.progressBar) this.progressBar.style.width = '0';
    this.show(0);
  }

  start() {
    setTimeout(() => {
      const intro = document.getElementById('intro');
      if (intro) intro.classList.add('gone');
      setTimeout(() => this.show(0), 750);
    }, CONFIG.INTRO_DURATION);
  }
}

// ------------------------------------------
// 5. APPLICATION INITIALIZATION
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Initialize background particle engine
  new ParticleEngine('bgParts');

  // Initialize and boot slideshow
  const app = new Slideshow();
  app.start();

  // Expose restart globally for inline button compatibility if needed
  window.restart = () => app.restart();
});
