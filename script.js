// ===== MOBILE TOUCH FIX - PREVENT UNWANTED DRAGGING AND SCROLLING =====
(function () {
  let touchStartX = 0;
  let touchStartY = 0;
  let isScrolling = false;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
    },
    false,
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const deltaX = Math.abs(touchX - touchStartX);
      const deltaY = Math.abs(touchY - touchStartY);

      // Only allow vertical scrolling, prevent horizontal drag
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }

      // Prevent pull-to-refresh on mobile
      if (touchStartY < 100 && deltaY > 50) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  // Prevent pinch zoom
  document.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  // Prevent double-tap zoom
  let lastTap = 0;
  document.addEventListener(
    "touchend",
    (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
      }
      lastTap = currentTime;
    },
    false,
  );
})();

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
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  };

  // Use a large rootMargin so the section above the fold is marked active
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute("id"));
        }
      });
    },
    {
      // Top of viewport offset matches navbar height; bottom offset forces
      // the LAST section to activate even when it never fills the viewport
      rootMargin: "-80px 0px -40% 0px",
      threshold: 0,
    },
  );

  sections.forEach((s) => navObserver.observe(s));

  // Also set active immediately when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
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
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  // Observe all [data-reveal] elements
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver.observe(el);
  });

  // Observe all [data-reveal-title] elements
  document.querySelectorAll("[data-reveal-title]").forEach((el) => {
    revealObserver.observe(el);
  });
};

// Run after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupScrollReveal);
} else {
  setupScrollReveal();
}

// ===== CONTACT ME BUTTON =====
document.querySelector(".btn-primary-custom")?.addEventListener("click", () => {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
});

// Parallax removed — it caused hero section to translate off-screen during scroll.

// ===== CONTACT FORM WITH EMAILJS =====
const setupContactForm = () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  // Initialize EmailJS with your public key
  emailjs.init("1i_h6kldxBtvJhdOG"); // Replace with your actual EmailJS public key

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-send");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
      from_name: document.getElementById("contactName").value,
      from_email: document.getElementById("contactEmail").value,
      message: document.getElementById("contactMessage").value,
      to_name: "Sriharivishnu Janakiraman", // Your name
    };

    // Send email using EmailJS
    emailjs
      .send("service_pxwl49w", "template_itzvy86", formData)
      .then(() => {
        // Success
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success",
        );
        contactForm.reset();
      })
      .catch((error) => {
        // Error
        console.error("EmailJS error:", error);
        showNotification(
          "Failed to send message. Please try again or contact me directly.",
          "error",
        );
      })
      .finally(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
};

// ===== NOTIFICATION SYSTEM =====
const showNotification = (message, type = "info") => {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
      <span>${message}</span>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show with animation
  setTimeout(() => notification.classList.add("show"), 100);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
};

// Initialize contact form when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupContactForm);
} else {
  setupContactForm();
}

// ===== MOBILE MENU HANDLING =====
const closeMobileNav = () => {
  // Use Bootstrap 5 Collapse API to properly close the navbar
  const navbarCollapseEl = document.getElementById("navbarNav");
  if (navbarCollapseEl && navbarCollapseEl.classList.contains("show")) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);
    bsCollapse.hide();
  }
};

// Close nav when any nav link is clicked (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// ===== DARK MODE TOGGLE =====
const setupDarkMode = () => {
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle.querySelector("i");

  // Load saved preference
  const isLightMode = localStorage.getItem("darkMode") === "true";
  if (isLightMode) {
    document.body.classList.add("light-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("darkMode", isLight);

    // Update icon
    if (isLight) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
};

// Initialize dark mode when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupDarkMode);
} else {
  setupDarkMode();
}

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

// ===== BACK-TO-TOP BUTTON =====
const setupBackToTop = () => {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Listen for scroll events
  window.addEventListener("scroll", toggleBackToTop);
};

// Initialize back-to-top when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupBackToTop);
} else {
  setupBackToTop();
}

// ===== NAVBAR SCROLL EFFECTS + PROGRESS BAR + SCROLL INDICATOR =====
const navbar = document.querySelector(".navbar");
const progressBar = document.getElementById("scroll-progress");
const scrollIndicator = document.getElementById("scrollIndicator");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update scroll progress bar
  if (progressBar) progressBar.style.width = progress + "%";

  // Toggle scrolled class for deeper glass effect
  if (navbar) {
    if (scrollTop > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Hide scroll indicator once user starts scrolling
  if (scrollIndicator) {
    if (scrollTop > 80) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
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

// ===== CERTIFICATIONS COLLAPSE =====
const setupCertificationsCollapse = () => {
  const timelineItems = document.querySelectorAll(
    "#certifications .timeline-item",
  );
  if (timelineItems.length <= 5) return; // No need to collapse if 5 or fewer

  const certificationsSection = document.getElementById("certifications");
  const timeline = certificationsSection.querySelector(".timeline");

  // Hide items 6 and beyond initially
  timelineItems.forEach((item, index) => {
    if (index >= 5) {
      item.style.display = "none";
      item.classList.add("collapsed");
    }
  });

  // Create toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn btn-toggle-certifications";
  toggleBtn.innerHTML =
    '<i class="fas fa-chevron-down"></i> Show All Certifications';
  toggleBtn.setAttribute("aria-expanded", "false");

  // Add toggle functionality
  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      // Collapse
      timelineItems.forEach((item, index) => {
        if (index >= 5) {
          item.style.display = "none";
          item.classList.add("collapsed");
        }
      });
      toggleBtn.innerHTML =
        '<i class="fas fa-chevron-down"></i> Show All Certifications';
      toggleBtn.setAttribute("aria-expanded", "false");
    } else {
      // Expand
      timelineItems.forEach((item, index) => {
        if (index >= 5) {
          item.style.display = "block";
          item.classList.remove("collapsed");
        }
      });
      toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  });

  // Insert toggle button after timeline
  timeline.insertAdjacentElement("afterend", toggleBtn);
};

// Initialize certifications collapse when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupCertificationsCollapse);
} else {
  setupCertificationsCollapse();
}
