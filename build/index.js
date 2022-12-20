/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s = Symbol(),
  n = new WeakMap();
class o {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = n.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && n.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const r = t => new o("string" == typeof t ? t : t + "", void 0, s),
  i = (t, ...e) => {
    const n = 1 === t.length ? t[0] : e.reduce((e, s, n) => e + (t => {
      if (!0 === t._$cssResult$) return t.cssText;
      if ("number" == typeof t) return t;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[n + 1], t[0]);
    return new o(n, t, s);
  },
  S = (s, n) => {
    e ? s.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(e => {
      const n = document.createElement("style"),
        o = t.litNonce;
      void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
    });
  },
  c = e ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r(e);
  })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$1;
const e$1 = window,
  r$1 = e$1.trustedTypes,
  h = r$1 ? r$1.emptyScript : "",
  o$1 = e$1.reactiveElementPolyfillSupport,
  n$1 = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? h : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    }
  },
  a = (t, i) => i !== t && (i == i || t == t),
  l = {
    attribute: !0,
    type: String,
    converter: n$1,
    reflect: !1,
    hasChanged: a
  };
class d extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var i;
    null !== (i = this.h) && void 0 !== i || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Ep(s, i);
      void 0 !== e && (this._$Ev.set(e, s), t.push(e));
    }), t;
  }
  static createProperty(t, i = l) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift(c(i));
    } else void 0 !== i && s.push(c(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(t => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = l) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n$1).toAttribute(i, s.type);
      this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : n$1;
      this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => this[i] = t), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$Ek();
    } catch (t) {
      throw i = !1, this._$Ek(), t;
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
d.finalized = !0, d.elementProperties = new Map(), d.elementStyles = [], d.shadowRootOptions = {
  mode: "open"
}, null == o$1 || o$1({
  ReactiveElement: d
}), (null !== (s$1 = e$1.reactiveElementVersions) && void 0 !== s$1 ? s$1 : e$1.reactiveElementVersions = []).push("1.4.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = window,
  s$2 = i$1.trustedTypes,
  e$2 = s$2 ? s$2.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  o$2 = `lit$${(Math.random() + "").slice(9)}$`,
  n$2 = "?" + o$2,
  l$1 = `<${n$2}>`,
  h$1 = document,
  r$2 = (t = "") => h$1.createComment(t),
  d$1 = t => null === t || "object" != typeof t && "function" != typeof t,
  u = Array.isArray,
  c$1 = t => u(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
  v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  a$1 = /-->/g,
  f = />/g,
  _ = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
  m = /'/g,
  p = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  g = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
  y = g(1),
  x = Symbol.for("lit-noChange"),
  b = Symbol.for("lit-nothing"),
  T = new WeakMap(),
  A = h$1.createTreeWalker(h$1, 129, null, !1),
  E = (t, i) => {
    const s = t.length - 1,
      n = [];
    let h,
      r = 2 === i ? "<svg>" : "",
      d = v;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let e,
        u,
        c = -1,
        g = 0;
      for (; g < s.length && (d.lastIndex = g, u = d.exec(s), null !== u);) g = d.lastIndex, d === v ? "!--" === u[1] ? d = a$1 : void 0 !== u[1] ? d = f : void 0 !== u[2] ? ($.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _) : void 0 !== u[3] && (d = _) : d === _ ? ">" === u[0] ? (d = null != h ? h : v, c = -1) : void 0 === u[1] ? c = -2 : (c = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _ : '"' === u[3] ? p : m) : d === p || d === m ? d = _ : d === a$1 || d === f ? d = v : (d = _, h = void 0);
      const y = d === _ && t[i + 1].startsWith("/>") ? " " : "";
      r += d === v ? s + l$1 : c >= 0 ? (n.push(e), s.slice(0, c) + "$lit$" + s.slice(c) + o$2 + y) : s + o$2 + (-2 === c ? (n.push(void 0), i) : y);
    }
    const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [void 0 !== e$2 ? e$2.createHTML(u) : u, n];
  };
class C {
  constructor({
    strings: t,
    _$litType$: i
  }, e) {
    let l;
    this.parts = [];
    let h = 0,
      d = 0;
    const u = t.length - 1,
      c = this.parts,
      [v, a] = E(t, i);
    if (this.el = C.createElement(v, e), A.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];
          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(o$2)) {
            const s = a[d++];
            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o$2),
                i = /([.?@])?(.*)/.exec(s);
              c.push({
                type: 1,
                index: h,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? M : "?" === i[1] ? k : "@" === i[1] ? H : S$1
              });
            } else c.push({
              type: 6,
              index: h
            });
          }
          for (const i of t) l.removeAttribute(i);
        }
        if ($.test(l.tagName)) {
          const t = l.textContent.split(o$2),
            i = t.length - 1;
          if (i > 0) {
            l.textContent = s$2 ? s$2.emptyScript : "";
            for (let s = 0; s < i; s++) l.append(t[s], r$2()), A.nextNode(), c.push({
              type: 2,
              index: ++h
            });
            l.append(t[i], r$2());
          }
        }
      } else if (8 === l.nodeType) if (l.data === n$2) c.push({
        type: 2,
        index: h
      });else {
        let t = -1;
        for (; -1 !== (t = l.data.indexOf(o$2, t + 1));) c.push({
          type: 7,
          index: h
        }), t += o$2.length - 1;
      }
      h++;
    }
  }
  static createElement(t, i) {
    const s = h$1.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(t, i, s = t, e) {
  var o, n, l, h;
  if (i === x) return i;
  let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
  const u = d$1(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = P(t, r._$AS(t, i.values), r, e)), i;
}
class V {
  constructor(t, i) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var i;
    const {
        el: {
          content: s
        },
        parts: e
      } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h$1).importNode(s, !0);
    A.currentNode = o;
    let n = A.nextNode(),
      l = 0,
      r = 0,
      d = e[0];
    for (; void 0 !== d;) {
      if (l === d.index) {
        let i;
        2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I(n, this, t)), this.u.push(i), d = e[++r];
      }
      l !== (null == d ? void 0 : d.index) && (n = A.nextNode(), l++);
    }
    return o;
  }
  p(t) {
    let i = 0;
    for (const s of this.u) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }
  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = P(this, t, i), d$1(t) ? t === b || null == t || "" === t ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== x && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : c$1(t) ? this.k(t) : this.g(t);
  }
  O(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== b && d$1(this._$AH) ? this._$AA.nextSibling.data = t : this.T(h$1.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const {
        values: s,
        _$litType$: e
      } = t,
      o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s);else {
      const t = new V(o, this),
        i = t.v(this.options);
      t.p(s), this.T(i), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = T.get(t.strings);
    return void 0 === i && T.set(t.strings, i = new C(t)), i;
  }
  k(t) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t) e === i.length ? i.push(s = new N(this.O(r$2()), this.O(r$2()), this, this.options)) : s = i[e], s._$AI(o), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cm = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class S$1 {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = P(this, t, i, 0), n = !d$1(t) || t !== this._$AH && t !== x, n && (this._$AH = t);else {
      const e = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === x && (h = this._$AH[l]), n || (n = !d$1(h) || h !== this._$AH[l]), h === b ? t = b : t !== b && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }
}
class M extends S$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const R = s$2 ? s$2.emptyScript : "";
class k extends S$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
}
class H extends S$1 {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : b) === x) return;
    const e = this._$AH,
      o = t === b && e !== b || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
      n = t !== b && (e === b || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class I {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const z = i$1.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t$1 = i$1.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$1.litHtmlVersions = []).push("2.4.0");
const Z = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;
  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new N(i.insertBefore(r$2(), t), t, void 0, null != s ? s : {});
  }
  return l._$AI(t), l;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$2, o$3;
class s$3 extends d {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Z(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return x;
  }
}
s$3.finalized = !0, s$3._$litElement$ = !0, null === (l$2 = globalThis.litElementHydrateSupport) || void 0 === l$2 || l$2.call(globalThis, {
  LitElement: s$3
});
const n$3 = globalThis.litElementPolyfillSupport;
null == n$3 || n$3({
  LitElement: s$3
});
(null !== (o$3 = globalThis.litElementVersions) && void 0 !== o$3 ? o$3 : globalThis.litElementVersions = []).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3 = e => n => "function" == typeof n ? ((e, n) => (customElements.define(e, n), n))(e, n) : ((e, n) => {
  const {
    kind: t,
    elements: s
  } = n;
  return {
    kind: t,
    elements: s,
    finisher(n) {
      customElements.define(e, n);
    }
  };
})(e, n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
  ...e,
  finisher(n) {
    n.createProperty(e.key, i);
  }
} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,
  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },
  finisher(n) {
    n.createProperty(e.key, i);
  }
};
function e$4(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i$2(e, n);
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$4;
const e$5 = null != (null === (n$4 = window.HTMLSlotElement) || void 0 === n$4 ? void 0 : n$4.prototype.assignedElements) ? (o, n) => o.assignedElements(n) : (o, n) => o.assignedNodes(n).filter(o => o.nodeType === Node.ELEMENT_NODE);

(function () {

  function g(a) {
    var b = 0;
    return function () {
      return b < a.length ? {
        done: !1,
        value: a[b++]
      } : {
        done: !0
      };
    };
  }
  if (!ShadowRoot.prototype.createElement) {
    var h = window.HTMLElement,
      l = window.customElements.define,
      m = window.customElements.get,
      n = window.customElements,
      p = new WeakMap(),
      q = new WeakMap(),
      r = new WeakMap(),
      t = new WeakMap();
    window.CustomElementRegistry = function () {
      this.l = new Map();
      this.o = new Map();
      this.i = new Map();
      this.h = new Map();
    };
    window.CustomElementRegistry.prototype.define = function (a, b) {
      a = a.toLowerCase();
      if (void 0 !== this.j(a)) throw new DOMException("Failed to execute 'define' on 'CustomElementRegistry': the name \"" + a + '" has already been used with this registry');
      if (void 0 !== this.o.get(b)) throw new DOMException("Failed to execute 'define' on 'CustomElementRegistry': this constructor has already been used with this registry");
      var c = b.prototype.attributeChangedCallback,
        d = new Set(b.observedAttributes || []);
      u(b, d, c);
      c = {
        g: b,
        connectedCallback: b.prototype.connectedCallback,
        disconnectedCallback: b.prototype.disconnectedCallback,
        adoptedCallback: b.prototype.adoptedCallback,
        attributeChangedCallback: c,
        observedAttributes: d
      };
      this.l.set(a, c);
      this.o.set(b, c);
      d = m.call(n, a);
      d || (d = v(a), l.call(n, a, d));
      this === window.customElements && (r.set(b, c), c.s = d);
      if (d = this.h.get(a)) {
        this.h.delete(a);
        var e = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator];
        d = e ? e.call(d) : {
          next: g(d)
        };
        for (e = d.next(); !e.done; e = d.next()) e = e.value, q.delete(e), w(e, c, !0);
      }
      c = this.i.get(a);
      void 0 !== c && (c.resolve(b), this.i.delete(a));
      return b;
    };
    window.CustomElementRegistry.prototype.upgrade = function () {
      x.push(this);
      n.upgrade.apply(n, arguments);
      x.pop();
    };
    window.CustomElementRegistry.prototype.get = function (a) {
      var b;
      return null == (b = this.l.get(a)) ? void 0 : b.g;
    };
    window.CustomElementRegistry.prototype.j = function (a) {
      return this.l.get(a);
    };
    window.CustomElementRegistry.prototype.whenDefined = function (a) {
      var b = this.j(a);
      if (void 0 !== b) return Promise.resolve(b.g);
      var c = this.i.get(a);
      void 0 === c && (c = {}, c.promise = new Promise(function (d) {
        return c.resolve = d;
      }), this.i.set(a, c));
      return c.promise;
    };
    window.CustomElementRegistry.prototype.m = function (a, b, c) {
      var d = this.h.get(b);
      d || this.h.set(b, d = new Set());
      c ? d.add(a) : d.delete(a);
    };
    var y;
    window.HTMLElement = function () {
      var a = y;
      if (a) return y = void 0, a;
      var b = r.get(this.constructor);
      if (!b) throw new TypeError("Illegal constructor (custom element class must be registered with global customElements registry to be newable)");
      a = Reflect.construct(h, [], b.s);
      Object.setPrototypeOf(a, this.constructor.prototype);
      p.set(a, b);
      return a;
    };
    window.HTMLElement.prototype = h.prototype;
    var v = function (a) {
        function b() {
          var c = Reflect.construct(h, [], this.constructor);
          Object.setPrototypeOf(c, HTMLElement.prototype);
          a: {
            var d = c.getRootNode();
            if (!(d === document || d instanceof ShadowRoot)) {
              d = x[x.length - 1];
              if (d instanceof CustomElementRegistry) {
                var e = d;
                break a;
              }
              d = d.getRootNode();
              d === document || d instanceof ShadowRoot || (d = (null == (e = t.get(d)) ? void 0 : e.getRootNode()) || document);
            }
            e = d.customElements;
          }
          e = e || window.customElements;
          (d = e.j(a)) ? w(c, d) : q.set(c, e);
          return c;
        }
        b.prototype.connectedCallback = function () {
          var c = p.get(this);
          c ? c.connectedCallback && c.connectedCallback.apply(this, arguments) : q.get(this).m(this, a, !0);
        };
        b.prototype.disconnectedCallback = function () {
          var c = p.get(this);
          c ? c.disconnectedCallback && c.disconnectedCallback.apply(this, arguments) : q.get(this).m(this, a, !1);
        };
        b.prototype.adoptedCallback = function () {
          var c, d;
          null == (c = p.get(this)) || null == (d = c.adoptedCallback) || d.apply(this, arguments);
        };
        return b;
      },
      u = function (a, b, c) {
        if (0 !== b.size && void 0 !== c) {
          var d = a.prototype.setAttribute;
          d && (a.prototype.setAttribute = function (f, k) {
            if (b.has(f)) {
              var C = this.getAttribute(f);
              d.call(this, f, k);
              c.call(this, f, C, k);
            } else d.call(this, f, k);
          });
          var e = a.prototype.removeAttribute;
          e && (a.prototype.removeAttribute = function (f) {
            if (b.has(f)) {
              var k = this.getAttribute(f);
              e.call(this, f);
              c.call(this, f, k, null);
            } else e.call(this, f);
          });
        }
      },
      z = function (a) {
        var b = Object.getPrototypeOf(a);
        if (b !== window.HTMLElement) return b === h ? Object.setPrototypeOf(a, window.HTMLElement) : z(b);
      },
      w = function (a, b, c) {
        c = void 0 === c ? !1 : c;
        Object.setPrototypeOf(a, b.g.prototype);
        p.set(a, b);
        y = a;
        try {
          new b.g();
        } catch (d) {
          z(b.g), new b.g();
        }
        b.observedAttributes.forEach(function (d) {
          a.hasAttribute(d) && b.attributeChangedCallback.call(a, d, null, a.getAttribute(d));
        });
        c && b.connectedCallback && a.isConnected && b.connectedCallback.call(a);
      },
      A = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (a) {
      var b = A.apply(this, arguments);
      a.customElements && (b.customElements = a.customElements);
      return b;
    };
    var x = [document],
      B = function (a, b, c) {
        var d = (c ? Object.getPrototypeOf(c) : a.prototype)[b];
        a.prototype[b] = function () {
          x.push(this);
          var e = d.apply(c || this, arguments);
          void 0 !== e && t.set(e, this);
          x.pop();
          return e;
        };
      };
    B(ShadowRoot, "createElement", document);
    B(ShadowRoot, "importNode", document);
    B(Element, "insertAdjacentHTML");
    var D = function (a) {
      var b = Object.getOwnPropertyDescriptor(a.prototype, "innerHTML");
      Object.defineProperty(a.prototype, "innerHTML", Object.assign({}, b, {
        set: function (c) {
          x.push(this);
          b.set.call(this, c);
          x.pop();
        }
      }));
    };
    D(Element);
    D(ShadowRoot);
    Object.defineProperty(window, "customElements", {
      value: new CustomElementRegistry(),
      configurable: !0,
      writable: !0
    });
  }
}).call(self);

const appliedClassMixins = new WeakMap();

/** Vefify if the Mixin was previously applyed
 * @private
 * @param {function} mixin      Mixin being applyed
 * @param {object} superClass   Class receiving the new mixin
 * @returns {boolean}
 */
function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;
  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }
    klass = Object.getPrototypeOf(klass);
  }
  return false;
}

/** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
 * @export
 * @param {function} mixin      Mixin to be applyed
 * @returns {object}            Mixed class with mixin applied
 */
function dedupeMixin(mixin) {
  return superClass => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}

/**
 * @typedef {import('./types').RenderOptions} RenderOptions
 * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
 * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
 * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
 * @typedef {import('@lit/reactive-element').CSSResultFlatArray} CSSResultFlatArray
 */

/**
 * @template {import('./types').Constructor<HTMLElement>} T
 * @param {T} superclass
 * @return {T & import('./types').Constructor<ScopedElementsHost>}
 */
const ScopedElementsMixinImplementation = superclass => /** @type {ScopedElementsHost} */
class ScopedElementsHost extends superclass {
  /**
   * Obtains the scoped elements definitions map if specified.
   *
   * @returns {ScopedElementsMap}
   */
  static get scopedElements() {
    return {};
  }

  /**
   * Obtains the ShadowRoot options.
   *
   * @type {ShadowRootInit}
   */
  static get shadowRootOptions() {
    return this.__shadowRootOptions;
  }

  /**
   * Set the shadowRoot options.
   *
   * @param {ShadowRootInit} value
   */
  static set shadowRootOptions(value) {
    this.__shadowRootOptions = value;
  }

  /**
   * Obtains the element styles.
   *
   * @returns {CSSResultFlatArray}
   */
  static get elementStyles() {
    return this.__elementStyles;
  }
  static set elementStyles(styles) {
    this.__elementStyles = styles;
  }

  // either TS or ESLint will complain here
  // eslint-disable-next-line no-unused-vars
  constructor(..._args) {
    super();
    /** @type {RenderOptions} */
    this.renderOptions = this.renderOptions || undefined;
  }

  /**
   * Obtains the CustomElementRegistry associated to the ShadowRoot.
   *
   * @returns {CustomElementRegistry}
   */
  get registry() {
    // @ts-ignore
    return this.constructor.__registry;
  }

  /**
   * Set the CustomElementRegistry associated to the ShadowRoot
   *
   * @param {CustomElementRegistry} registry
   */
  set registry(registry) {
    // @ts-ignore
    this.constructor.__registry = registry;
  }

  /** @override */
  createRenderRoot() {
    const {
      scopedElements,
      shadowRootOptions,
      elementStyles
    } = /** @type {typeof ScopedElementsHost} */this.constructor;
    if (!this.registry) {
      this.registry = new CustomElementRegistry();
      Object.entries(scopedElements).forEach(([tagName, klass]) => this.registry.define(tagName, klass));
    }

    /** @type {ShadowRootInit} */
    const options = {
      mode: 'open',
      ...shadowRootOptions,
      customElements: this.registry
    };
    this.renderOptions.creationScope = this.attachShadow(options);
    if (this.renderOptions.creationScope instanceof ShadowRoot) S(this.renderOptions.creationScope, elementStyles);
    return this.renderOptions.creationScope;
  }

  /**
   * Defines a scoped element.
   *
   * @param {string} tagName
   * @param {typeof HTMLElement} klass
   */
  defineScopedElement(tagName, klass) {
    return this.registry.get(tagName) || this.registry.define(tagName, klass);
  }

  /**
   * @deprecated use the native el.tagName instead
   *
   * @param {string} tagName
   * @returns {string} the tag name
   */
  // eslint-disable-next-line class-methods-use-this
  getScopedTagName(tagName) {
    return tagName;
  }

  /**
   * @deprecated use the native el.tagName instead
   *
   * @param {string} tagName
   * @returns {string} the tag name
   */
  // eslint-disable-next-line class-methods-use-this
  static getScopedTagName(tagName) {
    return tagName;
  }
};
const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

var RequestMethod;
(function (RequestMethod) {
  RequestMethod["POST"] = "post";
  RequestMethod["GET"] = "get";
  RequestMethod["PUT"] = "put";
  RequestMethod["DELETE"] = "delete";
})(RequestMethod || (RequestMethod = {}));
class APICall {
  /**
   *
   * @param apiUrl api url
   * @param authToken x-auth-token token
   */
  constructor(apiUrl, authToken) {
    this.apiUrl = '';
    this.authToken = '';
    this.apiUrl = apiUrl;
    this.authToken = authToken || '';
  }
  /**
   *
   * @param request APIRequest
   */
  send(request) {
    return new Promise((resolve, reject) => {
      const {
        requestMethod,
        endpoint,
        data,
        searchParams
      } = request;
      const options = {
        method: requestMethod,
        headers: {}
      };
      if (this.authToken) {
        options.headers['x-auth-token'] = this.authToken;
      }
      if (data) {
        options.headers['Content-Type'] = 'application/json';
        try {
          options.body = JSON.stringify(data);
        } catch (error) {
          reject(error);
        }
      }
      const url = new URL(`${this.apiUrl}/${endpoint}`);
      if (searchParams) {
        url.search = searchParams.toString();
      }
      fetch(url.toString(), options).then(res => {
        if (res.status !== 200) {
          reject(res);
        }
        return res.json();
      }).then(resData => {
        resolve(resData);
      }).catch(reject);
    });
  }
}

class Campaign {
  constructor(data = {}, api) {
    this.data = {};
    this.images = [];
    this.data = data;
    this.id = data.id;
    this.api = api;
  }
  save(data) {
    return new Promise((resolve, reject) => {
      const request = {
        requestMethod: this.id ? RequestMethod.PUT : RequestMethod.POST,
        endpoint: this.id ? `campaign/${this.id}` : 'campaign',
        data
      };
      this.api.send(request).then(res => {
        this.data = res;
        resolve(res);
      }).catch(reject);
    });
  }
}

