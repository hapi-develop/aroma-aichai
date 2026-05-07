const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a");
const processList = document.querySelector(".process-list");
const carouselButtons = document.querySelectorAll("[data-carousel-direction]");
const revealTargets = document.querySelectorAll(
  ".section-heading, .profile-card, .about-copy, .work-card, .process-item, .contact > div"
);

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (processList && carouselButtons.length > 0) {
  carouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.carouselDirection === "next" ? 1 : -1;
      const item = processList.querySelector(".process-item");
      const scrollAmount = item ? item.offsetWidth + 18 : 320;

      processList.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth",
      });
    });
  });
}

if (revealTargets.length > 0) {
  revealTargets.forEach((target) => target.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}
