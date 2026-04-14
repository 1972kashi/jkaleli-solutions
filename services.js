(function () {
  const serviceData = {
    uiux: {
      icon: "🎨",
      title: "UI/UX Design",
      desc: "We design intuitive, user-friendly interfaces that enhance customer experiences and drive engagement."
    },
    webdesign: {
      icon: "🖥️",
      title: "Web Design",
      desc: "We craft beautiful, responsive websites that capture your brand identity and leave a lasting impression."
    },
    webdev: {
      icon: "💻",
      title: "Web Development",
      desc: "From custom applications to complex systems, we build scalable and secure solutions tailored to your business needs."
    },
    appdev: {
      icon: "📱",
      title: "App Development",
      desc: "We build reliable mobile applications that fit your product goals and grow with your users."
    },
    startup: {
      icon: "🧠",
      title: "Startup Ideas",
      desc: "We help you validate, refine, and launch your startup concept by turning raw ideas into actionable MVP plans."
    },
    seo: {
      icon: "🔍",
      title: "SEO Optimization",
      desc: "Optimize your digital presence and boost visibility with practical, data-driven SEO strategies."
    }
  };

  const modal = document.getElementById("service-detail");
  const icon = document.getElementById("detail-icon");
  const title = document.getElementById("detail-title");
  const desc = document.getElementById("detail-desc");
  const closeBtn = document.getElementById("detail-close");
  const startBtn = document.getElementById("detail-start");
  const serviceCards = document.querySelectorAll("[data-service]");

  if (!modal || !icon || !title || !desc || !serviceCards.length) return;

  function openDetail(key) {
    const data = serviceData[key];
    if (!data) return;

    icon.textContent = data.icon;
    title.textContent = data.title;
    desc.textContent = data.desc;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeDetail() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => openDetail(card.dataset.service));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDetail);
  if (startBtn) startBtn.addEventListener("click", closeDetail);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeDetail();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeDetail();
    }
  });
})();