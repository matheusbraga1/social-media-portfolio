// Menu hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Smooth scroll para links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Fecha o menu mobile após clicar
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Header transparente ao rolar
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animações ao scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".service-card, .portfolio-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});