class Subscription {
  constructor(data = {}, api) {
    this.data = {};
    this.data = data;
    this.id = data.id;
    this.api = api;
  }
  /**
   *
   * @param stripe the stripe object to create the subscription with
   * @param cardToken token ID of tokenized card
   * @returns
   */
  async payWithStripe(stripe, cardToken) {
    const subscriptionData = {
      token: cardToken,
      email: this.data.email,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      street1: this.data.street1,
      mail_code: this.data.mail_code,
      city_id: this.data.city_id,
      subscription_plan_id: this.data.subscription_plan_id,
      portal_name: this.data.portal_name.trim().replace(/ /g, '_'),
      terms: this.data.terms,
      use_sca: 1,
      source: this.data.source,
      create_sample_data: this.data.create_sample_data,
      secure_site: 0,
      custom_domain: 'custom'
    };
    /*
    if (this.data.plan.addon) {
      subscriptionData.addon_domain = 1;
    } */
    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'subscription',
      data: subscriptionData
    };
    return new Promise((resolve, reject) => {
      this.api.send(request).then(success => {
        if (success.sca_status === 'requies_action' || success.sca_status === 'requires_source_action') {
          stripe.confirmCardPayment(success.client_secret).then(pi => {
            if (pi.error) {
              reject(pi.error);
            } else {
              resolve(success);
            }
          }).catch(error => {
            reject(error);
          });
        } else {
          console.log('no auth, resolving');
          resolve(success);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }
}

/**
 * constants
 */
const AUTH_TOKEN = 'skhemataToken';
var CampaignFileRegion;
(function (CampaignFileRegion) {
  CampaignFileRegion[CampaignFileRegion["header"] = 1] = "header";
  CampaignFileRegion[CampaignFileRegion["body"] = 2] = "body";
  CampaignFileRegion[CampaignFileRegion["thumbnail"] = 3] = "thumbnail";
  CampaignFileRegion[CampaignFileRegion["top_header"] = 5] = "top_header";
  CampaignFileRegion[CampaignFileRegion["thumbnail_video"] = 6] = "thumbnail_video";
})(CampaignFileRegion || (CampaignFileRegion = {}));
class Skhemata {
  /**
   *
   * @param apiUrl string
   * @param authToken string
   */
  constructor(apiUrl, authToken) {
    this.api = new APICall(apiUrl, authToken);
    window.addEventListener('skhemata-login', e => {
      this.api.authToken = e.detail.authToken;
    });
  }
  /**
   * initialize skhemata api object
   * @returns boolean of auth status
   */
  init() {
    const authToken = window.localStorage.getItem(AUTH_TOKEN) || undefined;
    return new Promise(resolve => {
      if (!authToken) {
        resolve(false);
        return;
      }
      this.authenticate({
        authToken
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  /**
   * authenticate
   * @param auth auth info
   * @returns Promise with api response
   */
  authenticate(auth) {
    const {
      authToken,
      email,
      password
    } = auth;
    let data;
    if (email && password) {
      data = {
        email,
        password
      };
    }
    if (authToken) {
      this.api.authToken = authToken;
    }
    const request = {
      requestMethod: data ? RequestMethod.POST : RequestMethod.GET,
      endpoint: 'authenticate',
      data
    };
    return this.api.send(request).then(res => {
      this.handleAuthResponse(res);
    });
  }
  authenticateOkta(idToken) {
    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'authenticate/okta/social',
      data: {
        id_token: idToken
      }
    };
    return this.api.send(request).then(res => {
      this.handleAuthResponse(res);
    });
  }
  handleAuthResponse(res) {
    if (res === null || res === void 0 ? void 0 : res.auth_token) {
      this.api.authToken = res.auth_token;
      window.localStorage.setItem(AUTH_TOKEN, this.api.authToken);
      window.dispatchEvent(new CustomEvent('skhemata-login', {
        detail: {
          authToken: this.api.authToken
        }
      }));
    }
    return res;
  }
  register(data) {
    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'register',
      data
    };
    return this.api.send(request);
  }
  logout() {
    this.api.authToken = '';
    localStorage.removeItem(AUTH_TOKEN);
    window.dispatchEvent(new CustomEvent('skhemata-logout'));
  }
  /** *************
  * Campaign *
  ************** */
  /**
   *
   * @param id ID of the campaign
   * @returns Promise<Campaign>
   */
  getCampaign(id) {
    const campaignRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}`
    };
    const imageRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}/resource/file`
    };
    let newCampaign;
    return this.api.send(campaignRequest).then(campaign => {
      newCampaign = new Campaign(campaign, this.api);
    }).then(() => this.api.send(imageRequest)).then(images => {
      newCampaign.images = images.filter(image => image.region_id === CampaignFileRegion.thumbnail);
      return newCampaign;
    });
  }
  /**
   *
   * @param data campaign data
   * @returns Promise<Campaign>
   */
  createCampaign(data) {
    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'campaign',
      data
    };
    return this.api.send(request).then(campaign => new Campaign(campaign, this.api));
  }
  /**
   *  getCampaigns
   * @param params CampaignSearch object
   * @returns Promise with Array of Campaign objects or Error
   */
  getCampaigns(params) {
    const {
      sort,
      filter,
      page
    } = params;
    const searchParams = new URLSearchParams();
    if (sort) {
      searchParams.set('sort', JSON.stringify(sort));
    }
    if (sort) {
      searchParams.set('filter', JSON.stringify(filter));
    }
    if (page) {
      if (typeof page.page !== undefined) {
        searchParams.set('page', `${page.page}`);
      }
      if (typeof page.page_entries !== undefined) {
        searchParams.set('page_entries', `${page.page_entries}`);
      }
    }
    const request = {
      requestMethod: RequestMethod.GET,
      endpoint: 'campaign',
      searchParams
    };
    return this.api.send(request).then(res => res.map(campaign => new Campaign(campaign, this.api))).catch(() => new Error('Error'));
  }
  /** *************
  * SUBSCRIPTION *
  ************** */
  /**
   *
   * @param data data to create the subscription
   * @returns Subscription object
   */
  createSubscription(data) {
    return new Subscription(data, this.api);
  }
}

/**
 *
 * This element is needed for bulma styling
 * Refer to documentation: https://bulma.io/documentation
 *
 **/
const Bulma = i`
/*! bulma.io v0.9.2 | MIT License | github.com/jgthms/bulma */
/* Bulma Utilities */
.button, .input, .textarea, .select select, .file-cta,
.file-name, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}

.button:focus, .input:focus, .textarea:focus, .select select:focus, .file-cta:focus,
.file-name:focus, .pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus,
.pagination-ellipsis:focus, .is-focused.button, .is-focused.input, .is-focused.textarea, .select select.is-focused, .is-focused.file-cta,
.is-focused.file-name, .is-focused.pagination-previous,
.is-focused.pagination-next,
.is-focused.pagination-link,
.is-focused.pagination-ellipsis, .button:active, .input:active, .textarea:active, .select select:active, .file-cta:active,
.file-name:active, .pagination-previous:active,
.pagination-next:active,
.pagination-link:active,
.pagination-ellipsis:active, .is-active.button, .is-active.input, .is-active.textarea, .select select.is-active, .is-active.file-cta,
.is-active.file-name, .is-active.pagination-previous,
.is-active.pagination-next,
.is-active.pagination-link,
.is-active.pagination-ellipsis {
  outline: none;
}

.button[disabled], .input[disabled], .textarea[disabled], .select select[disabled], .file-cta[disabled],
.file-name[disabled], .pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled],
.pagination-ellipsis[disabled],
fieldset[disabled] .button,
fieldset[disabled] .input,
fieldset[disabled] .textarea,
fieldset[disabled] .select select,
.select fieldset[disabled] select,
fieldset[disabled] .file-cta,
fieldset[disabled] .file-name,
fieldset[disabled] .pagination-previous,
fieldset[disabled] .pagination-next,
fieldset[disabled] .pagination-link,
fieldset[disabled] .pagination-ellipsis {
  cursor: not-allowed;
}

.button, .file, .breadcrumb, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis, .tabs, .is-unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.select:not(.is-multiple):not(.is-loading)::after, .navbar-link:not(.is-arrowless)::after {
  border: 3px solid transparent;
  border-radius: 2px;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.625em;
  margin-top: -0.4375em;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  transform-origin: center;
  width: 0.625em;
}

.box:not(:last-child), .content:not(:last-child), .notification:not(:last-child), .progress:not(:last-child), .table:not(:last-child), .table-container:not(:last-child), .title:not(:last-child),
.subtitle:not(:last-child), .block:not(:last-child), .highlight:not(:last-child), .breadcrumb:not(:last-child), .level:not(:last-child), .message:not(:last-child), .pagination:not(:last-child), .tabs:not(:last-child) {
  margin-bottom: 1.5rem;
}

.delete, .modal-close {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba(10, 10, 10, 0.2);
  border: none;
  border-radius: 290486px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 20px;
}

.delete::before, .modal-close::before, .delete::after, .modal-close::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.delete::before, .modal-close::before {
  height: 2px;
  width: 50%;
}

.delete::after, .modal-close::after {
  height: 50%;
  width: 2px;
}

.delete:hover, .modal-close:hover, .delete:focus, .modal-close:focus {
  background-color: rgba(10, 10, 10, 0.3);
}

.delete:active, .modal-close:active {
  background-color: rgba(10, 10, 10, 0.4);
}

.is-small.delete, .is-small.modal-close {
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}

.is-medium.delete, .is-medium.modal-close {
  height: 24px;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  width: 24px;
}

.is-large.delete, .is-large.modal-close {
  height: 32px;
  max-height: 32px;
  max-width: 32px;
  min-height: 32px;
  min-width: 32px;
  width: 32px;
}

.button.is-loading::after, .loader, .select.is-loading::after, .control.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
          animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio, .modal, .modal-background, .is-overlay, .hero-video {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

/* Bulma Base */
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

td:not([align]),
th:not([align]) {
  text-align: inherit;
}

html {
  background-color: white;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

body,
button,
input,
optgroup,
select,
textarea {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

code,
pre {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: monospace;
}

body {
  color: #4a4a4a;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
}

a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}

a strong {
  color: currentColor;
}

a:hover {
  color: #363636;
}

code {
  background-color: whitesmoke;
  color: #da1039;
  font-size: 0.875em;
  font-weight: normal;
  padding: 0.25em 0.5em 0.25em;
}

hr {
  background-color: whitesmoke;
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
}

img {
  height: auto;
  max-width: 100%;
}

input[type="checkbox"],
input[type="radio"] {
  vertical-align: baseline;
}

small {
  font-size: 0.875em;
}

span {
  font-style: inherit;
  font-weight: inherit;
}

strong {
  color: #363636;
  font-weight: 700;
}

fieldset {
  border: none;
}

pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 0.875em;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  white-space: pre;
  word-wrap: normal;
}

pre code {
  background-color: transparent;
  color: currentColor;
  font-size: 1em;
  padding: 0;
}

table td,
table th {
  vertical-align: top;
}

table td:not([align]),
table th:not([align]) {
  text-align: inherit;
}

table th {
  color: #363636;
}

@-webkit-keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

/* Bulma Elements */
.box {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

a.box:hover, a.box:focus {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;
}

a.box:active {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;
}

.button {
  background-color: white;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
}

.button strong {
  color: inherit;
}

.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {
  height: 1.5em;
  width: 1.5em;
}

.button .icon:first-child:not(:last-child) {
  margin-left: calc(-0.5em - 1px);
  margin-right: 0.25em;
}

.button .icon:last-child:not(:first-child) {
  margin-left: 0.25em;
  margin-right: calc(-0.5em - 1px);
}

.button .icon:first-child:last-child {
  margin-left: calc(-0.5em - 1px);
  margin-right: calc(-0.5em - 1px);
}

.button:hover, .button.is-hovered {
  border-color: #b5b5b5;
  color: #363636;
}

.button:focus, .button.is-focused {
  border-color: #3273dc;
  color: #363636;
}

.button:focus:not(:active), .button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.button:active, .button.is-active {
  border-color: #4a4a4a;
  color: #363636;
}

.button.is-text {
  background-color: transparent;
  border-color: transparent;
  color: #4a4a4a;
  text-decoration: underline;
}

.button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {
  background-color: whitesmoke;
  color: #363636;
}

.button.is-text:active, .button.is-text.is-active {
  background-color: #e8e8e8;
  color: #363636;
}

.button.is-text[disabled],
fieldset[disabled] .button.is-text {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}

.button.is-ghost {
  background: none;
  border-color: transparent;
  color: #3273dc;
  text-decoration: none;
}

.button.is-ghost:hover, .button.is-ghost.is-hovered {
  color: #3273dc;
  text-decoration: underline;
}

.button.is-white {
  background-color: white;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:hover, .button.is-white.is-hovered {
  background-color: #f9f9f9;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:focus, .button.is-white.is-focused {
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.button.is-white:active, .button.is-white.is-active {
  background-color: #f2f2f2;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white[disabled],
fieldset[disabled] .button.is-white {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
}

.button.is-white.is-inverted {
  background-color: #0a0a0a;
  color: white;
}

.button.is-white.is-inverted:hover, .button.is-white.is-inverted.is-hovered {
  background-color: black;
}

.button.is-white.is-inverted[disabled],
fieldset[disabled] .button.is-white.is-inverted {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
  color: white;
}

.button.is-white.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}

.button.is-white.is-outlined:hover, .button.is-white.is-outlined.is-hovered, .button.is-white.is-outlined:focus, .button.is-white.is-outlined.is-focused {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.button.is-white.is-outlined.is-loading::after {
  border-color: transparent transparent white white !important;
}

.button.is-white.is-outlined.is-loading:hover::after, .button.is-white.is-outlined.is-loading.is-hovered::after, .button.is-white.is-outlined.is-loading:focus::after, .button.is-white.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-white.is-outlined[disabled],
fieldset[disabled] .button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}

.button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}

.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined.is-hovered, .button.is-white.is-inverted.is-outlined:focus, .button.is-white.is-inverted.is-outlined.is-focused {
  background-color: #0a0a0a;
  color: white;
}

.button.is-white.is-inverted.is-outlined.is-loading:hover::after, .button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-white.is-inverted.is-outlined.is-loading:focus::after, .button.is-white.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}

.button.is-white.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  color: white;
}

.button.is-black:hover, .button.is-black.is-hovered {
  background-color: #040404;
  border-color: transparent;
  color: white;
}

.button.is-black:focus, .button.is-black.is-focused {
  border-color: transparent;
  color: white;
}

.button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.button.is-black:active, .button.is-black.is-active {
  background-color: black;
  border-color: transparent;
  color: white;
}

.button.is-black[disabled],
fieldset[disabled] .button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
}

.button.is-black.is-inverted {
  background-color: white;
  color: #0a0a0a;
}

.button.is-black.is-inverted:hover, .button.is-black.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-black.is-inverted[disabled],
fieldset[disabled] .button.is-black.is-inverted {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black.is-loading::after {
  border-color: transparent transparent white white !important;
}

.button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}

.button.is-black.is-outlined:hover, .button.is-black.is-outlined.is-hovered, .button.is-black.is-outlined:focus, .button.is-black.is-outlined.is-focused {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.button.is-black.is-outlined.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-black.is-outlined.is-loading:hover::after, .button.is-black.is-outlined.is-loading.is-hovered::after, .button.is-black.is-outlined.is-loading:focus::after, .button.is-black.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}

.button.is-black.is-outlined[disabled],
fieldset[disabled] .button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}

.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined.is-hovered, .button.is-black.is-inverted.is-outlined:focus, .button.is-black.is-inverted.is-outlined.is-focused {
  background-color: white;
  color: #0a0a0a;
}

.button.is-black.is-inverted.is-outlined.is-loading:hover::after, .button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-black.is-inverted.is-outlined.is-loading:focus::after, .button.is-black.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-black.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}

.button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:hover, .button.is-light.is-hovered {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:focus, .button.is-light.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.button.is-light:active, .button.is-light.is-active {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light[disabled],
fieldset[disabled] .button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  box-shadow: none;
}

.button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.button.is-light.is-inverted:hover, .button.is-light.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-inverted[disabled],
fieldset[disabled] .button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: whitesmoke;
}

.button.is-light.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  color: whitesmoke;
}

.button.is-light.is-outlined:hover, .button.is-light.is-outlined.is-hovered, .button.is-light.is-outlined:focus, .button.is-light.is-outlined.is-focused {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-outlined.is-loading::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}

.button.is-light.is-outlined.is-loading:hover::after, .button.is-light.is-outlined.is-loading.is-hovered::after, .button.is-light.is-outlined.is-loading:focus::after, .button.is-light.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-light.is-outlined[disabled],
fieldset[disabled] .button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  box-shadow: none;
  color: whitesmoke;
}

.button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined.is-hovered, .button.is-light.is-inverted.is-outlined:focus, .button.is-light.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.button.is-light.is-inverted.is-outlined.is-loading:hover::after, .button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-light.is-inverted.is-outlined.is-loading:focus::after, .button.is-light.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}

.button.is-light.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-dark {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}

.button.is-dark:hover, .button.is-dark.is-hovered {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}

.button.is-dark:focus, .button.is-dark.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.button.is-dark:active, .button.is-dark.is-active {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}

.button.is-dark[disabled],
fieldset[disabled] .button.is-dark {
  background-color: #363636;
  border-color: transparent;
  box-shadow: none;
}

.button.is-dark.is-inverted {
  background-color: #fff;
  color: #363636;
}

.button.is-dark.is-inverted:hover, .button.is-dark.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-dark.is-inverted[disabled],
fieldset[disabled] .button.is-dark.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #363636;
}

.button.is-dark.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  color: #363636;
}

.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined.is-hovered, .button.is-dark.is-outlined:focus, .button.is-dark.is-outlined.is-focused {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}

.button.is-dark.is-outlined.is-loading::after {
  border-color: transparent transparent #363636 #363636 !important;
}

.button.is-dark.is-outlined.is-loading:hover::after, .button.is-dark.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-outlined.is-loading:focus::after, .button.is-dark.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-dark.is-outlined[disabled],
fieldset[disabled] .button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  box-shadow: none;
  color: #363636;
}

.button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined.is-hovered, .button.is-dark.is-inverted.is-outlined:focus, .button.is-dark.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #363636;
}

.button.is-dark.is-inverted.is-outlined.is-loading:hover::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-inverted.is-outlined.is-loading:focus::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #363636 #363636 !important;
}

.button.is-dark.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}

.button.is-primary:hover, .button.is-primary.is-hovered {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}

.button.is-primary:focus, .button.is-primary.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.button.is-primary:active, .button.is-primary.is-active {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}

.button.is-primary[disabled],
fieldset[disabled] .button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  box-shadow: none;
}

.button.is-primary.is-inverted {
  background-color: #fff;
  color: #00d1b2;
}

.button.is-primary.is-inverted:hover, .button.is-primary.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-primary.is-inverted[disabled],
fieldset[disabled] .button.is-primary.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #00d1b2;
}

.button.is-primary.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  color: #00d1b2;
}

.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined.is-hovered, .button.is-primary.is-outlined:focus, .button.is-primary.is-outlined.is-focused {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}

.button.is-primary.is-outlined.is-loading::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}

.button.is-primary.is-outlined.is-loading:hover::after, .button.is-primary.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-outlined.is-loading:focus::after, .button.is-primary.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-primary.is-outlined[disabled],
fieldset[disabled] .button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  box-shadow: none;
  color: #00d1b2;
}

.button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined.is-hovered, .button.is-primary.is-inverted.is-outlined:focus, .button.is-primary.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #00d1b2;
}

.button.is-primary.is-inverted.is-outlined.is-loading:hover::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-inverted.is-outlined.is-loading:focus::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}

.button.is-primary.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.button.is-primary.is-light:hover, .button.is-primary.is-light.is-hovered {
  background-color: #defffa;
  border-color: transparent;
  color: #00947e;
}

.button.is-primary.is-light:active, .button.is-primary.is-light.is-active {
  background-color: #d1fff8;
  border-color: transparent;
  color: #00947e;
}

.button.is-link {
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
}

.button.is-link:hover, .button.is-link.is-hovered {
  background-color: #276cda;
  border-color: transparent;
  color: #fff;
}

.button.is-link:focus, .button.is-link.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.button.is-link:active, .button.is-link.is-active {
  background-color: #2366d1;
  border-color: transparent;
  color: #fff;
}

.button.is-link[disabled],
fieldset[disabled] .button.is-link {
  background-color: #3273dc;
  border-color: transparent;
  box-shadow: none;
}

.button.is-link.is-inverted {
  background-color: #fff;
  color: #3273dc;
}

.button.is-link.is-inverted:hover, .button.is-link.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-link.is-inverted[disabled],
fieldset[disabled] .button.is-link.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3273dc;
}

.button.is-link.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-link.is-outlined {
  background-color: transparent;
  border-color: #3273dc;
  color: #3273dc;
}

.button.is-link.is-outlined:hover, .button.is-link.is-outlined.is-hovered, .button.is-link.is-outlined:focus, .button.is-link.is-outlined.is-focused {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.button.is-link.is-outlined.is-loading::after {
  border-color: transparent transparent #3273dc #3273dc !important;
}

.button.is-link.is-outlined.is-loading:hover::after, .button.is-link.is-outlined.is-loading.is-hovered::after, .button.is-link.is-outlined.is-loading:focus::after, .button.is-link.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-link.is-outlined[disabled],
fieldset[disabled] .button.is-link.is-outlined {
  background-color: transparent;
  border-color: #3273dc;
  box-shadow: none;
  color: #3273dc;
}

.button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined.is-hovered, .button.is-link.is-inverted.is-outlined:focus, .button.is-link.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3273dc;
}

.button.is-link.is-inverted.is-outlined.is-loading:hover::after, .button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-link.is-inverted.is-outlined.is-loading:focus::after, .button.is-link.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3273dc #3273dc !important;
}

.button.is-link.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.button.is-link.is-light:hover, .button.is-link.is-light.is-hovered {
  background-color: #e3ecfa;
  border-color: transparent;
  color: #2160c4;
}

.button.is-link.is-light:active, .button.is-link.is-light.is-active {
  background-color: #d8e4f8;
  border-color: transparent;
  color: #2160c4;
}

.button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}

.button.is-info:hover, .button.is-info.is-hovered {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}

.button.is-info:focus, .button.is-info.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.button.is-info:active, .button.is-info.is-active {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}

.button.is-info[disabled],
fieldset[disabled] .button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  box-shadow: none;
}

.button.is-info.is-inverted {
  background-color: #fff;
  color: #3298dc;
}

.button.is-info.is-inverted:hover, .button.is-info.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-info.is-inverted[disabled],
fieldset[disabled] .button.is-info.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3298dc;
}

.button.is-info.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  color: #3298dc;
}

.button.is-info.is-outlined:hover, .button.is-info.is-outlined.is-hovered, .button.is-info.is-outlined:focus, .button.is-info.is-outlined.is-focused {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}

.button.is-info.is-outlined.is-loading::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}

.button.is-info.is-outlined.is-loading:hover::after, .button.is-info.is-outlined.is-loading.is-hovered::after, .button.is-info.is-outlined.is-loading:focus::after, .button.is-info.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-info.is-outlined[disabled],
fieldset[disabled] .button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  box-shadow: none;
  color: #3298dc;
}

.button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined.is-hovered, .button.is-info.is-inverted.is-outlined:focus, .button.is-info.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3298dc;
}

.button.is-info.is-inverted.is-outlined.is-loading:hover::after, .button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-info.is-inverted.is-outlined.is-loading:focus::after, .button.is-info.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}

.button.is-info.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.button.is-info.is-light:hover, .button.is-info.is-light.is-hovered {
  background-color: #e3f1fa;
  border-color: transparent;
  color: #1d72aa;
}

.button.is-info.is-light:active, .button.is-info.is-light.is-active {
  background-color: #d8ebf8;
  border-color: transparent;
  color: #1d72aa;
}

.button.is-success {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}

.button.is-success:hover, .button.is-success.is-hovered {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}

.button.is-success:focus, .button.is-success.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.button.is-success:active, .button.is-success.is-active {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}

.button.is-success[disabled],
fieldset[disabled] .button.is-success {
  background-color: #48c774;
  border-color: transparent;
  box-shadow: none;
}

.button.is-success.is-inverted {
  background-color: #fff;
  color: #48c774;
}

.button.is-success.is-inverted:hover, .button.is-success.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-success.is-inverted[disabled],
fieldset[disabled] .button.is-success.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #48c774;
}

.button.is-success.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  color: #48c774;
}

.button.is-success.is-outlined:hover, .button.is-success.is-outlined.is-hovered, .button.is-success.is-outlined:focus, .button.is-success.is-outlined.is-focused {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}

.button.is-success.is-outlined.is-loading::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}

.button.is-success.is-outlined.is-loading:hover::after, .button.is-success.is-outlined.is-loading.is-hovered::after, .button.is-success.is-outlined.is-loading:focus::after, .button.is-success.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-success.is-outlined[disabled],
fieldset[disabled] .button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  box-shadow: none;
  color: #48c774;
}

.button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined.is-hovered, .button.is-success.is-inverted.is-outlined:focus, .button.is-success.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #48c774;
}

.button.is-success.is-inverted.is-outlined.is-loading:hover::after, .button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-success.is-inverted.is-outlined.is-loading:focus::after, .button.is-success.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}

.button.is-success.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.button.is-success.is-light:hover, .button.is-success.is-light.is-hovered {
  background-color: #e6f7ec;
  border-color: transparent;
  color: #257942;
}

.button.is-success.is-light:active, .button.is-success.is-light.is-active {
  background-color: #dcf4e4;
  border-color: transparent;
  color: #257942;
}

.button.is-warning {
  background-color: #ffdd57;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:hover, .button.is-warning.is-hovered {
  background-color: #ffdb4a;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:focus, .button.is-warning.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.button.is-warning:active, .button.is-warning.is-active {
  background-color: #ffd83d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning[disabled],
fieldset[disabled] .button.is-warning {
  background-color: #ffdd57;
  border-color: transparent;
  box-shadow: none;
}

.button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.button.is-warning.is-inverted:hover, .button.is-warning.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-inverted[disabled],
fieldset[disabled] .button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: #ffdd57;
}

.button.is-warning.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffdd57;
  color: #ffdd57;
}

.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined.is-hovered, .button.is-warning.is-outlined:focus, .button.is-warning.is-outlined.is-focused {
  background-color: #ffdd57;
  border-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-outlined.is-loading::after {
  border-color: transparent transparent #ffdd57 #ffdd57 !important;
}

.button.is-warning.is-outlined.is-loading:hover::after, .button.is-warning.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-outlined.is-loading:focus::after, .button.is-warning.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-warning.is-outlined[disabled],
fieldset[disabled] .button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffdd57;
  box-shadow: none;
  color: #ffdd57;
}

.button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined.is-hovered, .button.is-warning.is-inverted.is-outlined:focus, .button.is-warning.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.button.is-warning.is-inverted.is-outlined.is-loading:hover::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-inverted.is-outlined.is-loading:focus::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #ffdd57 #ffdd57 !important;
}

.button.is-warning.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.button.is-warning.is-light:hover, .button.is-warning.is-light.is-hovered {
  background-color: #fff8de;
  border-color: transparent;
  color: #947600;
}

.button.is-warning.is-light:active, .button.is-warning.is-light.is-active {
  background-color: #fff6d1;
  border-color: transparent;
  color: #947600;
}

.button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}

.button.is-danger:hover, .button.is-danger.is-hovered {
  background-color: #f03a5f;
  border-color: transparent;
  color: #fff;
}

.button.is-danger:focus, .button.is-danger.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.button.is-danger:active, .button.is-danger.is-active {
  background-color: #ef2e55;
  border-color: transparent;
  color: #fff;
}

.button.is-danger[disabled],
fieldset[disabled] .button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  box-shadow: none;
}

.button.is-danger.is-inverted {
  background-color: #fff;
  color: #f14668;
}

.button.is-danger.is-inverted:hover, .button.is-danger.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-danger.is-inverted[disabled],
fieldset[disabled] .button.is-danger.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #f14668;
}

.button.is-danger.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  color: #f14668;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered, .button.is-danger.is-outlined:focus, .button.is-danger.is-outlined.is-focused {
  background-color: #f14668;
  border-color: #f14668;
  color: #fff;
}

.button.is-danger.is-outlined.is-loading::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}

.button.is-danger.is-outlined.is-loading:hover::after, .button.is-danger.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-outlined.is-loading:focus::after, .button.is-danger.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-danger.is-outlined[disabled],
fieldset[disabled] .button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  box-shadow: none;
  color: #f14668;
}

.button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined.is-hovered, .button.is-danger.is-inverted.is-outlined:focus, .button.is-danger.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #f14668;
}

.button.is-danger.is-inverted.is-outlined.is-loading:hover::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-inverted.is-outlined.is-loading:focus::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}

.button.is-danger.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.button.is-danger.is-light:hover, .button.is-danger.is-light.is-hovered {
  background-color: #fde0e6;
  border-color: transparent;
  color: #cc0f35;
}

.button.is-danger.is-light:active, .button.is-danger.is-light.is-active {
  background-color: #fcd4dc;
  border-color: transparent;
  color: #cc0f35;
}

.button.is-small {
  font-size: 0.75rem;
}

.button.is-small:not(.is-rounded) {
  border-radius: 2px;
}

.button.is-normal {
  font-size: 1rem;
}

.button.is-medium {
  font-size: 1.25rem;
}

.button.is-large {
  font-size: 1.5rem;
}

.button[disabled],
fieldset[disabled] .button {
  background-color: white;
  border-color: #dbdbdb;
  box-shadow: none;
  opacity: 0.5;
}

.button.is-fullwidth {
  display: flex;
  width: 100%;
}

.button.is-loading {
  color: transparent !important;
  pointer-events: none;
}

.button.is-loading::after {
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
  position: absolute !important;
}

.button.is-static {
  background-color: whitesmoke;
  border-color: #dbdbdb;
  color: #7a7a7a;
  box-shadow: none;
  pointer-events: none;
}

.button.is-rounded {
  border-radius: 290486px;
  padding-left: calc(1em + 0.25em);
  padding-right: calc(1em + 0.25em);
}

.buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.buttons .button {
  margin-bottom: 0.5rem;
}

.buttons .button:not(:last-child):not(.is-fullwidth) {
  margin-right: 0.5rem;
}

.buttons:last-child {
  margin-bottom: -0.5rem;
}

.buttons:not(:last-child) {
  margin-bottom: 1rem;
}

.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large) {
  font-size: 0.75rem;
}

.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded) {
  border-radius: 2px;
}

.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large) {
  font-size: 1.25rem;
}

.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium) {
  font-size: 1.5rem;
}

.buttons.has-addons .button:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.buttons.has-addons .button:not(:last-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: -1px;
}

.buttons.has-addons .button:last-child {
  margin-right: 0;
}

.buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {
  z-index: 2;
}

.buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {
  z-index: 3;
}

.buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {
  z-index: 4;
}

.buttons.has-addons .button.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.buttons.is-centered {
  justify-content: center;
}

.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.buttons.is-right {
  justify-content: flex-end;
}

.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.container {
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
}

.container.is-fluid {
  max-width: none !important;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

@media screen and (max-width: 1215px) {
  .container.is-widescreen:not(.is-max-desktop) {
    max-width: 1152px;
  }
}

@media screen and (max-width: 1407px) {
  .container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

@media screen and (min-width: 1216px) {
  .container:not(.is-max-desktop) {
    max-width: 1152px;
  }
}

@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

.content li + li {
  margin-top: 0.25em;
}

.content p:not(:last-child),
.content dl:not(:last-child),
.content ol:not(:last-child),
.content ul:not(:last-child),
.content blockquote:not(:last-child),
.content pre:not(:last-child),
.content table:not(:last-child) {
  margin-bottom: 1em;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
}

.content h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.content h1:not(:first-child) {
  margin-top: 1em;
}

.content h2 {
  font-size: 1.75em;
  margin-bottom: 0.5714em;
}

.content h2:not(:first-child) {
  margin-top: 1.1428em;
}

.content h3 {
  font-size: 1.5em;
  margin-bottom: 0.6666em;
}

.content h3:not(:first-child) {
  margin-top: 1.3333em;
}

.content h4 {
  font-size: 1.25em;
  margin-bottom: 0.8em;
}

.content h5 {
  font-size: 1.125em;
  margin-bottom: 0.8888em;
}

.content h6 {
  font-size: 1em;
  margin-bottom: 1em;
}

.content blockquote {
  background-color: whitesmoke;
  border-left: 5px solid #dbdbdb;
  padding: 1.25em 1.5em;
}

.content ol {
  list-style-position: outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ol:not([type]) {
  list-style-type: decimal;
}

.content ol:not([type]).is-lower-alpha {
  list-style-type: lower-alpha;
}

.content ol:not([type]).is-lower-roman {
  list-style-type: lower-roman;
}

.content ol:not([type]).is-upper-alpha {
  list-style-type: upper-alpha;
}

.content ol:not([type]).is-upper-roman {
  list-style-type: upper-roman;
}

.content ul {
  list-style: disc outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ul ul {
  list-style-type: circle;
  margin-top: 0.5em;
}

.content ul ul ul {
  list-style-type: square;
}

.content dd {
  margin-left: 2em;
}

.content figure {
  margin-left: 2em;
  margin-right: 2em;
  text-align: center;
}

.content figure:not(:first-child) {
  margin-top: 2em;
}

.content figure:not(:last-child) {
  margin-bottom: 2em;
}

.content figure img {
  display: inline-block;
}

.content figure figcaption {
  font-style: italic;
}

.content pre {
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding: 1.25em 1.5em;
  white-space: pre;
  word-wrap: normal;
}

.content sup,
.content sub {
  font-size: 75%;
}

.content table {
  width: 100%;
}

.content table td,
.content table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}

.content table th {
  color: #363636;
}

.content table th:not([align]) {
  text-align: inherit;
}

.content table thead td,
.content table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

.content table tfoot td,
.content table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

.content table tbody tr:last-child td,
.content table tbody tr:last-child th {
  border-bottom-width: 0;
}

.content .tabs li + li {
  margin-top: 0;
}

.content.is-small {
  font-size: 0.75rem;
}

.content.is-medium {
  font-size: 1.25rem;
}

.content.is-large {
  font-size: 1.5rem;
}

.icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
}

.icon.is-small {
  height: 1rem;
  width: 1rem;
}

.icon.is-medium {
  height: 2rem;
  width: 2rem;
}

.icon.is-large {
  height: 3rem;
  width: 3rem;
}

.icon-text {
  align-items: flex-start;
  color: inherit;
  display: inline-flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
  vertical-align: top;
}

.icon-text .icon {
  flex-grow: 0;
  flex-shrink: 0;
}

.icon-text .icon:not(:last-child) {
  margin-right: 0.25em;
}

.icon-text .icon:not(:first-child) {
  margin-left: 0.25em;
}

div.icon-text {
  display: flex;
}

.image {
  display: block;
  position: relative;
}

.image img {
  display: block;
  height: auto;
  width: 100%;
}

.image img.is-rounded {
  border-radius: 290486px;
}

.image.is-fullwidth {
  width: 100%;
}

.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio {
  height: 100%;
  width: 100%;
}

.image.is-square, .image.is-1by1 {
  padding-top: 100%;
}

.image.is-5by4 {
  padding-top: 80%;
}

.image.is-4by3 {
  padding-top: 75%;
}

.image.is-3by2 {
  padding-top: 66.6666%;
}

.image.is-5by3 {
  padding-top: 60%;
}

.image.is-16by9 {
  padding-top: 56.25%;
}

.image.is-2by1 {
  padding-top: 50%;
}

.image.is-3by1 {
  padding-top: 33.3333%;
}

.image.is-4by5 {
  padding-top: 125%;
}

.image.is-3by4 {
  padding-top: 133.3333%;
}

.image.is-2by3 {
  padding-top: 150%;
}

.image.is-3by5 {
  padding-top: 166.6666%;
}

.image.is-9by16 {
  padding-top: 177.7777%;
}

.image.is-1by2 {
  padding-top: 200%;
}

.image.is-1by3 {
  padding-top: 300%;
}

.image.is-16x16 {
  height: 16px;
  width: 16px;
}

.image.is-24x24 {
  height: 24px;
  width: 24px;
}

.image.is-32x32 {
  height: 32px;
  width: 32px;
}

.image.is-48x48 {
  height: 48px;
  width: 48px;
}

.image.is-64x64 {
  height: 64px;
  width: 64px;
}

.image.is-96x96 {
  height: 96px;
  width: 96px;
}

.image.is-128x128 {
  height: 128px;
  width: 128px;
}

.notification {
  background-color: whitesmoke;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}

.notification a:not(.button):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.notification strong {
  color: currentColor;
}

.notification code,
.notification pre {
  background: white;
}

.notification pre code {
  background: transparent;
}

.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
}

.notification .title,
.notification .subtitle,
.notification .content {
  color: currentColor;
}

.notification.is-white {
  background-color: white;
  color: #0a0a0a;
}

.notification.is-black {
  background-color: #0a0a0a;
  color: white;
}

.notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-dark {
  background-color: #363636;
  color: #fff;
}

.notification.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.notification.is-link {
  background-color: #3273dc;
  color: #fff;
}

.notification.is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.notification.is-info {
  background-color: #3298dc;
  color: #fff;
}

.notification.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.notification.is-success {
  background-color: #48c774;
  color: #fff;
}

.notification.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.notification.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.notification.is-danger {
  background-color: #f14668;
  color: #fff;
}

.notification.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.progress {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  border-radius: 290486px;
  display: block;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.progress::-webkit-progress-bar {
  background-color: #ededed;
}

.progress::-webkit-progress-value {
  background-color: #4a4a4a;
}

.progress::-moz-progress-bar {
  background-color: #4a4a4a;
}

.progress::-ms-fill {
  background-color: #4a4a4a;
  border: none;
}

.progress.is-white::-webkit-progress-value {
  background-color: white;
}

.progress.is-white::-moz-progress-bar {
  background-color: white;
}

.progress.is-white::-ms-fill {
  background-color: white;
}

.progress.is-white:indeterminate {
  background-image: linear-gradient(to right, white 30%, #ededed 30%);
}

.progress.is-black::-webkit-progress-value {
  background-color: #0a0a0a;
}

.progress.is-black::-moz-progress-bar {
  background-color: #0a0a0a;
}

.progress.is-black::-ms-fill {
  background-color: #0a0a0a;
}

.progress.is-black:indeterminate {
  background-image: linear-gradient(to right, #0a0a0a 30%, #ededed 30%);
}

.progress.is-light::-webkit-progress-value {
  background-color: whitesmoke;
}

.progress.is-light::-moz-progress-bar {
  background-color: whitesmoke;
}

.progress.is-light::-ms-fill {
  background-color: whitesmoke;
}

.progress.is-light:indeterminate {
  background-image: linear-gradient(to right, whitesmoke 30%, #ededed 30%);
}

.progress.is-dark::-webkit-progress-value {
  background-color: #363636;
}

.progress.is-dark::-moz-progress-bar {
  background-color: #363636;
}

.progress.is-dark::-ms-fill {
  background-color: #363636;
}

.progress.is-dark:indeterminate {
  background-image: linear-gradient(to right, #363636 30%, #ededed 30%);
}

.progress.is-primary::-webkit-progress-value {
  background-color: #00d1b2;
}

.progress.is-primary::-moz-progress-bar {
  background-color: #00d1b2;
}

.progress.is-primary::-ms-fill {
  background-color: #00d1b2;
}

.progress.is-primary:indeterminate {
  background-image: linear-gradient(to right, #00d1b2 30%, #ededed 30%);
}

.progress.is-link::-webkit-progress-value {
  background-color: #3273dc;
}

.progress.is-link::-moz-progress-bar {
  background-color: #3273dc;
}

.progress.is-link::-ms-fill {
  background-color: #3273dc;
}

.progress.is-link:indeterminate {
  background-image: linear-gradient(to right, #3273dc 30%, #ededed 30%);
}

.progress.is-info::-webkit-progress-value {
  background-color: #3298dc;
}

.progress.is-info::-moz-progress-bar {
  background-color: #3298dc;
}

.progress.is-info::-ms-fill {
  background-color: #3298dc;
}

.progress.is-info:indeterminate {
  background-image: linear-gradient(to right, #3298dc 30%, #ededed 30%);
}

.progress.is-success::-webkit-progress-value {
  background-color: #48c774;
}

.progress.is-success::-moz-progress-bar {
  background-color: #48c774;
}

.progress.is-success::-ms-fill {
  background-color: #48c774;
}

.progress.is-success:indeterminate {
  background-image: linear-gradient(to right, #48c774 30%, #ededed 30%);
}

.progress.is-warning::-webkit-progress-value {
  background-color: #ffdd57;
}

.progress.is-warning::-moz-progress-bar {
  background-color: #ffdd57;
}

.progress.is-warning::-ms-fill {
  background-color: #ffdd57;
}

.progress.is-warning:indeterminate {
  background-image: linear-gradient(to right, #ffdd57 30%, #ededed 30%);
}

.progress.is-danger::-webkit-progress-value {
  background-color: #f14668;
}

.progress.is-danger::-moz-progress-bar {
  background-color: #f14668;
}

.progress.is-danger::-ms-fill {
  background-color: #f14668;
}

.progress.is-danger:indeterminate {
  background-image: linear-gradient(to right, #f14668 30%, #ededed 30%);
}

.progress:indeterminate {
  -webkit-animation-duration: 1.5s;
          animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: moveIndeterminate;
          animation-name: moveIndeterminate;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  background-color: #ededed;
  background-image: linear-gradient(to right, #4a4a4a 30%, #ededed 30%);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 150% 150%;
}

.progress:indeterminate::-webkit-progress-bar {
  background-color: transparent;
}

.progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}

.progress:indeterminate::-ms-fill {
  animation-name: none;
}

.progress.is-small {
  height: 0.75rem;
}

.progress.is-medium {
  height: 1.25rem;
}

.progress.is-large {
  height: 1.5rem;
}

@-webkit-keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.table {
  background-color: white;
  color: #363636;
}

.table td,
.table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}

.table td.is-white,
.table th.is-white {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.table td.is-black,
.table th.is-black {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.table td.is-light,
.table th.is-light {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.table td.is-dark,
.table th.is-dark {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}

.table td.is-primary,
.table th.is-primary {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}

.table td.is-link,
.table th.is-link {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.table td.is-info,
.table th.is-info {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}

.table td.is-success,
.table th.is-success {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}

.table td.is-warning,
.table th.is-warning {
  background-color: #ffdd57;
  border-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.table td.is-danger,
.table th.is-danger {
  background-color: #f14668;
  border-color: #f14668;
  color: #fff;
}

.table td.is-narrow,
.table th.is-narrow {
  white-space: nowrap;
  width: 1%;
}

.table td.is-selected,
.table th.is-selected {
  background-color: #00d1b2;
  color: #fff;
}

.table td.is-selected a,
.table td.is-selected strong,
.table th.is-selected a,
.table th.is-selected strong {
  color: currentColor;
}

.table td.is-vcentered,
.table th.is-vcentered {
  vertical-align: middle;
}

.table th {
  color: #363636;
}

.table th:not([align]) {
  text-align: inherit;
}

.table tr.is-selected {
  background-color: #00d1b2;
  color: #fff;
}

.table tr.is-selected a,
.table tr.is-selected strong {
  color: currentColor;
}

.table tr.is-selected td,
.table tr.is-selected th {
  border-color: #fff;
  color: currentColor;
}

.table thead {
  background-color: transparent;
}

.table thead td,
.table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

.table tfoot {
  background-color: transparent;
}

.table tfoot td,
.table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

.table tbody {
  background-color: transparent;
}

.table tbody tr:last-child td,
.table tbody tr:last-child th {
  border-bottom-width: 0;
}

.table.is-bordered td,
.table.is-bordered th {
  border-width: 1px;
}

.table.is-bordered tr:last-child td,
.table.is-bordered tr:last-child th {
  border-bottom-width: 1px;
}

.table.is-fullwidth {
  width: 100%;
}

.table.is-hoverable tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}

.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}

.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even) {
  background-color: whitesmoke;
}

.table.is-narrow td,
.table.is-narrow th {
  padding: 0.25em 0.5em;
}

.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #fafafa;
}

.table-container {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
}

.tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tags .tag {
  margin-bottom: 0.5rem;
}

.tags .tag:not(:last-child) {
  margin-right: 0.5rem;
}

.tags:last-child {
  margin-bottom: -0.5rem;
}

.tags:not(:last-child) {
  margin-bottom: 1rem;
}

.tags.are-medium .tag:not(.is-normal):not(.is-large) {
  font-size: 1rem;
}

.tags.are-large .tag:not(.is-normal):not(.is-medium) {
  font-size: 1.25rem;
}

.tags.is-centered {
  justify-content: center;
}

.tags.is-centered .tag {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}

.tags.is-right {
  justify-content: flex-end;
}

.tags.is-right .tag:not(:first-child) {
  margin-left: 0.5rem;
}

.tags.is-right .tag:not(:last-child) {
  margin-right: 0;
}

.tags.has-addons .tag {
  margin-right: 0;
}

.tags.has-addons .tag:not(:first-child) {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.tags.has-addons .tag:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tag:not(body) {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 4px;
  color: #4a4a4a;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}

.tag:not(body) .delete {
  margin-left: 0.25rem;
  margin-right: -0.375rem;
}

.tag:not(body).is-white {
  background-color: white;
  color: #0a0a0a;
}

.tag:not(body).is-black {
  background-color: #0a0a0a;
  color: white;
}

.tag:not(body).is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.tag:not(body).is-dark {
  background-color: #363636;
  color: #fff;
}

.tag:not(body).is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.tag:not(body).is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.tag:not(body).is-link {
  background-color: #3273dc;
  color: #fff;
}

.tag:not(body).is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.tag:not(body).is-info {
  background-color: #3298dc;
  color: #fff;
}

.tag:not(body).is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.tag:not(body).is-success {
  background-color: #48c774;
  color: #fff;
}

.tag:not(body).is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.tag:not(body).is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.tag:not(body).is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.tag:not(body).is-danger {
  background-color: #f14668;
  color: #fff;
}

.tag:not(body).is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.tag:not(body).is-normal {
  font-size: 0.75rem;
}

.tag:not(body).is-medium {
  font-size: 1rem;
}

.tag:not(body).is-large {
  font-size: 1.25rem;
}

.tag:not(body) .icon:first-child:not(:last-child) {
  margin-left: -0.375em;
  margin-right: 0.1875em;
}

.tag:not(body) .icon:last-child:not(:first-child) {
  margin-left: 0.1875em;
  margin-right: -0.375em;
}

.tag:not(body) .icon:first-child:last-child {
  margin-left: -0.375em;
  margin-right: -0.375em;
}

.tag:not(body).is-delete {
  margin-left: 1px;
  padding: 0;
  position: relative;
  width: 2em;
}

.tag:not(body).is-delete::before, .tag:not(body).is-delete::after {
  background-color: currentColor;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.tag:not(body).is-delete::before {
  height: 1px;
  width: 50%;
}

.tag:not(body).is-delete::after {
  height: 50%;
  width: 1px;
}

.tag:not(body).is-delete:hover, .tag:not(body).is-delete:focus {
  background-color: #e8e8e8;
}

.tag:not(body).is-delete:active {
  background-color: #dbdbdb;
}

.tag:not(body).is-rounded {
  border-radius: 290486px;
}

a.tag:hover {
  text-decoration: underline;
}

.title,
.subtitle {
  word-break: break-word;
}

.title em,
.title span,
.subtitle em,
.subtitle span {
  font-weight: inherit;
}

.title sub,
.subtitle sub {
  font-size: 0.75em;
}

.title sup,
.subtitle sup {
  font-size: 0.75em;
}

.title .tag,
.subtitle .tag {
  vertical-align: middle;
}

.title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
}

.title strong {
  color: inherit;
  font-weight: inherit;
}

.title + .highlight {
  margin-top: -0.75rem;
}

.title:not(.is-spaced) + .subtitle {
  margin-top: -1.25rem;
}

.title.is-1 {
  font-size: 3rem;
}

.title.is-2 {
  font-size: 2.5rem;
}

.title.is-3 {
  font-size: 2rem;
}

.title.is-4 {
  font-size: 1.5rem;
}

.title.is-5 {
  font-size: 1.25rem;
}

.title.is-6 {
  font-size: 1rem;
}

.title.is-7 {
  font-size: 0.75rem;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}

.subtitle strong {
  color: #363636;
  font-weight: 600;
}

.subtitle:not(.is-spaced) + .title {
  margin-top: -1.25rem;
}

.subtitle.is-1 {
  font-size: 3rem;
}

.subtitle.is-2 {
  font-size: 2.5rem;
}

.subtitle.is-3 {
  font-size: 2rem;
}

.subtitle.is-4 {
  font-size: 1.5rem;
}

.subtitle.is-5 {
  font-size: 1.25rem;
}

.subtitle.is-6 {
  font-size: 1rem;
}

.subtitle.is-7 {
  font-size: 0.75rem;
}

.heading {
  display: block;
  font-size: 11px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.highlight {
  font-weight: 400;
  max-width: 100%;
  overflow: hidden;
  padding: 0;
}

.highlight pre {
  overflow: auto;
  max-width: 100%;
}

.number {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 290486px;
  display: inline-flex;
  font-size: 1.25rem;
  height: 2em;
  justify-content: center;
  margin-right: 1.5rem;
  min-width: 2.5em;
  padding: 0.25rem 0.5rem;
  text-align: center;
  vertical-align: top;
}

/* Bulma Form */
.input, .textarea, .select select {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}

.input::-moz-placeholder, .textarea::-moz-placeholder, .select select::-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input::-webkit-input-placeholder, .textarea::-webkit-input-placeholder, .select select::-webkit-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-moz-placeholder, .textarea:-moz-placeholder, .select select:-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-ms-input-placeholder, .textarea:-ms-input-placeholder, .select select:-ms-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:hover, .textarea:hover, .select select:hover, .is-hovered.input, .is-hovered.textarea, .select select.is-hovered {
  border-color: #b5b5b5;
}

.input:focus, .textarea:focus, .select select:focus, .is-focused.input, .is-focused.textarea, .select select.is-focused, .input:active, .textarea:active, .select select:active, .is-active.input, .is-active.textarea, .select select.is-active {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.input[disabled], .textarea[disabled], .select select[disabled],
fieldset[disabled] .input,
fieldset[disabled] .textarea,
fieldset[disabled] .select select,
.select fieldset[disabled] select {
  background-color: whitesmoke;
  border-color: whitesmoke;
  box-shadow: none;
  color: #7a7a7a;
}

.input[disabled]::-moz-placeholder, .textarea[disabled]::-moz-placeholder, .select select[disabled]::-moz-placeholder,
fieldset[disabled] .input::-moz-placeholder,
fieldset[disabled] .textarea::-moz-placeholder,
fieldset[disabled] .select select::-moz-placeholder,
.select fieldset[disabled] select::-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]::-webkit-input-placeholder, .textarea[disabled]::-webkit-input-placeholder, .select select[disabled]::-webkit-input-placeholder,
fieldset[disabled] .input::-webkit-input-placeholder,
fieldset[disabled] .textarea::-webkit-input-placeholder,
fieldset[disabled] .select select::-webkit-input-placeholder,
.select fieldset[disabled] select::-webkit-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]:-moz-placeholder, .textarea[disabled]:-moz-placeholder, .select select[disabled]:-moz-placeholder,
fieldset[disabled] .input:-moz-placeholder,
fieldset[disabled] .textarea:-moz-placeholder,
fieldset[disabled] .select select:-moz-placeholder,
.select fieldset[disabled] select:-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]:-ms-input-placeholder, .textarea[disabled]:-ms-input-placeholder, .select select[disabled]:-ms-input-placeholder,
fieldset[disabled] .input:-ms-input-placeholder,
fieldset[disabled] .textarea:-ms-input-placeholder,
fieldset[disabled] .select select:-ms-input-placeholder,
.select fieldset[disabled] select:-ms-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input, .textarea {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
}

.input[readonly], .textarea[readonly] {
  box-shadow: none;
}

.is-white.input, .is-white.textarea {
  border-color: white;
}

.is-white.input:focus, .is-white.textarea:focus, .is-white.is-focused.input, .is-white.is-focused.textarea, .is-white.input:active, .is-white.textarea:active, .is-white.is-active.input, .is-white.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.is-black.input, .is-black.textarea {
  border-color: #0a0a0a;
}

.is-black.input:focus, .is-black.textarea:focus, .is-black.is-focused.input, .is-black.is-focused.textarea, .is-black.input:active, .is-black.textarea:active, .is-black.is-active.input, .is-black.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.is-light.input, .is-light.textarea {
  border-color: whitesmoke;
}

.is-light.input:focus, .is-light.textarea:focus, .is-light.is-focused.input, .is-light.is-focused.textarea, .is-light.input:active, .is-light.textarea:active, .is-light.is-active.input, .is-light.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.is-dark.input, .is-dark.textarea {
  border-color: #363636;
}

.is-dark.input:focus, .is-dark.textarea:focus, .is-dark.is-focused.input, .is-dark.is-focused.textarea, .is-dark.input:active, .is-dark.textarea:active, .is-dark.is-active.input, .is-dark.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.is-primary.input, .is-primary.textarea {
  border-color: #00d1b2;
}

.is-primary.input:focus, .is-primary.textarea:focus, .is-primary.is-focused.input, .is-primary.is-focused.textarea, .is-primary.input:active, .is-primary.textarea:active, .is-primary.is-active.input, .is-primary.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.is-link.input, .is-link.textarea {
  border-color: #3273dc;
}

.is-link.input:focus, .is-link.textarea:focus, .is-link.is-focused.input, .is-link.is-focused.textarea, .is-link.input:active, .is-link.textarea:active, .is-link.is-active.input, .is-link.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.is-info.input, .is-info.textarea {
  border-color: #3298dc;
}

.is-info.input:focus, .is-info.textarea:focus, .is-info.is-focused.input, .is-info.is-focused.textarea, .is-info.input:active, .is-info.textarea:active, .is-info.is-active.input, .is-info.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.is-success.input, .is-success.textarea {
  border-color: #48c774;
}

.is-success.input:focus, .is-success.textarea:focus, .is-success.is-focused.input, .is-success.is-focused.textarea, .is-success.input:active, .is-success.textarea:active, .is-success.is-active.input, .is-success.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.is-warning.input, .is-warning.textarea {
  border-color: #ffdd57;
}

.is-warning.input:focus, .is-warning.textarea:focus, .is-warning.is-focused.input, .is-warning.is-focused.textarea, .is-warning.input:active, .is-warning.textarea:active, .is-warning.is-active.input, .is-warning.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.is-danger.input, .is-danger.textarea {
  border-color: #f14668;
}

.is-danger.input:focus, .is-danger.textarea:focus, .is-danger.is-focused.input, .is-danger.is-focused.textarea, .is-danger.input:active, .is-danger.textarea:active, .is-danger.is-active.input, .is-danger.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.is-small.input, .is-small.textarea {
  border-radius: 2px;
  font-size: 0.75rem;
}

.is-medium.input, .is-medium.textarea {
  font-size: 1.25rem;
}

.is-large.input, .is-large.textarea {
  font-size: 1.5rem;
}

.is-fullwidth.input, .is-fullwidth.textarea {
  display: block;
  width: 100%;
}

.is-inline.input, .is-inline.textarea {
  display: inline;
  width: auto;
}

.input.is-rounded {
  border-radius: 290486px;
  padding-left: calc(calc(0.75em - 1px) + 0.375em);
  padding-right: calc(calc(0.75em - 1px) + 0.375em);
}

.input.is-static {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
}

.textarea {
  display: block;
  max-width: 100%;
  min-width: 100%;
  padding: calc(0.75em - 1px);
  resize: vertical;
}

.textarea:not([rows]) {
  max-height: 40em;
  min-height: 8em;
}

.textarea[rows] {
  height: initial;
}

.textarea.has-fixed-size {
  resize: none;
}

.checkbox, .radio {
  cursor: pointer;
  display: inline-block;
  line-height: 1.25;
  position: relative;
}

.checkbox input, .radio input {
  cursor: pointer;
}

.checkbox:hover, .radio:hover {
  color: #363636;
}

.checkbox[disabled], .radio[disabled],
fieldset[disabled] .checkbox,
fieldset[disabled] .radio,
.checkbox input[disabled],
.radio input[disabled] {
  color: #7a7a7a;
  cursor: not-allowed;
}

.radio + .radio {
  margin-left: 0.5em;
}

.select {
  display: inline-block;
  max-width: 100%;
  position: relative;
  vertical-align: top;
}

.select:not(.is-multiple) {
  height: 2.5em;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #3273dc;
  right: 1.125em;
  z-index: 4;
}

.select.is-rounded select {
  border-radius: 290486px;
  padding-left: 1em;
}

.select select {
  cursor: pointer;
  display: block;
  font-size: 1em;
  max-width: 100%;
  outline: none;
}

.select select::-ms-expand {
  display: none;
}

.select select[disabled]:hover,
fieldset[disabled] .select select:hover {
  border-color: whitesmoke;
}

.select select:not([multiple]) {
  padding-right: 2.5em;
}

.select select[multiple] {
  height: auto;
  padding: 0;
}

.select select[multiple] option {
  padding: 0.5em 1em;
}

.select:not(.is-multiple):not(.is-loading):hover::after {
  border-color: #363636;
}

.select.is-white:not(:hover)::after {
  border-color: white;
}

.select.is-white select {
  border-color: white;
}

.select.is-white select:hover, .select.is-white select.is-hovered {
  border-color: #f2f2f2;
}

.select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.select.is-black:not(:hover)::after {
  border-color: #0a0a0a;
}

.select.is-black select {
  border-color: #0a0a0a;
}

.select.is-black select:hover, .select.is-black select.is-hovered {
  border-color: black;
}

.select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.select.is-light:not(:hover)::after {
  border-color: whitesmoke;
}

.select.is-light select {
  border-color: whitesmoke;
}

.select.is-light select:hover, .select.is-light select.is-hovered {
  border-color: #e8e8e8;
}

.select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.select.is-dark:not(:hover)::after {
  border-color: #363636;
}

.select.is-dark select {
  border-color: #363636;
}

.select.is-dark select:hover, .select.is-dark select.is-hovered {
  border-color: #292929;
}

.select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.select.is-primary:not(:hover)::after {
  border-color: #00d1b2;
}

.select.is-primary select {
  border-color: #00d1b2;
}

.select.is-primary select:hover, .select.is-primary select.is-hovered {
  border-color: #00b89c;
}

.select.is-primary select:focus, .select.is-primary select.is-focused, .select.is-primary select:active, .select.is-primary select.is-active {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.select.is-link:not(:hover)::after {
  border-color: #3273dc;
}

.select.is-link select {
  border-color: #3273dc;
}

.select.is-link select:hover, .select.is-link select.is-hovered {
  border-color: #2366d1;
}

.select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.select.is-info:not(:hover)::after {
  border-color: #3298dc;
}

.select.is-info select {
  border-color: #3298dc;
}

.select.is-info select:hover, .select.is-info select.is-hovered {
  border-color: #238cd1;
}

.select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.select.is-success:not(:hover)::after {
  border-color: #48c774;
}

.select.is-success select {
  border-color: #48c774;
}

.select.is-success select:hover, .select.is-success select.is-hovered {
  border-color: #3abb67;
}

.select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.select.is-warning:not(:hover)::after {
  border-color: #ffdd57;
}

.select.is-warning select {
  border-color: #ffdd57;
}

.select.is-warning select:hover, .select.is-warning select.is-hovered {
  border-color: #ffd83d;
}

.select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.select.is-danger:not(:hover)::after {
  border-color: #f14668;
}

.select.is-danger select {
  border-color: #f14668;
}

.select.is-danger select:hover, .select.is-danger select.is-hovered {
  border-color: #ef2e55;
}

.select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.select.is-small {
  border-radius: 2px;
  font-size: 0.75rem;
}

.select.is-medium {
  font-size: 1.25rem;
}

.select.is-large {
  font-size: 1.5rem;
}

.select.is-disabled::after {
  border-color: #7a7a7a;
}

.select.is-fullwidth {
  width: 100%;
}

.select.is-fullwidth select {
  width: 100%;
}

.select.is-loading::after {
  margin-top: 0;
  position: absolute;
  right: 0.625em;
  top: 0.625em;
  transform: none;
}

.select.is-loading.is-small:after {
  font-size: 0.75rem;
}

.select.is-loading.is-medium:after {
  font-size: 1.25rem;
}

.select.is-loading.is-large:after {
  font-size: 1.5rem;
}

.file {
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
}

.file.is-white .file-cta {
  background-color: white;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {
  background-color: #f9f9f9;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);
  color: #0a0a0a;
}

.file.is-white:active .file-cta, .file.is-white.is-active .file-cta {
  background-color: #f2f2f2;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-black .file-cta {
  background-color: #0a0a0a;
  border-color: transparent;
  color: white;
}

.file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {
  background-color: #040404;
  border-color: transparent;
  color: white;
}

.file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);
  color: white;
}

.file.is-black:active .file-cta, .file.is-black.is-active .file-cta {
  background-color: black;
  border-color: transparent;
  color: white;
}

.file.is-light .file-cta {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:active .file-cta, .file.is-light.is-active .file-cta {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-dark .file-cta {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}

.file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}

.file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);
  color: #fff;
}

.file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}

.file.is-primary .file-cta {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}

.file.is-primary:hover .file-cta, .file.is-primary.is-hovered .file-cta {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}

.file.is-primary:focus .file-cta, .file.is-primary.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
  color: #fff;
}

.file.is-primary:active .file-cta, .file.is-primary.is-active .file-cta {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}

.file.is-link .file-cta {
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
}

.file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {
  background-color: #276cda;
  border-color: transparent;
  color: #fff;
}

.file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);
  color: #fff;
}

.file.is-link:active .file-cta, .file.is-link.is-active .file-cta {
  background-color: #2366d1;
  border-color: transparent;
  color: #fff;
}

.file.is-info .file-cta {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}

.file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}

.file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(50, 152, 220, 0.25);
  color: #fff;
}

.file.is-info:active .file-cta, .file.is-info.is-active .file-cta {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}

.file.is-success .file-cta {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}

.file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}

.file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(72, 199, 116, 0.25);
  color: #fff;
}

.file.is-success:active .file-cta, .file.is-success.is-active .file-cta {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}

.file.is-warning .file-cta {
  background-color: #ffdd57;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {
  background-color: #ffdb4a;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {
  background-color: #ffd83d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-danger .file-cta {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}

.file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {
  background-color: #f03a5f;
  border-color: transparent;
  color: #fff;
}

.file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(241, 70, 104, 0.25);
  color: #fff;
}

.file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {
  background-color: #ef2e55;
  border-color: transparent;
  color: #fff;
}

.file.is-small {
  font-size: 0.75rem;
}

.file.is-medium {
  font-size: 1.25rem;
}

.file.is-medium .file-icon .fa {
  font-size: 21px;
}

.file.is-large {
  font-size: 1.5rem;
}

.file.is-large .file-icon .fa {
  font-size: 28px;
}

.file.has-name .file-cta {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.file.has-name .file-name {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.file.has-name.is-empty .file-cta {
  border-radius: 4px;
}

.file.has-name.is-empty .file-name {
  display: none;
}

.file.is-boxed .file-label {
  flex-direction: column;
}

.file.is-boxed .file-cta {
  flex-direction: column;
  height: auto;
  padding: 1em 3em;
}

.file.is-boxed .file-name {
  border-width: 0 1px 1px;
}

.file.is-boxed .file-icon {
  height: 1.5em;
  width: 1.5em;
}

.file.is-boxed .file-icon .fa {
  font-size: 21px;
}

.file.is-boxed.is-small .file-icon .fa {
  font-size: 14px;
}

.file.is-boxed.is-medium .file-icon .fa {
  font-size: 28px;
}

.file.is-boxed.is-large .file-icon .fa {
  font-size: 35px;
}

.file.is-boxed.has-name .file-cta {
  border-radius: 4px 4px 0 0;
}

.file.is-boxed.has-name .file-name {
  border-radius: 0 0 4px 4px;
  border-width: 0 1px 1px;
}

.file.is-centered {
  justify-content: center;
}

.file.is-fullwidth .file-label {
  width: 100%;
}

.file.is-fullwidth .file-name {
  flex-grow: 1;
  max-width: none;
}

.file.is-right {
  justify-content: flex-end;
}

.file.is-right .file-cta {
  border-radius: 0 4px 4px 0;
}

.file.is-right .file-name {
  border-radius: 4px 0 0 4px;
  border-width: 1px 0 1px 1px;
  order: -1;
}

.file-label {
  align-items: stretch;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}

.file-label:hover .file-cta {
  background-color: #eeeeee;
  color: #363636;
}

.file-label:hover .file-name {
  border-color: #d5d5d5;
}

.file-label:active .file-cta {
  background-color: #e8e8e8;
  color: #363636;
}

.file-label:active .file-name {
  border-color: #cfcfcf;
}

.file-input {
  height: 100%;
  left: 0;
  opacity: 0;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.file-cta,
.file-name {
  border-color: #dbdbdb;
  border-radius: 4px;
  font-size: 1em;
  padding-left: 1em;
  padding-right: 1em;
  white-space: nowrap;
}

.file-cta {
  background-color: whitesmoke;
  color: #4a4a4a;
}

.file-name {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px 1px 1px 0;
  display: block;
  max-width: 16em;
  overflow: hidden;
  text-align: inherit;
  text-overflow: ellipsis;
}

.file-icon {
  align-items: center;
  display: flex;
  height: 1em;
  justify-content: center;
  margin-right: 0.5em;
  width: 1em;
}

.file-icon .fa {
  font-size: 14px;
}

.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.label:not(:last-child) {
  margin-bottom: 0.5em;
}

.label.is-small {
  font-size: 0.75rem;
}

.label.is-medium {
  font-size: 1.25rem;
}

.label.is-large {
  font-size: 1.5rem;
}

.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.help.is-white {
  color: white;
}

.help.is-black {
  color: #0a0a0a;
}

.help.is-light {
  color: whitesmoke;
}

.help.is-dark {
  color: #363636;
}

.help.is-primary {
  color: #00d1b2;
}

.help.is-link {
  color: #3273dc;
}

.help.is-info {
  color: #3298dc;
}

.help.is-success {
  color: #48c774;
}

.help.is-warning {
  color: #ffdd57;
}

.help.is-danger {
  color: #f14668;
}

.field:not(:last-child) {
  margin-bottom: 0.75rem;
}

.field.has-addons {
  display: flex;
  justify-content: flex-start;
}

.field.has-addons .control:not(:last-child) {
  margin-right: -1px;
}

.field.has-addons .control:not(:first-child):not(:last-child) .button,
.field.has-addons .control:not(:first-child):not(:last-child) .input,
.field.has-addons .control:not(:first-child):not(:last-child) .select select {
  border-radius: 0;
}

.field.has-addons .control:first-child:not(:only-child) .button,
.field.has-addons .control:first-child:not(:only-child) .input,
.field.has-addons .control:first-child:not(:only-child) .select select {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.field.has-addons .control:last-child:not(:only-child) .button,
.field.has-addons .control:last-child:not(:only-child) .input,
.field.has-addons .control:last-child:not(:only-child) .select select {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.field.has-addons .control .button:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered,
.field.has-addons .control .input:not([disabled]):hover,
.field.has-addons .control .input:not([disabled]).is-hovered,
.field.has-addons .control .select select:not([disabled]):hover,
.field.has-addons .control .select select:not([disabled]).is-hovered {
  z-index: 2;
}

.field.has-addons .control .button:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused, .field.has-addons .control .button:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active,
.field.has-addons .control .input:not([disabled]):focus,
.field.has-addons .control .input:not([disabled]).is-focused,
.field.has-addons .control .input:not([disabled]):active,
.field.has-addons .control .input:not([disabled]).is-active,
.field.has-addons .control .select select:not([disabled]):focus,
.field.has-addons .control .select select:not([disabled]).is-focused,
.field.has-addons .control .select select:not([disabled]):active,
.field.has-addons .control .select select:not([disabled]).is-active {
  z-index: 3;
}

.field.has-addons .control .button:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused:hover, .field.has-addons .control .button:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active:hover,
.field.has-addons .control .input:not([disabled]):focus:hover,
.field.has-addons .control .input:not([disabled]).is-focused:hover,
.field.has-addons .control .input:not([disabled]):active:hover,
.field.has-addons .control .input:not([disabled]).is-active:hover,
.field.has-addons .control .select select:not([disabled]):focus:hover,
.field.has-addons .control .select select:not([disabled]).is-focused:hover,
.field.has-addons .control .select select:not([disabled]):active:hover,
.field.has-addons .control .select select:not([disabled]).is-active:hover {
  z-index: 4;
}

.field.has-addons .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.field.has-addons.has-addons-centered {
  justify-content: center;
}

.field.has-addons.has-addons-right {
  justify-content: flex-end;
}

.field.has-addons.has-addons-fullwidth .control {
  flex-grow: 1;
  flex-shrink: 0;
}

.field.is-grouped {
  display: flex;
  justify-content: flex-start;
}

.field.is-grouped > .control {
  flex-shrink: 0;
}

.field.is-grouped > .control:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}

.field.is-grouped > .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.field.is-grouped.is-grouped-centered {
  justify-content: center;
}

.field.is-grouped.is-grouped-right {
  justify-content: flex-end;
}

.field.is-grouped.is-grouped-multiline {
  flex-wrap: wrap;
}

.field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
  margin-bottom: 0.75rem;
}

.field.is-grouped.is-grouped-multiline:last-child {
  margin-bottom: -0.75rem;
}

.field.is-grouped.is-grouped-multiline:not(:last-child) {
  margin-bottom: 0;
}

@media screen and (min-width: 769px), print {
  .field.is-horizontal {
    display: flex;
  }
}

.field-label .label {
  font-size: inherit;
}

@media screen and (max-width: 768px) {
  .field-label {
    margin-bottom: 0.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .field-label {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: 1.5rem;
    text-align: right;
  }
  .field-label.is-small {
    font-size: 0.75rem;
    padding-top: 0.375em;
  }
  .field-label.is-normal {
    padding-top: 0.375em;
  }
  .field-label.is-medium {
    font-size: 1.25rem;
    padding-top: 0.375em;
  }
  .field-label.is-large {
    font-size: 1.5rem;
    padding-top: 0.375em;
  }
}

.field-body .field .field {
  margin-bottom: 0;
}

@media screen and (min-width: 769px), print {
  .field-body {
    display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
  }
  .field-body .field {
    margin-bottom: 0;
  }
  .field-body > .field {
    flex-shrink: 1;
  }
  .field-body > .field:not(.is-narrow) {
    flex-grow: 1;
  }
  .field-body > .field:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
}

.control.has-icons-left .input:focus ~ .icon,
.control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,
.control.has-icons-right .select:focus ~ .icon {
  color: #4a4a4a;
}

.control.has-icons-left .input.is-small ~ .icon,
.control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,
.control.has-icons-right .select.is-small ~ .icon {
  font-size: 0.75rem;
}

.control.has-icons-left .input.is-medium ~ .icon,
.control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,
.control.has-icons-right .select.is-medium ~ .icon {
  font-size: 1.25rem;
}

.control.has-icons-left .input.is-large ~ .icon,
.control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,
.control.has-icons-right .select.is-large ~ .icon {
  font-size: 1.5rem;
}

.control.has-icons-left .icon, .control.has-icons-right .icon {
  color: #dbdbdb;
  height: 2.5em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2.5em;
  z-index: 4;
}

.control.has-icons-left .input,
.control.has-icons-left .select select {
  padding-left: 2.5em;
}

.control.has-icons-left .icon.is-left {
  left: 0;
}

.control.has-icons-right .input,
.control.has-icons-right .select select {
  padding-right: 2.5em;
}

.control.has-icons-right .icon.is-right {
  right: 0;
}

.control.is-loading::after {
  position: absolute !important;
  right: 0.625em;
  top: 0.625em;
  z-index: 4;
}

.control.is-loading.is-small:after {
  font-size: 0.75rem;
}

.control.is-loading.is-medium:after {
  font-size: 1.25rem;
}

.control.is-loading.is-large:after {
  font-size: 1.5rem;
}

/* Bulma Components */
.breadcrumb {
  font-size: 1rem;
  white-space: nowrap;
}

.breadcrumb a {
  align-items: center;
  color: #3273dc;
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
}

.breadcrumb a:hover {
  color: #363636;
}

.breadcrumb li {
  align-items: center;
  display: flex;
}

.breadcrumb li:first-child a {
  padding-left: 0;
}

.breadcrumb li.is-active a {
  color: #363636;
  cursor: default;
  pointer-events: none;
}

.breadcrumb li + li::before {
  color: #b5b5b5;
  content: "\\0002f";
}

.breadcrumb ul,
.breadcrumb ol {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.breadcrumb .icon:first-child {
  margin-right: 0.5em;
}

.breadcrumb .icon:last-child {
  margin-left: 0.5em;
}

.breadcrumb.is-centered ol,
.breadcrumb.is-centered ul {
  justify-content: center;
}

.breadcrumb.is-right ol,
.breadcrumb.is-right ul {
  justify-content: flex-end;
}

.breadcrumb.is-small {
  font-size: 0.75rem;
}

.breadcrumb.is-medium {
  font-size: 1.25rem;
}

.breadcrumb.is-large {
  font-size: 1.5rem;
}

.breadcrumb.has-arrow-separator li + li::before {
  content: "\\02192";
}

.breadcrumb.has-bullet-separator li + li::before {
  content: "\\02022";
}

.breadcrumb.has-dot-separator li + li::before {
  content: "\\000b7";
}

.breadcrumb.has-succeeds-separator li + li::before {
  content: "\\0227B";
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;
}

.card-header:first-child, .card-content:first-child, .card-footer:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card-header:last-child, .card-content:last-child, .card-footer:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-header {
  background-color: transparent;
  align-items: stretch;
  box-shadow: 0 0.125em 0.25em rgba(10, 10, 10, 0.1);
  display: flex;
}

.card-header-title {
  align-items: center;
  color: #363636;
  display: flex;
  flex-grow: 1;
  font-weight: 700;
  padding: 0.75rem 1rem;
}

.card-header-title.is-centered {
  justify-content: center;
}

.card-header-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
}

.card-image {
  display: block;
  position: relative;
}

.card-image:first-child img {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card-image:last-child img {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-content {
  background-color: transparent;
  padding: 1.5rem;
}

.card-footer {
  background-color: transparent;
  border-top: 1px solid #ededed;
  align-items: stretch;
  display: flex;
}

.card-footer-item {
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: 0.75rem;
}

.card-footer-item:not(:last-child) {
  border-right: 1px solid #ededed;
}

.card .media:not(:last-child) {
  margin-bottom: 1.5rem;
}

.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}

.dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {
  display: block;
}

.dropdown.is-right .dropdown-menu {
  left: auto;
  right: 0;
}

.dropdown.is-up .dropdown-menu {
  bottom: 100%;
  padding-bottom: 4px;
  padding-top: initial;
  top: auto;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.dropdown-content {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.dropdown-item {
  color: #4a4a4a;
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;
}

a.dropdown-item,
button.dropdown-item {
  padding-right: 3rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;
}

a.dropdown-item:hover,
button.dropdown-item:hover {
  background-color: whitesmoke;
  color: #0a0a0a;
}

a.dropdown-item.is-active,
button.dropdown-item.is-active {
  background-color: #3273dc;
  color: #fff;
}

.dropdown-divider {
  background-color: #ededed;
  border: none;
  display: block;
  height: 1px;
  margin: 0.5rem 0;
}

.level {
  align-items: center;
  justify-content: space-between;
}

.level code {
  border-radius: 4px;
}

.level img {
  display: inline-block;
  vertical-align: top;
}

.level.is-mobile {
  display: flex;
}

.level.is-mobile .level-left,
.level.is-mobile .level-right {
  display: flex;
}

.level.is-mobile .level-left + .level-right {
  margin-top: 0;
}

.level.is-mobile .level-item:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}

.level.is-mobile .level-item:not(.is-narrow) {
  flex-grow: 1;
}

@media screen and (min-width: 769px), print {
  .level {
    display: flex;
  }
  .level > .level-item:not(.is-narrow) {
    flex-grow: 1;
  }
}

.level-item {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
}

.level-item .title,
.level-item .subtitle {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
  .level-item:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}

.level-left,
.level-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.level-left .level-item.is-flexible,
.level-right .level-item.is-flexible {
  flex-grow: 1;
}

@media screen and (min-width: 769px), print {
  .level-left .level-item:not(:last-child),
  .level-right .level-item:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.level-left {
  align-items: center;
  justify-content: flex-start;
}

@media screen and (max-width: 768px) {
  .level-left + .level-right {
    margin-top: 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .level-left {
    display: flex;
  }
}

.level-right {
  align-items: center;
  justify-content: flex-end;
}

@media screen and (min-width: 769px), print {
  .level-right {
    display: flex;
  }
}

.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}

.media .content:not(:last-child) {
  margin-bottom: 0.75rem;
}

.media .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  display: flex;
  padding-top: 0.75rem;
}

.media .media .content:not(:last-child),
.media .media .control:not(:last-child) {
  margin-bottom: 0.5rem;
}

.media .media .media {
  padding-top: 0.5rem;
}

.media .media .media + .media {
  margin-top: 0.5rem;
}

.media + .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  padding-top: 1rem;
}

.media.is-large + .media {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.media-left,
.media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.media-left {
  margin-right: 1rem;
}

.media-right {
  margin-left: 1rem;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}

@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: auto;
  }
}

.menu {
  font-size: 1rem;
}

.menu.is-small {
  font-size: 0.75rem;
}

.menu.is-medium {
  font-size: 1.25rem;
}

.menu.is-large {
  font-size: 1.5rem;
}

.menu-list {
  line-height: 1.25;
}

.menu-list a {
  border-radius: 2px;
  color: #4a4a4a;
  display: block;
  padding: 0.5em 0.75em;
}

.menu-list a:hover {
  background-color: whitesmoke;
  color: #363636;
}

.menu-list a.is-active {
  background-color: #3273dc;
  color: #fff;
}

.menu-list li ul {
  border-left: 1px solid #dbdbdb;
  margin: 0.75em;
  padding-left: 0.75em;
}

.menu-label {
  color: #7a7a7a;
  font-size: 0.75em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.menu-label:not(:first-child) {
  margin-top: 1em;
}

.menu-label:not(:last-child) {
  margin-bottom: 1em;
}

.message {
  background-color: whitesmoke;
  border-radius: 4px;
  font-size: 1rem;
}

.message strong {
  color: currentColor;
}

.message a:not(.button):not(.tag):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.message.is-small {
  font-size: 0.75rem;
}

.message.is-medium {
  font-size: 1.25rem;
}

.message.is-large {
  font-size: 1.5rem;
}

.message.is-white {
  background-color: white;
}

.message.is-white .message-header {
  background-color: white;
  color: #0a0a0a;
}

.message.is-white .message-body {
  border-color: white;
}

.message.is-black {
  background-color: #fafafa;
}

.message.is-black .message-header {
  background-color: #0a0a0a;
  color: white;
}

.message.is-black .message-body {
  border-color: #0a0a0a;
}

.message.is-light {
  background-color: #fafafa;
}

.message.is-light .message-header {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.message.is-light .message-body {
  border-color: whitesmoke;
}

.message.is-dark {
  background-color: #fafafa;
}

.message.is-dark .message-header {
  background-color: #363636;
  color: #fff;
}

.message.is-dark .message-body {
  border-color: #363636;
}

.message.is-primary {
  background-color: #ebfffc;
}

.message.is-primary .message-header {
  background-color: #00d1b2;
  color: #fff;
}

.message.is-primary .message-body {
  border-color: #00d1b2;
  color: #00947e;
}

.message.is-link {
  background-color: #eef3fc;
}

.message.is-link .message-header {
  background-color: #3273dc;
  color: #fff;
}

.message.is-link .message-body {
  border-color: #3273dc;
  color: #2160c4;
}

.message.is-info {
  background-color: #eef6fc;
}

.message.is-info .message-header {
  background-color: #3298dc;
  color: #fff;
}

.message.is-info .message-body {
  border-color: #3298dc;
  color: #1d72aa;
}

.message.is-success {
  background-color: #effaf3;
}

.message.is-success .message-header {
  background-color: #48c774;
  color: #fff;
}

.message.is-success .message-body {
  border-color: #48c774;
  color: #257942;
}

.message.is-warning {
  background-color: #fffbeb;
}

.message.is-warning .message-header {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.message.is-warning .message-body {
  border-color: #ffdd57;
  color: #947600;
}

.message.is-danger {
  background-color: #feecf0;
}

.message.is-danger .message-header {
  background-color: #f14668;
  color: #fff;
}

.message.is-danger .message-body {
  border-color: #f14668;
  color: #cc0f35;
}

.message-header {
  align-items: center;
  background-color: #4a4a4a;
  border-radius: 4px 4px 0 0;
  color: #fff;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  line-height: 1.25;
  padding: 0.75em 1em;
  position: relative;
}

.message-header .delete {
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 0.75em;
}

.message-header + .message-body {
  border-width: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.message-body {
  border-color: #dbdbdb;
  border-radius: 4px;
  border-style: solid;
  border-width: 0 0 0 4px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
}

.message-body code,
.message-body pre {
  background-color: white;
}

.message-body pre code {
  background-color: transparent;
}

.modal {
  align-items: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 40;
}

.modal.is-active {
  display: flex;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.86);
}

.modal-content,
.modal-card {
  margin: 0 20px;
  max-height: calc(100vh - 160px);
  overflow: auto;
  position: relative;
  width: 100%;
}

@media screen and (min-width: 769px) {
  .modal-content,
  .modal-card {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 640px;
  }
}

.modal-close {
  background: none;
  height: 40px;
  position: fixed;
  right: 20px;
  top: 20px;
  width: 40px;
}

.modal-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  -ms-overflow-y: visible;
}

.modal-card-head,
.modal-card-foot {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}

.modal-card-head {
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.modal-card-title {
  color: #363636;
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.5rem;
  line-height: 1;
}

.modal-card-foot {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #dbdbdb;
}

.modal-card-foot .button:not(:last-child) {
  margin-right: 0.5em;
}

.modal-card-body {
  -webkit-overflow-scrolling: touch;
  background-color: white;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 20px;
}

.navbar {
  background-color: white;
  min-height: 3.25rem;
  position: relative;
  z-index: 30;
}

.navbar.is-white {
  background-color: white;
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand > .navbar-item,
.navbar.is-white .navbar-brand .navbar-link {
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand > a.navbar-item:focus, .navbar.is-white .navbar-brand > a.navbar-item:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active,
.navbar.is-white .navbar-brand .navbar-link:focus,
.navbar.is-white .navbar-brand .navbar-link:hover,
.navbar.is-white .navbar-brand .navbar-link.is-active {
  background-color: #f2f2f2;
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand .navbar-link::after {
  border-color: #0a0a0a;
}

.navbar.is-white .navbar-burger {
  color: #0a0a0a;
}

@media screen and (min-width: 1024px) {
  .navbar.is-white .navbar-start > .navbar-item,
  .navbar.is-white .navbar-start .navbar-link,
  .navbar.is-white .navbar-end > .navbar-item,
  .navbar.is-white .navbar-end .navbar-link {
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-start > a.navbar-item:focus, .navbar.is-white .navbar-start > a.navbar-item:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active,
  .navbar.is-white .navbar-start .navbar-link:focus,
  .navbar.is-white .navbar-start .navbar-link:hover,
  .navbar.is-white .navbar-start .navbar-link.is-active,
  .navbar.is-white .navbar-end > a.navbar-item:focus,
  .navbar.is-white .navbar-end > a.navbar-item:hover,
  .navbar.is-white .navbar-end > a.navbar-item.is-active,
  .navbar.is-white .navbar-end .navbar-link:focus,
  .navbar.is-white .navbar-end .navbar-link:hover,
  .navbar.is-white .navbar-end .navbar-link.is-active {
    background-color: #f2f2f2;
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-start .navbar-link::after,
  .navbar.is-white .navbar-end .navbar-link::after {
    border-color: #0a0a0a;
  }
  .navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #f2f2f2;
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-dropdown a.navbar-item.is-active {
    background-color: white;
    color: #0a0a0a;
  }
}

.navbar.is-black {
  background-color: #0a0a0a;
  color: white;
}

.navbar.is-black .navbar-brand > .navbar-item,
.navbar.is-black .navbar-brand .navbar-link {
  color: white;
}

.navbar.is-black .navbar-brand > a.navbar-item:focus, .navbar.is-black .navbar-brand > a.navbar-item:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active,
.navbar.is-black .navbar-brand .navbar-link:focus,
.navbar.is-black .navbar-brand .navbar-link:hover,
.navbar.is-black .navbar-brand .navbar-link.is-active {
  background-color: black;
  color: white;
}

.navbar.is-black .navbar-brand .navbar-link::after {
  border-color: white;
}

.navbar.is-black .navbar-burger {
  color: white;
}

@media screen and (min-width: 1024px) {
  .navbar.is-black .navbar-start > .navbar-item,
  .navbar.is-black .navbar-start .navbar-link,
  .navbar.is-black .navbar-end > .navbar-item,
  .navbar.is-black .navbar-end .navbar-link {
    color: white;
  }
  .navbar.is-black .navbar-start > a.navbar-item:focus, .navbar.is-black .navbar-start > a.navbar-item:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active,
  .navbar.is-black .navbar-start .navbar-link:focus,
  .navbar.is-black .navbar-start .navbar-link:hover,
  .navbar.is-black .navbar-start .navbar-link.is-active,
  .navbar.is-black .navbar-end > a.navbar-item:focus,
  .navbar.is-black .navbar-end > a.navbar-item:hover,
  .navbar.is-black .navbar-end > a.navbar-item.is-active,
  .navbar.is-black .navbar-end .navbar-link:focus,
  .navbar.is-black .navbar-end .navbar-link:hover,
  .navbar.is-black .navbar-end .navbar-link.is-active {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-start .navbar-link::after,
  .navbar.is-black .navbar-end .navbar-link::after {
    border-color: white;
  }
  .navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-dropdown a.navbar-item.is-active {
    background-color: #0a0a0a;
    color: white;
  }
}

.navbar.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand > .navbar-item,
.navbar.is-light .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand > a.navbar-item:focus, .navbar.is-light .navbar-brand > a.navbar-item:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active,
.navbar.is-light .navbar-brand .navbar-link:focus,
.navbar.is-light .navbar-brand .navbar-link:hover,
.navbar.is-light .navbar-brand .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (min-width: 1024px) {
  .navbar.is-light .navbar-start > .navbar-item,
  .navbar.is-light .navbar-start .navbar-link,
  .navbar.is-light .navbar-end > .navbar-item,
  .navbar.is-light .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start > a.navbar-item:focus, .navbar.is-light .navbar-start > a.navbar-item:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active,
  .navbar.is-light .navbar-start .navbar-link:focus,
  .navbar.is-light .navbar-start .navbar-link:hover,
  .navbar.is-light .navbar-start .navbar-link.is-active,
  .navbar.is-light .navbar-end > a.navbar-item:focus,
  .navbar.is-light .navbar-end > a.navbar-item:hover,
  .navbar.is-light .navbar-end > a.navbar-item.is-active,
  .navbar.is-light .navbar-end .navbar-link:focus,
  .navbar.is-light .navbar-end .navbar-link:hover,
  .navbar.is-light .navbar-end .navbar-link.is-active {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start .navbar-link::after,
  .navbar.is-light .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.7);
  }
}

.navbar.is-dark {
  background-color: #363636;
  color: #fff;
}

.navbar.is-dark .navbar-brand > .navbar-item,
.navbar.is-dark .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-dark .navbar-brand > a.navbar-item:focus, .navbar.is-dark .navbar-brand > a.navbar-item:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active,
.navbar.is-dark .navbar-brand .navbar-link:focus,
.navbar.is-dark .navbar-brand .navbar-link:hover,
.navbar.is-dark .navbar-brand .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}

.navbar.is-dark .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-dark .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-dark .navbar-start > .navbar-item,
  .navbar.is-dark .navbar-start .navbar-link,
  .navbar.is-dark .navbar-end > .navbar-item,
  .navbar.is-dark .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-dark .navbar-start > a.navbar-item:focus, .navbar.is-dark .navbar-start > a.navbar-item:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active,
  .navbar.is-dark .navbar-start .navbar-link:focus,
  .navbar.is-dark .navbar-start .navbar-link:hover,
  .navbar.is-dark .navbar-start .navbar-link.is-active,
  .navbar.is-dark .navbar-end > a.navbar-item:focus,
  .navbar.is-dark .navbar-end > a.navbar-item:hover,
  .navbar.is-dark .navbar-end > a.navbar-item.is-active,
  .navbar.is-dark .navbar-end .navbar-link:focus,
  .navbar.is-dark .navbar-end .navbar-link:hover,
  .navbar.is-dark .navbar-end .navbar-link.is-active {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-start .navbar-link::after,
  .navbar.is-dark .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-dropdown a.navbar-item.is-active {
    background-color: #363636;
    color: #fff;
  }
}

.navbar.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.navbar.is-primary .navbar-brand > .navbar-item,
.navbar.is-primary .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-primary .navbar-brand > a.navbar-item:focus, .navbar.is-primary .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active,
.navbar.is-primary .navbar-brand .navbar-link:focus,
.navbar.is-primary .navbar-brand .navbar-link:hover,
.navbar.is-primary .navbar-brand .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}

.navbar.is-primary .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-primary .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-primary .navbar-start > .navbar-item,
  .navbar.is-primary .navbar-start .navbar-link,
  .navbar.is-primary .navbar-end > .navbar-item,
  .navbar.is-primary .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-primary .navbar-start > a.navbar-item:focus, .navbar.is-primary .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active,
  .navbar.is-primary .navbar-start .navbar-link:focus,
  .navbar.is-primary .navbar-start .navbar-link:hover,
  .navbar.is-primary .navbar-start .navbar-link.is-active,
  .navbar.is-primary .navbar-end > a.navbar-item:focus,
  .navbar.is-primary .navbar-end > a.navbar-item:hover,
  .navbar.is-primary .navbar-end > a.navbar-item.is-active,
  .navbar.is-primary .navbar-end .navbar-link:focus,
  .navbar.is-primary .navbar-end .navbar-link:hover,
  .navbar.is-primary .navbar-end .navbar-link.is-active {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-start .navbar-link::after,
  .navbar.is-primary .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-dropdown a.navbar-item.is-active {
    background-color: #00d1b2;
    color: #fff;
  }
}

.navbar.is-link {
  background-color: #3273dc;
  color: #fff;
}

.navbar.is-link .navbar-brand > .navbar-item,
.navbar.is-link .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-link .navbar-brand > a.navbar-item:focus, .navbar.is-link .navbar-brand > a.navbar-item:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active,
.navbar.is-link .navbar-brand .navbar-link:focus,
.navbar.is-link .navbar-brand .navbar-link:hover,
.navbar.is-link .navbar-brand .navbar-link.is-active {
  background-color: #2366d1;
  color: #fff;
}

.navbar.is-link .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-link .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-link .navbar-start > .navbar-item,
  .navbar.is-link .navbar-start .navbar-link,
  .navbar.is-link .navbar-end > .navbar-item,
  .navbar.is-link .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-link .navbar-start > a.navbar-item:focus, .navbar.is-link .navbar-start > a.navbar-item:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active,
  .navbar.is-link .navbar-start .navbar-link:focus,
  .navbar.is-link .navbar-start .navbar-link:hover,
  .navbar.is-link .navbar-start .navbar-link.is-active,
  .navbar.is-link .navbar-end > a.navbar-item:focus,
  .navbar.is-link .navbar-end > a.navbar-item:hover,
  .navbar.is-link .navbar-end > a.navbar-item.is-active,
  .navbar.is-link .navbar-end .navbar-link:focus,
  .navbar.is-link .navbar-end .navbar-link:hover,
  .navbar.is-link .navbar-end .navbar-link.is-active {
    background-color: #2366d1;
    color: #fff;
  }
  .navbar.is-link .navbar-start .navbar-link::after,
  .navbar.is-link .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #2366d1;
    color: #fff;
  }
  .navbar.is-link .navbar-dropdown a.navbar-item.is-active {
    background-color: #3273dc;
    color: #fff;
  }
}

.navbar.is-info {
  background-color: #3298dc;
  color: #fff;
}

.navbar.is-info .navbar-brand > .navbar-item,
.navbar.is-info .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-info .navbar-brand > a.navbar-item:focus, .navbar.is-info .navbar-brand > a.navbar-item:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active,
.navbar.is-info .navbar-brand .navbar-link:focus,
.navbar.is-info .navbar-brand .navbar-link:hover,
.navbar.is-info .navbar-brand .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}

.navbar.is-info .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-info .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-info .navbar-start > .navbar-item,
  .navbar.is-info .navbar-start .navbar-link,
  .navbar.is-info .navbar-end > .navbar-item,
  .navbar.is-info .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-info .navbar-start > a.navbar-item:focus, .navbar.is-info .navbar-start > a.navbar-item:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active,
  .navbar.is-info .navbar-start .navbar-link:focus,
  .navbar.is-info .navbar-start .navbar-link:hover,
  .navbar.is-info .navbar-start .navbar-link.is-active,
  .navbar.is-info .navbar-end > a.navbar-item:focus,
  .navbar.is-info .navbar-end > a.navbar-item:hover,
  .navbar.is-info .navbar-end > a.navbar-item.is-active,
  .navbar.is-info .navbar-end .navbar-link:focus,
  .navbar.is-info .navbar-end .navbar-link:hover,
  .navbar.is-info .navbar-end .navbar-link.is-active {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-start .navbar-link::after,
  .navbar.is-info .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-dropdown a.navbar-item.is-active {
    background-color: #3298dc;
    color: #fff;
  }
}

.navbar.is-success {
  background-color: #48c774;
  color: #fff;
}

.navbar.is-success .navbar-brand > .navbar-item,
.navbar.is-success .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-success .navbar-brand > a.navbar-item:focus, .navbar.is-success .navbar-brand > a.navbar-item:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active,
.navbar.is-success .navbar-brand .navbar-link:focus,
.navbar.is-success .navbar-brand .navbar-link:hover,
.navbar.is-success .navbar-brand .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}

.navbar.is-success .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-success .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-success .navbar-start > .navbar-item,
  .navbar.is-success .navbar-start .navbar-link,
  .navbar.is-success .navbar-end > .navbar-item,
  .navbar.is-success .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-success .navbar-start > a.navbar-item:focus, .navbar.is-success .navbar-start > a.navbar-item:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active,
  .navbar.is-success .navbar-start .navbar-link:focus,
  .navbar.is-success .navbar-start .navbar-link:hover,
  .navbar.is-success .navbar-start .navbar-link.is-active,
  .navbar.is-success .navbar-end > a.navbar-item:focus,
  .navbar.is-success .navbar-end > a.navbar-item:hover,
  .navbar.is-success .navbar-end > a.navbar-item.is-active,
  .navbar.is-success .navbar-end .navbar-link:focus,
  .navbar.is-success .navbar-end .navbar-link:hover,
  .navbar.is-success .navbar-end .navbar-link.is-active {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-start .navbar-link::after,
  .navbar.is-success .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-dropdown a.navbar-item.is-active {
    background-color: #48c774;
    color: #fff;
  }
}

.navbar.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand > .navbar-item,
.navbar.is-warning .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand > a.navbar-item:focus, .navbar.is-warning .navbar-brand > a.navbar-item:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active,
.navbar.is-warning .navbar-brand .navbar-link:focus,
.navbar.is-warning .navbar-brand .navbar-link:hover,
.navbar.is-warning .navbar-brand .navbar-link.is-active {
  background-color: #ffd83d;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (min-width: 1024px) {
  .navbar.is-warning .navbar-start > .navbar-item,
  .navbar.is-warning .navbar-start .navbar-link,
  .navbar.is-warning .navbar-end > .navbar-item,
  .navbar.is-warning .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start > a.navbar-item:focus, .navbar.is-warning .navbar-start > a.navbar-item:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active,
  .navbar.is-warning .navbar-start .navbar-link:focus,
  .navbar.is-warning .navbar-start .navbar-link:hover,
  .navbar.is-warning .navbar-start .navbar-link.is-active,
  .navbar.is-warning .navbar-end > a.navbar-item:focus,
  .navbar.is-warning .navbar-end > a.navbar-item:hover,
  .navbar.is-warning .navbar-end > a.navbar-item.is-active,
  .navbar.is-warning .navbar-end .navbar-link:focus,
  .navbar.is-warning .navbar-end .navbar-link:hover,
  .navbar.is-warning .navbar-end .navbar-link.is-active {
    background-color: #ffd83d;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start .navbar-link::after,
  .navbar.is-warning .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #ffd83d;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-dropdown a.navbar-item.is-active {
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
  }
}

.navbar.is-danger {
  background-color: #f14668;
  color: #fff;
}

.navbar.is-danger .navbar-brand > .navbar-item,
.navbar.is-danger .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-danger .navbar-brand > a.navbar-item:focus, .navbar.is-danger .navbar-brand > a.navbar-item:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active,
.navbar.is-danger .navbar-brand .navbar-link:focus,
.navbar.is-danger .navbar-brand .navbar-link:hover,
.navbar.is-danger .navbar-brand .navbar-link.is-active {
  background-color: #ef2e55;
  color: #fff;
}

.navbar.is-danger .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-danger .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-danger .navbar-start > .navbar-item,
  .navbar.is-danger .navbar-start .navbar-link,
  .navbar.is-danger .navbar-end > .navbar-item,
  .navbar.is-danger .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-danger .navbar-start > a.navbar-item:focus, .navbar.is-danger .navbar-start > a.navbar-item:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active,
  .navbar.is-danger .navbar-start .navbar-link:focus,
  .navbar.is-danger .navbar-start .navbar-link:hover,
  .navbar.is-danger .navbar-start .navbar-link.is-active,
  .navbar.is-danger .navbar-end > a.navbar-item:focus,
  .navbar.is-danger .navbar-end > a.navbar-item:hover,
  .navbar.is-danger .navbar-end > a.navbar-item.is-active,
  .navbar.is-danger .navbar-end .navbar-link:focus,
  .navbar.is-danger .navbar-end .navbar-link:hover,
  .navbar.is-danger .navbar-end .navbar-link.is-active {
    background-color: #ef2e55;
    color: #fff;
  }
  .navbar.is-danger .navbar-start .navbar-link::after,
  .navbar.is-danger .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #ef2e55;
    color: #fff;
  }
  .navbar.is-danger .navbar-dropdown a.navbar-item.is-active {
    background-color: #f14668;
    color: #fff;
  }
}

.navbar > .container {
  align-items: stretch;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}

.navbar.has-shadow {
  box-shadow: 0 2px 0 0 whitesmoke;
}

.navbar.is-fixed-bottom, .navbar.is-fixed-top {
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}

.navbar.is-fixed-bottom {
  bottom: 0;
}

.navbar.is-fixed-bottom.has-shadow {
  box-shadow: 0 -2px 0 0 whitesmoke;
}

.navbar.is-fixed-top {
  top: 0;
}

html.has-navbar-fixed-top,
body.has-navbar-fixed-top {
  padding-top: 3.25rem;
}

html.has-navbar-fixed-bottom,
body.has-navbar-fixed-bottom {
  padding-bottom: 3.25rem;
}

.navbar-brand,
.navbar-tabs {
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}

.navbar-brand a.navbar-item:focus, .navbar-brand a.navbar-item:hover {
  background-color: transparent;
}

.navbar-tabs {
  -webkit-overflow-scrolling: touch;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
}

.navbar-burger {
  color: #4a4a4a;
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
}

.navbar-burger span {
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-out;
  width: 16px;
}

.navbar-burger span:nth-child(1) {
  top: calc(50% - 6px);
}

.navbar-burger span:nth-child(2) {
  top: calc(50% - 1px);
}

.navbar-burger span:nth-child(3) {
  top: calc(50% + 4px);
}

.navbar-burger:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.navbar-burger.is-active span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
}

.navbar-menu {
  display: none;
}

.navbar-item,
.navbar-link {
  color: #4a4a4a;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
}

.navbar-item .icon:only-child,
.navbar-link .icon:only-child {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

a.navbar-item,
.navbar-link {
  cursor: pointer;
}

a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: #fafafa;
  color: #3273dc;
}

.navbar-item {
  flex-grow: 0;
  flex-shrink: 0;
}

.navbar-item img {
  max-height: 1.75rem;
}

.navbar-item.has-dropdown {
  padding: 0;
}

.navbar-item.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.navbar-item.is-tab {
  border-bottom: 1px solid transparent;
  min-height: 3.25rem;
  padding-bottom: calc(0.5rem - 1px);
}

.navbar-item.is-tab:focus, .navbar-item.is-tab:hover {
  background-color: transparent;
  border-bottom-color: #3273dc;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #3273dc;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: #3273dc;
  padding-bottom: calc(0.5rem - 3px);
}

.navbar-content {
  flex-grow: 1;
  flex-shrink: 1;
}

.navbar-link:not(.is-arrowless) {
  padding-right: 2.5em;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: #3273dc;
  margin-top: -0.375em;
  right: 1.125em;
}

.navbar-dropdown {
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.navbar-dropdown .navbar-item {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.navbar-divider {
  background-color: whitesmoke;
  border: none;
  display: none;
  height: 2px;
  margin: 0.5rem 0;
}

@media screen and (max-width: 1023px) {
  .navbar > .container {
    display: block;
  }
  .navbar-brand .navbar-item,
  .navbar-tabs .navbar-item {
    align-items: center;
    display: flex;
  }
  .navbar-link::after {
    display: none;
  }
  .navbar-menu {
    background-color: white;
    box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
    padding: 0.5rem 0;
  }
  .navbar-menu.is-active {
    display: block;
  }
  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-touch {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-touch.has-shadow {
    box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-touch {
    top: 0;
  }
  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 3.25rem);
    overflow: auto;
  }
  html.has-navbar-fixed-top-touch,
  body.has-navbar-fixed-top-touch {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-touch,
  body.has-navbar-fixed-bottom-touch {
    padding-bottom: 3.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .navbar,
  .navbar-menu,
  .navbar-start,
  .navbar-end {
    align-items: stretch;
    display: flex;
  }
  .navbar {
    min-height: 3.25rem;
  }
  .navbar.is-spaced {
    padding: 1rem 2rem;
  }
  .navbar.is-spaced .navbar-start,
  .navbar.is-spaced .navbar-end {
    align-items: center;
  }
  .navbar.is-spaced a.navbar-item,
  .navbar.is-spaced .navbar-link {
    border-radius: 4px;
  }
  .navbar.is-transparent a.navbar-item:focus, .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,
  .navbar.is-transparent .navbar-link:focus,
  .navbar.is-transparent .navbar-link:hover,
  .navbar.is-transparent .navbar-link.is-active {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item:focus, .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #3273dc;
  }
  .navbar-burger {
    display: none;
  }
  .navbar-item,
  .navbar-link {
    align-items: center;
    display: flex;
  }
  .navbar-item.has-dropdown {
    align-items: stretch;
  }
  .navbar-item.has-dropdown-up .navbar-link::after {
    transform: rotate(135deg) translate(0.25em, -0.25em);
  }
  .navbar-item.has-dropdown-up .navbar-dropdown {
    border-bottom: 2px solid #dbdbdb;
    border-radius: 6px 6px 0 0;
    border-top: none;
    bottom: 100%;
    box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);
    top: auto;
  }
  .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block;
  }
  .navbar.is-spaced .navbar-item.is-active .navbar-dropdown, .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .navbar-menu {
    flex-grow: 1;
    flex-shrink: 0;
  }
  .navbar-start {
    justify-content: flex-start;
    margin-right: auto;
  }
  .navbar-end {
    justify-content: flex-end;
    margin-left: auto;
  }
  .navbar-dropdown {
    background-color: white;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
    display: none;
    font-size: 0.875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;
  }
  .navbar-dropdown .navbar-item {
    padding: 0.375rem 1rem;
    white-space: nowrap;
  }
  .navbar-dropdown a.navbar-item {
    padding-right: 3rem;
  }
  .navbar-dropdown a.navbar-item:focus, .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
  .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #3273dc;
  }
  .navbar.is-spaced .navbar-dropdown, .navbar-dropdown.is-boxed {
    border-radius: 6px;
    border-top: none;
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    display: block;
    opacity: 0;
    pointer-events: none;
    top: calc(100% + (-4px));
    transform: translateY(-5px);
    transition-duration: 86ms;
    transition-property: opacity, transform;
  }
  .navbar-dropdown.is-right {
    left: auto;
    right: 0;
  }
  .navbar-divider {
    display: block;
  }
  .navbar > .container .navbar-brand,
  .container > .navbar .navbar-brand {
    margin-left: -0.75rem;
  }
  .navbar > .container .navbar-menu,
  .container > .navbar .navbar-menu {
    margin-right: -0.75rem;
  }
  .navbar.is-fixed-bottom-desktop, .navbar.is-fixed-top-desktop {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-desktop {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-desktop.has-shadow {
    box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-desktop {
    top: 0;
  }
  html.has-navbar-fixed-top-desktop,
  body.has-navbar-fixed-top-desktop {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-desktop,
  body.has-navbar-fixed-bottom-desktop {
    padding-bottom: 3.25rem;
  }
  html.has-spaced-navbar-fixed-top,
  body.has-spaced-navbar-fixed-top {
    padding-top: 5.25rem;
  }
  html.has-spaced-navbar-fixed-bottom,
  body.has-spaced-navbar-fixed-bottom {
    padding-bottom: 5.25rem;
  }
  a.navbar-item.is-active,
  .navbar-link.is-active {
    color: #0a0a0a;
  }
  a.navbar-item.is-active:not(:focus):not(:hover),
  .navbar-link.is-active:not(:focus):not(:hover) {
    background-color: transparent;
  }
  .navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #fafafa;
  }
}

.hero.is-fullheight-with-navbar {
  min-height: calc(100vh - 3.25rem);
}

.pagination {
  font-size: 1rem;
  margin: -0.25rem;
}

.pagination.is-small {
  font-size: 0.75rem;
}

.pagination.is-medium {
  font-size: 1.25rem;
}

.pagination.is-large {
  font-size: 1.5rem;
}

.pagination.is-rounded .pagination-previous,
.pagination.is-rounded .pagination-next {
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 290486px;
}

.pagination.is-rounded .pagination-link {
  border-radius: 290486px;
}

.pagination,
.pagination-list {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  font-size: 1em;
  justify-content: center;
  margin: 0.25rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link {
  border-color: #dbdbdb;
  color: #363636;
  min-width: 2.5em;
}

.pagination-previous:hover,
.pagination-next:hover,
.pagination-link:hover {
  border-color: #b5b5b5;
  color: #363636;
}

.pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus {
  border-color: #3273dc;
}

.pagination-previous:active,
.pagination-next:active,
.pagination-link:active {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);
}

.pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled] {
  background-color: #dbdbdb;
  border-color: #dbdbdb;
  box-shadow: none;
  color: #7a7a7a;
  opacity: 0.5;
}

.pagination-previous,
.pagination-next {
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}

.pagination-link.is-current {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.pagination-ellipsis {
  color: #b5b5b5;
  pointer-events: none;
}

.pagination-list {
  flex-wrap: wrap;
}

.pagination-list li {
  list-style: none;
}

@media screen and (max-width: 768px) {
  .pagination {
    flex-wrap: wrap;
  }
  .pagination-previous,
  .pagination-next {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .pagination-list li {
    flex-grow: 1;
    flex-shrink: 1;
  }
}

@media screen and (min-width: 769px), print {
  .pagination-list {
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: flex-start;
    order: 1;
  }
  .pagination-previous {
    order: 2;
  }
  .pagination-next {
    order: 3;
  }
  .pagination {
    justify-content: space-between;
  }
  .pagination.is-centered .pagination-previous {
    order: 1;
  }
  .pagination.is-centered .pagination-list {
    justify-content: center;
    order: 2;
  }
  .pagination.is-centered .pagination-next {
    order: 3;
  }
  .pagination.is-right .pagination-previous {
    order: 1;
  }
  .pagination.is-right .pagination-next {
    order: 2;
  }
  .pagination.is-right .pagination-list {
    justify-content: flex-end;
    order: 3;
  }
}

.panel {
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  font-size: 1rem;
}

.panel:not(:last-child) {
  margin-bottom: 1.5rem;
}

.panel.is-white .panel-heading {
  background-color: white;
  color: #0a0a0a;
}

.panel.is-white .panel-tabs a.is-active {
  border-bottom-color: white;
}

.panel.is-white .panel-block.is-active .panel-icon {
  color: white;
}

.panel.is-black .panel-heading {
  background-color: #0a0a0a;
  color: white;
}

.panel.is-black .panel-tabs a.is-active {
  border-bottom-color: #0a0a0a;
}

.panel.is-black .panel-block.is-active .panel-icon {
  color: #0a0a0a;
}

.panel.is-light .panel-heading {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.panel.is-light .panel-tabs a.is-active {
  border-bottom-color: whitesmoke;
}

.panel.is-light .panel-block.is-active .panel-icon {
  color: whitesmoke;
}

.panel.is-dark .panel-heading {
  background-color: #363636;
  color: #fff;
}

.panel.is-dark .panel-tabs a.is-active {
  border-bottom-color: #363636;
}

.panel.is-dark .panel-block.is-active .panel-icon {
  color: #363636;
}

.panel.is-primary .panel-heading {
  background-color: #00d1b2;
  color: #fff;
}

.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: #00d1b2;
}

.panel.is-primary .panel-block.is-active .panel-icon {
  color: #00d1b2;
}

.panel.is-link .panel-heading {
  background-color: #3273dc;
  color: #fff;
}

.panel.is-link .panel-tabs a.is-active {
  border-bottom-color: #3273dc;
}

.panel.is-link .panel-block.is-active .panel-icon {
  color: #3273dc;
}

.panel.is-info .panel-heading {
  background-color: #3298dc;
  color: #fff;
}

.panel.is-info .panel-tabs a.is-active {
  border-bottom-color: #3298dc;
}

.panel.is-info .panel-block.is-active .panel-icon {
  color: #3298dc;
}

.panel.is-success .panel-heading {
  background-color: #48c774;
  color: #fff;
}

.panel.is-success .panel-tabs a.is-active {
  border-bottom-color: #48c774;
}

.panel.is-success .panel-block.is-active .panel-icon {
  color: #48c774;
}

.panel.is-warning .panel-heading {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.panel.is-warning .panel-tabs a.is-active {
  border-bottom-color: #ffdd57;
}

.panel.is-warning .panel-block.is-active .panel-icon {
  color: #ffdd57;
}

.panel.is-danger .panel-heading {
  background-color: #f14668;
  color: #fff;
}

.panel.is-danger .panel-tabs a.is-active {
  border-bottom-color: #f14668;
}

.panel.is-danger .panel-block.is-active .panel-icon {
  color: #f14668;
}

.panel-tabs:not(:last-child),
.panel-block:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.panel-heading {
  background-color: #ededed;
  border-radius: 6px 6px 0 0;
  color: #363636;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.75em 1em;
}

.panel-tabs {
  align-items: flex-end;
  display: flex;
  font-size: 0.875em;
  justify-content: center;
}

.panel-tabs a {
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: -1px;
  padding: 0.5em;
}

.panel-tabs a.is-active {
  border-bottom-color: #4a4a4a;
  color: #363636;
}

.panel-list a {
  color: #4a4a4a;
}

.panel-list a:hover {
  color: #3273dc;
}

.panel-block {
  align-items: center;
  color: #363636;
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 0.75em;
}

.panel-block input[type="checkbox"] {
  margin-right: 0.75em;
}

.panel-block > .control {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
}

.panel-block.is-wrapped {
  flex-wrap: wrap;
}

.panel-block.is-active {
  border-left-color: #3273dc;
  color: #363636;
}

.panel-block.is-active .panel-icon {
  color: #3273dc;
}

.panel-block:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

a.panel-block,
label.panel-block {
  cursor: pointer;
}

a.panel-block:hover,
label.panel-block:hover {
  background-color: whitesmoke;
}

.panel-icon {
  display: inline-block;
  font-size: 14px;
  height: 1em;
  line-height: 1em;
  text-align: center;
  vertical-align: top;
  width: 1em;
  color: #7a7a7a;
  margin-right: 0.75em;
}

.panel-icon .fa {
  font-size: inherit;
  line-height: inherit;
}

.tabs {
  -webkit-overflow-scrolling: touch;
  align-items: stretch;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.tabs a {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  margin-bottom: -1px;
  padding: 0.5em 1em;
  vertical-align: top;
}

.tabs a:hover {
  border-bottom-color: #363636;
  color: #363636;
}

.tabs li {
  display: block;
}

.tabs li.is-active a {
  border-bottom-color: #3273dc;
  color: #3273dc;
}

.tabs ul {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
}

.tabs ul.is-left {
  padding-right: 0.75em;
}

.tabs ul.is-center {
  flex: none;
  justify-content: center;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.tabs ul.is-right {
  justify-content: flex-end;
  padding-left: 0.75em;
}

.tabs .icon:first-child {
  margin-right: 0.5em;
}

.tabs .icon:last-child {
  margin-left: 0.5em;
}

.tabs.is-centered ul {
  justify-content: center;
}

.tabs.is-right ul {
  justify-content: flex-end;
}

.tabs.is-boxed a {
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}

.tabs.is-boxed a:hover {
  background-color: whitesmoke;
  border-bottom-color: #dbdbdb;
}

.tabs.is-boxed li.is-active a {
  background-color: white;
  border-color: #dbdbdb;
  border-bottom-color: transparent !important;
}

.tabs.is-fullwidth li {
  flex-grow: 1;
  flex-shrink: 0;
}

.tabs.is-toggle a {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0;
  position: relative;
}

.tabs.is-toggle a:hover {
  background-color: whitesmoke;
  border-color: #b5b5b5;
  z-index: 2;
}

.tabs.is-toggle li + li {
  margin-left: -1px;
}

.tabs.is-toggle li:first-child a {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.tabs.is-toggle li:last-child a {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.tabs.is-toggle li.is-active a {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
  z-index: 1;
}

.tabs.is-toggle ul {
  border-bottom: none;
}

.tabs.is-toggle.is-toggle-rounded li:first-child a {
  border-bottom-left-radius: 290486px;
  border-top-left-radius: 290486px;
  padding-left: 1.25em;
}

.tabs.is-toggle.is-toggle-rounded li:last-child a {
  border-bottom-right-radius: 290486px;
  border-top-right-radius: 290486px;
  padding-right: 1.25em;
}

.tabs.is-small {
  font-size: 0.75rem;
}

.tabs.is-medium {
  font-size: 1.25rem;
}

.tabs.is-large {
  font-size: 1.5rem;
}

/* Bulma Grid */
.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}

.columns.is-mobile > .column.is-narrow {
  flex: none;
  width: unset;
}

.columns.is-mobile > .column.is-full {
  flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-three-quarters {
  flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-two-thirds {
  flex: none;
  width: 66.6666%;
}

.columns.is-mobile > .column.is-half {
  flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-one-third {
  flex: none;
  width: 33.3333%;
}

.columns.is-mobile > .column.is-one-quarter {
  flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-one-fifth {
  flex: none;
  width: 20%;
}

.columns.is-mobile > .column.is-two-fifths {
  flex: none;
  width: 40%;
}

.columns.is-mobile > .column.is-three-fifths {
  flex: none;
  width: 60%;
}

.columns.is-mobile > .column.is-four-fifths {
  flex: none;
  width: 80%;
}

.columns.is-mobile > .column.is-offset-three-quarters {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-offset-two-thirds {
  margin-left: 66.6666%;
}

.columns.is-mobile > .column.is-offset-half {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-offset-one-third {
  margin-left: 33.3333%;
}

.columns.is-mobile > .column.is-offset-one-quarter {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-offset-one-fifth {
  margin-left: 20%;
}

.columns.is-mobile > .column.is-offset-two-fifths {
  margin-left: 40%;
}

.columns.is-mobile > .column.is-offset-three-fifths {
  margin-left: 60%;
}

.columns.is-mobile > .column.is-offset-four-fifths {
  margin-left: 80%;
}

.columns.is-mobile > .column.is-0 {
  flex: none;
  width: 0%;
}

.columns.is-mobile > .column.is-offset-0 {
  margin-left: 0%;
}

.columns.is-mobile > .column.is-1 {
  flex: none;
  width: 8.33333%;
}

.columns.is-mobile > .column.is-offset-1 {
  margin-left: 8.33333%;
}

.columns.is-mobile > .column.is-2 {
  flex: none;
  width: 16.66667%;
}

.columns.is-mobile > .column.is-offset-2 {
  margin-left: 16.66667%;
}

.columns.is-mobile > .column.is-3 {
  flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-offset-3 {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-4 {
  flex: none;
  width: 33.33333%;
}

.columns.is-mobile > .column.is-offset-4 {
  margin-left: 33.33333%;
}

.columns.is-mobile > .column.is-5 {
  flex: none;
  width: 41.66667%;
}

.columns.is-mobile > .column.is-offset-5 {
  margin-left: 41.66667%;
}

.columns.is-mobile > .column.is-6 {
  flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-offset-6 {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-7 {
  flex: none;
  width: 58.33333%;
}

.columns.is-mobile > .column.is-offset-7 {
  margin-left: 58.33333%;
}

.columns.is-mobile > .column.is-8 {
  flex: none;
  width: 66.66667%;
}

.columns.is-mobile > .column.is-offset-8 {
  margin-left: 66.66667%;
}

.columns.is-mobile > .column.is-9 {
  flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-offset-9 {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-10 {
  flex: none;
  width: 83.33333%;
}

.columns.is-mobile > .column.is-offset-10 {
  margin-left: 83.33333%;
}

.columns.is-mobile > .column.is-11 {
  flex: none;
  width: 91.66667%;
}

.columns.is-mobile > .column.is-offset-11 {
  margin-left: 91.66667%;
}

.columns.is-mobile > .column.is-12 {
  flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-offset-12 {
  margin-left: 100%;
}

@media screen and (max-width: 768px) {
  .column.is-narrow-mobile {
    flex: none;
    width: unset;
  }
  .column.is-full-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-mobile {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-mobile {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-mobile {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-mobile {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-mobile {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-mobile {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-mobile {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-mobile {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-mobile {
    margin-left: 50%;
  }
  .column.is-offset-one-third-mobile {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-mobile {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-mobile {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-mobile {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-mobile {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-mobile {
    margin-left: 80%;
  }
  .column.is-0-mobile {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-mobile {
    margin-left: 0%;
  }
  .column.is-1-mobile {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-mobile {
    margin-left: 8.33333%;
  }
  .column.is-2-mobile {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-mobile {
    margin-left: 16.66667%;
  }
  .column.is-3-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-mobile {
    margin-left: 25%;
  }
  .column.is-4-mobile {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-mobile {
    margin-left: 33.33333%;
  }
  .column.is-5-mobile {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-mobile {
    margin-left: 41.66667%;
  }
  .column.is-6-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-mobile {
    margin-left: 50%;
  }
  .column.is-7-mobile {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-mobile {
    margin-left: 58.33333%;
  }
  .column.is-8-mobile {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-mobile {
    margin-left: 66.66667%;
  }
  .column.is-9-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-mobile {
    margin-left: 75%;
  }
  .column.is-10-mobile {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-mobile {
    margin-left: 83.33333%;
  }
  .column.is-11-mobile {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-mobile {
    margin-left: 91.66667%;
  }
  .column.is-12-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-mobile {
    margin-left: 100%;
  }
}

@media screen and (min-width: 769px), print {
  .column.is-narrow, .column.is-narrow-tablet {
    flex: none;
    width: unset;
  }
  .column.is-full, .column.is-full-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters, .column.is-three-quarters-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds, .column.is-two-thirds-tablet {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half, .column.is-half-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-one-third, .column.is-one-third-tablet {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter, .column.is-one-quarter-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth, .column.is-one-fifth-tablet {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths, .column.is-two-fifths-tablet {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths, .column.is-three-fifths-tablet {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths, .column.is-four-fifths-tablet {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {
    margin-left: 66.6666%;
  }
  .column.is-offset-half, .column.is-offset-half-tablet {
    margin-left: 50%;
  }
  .column.is-offset-one-third, .column.is-offset-one-third-tablet {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {
    margin-left: 80%;
  }
  .column.is-0, .column.is-0-tablet {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0, .column.is-offset-0-tablet {
    margin-left: 0%;
  }
  .column.is-1, .column.is-1-tablet {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1, .column.is-offset-1-tablet {
    margin-left: 8.33333%;
  }
  .column.is-2, .column.is-2-tablet {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2, .column.is-offset-2-tablet {
    margin-left: 16.66667%;
  }
  .column.is-3, .column.is-3-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3, .column.is-offset-3-tablet {
    margin-left: 25%;
  }
  .column.is-4, .column.is-4-tablet {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4, .column.is-offset-4-tablet {
    margin-left: 33.33333%;
  }
  .column.is-5, .column.is-5-tablet {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5, .column.is-offset-5-tablet {
    margin-left: 41.66667%;
  }
  .column.is-6, .column.is-6-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6, .column.is-offset-6-tablet {
    margin-left: 50%;
  }
  .column.is-7, .column.is-7-tablet {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7, .column.is-offset-7-tablet {
    margin-left: 58.33333%;
  }
  .column.is-8, .column.is-8-tablet {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8, .column.is-offset-8-tablet {
    margin-left: 66.66667%;
  }
  .column.is-9, .column.is-9-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9, .column.is-offset-9-tablet {
    margin-left: 75%;
  }
  .column.is-10, .column.is-10-tablet {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10, .column.is-offset-10-tablet {
    margin-left: 83.33333%;
  }
  .column.is-11, .column.is-11-tablet {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11, .column.is-offset-11-tablet {
    margin-left: 91.66667%;
  }
  .column.is-12, .column.is-12-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12, .column.is-offset-12-tablet {
    margin-left: 100%;
  }
}

@media screen and (max-width: 1023px) {
  .column.is-narrow-touch {
    flex: none;
    width: unset;
  }
  .column.is-full-touch {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-touch {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-touch {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-touch {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-touch {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-touch {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-touch {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-touch {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-touch {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-touch {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-touch {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-touch {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-touch {
    margin-left: 50%;
  }
  .column.is-offset-one-third-touch {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-touch {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-touch {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-touch {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-touch {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-touch {
    margin-left: 80%;
  }
  .column.is-0-touch {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-touch {
    margin-left: 0%;
  }
  .column.is-1-touch {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-touch {
    margin-left: 8.33333%;
  }
  .column.is-2-touch {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-touch {
    margin-left: 16.66667%;
  }
  .column.is-3-touch {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-touch {
    margin-left: 25%;
  }
  .column.is-4-touch {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-touch {
    margin-left: 33.33333%;
  }
  .column.is-5-touch {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-touch {
    margin-left: 41.66667%;
  }
  .column.is-6-touch {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-touch {
    margin-left: 50%;
  }
  .column.is-7-touch {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-touch {
    margin-left: 58.33333%;
  }
  .column.is-8-touch {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-touch {
    margin-left: 66.66667%;
  }
  .column.is-9-touch {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-touch {
    margin-left: 75%;
  }
  .column.is-10-touch {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-touch {
    margin-left: 83.33333%;
  }
  .column.is-11-touch {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-touch {
    margin-left: 91.66667%;
  }
  .column.is-12-touch {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-touch {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1024px) {
  .column.is-narrow-desktop {
    flex: none;
    width: unset;
  }
  .column.is-full-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-desktop {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-desktop {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-desktop {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-desktop {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-desktop {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-desktop {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-desktop {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-desktop {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-desktop {
    margin-left: 50%;
  }
  .column.is-offset-one-third-desktop {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-desktop {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-desktop {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-desktop {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-desktop {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-desktop {
    margin-left: 80%;
  }
  .column.is-0-desktop {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-desktop {
    margin-left: 0%;
  }
  .column.is-1-desktop {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-desktop {
    margin-left: 8.33333%;
  }
  .column.is-2-desktop {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-desktop {
    margin-left: 16.66667%;
  }
  .column.is-3-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-desktop {
    margin-left: 25%;
  }
  .column.is-4-desktop {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-desktop {
    margin-left: 33.33333%;
  }
  .column.is-5-desktop {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-desktop {
    margin-left: 41.66667%;
  }
  .column.is-6-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-desktop {
    margin-left: 50%;
  }
  .column.is-7-desktop {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-desktop {
    margin-left: 58.33333%;
  }
  .column.is-8-desktop {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-desktop {
    margin-left: 66.66667%;
  }
  .column.is-9-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-desktop {
    margin-left: 75%;
  }
  .column.is-10-desktop {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-desktop {
    margin-left: 83.33333%;
  }
  .column.is-11-desktop {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-desktop {
    margin-left: 91.66667%;
  }
  .column.is-12-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-desktop {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1216px) {
  .column.is-narrow-widescreen {
    flex: none;
    width: unset;
  }
  .column.is-full-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-widescreen {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-widescreen {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-widescreen {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-widescreen {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-widescreen {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-widescreen {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-widescreen {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-widescreen {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-widescreen {
    margin-left: 50%;
  }
  .column.is-offset-one-third-widescreen {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-widescreen {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-widescreen {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-widescreen {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-widescreen {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-widescreen {
    margin-left: 80%;
  }
  .column.is-0-widescreen {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-widescreen {
    margin-left: 0%;
  }
  .column.is-1-widescreen {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-widescreen {
    margin-left: 8.33333%;
  }
  .column.is-2-widescreen {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-widescreen {
    margin-left: 16.66667%;
  }
  .column.is-3-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-widescreen {
    margin-left: 25%;
  }
  .column.is-4-widescreen {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-widescreen {
    margin-left: 33.33333%;
  }
  .column.is-5-widescreen {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-widescreen {
    margin-left: 41.66667%;
  }
  .column.is-6-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-widescreen {
    margin-left: 50%;
  }
  .column.is-7-widescreen {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-widescreen {
    margin-left: 58.33333%;
  }
  .column.is-8-widescreen {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-widescreen {
    margin-left: 66.66667%;
  }
  .column.is-9-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-widescreen {
    margin-left: 75%;
  }
  .column.is-10-widescreen {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-widescreen {
    margin-left: 83.33333%;
  }
  .column.is-11-widescreen {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-widescreen {
    margin-left: 91.66667%;
  }
  .column.is-12-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-widescreen {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1408px) {
  .column.is-narrow-fullhd {
    flex: none;
    width: unset;
  }
  .column.is-full-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-fullhd {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-fullhd {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-fullhd {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-fullhd {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-fullhd {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-fullhd {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-fullhd {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-fullhd {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-fullhd {
    margin-left: 50%;
  }
  .column.is-offset-one-third-fullhd {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-fullhd {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-fullhd {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-fullhd {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-fullhd {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-fullhd {
    margin-left: 80%;
  }
  .column.is-0-fullhd {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-fullhd {
    margin-left: 0%;
  }
  .column.is-1-fullhd {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-fullhd {
    margin-left: 8.33333%;
  }
  .column.is-2-fullhd {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-fullhd {
    margin-left: 16.66667%;
  }
  .column.is-3-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-fullhd {
    margin-left: 25%;
  }
  .column.is-4-fullhd {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-fullhd {
    margin-left: 33.33333%;
  }
  .column.is-5-fullhd {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-fullhd {
    margin-left: 41.66667%;
  }
  .column.is-6-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-fullhd {
    margin-left: 50%;
  }
  .column.is-7-fullhd {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-fullhd {
    margin-left: 58.33333%;
  }
  .column.is-8-fullhd {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-fullhd {
    margin-left: 66.66667%;
  }
  .column.is-9-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-fullhd {
    margin-left: 75%;
  }
  .column.is-10-fullhd {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-fullhd {
    margin-left: 83.33333%;
  }
  .column.is-11-fullhd {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-fullhd {
    margin-left: 91.66667%;
  }
  .column.is-12-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-fullhd {
    margin-left: 100%;
  }
}

.columns {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.columns:last-child {
  margin-bottom: -0.75rem;
}

.columns:not(:last-child) {
  margin-bottom: calc(1.5rem - 0.75rem);
}

.columns.is-centered {
  justify-content: center;
}

.columns.is-gapless {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

.columns.is-gapless > .column {
  margin: 0;
  padding: 0 !important;
}

.columns.is-gapless:not(:last-child) {
  margin-bottom: 1.5rem;
}

.columns.is-gapless:last-child {
  margin-bottom: 0;
}

.columns.is-mobile {
  display: flex;
}

.columns.is-multiline {
  flex-wrap: wrap;
}

.columns.is-vcentered {
  align-items: center;
}

@media screen and (min-width: 769px), print {
  .columns:not(.is-desktop) {
    display: flex;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-desktop {
    display: flex;
  }
}

.columns.is-variable {
  --columnGap: 0.75rem;
  margin-left: calc(-1 * var(--columnGap));
  margin-right: calc(-1 * var(--columnGap));
}

.columns.is-variable > .column {
  padding-left: var(--columnGap);
  padding-right: var(--columnGap);
}

.columns.is-variable.is-0 {
  --columnGap: 0rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-0-mobile {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-0-tablet {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-0-tablet-only {
    --columnGap: 0rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-0-touch {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-0-desktop {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-0-desktop-only {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-0-widescreen {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-0-widescreen-only {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-0-fullhd {
    --columnGap: 0rem;
  }
}

.columns.is-variable.is-1 {
  --columnGap: 0.25rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-1-mobile {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-1-tablet {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-1-tablet-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-1-touch {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-1-desktop {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-1-desktop-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-1-widescreen {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-1-widescreen-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-1-fullhd {
    --columnGap: 0.25rem;
  }
}

.columns.is-variable.is-2 {
  --columnGap: 0.5rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-2-mobile {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-2-tablet {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-2-tablet-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-2-touch {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-2-desktop {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-2-desktop-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-2-widescreen {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-2-widescreen-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-2-fullhd {
    --columnGap: 0.5rem;
  }
}

.columns.is-variable.is-3 {
  --columnGap: 0.75rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-3-mobile {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-3-tablet {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-3-tablet-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-3-touch {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-3-desktop {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-3-desktop-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-3-widescreen {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-3-widescreen-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-3-fullhd {
    --columnGap: 0.75rem;
  }
}

.columns.is-variable.is-4 {
  --columnGap: 1rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-4-mobile {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-4-tablet {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-4-tablet-only {
    --columnGap: 1rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-4-touch {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-4-desktop {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-4-desktop-only {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-4-widescreen {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-4-widescreen-only {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-4-fullhd {
    --columnGap: 1rem;
  }
}

.columns.is-variable.is-5 {
  --columnGap: 1.25rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-5-mobile {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-5-tablet {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-5-tablet-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-5-touch {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-5-desktop {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-5-desktop-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-5-widescreen {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-5-widescreen-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-5-fullhd {
    --columnGap: 1.25rem;
  }
}

.columns.is-variable.is-6 {
  --columnGap: 1.5rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-6-mobile {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-6-tablet {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-6-tablet-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-6-touch {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-6-desktop {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-6-desktop-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-6-widescreen {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-6-widescreen-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-6-fullhd {
    --columnGap: 1.5rem;
  }
}

.columns.is-variable.is-7 {
  --columnGap: 1.75rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-7-mobile {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-7-tablet {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-7-tablet-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-7-touch {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-7-desktop {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-7-desktop-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-7-widescreen {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-7-widescreen-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-7-fullhd {
    --columnGap: 1.75rem;
  }
}

.columns.is-variable.is-8 {
  --columnGap: 2rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-8-mobile {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-8-tablet {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-8-tablet-only {
    --columnGap: 2rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-8-touch {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-8-desktop {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-8-desktop-only {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-8-widescreen {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-8-widescreen-only {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-8-fullhd {
    --columnGap: 2rem;
  }
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor:not(:last-child) {
  margin-bottom: 0.75rem;
}

.tile.is-child {
  margin: 0 !important;
}

.tile.is-parent {
  padding: 0.75rem;
}

.tile.is-vertical {
  flex-direction: column;
}

.tile.is-vertical > .tile.is-child:not(:last-child) {
  margin-bottom: 1.5rem !important;
}

@media screen and (min-width: 769px), print {
  .tile:not(.is-child) {
    display: flex;
  }
  .tile.is-1 {
    flex: none;
    width: 8.33333%;
  }
  .tile.is-2 {
    flex: none;
    width: 16.66667%;
  }
  .tile.is-3 {
    flex: none;
    width: 25%;
  }
  .tile.is-4 {
    flex: none;
    width: 33.33333%;
  }
  .tile.is-5 {
    flex: none;
    width: 41.66667%;
  }
  .tile.is-6 {
    flex: none;
    width: 50%;
  }
  .tile.is-7 {
    flex: none;
    width: 58.33333%;
  }
  .tile.is-8 {
    flex: none;
    width: 66.66667%;
  }
  .tile.is-9 {
    flex: none;
    width: 75%;
  }
  .tile.is-10 {
    flex: none;
    width: 83.33333%;
  }
  .tile.is-11 {
    flex: none;
    width: 91.66667%;
  }
  .tile.is-12 {
    flex: none;
    width: 100%;
  }
}

/* Bulma Helpers */
.has-text-white {
  color: white !important;
}

a.has-text-white:hover, a.has-text-white:focus {
  color: #e6e6e6 !important;
}

.has-background-white {
  background-color: white !important;
}

.has-text-black {
  color: #0a0a0a !important;
}

a.has-text-black:hover, a.has-text-black:focus {
  color: black !important;
}

.has-background-black {
  background-color: #0a0a0a !important;
}

.has-text-light {
  color: whitesmoke !important;
}

a.has-text-light:hover, a.has-text-light:focus {
  color: #dbdbdb !important;
}

.has-background-light {
  background-color: whitesmoke !important;
}

.has-text-dark {
  color: #363636 !important;
}

a.has-text-dark:hover, a.has-text-dark:focus {
  color: #1c1c1c !important;
}

.has-background-dark {
  background-color: #363636 !important;
}

.has-text-primary {
  color: #00d1b2 !important;
}

a.has-text-primary:hover, a.has-text-primary:focus {
  color: #009e86 !important;
}

.has-background-primary {
  background-color: #00d1b2 !important;
}

.has-text-primary-light {
  color: #ebfffc !important;
}

a.has-text-primary-light:hover, a.has-text-primary-light:focus {
  color: #b8fff4 !important;
}

.has-background-primary-light {
  background-color: #ebfffc !important;
}

.has-text-primary-dark {
  color: #00947e !important;
}

a.has-text-primary-dark:hover, a.has-text-primary-dark:focus {
  color: #00c7a9 !important;
}

.has-background-primary-dark {
  background-color: #00947e !important;
}

.has-text-link {
  color: #3273dc !important;
}

a.has-text-link:hover, a.has-text-link:focus {
  color: #205bbc !important;
}

.has-background-link {
  background-color: #3273dc !important;
}

.has-text-link-light {
  color: #eef3fc !important;
}

a.has-text-link-light:hover, a.has-text-link-light:focus {
  color: #c2d5f5 !important;
}

.has-background-link-light {
  background-color: #eef3fc !important;
}

.has-text-link-dark {
  color: #2160c4 !important;
}

a.has-text-link-dark:hover, a.has-text-link-dark:focus {
  color: #3b79de !important;
}

.has-background-link-dark {
  background-color: #2160c4 !important;
}

.has-text-info {
  color: #3298dc !important;
}

a.has-text-info:hover, a.has-text-info:focus {
  color: #207dbc !important;
}

.has-background-info {
  background-color: #3298dc !important;
}

.has-text-info-light {
  color: #eef6fc !important;
}

a.has-text-info-light:hover, a.has-text-info-light:focus {
  color: #c2e0f5 !important;
}

.has-background-info-light {
  background-color: #eef6fc !important;
}

.has-text-info-dark {
  color: #1d72aa !important;
}

a.has-text-info-dark:hover, a.has-text-info-dark:focus {
  color: #248fd6 !important;
}

.has-background-info-dark {
  background-color: #1d72aa !important;
}

.has-text-success {
  color: #48c774 !important;
}

a.has-text-success:hover, a.has-text-success:focus {
  color: #34a85c !important;
}

.has-background-success {
  background-color: #48c774 !important;
}

.has-text-success-light {
  color: #effaf3 !important;
}

a.has-text-success-light:hover, a.has-text-success-light:focus {
  color: #c8eed6 !important;
}

.has-background-success-light {
  background-color: #effaf3 !important;
}

.has-text-success-dark {
  color: #257942 !important;
}

a.has-text-success-dark:hover, a.has-text-success-dark:focus {
  color: #31a058 !important;
}

.has-background-success-dark {
  background-color: #257942 !important;
}

.has-text-warning {
  color: #ffdd57 !important;
}

a.has-text-warning:hover, a.has-text-warning:focus {
  color: #ffd324 !important;
}

.has-background-warning {
  background-color: #ffdd57 !important;
}

.has-text-warning-light {
  color: #fffbeb !important;
}

a.has-text-warning-light:hover, a.has-text-warning-light:focus {
  color: #fff1b8 !important;
}

.has-background-warning-light {
  background-color: #fffbeb !important;
}

.has-text-warning-dark {
  color: #947600 !important;
}

a.has-text-warning-dark:hover, a.has-text-warning-dark:focus {
  color: #c79f00 !important;
}

.has-background-warning-dark {
  background-color: #947600 !important;
}

.has-text-danger {
  color: #f14668 !important;
}

a.has-text-danger:hover, a.has-text-danger:focus {
  color: #ee1742 !important;
}

.has-background-danger {
  background-color: #f14668 !important;
}

.has-text-danger-light {
  color: #feecf0 !important;
}

a.has-text-danger-light:hover, a.has-text-danger-light:focus {
  color: #fabdc9 !important;
}

.has-background-danger-light {
  background-color: #feecf0 !important;
}

.has-text-danger-dark {
  color: #cc0f35 !important;
}

a.has-text-danger-dark:hover, a.has-text-danger-dark:focus {
  color: #ee2049 !important;
}

.has-background-danger-dark {
  background-color: #cc0f35 !important;
}

.has-text-black-bis {
  color: #121212 !important;
}

.has-background-black-bis {
  background-color: #121212 !important;
}

.has-text-black-ter {
  color: #242424 !important;
}

.has-background-black-ter {
  background-color: #242424 !important;
}

.has-text-grey-darker {
  color: #363636 !important;
}

.has-background-grey-darker {
  background-color: #363636 !important;
}

.has-text-grey-dark {
  color: #4a4a4a !important;
}

.has-background-grey-dark {
  background-color: #4a4a4a !important;
}

.has-text-grey {
  color: #7a7a7a !important;
}

.has-background-grey {
  background-color: #7a7a7a !important;
}

.has-text-grey-light {
  color: #b5b5b5 !important;
}

.has-background-grey-light {
  background-color: #b5b5b5 !important;
}

.has-text-grey-lighter {
  color: #dbdbdb !important;
}

.has-background-grey-lighter {
  background-color: #dbdbdb !important;
}

.has-text-white-ter {
  color: whitesmoke !important;
}

.has-background-white-ter {
  background-color: whitesmoke !important;
}

.has-text-white-bis {
  color: #fafafa !important;
}

.has-background-white-bis {
  background-color: #fafafa !important;
}

.is-flex-direction-row {
  flex-direction: row !important;
}

.is-flex-direction-row-reverse {
  flex-direction: row-reverse !important;
}

.is-flex-direction-column {
  flex-direction: column !important;
}

.is-flex-direction-column-reverse {
  flex-direction: column-reverse !important;
}

.is-flex-wrap-nowrap {
  flex-wrap: nowrap !important;
}

.is-flex-wrap-wrap {
  flex-wrap: wrap !important;
}

.is-flex-wrap-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}

.is-justify-content-flex-start {
  justify-content: flex-start !important;
}

.is-justify-content-flex-end {
  justify-content: flex-end !important;
}

.is-justify-content-center {
  justify-content: center !important;
}

.is-justify-content-space-between {
  justify-content: space-between !important;
}

.is-justify-content-space-around {
  justify-content: space-around !important;
}

.is-justify-content-space-evenly {
  justify-content: space-evenly !important;
}

.is-justify-content-start {
  justify-content: start !important;
}

.is-justify-content-end {
  justify-content: end !important;
}

.is-justify-content-left {
  justify-content: left !important;
}

.is-justify-content-right {
  justify-content: right !important;
}

.is-align-content-flex-start {
  align-content: flex-start !important;
}

.is-align-content-flex-end {
  align-content: flex-end !important;
}

.is-align-content-center {
  align-content: center !important;
}

.is-align-content-space-between {
  align-content: space-between !important;
}

.is-align-content-space-around {
  align-content: space-around !important;
}

.is-align-content-space-evenly {
  align-content: space-evenly !important;
}

.is-align-content-stretch {
  align-content: stretch !important;
}

.is-align-content-start {
  align-content: start !important;
}

.is-align-content-end {
  align-content: end !important;
}

.is-align-content-baseline {
  align-content: baseline !important;
}

.is-align-items-stretch {
  align-items: stretch !important;
}

.is-align-items-flex-start {
  align-items: flex-start !important;
}

.is-align-items-flex-end {
  align-items: flex-end !important;
}

.is-align-items-center {
  align-items: center !important;
}

.is-align-items-baseline {
  align-items: baseline !important;
}

.is-align-items-start {
  align-items: start !important;
}

.is-align-items-end {
  align-items: end !important;
}

.is-align-items-self-start {
  align-items: self-start !important;
}

.is-align-items-self-end {
  align-items: self-end !important;
}

.is-align-self-auto {
  align-self: auto !important;
}

.is-align-self-flex-start {
  align-self: flex-start !important;
}

.is-align-self-flex-end {
  align-self: flex-end !important;
}

.is-align-self-center {
  align-self: center !important;
}

.is-align-self-baseline {
  align-self: baseline !important;
}

.is-align-self-stretch {
  align-self: stretch !important;
}

.is-flex-grow-0 {
  flex-grow: 0 !important;
}

.is-flex-grow-1 {
  flex-grow: 1 !important;
}

.is-flex-grow-2 {
  flex-grow: 2 !important;
}

.is-flex-grow-3 {
  flex-grow: 3 !important;
}

.is-flex-grow-4 {
  flex-grow: 4 !important;
}

.is-flex-grow-5 {
  flex-grow: 5 !important;
}

.is-flex-shrink-0 {
  flex-shrink: 0 !important;
}

.is-flex-shrink-1 {
  flex-shrink: 1 !important;
}

.is-flex-shrink-2 {
  flex-shrink: 2 !important;
}

.is-flex-shrink-3 {
  flex-shrink: 3 !important;
}

.is-flex-shrink-4 {
  flex-shrink: 4 !important;
}

.is-flex-shrink-5 {
  flex-shrink: 5 !important;
}

.is-clearfix::after {
  clear: both;
  content: " ";
  display: table;
}

.is-pulled-left {
  float: left !important;
}

.is-pulled-right {
  float: right !important;
}

.is-radiusless {
  border-radius: 0 !important;
}

.is-shadowless {
  box-shadow: none !important;
}

.is-clickable {
  cursor: pointer !important;
  pointer-events: all !important;
}

.is-clipped {
  overflow: hidden !important;
}

.is-relative {
  position: relative !important;
}

.is-marginless {
  margin: 0 !important;
}

.is-paddingless {
  padding: 0 !important;
}

.m-0 {
  margin: 0 !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mr-0 {
  margin-right: 0 !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.ml-0 {
  margin-left: 0 !important;
}

.mx-0 {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mr-1 {
  margin-right: 0.25rem !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.ml-1 {
  margin-left: 0.25rem !important;
}

.mx-1 {
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

.mx-2 {
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.m-3 {
  margin: 0.75rem !important;
}

.mt-3 {
  margin-top: 0.75rem !important;
}

.mr-3 {
  margin-right: 0.75rem !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}

.ml-3 {
  margin-left: 0.75rem !important;
}

.mx-3 {
  margin-left: 0.75rem !important;
  margin-right: 0.75rem !important;
}

.my-3 {
  margin-top: 0.75rem !important;
  margin-bottom: 0.75rem !important;
}

.m-4 {
  margin: 1rem !important;
}

.mt-4 {
  margin-top: 1rem !important;
}

.mr-4 {
  margin-right: 1rem !important;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.ml-4 {
  margin-left: 1rem !important;
}

.mx-4 {
  margin-left: 1rem !important;
  margin-right: 1rem !important;
}

.my-4 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.m-5 {
  margin: 1.5rem !important;
}

.mt-5 {
  margin-top: 1.5rem !important;
}

.mr-5 {
  margin-right: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 1.5rem !important;
}

.ml-5 {
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-left: 1.5rem !important;
  margin-right: 1.5rem !important;
}

.my-5 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.m-6 {
  margin: 3rem !important;
}

.mt-6 {
  margin-top: 3rem !important;
}

.mr-6 {
  margin-right: 3rem !important;
}

.mb-6 {
  margin-bottom: 3rem !important;
}

.ml-6 {
  margin-left: 3rem !important;
}

.mx-6 {
  margin-left: 3rem !important;
  margin-right: 3rem !important;
}

.my-6 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.p-0 {
  padding: 0 !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pr-0 {
  padding-right: 0 !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pl-0 {
  padding-left: 0 !important;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pr-1 {
  padding-right: 0.25rem !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pl-1 {
  padding-left: 0.25rem !important;
}

.px-1 {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pr-2 {
  padding-right: 0.5rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2 {
  padding-left: 0.5rem !important;
}

.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.p-3 {
  padding: 0.75rem !important;
}

.pt-3 {
  padding-top: 0.75rem !important;
}

.pr-3 {
  padding-right: 0.75rem !important;
}

.pb-3 {
  padding-bottom: 0.75rem !important;
}

.pl-3 {
  padding-left: 0.75rem !important;
}

.px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.py-3 {
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

.p-4 {
  padding: 1rem !important;
}

.pt-4 {
  padding-top: 1rem !important;
}

.pr-4 {
  padding-right: 1rem !important;
}

.pb-4 {
  padding-bottom: 1rem !important;
}

.pl-4 {
  padding-left: 1rem !important;
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.py-4 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.p-5 {
  padding: 1.5rem !important;
}

.pt-5 {
  padding-top: 1.5rem !important;
}

.pr-5 {
  padding-right: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 1.5rem !important;
}

.pl-5 {
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.py-5 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.p-6 {
  padding: 3rem !important;
}

.pt-6 {
  padding-top: 3rem !important;
}

.pr-6 {
  padding-right: 3rem !important;
}

.pb-6 {
  padding-bottom: 3rem !important;
}

.pl-6 {
  padding-left: 3rem !important;
}

.px-6 {
  padding-left: 3rem !important;
  padding-right: 3rem !important;
}

.py-6 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.is-size-1 {
  font-size: 3rem !important;
}

.is-size-2 {
  font-size: 2.5rem !important;
}

.is-size-3 {
  font-size: 2rem !important;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.is-size-6 {
  font-size: 1rem !important;
}

.is-size-7 {
  font-size: 0.75rem !important;
}

@media screen and (max-width: 768px) {
  .is-size-1-mobile {
    font-size: 3rem !important;
  }
  .is-size-2-mobile {
    font-size: 2.5rem !important;
  }
  .is-size-3-mobile {
    font-size: 2rem !important;
  }
  .is-size-4-mobile {
    font-size: 1.5rem !important;
  }
  .is-size-5-mobile {
    font-size: 1.25rem !important;
  }
  .is-size-6-mobile {
    font-size: 1rem !important;
  }
  .is-size-7-mobile {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-size-1-tablet {
    font-size: 3rem !important;
  }
  .is-size-2-tablet {
    font-size: 2.5rem !important;
  }
  .is-size-3-tablet {
    font-size: 2rem !important;
  }
  .is-size-4-tablet {
    font-size: 1.5rem !important;
  }
  .is-size-5-tablet {
    font-size: 1.25rem !important;
  }
  .is-size-6-tablet {
    font-size: 1rem !important;
  }
  .is-size-7-tablet {
    font-size: 0.75rem !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-size-1-touch {
    font-size: 3rem !important;
  }
  .is-size-2-touch {
    font-size: 2.5rem !important;
  }
  .is-size-3-touch {
    font-size: 2rem !important;
  }
  .is-size-4-touch {
    font-size: 1.5rem !important;
  }
  .is-size-5-touch {
    font-size: 1.25rem !important;
  }
  .is-size-6-touch {
    font-size: 1rem !important;
  }
  .is-size-7-touch {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-size-1-desktop {
    font-size: 3rem !important;
  }
  .is-size-2-desktop {
    font-size: 2.5rem !important;
  }
  .is-size-3-desktop {
    font-size: 2rem !important;
  }
  .is-size-4-desktop {
    font-size: 1.5rem !important;
  }
  .is-size-5-desktop {
    font-size: 1.25rem !important;
  }
  .is-size-6-desktop {
    font-size: 1rem !important;
  }
  .is-size-7-desktop {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-size-1-widescreen {
    font-size: 3rem !important;
  }
  .is-size-2-widescreen {
    font-size: 2.5rem !important;
  }
  .is-size-3-widescreen {
    font-size: 2rem !important;
  }
  .is-size-4-widescreen {
    font-size: 1.5rem !important;
  }
  .is-size-5-widescreen {
    font-size: 1.25rem !important;
  }
  .is-size-6-widescreen {
    font-size: 1rem !important;
  }
  .is-size-7-widescreen {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-size-1-fullhd {
    font-size: 3rem !important;
  }
  .is-size-2-fullhd {
    font-size: 2.5rem !important;
  }
  .is-size-3-fullhd {
    font-size: 2rem !important;
  }
  .is-size-4-fullhd {
    font-size: 1.5rem !important;
  }
  .is-size-5-fullhd {
    font-size: 1.25rem !important;
  }
  .is-size-6-fullhd {
    font-size: 1rem !important;
  }
  .is-size-7-fullhd {
    font-size: 0.75rem !important;
  }
}

.has-text-centered {
  text-align: center !important;
}

.has-text-justified {
  text-align: justify !important;
}

.has-text-left {
  text-align: left !important;
}

.has-text-right {
  text-align: right !important;
}

@media screen and (max-width: 768px) {
  .has-text-centered-mobile {
    text-align: center !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-centered-tablet {
    text-align: center !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-centered-tablet-only {
    text-align: center !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-centered-touch {
    text-align: center !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-centered-desktop {
    text-align: center !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-centered-desktop-only {
    text-align: center !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-centered-widescreen {
    text-align: center !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-centered-widescreen-only {
    text-align: center !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-centered-fullhd {
    text-align: center !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-justified-mobile {
    text-align: justify !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-justified-tablet {
    text-align: justify !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-justified-tablet-only {
    text-align: justify !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-justified-touch {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-justified-desktop {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-justified-desktop-only {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-justified-widescreen {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-justified-widescreen-only {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-justified-fullhd {
    text-align: justify !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-left-mobile {
    text-align: left !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-left-tablet {
    text-align: left !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-left-tablet-only {
    text-align: left !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-left-touch {
    text-align: left !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-left-desktop {
    text-align: left !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-left-desktop-only {
    text-align: left !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-left-widescreen {
    text-align: left !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-left-widescreen-only {
    text-align: left !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-left-fullhd {
    text-align: left !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-right-mobile {
    text-align: right !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-right-tablet {
    text-align: right !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-right-tablet-only {
    text-align: right !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-right-touch {
    text-align: right !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-right-desktop {
    text-align: right !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-right-desktop-only {
    text-align: right !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-right-widescreen {
    text-align: right !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-right-widescreen-only {
    text-align: right !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-right-fullhd {
    text-align: right !important;
  }
}

.is-capitalized {
  text-transform: capitalize !important;
}

.is-lowercase {
  text-transform: lowercase !important;
}

.is-uppercase {
  text-transform: uppercase !important;
}

.is-italic {
  font-style: italic !important;
}

.has-text-weight-light {
  font-weight: 300 !important;
}

.has-text-weight-normal {
  font-weight: 400 !important;
}

.has-text-weight-medium {
  font-weight: 500 !important;
}

.has-text-weight-semibold {
  font-weight: 600 !important;
}

.has-text-weight-bold {
  font-weight: 700 !important;
}

.is-family-primary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-secondary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-sans-serif {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-monospace {
  font-family: monospace !important;
}

.is-family-code {
  font-family: monospace !important;
}

.is-block {
  display: block !important;
}

@media screen and (max-width: 768px) {
  .is-block-mobile {
    display: block !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-block-tablet {
    display: block !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-block-tablet-only {
    display: block !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-block-touch {
    display: block !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-block-desktop {
    display: block !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-block-desktop-only {
    display: block !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-block-widescreen {
    display: block !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-block-widescreen-only {
    display: block !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-block-fullhd {
    display: block !important;
  }
}

.is-flex {
  display: flex !important;
}

@media screen and (max-width: 768px) {
  .is-flex-mobile {
    display: flex !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-flex-tablet {
    display: flex !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-flex-tablet-only {
    display: flex !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-flex-touch {
    display: flex !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-flex-desktop {
    display: flex !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-flex-desktop-only {
    display: flex !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-flex-widescreen {
    display: flex !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-flex-widescreen-only {
    display: flex !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-flex-fullhd {
    display: flex !important;
  }
}

.is-inline {
  display: inline !important;
}

@media screen and (max-width: 768px) {
  .is-inline-mobile {
    display: inline !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-tablet {
    display: inline !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-tablet-only {
    display: inline !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-touch {
    display: inline !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-desktop {
    display: inline !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-desktop-only {
    display: inline !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-widescreen {
    display: inline !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-widescreen-only {
    display: inline !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-fullhd {
    display: inline !important;
  }
}

.is-inline-block {
  display: inline-block !important;
}

@media screen and (max-width: 768px) {
  .is-inline-block-mobile {
    display: inline-block !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-block-tablet {
    display: inline-block !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-block-tablet-only {
    display: inline-block !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-block-touch {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-block-desktop {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-block-desktop-only {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-block-widescreen {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-block-widescreen-only {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-block-fullhd {
    display: inline-block !important;
  }
}

.is-inline-flex {
  display: inline-flex !important;
}

@media screen and (max-width: 768px) {
  .is-inline-flex-mobile {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-flex-tablet {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-flex-tablet-only {
    display: inline-flex !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-flex-touch {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-flex-desktop {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-flex-desktop-only {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-flex-widescreen {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-flex-widescreen-only {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-flex-fullhd {
    display: inline-flex !important;
  }
}

.is-hidden {
  display: none !important;
}

.is-sr-only {
  border: none !important;
  clip: rect(0, 0, 0, 0) !important;
  height: 0.01em !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 0.01em !important;
}

@media screen and (max-width: 768px) {
  .is-hidden-mobile {
    display: none !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-hidden-tablet {
    display: none !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-hidden-tablet-only {
    display: none !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-hidden-touch {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-hidden-desktop {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-hidden-desktop-only {
    display: none !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-hidden-widescreen {
    display: none !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-hidden-widescreen-only {
    display: none !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-hidden-fullhd {
    display: none !important;
  }
}

.is-invisible {
  visibility: hidden !important;
}

@media screen and (max-width: 768px) {
  .is-invisible-mobile {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-invisible-tablet {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-invisible-tablet-only {
    visibility: hidden !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-invisible-touch {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-invisible-desktop {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-invisible-desktop-only {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-invisible-widescreen {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-invisible-widescreen-only {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-invisible-fullhd {
    visibility: hidden !important;
  }
}

/* Bulma Layout */
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero .navbar {
  background: none;
}

.hero .tabs ul {
  border-bottom: none;
}

.hero.is-white {
  background-color: white;
  color: #0a0a0a;
}

.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-white strong {
  color: inherit;
}

.hero.is-white .title {
  color: #0a0a0a;
}

.hero.is-white .subtitle {
  color: rgba(10, 10, 10, 0.9);
}

.hero.is-white .subtitle a:not(.button),
.hero.is-white .subtitle strong {
  color: #0a0a0a;
}

@media screen and (max-width: 1023px) {
  .hero.is-white .navbar-menu {
    background-color: white;
  }
}

.hero.is-white .navbar-item,
.hero.is-white .navbar-link {
  color: rgba(10, 10, 10, 0.7);
}

.hero.is-white a.navbar-item:hover, .hero.is-white a.navbar-item.is-active,
.hero.is-white .navbar-link:hover,
.hero.is-white .navbar-link.is-active {
  background-color: #f2f2f2;
  color: #0a0a0a;
}

.hero.is-white .tabs a {
  color: #0a0a0a;
  opacity: 0.9;
}

.hero.is-white .tabs a:hover {
  opacity: 1;
}

.hero.is-white .tabs li.is-active a {
  opacity: 1;
}

.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {
  color: #0a0a0a;
}

.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.hero.is-white.is-bold {
  background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-white.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);
  }
}

.hero.is-black {
  background-color: #0a0a0a;
  color: white;
}

.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-black strong {
  color: inherit;
}

.hero.is-black .title {
  color: white;
}

.hero.is-black .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-black .subtitle a:not(.button),
.hero.is-black .subtitle strong {
  color: white;
}

@media screen and (max-width: 1023px) {
  .hero.is-black .navbar-menu {
    background-color: #0a0a0a;
  }
}

.hero.is-black .navbar-item,
.hero.is-black .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-black a.navbar-item:hover, .hero.is-black a.navbar-item.is-active,
.hero.is-black .navbar-link:hover,
.hero.is-black .navbar-link.is-active {
  background-color: black;
  color: white;
}

.hero.is-black .tabs a {
  color: white;
  opacity: 0.9;
}

.hero.is-black .tabs a:hover {
  opacity: 1;
}

.hero.is-black .tabs li.is-active a {
  opacity: 1;
}

.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {
  color: white;
}

.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.hero.is-black.is-bold {
  background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-black.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);
  }
}

.hero.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-light strong {
  color: inherit;
}

.hero.is-light .title {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .subtitle {
  color: rgba(0, 0, 0, 0.9);
}

.hero.is-light .subtitle a:not(.button),
.hero.is-light .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 1023px) {
  .hero.is-light .navbar-menu {
    background-color: whitesmoke;
  }
}

.hero.is-light .navbar-item,
.hero.is-light .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light a.navbar-item:hover, .hero.is-light a.navbar-item.is-active,
.hero.is-light .navbar-link:hover,
.hero.is-light .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

.hero.is-light .tabs a:hover {
  opacity: 1;
}

.hero.is-light .tabs li.is-active a {
  opacity: 1;
}

.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.hero.is-light.is-bold {
  background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-light.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
  }
}

.hero.is-dark {
  background-color: #363636;
  color: #fff;
}

.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-dark strong {
  color: inherit;
}

.hero.is-dark .title {
  color: #fff;
}

.hero.is-dark .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-dark .subtitle a:not(.button),
.hero.is-dark .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-dark .navbar-menu {
    background-color: #363636;
  }
}

.hero.is-dark .navbar-item,
.hero.is-dark .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-dark a.navbar-item:hover, .hero.is-dark a.navbar-item.is-active,
.hero.is-dark .navbar-link:hover,
.hero.is-dark .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}

.hero.is-dark .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-dark .tabs a:hover {
  opacity: 1;
}

.hero.is-dark .tabs li.is-active a {
  opacity: 1;
}

.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {
  color: #fff;
}

.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #363636;
}

.hero.is-dark.is-bold {
  background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-dark.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
  }
}

.hero.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-primary strong {
  color: inherit;
}

.hero.is-primary .title {
  color: #fff;
}

.hero.is-primary .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-primary .subtitle a:not(.button),
.hero.is-primary .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-primary .navbar-menu {
    background-color: #00d1b2;
  }
}

.hero.is-primary .navbar-item,
.hero.is-primary .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-primary a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active,
.hero.is-primary .navbar-link:hover,
.hero.is-primary .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}

.hero.is-primary .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-primary .tabs a:hover {
  opacity: 1;
}

.hero.is-primary .tabs li.is-active a {
  opacity: 1;
}

.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {
  color: #fff;
}

.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #00d1b2;
}

.hero.is-primary.is-bold {
  background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-primary.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
  }
}

.hero.is-link {
  background-color: #3273dc;
  color: #fff;
}

.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-link strong {
  color: inherit;
}

.hero.is-link .title {
  color: #fff;
}

.hero.is-link .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-link .subtitle a:not(.button),
.hero.is-link .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-link .navbar-menu {
    background-color: #3273dc;
  }
}

.hero.is-link .navbar-item,
.hero.is-link .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-link a.navbar-item:hover, .hero.is-link a.navbar-item.is-active,
.hero.is-link .navbar-link:hover,
.hero.is-link .navbar-link.is-active {
  background-color: #2366d1;
  color: #fff;
}

.hero.is-link .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-link .tabs a:hover {
  opacity: 1;
}

.hero.is-link .tabs li.is-active a {
  opacity: 1;
}

.hero.is-link .tabs.is-boxed a, .hero.is-link .tabs.is-toggle a {
  color: #fff;
}

.hero.is-link .tabs.is-boxed a:hover, .hero.is-link .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-link .tabs.is-boxed li.is-active a, .hero.is-link .tabs.is-boxed li.is-active a:hover, .hero.is-link .tabs.is-toggle li.is-active a, .hero.is-link .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #3273dc;
}

.hero.is-link.is-bold {
  background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-link.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);
  }
}

.hero.is-info {
  background-color: #3298dc;
  color: #fff;
}

.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-info strong {
  color: inherit;
}

.hero.is-info .title {
  color: #fff;
}

.hero.is-info .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-info .subtitle a:not(.button),
.hero.is-info .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-info .navbar-menu {
    background-color: #3298dc;
  }
}

.hero.is-info .navbar-item,
.hero.is-info .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-info a.navbar-item:hover, .hero.is-info a.navbar-item.is-active,
.hero.is-info .navbar-link:hover,
.hero.is-info .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}

.hero.is-info .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-info .tabs a:hover {
  opacity: 1;
}

.hero.is-info .tabs li.is-active a {
  opacity: 1;
}

.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {
  color: #fff;
}

.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #3298dc;
}

.hero.is-info.is-bold {
  background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-info.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
  }
}

.hero.is-success {
  background-color: #48c774;
  color: #fff;
}

.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-success strong {
  color: inherit;
}

.hero.is-success .title {
  color: #fff;
}

.hero.is-success .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-success .subtitle a:not(.button),
.hero.is-success .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-success .navbar-menu {
    background-color: #48c774;
  }
}

.hero.is-success .navbar-item,
.hero.is-success .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-success a.navbar-item:hover, .hero.is-success a.navbar-item.is-active,
.hero.is-success .navbar-link:hover,
.hero.is-success .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}

.hero.is-success .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-success .tabs a:hover {
  opacity: 1;
}

.hero.is-success .tabs li.is-active a {
  opacity: 1;
}

.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {
  color: #fff;
}

.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #48c774;
}

.hero.is-success.is-bold {
  background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-success.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
  }
}

.hero.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-warning strong {
  color: inherit;
}

.hero.is-warning .title {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .subtitle {
  color: rgba(0, 0, 0, 0.9);
}

.hero.is-warning .subtitle a:not(.button),
.hero.is-warning .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 1023px) {
  .hero.is-warning .navbar-menu {
    background-color: #ffdd57;
  }
}

.hero.is-warning .navbar-item,
.hero.is-warning .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning a.navbar-item:hover, .hero.is-warning a.navbar-item.is-active,
.hero.is-warning .navbar-link:hover,
.hero.is-warning .navbar-link.is-active {
  background-color: #ffd83d;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

.hero.is-warning .tabs a:hover {
  opacity: 1;
}

.hero.is-warning .tabs li.is-active a {
  opacity: 1;
}

.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.hero.is-warning.is-bold {
  background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-warning.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);
  }
}

.hero.is-danger {
  background-color: #f14668;
  color: #fff;
}

.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-danger strong {
  color: inherit;
}

.hero.is-danger .title {
  color: #fff;
}

.hero.is-danger .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-danger .subtitle a:not(.button),
.hero.is-danger .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-danger .navbar-menu {
    background-color: #f14668;
  }
}

.hero.is-danger .navbar-item,
.hero.is-danger .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-danger a.navbar-item:hover, .hero.is-danger a.navbar-item.is-active,
.hero.is-danger .navbar-link:hover,
.hero.is-danger .navbar-link.is-active {
  background-color: #ef2e55;
  color: #fff;
}

.hero.is-danger .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-danger .tabs a:hover {
  opacity: 1;
}

.hero.is-danger .tabs li.is-active a {
  opacity: 1;
}

.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {
  color: #fff;
}

.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #f14668;
}

.hero.is-danger.is-bold {
  background-image: linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-danger.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%);
  }
}

.hero.is-small .hero-body {
  padding: 1.5rem;
}

@media screen and (min-width: 769px), print {
  .hero.is-medium .hero-body {
    padding: 9rem 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .hero.is-large .hero-body {
    padding: 18rem 1.5rem;
  }
}

.hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body, .hero.is-fullheight-with-navbar .hero-body {
  align-items: center;
  display: flex;
}

.hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container, .hero.is-fullheight-with-navbar .hero-body > .container {
  flex-grow: 1;
  flex-shrink: 1;
}

.hero.is-halfheight {
  min-height: 50vh;
}

.hero.is-fullheight {
  min-height: 100vh;
}

.hero-video {
  overflow: hidden;
}

.hero-video video {
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.hero-video.is-transparent {
  opacity: 0.3;
}

@media screen and (max-width: 768px) {
  .hero-video {
    display: none;
  }
}

.hero-buttons {
  margin-top: 1.5rem;
}

@media screen and (max-width: 768px) {
  .hero-buttons .button {
    display: flex;
  }
  .hero-buttons .button:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .hero-buttons {
    display: flex;
    justify-content: center;
  }
  .hero-buttons .button:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.hero-head,
.hero-foot {
  flex-grow: 0;
  flex-shrink: 0;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}

.section {
  padding: 3rem 1.5rem;
}

@media screen and (min-width: 1024px) {
  .section.is-medium {
    padding: 9rem 1.5rem;
  }
  .section.is-large {
    padding: 18rem 1.5rem;
  }
}

.footer {
  background-color: #fafafa;
  padding: 3rem 1.5rem 6rem;
}
/*# sourceMappingURL=bulma.css.map */
`;

class SkhemataBase extends ScopedElementsMixin(s$3) {
  constructor() {
    super(...arguments);
    /**
     * Skhemata API URL
     */
    this.api = {
      url: ''
    };
    /**
     * Translations directory
     */
    this.translationDir = '';
    /**
     * Language code (ISO)
     */
    this.translationLang = 'eng';
    /**
     * path to Configuration File
     */
    this.configSrc = '';
  }
  /* TODO: add validation and form error handling
  validateFormInputs(){
  }
     displayAPIFormErrors(){
  } */
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'translation-lang') {
      this.translationSelected = this.translationData[this.translationLang];
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }
  /**
   * getStr
   * @param key key for translation
   * @returns translated string
   */
  getStr(key) {
    try {
      const value = key.split('.').reduce((o, i) => o[i], this.translationSelected);
      return typeof value === 'string' ? value : key;
    } catch (_a) {
      return key;
    }
  }
  async firstUpdated() {
    var _a;
    if ((_a = this.api) === null || _a === void 0 ? void 0 : _a.url) {
      this.initSkhemataAPI();
    }
    if (this.configSrc) {
      // await in case subclass firstUpdated() depends on config data
      await this.initConfigData();
    }
    if (this.translationDir || this.translationData) {
      this.initTranslations();
    }
    this.initEventListeners();
    this.requestUpdate();
  }
  initSkhemataAPI() {
    this.skhemata = new Skhemata(this.api.url);
    this.skhemata.init();
  }
  async initConfigData() {
    this.configData = await fetch(this.configSrc).then(res => res.json());
  }
  initTranslations() {
    if (this.translationDir) {
      fetch(`${this.translationDir}${this.translationLang}.json`).then(res => {
        this.translationSelected = res.json();
      });
    } else {
      this.translationSelected = this.translationData[this.translationLang];
    }
  }
  initEventListeners() {
    window.addEventListener('skhemata-login', () => {
      this.requestUpdate();
    });
    window.addEventListener('skhemata-logout', () => {
      this.requestUpdate();
    });
  }
}
SkhemataBase.styles = [Bulma];
__decorate([e$4({
  type: Object,
  attribute: 'api'
})], SkhemataBase.prototype, "api", void 0);
__decorate([e$4({
  type: String,
  attribute: 'translation-dir'
})], SkhemataBase.prototype, "translationDir", void 0);
__decorate([e$4({
  type: Object,
  attribute: 'translation-data'
})], SkhemataBase.prototype, "translationData", void 0);
__decorate([e$4({
  type: String,
  attribute: 'translation-lang'
})], SkhemataBase.prototype, "translationLang", void 0);
__decorate([e$4({
  type: Object,
  attribute: false
})], SkhemataBase.prototype, "translationSelected", void 0);
__decorate([e$4({
  type: Object,
  attribute: false
})], SkhemataBase.prototype, "skhemata", void 0);
__decorate([e$4({
  type: String,
  attribute: 'config-src'
})], SkhemataBase.prototype, "configSrc", void 0);
__decorate([e$4({
  type: Object,
  attribute: 'config-data'
})], SkhemataBase.prototype, "configData", void 0);

class CardReward extends s$3 {
  constructor() {
    super(...arguments);
    this.currencySymbols = {
      ALL: 'L',
      AFN: '؋',
      ARS: '$',
      AWG: 'ƒ',
      AUD: '$',
      AZN: '₼',
      BSD: '$',
      BBD: '$',
      BYR: 'p.',
      BZD: 'BZ$',
      BMD: '$',
      BOB: 'Bs.',
      BAM: 'KM',
      BWP: 'P',
      BGN: 'лв',
      BRL: 'R$',
      BND: '$',
      BIF: 'FBu',
      KHR: '៛',
      CAD: '$',
      KYD: '$',
      CLP: '$',
      CNY: '¥',
      COP: '$',
      CRC: '₡',
      HRK: 'kn',
      CUP: '₱',
      CZK: 'Kč',
      DKK: 'kr',
      DOP: 'RD$',
      XCD: '$',
      EGP: '£',
      SVC: '₡',
      EEK: 'kr',
      EUR: '€',
      FKP: '£',
      FJD: '$',
      GHC: 'GH₵',
      GIP: '£',
      GTQ: 'Q',
      GGP: '£',
      GYD: '$',
      HNL: 'L',
      HKD: '$',
      HUF: 'Ft',
      ISK: 'kr',
      INR: '₹',
      IDR: 'Rp',
      IRR: '﷼',
      IMP: '£',
      ILS: '₪',
      JMD: '$',
      JPY: '¥',
      JEP: '£',
      KES: 'KSh',
      KZT: '₸',
      KPW: '₩',
      KRW: '₩',
      KGS: 'лв',
      LAK: '₭',
      LVL: 'Ls',
      LBP: 'ل.ل',
      LRD: '$',
      LTL: 'Lt',
      MKD: 'ден',
      MYR: 'RM',
      MUR: '₨',
      MXN: '$',
      MNT: '₮',
      MZN: 'MT',
      NAD: '$',
      NPR: '₨',
      ANG: 'ƒ',
      NZD: '$',
      NIO: 'C$',
      NGN: '₦',
      NOK: 'kr',
      OMR: 'ر.ع.',
      PKR: '₨',
      PAB: 'B/.',
      PYG: '₲',
      PEN: 'S/.',
      PHP: '₱',
      PLN: 'zł',
      QAR: 'ر.ق',
      RON: 'lei',
      RUB: '₽',
      RMB: '￥',
      SHP: '£',
      SAR: 'ر.س',
      RSD: 'Дин.',
      SCR: '₨',
      SGD: '$',
      SBD: '$',
      SOS: 'Sh.So.',
      ZAR: 'R',
      LKR: 'Rs',
      SEK: 'kr',
      CHF: 'Fr.',
      SRD: '$',
      SYP: '£',
      TZS: 'TSh',
      TWD: 'NT$',
      THB: '฿',
      TTD: 'TT$',
      TRY: '₺',
      TRL: '₺',
      TVD: '$',
      UGX: 'USh',
      UAH: '₴',
      GBP: '£',
      USD: '$',
      UYU: '$U',
      UZS: "so'm",
      VEF: 'Bs.',
      VND: '₫',
      YER: '﷼',
      ZWD: 'Z$'
    };
    this.openStatus = false;
    this.contributionAmount = 0;
    this.handleRewardOpen = () => {
      this.openStatus = !this.openStatus;
      if (this.handleChosenReward !== undefined) {
        this.handleChosenReward(this.pledge.name, this.pledge);
      }
    };
  }
  async firstUpdated() {
    this.contributionAmount = this.pledge.amount;
  }
  render() {
    var _a, _b;
    return y`
      <div class="card cardReward">
        <header class="card-header" @click="${this.handleRewardOpen}">
          <p class="card-header-title">
            <span> ${this.pledge.name} </span>
            <span>&nbsp; - &nbsp;</span>
            <span>
              <span>
                ${this.currencySymbols[(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.currencies[0].code_iso4217_alpha]}
                ${this.pledge.amount}
                ${(_b = this.campaign) === null || _b === void 0 ? void 0 : _b.currencies[0].code_iso4217_alpha}
              </span>
            </span>
          </p>
        </header>
        <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
          <div class="content">
            ${this.pledge.description}

            <div class="pledge-date">
              <time datetime="2016-1-1">Created: ${new Date(this.pledge.created).toDateString()}</time>
            </div>

            ${this.handleChosenReward === undefined ? y`` : y`
            <div>
              <label class="label">Contribution Amount</label>
              <input
                min="1"
                class="input"
                type="number"
                placeholder="Contribution Amount"
                .value="${this.contributionAmount.toString()}"
                @input="${this.handleContributionAmount}"
              />
            </div>
            `}
          </div>
        </div>
        <footer class="card-footer ${this.openStatus ? '' : 'is-hidden'}">
          <a class="card-footer-item" @click="${this.handleContribute}"
            >Contribute</a
          >
        </footer>
      </div>
    `;
  }
}
CardReward.styles = [Bulma, i`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .cardReward header {
        cursor: pointer;
      }

      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        .pledge-date {
          margin: 1rem 0;
        }
    `];
__decorate([e$4({
  type: Object,
  attribute: 'currencySymbols'
})], CardReward.prototype, "currencySymbols", void 0);
__decorate([e$4({
  type: Object
})], CardReward.prototype, "pledge", void 0);
__decorate([e$4({
  type: Object
})], CardReward.prototype, "campaign", void 0);
__decorate([e$4({
  type: Boolean
})], CardReward.prototype, "openStatus", void 0);
__decorate([e$4({
  type: Function
})], CardReward.prototype, "handleContribute", void 0);
__decorate([e$4({
  type: Function
})], CardReward.prototype, "handleContributionAmount", void 0);
__decorate([e$4({
  type: Number
})], CardReward.prototype, "contributionAmount", void 0);
__decorate([e$4({
  type: Function
})], CardReward.prototype, "handleChosenReward", void 0);

class campaignInfo extends SkhemataBase {
  constructor() {
    super(...arguments);
    this.currencySymbols = {
      ALL: 'L',
      AFN: '؋',
      ARS: '$',
      AWG: 'ƒ',
      AUD: '$',
      AZN: '₼',
      BSD: '$',
      BBD: '$',
      BYR: 'p.',
      BZD: 'BZ$',
      BMD: '$',
      BOB: 'Bs.',
      BAM: 'KM',
      BWP: 'P',
      BGN: 'лв',
      BRL: 'R$',
      BND: '$',
      BIF: 'FBu',
      KHR: '៛',
      CAD: '$',
      KYD: '$',
      CLP: '$',
      CNY: '¥',
      COP: '$',
      CRC: '₡',
      HRK: 'kn',
      CUP: '₱',
      CZK: 'Kč',
      DKK: 'kr',
      DOP: 'RD$',
      XCD: '$',
      EGP: '£',
      SVC: '₡',
      EEK: 'kr',
      EUR: '€',
      FKP: '£',
      FJD: '$',
      GHC: 'GH₵',
      GIP: '£',
      GTQ: 'Q',
      GGP: '£',
      GYD: '$',
      HNL: 'L',
      HKD: '$',
      HUF: 'Ft',
      ISK: 'kr',
      INR: '₹',
      IDR: 'Rp',
      IRR: '﷼',
      IMP: '£',
      ILS: '₪',
      JMD: '$',
      JPY: '¥',
      JEP: '£',
      KES: 'KSh',
      KZT: '₸',
      KPW: '₩',
      KRW: '₩',
      KGS: 'лв',
      LAK: '₭',
      LVL: 'Ls',
      LBP: 'ل.ل',
      LRD: '$',
      LTL: 'Lt',
      MKD: 'ден',
      MYR: 'RM',
      MUR: '₨',
      MXN: '$',
      MNT: '₮',
      MZN: 'MT',
      NAD: '$',
      NPR: '₨',
      ANG: 'ƒ',
      NZD: '$',
      NIO: 'C$',
      NGN: '₦',
      NOK: 'kr',
      OMR: 'ر.ع.',
      PKR: '₨',
      PAB: 'B/.',
      PYG: '₲',
      PEN: 'S/.',
      PHP: '₱',
      PLN: 'zł',
      QAR: 'ر.ق',
      RON: 'lei',
      RUB: '₽',
      RMB: '￥',
      SHP: '£',
      SAR: 'ر.س',
      RSD: 'Дин.',
      SCR: '₨',
      SGD: '$',
      SBD: '$',
      SOS: 'Sh.So.',
      ZAR: 'R',
      LKR: 'Rs',
      SEK: 'kr',
      CHF: 'Fr.',
      SRD: '$',
      SYP: '£',
      TZS: 'TSh',
      TWD: 'NT$',
      THB: '฿',
      TTD: 'TT$',
      TRY: '₺',
      TRL: '₺',
      TVD: '$',
      UGX: 'USh',
      UAH: '₴',
      GBP: '£',
      USD: '$',
      UYU: '$U',
      UZS: "so'm",
      VEF: 'Bs.',
      VND: '₫',
      YER: '﷼',
      ZWD: 'Z$'
    };
    this.activeRewards = [];
    this.handleRewardOpen = index => {
      if (this.activeRewards.includes(index)) {
        this.activeRewards = this.activeRewards.filter(item => item !== index);
      } else {
        const newArr = [...this.activeRewards, index];
        this.activeRewards = newArr;
      }
    };
    this.getRaisedInPeriod = () => {
      var _a;
      let returnDate = {
        "unit": "",
        "elapsed": 0
      };
      let elapsedSecond = (_a = this.campaign) === null || _a === void 0 ? void 0 : _a.seconds_elapsed;
      let elapsedMinute = elapsedSecond / 60;
      let elapsedHour = elapsedMinute / 60;
      let elapsedDay = elapsedHour / 24;
      let elapsedMonth = elapsedDay / 30;
      let elapsedYear = elapsedMonth / 12;
      if (elapsedYear >= 1) {
        returnDate.elapsed = Math.floor(elapsedYear);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "years";
        } else {
          returnDate.unit = "year";
        }
      } else if (elapsedMonth >= 1) {
        returnDate.elapsed = Math.floor(elapsedMonth);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "months";
        } else {
          returnDate.unit = "month";
        }
      } else if (elapsedDay >= 1) {
        returnDate.elapsed = Math.floor(elapsedDay);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "days";
        } else {
          returnDate.unit = "day";
        }
      } else if (elapsedHour >= 1) {
        returnDate.elapsed = Math.floor(elapsedHour);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "hours";
        } else {
          returnDate.unit = "hour";
        }
      } else if (elapsedMinute >= 1) {
        returnDate.elapsed = Math.floor(elapsedMinute);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "minutes";
        } else {
          returnDate.unit = "minute";
        }
      } else if (elapsedSecond >= 1) {
        returnDate.elapsed = Math.floor(elapsedSecond);
        if (returnDate.elapsed > 1) {
          returnDate.unit = "seconds";
        } else {
          returnDate.unit = "second";
        }
      }
      return returnDate;
    };
    this.addCurrencySymbols = amount => {
      var _a, _b;
      const currencySymbol = this.currencySymbols[(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.currencies[0].code_iso4217_alpha];
      const currencyName = (_b = this.campaign) === null || _b === void 0 ? void 0 : _b.currencies[0].code_iso4217_alpha;
      return `${currencySymbol}${amount} ${currencyName}`;
    };
  }
  static get styles() {
    return [...super.styles, i`
        .raise-mode {
          border-radius: 5px;
          padding: 5px;
          line-height: 2.5;
        }
        .campaign-info-highlight {
          font-size: 32px;
          font-weight: 700;
          display: block;
        }
        .right-info {
          /* text-align: center; */
        }
        .right-info > div {
          margin-bottom: 2rem;
        }
        .start-end-time {
          border-radius: 5px;
          padding: .5rem;
        }

        .rewards-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .campaign-description {
          margin-top: 20px;
        }

        #campaignProgress {
          margin-bottom: 0.5rem;
        }
      `];
  }
  static get scopedElements() {
    return {
      'card-reward-component': CardReward
    };
  }
  async firstUpdated() {
    this.embedListener();
    // fetch('https://coral.thrinacia.com/api/service/restv1/locale/currency', {
    //   credentials: 'include',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('currencies: ', data);
    //     this.currencies = data;
    //   })
    //   .catch(e => console.log(e));
  }

  updated() {
    this.getCampaignMainImage();
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return y`
      <div class="columns">
        <div class="left-info column">
          <img alt="main campaign" src=${this.campaignMainImage} />

          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu5"
              >
                <span>Embed Code</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu5" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <textarea rows="4" cols="50">
<iframe width="260" height="650" src="${this.embedUrl()}" frameborder="0" scrolling="no"></iframe></textarea
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="campaign-description">
            <!-- <div>About this campaign</div> -->
            <div>${this.returnString()}</div>
          </div>
        </div>
        <div class="right-info column">
          <div>
            <span class="raise-mode has-text-white-ter has-background-black"
              >Raise mode</span
            >
            ${((_a = this.campaign) === null || _a === void 0 ? void 0 : _a.raise_mode_id) === 1 ? 'All or Nothing' : 'Keep it All'}
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${this.addCurrencySymbols((_b = this.campaign) === null || _b === void 0 ? void 0 : _b.funded_amount)}</span
            >
            Raised in ${this.getRaisedInPeriod().elapsed} ${this.getRaisedInPeriod().unit}
          </div>
          <div>
            <progress class="progress is-info" id="campaignProgress" value="${(_c = this.campaign) === null || _c === void 0 ? void 0 : _c.funded_percentage}" max="100">${(_d = this.campaign) === null || _d === void 0 ? void 0 : _d.funded_percentage}%</progress>
            
            <span class="campaign-info-highlight has-text-info"
              >${(_e = this.campaign) === null || _e === void 0 ? void 0 : _e.funded_percentage}%</span
            >
            Funded of <b>${this.addCurrencySymbols((_f = this.campaign) === null || _f === void 0 ? void 0 : _f.funding_goal)}</b> Goal 
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${(_g = this.campaign) === null || _g === void 0 ? void 0 : _g.total_backers}</span
            >
            ${((_h = this.campaign) === null || _h === void 0 ? void 0 : _h.total_backers) === 1 ? 'Backer' : 'Backers'}
          </div>
          <div>
            <span class="campaign-info-highlight has-text-info"
              >${(_j = this.campaign) === null || _j === void 0 ? void 0 : _j.days_remaining}
              ${((_k = this.campaign) === null || _k === void 0 ? void 0 : _k.days_remaining) === 1 ? 'Day to go' : 'Days to go'}</span
            >
          </div>
          <div class="start-end-time has-background-grey-lighter">
            <div>Started on ${(_l = this.campaign) === null || _l === void 0 ? void 0 : _l.starts_date_time}</div>
            <div>Ends on ${(_m = this.campaign) === null || _m === void 0 ? void 0 : _m.ends_date_time}</div>
          </div>

          <div>
            <button class="button" @click="${this.handleContribute}">
              Contribute
            </button>
          </div>

          <div class="rewards-section">
            ${((_o = this.campaign) === null || _o === void 0 ? void 0 : _o.pledges) && ((_p = this.campaign) === null || _p === void 0 ? void 0 : _p.pledges.length) > 0 ? this.campaign.pledges.map(pledge => y`
                    <card-reward-component
                      .pledge=${pledge}
                      .handleContribute=${this.handleContribute}
                      .campaign=${this.campaign}
                    ></card-reward-component>
                  `) : ''}
          </div>
        </div>
      </div>
    `;
  }
  getCampaignMainImage() {
    if (this.campaign && this.campaign.files) {
      for (const key in this.campaign.files) {
        if (this.campaign.files[key].region_id === 3) {
          this.campaignMainImage = this.apiUrl + '/image/campaign_detail_large/' + this.campaign.files[key].path_external;
        }
      }
    }
  }
  embedListener() {
    var _a;
    const dropdown = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.dropdown');
    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
    });
  }
  embedUrl() {
    let embedPath = window.location.origin;
    return embedPath + '/embed/card-view/' + this.campaignId;
  }
  returnString() {
    var _a;
    let fragment = document.createRange().createContextualFragment(`${(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.description}`);
    return fragment;
  }
}
__decorate([e$4({
  type: String,
  attribute: 'api_url'
})], campaignInfo.prototype, "apiUrl", void 0);
__decorate([e$4({
  type: String,
  attribute: 'loc_path'
})], campaignInfo.prototype, "locPath", void 0);
__decorate([e$4({
  type: String,
  attribute: 'campaign_id'
})], campaignInfo.prototype, "campaignId", void 0);
__decorate([e$4({
  type: Object,
  attribute: 'campaign'
})], campaignInfo.prototype, "campaign", void 0);
__decorate([e$4({
  type: Object,
  attribute: 'currencySymbols'
})], campaignInfo.prototype, "currencySymbols", void 0);
__decorate([e$4({
  type: Array,
  attribute: 'currencies'
})], campaignInfo.prototype, "currencies", void 0);
__decorate([e$4({
  type: String,
  attribute: 'currentPage'
})], campaignInfo.prototype, "currentPage", void 0);
__decorate([e$4({
  type: Array,
  attribute: 'activeRewards'
})], campaignInfo.prototype, "activeRewards", void 0);
__decorate([e$4({
  type: Function
})], campaignInfo.prototype, "handleContribute", void 0);
__decorate([e$4({
  type: String
})], campaignInfo.prototype, "campaignMainImage", void 0);

