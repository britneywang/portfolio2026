/* ===== THEME TOGGLE ===== */
(function () {
    var stored = localStorage.getItem("theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  })();
  
  document.addEventListener("DOMContentLoaded", function () {
    /* --- Theme --- */
    var toggle = document.getElementById("themeToggle");
    var moonIcon = document.getElementById("moonIcon");
    var sunIcon = document.getElementById("sunIcon");
  
    function applyTheme() {
      var isDark = document.documentElement.classList.contains("dark");
      if (moonIcon && sunIcon) {
        moonIcon.style.display = isDark ? "none" : "block";
        sunIcon.style.display = isDark ? "block" : "none";
      }
    }
  
    if (toggle) {
      applyTheme();
      toggle.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(
          "theme",
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
        applyTheme();
      });
    }
  
    /* --- Scroll Reveal --- */
    var revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
  
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
  
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  
    /* --- Scroll Indicator (homepage only) --- */
    var scrollDots = document.querySelectorAll(".scroll-dot");
  
    if (scrollDots.length > 0) {
      var sections = ["hero", "about", "experience", "projects", "connect"];
  
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              scrollDots.forEach(function (dot) {
                dot.classList.toggle(
                  "active",
                  dot.dataset.section === entry.target.id
                );
              });
            }
          });
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
  
      sections.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
  
      scrollDots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          var target = document.getElementById(dot.dataset.section);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        });
        dot.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            var target = document.getElementById(dot.dataset.section);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  
    /* --- Typewriter (homepage only) --- */
    var typedEl = document.getElementById("typedText");
  
    if (typedEl) {
      var phrases = [
        "I design digital experiences.",
        "I build fast websites.",
        "I craft beautiful brands.",
        "I create intuitive interfaces.",
      ];
      var phraseIndex = 0;
      var charIndex = 0;
      var isDeleting = false;
  
      function type() {
        var current = phrases[phraseIndex];
  
        if (!isDeleting) {
          if (charIndex < current.length) {
            charIndex++;
            typedEl.textContent = current.slice(0, charIndex);
            setTimeout(type, 100);
          } else {
            setTimeout(function () {
              isDeleting = true;
              type();
            }, 2000);
          }
        } else {
          if (charIndex > 0) {
            charIndex--;
            typedEl.textContent = current.slice(0, charIndex);
            setTimeout(type, 50);
          } else {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 200);
          }
        }
      }
  
      type();
    }
  
    /* --- Progress Bar Animation (case study pages) --- */
    var progressFills = document.querySelectorAll(".progress-fill");
  
    if (progressFills.length > 0) {
      var progressObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var fill = entry.target;
              var width = fill.getAttribute("data-width");
              fill.style.width = width + "%";
            }
          });
        },
        { threshold: 0.3 }
      );
  
      progressFills.forEach(function (fill) {
        progressObserver.observe(fill);
      });
    }
  });