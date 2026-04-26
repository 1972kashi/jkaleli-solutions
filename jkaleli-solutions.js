 // Service details data
/* jkaleli-solutions.js */

/* -----------------------------
   Data
----------------------------- */
const serviceData = {
  uiux:      { icon: "🎨", title: "UI/UX Design", desc: "We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement." },
  webdesign: { icon: "🖥️", title: "Web Design", desc: "We craft beautiful, responsive websites that capture your brand identity and leave a lasting impression." },
  webdev:    { icon: "💻", title: "Web Development", desc: "From custom applications to complex systems, we build scalable and secure solutions tailored to your business needs." },
  appdev:    { icon: "📱", title: "App Development", desc: "From custom applications to complex systems, we build scalable and secure mobile solutions tailored to your business needs." },
  startup:   { icon: "🧠", title: "Startup Ideas", desc: "We help you validate, refine, and launch your startup concept — turning raw ideas into actionable plans and MVPs." },
  seo:       { icon: "🔍", title: "SEO Optimization", desc: "Optimize your digital presence and boost your visibility with our data-driven SEO strategies." }
};

/* -----------------------------
   Footer injection
----------------------------- */
const footerIds = ["home-footer", "portfolio-footer", "about-footer", "services-footer"];

function injectFooterInto(footerId) {
  const tpl = document.getElementById("footer-tpl");
  const mount = document.getElementById(footerId);
  if (!tpl || !mount) return;

  mount.innerHTML = "";
  mount.appendChild(tpl.content.cloneNode(true));
}

function injectFooterForPage(pageName) {
  footerIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  injectFooterInto(`${pageName}-footer`);
}

/* -----------------------------
   Navigation + active state
----------------------------- */
function setActiveNav(pageName) {
  document.querySelectorAll("nav .nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === pageName);
  });
}

function showPage(pageName) {
  const page = document.getElementById(`page-${pageName}`);
  if (!page) return;

  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  page.classList.add("active");

  setActiveNav(pageName);
  injectFooterForPage(pageName);

  // keep UX consistent (optional)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* -----------------------------
   Portfolio filtering
----------------------------- */
function filterPortfolio(category, clickedBtn) {
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  if (clickedBtn) clickedBtn.classList.add("active");

  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const matches = category === "all" || item.dataset.cat === category;
    item.style.display = matches ? "flex" : "none";
  });
}