class campaignFaq extends SkhemataBase {
  static get styles() {
    return [...super.styles, i`
        .faq-question {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 15px;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          transition: 0.3s;
          border-radius: 5px;
          margin-top: 5px;
        }
        .faq-answer {
          padding: 0 15px;
          background-color: #fff;
          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
      `];
  }
  async firstUpdated() {
    this.faqQuestionListener();
  }
  updated() {
    if (this.campaignFaq === undefined) {
      this.getFaq();
    }
  }
  render() {
    return y`
      <div class="columns">
        <div class="faq-container column">${this.campaignFaq}</div>
      </div>
    `;
  }
  getFaq() {
    if (this.campaign && this.campaign.faqs) {
      for (let key in this.campaign.faqs) {
        if (this.campaign.faqs && this.campaign.faqs[key].disabled === false) {
          this.campaignFaq = y`<div class="faq-title">
            <div class="faq-name">${this.campaign.faqs[key].name}</div>
            <div class="faq-description">
              ${this.campaign.faqs[key].description}
            </div>
          </div>`;
          for (let index in this.campaign.faqs[key].faq_pairs) {
            if (this.campaign.faqs[key].faq_pairs && this.campaign.faqs[key].faq_pairs[index].disabled === false) {
              this.campaignFaq = y`${this.campaignFaq}
                <div class="faq-pair">
                  <div class="faq-question">
                    ${this.campaign.faqs[key].faq_pairs[index].question}
                  </div>
                  <div class="faq-answer">
                    ${this.campaign.faqs[key].faq_pairs[index].answer}
                  </div>
                </div>`;
            }
          }
          this.campaignFaq = y`<div class="faq-group">
            ${this.campaignFaq}
          </div>`;
        }
      }
      this.campaignFaq = y`<div class="faq-container">
        ${this.campaignFaq}
      </div>`;
    }
  }
  faqQuestionListener() {
    var _a;
    const faqPair = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.faq-container');
    if (faqPair) {
      faqPair.addEventListener('click', function (event) {
        let question = event.target;
        if (question.classList.contains('faq-question')) {
          let answer = question.nextElementSibling;
          question.classList.toggle('active');
          if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
          } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    }
  }
}
__decorate([e$4({
  type: Object,
  attribute: 'campaign'
})], campaignFaq.prototype, "campaign", void 0);
__decorate([e$4({
  type: String
})], campaignFaq.prototype, "campaignFaq", void 0);

class campaignBackers extends SkhemataBase {
  static get styles() {
    return [...super.styles, i``];
  }
  async firstUpdated() {
    this.getBackers();
  }
  updated() {}
  render() {
    return y`
      <div class="columns">
        <div class="backers-container column">${this.campaignBackers}</div>
      </div>
    `;
  }
  getBackers() {
    fetch(`${this.apiUrl}${this.locPath}campaign/${this.campaignId}/backer`).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    }).then(data => {
      this.backers = data;
      this.backersMarkup();
    }).catch(() => {
      console.log('error');
    });
  }
  backersMarkup() {
    if (this.backers) {
      console.log(this.backers);
      for (let key in this.backers) {
        this.campaignBackers = y`<div class="faq-title">
          ${this.backers[key].first_name} ${this.backers[key].last_name}
          ${this.backers[key].total_amount} Backed
          ${this.backers[key].total_backed}
          ${this.backers[key].total_backed === 1 ? 'Campaign' : 'Campaigns'}
        </div> `;
      }
    }
  }
}
__decorate([e$4({
  type: String,
  attribute: 'api_url'
})], campaignBackers.prototype, "apiUrl", void 0);
__decorate([e$4({
  type: String,
  attribute: 'loc_path'
})], campaignBackers.prototype, "locPath", void 0);
__decorate([e$4({
  type: String,
  attribute: 'campaign_id'
})], campaignBackers.prototype, "campaignId", void 0);
__decorate([e$4({
  type: Object
})], campaignBackers.prototype, "backers", void 0);
__decorate([e$4({
  type: String
})], campaignBackers.prototype, "campaignBackers", void 0);

