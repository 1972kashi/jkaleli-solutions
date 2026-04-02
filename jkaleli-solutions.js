 // Inject footer into each page
  const footerIds = ['home-footer','portfolio-footer','about-footer','services-footer'];
  const tpl = document.getElementById('footer-tpl');
  footerIds.forEach(id => {
    document.getElementById(id).appendChild(tpl.content.cloneNode(true));
  });

  // Page navigation
  function showPage(name, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    if (btn) btn.classList.add('active');
    
    // Trigger scroll-reveal animations when page loads
    setTimeout(() => triggerScrollReveal(), 50);
  }

  // Portfolio filter
  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'flex' : 'none';
    });
  }

  // Service details
  const serviceData = {
    uiux:      { icon:'🎨', title:'UI/UX Design', desc:'We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement.' },
    webdesign: { icon:'🖥️', title:'Web Design',   desc:'We craft beautiful, responsive websites that capture your brand identity and leave a lasting impression.' },
    webdev:    { icon:'💻', title:'Web Development', desc:'From custom applications to complex systems, we build scalable and secure solutions tailored to your business needs.' },
    appdev:    { icon:'📱', title:'App Development', desc:'From custom applications to complex systems, we build scalable and secure mobile solutions tailored to your business needs.' },
    startup:   { icon:'🧠', title:'Startup Ideas',  desc:'We help you validate, refine, and launch your startup concept — turning raw ideas into actionable plans and MVPs.' },
    seo:       { icon:'🔍', title:'SEO Optimization', desc:'Optimize your digital presence and boost your visibility with our data-driven SEO strategies.' },
  };

  function openDetail(key) {
    const d = serviceData[key];
    document.getElementById('detail-icon').textContent = d.icon;
    document.getElementById('detail-title').textContent = d.title;
    document.getElementById('detail-desc').textContent = d.desc;
    document.getElementById('service-detail').classList.add('open');
  }

  function closeDetail() {
    document.getElementById('service-detail').classList.remove('open');
  }

  /* ════════════════════════════════════════════════════════════ */
  /* ═  ENHANCED ANIMATIONS (NEW)  ═ */
  /* ════════════════════════════════════════════════════════════ */

  // ── PARTICLE NETWORK ANIMATION ──
  function initParticleNetwork() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    const particles = [];
    const connectionDistance = 150;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.7 ? 'rgba(255,255,255,0.6)' : 'rgba(0,229,209,0.4)';
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(0,229,209,${0.2 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ── SCROLL REVEAL - INTERSECTION OBSERVER ──
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  function triggerScrollReveal() {
    document.querySelectorAll(
      '.feature-card, .highlight-card, .value-card, .benefit-card, ' +
      '.testimonial-card, .service-icon-card, .portfolio-item, .service-card'
    ).forEach(el => {
      el.classList.remove('reveal');
      revealObserver.observe(el);
    });
  }
  
  // ── ADD DATA-CATEGORY TO PORTFOLIO ITEMS ──
  function initPortfolioCategories() {
    const categoryMap = {
      'UI Design': 'designs',
      'Web App': 'websites',
      'Branding': 'designs',
      'Landing Page': 'websites',
      'Logo Design': 'designs',
      'E-Commerce': 'websites'
    };
    
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const text = item.textContent.trim();
      if (categoryMap[text]) {
        item.setAttribute('data-category', categoryMap[text]);
      }
    });
  }
  
  // ── INITIALIZE ALL ENHANCED FEATURES ──
  function initEnhancements() {
    // Start particle animation
    initiateParticleNetwork();
    
    // Initialize theme
    initPortfolioCategories();
    
    // Initial scroll reveal
    triggerScrollReveal();
  }
  
  function initiateParticleNetwork() {
    try {
      initParticleNetwork();
    } catch (e) {
      console.log('Particle network animation skipped');
    }
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
  } else {
    initEnhancements();
  }
  
  // Re-trigger on page change
  const originalShowPage = window.showPage;
  window.showPage = function(name, btn) {
    originalShowPage(name, btn);
  };
