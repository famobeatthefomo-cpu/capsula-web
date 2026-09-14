/* Cápsula — gallery carousels + lightbox.
   Any .gcar gets arrow buttons on desktop; any [data-lb] group opens a
   lightbox where you can step through that group's images. */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    /* --- arrows for each carousel --- */
    document.querySelectorAll(".gcar").forEach(function (car) {
      var wrap = car.closest(".gcar-wrap");
      if (!wrap) return;
      ["prev", "next"].forEach(function (dir) {
        var b = document.createElement("button");
        b.className = "gcar-nav"; b.type = "button"; b.dataset.dir = dir;
        b.setAttribute("aria-label", dir);
        b.textContent = dir === "prev" ? "‹" : "›";
        b.addEventListener("click", function () {
          var step = car.clientWidth * 0.8;
          car.scrollBy({ left: dir === "prev" ? -step : step, behavior: "smooth" });
        });
        wrap.appendChild(b);
      });
      function sync() {
        var max = car.scrollWidth - car.clientWidth - 2;
        wrap.querySelector('[data-dir="prev"]').disabled = car.scrollLeft <= 2;
        wrap.querySelector('[data-dir="next"]').disabled = car.scrollLeft >= max;
      }
      car.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
    });

    /* --- lightbox --- */
    var lb = document.createElement("div");
    lb.className = "lb";
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lb-next" aria-label="Next">&#8250;</button>' +
      '<div><img alt=""><p class="lb-count"></p></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img"), lbCount = lb.querySelector(".lb-count");
    var group = [], idx = 0, lastFocus = null;

    function show(i) {
      if (!group.length) return;
      idx = (i + group.length) % group.length;
      lbImg.src = group[idx];
      lbCount.textContent = (idx + 1) + " / " + group.length;
    }
    function open(srcs, i, from) {
      group = srcs; lastFocus = from || null;
      show(i);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });

    document.querySelectorAll("[data-lb]").forEach(function (box) {
      var items = [].slice.call(box.querySelectorAll("img"));
      var srcs = items.map(function (im) { return im.dataset.full || im.src; });
      items.forEach(function (im, i) {
        var trigger = im.closest("button, a") || im;
        trigger.addEventListener("click", function (e) {
          e.preventDefault();
          open(srcs, i, trigger);
        });
      });
    });
  });
})();