// src/lib/bound.ts
var configurable = true;
function bound(_, key, descriptor) {
  if (typeof descriptor?.value !== "function") throw new TypeError(`Only methods can be decorated with @bound. <${key ?? _.name}> is not a method!`);
  return {
    configurable,
    get() {
      const value = descriptor.value.bind(this);
      Object.defineProperty(this, key, {
        value,
        configurable,
        writable: true
      });
      return value;
    }
  };
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l$3 = l => null != l ? l : b;

const allCapitalLetterGroups = /[A-ZÀ-ÖÙ-Ý]+/g;
const allLowercaseWords = /[a-zà-öù-ý]+/g;
/**
 *	Converts a string value into [kebab case](https://en.wikipedia.org/wiki/Kebab_case).
 * @param value The string to convert.
 * @category String
 * @returns The kebab-cased string.
 * @example
kebabCase('fooBARBaz')
// => 'foo-bar-baz'
 */
function kebabCase(value) {
  const words = value.replace(allCapitalLetterGroups, brokenLowered).match(allLowercaseWords);
  return words ? words.join('-') : '';
  function brokenLowered(s) {
    return ' ' + (s.length > 2 ? s.slice(0, -1) + ' ' + s.slice(-1) : s).toLowerCase();
  }
}

// node_modules/@pacote/memoize/lib/esm/index.js
function createCache() {
  const cache = {};
  return {
    has: key => Object.hasOwnProperty.call(cache, key),
    get: key => cache[key],
    set: (key, value) => {
      cache[key] = value;
    }
  };
}
function memoize(cacheKeyFn, fn) {
  const cache = createCache();
  return (...args) => {
    const key = cacheKeyFn(...args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

// src/lib/strings.ts
var identity = x => x;
var dash = memoize(identity, kebabCase);

// src/lib/predicates.ts
var elem = xs => x => xs.includes(x);
var isRepresentation = elem(["paymentMethod", "source", "token"]);

// src/lib/fetch.ts
async function throwBadResponse(response) {
  const {
    ok,
    statusText
  } = response;
  if (!ok) throw new Error(statusText);
  return response;
}

// src/lib/read-only.ts
function isReactiveElement(host) {
  return "addInitializer" in host.constructor;
}
var _ReadOnlyController = class {
  constructor(host) {
    this.host = host;
    this.values = /* @__PURE__ */new Map();
    if (_ReadOnlyController.instances.has(host)) return _ReadOnlyController.instances.get(host);
    host.addController(this);
    _ReadOnlyController.instances.set(host, this);
  }
  static for(host) {
    return new _ReadOnlyController(host);
  }
  hostConnected() {
  }
  set(key, value) {
    const old = this.values.get(key);
    this.values.set(key, value);
    if (isReactiveElement(this.host)) this.host.requestUpdate(key, old);else this.host.requestUpdate();
  }
};
var ReadOnlyController = _ReadOnlyController;
ReadOnlyController.instances = /* @__PURE__ */new Map();
function readonly(proto, key) {
  const Klass = proto.constructor;
  Klass.addInitializer(x => {
    const controller = ReadOnlyController.for(x);
    Object.defineProperty(x.constructor.prototype, key, {
      enumerable: true,
      configurable: true,
      get() {
        return controller.values.get(key);
      },
      set(value) {
        if (!controller.values.has(key)) controller.values.set(key, value);
      }
    });
    Klass.createProperty(key, {
      ...Klass.getPropertyOptions(key),
      noAccessor: true
    });
  });
}
readonly.set = function (host, props) {
  const controller = ReadOnlyController.for(host);
  for (const [key, value] of Object.entries(props)) controller.set(key, value);
};

// src/lib/notify.ts
var ChangeEvent = class extends Event {
  constructor(key, oldValue, value, attribute) {
    super(`${attribute ?? key.toLowerCase()}-changed`);
    this.key = key;
    this.oldValue = oldValue;
    this.value = value;
    this.detail = {
      value
    };
  }
};
var _NotifyController = class {
  constructor(host) {
    this.host = host;
    this.cache = /* @__PURE__ */new Map();
    if (_NotifyController.instances.has(host)) return _NotifyController.instances.get(host);
    host.addController(this);
    _NotifyController.instances.set(host, this);
  }
  hostUpdated() {
    for (const [key, oldValue] of this.cache) {
      const newValue = this.host[key];
      const {
        attribute
      } = this.host.constructor.getPropertyOptions(key) ?? {};
      const attr = typeof attribute === "string" ? attribute : null;
      this.cache.set(key, newValue);
      this.host.dispatchEvent(new ChangeEvent(key, oldValue, newValue, attr));
    }
  }
};
var NotifyController = _NotifyController;
NotifyController.instances = /* @__PURE__ */new Map();
function notify(proto, key) {
  proto.constructor.addInitializer(x => {
    const controller = new NotifyController(x);
    controller.cache.set(key, x[key]);
  });
}

// src/lib/stripe-method-decorator.ts
function wrap(f) {
  return (_target, _property, descriptor) => {
    const original = descriptor.value;
    descriptor.value = f(original);
    return descriptor;
  };
}
var stripeMethod = wrap(function (f) {
  const {
    name
  } = f;
  return async function (...args) {
    if (!this.stripe) throw new Error(`<${this.constructor.is}>: Stripe must be initialized before calling ${name}.`);
    return f.call(this, ...args).then(this.handleResponse);
  };
});

// src/lib/stripe.ts
function throwResponseError(response) {
  if (response.error) throw response.error;else return response;
}

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--) if (decorator = decorators[i]) result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/breadcrumb-controller.ts
function getRandom() {
  return (Date.now() + Math.random() * 1e3).toString(36).substr(0, 8);
}
var BreadcrumbController = class {
  constructor(host, options) {
    this.host = host;
    this.options = options;
    this.initialized = false;
    this.shadowHosts = [];
    this.host.addController(this);
    this.mountId = this.resetMountId();
    this.slotName = this.options?.slotName ?? `breadcrumb-${getRandom()}`;
  }
  get mount() {
    return document.getElementById(this.mountId);
  }
  hostUpdated() {
    if (!this.initialized && this.options?.autoInitialize !== false) this.init();
  }
  hostDisconnected() {
    this.destroyMountPoints();
  }
  resetMountId() {
    const prefix = this.options?.mountPrefix ?? this.host.localName;
    return `${prefix}-mount-point-${getRandom()}`;
  }
  createMountPoint() {
    const node = document.createElement("div");
    node.id = this.mountId;
    node.classList.add(`${this.host.tagName.toLowerCase()}-mount`);
    return node;
  }
  createSlot(slotName) {
    const node = document.createElement("slot");
    node.slot = slotName;
    node.name = slotName;
    return node;
  }
  appendTemplate(target, node = this.createMountPoint()) {
    target.appendChild(node);
    return node;
  }
  initMountPoints() {
    this.initShadowMountPoints();
  }
  destroyMountPoints() {
    for (const host of this.shadowHosts) {
      for (const el of host.querySelectorAll(`[slot="${this.slotName}"][name="${this.slotName}"]`)) el.remove();
    }
    if (this.mount) this.mount.remove();
    this.mountId = this.resetMountId();
  }
  initShadowMountPoints() {
    let host = this.host;
    this.shadowHosts = [this.host];
    while (host = host.getRootNode().host) this.shadowHosts.push(host);
    const {
      shadowHosts,
      slotName
    } = this;
    const hosts = [...shadowHosts];
    const root = hosts.pop();
    if (!root.querySelector(`[slot="${slotName}"]`)) {
      const div = document.createElement("div");
      div.slot = slotName;
      root.appendChild(div);
    }
    const container = root.querySelector(`[slot="${slotName}"]`);
    this.appendTemplate(container);
    hosts.forEach(host2 => this.appendTemplate(host2, this.createSlot(slotName)));
  }
  init() {
    this.destroyMountPoints();
    this.initMountPoints();
    this.initialized = true;
  }
};

// node_modules/@stripe/stripe-js/dist/pure.esm.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function (obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var V3_URL = "https://js.stripe.com/v3";
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  var script = document.createElement("script");
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "1.32.0",
    startTime
  });
};
var stripePromise = null;
var loadScript = function loadScript2(params) {
  if (stripePromise !== null) {
    return stripePromise;
  }
  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }
      script.addEventListener("load", function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error("Stripe.js not available"));
        }
      });
      script.addEventListener("error", function () {
        reject(new Error("Failed to load Stripe.js"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var stripe = maybeStripe.apply(void 0, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var validateLoadParams = function validateLoadParams2(params) {
  var errorMessage = "invalid load parameters; expected object of shape\n\n    {advancedFraudSignals: boolean}\n\nbut received\n\n    ".concat(JSON.stringify(params), "\n");
  if (params === null || _typeof(params) !== "object") {
    throw new Error(errorMessage);
  }
  if (Object.keys(params).length === 1 && typeof params.advancedFraudSignals === "boolean") {
    return params;
  }
  throw new Error(errorMessage);
};
var loadParams;
var loadStripeCalled = false;
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadStripeCalled = true;
  var startTime = Date.now();
  return loadScript(loadParams).then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};
loadStripe.setLoadParameters = function (params) {
  if (loadStripeCalled) {
    throw new Error("You cannot change load parameters after calling loadStripe");
  }
  loadParams = validateLoadParams(params);
};

// src/StripeBase.ts
var StripeElementsError = class extends Error {
  constructor(tag, message) {
    super(`<${tag}>: ${message}`);
    this.originalMessage = message;
  }
};
function isStripeElementsError(error) {
  return !!error && error instanceof StripeElementsError;
}
var errorConverter = {
  toAttribute: error => !error ? null : isStripeElementsError(error) ? error.originalMessage : error.message || ""
};
var StripeBase = class extends s$3 {
  constructor() {
    super(...arguments);
    this.generate = "source";
    this.showError = false;
    this.locale = "auto";
    this.paymentMethod = null;
    this.source = null;
    this.token = null;
    this.element = null;
    this.elements = null;
    this.error = null;
    this.focused = false;
    this.ready = false;
    this.stripe = null;
    this.theme = "none";
    this.precomputedStyle = getComputedStyle(this);
    this.breadcrumb = new BreadcrumbController(this, {
      slotName: `${this.constructor.is}-slot`
    });
  }
  get stripeMountId() {
    return this.breadcrumb.mountId;
  }
  get stripeMount() {
    return this.breadcrumb.mount;
  }
  render() {
    const {
      error,
      showError
    } = this;
    const {
      slotName
    } = this.breadcrumb;
    const errorMessage = isStripeElementsError(error) ? error.originalMessage : error?.message;
    return y`
      <div id="stripe" part="stripe">
        <slot id="stripe-slot" name="${slotName}"></slot>
      </div>

      <output id="error"
          for="stripe"
          part="error"
          ?hidden="${!showError}">
        ${l$3(errorMessage)}
      </output>
    `;
  }
  updated(changed) {
    super.updated?.(changed);
    if (changed.has("error")) this.errorChanged();
    if (changed.has("publishableKey")) this.init();
    [...changed.keys()].forEach(k => this.representationChanged(k));
  }
  async disconnectedCallback() {
    super.disconnectedCallback();
    await this.unmount?.();
  }
  reset() {
    this.element?.clear?.();
    this.resetRepresentations();
    readonly.set(this, {
      error: null
    });
  }
  blur() {
    this.element?.blur();
  }
  focus() {
    this.element?.focus();
  }
  createError(message) {
    return new StripeElementsError(this.constructor.is, message);
  }
  errorChanged() {
    this.resetRepresentations();
    this.fireError(this.error);
  }
  fire(type, detail, opts) {
    this.dispatchEvent(new CustomEvent(type, {
      detail,
      ...opts
    }));
  }
  fireError(error) {
    this.dispatchEvent(new ErrorEvent("error", {
      error
    }));
  }
  getCSSCustomPropertyValue(propertyName) {
    return this.precomputedStyle.getPropertyValue(propertyName);
  }
  async handleResponse(response) {
    const {
      error = null,
      paymentMethod = null,
      source = null,
      token = null
    } = {
      ...response
    };
    readonly.set(this, {
      error,
      paymentMethod,
      source,
      token
    });
    await this.updateComplete;
    if (error) throw error;else return response;
  }
  initElement() {
    "abstract";
  }
  async init() {
    await this.unmount();
    await this.initStripe();
    await this.initElement();
    this.initElementListeners();
    this.breadcrumb.init();
    this.mount();
  }
  initElementListeners() {
    if (!this.element) return;
    this.element.on("ready", this.onReady);
    this.element.on("focus", this.onFocus);
    this.element.on("blur", this.onBlur);
  }
  async initStripe() {
    const {
      publishableKey,
      stripeAccount,
      locale
    } = this;
    if (!publishableKey) readonly.set(this, {
      elements: null,
      element: null,
      stripe: null
    });else {
      try {
        const options = {
          stripeAccount,
          locale
        };
        const stripe = window.Stripe ? window.Stripe(publishableKey, options) : await loadStripe(publishableKey, options);
        const elements = stripe?.elements();
        readonly.set(this, {
          elements,
          error: null,
          stripe
        });
      } catch (e) {
        console.warn(e);
        const error = this.createError("Stripe.js must be loaded first.");
        readonly.set(this, {
          elements: null,
          error,
          stripe: null
        });
      } finally {
        await this.updateComplete;
      }
    }
  }
  mount() {
    if (!this.breadcrumb.mount) throw this.createError("Stripe Mount missing");
    this.element?.mount(this.breadcrumb.mount);
  }
  async unmount() {
    this.element?.unmount?.();
    readonly.set(this, {
      element: null
    });
    await this.updateComplete;
  }
  async onBlur() {
    readonly.set(this, {
      focused: false
    });
    await this.updateComplete;
  }
  async onFocus() {
    readonly.set(this, {
      focused: true
    });
    await this.updateComplete;
  }
  async onReady(event) {
    readonly.set(this, {
      ready: true
    });
    await this.updateComplete;
    this.fire("ready", event);
  }
  async postRepresentation() {
    const onError = error => readonly.set(this, {
      error
    });
    const onSuccess = success => this.fire("success", success);
    const token = this.token || void 0;
    const source = this.source || void 0;
    const paymentMethod = this.paymentMethod || void 0;
    const body = JSON.stringify({
      token,
      source,
      paymentMethod
    });
    const headers = {
      "Content-Type": "application/json"
    };
    const method = "POST";
    return fetch(this.action, {
      body,
      headers,
      method
    }).then(throwBadResponse).then(onSuccess).catch(onError);
  }
  representationChanged(name) {
    if (!isRepresentation(name)) return;
    const value = this[name];
    if (!value) return;
    this.fire(`${dash(name)}`, value);
    if (this.action) this.postRepresentation();
  }
  resetRepresentations() {
    readonly.set(this, {
      paymentMethod: null,
      token: null,
      source: null
    });
  }
};
__decorateClass([e$4({
  type: String
})], StripeBase.prototype, "action", 2);
__decorateClass([e$4({
  type: String,
  attribute: "client-secret"
})], StripeBase.prototype, "clientSecret", 2);
__decorateClass([e$4({
  type: String
})], StripeBase.prototype, "generate", 2);
__decorateClass([notify, e$4({
  type: String,
  attribute: "publishable-key",
  reflect: true
})], StripeBase.prototype, "publishableKey", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "show-error",
  reflect: true
})], StripeBase.prototype, "showError", 2);
__decorateClass([e$4({
  type: String,
  attribute: "stripe-account"
})], StripeBase.prototype, "stripeAccount", 2);
__decorateClass([e$4({
  type: String,
  attribute: "locale"
})], StripeBase.prototype, "locale", 2);
__decorateClass([readonly, notify, e$4({
  type: Object,
  attribute: "payment-method"
})], StripeBase.prototype, "paymentMethod", 2);
__decorateClass([readonly, notify, e$4({
  type: Object
})], StripeBase.prototype, "source", 2);
__decorateClass([readonly, notify, e$4({
  type: Object
})], StripeBase.prototype, "token", 2);
__decorateClass([readonly, e$4({
  type: Object
})], StripeBase.prototype, "element", 2);
__decorateClass([readonly, e$4({
  type: Object
})], StripeBase.prototype, "elements", 2);
__decorateClass([readonly, notify, e$4({
  type: Object,
  reflect: true,
  converter: errorConverter
})], StripeBase.prototype, "error", 2);
__decorateClass([readonly, notify, e$4({
  type: Boolean,
  reflect: true
})], StripeBase.prototype, "focused", 2);
__decorateClass([readonly, notify, e$4({
  type: Boolean,
  reflect: true
})], StripeBase.prototype, "ready", 2);
__decorateClass([readonly, e$4({
  type: Object
})], StripeBase.prototype, "stripe", 2);
__decorateClass([e$4()], StripeBase.prototype, "theme", 2);
__decorateClass([e$4({
  attribute: "border-radius"
})], StripeBase.prototype, "borderRadius", 2);
__decorateClass([e$4({
  attribute: "color-background"
})], StripeBase.prototype, "colorBackground", 2);
__decorateClass([e$4({
  attribute: "color-danger"
})], StripeBase.prototype, "colorDanger", 2);
__decorateClass([e$4({
  attribute: "color-primary"
})], StripeBase.prototype, "colorPrimary", 2);
__decorateClass([e$4({
  attribute: "color-text"
})], StripeBase.prototype, "colorText", 2);
__decorateClass([e$4({
  attribute: "font-family"
})], StripeBase.prototype, "fontFamily", 2);
__decorateClass([e$4({
  attribute: "spacing-unit"
})], StripeBase.prototype, "spacingUnit", 2);
__decorateClass([bound], StripeBase.prototype, "handleResponse", 1);
__decorateClass([bound], StripeBase.prototype, "onBlur", 1);
__decorateClass([bound], StripeBase.prototype, "onFocus", 1);
__decorateClass([bound], StripeBase.prototype, "onReady", 1);
var styles = i`[hidden] {
  display: none !important;
}

:host:not([hidden]) {
  display: block;
  box-sizing: border-box;
}

#error {
  font-family: sans-serif;
  font-size: 14px;
  padding-left: 42px;
  padding-bottom: 10px;
}
`;
var shared_default = styles;
var styles2 = i`:host {
  min-width: var(--stripe-elements-width, 300px);
  min-height: var(--stripe-elements-height, 50px);
}

#stripe {
  box-sizing: border-box;
  border-radius: var(--stripe-elements-border-radius, 4px);
  border: var(--stripe-elements-border, 1px solid transparent);
  box-shadow: var(--stripe-elements-box-shadow, 0 1px 3px 0 #e6ebf1);
  transition: var(--stripe-elements-transition, box-shadow 150ms ease);
  min-width: var(--stripe-elements-width, 300px);
  padding: var(--stripe-elements-element-padding, 8px 12px);
  background: var(--stripe-elements-element-background, white);
}

:host([focused]) #stripe {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

:host([error]) #stripe {
  border-color: #fa755a;
}
`;
var stripe_elements_default = styles2;

// src/stripe-elements.ts
var ALLOWED_STYLES = ["color", "fontFamily", "fontSize", "fontStyle", "fontSmoothing", "fontVariant", "iconColor", "lineHeight", "letterSpacing", "textDecoration", "textShadow", "textTransform"];
var SUB_STYLES = [":hover", ":focus", "::placeholder", "::selection", ":-webkit-autofill", ":disabled"];
var StripeElements = class extends StripeBase {
  constructor() {
    super(...arguments);
    this.hideIcon = false;
    this.hidePostalCode = false;
    this.iconStyle = "default";
    this.value = {};
    this.brand = null;
    this.complete = false;
    this.empty = true;
    this.invalid = false;
  }
  async createPaymentMethod(paymentMethodData = this.getPaymentMethodData()) {
    return this.stripe.createPaymentMethod(paymentMethodData);
  }
  async createSource(sourceData = this.sourceData) {
    return this.stripe.createSource(this.element, sourceData);
  }
  async createToken(tokenData = this.tokenData) {
    return this.stripe.createToken(this.element, tokenData);
  }
  isPotentiallyValid() {
    return !this.complete && !this.empty && !this.error || this.validate();
  }
  reset() {
    super.reset();
    this.element?.clear();
  }
  async submit() {
    switch (this.generate) {
      case "payment-method":
        return this.createPaymentMethod();
      case "source":
        return this.createSource();
      case "token":
        return this.createToken();
      default:
        {
          const error = this.createError(`cannot generate ${this.generate}`);
          readonly.set(this, {
            error
          });
          await this.updateComplete;
          throw error;
        }
    }
  }
  validate() {
    const {
      complete,
      empty,
      error
    } = this;
    const isValid = !error && complete && !empty;
    if (empty && !error) readonly.set(this, {
      error: this.createError("Your card number is empty.")
    });
    return isValid;
  }
  updateStyle() {
    this.element?.update({
      style: this.getStripeElementsStyles()
    });
  }
  getPaymentMethodData() {
    const type = "card";
    const {
      billingDetails,
      paymentMethodData
    } = this;
    return {
      billing_details: billingDetails,
      ...paymentMethodData,
      type,
      card: this.element
    };
  }
  getStripeElementsStyles() {
    const getStyle = prop => this.getCSSCustomPropertyValue(prop) || void 0;
    const STATES = ["base", "complete", "empty", "invalid"];
    const subReducer = state => (acc, sub) => {
      if (state.includes("-")) return acc;
      const subProp = sub.split(":").pop();
      return {
        ...acc,
        [sub]: ALLOWED_STYLES.reduce(styleReducer(`${state}-${subProp}`), {})
      };
    };
    const styleReducer = state => (init, p) => {
      const prop = `--stripe-elements-${state}-${dash(p)}`;
      return {
        ...init,
        [p]: getStyle(prop),
        ...SUB_STYLES.reduce(subReducer(state), {})
      };
    };
    return STATES.reduce((acc, state) => ({
      ...acc,
      [state]: ALLOWED_STYLES.reduce(styleReducer(state), {})
    }), {});
  }
  async initElement() {
    if (!this.stripe) return;
    const {
      hidePostalCode,
      hideIcon,
      iconStyle,
      value
    } = this;
    const style = this.getStripeElementsStyles();
    await this.updateComplete;
    const element = this.createElement({
      hideIcon,
      hidePostalCode,
      iconStyle,
      style,
      value
    });
    element.on("change", this.onChange);
    readonly.set(this, {
      element
    });
    await this.updateComplete;
  }
  createElement(options) {
    const element = this.elements.create("card", options);
    return element;
  }
  async onChange(event) {
    const {
      brand,
      complete,
      empty,
      error = null
    } = event;
    const invalid = !(error || !empty && !complete);
    readonly.set(this, {
      brand,
      complete,
      empty,
      error,
      invalid
    });
    await this.updateComplete;
    this.fire("change", event);
  }
};
StripeElements.is = "stripe-elements";
StripeElements.elementType = "card";
StripeElements.styles = [shared_default, stripe_elements_default];
__decorateClass([e$4({
  type: Boolean,
  attribute: "hide-icon"
})], StripeElements.prototype, "hideIcon", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "hide-postal-code"
})], StripeElements.prototype, "hidePostalCode", 2);
__decorateClass([e$4({
  type: String,
  attribute: "icon-style"
})], StripeElements.prototype, "iconStyle", 2);
__decorateClass([e$4({
  type: Object
})], StripeElements.prototype, "value", 2);
__decorateClass([notify, readonly, e$4({
  type: String
})], StripeElements.prototype, "brand", 2);
__decorateClass([notify, readonly, e$4({
  type: Boolean,
  reflect: true
})], StripeElements.prototype, "complete", 2);
__decorateClass([notify, readonly, e$4({
  type: Boolean,
  reflect: true
})], StripeElements.prototype, "empty", 2);
__decorateClass([notify, readonly, e$4({
  type: Boolean,
  reflect: true
})], StripeElements.prototype, "invalid", 2);
__decorateClass([stripeMethod], StripeElements.prototype, "createPaymentMethod", 1);
__decorateClass([stripeMethod], StripeElements.prototype, "createSource", 1);
__decorateClass([stripeMethod], StripeElements.prototype, "createToken", 1);
__decorateClass([bound], StripeElements.prototype, "onChange", 1);
StripeElements = __decorateClass([e$3("stripe-elements")], StripeElements);
var styles3 = i`#stripe {
  box-sizing: border-box;
  min-width: var(--stripe-payment-request-element-min-width, 300px);
  padding: var(--stripe-payment-request-element-padding, 8px 12px);
  background: var(--stripe-payment-request-element-background, white);
}
`;
var stripe_payment_request_default = styles3;
function isStripeDisplayItem(el) {
  return el.tagName.toLowerCase() === "stripe-display-item";
}
function datasetToStripeDisplayItem({
  dataset: {
    amount,
    label,
    pending
  }
}) {
  return {
    label,
    amount: parseInt(amount),
    ...(pending !== void 0 && {
      pending: pending === "true" ? true : false
    })
  };
}
function datasetToStripeShippingOption({
  dataset: {
    amount,
    detail,
    ...rest
  }
}) {
  return {
    amount: parseInt(amount),
    detail,
    ...rest
  };
}
function mapDataset(el) {
  return isStripeDisplayItem(el) ? datasetToStripeDisplayItem(el) : datasetToStripeShippingOption(el);
}
var _displayItems, _shippingOptions;
var StripePaymentRequest = class extends StripeBase {
  constructor() {
    super(...arguments);
    this.canMakePayment = null;
    __privateAdd(this, _displayItems, void 0);
    this.paymentIntent = null;
    this.paymentRequest = null;
    this.pending = false;
    __privateAdd(this, _shippingOptions, void 0);
    this.buttonType = "default";
    this.buttonTheme = "dark";
    this.complete = async (paymentResponse, confirmationError) => {
      const {
        error: paymentResponseError = null
      } = {
        ...paymentResponse
      };
      const status = paymentResponseError || confirmationError ? "fail" /* fail */ : "success" /* success */;
      paymentResponse.complete(status);
      this.fire(status, paymentResponse);
      return confirmationError ? {
        error: confirmationError
      } : paymentResponse;
    };
  }
  get displayItems() {
    const value = __privateGet(this, _displayItems);
    return Array.isArray(value) ? value : this.parseDatasets("stripe-display-item");
  }
  set displayItems(value) {
    const oldValue = this.displayItems;
    __privateSet(this, _displayItems, value);
    this.requestUpdate("displayItems", oldValue);
  }
  get shippingOptions() {
    const value = __privateGet(this, _shippingOptions);
    return Array.isArray(value) ? value : this.parseDatasets("stripe-shipping-option");
  }
  set shippingOptions(value) {
    const oldValue = this.shippingOptions;
    __privateSet(this, _shippingOptions, value);
    this.requestUpdate("shippingOptions", oldValue);
  }
  reset() {
    super.reset();
    readonly.set(this, {
      paymentIntent: null
    });
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("generate")) this.initPaymentRequestListeners();
    if (changed.has("amount")) this.updatePaymentRequest();
  }
  getStripePaymentRequestOptions() {
    const {
      country,
      currency,
      displayItems,
      shippingOptions,
      requestShipping,
      requestPayerEmail,
      requestPayerName,
      requestPayerPhone,
      label = "",
      amount = 0
    } = this;
    const total = {
      label,
      amount
    };
    return {
      country,
      currency,
      displayItems,
      requestPayerEmail,
      requestPayerName,
      requestPayerPhone,
      requestShipping,
      shippingOptions,
      total
    };
  }
  async initElement() {
    await this.initPaymentRequest();
    await this.initPaymentRequestListeners();
    await this.initPaymentRequestButton();
  }
  async initPaymentRequest() {
    if (!this.stripe) return;
    const stripePaymentRequestOptions = this.getStripePaymentRequestOptions();
    const paymentRequest = this.stripe.paymentRequest(stripePaymentRequestOptions);
    const canMakePayment = await paymentRequest.canMakePayment();
    readonly.set(this, {
      paymentRequest,
      canMakePayment
    });
    await this.updateComplete;
    if (!this.canMakePayment) this.fire("unsupported");
  }
  async initPaymentRequestButton() {
    const {
      buttonTheme: theme,
      buttonType: type,
      canMakePayment
    } = this;
    if (!canMakePayment || !this.elements) return;
    const propertyName = "--stripe-payment-request-button-height";
    const height = this.getCSSCustomPropertyValue(propertyName) || "40px";
    const style = {
      paymentRequestButton: {
        height,
        theme,
        type
      }
    };
    const element = this.elements.create("paymentRequestButton", {
      paymentRequest: this.paymentRequest,
      style
    });
    readonly.set(this, {
      element
    });
    await this.updateComplete;
  }
  async initPaymentRequestListeners() {
    if (!this.canMakePayment) return;
    this.paymentRequest.on("click", this.updatePaymentRequest);
    this.paymentRequest.on("cancel", this.onCancel);
    this.paymentRequest.on("shippingaddresschange", this.onShippingaddresschange);
    this.paymentRequest.on("shippingoptionchange", this.onShippingoptionchange);
    switch (this.generate) {
      case "payment-method":
        this.paymentRequest.on("paymentmethod", this.onPaymentResponse);
        break;
      case "source":
        this.paymentRequest.on("source", this.onPaymentResponse);
        break;
      case "token":
        this.paymentRequest.on("token", this.onPaymentResponse);
        break;
    }
  }
  async updatePaymentRequest() {
    if (!this.paymentRequest) return;
    const {
      currency,
      total,
      displayItems,
      shippingOptions
    } = this.getStripePaymentRequestOptions();
    this.paymentRequest.update({
      currency,
      total,
      displayItems,
      shippingOptions
    });
  }
  onCancel() {
    this.fire("cancel" /* cancel */);
  }

  async onPaymentResponse(event) {
    const {
      error = null,
      paymentMethod = null,
      source = null,
      token = null
    } = {
      ...event
    };
    readonly.set(this, {
      error,
      paymentMethod,
      source,
      token
    });
    const isPaymentIntent = this.clientSecret && !error;
    if (isPaymentIntent) this.confirmPaymentIntent(event);else this.complete(event);
  }
  async confirmPaymentIntent(paymentResponse) {
    const confirmCardData = {
      payment_method: this.paymentMethod.id
    };
    const response = await this.confirmCardPayment(confirmCardData, {
      handleActions: false
    }).then(({
      error: confirmationError
    }) => this.complete(paymentResponse, confirmationError)).then(throwResponseError).then(() => this.confirmCardPayment()).then(throwResponseError).catch(error2 => ({
      error: error2
    }));
    const {
      error = null
    } = response;
    const paymentIntent = response.paymentIntent ?? null;
    readonly.set(this, {
      error,
      paymentIntent
    });
    await this.updateComplete;
  }
  async confirmCardPayment(data, options) {
    return this.stripe.confirmCardPayment(this.clientSecret, data, options);
  }
  onShippingaddresschange(originalEvent) {
    this.fire("shippingaddresschange", originalEvent);
  }
  onShippingoptionchange(originalEvent) {
    this.fire("shippingoptionchange", originalEvent);
  }
  parseDatasets(selector) {
    const elements = [...this.querySelectorAll(selector)];
    return !elements.length ? [] : elements.map(mapDataset);
  }
};
_displayItems = new WeakMap();
_shippingOptions = new WeakMap();
StripePaymentRequest.is = "stripe-payment-request";
StripePaymentRequest.styles = [shared_default, stripe_payment_request_default];
__decorateClass([e$4({
  type: Number,
  reflect: true
})], StripePaymentRequest.prototype, "amount", 2);
__decorateClass([notify, readonly, e$4({
  type: Boolean,
  attribute: "can-make-payment",
  reflect: true
})], StripePaymentRequest.prototype, "canMakePayment", 2);
__decorateClass([e$4({
  type: String
})], StripePaymentRequest.prototype, "country", 2);
__decorateClass([e$4({
  type: String
})], StripePaymentRequest.prototype, "currency", 2);
__decorateClass([e$4({
  type: Array
})], StripePaymentRequest.prototype, "displayItems", 1);
__decorateClass([e$4({
  type: String,
  reflect: true
})], StripePaymentRequest.prototype, "label", 2);
__decorateClass([notify, readonly, e$4({
  type: Object,
  attribute: "payment-intent"
})], StripePaymentRequest.prototype, "paymentIntent", 2);
__decorateClass([readonly, e$4({
  type: Object,
  attribute: "payment-request"
})], StripePaymentRequest.prototype, "paymentRequest", 2);
__decorateClass([e$4({
  type: Boolean,
  reflect: true
})], StripePaymentRequest.prototype, "pending", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "request-payer-email"
})], StripePaymentRequest.prototype, "requestPayerEmail", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "request-payer-name"
})], StripePaymentRequest.prototype, "requestPayerName", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "request-payer-phone"
})], StripePaymentRequest.prototype, "requestPayerPhone", 2);
__decorateClass([e$4({
  type: Boolean,
  attribute: "request-shipping"
})], StripePaymentRequest.prototype, "requestShipping", 2);
__decorateClass([e$4({
  type: Array
})], StripePaymentRequest.prototype, "shippingOptions", 1);
__decorateClass([e$4({
  type: String,
  attribute: "button-type"
})], StripePaymentRequest.prototype, "buttonType", 2);
__decorateClass([e$4({
  type: String,
  attribute: "button-theme"
})], StripePaymentRequest.prototype, "buttonTheme", 2);
__decorateClass([bound], StripePaymentRequest.prototype, "onCancel", 1);
__decorateClass([bound], StripePaymentRequest.prototype, "onPaymentResponse", 1);
__decorateClass([bound], StripePaymentRequest.prototype, "confirmPaymentIntent", 1);
__decorateClass([bound], StripePaymentRequest.prototype, "confirmCardPayment", 1);
__decorateClass([bound], StripePaymentRequest.prototype, "onShippingaddresschange", 1);
__decorateClass([bound], StripePaymentRequest.prototype, "onShippingoptionchange", 1);
StripePaymentRequest = __decorateClass([e$3("stripe-payment-request")], StripePaymentRequest);

