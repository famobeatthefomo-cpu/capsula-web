/* Cápsula — Catalogo: filtering, sorting and rendering of the sample listing. */
(function () {
  var A = window.CAPSULA_ACCOUNT, C = window.CAPSULA_CATALOG;
  if (!C) return;

  function lang() { return (window.CAPSULA_I18N && CAPSULA_I18N.current()) || "es"; }
  function D() { return C.i18n[lang()] || C.i18n.es; }
  function txt(k) { var e = document.querySelector('[data-i18n="' + k + '"]'); return e ? e.textContent.trim() : ""; }
  function money(p, unit) {
    return p.toLocaleString(lang() === "en" ? "en-GB" : "es-ES") + " €" + (unit || "");
  }

  var state = { cat: [], city: [], shop: [], price: "", ship: false, pickup: false, sort: "reco" };

  var grid    = document.getElementById("prod-grid");
  var count   = document.getElementById("cat-count");
  var chips   = document.getElementById("cat-chips");
  var filters = document.getElementById("filters");

  function uniq(f) { return C.products.map(f).filter(function (v, i, a) { return a.indexOf(v) === i; }); }

  function matches(p) {
    if (state.cat.length  && state.cat.indexOf(p.cat) === -1)   return false;
    if (state.city.length && state.city.indexOf(p.city) === -1) return false;
    if (state.shop.length && state.shop.indexOf(p.shop) === -1) return false;
    if (state.ship   && !p.ship)   return false;
    if (state.pickup && !p.pickup) return false;
    if (state.price === "lt150"    && !(p.price < 150))              return false;
    if (state.price === "150-400"  && !(p.price >= 150 && p.price <= 400)) return false;
    if (state.price === "gt400"    && !(p.price > 400))              return false;
    return true;
  }

  function card(p) {
    var d = D();
    return '<article class="prod">' +
      '<img src="assets/img/catalogo/' + p.id + '.jpg" alt="" loading="lazy">' +
      '<div class="pbody">' +
        '<p class="pcat">' + d.cat[p.cat] + '</p>' +
        '<h3>' + d.name[p.id] + '</h3>' +
        '<p class="pshop">' + p.shop + ' — ' + d.city[p.city] + '</p>' +
        '<div class="ptags">' + p.tags.map(function (t) { return '<span>' + d.tag[t] + '</span>'; }).join("") + '</div>' +
        '<div class="pfoot"><span class="pprice">' + money(p.price, p.unit) + '</span>' +
          (p.ship ? '<span class="pship">' + txt("cat.shipYes") + '</span>' : '') + '</div>' +
        '<button class="btn btn--capsule btn--coralc" data-prod="' + p.id + '">' + txt("cat.see") + '</button>' +
      '</div></article>';
  }

  function activeChips() {
    var d = D(), out = [];
    state.cat.forEach(function (v)  { out.push(["cat", v, d.cat[v]]); });
    state.city.forEach(function (v) { out.push(["city", v, d.city[v]]); });
    state.shop.forEach(function (v) { out.push(["shop", v, v]); });
    if (state.price)  out.push(["price", state.price, document.querySelector('#f-price option[value="' + state.price + '"]').textContent]);
    if (state.ship)   out.push(["ship", "1", txt("cat.ship")]);
    if (state.pickup) out.push(["pickup", "1", txt("cat.pickup")]);
    chips.innerHTML = out.map(function (c) {
      return '<span class="chip">' + c[2] + '<button aria-label="x" data-drop="' + c[0] + '" data-val="' + c[1] + '">&times;</button></span>';
    }).join("");
  }

  function render() {
    var list = C.products.filter(matches);
    if (state.sort === "asc")  list = list.slice().sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "desc") list = list.slice().sort(function (a, b) { return b.price - a.price; });
    count.innerHTML = "<b>" + list.length + "</b> " + txt("cat.countLabel");
    grid.innerHTML = list.length ? list.map(card).join("")
                                 : '<p class="cat-empty">' + txt("cat.empty") + "</p>";
    activeChips();
  }

  /* build the free filters from the data itself */
  function buildFilters() {
    var d = D();
    function boxes(key, values, label) {
      return '<div class="fgroup"><h4>' + label + "</h4>" + values.map(function (v) {
        return '<label><input type="checkbox" data-f="' + key + '" value="' + v.value + '"' +
          (state[key].indexOf(v.value) > -1 ? " checked" : "") + ">" + v.label + "</label>";
      }).join("") + "</div>";
    }
    document.getElementById("f-cat").innerHTML  = boxes("cat",  uniq(function (p) { return p.cat; }).map(function (v) { return { value:v, label:d.cat[v] }; }),  txt("cat.fCat"));
    document.getElementById("f-city").innerHTML = boxes("city", uniq(function (p) { return p.city; }).map(function (v) { return { value:v, label:d.city[v] }; }), txt("cat.fCity"));
    document.getElementById("f-shop").innerHTML = boxes("shop", uniq(function (p) { return p.shop; }).map(function (v) { return { value:v, label:v }; }),         txt("cat.fShop"));
    document.getElementById("f-lock").innerHTML = C.locked.map(function (k) { return "<span>" + d.lock[k] + "</span>"; }).join("");
  }

  document.addEventListener("change", function (e) {
    var cb = e.target.closest("[data-f]");
    if (cb) {
      var k = cb.dataset.f, v = cb.value, i = state[k].indexOf(v);
      if (cb.checked && i === -1) state[k].push(v);
      if (!cb.checked && i > -1)  state[k].splice(i, 1);
      return render();
    }
    if (e.target.id === "f-price")  { state.price  = e.target.value; return render(); }
    if (e.target.id === "f-ship")   { state.ship   = e.target.checked; return render(); }
    if (e.target.id === "f-pickup") { state.pickup = e.target.checked; return render(); }
    if (e.target.id === "cat-sort") { state.sort   = e.target.value; return render(); }
  });

  /* remove one active filter from its chip */
  document.addEventListener("click", function (e) {
    var x = e.target.closest("[data-drop]");
    if (!x) return;
    var k = x.dataset.drop, v = x.dataset.val;
    if (k === "price")  { state.price = ""; document.getElementById("f-price").value = ""; }
    else if (k === "ship")   { state.ship = false;   document.getElementById("f-ship").checked = false; }
    else if (k === "pickup") { state.pickup = false; document.getElementById("f-pickup").checked = false; }
    else {
      state[k] = state[k].filter(function (y) { return y !== v; });
      var cb = document.querySelector('[data-f="' + k + '"][value="' + v + '"]');
      if (cb) cb.checked = false;
    }
    render();
  });

  /* product detail — a sample modal, not a real product page */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-prod]");
    if (!b) return;
    var p = C.products.filter(function (x) { return x.id === b.dataset.prod; })[0];
    if (!p) return;
    var d = D();
    document.getElementById("modal-body").innerHTML =
      '<img src="assets/img/catalogo/' + p.id + '.jpg" alt="" style="width:100%;border-radius:12px">' +
      '<p class="pcat" style="margin-top:1rem;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">' + d.cat[p.cat] + "</p>" +
      "<h3>" + d.name[p.id] + "</h3>" +
      '<p class="muted">' + p.shop + " — " + d.city[p.city] + "</p>" +
      '<p style="font-family:var(--serif);font-weight:700;font-size:1.4rem;margin-top:.6rem">' + money(p.price, p.unit) + "</p>" +
      '<div class="ptags" style="display:flex;gap:.3rem;flex-wrap:wrap;margin-top:.8rem">' +
        p.tags.map(function (t) { return '<span style="font-size:.7rem;background:var(--cream-2);border-radius:999px;padding:.22em .6em">' + d.tag[t] + "</span>"; }).join("") + "</div>" +
      '<p class="note" style="margin-top:1.2rem">' + txt("cat.modalNote") + "</p>";
    document.getElementById("modal").classList.add("open");
  });

  var modal = document.getElementById("modal");
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("open"); });
  modal.querySelector(".close").addEventListener("click", function () { modal.classList.remove("open"); });

  /* mobile filter panel */
  document.getElementById("open-filters").addEventListener("click", function () { filters.classList.add("open"); });
  document.getElementById("close-filters").addEventListener("click", function () { filters.classList.remove("open"); });

  function boot() {
    var ok = A && A.owns("catalogo") && A.hasTest();
    document.getElementById("locked-view").hidden = ok;
    document.getElementById("cat-view").hidden = !ok;
    if (!ok) return;
    buildFilters();
    render();
  }
  document.addEventListener("capsula:lang", function () { if (!document.getElementById("cat-view").hidden) { buildFilters(); render(); } });
  boot();
})();
