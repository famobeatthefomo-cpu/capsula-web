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
    // The header capsule always reads "Perfil Cápsula" (before AND after login);
    // only the `logged` class changes, for styling hooks.
    var user = null;
    try { user = JSON.parse(localStorage.getItem("capsula_user")); } catch (e) {}
    if (user && user.name) {
      document.querySelectorAll(".js-auth-cta").forEach(function (a) { a.classList.add("logged"); });
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

    // ---- Nav dropdown ("Servicios") ----
    document.querySelectorAll(".nav-drop").forEach(function (drop) {
      var btn = drop.querySelector(".nav-drop-t");
      if (!btn) return;
      function setOpen(v) {
        drop.classList.toggle("open", v);
        btn.setAttribute("aria-expanded", v ? "true" : "false");
      }
      // Pointer devices on wide screens open on hover; everything else on click,
      // so the click must not immediately toggle an already hover-opened menu.
      var hoverMq = window.matchMedia("(hover: hover) and (min-width: 1151px)");
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (hoverMq.matches && drop.classList.contains("open")) return;
        setOpen(!drop.classList.contains("open"));
      });
      drop.addEventListener("mouseenter", function () { if (hoverMq.matches) setOpen(true); });
      drop.addEventListener("mouseleave", function () { if (hoverMq.matches) setOpen(false); });
      btn.addEventListener("focus", function () { if (hoverMq.matches) setOpen(true); });
      drop.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      document.addEventListener("click", function (e) { if (!drop.contains(e.target)) setOpen(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    });

    // ---- Hero carousel: progress dots + click-to-advance ----
    document.querySelectorAll(".js-hcar").forEach(function (car) {
      var slides = Array.prototype.slice.call(car.querySelectorAll("img"));
      if (!slides.length) return;
      var dotsBox = car.parentNode.querySelector(".js-hcar-dots");
      var dots = [];
      if (dotsBox) {
        slides.forEach(function (_, i) {
          var d = document.createElement("b");
          if (i === 0) d.classList.add("on");
          dotsBox.appendChild(d);
          dots.push(d);
        });
      }
      function nearest() {
        var mid = car.scrollLeft + car.clientWidth / 2, best = 0, bd = Infinity;
        slides.forEach(function (im, i) {
          var c = im.offsetLeft + im.offsetWidth / 2, d = Math.abs(c - mid);
          if (d < bd) { bd = d; best = i; }
        });
        return best;
      }
      var raf;
      car.addEventListener("scroll", function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var i = nearest();
          dots.forEach(function (d, n) { d.classList.toggle("on", n === i); });
        });
      }, { passive: true });
      // clicking the partly visible neighbour scrolls to it
      slides.forEach(function (im, i) {
        im.addEventListener("click", function () {
          if (i === nearest()) return;
          im.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        });
      });
    });

  });
})();

/* Home — il motto sotto il testo introduttivo dell'hero:
   la misura viene adattata perché la riga sia larga quanto il paragrafo sopra. */
(function () {
  function init() {
    var motto = document.querySelector(".cap-motto--hero");
    if (!motto) return;
    var ref = document.querySelector(".hero--petrol .hero-sub");
    if (!ref) return;

    /* Misura fuori dal flusso: così il motto non allarga la colonna
       mentre leggiamo la larghezza del paragrafo di riferimento. */
    function fit() {
      var prev = motto.getAttribute("style") || "";
      motto.style.cssText = prev +
        ";position:absolute;visibility:hidden;left:-9999px;top:0;" +
        "width:max-content;max-width:none;white-space:nowrap;font-size:40px";
      var w = motto.getBoundingClientRect().width;
      var target = ref.getBoundingClientRect().width;
      if (prev) { motto.setAttribute("style", prev); } else { motto.removeAttribute("style"); }
      if (!w || !target) return;
      var size = Math.max(12, Math.min(40, 40 * target / w));
      motto.style.fontSize = size.toFixed(2) + "px";
    }

    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("capsula:lang", function () { setTimeout(fit, 0); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