class SkhemataFormStripe extends s$3 {
  constructor() {
    super(...arguments);
    this.unsupported = false;
    this.publishableKey = '';
    this.submitDisabled = false;
    this.clientSecret = '';
    this.contributionSk = '';
    this.contributionId = '';
    this.confirmInfo = {};
    // onChange(e: any) {
    //   this.submitDisabled = !(e.target.complete && !e.target.hasError);
    // }
    // onClick() {
    //   const stripe: any = this.shadowRoot?.querySelector('stripe-elements');
    //   stripe.submit();
    // }
    // onError(e: any) {
    //   this.error = e.target.error;
    // }
    // onFail(event: { detail: any }) {
    //   this.output = event.detail;
    // }
    // onReady() {
    //   this.unsupported = false;
    // }
    // onSuccess(event: { detail: any }) {
    //   this.output = event.detail;
    // }
    // onUnsupported() {
    //   this.unsupported = true;
    // }
  }
  // onChange(e: any) {
  //   this.submitDisabled = !(e.target.complete && !e.target.hasError);
  // }
  // onClick() {
  //   const stripe: any = this.shadowRoot?.querySelector('stripe-elements');
  //   stripe?.createSource();
  //   const stripeRequest: any = this.shadowRoot?.querySelector(
  //     'stripe-payment-request'
  //   );
  //   stripeRequest?.createPaymentMethod({
  //     type: 'card',
  //     card: {
  //       number: '4242424242424242',
  //       exp_month: 12,
  //       exp_year: 2023,
  //       cvc: '123',
  //     },
  //   });
  // }
  onSource(e) {
    this.source = e.detail.source;
  }
  // onError(e: any) {
  //   this.error = e.target.error;
  // }
  async firstUpdated() {
    var _a, _b;
    // change to Stripe object ????
    this.stripeElements = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('stripe-elements');
    this.stripePaymentRequest = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('stripe-payment-request');
  }
  render() {
    console.log('same key but here: ', this.publishableKey);
    return y`
    <div class="field">
      <label class="label"></label>
      <div class="control">

        <stripe-elements     
          hide-postal-code = "true"  
          publishable-key="${l$3(this.publishableKey)}"
        ></stripe-elements>

      </div>
    </div>
  </div>
    `;
  }
}
SkhemataFormStripe.styles = [Bulma, i`
      stripe-elements {
        --stripe-elements-base-line-height: 1.57rem;
        --stripe-elements-border: 1px solid #dbdbdb;
      }
    `];
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "error", void 0);
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "output", void 0);
__decorate([e$4({
  type: Boolean
})], SkhemataFormStripe.prototype, "unsupported", void 0);
__decorate([e$4({
  type: String,
  attribute: 'publishable-key'
})], SkhemataFormStripe.prototype, "publishableKey", void 0);
__decorate([e$4({
  type: Boolean
})], SkhemataFormStripe.prototype, "submitDisabled", void 0);
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "source", void 0);
__decorate([e$4({
  type: String,
  attribute: 'secret-key'
})], SkhemataFormStripe.prototype, "clientSecret", void 0);
__decorate([e$4({
  type: String,
  attribute: 'contributionSk'
})], SkhemataFormStripe.prototype, "contributionSk", void 0);
__decorate([e$4({
  type: String,
  attribute: 'contributionId'
})], SkhemataFormStripe.prototype, "contributionId", void 0);
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "confirmInfo", void 0);
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "stripeElements", void 0);
__decorate([e$4({
  type: Object
})], SkhemataFormStripe.prototype, "stripePaymentRequest", void 0);

