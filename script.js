// ===== SMOOTH SCROLLING & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".project-card, .detail-card, .skill-category, .timeline-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// ===== CONTACT ME BUTTON =====
document.querySelector(".btn-primary-custom")?.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
});

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".hero::before, .hero::after",
  );

  if (parallaxElements.length > 0) {
    // Add subtle parallax to hero section
    document.querySelector(".hero").style.transform =
      `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== FORM HANDLING (For future contact form) =====
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Message sent! I will get back to you soon.");
    contactForm.reset();
  });
}

// ===== MOBILE MENU HANDLING =====
const navbarToggler = document.querySelector(".navbar-toggler");
const navItems = document.querySelector(".nav-items");

if (navbarToggler) {
  navbarToggler.addEventListener("click", () => {
    navItems?.classList.toggle("show");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navItems?.classList.remove("show");
    });
  });
}

// ===== DARK MODE TOGGLE (Optional) =====
const createDarkModeToggle = () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
  }
};

// ===== TYPE ANIMATION (For hero text) =====
const typeAnimation = () => {
  const role = document.querySelector(".role-badge");
  if (role) {
    const text = role.textContent;
    let index = 0;
    role.textContent = "";

    const type = () => {
      if (index < text.length) {
        role.textContent += text.charAt(index);
        index++;
        setTimeout(type, 50);
      }
    };
    type();
  }
};

// Initialize type animation when page loads
window.addEventListener("load", typeAnimation);

// ===== REVEAL ANIMATIONS ON SCROLL =====
const revealElements = () => {
  const reveals = document.querySelectorAll("section");
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;

    if (elementTop < windowHeight) {
      reveal.style.opacity = "1";
    }
  });
};

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// ===== SMOOTH SCROLL TO TOP =====
const scrollToTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -10);
    requestAnimationFrame(scrollToTop);
  }
};

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(124, 42, 232, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ===== LAZY LOAD IMAGES =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => imageObserver.observe(img));
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  // Scroll to next section with arrow down
  if (e.key === "ArrowDown") {
    const sections = Array.from(document.querySelectorAll("section"));
    const current = sections.findIndex((s) => {
      const rect = s.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    if (current < sections.length - 1) {
      sections[current + 1].scrollIntoView({ behavior: "smooth" });
    }
  }

  // Scroll to previous section with arrow up
  if (e.key === "ArrowUp") {
    const sections = Array.from(document.querySelectorAll("section"));
    const current = sections.findIndex((s) => {
      const rect = s.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    if (current > 0) {
      sections[current - 1].scrollIntoView({ behavior: "smooth" });
    }
  }
});

// ===== TOOLTIP INITIALIZATION =====
// Initialize Bootstrap tooltips if needed
const initTooltips = () => {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  );
};

window.addEventListener("load", initTooltips);

// ===== COUNTER ANIMATION (For stats if added) =====
const animateCounters = () => {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 50;
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };

    updateCount();
  });
};

// ===== COPY TO CLIPBOARD (For email) =====
document.querySelectorAll("[data-copy]").forEach((element) => {
  element.addEventListener("click", () => {
    const text = element.getAttribute("data-copy");
    navigator.clipboard.writeText(text).then(() => {
      const original = element.textContent;
      element.textContent = "Copied!";
      setTimeout(() => {
        element.textContent = original;
      }, 2000);
    });
  });
});

console.log("Portfolio script loaded successfully!");
