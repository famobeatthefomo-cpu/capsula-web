/* Cápsula — Profilo Cápsula view controller.
   Switches between the account states and renders the sample result.
   All state comes from CAPSULA_ACCOUNT (localStorage mock, no backend). */
(function () {
  var A = window.CAPSULA_ACCOUNT;
  if (!A) return;

  /* The four sensory profiles. Each keeps ONE identity colour across the
     whole site; the fourth is the logo yellow darkened enough to read. */
  /* Colours are taken from each animal's own artwork so icon and ring agree:
     libellula = coral, orso = rosa, colibri = giallo. The granchio artwork
     reuses the same rosa as the orso, so it takes the one identity colour
     still free (petrolio) — its disc would need recolouring to match. */
  var PROFILES = {
    lib: { img: "profilo-libellula.png", color: "var(--coral)" },
    oso: { img: "profilo-orso.png",      color: "var(--pink-d)" },
    col: { img: "profilo-colibri.png",   color: "var(--yellow-d)" },
    can: { img: "profilo-granchio.png",  color: "var(--teal)" }
  };
  var NAMES = {
    es: { lib:"Libélula", oso:"Oso", col:"Colibrí", can:"Cangrejo", cartografo:"Cartógrafo" },
    ca: { lib:"Libèl·lula", oso:"Ós", col:"Colibrí", can:"Cranc", cartografo:"Cartògraf" },
    it: { lib:"Libellula", oso:"Orso", col:"Colibrì", can:"Granchio", cartografo:"Cartografo" },
    en: { lib:"Dragonfly", oso:"Bear", col:"Hummingbird", can:"Crab", cartografo:"Cartographer" }
  };
  function lang() { return (window.CAPSULA_I18N && CAPSULA_I18N.current()) || "es"; }
  function names() { return NAMES[lang()] || NAMES.es; }
  function txt(key) {
    var el = document.querySelector('[data-i18n="' + key + '"]');
    return el ? el.textContent.trim() : "";
  }

  var views = {
    auth: document.getElementById("auth-view"),
    pre:  document.getElementById("pretest-view"),
    res:  document.getElementById("result-view")
  };
  var modal = document.getElementById("modal");
  var modalBody = document.getElementById("modal-body");

  function openModal(html) { modalBody.innerHTML = html; modal.classList.add("open"); }
  function closeModal() { modal.classList.remove("open"); }
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  modal.querySelector(".close").addEventListener("click", closeModal);

  function ring(p) {
    var C = 2 * Math.PI * 32, on = C * p.pct / 100;
    var info = PROFILES[p.key];
    return '<div class="ring"><div class="ring-wrap">' +
      '<svg viewBox="0 0 80 80" role="img" aria-label="' + names()[p.key] + ' ' + p.pct + '%">' +
        '<circle class="ring-track" cx="40" cy="40" r="32"></circle>' +
        '<circle class="ring-arc" cx="40" cy="40" r="32" stroke="' + info.color +
          '" stroke-dasharray="' + on.toFixed(1) + ' ' + (C - on).toFixed(1) + '"></circle>' +
      '</svg>' +
      '<img src="assets/img/' + info.img + '" alt=""></div>' +
      '<p class="rlabel">' + names()[p.key] + '<br><span class="rpct">' + p.pct + '%</span></p></div>';
  }

  function renderResult() {
    var u = A.user(), r = A.result();
    if (!u || !r) return;
    document.getElementById("res-name").textContent = u.name || "";
    var n = names();
    var pn = document.querySelector(".result-head .pname");
    if (pn) pn.innerHTML = "<b>" + n[r.sensory] + "</b> · " + n[r.cognitive];
    var head = document.querySelector(".result-head .animal");
    if (head) head.src = "assets/img/" + PROFILES[r.sensory].img;
    document.getElementById("rings").innerHTML = r.others.map(ring).join("");

    [["scheda", "scheda.html"], ["catalogo", "catalogo.html"]].forEach(function (pair) {
      var key = pair[0], href = pair[1];
      var card = document.getElementById("card-" + key);
      var slot = card.querySelector(".ucta");
      if (A.owns(key)) {
        card.classList.add("owned");
        slot.innerHTML = '<p class="owned-tag">' + txt("acc.owned") + '</p>' +
          '<a class="btn btn--capsule btn--petrolc" href="' + href + '">' + txt("acc.consult") + '</a>';
      } else {
        card.classList.remove("owned");
        slot.innerHTML = '<button class="btn btn--capsule btn--coralc" data-buy="' + key + '">' +
          txt("acc.unlock") + '</button>';
      }
    });
  }

  function render() {
    var stage = A.stage();
    views.auth.hidden = stage !== "signed-out";
    views.pre.hidden  = stage !== "A";
    views.res.hidden  = stage === "signed-out" || stage === "A";
    if (!views.res.hidden) renderResult();
  }

  /* sign in */
  var form = document.getElementById("auth-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    A.signIn(document.getElementById("auth-name").value.trim(),
             document.getElementById("auth-email").value.trim());
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("logout").addEventListener("click", function () {
    A.signOut(); render(); window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* the Test — one attempt per account */
  document.getElementById("start-test").addEventListener("click", function () {
    openModal("<h3>" + txt("acc.testSim") + "</h3><p class='muted'>" + txt("acc.testSimDesc") +
      "</p><p style='margin-top:1.2rem'><button class='btn btn--capsule btn--coralc' id='do-test'>" +
      txt("acc.testSimBtn") + "</button></p>");
    document.getElementById("do-test").addEventListener("click", function () {
      A.completeTest(); closeModal(); render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* purchases — simulated, and shared with the Autoprogetta page */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-buy]");
    if (!b) return;
    var key = b.dataset.buy;
    openModal("<h3>" + txt("acc.payTitle") + "</h3><p class='muted'>" + txt("acc.payDesc") +
      "</p><p style='margin-top:1.2rem'><button class='btn btn--capsule btn--coralc' id='do-buy'>" +
      txt("acc.paySim") + "</button></p>");
    document.getElementById("do-buy").addEventListener("click", function () {
      A.buy(key); closeModal(); render();
    });
  });

  document.addEventListener("capsula:lang", function () { if (!views.res.hidden) renderResult(); });
  render();
})();
