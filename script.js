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

// ===== ACTIVE NAV LINK (IntersectionObserver — reliable even at page bottom) =====
const setupActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  // Use a large rootMargin so the section above the fold is marked active
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute('id'));
        }
      });
    },
    {
      // Top of viewport offset matches navbar height; bottom offset forces
      // the LAST section to activate even when it never fills the viewport
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    }
  );

  sections.forEach((s) => navObserver.observe(s));

  // Also set active immediately when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
};

setupActiveNav();


// ===== SCROLL REVEAL SYSTEM =====
// Targets elements with [data-reveal] and [data-reveal-title] attrs.
// CSS handles the hidden/transform states; JS just toggles .revealed.
const setupScrollReveal = () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  // Observe all [data-reveal] elements
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });

  // Observe all [data-reveal-title] elements
  document.querySelectorAll('[data-reveal-title]').forEach((el) => {
    revealObserver.observe(el);
  });
};

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollReveal);
} else {
  setupScrollReveal();
}


// ===== CONTACT ME BUTTON =====
document.querySelector(".btn-primary-custom")?.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
});

// Parallax removed — it caused hero section to translate off-screen during scroll.


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
const closeMobileNav = () => {
  // Use Bootstrap 5 Collapse API to properly close the navbar
  const navbarCollapseEl = document.getElementById('navbarNav');
  if (navbarCollapseEl && navbarCollapseEl.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);
    bsCollapse.hide();
  }
};

// Close nav when any nav link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});


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

// Reveal elements on scroll — now handled by setupScrollReveal() above


// ===== SMOOTH SCROLL TO TOP =====
const scrollToTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -10);
    requestAnimationFrame(scrollToTop);
  }
};

// ===== NAVBAR SCROLL EFFECTS + PROGRESS BAR + SCROLL INDICATOR =====
const navbar = document.querySelector('.navbar');
const progressBar = document.getElementById('scroll-progress');
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update scroll progress bar
  if (progressBar) progressBar.style.width = progress + '%';

  // Toggle scrolled class for deeper glass effect
  if (navbar) {
    if (scrollTop > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Hide scroll indicator once user starts scrolling
  if (scrollIndicator) {
    if (scrollTop > 80) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
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