/* -----------------------------
   Service detail modal
----------------------------- */
function openDetail(key) {
  const d = serviceData[key];
  if (!d) return;

  const icon = document.getElementById("detail-icon");
  const title = document.getElementById("detail-title");
  const desc = document.getElementById("detail-desc");
  const modal = document.getElementById("service-detail");

  if (!icon || !title || !desc || !modal) return;

  icon.textContent = d.icon;
  title.textContent = d.title;
  desc.textContent = d.desc;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeDetail() {
  const modal = document.getElementById("service-detail");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

/* -----------------------------
   Roadmap modal (for data-img attribute)
----------------------------- */
function openRoadmapModal(stepElement) {
  const overlay = document.getElementById("modal-overlay");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");

  if (!overlay || !modalImg || !modalTitle || !modalText) return;

  const imgSrc = stepElement.getAttribute("data-img");
  const title = stepElement.getAttribute("data-title");
  const text = stepElement.getAttribute("data-text");

  // Set content - use img element directly for better compatibility
  if (imgSrc) {
    modalImg.innerHTML = `<img src="${imgSrc}" alt="${title || 'Step image'}" style="width:100%;height:100%;object-fit:contain;">`;
  } else {
    modalImg.innerHTML = "";
  }
  modalTitle.textContent = title || "Step";
  modalText.textContent = text || "";

  // Show modal
  overlay.classList.add("active");
}

/* -----------------------------
   Service icon card popup - Card popup
----------------------------- */
function openServiceIconModal(cardElement) {
  const popup = document.getElementById("services-popup");
  if (!popup) return;

  // Get the service name from the card
  const textDiv = cardElement.querySelector(".text-1");
  const serviceName = textDiv ? textDiv.textContent.trim() : "Our Service";

  // Update the card text based on the service
  const cardText = popup.querySelector(".card__text");
  if (cardText) {
    const serviceDescriptions = {
      "UX Design": "We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement.",
      "Web Development": "We build robust, scalable web applications using modern technologies that power your business.",
      "Startup Ideas": "We help transform your ideas into viable business concepts with strategic planning and execution.",
      "Web Design": "We create visually stunning websites that capture your brand essence and captivate your audience.",
      "App Development": "We develop cross-platform mobile applications that deliver seamless user experiences.",
      "Search Engine Optimization": "We optimize your online presence to rank higher in search results and drive organic traffic."
    };
    cardText.textContent = serviceDescriptions[serviceName] || "We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement.";
  }

  popup.classList.add("active");
}

function closeServiceLightbox() {
  const popup = document.getElementById("services-popup");
  if (popup) popup.classList.remove("active");
}

function closeRoadmapModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.remove("active");
}

/* -----------------------------
   Background particle network
----------------------------- */
function initParticleNetwork() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  size();

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
      this.color = Math.random() > 0.7 ? "rgba(255,255,255,0.6)" : "rgba(0,229,209,0.4)";
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

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.strokeStyle = `rgba(0,229,209,${0.2 * (1 - dist / connectionDistance)})`;
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
    particles.forEach((p) => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener("resize", size);
}

/* -----------------------------
   Scroll reveal (kept)
----------------------------- */
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function triggerScrollReveal() {
  document
    .querySelectorAll(
      ".feature-card, .highlight-card, .value-card, .benefit-card, " +
      ".testimonial-card, .service-icon-card, .portfolio-item, .service-card"
    )
    .forEach((el) => {
      el.classList.remove("reveal");
      revealObserver.observe(el);
    });
}

/* -----------------------------
   Event wiring (no inline onclick)
----------------------------- */
function wireEvents() {
  // Nav buttons
  document.querySelectorAll("nav .nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  // Any element that navigates via data-page (home cards, footer links, hire buttons, etc)
  document.addEventListener("click", (e) => {
    const navTarget = e.target.closest("[data-page]");
    if (navTarget) {
      e.preventDefault();
      showPage(navTarget.dataset.page);
      return;
    }

    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      filterPortfolio(filterBtn.dataset.category, filterBtn);
      return;
    }

    const svc = e.target.closest("[data-service]");
    if (svc && svc.classList.contains("service-card")) {
      openDetail(svc.dataset.service);
      return;
    }

    const benefit = e.target.closest(".benefit-card[data-service]");
    if (benefit) {
      openDetail(benefit.dataset.service);
      return;
    }

    const close = e.target.closest("[data-close-detail]");
    if (close) {
      closeDetail();
      return;
    }

    // Service icon card click
    const serviceIconCard = e.target.closest(".service-icon-card");
    if (serviceIconCard) {
      openServiceIconModal(serviceIconCard);
      return;
    }

    // Roadmap step click (elements with data-title attribute in roadmap)
    const roadStep = e.target.closest(".step-number[data-title]");
    if (roadStep) {
      openRoadmapModal(roadStep);
      return;
    }

    // Close roadmap modal when clicking overlay
    if (e.target.id === "modal-overlay") {
      closeRoadmapModal();
      return;
    }

    // Close button for roadmap modal
    if (e.target.id === "road-modal-close") {
      closeRoadmapModal();
      return;
    }

    // Close popup when clicking close button
    const popupClose = e.target.closest(".popup-close, .lightbox-close");
    if (popupClose) {
      closeServiceLightbox();
      return;
    }

    // Close popup when clicking outside content
    if (e.target.id === "services-popup" || e.target.id === "image-lightbox") {
      closeServiceLightbox();
      return;
    }

    // click outside content closes modal (optional)
    if (e.target.id === "service-detail") closeDetail();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetail();
      closeRoadmapModal();
      closeServiceLightbox();
    }
  });
}

/* -----------------------------
   Service Request Popup
----------------------------- */
const cards = [
  {
    icon: "{ }",
    title: "Custom Development",
    desc: "From custom applications to complex systems, we build scalable and secure solutions tailored to your business needs."
  },
  {
    icon: "✦",
    title: "UI/UX Design",
    desc: "We craft intuitive, beautiful interfaces that delight users and drive engagement across all platforms."
  },
  {
    icon: "◈",
    title: "Digital Strategy",
    desc: "From brand positioning to growth roadmaps, we help you build a clear path to measurable results."
  },
  {
    icon: "⬡",
    title: "Cloud & Infrastructure",
    desc: "Reliable, scalable cloud setups with monitoring, CI/CD pipelines, and rock-solid security baked in."
  }
];

