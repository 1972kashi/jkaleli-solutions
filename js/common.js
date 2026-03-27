(function () {
  // Portfolio page filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        portfolioItems.forEach((item) => {
          const matches = filter === "all" || item.dataset.cat === filter;
          item.style.display = matches ? "flex" : "none";
        });
      });
    });
  }
})();