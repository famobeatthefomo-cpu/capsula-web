/* Cápsula — UI interactions */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    // Mobile nav toggle
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    if (toggle && header) {
      toggle.addEventListener("click", function () { header.classList.toggle("open"); });
      header.querySelectorAll(".nav-links a").forEach(function (a) {
        a.addEventListener("click", function () { header.classList.remove("open"); });
      });
    }

    // FAQ accordion
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        var isOpen = item.classList.contains("open");
        // close siblings within same .faq
        var group = q.closest(".faq");
        if (group) group.querySelectorAll(".faq-item.open").forEach(function (i) { if (i !== item) i.classList.remove("open"); });
        item.classList.toggle("open", !isOpen);
      });
    });

    // Generic tab selectors: [data-tab] buttons + [data-panel] panels in same [data-tabset]
    document.querySelectorAll("[data-tabset]").forEach(function (set) {
      var btns = set.querySelectorAll("[data-tab]");
      var panels = set.querySelectorAll("[data-panel]");
      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          btns.forEach(function (b) { b.classList.remove("active"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          var target = set.querySelector('[data-panel="' + btn.dataset.tab + '"]');
          if (target) target.classList.add("active");
        });
      });
    });

    // Demo form handling (no backend)
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.querySelector(".form-msg");
        if (msg) { msg.hidden = false; }
        form.reset();
      });
    });

    // ---- Auth mockup (localStorage) ----
    // If logged in, the header capsule shows "Carta Habitacional" instead of "Accede".
    var user = null;
    try { user = JSON.parse(localStorage.getItem("capsula_user")); } catch (e) {}
    if (user && user.name) {
      document.querySelectorAll(".js-auth-cta").forEach(function (a) {
        a.setAttribute("data-i18n", "cta.profile");
        a.dataset.es = "Tu Carta Habitacional";
        a.innerHTML = "Tu Carta Habitacional";
        a.classList.add("logged");
      });
      var lang = "es";
      try { lang = localStorage.getItem("capsula_lang") || "es"; } catch (e) {}
      if (window.CAPSULA_I18N) CAPSULA_I18N.apply(lang);
    }

    // Simple modals
    document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var m = document.getElementById(btn.getAttribute("data-modal-open"));
        if (m) m.classList.add("open");
      });
    });
    document.querySelectorAll(".modal-bg").forEach(function (bg) {
      bg.addEventListener("click", function (e) { if (e.target === bg) bg.classList.remove("open"); });
      bg.querySelectorAll(".close").forEach(function (c) {
        c.addEventListener("click", function () { bg.classList.remove("open"); });
      });
    });
  });
})();