/* eslint-disable no-console */
/* eslint-disable import/extensions */
const API_URL = 'https://coral.thrinacia.com/api/service/restv1';
async function loginRequest(url, method, data) {
  let resp;
  try {
    resp = await fetch(API_URL + url, {
      method,
      body: JSON.stringify(data)
    });
    console.log('RESPONSE: ', resp);
  } catch (error) {
    console.log('ERROR: ', error);
  }
  return resp;
}

class LoginContribution extends s$3 {
  constructor() {
    super(...arguments);
    this.submitDisabled = false;
    //   firstUpdated() {}
    this.handleLogin = async () => {
      var _a, _b;
      if (this.shadowRoot) {
        const email = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input[type="email"]');
        const password = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input[type="password"]');
        if (email.value && password.value) {
          const info = {
            email: email.value,
            password: password.value
          };
          const res = await loginRequest('/authenticate', 'POST', info);
          const data = await res.json();
          if (data.auth_token !== undefined) {
            window.localStorage.setItem('skhemataToken', data.auth_token);
          }
          this.handleAuthStateChange();
          this.requestUpdate();
        }
      }
    };
  }
  render() {
    return y`
      <div class="field formWrapper">
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <div class="control">
          <input class="input" type="password" placeholder="Password" />
        </div>

        <button class="button" @click="${this.handleLogin}">
          Login
        </button>
      </div>
    `;
  }
}
LoginContribution.styles = [Bulma, i`
    .formWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .formWrapper div {
      width: 100%;
    }
  `];