let cardIndex = 0;
let animating = false;

// Elements
const cardEl      = document.getElementById("card");
const cardIcon    = document.getElementById("card-icon");
const cardTitle   = document.getElementById("card-title");
const cardDesc    = document.getElementById("card-desc");
const dotsEl      = document.getElementById("dots");
const prevBtn     = document.getElementById("prev-btn");
const nextBtn     = document.getElementById("next-btn");
const resetBtn    = document.getElementById("reset-btn");
const submitBtn   = document.getElementById("submit-btn");
const roleSelect  = document.getElementById("role-select");
const wantSelect  = document.getElementById("want-select");

// Popup elements
const popupOverlay = document.getElementById("service-popup-overlay");
const hireUsBtn = document.getElementById("hire-us-btn");
const getStartedBtn = document.getElementById("get-started-btn");

// Open popup
function openServicePopup() {
  if (popupOverlay) {
    popupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close popup
function closeServicePopup() {
  if (popupOverlay) {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Render card content
function renderCard() {
  if (!cardEl) return;
  const card = cards[cardIndex];
  cardIcon.textContent  = card.icon;
  cardTitle.textContent = card.title;
  cardDesc.textContent  = card.desc;
  renderDots();
}

// Render dots
function renderDots() {
  if (!dotsEl) return;
  dotsEl.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === cardIndex ? " active" : "");
    dot.addEventListener("click", () => goToCard(i));
    dotsEl.appendChild(dot);
  });
}

// Navigate to specific card
function goToCard(index) {
  if (animating || index === cardIndex || !cardEl) return;
  const dir = index > cardIndex ? "anim-next" : "anim-prev";
  animating = true;
  cardEl.classList.add(dir);
  setTimeout(() => {
    cardIndex = index;
    renderCard();
    cardEl.classList.remove(dir);
    animating = false;
  }, 220);
}

// Arrow navigation
function goNext() {
  goToCard((cardIndex + 1) % cards.length);
}

function goPrev() {
  goToCard((cardIndex - 1 + cards.length) % cards.length);
}

// Reset filters
function resetFilters() {
  if (roleSelect) roleSelect.value = "";
  if (wantSelect) wantSelect.value = "";
}

// Submit - sends email
function handleSubmit() {
  if (!submitBtn || submitBtn.classList.contains("sent")) return;
  
  const role = roleSelect?.value || "Not specified";
  const want = wantSelect?.value || "Not specified";
  const service = cards[cardIndex]?.title || "Not specified";
  
  // Create mailto link
  const subject = encodeURIComponent(`Service Request from ${role}`);
  const body = encodeURIComponent(`Role: ${role}\nWants to: ${want}\nInterested in: ${service}\n\nSent via JKALELI Solutions website`);
  window.location.href = `mailto:jkalelisolutions47@gmail.com?subject=${subject}&body=${body}`;
  
  submitBtn.classList.add("sent");
  submitBtn.textContent = "✓ SENT!";
  setTimeout(() => {
    submitBtn.classList.remove("sent");
    submitBtn.textContent = "SUBMIT";
    closeServicePopup();
    resetFilters();
  }, 2200);
}

// Wire popup events
function wirePopupEvents() {
  if (prevBtn) prevBtn.addEventListener("click", goNext);
  if (nextBtn) nextBtn.addEventListener("click", goPrev);
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);
  if (submitBtn) submitBtn.addEventListener("click", handleSubmit);
  
  // Open popup buttons
  if (hireUsBtn) {
    hireUsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openServicePopup();
    });
  }
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openServicePopup();
    });
  }
  
  // Close on overlay click
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        closeServicePopup();
      }
    });
  }
  
  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOverlay?.classList.contains("active")) {
      closeServicePopup();
    }
  });
  
  // Init card
  renderCard();
}
function init() {
  // Ensure footer on initial active page
  const activePage = document.querySelector(".page.active");
  const name = activePage?.id?.replace("page-", "") || "home";
  setActiveNav(name);
  injectFooterForPage(name);

  wireEvents();
  wirePopupEvents();

  try { initParticleNetwork(); } catch (_) {}
  triggerScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}