/* Cápsula — mock account state, shared by Profilo Cápsula and Autoprogetta.
   No backend: everything lives in this browser's localStorage.
   Shape:
     capsula_user  = {name, email}
     capsula_state = {testDone:bool, result:{...}, scheda:bool, catalogo:bool}
   The Test can be taken ONCE per account: once testDone is true nothing
   here ever sets it back to false (only signing out clears the account). */
(function () {
  var U = "capsula_user", S = "capsula_state";

  function read(k, fallback) {
    try { return JSON.parse(localStorage.getItem(k)) || fallback; } catch (e) { return fallback; }
  }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var SAMPLE = {
    sensory: "lib",            // Libellula
    cognitive: "cartografo",
    others: [                  // the other three sensory profiles, as percentages
      { key: "oso", pct: 21 },
      { key: "col", pct: 17 },
      { key: "can", pct: 10 }
    ]
  };

  var Account = {
    user: function () { return read(U, null); },
    state: function () { return read(S, {}); },

    signIn: function (name, email) {
      write(U, { name: name, email: email });
      return this.user();
    },
    signOut: function () {
      try { localStorage.removeItem(U); localStorage.removeItem(S); } catch (e) {}
    },

    isLoggedIn: function () { return !!this.user(); },
    hasTest: function () { return !!this.state().testDone; },

    /* The Test is one-shot: if a result already exists it is never replaced. */
    completeTest: function () {
      var s = this.state();
      if (s.testDone) return s.result;
      s.testDone = true;
      s.result = SAMPLE;
      write(S, s);
      return s.result;
    },
    result: function () { return this.state().result || null; },

    owns: function (product) { return !!this.state()[product]; },
    buy: function (product) {
      var s = this.state();
      s[product] = true;
      write(S, s);
    },

    /* Which of the five account states we are in (for debugging / labels). */
    stage: function () {
      if (!this.isLoggedIn()) return "signed-out";
      if (!this.hasTest()) return "A";
      var sc = this.owns("scheda"), ca = this.owns("catalogo");
      if (sc && ca) return "E";
      if (ca) return "D";
      if (sc) return "C";
      return "B";
    }
  };

  window.CAPSULA_ACCOUNT = Account;
})();