__decorate([e$4({
  type: Boolean
})], LoginContribution.prototype, "submitDisabled", void 0);
__decorate([e$4({
  type: Boolean
})], LoginContribution.prototype, "authState", void 0);
__decorate([e$4({
  type: Function
})], LoginContribution.prototype, "handleAuthStateChange", void 0);

class CreateAccountContribution extends s$3 {
  constructor() {
    super(...arguments);
    this.submitDisabled = false;
    this.authState = false;
    //   firstUpdated() {
    //   }
    this.handleCreateAccount = async () => {
      var _a, _b, _c, _d, _e;
      if (this.shadowRoot) {
        const firstName = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('firstName');
        const lastName = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('lastName');
        const email = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('email');
        const password = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('password');
        const confirmPassword = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById('confirmPassword');
        if (email.value && password.value && firstName.value && lastName.value && password.value === confirmPassword.value) {
          const info = {
            email: email.value,
            first_name: firstName.value,
            inline_registration: true,
            last_name: lastName.value,
            password: password.value,
            password_confirm: confirmPassword.value
          };
          const res = await loginRequest('/register', 'POST', info);
          const data = await res.json();
          if (data.auth_token !== undefined) {
            window.localStorage.setItem('skhemataToken', data.auth_token);
          }
          this.handleAuthStateChange();
          this.requestUpdate();
        } else if (password.value !== confirmPassword.value) {
          console.log('Passwords do not match');
        } else {
          console.log('Please fill out all fields');
        }
      }
    };
  }
  render() {
    return y`
      <div class="field formWrapper">
        <div class="control double-box-wrapper">
          <input class="input" type="text" id="firstName" placeholder="First Name" />
          <input class="input" type="text" id="lastName" placeholder="Last Name" />
        </div>
        <div class="control">
          <input class="input" type="email" id="email" placeholder="Email" />
        </div>
        <div class="control double-box-wrapper">
          <input class="input" type="password" id="password" placeholder="Password" />
          <input class="input" type="password" id="confirmPassword" placeholder="Confirm Password" />
        </div>

        <button class="button" @click="${this.handleCreateAccount}">
          Create Account
        </button>
      </div>
    `;
  }
}
CreateAccountContribution.styles = [Bulma, i`
    .formWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .formWrapper div {
      width: 100%;
    }

    .double-box-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  `];
