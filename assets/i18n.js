/* Cápsula — lightweight i18n engine.
   Spanish is written inline in the HTML (default / fallback).
   Each page registers EN + IT strings via CAPSULA_I18N.add({en:{...}, it:{...}}).
   Keys map to elements with [data-i18n="key"] (innerHTML) or
   [data-i18n-ph="key"] (input/textarea placeholder). */
(function () {
  var DICT = { en: {}, it: {} };
  var STORE = "capsula_lang";

  function add(obj) {
    ["en", "it"].forEach(function (l) {
      if (obj[l]) for (var k in obj[l]) DICT[l][k] = obj[l][k];
    });
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    // text content
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
      if (lang === "es") el.innerHTML = el.dataset.es;
      else el.innerHTML = (DICT[lang] && DICT[lang][key] != null) ? DICT[lang][key] : el.dataset.es;
    });
    // placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (el.dataset.esPh === undefined) el.dataset.esPh = el.getAttribute("placeholder") || "";
      if (lang === "es") el.setAttribute("placeholder", el.dataset.esPh);
      else el.setAttribute("placeholder", (DICT[lang] && DICT[lang][key] != null) ? DICT[lang][key] : el.dataset.esPh);
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  function init() {
    var saved = "es";
    try { saved = localStorage.getItem(STORE) || "es"; } catch (e) {}
    apply(saved);
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.lang); });
    });
  }

  window.CAPSULA_I18N = { add: add, apply: apply };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
