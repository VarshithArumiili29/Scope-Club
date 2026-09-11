// ============ Theme toggle (dark / light) ============
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const label = toggle ? toggle.querySelector(".theme-label") : null;

  // Restore saved preference, else respect the OS setting.
  const saved = localStorage.getItem("scope-theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }
  syncLabel();

  function syncLabel() {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (label) label.textContent = isDark ? "Dark" : "Light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0b1220" : "#f5f7fb");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("scope-theme", next);
      syncLabel();
    });
  }
})();

// ============ Mobile navigation ============
(function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close after selecting a link on mobile.
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
})();

// ============ Contact form (client-side demo) ============
(function () {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (note) note.textContent = "Please fill in all fields correctly.";
      form.reportValidity();
      return;
    }
    const name = document.getElementById("name").value.trim();
    if (note) note.textContent = "Thanks, " + name + "! Your message has been noted.";
    form.reset();
  });
})();

// ============ Footer year ============
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