__decorate([e$4({
  type: Boolean
})], CreateAccountContribution.prototype, "submitDisabled", void 0);
__decorate([e$4({
  type: Boolean
})], CreateAccountContribution.prototype, "authState", void 0);
__decorate([e$4({
  type: Function
})], CreateAccountContribution.prototype, "handleAuthStateChange", void 0);

class ExpressCheckoutContribution extends s$3 {
  constructor() {
    super(...arguments);
    this.submitDisabled = false;
  }
  //   firstUpdated() {
  //   }
  render() {
    return y`
      <div class="field formWrapper">
        <div class="control double-box-wrapper">
          <input class="input" type="text" placeholder="First Name" />
          <input class="input" type="text" placeholder="Last Name" />
        </div>
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>

        <button class="button">
          Express Checkout
        </button>
      </div>
    `;
  }
}
ExpressCheckoutContribution.styles = [Bulma, i`
    .formWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .formWrapper div {
      width: 100%;
    }

    .double-box-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  `];
__decorate([e$4({
  type: Boolean
})], ExpressCheckoutContribution.prototype, "submitDisabled", void 0);

class Menu extends SkhemataBase {
  constructor() {
    super(...arguments);
    this.userData = {
      email: '',
      first_name: '',
      last_name: ''
    };
    this.loadUser = async () => {
      const url = `${this.apiFull}authenticate`;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${window.localStorage.getItem('skhemataToken')}`
        }
      });
      const data = await res.json();
      const {
        first_name,
        last_name,
        email
      } = data;
      this.userData = {
        first_name,
        last_name,
        email
      };
    };
    // logout
    this.handleLogout = () => {
      const url = `${this.apiFull}logout`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        window.localStorage.removeItem('skhemataToken');
        this.handleAuthStateChange();
        this.requestUpdate();
      }).catch(e => console.log(e));
    };
  }
  async firstUpdated() {
    await super.firstUpdated();
    await this.loadUser();
  }
  render() {
    return y`
      <div class="dropdown is-hoverable menuDropdown">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span>${this.userData.first_name}</span>
                <span class="icon is-small">
                <svg
                    viewbox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width: 12px; height: 12px"
                >
                    <path
                    d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                    fill="currentColor"
                    ></path>
                </svg>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
            <div class="dropdown-item">
                <a>Profile</a>
            </div>
            <div class="dropdown-item">
                <a @click="${this.handleLogout}">Log Out</a>
            </div>
            </div>
        </div>
    </div>
    `;
  }
}
Menu.styles = [Bulma, i`
        
        .menuDropdown .dropdown-trigger button,
        .menuDropdown .dropdown-trigger button:focus {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          outline: none;
        }
        .menuDropdown .dropdown-content {
          width: 60%;
          text-align: left;
        }
    `];
__decorate([e$4({
  type: String
})], Menu.prototype, "apiFull", void 0);
__decorate([e$4({
  type: Object
})], Menu.prototype, "userData", void 0);
__decorate([e$4({
  type: Boolean
})], Menu.prototype, "authState", void 0);
__decorate([e$4({
  type: Function
})], Menu.prototype, "handleAuthStateChange", void 0);

class CampaignProfile extends s$3 {
  constructor() {
    super(...arguments);
    this.openStatus = false;
    //   async firstUpdated() {}
    this.handleRewardOpen = () => {
      this.openStatus = !this.openStatus;
    };
  }
  static get scopedElements() {
    return {
      'menu-component': Menu
    };
  }
  render() {
    var _a, _b, _c, _d;
    console.log(this.campaign);
    return y`
      <div class="campaign-info-container">
        <div class="campaign-info">
          <div class="image-box">
            <img
              src="${`https://coral.thrinacia.com/api/image/campaign_detail_large/${(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.files[0].path_external}`}"
              alt=""
            />
          </div>
          <div>
            <h1>${(_b = this.campaign) === null || _b === void 0 ? void 0 : _b.name}</h1>
            <span
              >by
              <b
                >${(_c = this.campaign) === null || _c === void 0 ? void 0 : _c.managers[0].first_name}
                ${(_d = this.campaign) === null || _d === void 0 ? void 0 : _d.managers[0].last_name}</b
              >
            </span>
          </div>
          <div class="campaign-info-menuWrapper">
            <menu-component></menu-component>
          </div>
        </div>
      </div>
    `;
  }
}
CampaignProfile.styles = [Bulma, i`
      /* .cardReward {
        max-width: 300px;
        margin: 0 auto;
      } */

      .cardReward header {
        cursor: pointer;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      .image-box {
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #e6e6e6;
      }

      .campaign-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.33em;
        text-transform: none;
        color: rgba(0, 0, 0, 0.8);
        text-transform: capitalize;
      }
    `];
__decorate([e$4({
  type: Boolean
})], CampaignProfile.prototype, "openStatus", void 0);
__decorate([e$4({
  type: Object
})], CampaignProfile.prototype, "campaign", void 0);

class CardInfo extends SkhemataBase {
  constructor() {
    super(...arguments);
    //   async firstUpdated() {}
    this.handleNameOnCardChange = e => {
      this.nameOnCard = e.target.value;
    };
  }
  static get scopedElements() {
    return {
      // 'menu-component': Menu,
    };
  }
  render() {
    return y`
        <div class="field cardInformaionWrapper">
            
            <h3 class="title">Card Information</h3>

            <div class="reward-section-box">
                <div class="control">
                    <input
                    class="input ${this.nameOnCardError ? "is-danger" : ""}"
                    type="text"
                    placeholder="Name on Card"
                    @change="${this.handleNameOnCardChange}"
                    />
                    ${this.nameOnCardError ? y`<p class="help is-danger">${this.nameOnCardError}</p>` : y``}
                </div>

                <div class="control trible-box-wrapper">
                    <input
                        class="input"
                        type="text"
                        placeholder="Credit Card Number"
                    />
                    <input
                        class="input"
                        type="text"
                        placeholder="MM/YY"
                    />
                    <input
                        class="input"
                        type="text"
                        placeholder="CVC"
                    />
                </div>
            </div>
        </div>
    `;
  }
}
CardInfo.styles = [Bulma, i`
        .cardInformaionWrapper {
            margin-top: 3rem;
        }

        .trible-box-wrapper {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 1rem;
        }
    
    `];
__decorate([e$4({
  type: Object
})], CardInfo.prototype, "campaign", void 0);
__decorate([e$4({
  type: String,
  attribute: 'nameOnCard'
})], CardInfo.prototype, "nameOnCard", void 0);
__decorate([e$4({
  type: String,
  attribute: 'nameOnCardError'
})], CardInfo.prototype, "nameOnCardError", void 0);

class CampaignContribution extends SkhemataBase {
  constructor() {
    super(...arguments);
    // static get scopedElements() {
    //   return {
    //   };
    // }
    this.stripeInfo = {
      secret_key: '',
      publishable_key: '',
      country_id: 0
    };
    this.contributionObj = {
      secret_key: '',
      publishable_key: '',
      id: '',
      confirmInfo: {
        entry_id: '',
        stripe_transaction_id: ''
      }
    };
    this.chosenReward = 'standard';
    this.currencySymbols = {
      ALL: 'L',
      AFN: '؋',
      ARS: '$',
      AWG: 'ƒ',
      AUD: '$',
      AZN: '₼',
      BSD: '$',
      BBD: '$',
      BYR: 'p.',
      BZD: 'BZ$',
      BMD: '$',
      BOB: 'Bs.',
      BAM: 'KM',
      BWP: 'P',
      BGN: 'лв',
      BRL: 'R$',
      BND: '$',
      BIF: 'FBu',
      KHR: '៛',
      CAD: '$',
      KYD: '$',
      CLP: '$',
      CNY: '¥',
      COP: '$',
      CRC: '₡',
      HRK: 'kn',
      CUP: '₱',
      CZK: 'Kč',
      DKK: 'kr',
      DOP: 'RD$',
      XCD: '$',
      EGP: '£',
      SVC: '₡',
      EEK: 'kr',
      EUR: '€',
      FKP: '£',
      FJD: '$',
      GHC: 'GH₵',
      GIP: '£',
      GTQ: 'Q',
      GGP: '£',
      GYD: '$',
      HNL: 'L',
      HKD: '$',
      HUF: 'Ft',
      ISK: 'kr',
      INR: '₹',
      IDR: 'Rp',
      IRR: '﷼',
      IMP: '£',
      ILS: '₪',
      JMD: '$',
      JPY: '¥',
      JEP: '£',
      KES: 'KSh',
      KZT: '₸',
      KPW: '₩',
      KRW: '₩',
      KGS: 'лв',
      LAK: '₭',
      LVL: 'Ls',
      LBP: 'ل.ل',
      LRD: '$',
      LTL: 'Lt',
      MKD: 'ден',
      MYR: 'RM',
      MUR: '₨',
      MXN: '$',
      MNT: '₮',
      MZN: 'MT',
      NAD: '$',
      NPR: '₨',
      ANG: 'ƒ',
      NZD: '$',
      NIO: 'C$',
      NGN: '₦',
      NOK: 'kr',
      OMR: 'ر.ع.',
      PKR: '₨',
      PAB: 'B/.',
      PYG: '₲',
      PEN: 'S/.',
      PHP: '₱',
      PLN: 'zł',
      QAR: 'ر.ق',
      RON: 'lei',
      RUB: '₽',
      RMB: '￥',
      SHP: '£',
      SAR: 'ر.س',
      RSD: 'Дин.',
      SCR: '₨',
      SGD: '$',
      SBD: '$',
      SOS: 'Sh.So.',
      ZAR: 'R',
      LKR: 'Rs',
      SEK: 'kr',
      CHF: 'Fr.',
      SRD: '$',
      SYP: '£',
      TZS: 'TSh',
      TWD: 'NT$',
      THB: '฿',
      TTD: 'TT$',
      TRY: '₺',
      TRL: '₺',
      TVD: '$',
      UGX: 'USh',
      UAH: '₴',
      GBP: '£',
      USD: '$',
      UYU: '$U',
      UZS: "so'm",
      VEF: 'Bs.',
      VND: '₫',
      YER: '﷼',
      ZWD: 'Z$'
    };
    this.currentTab = 'Login';
    this.submitDisabled = false;
    this.loadingState = false;
    this.authState = false;
    this.contributionAmount = 1;
    this.openStatus = true;
    this.handleRewardOpen = () => {
      this.openStatus = !this.openStatus;
    };
    this.handleAuthStateChange = () => {
      const authToken = window.localStorage.getItem('skhemataToken');
      if (authToken !== null) {
        this.authState = true;
        this.getStripeKeys();
      } else {
        this.authState = false;
      }
      this.requestUpdate();
    };
    this.getStripeKeys = async () => {
      const authToken = window.localStorage.getItem('skhemataToken');
      // StripeInfo
      if (this.authState) {
        try {
          const response = await fetch(`${this.apiFull}account/stripe/application`, {
            // credentials: 'include',
            headers: {
              'X-Auth-Token': authToken || ''
            }
          });
          const data = await response.json();
          this.stripeInfo.secret_key = data.secret_key;
          this.stripeInfo.publishable_key = data.publishable_key;
          this.stripeInfo.country_id = data.country_id;
        } catch (error) {
          console.log(error);
        }
      }
    };
    this.handleContribution = async () => {
      // https://stripe.com/docs/payments/quickstart
      var _a;
      if (this.nameOnCard && this.contributionAmount) {
        this.nameOnCardError = '';
        this.contributionAmountError = '';
        const skhemataFormStripe = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('skhemata-form-stripe');
        const {
          stripeElements
        } = skhemataFormStripe;
        try {
          this.loadingState = true;
          // Get the Stripe token
          const token = await (stripeElements === null || stripeElements === void 0 ? void 0 : stripeElements.createToken());
          console.log('token: ', token);
          // Check the card
          const cardInfo = {
            name: this.nameOnCard,
            number: '',
            cvc: '',
            card_token: token.token.id
          };
          const response = await fetch(`${this.apiFull}account/stripe/2/card/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('skhemataToken') || ''
            },
            body: JSON.stringify(cardInfo)
          });
          // Insufficient funds and other errors will be shown here:
          const dataResp = await response.json();
          console.log('response1: ', dataResp);
          // Plege to campaign
          const pledgeInfo = {
            amount: this.contributionAmount,
            anonymous_contribution: null,
            anonymous_contribution_partial: null,
            pledge_level_id: null,
            stripe_account_card_id: dataResp.stripe_account_card_id,
            shipping_address_id: null,
            phone_number_id: null,
            use_sca: 1
          };
          const response2 = await fetch(`${this.apiFull}campaign/1/pledge`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('skhemataToken') || ''
            },
            body: JSON.stringify(pledgeInfo)
          });
          const dataResp2 = await response2.json();
          console.log('response2: ', dataResp2);
          if (dataResp2.message === 'Campaign not approved') {
            this.campaignError = 'Campaign not approved';
          }
          if (dataResp2.payment_intent_status === 'requires_action') {
            // Use Stripe.js to handle required card action
            this.stripe.handleCardAction(dataResp2.payment_intent_client_secret).then(result => {
              // if (result.error) {
              console.log('paymentIntent: ', result);
              fetch(`${this.apiFull}account/stripe/payment-intent-direct/confirm/${result.paymentIntent.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': localStorage.getItem('skhemataToken') || ''
                }
                // body: JSON.stringify({}),
              }).then(finalRes => {
                console.log('response final: ', finalRes);
              }).catch(e => console.log('e2', e));
            }).catch(e => console.log(e));
          }
          this.stripeCardError = '';
          this.loadingState = false;
          this.requestUpdate();
        } catch (error) {
          console.log('Error: ', error);
          this.loadingState = false;
          this.stripeCardError = error.message;
        }
      } else {
        if (!this.nameOnCard) {
          this.nameOnCardError = 'This field cannot be empty';
        } else {
          this.nameOnCardError = '';
        }
        if (!this.contributionAmount) {
          this.contributionAmountError = 'This field cannot be empty';
        } else {
          this.contributionAmountError = '';
        }
      }
    };
    this.postData = async (url = '', data = {}) => {
      // Default options are marked with *
      await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('skhemataToken') || ''
        },
        body: JSON.stringify(data)
      });
    };
    this.dropdownHandle = () => {
      if (this.shadowRoot) {
        const dropdown = this.shadowRoot.querySelector('.dropdown');
        if (dropdown) {
          dropdown.classList.toggle('is-active');
        }
      }
    };
    this.handleNameOnCardChange = e => {
      this.nameOnCard = e.target.value;
    };
    // Login
    this.handleLogin = async () => {
      const data = {
        email: 'myadmin@thrinacia.com',
        password: '__bootstrap__'
      };
      fetch(`${this.apiFull}authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json()).then(user => {
        window.localStorage.setItem('skhemataToken', user.auth_token);
        this.handleAuthStateChange();
        this.requestUpdate();
      }).catch(error => {
        console.error('Error:', error);
      });
    };
    // logout
    this.handleLogout = () => {
      fetch(`${this.apiFull}logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        window.localStorage.removeItem('skhemataToken');
        this.handleAuthStateChange();
        this.requestUpdate();
      }).catch(e => console.log(e));
    };
    this.handleTabSwitch = (event, tab) => {
      this.currentTab = tab;
    };
    this.handleContributionAmount = event => {
      const {
        value
      } = event.target;
      this.contributionAmount = value;
    };
    this.handleChosenReward = (reward, pledge) => {
      if (reward === 'standard') {
        if (this.contributionAmount > 1) {
          this.contributionAmount = 1;
        }
        this.chosenReward = reward;
        this.openStatus = true;
      } else {
        this.chosenReward = pledge.name;
        this.contributionAmount = pledge.amount;
        this.openStatus = false;
      }
    };
  }
  static get styles() {
    return [...super.styles, i`
        stripe-elements {
          --stripe-elements-base-line-height: 1.57rem;
          --stripe-elements-border: 1px solid #dbdbdb;
        }

        *, ::before, ::after {
            box-sizing: border-box;
        }

        .contribution-container-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;

          margin-top: 2rem;
        }

        .reward-section-box {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        /* .choose-reward-section {
          grid-row: 1 / 3;
        } */

        .review-payment-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .total-amount-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-amount-box h4 {
          font-weight: 600;
          font-size: 1.5rem;
        }

        .contribution-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-back {
          background-color: #000000;
          color: #ffffff;
          padding: 0.2rem 0.7rem;
          border-radius: 0.5rem;
          border: none;
        }

        .contribution-container-left {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }


        .reward-btn {
          border: 5px solid black;
          border-radius: 0.5rem;
        }

        .cardReward {
          cursor: pointer;
        }

        .title {
          border-bottom: 1px solid rgba(34, 36, 38, 0.15);
          padding-bottom: 4px;
        }

        .review-payment-section .contributeBtn {
          max-height: 40px !important;
        }

        .dropdown .button {
          justify-content: space-between;
          width: 200px;
        }

       /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        .btn-back-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr; 
        }

        .btn-back-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 3rem;
        }

      `];
  }
  static get scopedElements() {
    return {
      'skhemata-form-stripe': SkhemataFormStripe,
      'login-contribution': LoginContribution,
      'create-account-contribution': CreateAccountContribution,
      'express-checkout-contribution': ExpressCheckoutContribution,
      'card-reward-component': CardReward,
      'campaign-profile': CampaignProfile,
      'menu-component': Menu,
      'card-information-component': CardInfo
    };
  }
  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    var _a;
    await super.firstUpdated();
    this.handleAuthStateChange();
    await this.getStripeKeys();
    this.stripeElements = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('stripe-elements');
    this.initStripe();
  }
  initStripe() {
    if (window.Stripe && this.authState) {
      const stripe = window.Stripe(this.stripeInfo.publishable_key);
      this.stripe = stripe;
    } else {
      console.log('Stripe is not loaded');
    }
  }
  // https://stripe.com/docs/payments/quickstart
  render() {
    var _a, _b, _c, _d;
    return y`<div class="container">
      <div>
        <campaign-profile .campaign=${this.campaign}></campaign-profile>
      </div>
      <!-- <script src="https://js.stripe.com/v3/"></script> -->
      <div class="btn-back-wrapper">
        <div class="btn-back-container">
          <button class="button btn-back" @click="${this.handleBack}">Back</button>
          
          <div class="contribution-menuWrapper">
            <menu-component .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}" .apiFull="${this.apiFull}"></menu-component>
          </div>
        </div>

        <div></div>
      </div>

      <div class="contribution-container-wrapper">
        <div class="contribution-container-left">
          ${this.authState ? y`
                <!--  Card Information  -->
                <div class="field">
                  <h3 class="title">Card Information</h3>
                  <div class="reward-section-box">
                    <div class="control">
                      <input
                        class="input ${this.nameOnCardError ? "is-danger" : ""}"
                        type="text"
                        placeholder="Name on Card"
                        @change="${this.handleNameOnCardChange}"
                      />
                      ${this.nameOnCardError ? y`<p class="help is-danger">${this.nameOnCardError}</p>` : y``}
                    </div>

                    <div class="control">
                      <skhemata-form-stripe
                        id="skhemata-form-stripe"
                        .publishableKey=${this.stripeInfo.publishable_key}
                        .clientSecret=${this.stripeInfo.secret_key}
                        .contributionSk=${this.contributionObj.secret_key}
                        .contributionId=${this.contributionObj.id}
                        .confirmInfo=${this.contributionObj.confirmInfo}
                      ></skhemata-form-stripe>
                      <!-- ${this.stripeCardError ? y`<p class="help is-danger">${this.stripeCardError}</p>` : y``} -->
                    </div>
                  </div>
                </div>
              ` : y`
                <!-- Account Information -->
                <div class="field">
                  <h3 class="title">Account Information</h3>
                  <div class="tabs is-boxed">
                    <ul>
                      <li
                        class="${this.currentTab === 'Login' ? 'is-active' : ''}"
                      >
                        <a
                          @click="${e => this.handleTabSwitch(e, 'Login')}"
                          >Login</a
                        >
                      </li>
                      <li
                        class="${this.currentTab === 'CreateAccount' ? 'is-active' : ''}"
                      >
                        <a
                          @click="${e => this.handleTabSwitch(e, 'CreateAccount')}"
                          >Create Account</a
                        >
                      </li>
                      <li
                        class="${this.currentTab === 'ExpressCheckout' ? 'is-active' : ''}"
                      >
                        <a
                          @click="${e => this.handleTabSwitch(e, 'ExpressCheckout')}"
                          >Express Checkout</a
                        >
                      </li>
                    </ul>
                  </div>

                  ${this.currentTab === 'Login' ? y` <login-contribution .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}"></login-contribution>` : null}
                  ${this.currentTab === 'CreateAccount' ? y`
                      <create-account-contribution .handleAuthStateChange="${this.handleAuthStateChange}" .authState="${this.authState}"></create-account-contribution>
                      <!-- <card-information-component></card-information-component> -->
                      ` : null}
                  ${this.currentTab === 'ExpressCheckout' ? y`
                      <express-checkout-contribution></express-checkout-contribution>
                      <!-- <card-information-component></card-information-component> -->
                      ` : null}
                </div>
              `}

          <!-- Review Payment -->
          <div class="field review-payment-section">
            <h3 class="title">Review Payment</h3>

            <div class="total-amount-box">
              <h4>Total Contribution:</h4>
              <h4>
                <span>
                  ${this.currencySymbols[(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.currencies[0].code_iso4217_alpha]}
                  ${this.contributionAmount}
                  ${(_b = this.campaign) === null || _b === void 0 ? void 0 : _b.currencies[0].code_iso4217_alpha}
                </span>
              </h4>
            </div>

            <div class="contribution-box">
              <div class="control">
                <div class="dropdown">
                  <div class="dropdown-trigger">
                    <button
                      class="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      @click="${this.dropdownHandle}"
                    >
                      <span>Dropdown button</span>
                      <span class="icon is-small">
                        <svg
                          viewbox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="width: 12px;height: 12px"
                        >
                          <path
                            d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <a href="#" class="dropdown-item">Regular Contribution</a>
                      <a href="#" class="dropdown-item"
                        >Anonymous Contribution</a
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  class="button contributeBtn has-background-info has-text-white ${this.loadingState ? 'is-loading' : ''}"
                  @click="${this.handleContribution}"
                >
                  Contribute
                </button>

                ${this.campaignError ? y`<p class="help is-danger">${this.campaignError}</p>` : y``}
              </div>
            </div>
          </div>
        </div>

        <!-- Choose Your Reward -->
        <div class="field choose-reward-section">
          <h3 class="title">Choose Your Reward</h3>

          <div class="reward-section-box">
            <!--  -->
            <div
              class="card cardReward ${this.chosenReward === 'standard' ? 'reward-btn' : ''}"
              @click="${() => this.handleChosenReward('standard')}"
            >
              <header class="card-header" @click="${this.handleRewardOpen}">
                <p class="card-header-title">
                  <span
                    >No reward selected. I just want to contribute to this
                    campaign.</span
                  >
                </p>
              </header>
              <div class="card-content ${this.openStatus ? '' : 'is-hidden'}">
                <div class="content">
                  <div class="control">
                    <input
                      min="1"
                      class="input input-number ${this.contributionAmountError ? "is-danger" : ""}"
                      type="number"
                      placeholder="Contribution Amount"
                      .value="${this.contributionAmount.toString()}"
                      @input="${this.handleContributionAmount}"
                    />
                    ${this.contributionAmountError ? y`<p class="help is-danger">${this.contributionAmountError}</p>` : y``}
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="control">
              ${((_c = this.campaign) === null || _c === void 0 ? void 0 : _c.pledges) && ((_d = this.campaign) === null || _d === void 0 ? void 0 : _d.pledges.length) > 0 ? this.campaign.pledges.map(pledge => y`
                      <div
                        class="${this.chosenReward === pledge.name ? 'reward-btn' : ''}"
                      >
                        <card-reward-component
                          .pledge=${pledge}
                          .campaign=${this.campaign}
                          .handleChosenReward=${this.handleChosenReward}
                          .handleContributionAmount=${this.handleContributionAmount}
                          .contributionAmount=${this.contributionAmount}
                        ></card-reward-component>
                      </div>
                    `) : ''}
            </div>
          </div>
        </div>
      </div>
    </div> `;
  }
}
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "stripeInfo", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "contributionObj", void 0);
__decorate([e$4({
  type: String
})], CampaignContribution.prototype, "chosenReward", void 0);
__decorate([e$4({
  type: Object,
  attribute: 'currencySymbols'
})], CampaignContribution.prototype, "currencySymbols", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "campaign", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "stripeElements", void 0);
__decorate([e$4({
  type: String,
  attribute: 'api_full'
})], CampaignContribution.prototype, "apiFull", void 0);
__decorate([e$4({
  type: String,
  attribute: 'currentPage'
})], CampaignContribution.prototype, "currentPage", void 0);
__decorate([e$4({
  type: String,
  attribute: 'nameOnCard'
})], CampaignContribution.prototype, "nameOnCard", void 0);
__decorate([e$4({
  type: String,
  attribute: 'nameOnCardError'
})], CampaignContribution.prototype, "nameOnCardError", void 0);
__decorate([e$4({
  type: String,
  attribute: 'contributionAmountError'
})], CampaignContribution.prototype, "contributionAmountError", void 0);
__decorate([e$4({
  type: String,
  attribute: 'stripeCardError'
})], CampaignContribution.prototype, "stripeCardError", void 0);
__decorate([e$4({
  type: String,
  attribute: 'campaignError'
})], CampaignContribution.prototype, "campaignError", void 0);
__decorate([e$4({
  type: String,
  attribute: 'currentTab'
})], CampaignContribution.prototype, "currentTab", void 0);
__decorate([e$4({
  type: Function
})], CampaignContribution.prototype, "handleBack", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "error", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "source", void 0);
__decorate([e$4({
  type: Boolean
})], CampaignContribution.prototype, "submitDisabled", void 0);
__decorate([e$4({
  type: Boolean
})], CampaignContribution.prototype, "loadingState", void 0);
__decorate([e$4({
  type: Boolean
})], CampaignContribution.prototype, "authState", void 0);
__decorate([e$4({
  type: Number
})], CampaignContribution.prototype, "contributionAmount", void 0);
__decorate([e$4({
  type: Object
})], CampaignContribution.prototype, "stripe", void 0);
__decorate([e$4({
  type: Boolean
})], CampaignContribution.prototype, "openStatus", void 0);

class SkhemataCrowdfundingCampaign extends SkhemataBase {
  constructor() {
    super(...arguments);
    this.handleContribute = () => {
      this.currentPage = 'contribution';
    };
    this.handleBack = () => {
      this.currentPage = '';
    };
  }
  static get styles() {
    return [...super.styles, i`
        #tab-content div {
          display: none;
        }
        #tab-content div.is-active {
          display: block;
        }
        .header h1 {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.33em;
          text-transform: none;
          color: rgba(0, 0, 0, 0.8);
          text-transform: capitalize;
        }

        .headerContainer {
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          margin-bottom: 1rem;
          text-align: center;
          align-items: center;
        }

        .headerWrapper {
          grid-column: 2 / 3;
        }

        .menuWrapper {
          grid-column: 3 / 4;
          /* text-align: right; */
          justify-self: flex-end;
        }

      `];
  }
  static get scopedElements() {
    return {
      'campaign-info': campaignInfo,
      'campaign-faq': campaignFaq,
      'campaign-backers': campaignBackers,
      'campaign-contribution': CampaignContribution,
      'menu-component': Menu
    };
  }
  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getCampaign();
    this.tabEvent();
    if (this.apiUrl && this.locPath) {
      this.apiFull = this.apiUrl + this.locPath;
    } else {
      this.apiFull = '';
    }
  }
  render() {
    var _a, _b, _c;
    console.log(this.apiFull);
    if (this.currentPage === 'contribution') {
      return y`<campaign-contribution
        .currentPage="${this.currentPage}"
        .handleBack="${this.handleBack}"
        .campaign="${this.campaign}"
        .apiFull = "${this.apiFull}"
      ></campaign-contribution>`;
    }
    return y`
    <div class="container">
      <div class="headerContainer">
        <!-- <div></div> -->
        <div class="headerWrapper">
          <div class="header"> 
            <h1>${(_a = this.campaign) === null || _a === void 0 ? void 0 : _a.name}</h1>
          </div>
          <div>by <b>${(_b = this.campaign) === null || _b === void 0 ? void 0 : _b.managers[0].first_name} ${(_c = this.campaign) === null || _c === void 0 ? void 0 : _c.managers[0].last_name}</b>
          </div>
        </div>
        <div class="menuWrapper">
          <menu-component .apiFull="${this.apiFull}"></menu-component>
        </div>
      </div>
        <div class="tabs">
          <ul id="tabs">
            <li class="is-active"><a data-tab="campaign">Campaign</a></li>
            <li><a data-tab="faq">FAQ</a></li>
            <li><a data-tab="backers">Backers</a></li>
            <li><a data-tab="updates">Updates</a></li>
            <li><a data-tab="comments">Comments</a></li>
          </ul>
        </div>
        <div id="tab-content">
          <div class="is-active" data-content="campaign">
            <campaign-info .apiUrl=${this.apiUrl} .locPath=${this.locPath} .campaignId=${this.campaignId} .campaign=${this.campaign} .currentPage=${this.currentPage} .handleContribute=${this.handleContribute}></campaign-info>
          </div>
          <div data-content="faq">
            <campaign-faq .campaign=${this.campaign}></campaign-faq>
          </div>
          <div data-content="backers">
            <campaign-backers .apiUrl=${this.apiUrl} .locPath=${this.locPath} .campaignId=${this.campaignId} .campaign=${this.campaign}></campaign-backers>
          </div>
          <div data-content="updates">
            Updates
          </div>
          <div data-content="comments">
            Comments
          </div>
        </div>
      </div>
    </div>`;
  }
  getCampaign() {
    fetch(`${this.apiUrl}${this.locPath}campaign/${this.campaignId}`).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    }).then(data => {
      this.campaign = data;
      console.log('campaign: ', data);
    }).catch(() => {
      console.log('error');
    });
  }
  tabEvent() {
    var _a, _b;
    (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('tabs')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', e => {
      let selected = e.target;
      if (selected && selected.getAttribute('data-tab')) {
        this.updateActiveTab(selected);
      }
    });
  }
  updateActiveTab(selected) {
    var _a, _b;
    // Update active tab
    let tabs = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('tabs');
    for (let i = 0; i < tabs.children.length; i += 1) {
      if (tabs.children[i] && tabs.children[i].classList.contains('is-active')) {
        tabs.children[i].classList.remove('is-active');
      }
    }
    selected.parentElement.classList.add('is-active');
    // Update active tab content
    let tabContents = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('tab-content');
    for (let i = 0; i < tabContents.children.length; i += 1) {
      if (tabContents.children[i] && tabContents.children[i].classList.contains('is-active')) {
        tabContents.children[i].classList.remove('is-active');
      }
      if (tabContents.children[i].getAttribute('data-content') === selected.getAttribute('data-tab')) {
        tabContents.children[i].classList.add('is-active');
      }
    }
  }
  returnString(str) {
    var fragment = document.createRange().createContextualFragment(`${str}`);
    return fragment;
  }
}
__decorate([e$4({
  type: String,
  attribute: 'api_url'
})], SkhemataCrowdfundingCampaign.prototype, "apiUrl", void 0);
__decorate([e$4({
  type: String,
  attribute: 'loc_path'
})], SkhemataCrowdfundingCampaign.prototype, "locPath", void 0);
__decorate([e$4({
  type: String
})], SkhemataCrowdfundingCampaign.prototype, "apiFull", void 0);
__decorate([e$4({
  type: String,
  attribute: 'campaign_id'
})], SkhemataCrowdfundingCampaign.prototype, "campaignId", void 0);
__decorate([e$4({
  type: String,
  attribute: 'currentPage'
})], SkhemataCrowdfundingCampaign.prototype, "currentPage", void 0);
__decorate([e$4({
  type: Object
})], SkhemataCrowdfundingCampaign.prototype, "campaign", void 0);

// import { campaignInfo } from './src/campaignInfo.js';
// import { campaignFaq } from './src/campaignFaq.js';
// import { campaignBackers } from './src/campaignBackers.js';
window.customElements.define('skhemata-crowdfunding-campaign', SkhemataCrowdfundingCampaign);
// window.customElements.define('campaign-info', campaignInfo);
// window.customElements.define('campaign-faq', campaignFaq);
// window.customElements.define('campaign-backers', campaignBackers);
//# sourceMappingURL=index.js.map
