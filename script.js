const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a");

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
