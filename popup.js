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

// ── Render card content ──
function renderCard() {
  const card = cards[cardIndex];
  cardIcon.textContent  = card.icon;
  cardTitle.textContent = card.title;
  cardDesc.textContent  = card.desc;
  renderDots();
}

// ── Render dots ──
function renderDots() {
  dotsEl.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === cardIndex ? " active" : "");
    dot.addEventListener("click", () => goToCard(i));
    dotsEl.appendChild(dot);
  });
}

// ── Navigate to specific card ──
function goToCard(index) {
  if (animating || index === cardIndex) return;
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

// ── Arrow navigation ──
function goNext() {
  goToCard((cardIndex + 1) % cards.length);
}

function goPrev() {
  goToCard((cardIndex - 1 + cards.length) % cards.length);
}

// ── Reset filters ──
function resetFilters() {
  roleSelect.value = "";
  wantSelect.value = "";
}

// ── Submit ──
function handleSubmit() {
  if (submitBtn.classList.contains("sent")) return;
  submitBtn.classList.add("sent");
  submitBtn.textContent = "✓ SENT!";
  setTimeout(() => {
    submitBtn.classList.remove("sent");
    submitBtn.textContent = "SUBMIT";
  }, 2200);
}

// ── Event listeners ──
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);
resetBtn.addEventListener("click", resetFilters);
submitBtn.addEventListener("click", handleSubmit);

// ── Init ──
renderCard();
