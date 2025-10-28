// Menu hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  
  // Update ARIA attributes for accessibility
  hamburger.setAttribute("aria-expanded", !isExpanded);
  hamburger.setAttribute("aria-label", isExpanded ? "Abrir menu de navegação" : "Fechar menu de navegação");
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
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Abrir menu de navegação");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", function(event) {
  const isClickInsideNav = navLinks.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menu de navegação");
  }
});

// Close menu on ESC key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Abrir menu de navegação");
    hamburger.focus();
  }
});

// Header transparente ao rolar
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

// Animações ao scroll com Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      // Remove observer após animar para melhor performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observa elementos para animação
document.querySelectorAll(".service-card, .portfolio-item, .client-logo-wrapper").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Lazy loading otimizado para imagens
if ("loading" in HTMLImageElement.prototype) {
  // Navegador suporta lazy loading nativo
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback para navegadores antigos
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// Atualiza ano do footer automaticamente
const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Preload das fontes críticas para melhor performance
if ("fonts" in document) {
  Promise.all([
    document.fonts.load("600 1em -apple-system"),
    document.fonts.load("400 1em -apple-system"),
  ]).then(() => {
    document.body.classList.add("fonts-loaded");
  });
}

// Melhora performance do scroll com debounce
let scrollTimeout;
window.addEventListener("scroll", function() {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  
  scrollTimeout = window.requestAnimationFrame(function() {
    // Lógica adicional de scroll pode ser adicionada aqui
  });
}, { passive: true });

// Detecta preferência de modo escuro do sistema (preparado para futuro)
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

prefersDarkScheme.addEventListener("change", (e) => {
  // Futuro: implementar tema escuro
  console.log("User prefers", e.matches ? "dark" : "light", "mode");
});

// Log para analytics (exemplo - substituir por sua solução de analytics)
console.log("Portfolio Brenda Almeida - Loaded successfully");

// Service Worker para PWA (opcional - descomentar se quiser implementar)
/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(registration => console.log("SW registered:", registration))
      .catch(error => console.log("SW registration failed:", error));
  });
}
*/