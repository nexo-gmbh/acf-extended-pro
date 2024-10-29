(() => {
    var e, t = {
            692: function(e, t) {
                var n, o;
                n = function(e, t) {
                    "use strict";
                    var n, o, r = "function" == typeof Map ? new Map : (n = [], o = [], {
                            has: function(e) {
                                return n.indexOf(e) > -1
                            },
                            get: function(e) {
                                return o[n.indexOf(e)]
                            },
                            set: function(e, t) {
                                -1 === n.indexOf(e) && (n.push(e), o.push(t))
                            },
                            delete: function(e) {
                                var t = n.indexOf(e);
                                t > -1 && (n.splice(t, 1), o.splice(t, 1))
                            }
                        }),
                        i = function(e) {
                            return new Event(e, {
                                bubbles: !0
                            })
                        };
                    try {
                        new Event("test")
                    } catch (e) {
                        i = function(e) {
                            var t = document.createEvent("Event");
                            return t.initEvent(e, !0, !1), t
                        }
                    }

                    function s(e) {
                        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !r.has(e)) {
                            var t = null,
                                n = null,
                                o = null,
                                s = function() {
                                    e.clientWidth !== n && u()
                                },
                                a = function(t) {
                                    window.removeEventListener("resize", s, !1), e.removeEventListener("input", u, !1), e.removeEventListener("keyup", u, !1), e.removeEventListener("autosize:destroy", a, !1), e.removeEventListener("autosize:update", u, !1), Object.keys(t).forEach((function(n) {
                                        e.style[n] = t[n]
                                    })), r.delete(e)
                                }.bind(e, {
                                    height: e.style.height,
                                    resize: e.style.resize,
                                    overflowY: e.style.overflowY,
                                    overflowX: e.style.overflowX,
                                    wordWrap: e.style.wordWrap
                                });
                            e.addEventListener("autosize:destroy", a, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", u, !1), window.addEventListener("resize", s, !1), e.addEventListener("input", u, !1), e.addEventListener("autosize:update", u, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", r.set(e, {
                                destroy: a,
                                update: u
                            }), "vertical" === (l = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === l.resize && (e.style.resize = "horizontal"), t = "content-box" === l.boxSizing ? -(parseFloat(l.paddingTop) + parseFloat(l.paddingBottom)) : parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth), isNaN(t) && (t = 0), u()
                        }
                        var l;

                        function c(t) {
                            var n = e.style.width;
                            e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
                        }

                        function d() {
                            if (0 !== e.scrollHeight) {
                                var o = function(e) {
                                        for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                                            node: e.parentNode,
                                            scrollTop: e.parentNode.scrollTop
                                        }), e = e.parentNode;
                                        return t
                                    }(e),
                                    r = document.documentElement && document.documentElement.scrollTop;
                                e.style.height = "", e.style.height = e.scrollHeight + t + "px", n = e.clientWidth, o.forEach((function(e) {
                                    e.node.scrollTop = e.scrollTop
                                })), r && (document.documentElement.scrollTop = r)
                            }
                        }

                        function u() {
                            d();
                            var t = Math.round(parseFloat(e.style.height)),
                                n = window.getComputedStyle(e, null),
                                r = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
                            if (r < t ? "hidden" === n.overflowY && (c("scroll"), d(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (c("hidden"), d(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), o !== r) {
                                o = r;
                                var s = i("autosize:resized");
                                try {
                                    e.dispatchEvent(s)
                                } catch (e) {}
                            }
                        }
                    }

                    function a(e) {
                        var t = r.get(e);
                        t && t.destroy()
                    }

                    function l(e) {
                        var t = r.get(e);
                        t && t.update()
                    }
                    var c = null;
                    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? ((c = function(e) {
                        return e
                    }).destroy = function(e) {
                        return e
                    }, c.update = function(e) {
                        return e
                    }) : ((c = function(e, t) {
                        return e && Array.prototype.forEach.call(e.length ? e : [e], (function(e) {
                            return s(e)
                        })), e
                    }).destroy = function(e) {
                        return e && Array.prototype.forEach.call(e.length ? e : [e], a), e
                    }, c.update = function(e) {
                        return e && Array.prototype.forEach.call(e.length ? e : [e], l), e
                    }), t.default = c, e.exports = t.default
                }, void 0 === (o = n.apply(t, [e, t])) || (e.exports = o)
            },
            366: (e, t, n) => {
                "use strict";
                var o = {};
                n.r(o), n.d(o, {
                    closeModal: () => J,
                    disableComplementaryArea: () => W,
                    enableComplementaryArea: () => H,
                    openModal: () => q,
                    pinItem: () => G,
                    setDefaultComplementaryArea: () => z,
                    setFeatureDefaults: () => $,
                    setFeatureValue: () => Y,
                    toggleFeature: () => j,
                    unpinItem: () => K
                });
                var r = {};
                n.r(r), n.d(r, {
                    getActiveComplementaryArea: () => X,
                    isComplementaryAreaLoading: () => Z,
                    isFeatureActive: () => ee,
                    isItemPinned: () => Q,
                    isModalActive: () => te
                });
                var i = {};
                n.r(i), n.d(i, {
                    getCanvasStyles: () => Yn,
                    getCurrentPattern: () => Dn,
                    getCurrentPatternName: () => Fn,
                    getEditorMode: () => Mn,
                    getEditorSettings: () => Rn,
                    getIgnoredContent: () => Vn,
                    getNamedPattern: () => Un,
                    getPatterns: () => Gn,
                    getPreviewDeviceType: () => jn,
                    isEditing: () => Wn,
                    isEditorReady: () => Nn,
                    isEditorSidebarOpened: () => Hn,
                    isIframePreview: () => $n,
                    isInserterOpened: () => zn,
                    isListViewOpened: () => Kn
                });
                var s = {};
                n.r(s), n.d(s, {
                    getBlocks: () => qn,
                    getEditCount: () => Qn,
                    getEditorSelection: () => Jn,
                    hasEditorRedo: () => Zn,
                    hasEditorUndo: () => Xn
                });
                var a = {};
                n.r(a), n.d(a, {
                    isFeatureActive: () => eo
                });
                var l = {};
                n.r(l), n.d(l, {
                    isOptionActive: () => to
                });
                var c = {};
                n.r(c), n.d(c, {
                    __experimentalConvertBlockToStatic: () => no,
                    __experimentalConvertBlocksToReusable: () => oo,
                    __experimentalDeleteReusableBlock: () => ro,
                    __experimentalSetEditingReusableBlock: () => io
                });
                var d = {};
                n.r(d), n.d(d, {
                    __experimentalIsEditingReusableBlock: () => so
                });
                var u = {};
                n.r(u), n.d(u, {
                    disableComplementaryArea: () => uo,
                    enableComplementaryArea: () => co,
                    pinItem: () => po,
                    setDefaultComplementaryArea: () => lo,
                    setFeatureDefaults: () => go,
                    setFeatureValue: () => ho,
                    toggleFeature: () => fo,
                    unpinItem: () => mo
                });
                var p = {};
                n.r(p), n.d(p, {
                    getActiveComplementaryArea: () => bo,
                    isFeatureActive: () => yo,
                    isItemPinned: () => Eo
                });
                var m = n(609);
                const f = window.wp.element,
                    h = window.wp.mediaUtils,
                    g = window.wp.editor,
                    b = window.wp.hooks,
                    E = window.wp.components,
                    y = window.wp.blockLibrary,
                    v = window.wp.data,
                    _ = (window.wp.formatLibrary, window.wp.keyboardShortcuts);
                var w = n(942),
                    S = n.n(w);
                const k = window.wp.compose,
                    T = window.lodash,
                    C = ["button", "submit"],
                    x = (0, k.createHigherOrderComponent)((e => class extends f.Component {
                        constructor() {
                            super(...arguments), this.bindNode = this.bindNode.bind(this), this.cancelBlurCheck = this.cancelBlurCheck.bind(this), this.queueBlurCheck = this.queueBlurCheck.bind(this), this.normalizeButtonFocus = this.normalizeButtonFocus.bind(this)
                        }
                        componentWillUnmount() {
                            clearTimeout(this.blurCheckTimeout)
                        }
                        bindNode(e) {
                            e ? this.node = e : (delete this.node, this.cancelBlurCheck())
                        }
                        queueBlurCheck(e) {
                            e.persist(), this.preventBlurCheck || (this.blurCheckTimeout = setTimeout((() => {
                                document.hasFocus() ? "function" == typeof this.node.handleFocusOutside && this.node.handleFocusOutside(e) : e.preventDefault()
                            }), 0))
                        }
                        cancelBlurCheck() {
                            clearTimeout(this.blurCheckTimeout), void 0 !== this.node && "function" == typeof this.node.handleFocus && this.node.handleFocus(event)
                        }
                        normalizeButtonFocus(e) {
                            const {
                                type: t,
                                target: n
                            } = e;
                            (0, T.includes)(["mouseup", "touchend"], t) ? this.preventBlurCheck = !1: function(e) {
                                switch (e.nodeName) {
                                    case "A":
                                    case "BUTTON":
                                        return !0;
                                    case "INPUT":
                                        return (0, T.includes)(C, e.type)
                                }
                                return !1
                            }(n) && (this.preventBlurCheck = !0)
                        }
                        render() {
                            return (0, m.createElement)("div", {
                                onFocus: this.cancelBlurCheck,
                                onMouseDown: this.normalizeButtonFocus,
                                onMouseUp: this.normalizeButtonFocus,
                                onTouchStart: this.normalizeButtonFocus,
                                onTouchEnd: this.normalizeButtonFocus,
                                onBlur: this.queueBlurCheck
                            }, (0, m.createElement)(e, {
                                ref: this.bindNode,
                                ...this.props
                            }))
                        }
                    }), "withFocusOutside")(class extends f.Component {
                        handleFocus(e) {
                            this.props.onFocus()
                        }
                        isInspectorElement(e) {
                            return !!(e.closest(".components-color-picker") || e.closest(".block-editor-block-inspector") || e.closest(".iso-inspector") || e.classList.contains("media-modal"))
                        }
                        handleFocusOutside(e) {
                            const t = e.relatedTarget || e.target;
                            t && this.isInspectorElement(t) || this.props.onOutside()
                        }
                        render() {
                            return this.props.children
                        }
                    }),
                    I = window.wp.blocks,
                    O = window.wp.blockEditor,
                    A = window.wp.keycodes,
                    B = window.wp.i18n,
                    L = window.wp.primitives,
                    P = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
                    })),
                    M = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
                    })),
                    R = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        fillRule: "evenodd",
                        d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
                        clipRule: "evenodd"
                    })),
                    N = window.wp.viewport,
                    F = window.wp.preferences,
                    D = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
                    })),
                    V = window.wp.deprecated;
                var U = n.n(V);
                const z = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    H = (e, t) => ({
                        registry: n,
                        dispatch: o
                    }) => {
                        t && (n.select(F.store).get(e, "isComplementaryAreaVisible") || n.dispatch(F.store).set(e, "isComplementaryAreaVisible", !0), o({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    W = e => ({
                        registry: t
                    }) => {
                        t.select(F.store).get(e, "isComplementaryAreaVisible") && t.dispatch(F.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    G = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(F.store).get(e, "pinnedItems");
                        !0 !== o?.[t] && n.dispatch(F.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !0
                        })
                    },
                    K = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(F.store).get(e, "pinnedItems");
                        n.dispatch(F.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !1
                        })
                    };

                function j(e, t) {
                    return function({
                        registry: n
                    }) {
                        U()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(F.store).toggle(e, t)
                    }
                }

                function Y(e, t, n) {
                    return function({
                        registry: o
                    }) {
                        U()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), o.dispatch(F.store).set(e, t, !!n)
                    }
                }

                function $(e, t) {
                    return function({
                        registry: n
                    }) {
                        U()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(F.store).setDefaults(e, t)
                    }
                }

                function q(e) {
                    return {
                        type: "OPEN_MODAL",
                        name: e
                    }
                }

                function J() {
                    return {
                        type: "CLOSE_MODAL"
                    }
                }
                const X = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(F.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== o) return !1 === o ? null : t?.complementaryAreas?.[n]
                    })),
                    Z = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(F.store).get(n, "isComplementaryAreaVisible"),
                            r = t?.complementaryAreas?.[n];
                        return o && void 0 === r
                    })),
                    Q = (0, v.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(F.store).get(n, "pinnedItems");
                        return null === (r = i?.[o]) || void 0 === r || r
                    })),
                    ee = (0, v.createRegistrySelector)((e => (t, n, o) => (U()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(F.store).get(n, o))));

                function te(e, t) {
                    return e.activeModal === t
                }
                const ne = (0, v.combineReducers)({
                        complementaryAreas: function(e = {}, t) {
                            switch (t.type) {
                                case "SET_DEFAULT_COMPLEMENTARY_AREA": {
                                    const {
                                        scope: n,
                                        area: o
                                    } = t;
                                    return e[n] ? e : {
                                        ...e,
                                        [n]: o
                                    }
                                }
                                case "ENABLE_COMPLEMENTARY_AREA": {
                                    const {
                                        scope: n,
                                        area: o
                                    } = t;
                                    return {
                                        ...e,
                                        [n]: o
                                    }
                                }
                            }
                            return e
                        },
                        activeModal: function(e = null, t) {
                            switch (t.type) {
                                case "OPEN_MODAL":
                                    return t.name;
                                case "CLOSE_MODAL":
                                    return null
                            }
                            return e
                        }
                    }),
                    oe = (0, v.createReduxStore)("core/interface", {
                        reducer: ne,
                        actions: o,
                        selectors: r
                    });
                (0, v.register)(oe);
                const re = (0, window.wp.plugins.withPluginContext)(((e, t) => ({
                        icon: t.icon || e.icon,
                        identifier: t.identifier || `${e.name}/${t.name}`
                    }))),
                    ie = re((function({
                        as: e = E.Button,
                        scope: t,
                        identifier: n,
                        icon: o,
                        selectedIcon: r,
                        name: i,
                        ...s
                    }) {
                        const a = e,
                            l = (0, v.useSelect)((e => e(oe).getActiveComplementaryArea(t) === n), [n, t]),
                            {
                                enableComplementaryArea: c,
                                disableComplementaryArea: d
                            } = (0, v.useDispatch)(oe);
                        return (0, m.createElement)(a, {
                            icon: r && l ? r : o,
                            "aria-controls": n.replace("/", ":"),
                            onClick: () => {
                                l ? d(t) : c(t, n)
                            },
                            ...s
                        })
                    })),
                    se = ({
                        smallScreenTitle: e,
                        children: t,
                        className: n,
                        toggleButtonProps: o
                    }) => {
                        const r = (0, m.createElement)(ie, {
                            icon: D,
                            ...o
                        });
                        return (0, m.createElement)(m.Fragment, null, (0, m.createElement)("div", {
                            className: "components-panel__header interface-complementary-area-header__small"
                        }, e && (0, m.createElement)("h2", {
                            className: "interface-complementary-area-header__small-title"
                        }, e), r), (0, m.createElement)("div", {
                            className: S()("components-panel__header", "interface-complementary-area-header", n),
                            tabIndex: -1
                        }, t, r))
                    },
                    ae = () => {};

                function le({
                    name: e,
                    as: t = E.Button,
                    onClick: n,
                    ...o
                }) {
                    return (0, m.createElement)(E.Fill, {
                        name: e
                    }, (({
                        onClick: e
                    }) => (0, m.createElement)(t, {
                        onClick: n || e ? (...t) => {
                            (n || ae)(...t), (e || ae)(...t)
                        } : void 0,
                        ...o
                    })))
                }
                le.Slot = function({
                    name: e,
                    as: t = E.ButtonGroup,
                    fillProps: n = {},
                    bubblesVirtually: o,
                    ...r
                }) {
                    return (0, m.createElement)(E.Slot, {
                        name: e,
                        bubblesVirtually: o,
                        fillProps: n
                    }, (e => {
                        if (!f.Children.toArray(e).length) return null;
                        const n = [];
                        f.Children.forEach(e, (({
                            props: {
                                __unstableExplicitMenuItem: e,
                                __unstableTarget: t
                            }
                        }) => {
                            t && e && n.push(t)
                        }));
                        const o = f.Children.map(e, (e => !e.props.__unstableExplicitMenuItem && n.includes(e.props.__unstableTarget) ? null : e));
                        return (0, m.createElement)(t, {
                            ...r
                        }, o)
                    }))
                };
                const ce = le,
                    de = ({
                        __unstableExplicitMenuItem: e,
                        __unstableTarget: t,
                        ...n
                    }) => (0, m.createElement)(E.MenuItem, {
                        ...n
                    });

                function ue({
                    scope: e,
                    target: t,
                    __unstableExplicitMenuItem: n,
                    ...o
                }) {
                    return (0, m.createElement)(ie, {
                        as: o => (0, m.createElement)(ce, {
                            __unstableExplicitMenuItem: n,
                            __unstableTarget: `${e}/${t}`,
                            as: de,
                            name: `${e}/plugin-more-menu`,
                            ...o
                        }),
                        role: "menuitemcheckbox",
                        selectedIcon: P,
                        name: t,
                        scope: e,
                        ...o
                    })
                }

                function pe({
                    scope: e,
                    ...t
                }) {
                    return (0, m.createElement)(E.Fill, {
                        name: `PinnedItems/${e}`,
                        ...t
                    })
                }
                pe.Slot = function({
                    scope: e,
                    className: t,
                    ...n
                }) {
                    return (0, m.createElement)(E.Slot, {
                        name: `PinnedItems/${e}`,
                        ...n
                    }, (e => e?.length > 0 && (0, m.createElement)("div", {
                        className: S()(t, "interface-pinned-items")
                    }, e)))
                };
                const me = pe;

                function fe({
                    scope: e,
                    children: t,
                    className: n,
                    id: o
                }) {
                    return (0, m.createElement)(E.Fill, {
                        name: `ComplementaryArea/${e}`
                    }, (0, m.createElement)("div", {
                        id: o,
                        className: n
                    }, t))
                }
                const he = re((function({
                    children: e,
                    className: t,
                    closeLabel: n = (0, B.__)("Close plugin"),
                    identifier: o,
                    header: r,
                    headerClassName: i,
                    icon: s,
                    isPinnable: a = !0,
                    panelClassName: l,
                    scope: c,
                    name: d,
                    smallScreenTitle: u,
                    title: p,
                    toggleShortcut: h,
                    isActiveByDefault: g
                }) {
                    const {
                        isLoading: b,
                        isActive: y,
                        isPinned: _,
                        activeArea: w,
                        isSmall: k,
                        isLarge: T,
                        showIconLabels: C
                    } = (0, v.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t,
                            isComplementaryAreaLoading: n,
                            isItemPinned: r
                        } = e(oe), {
                            get: i
                        } = e(F.store), s = t(c);
                        return {
                            isLoading: n(c),
                            isActive: s === o,
                            isPinned: r(c, o),
                            activeArea: s,
                            isSmall: e(N.store).isViewportMatch("< medium"),
                            isLarge: e(N.store).isViewportMatch("large"),
                            showIconLabels: i("core", "showIconLabels")
                        }
                    }), [o, c]);
                    ! function(e, t, n, o, r) {
                        const i = (0, f.useRef)(!1),
                            s = (0, f.useRef)(!1),
                            {
                                enableComplementaryArea: a,
                                disableComplementaryArea: l
                            } = (0, v.useDispatch)(oe);
                        (0, f.useEffect)((() => {
                            o && r && !i.current ? (l(e), s.current = !0) : s.current && !r && i.current ? (s.current = !1, a(e, t)) : s.current && n && n !== t && (s.current = !1), r !== i.current && (i.current = r)
                        }), [o, r, e, t, n, l, a])
                    }(c, o, w, y, k);
                    const {
                        enableComplementaryArea: x,
                        disableComplementaryArea: I,
                        pinItem: O,
                        unpinItem: A
                    } = (0, v.useDispatch)(oe);
                    return (0, f.useEffect)((() => {
                        g && void 0 === w && !k ? x(c, o) : void 0 === w && k && I(c, o)
                    }), [w, g, c, o, k, x, I]), (0, m.createElement)(m.Fragment, null, a && (0, m.createElement)(me, {
                        scope: c
                    }, _ && (0, m.createElement)(ie, {
                        scope: c,
                        identifier: o,
                        isPressed: y && (!C || T),
                        "aria-expanded": y,
                        "aria-disabled": b,
                        label: p,
                        icon: C ? P : s,
                        showTooltip: !C,
                        variant: C ? "tertiary" : void 0,
                        size: "compact"
                    })), d && a && (0, m.createElement)(ue, {
                        target: d,
                        scope: c,
                        icon: s
                    }, p), y && (0, m.createElement)(fe, {
                        className: S()("interface-complementary-area", t),
                        scope: c,
                        id: o.replace("/", ":")
                    }, (0, m.createElement)(se, {
                        className: i,
                        closeLabel: n,
                        onClose: () => I(c),
                        smallScreenTitle: u,
                        toggleButtonProps: {
                            label: n,
                            shortcut: h,
                            scope: c,
                            identifier: o
                        }
                    }, r || (0, m.createElement)(m.Fragment, null, (0, m.createElement)("h2", {
                        className: "interface-complementary-area-header__title"
                    }, p), a && (0, m.createElement)(E.Button, {
                        className: "interface-complementary-area__pin-unpin-item",
                        icon: _ ? M : R,
                        label: _ ? (0, B.__)("Unpin from toolbar") : (0, B.__)("Pin to toolbar"),
                        onClick: () => (_ ? A : O)(c, o),
                        isPressed: _,
                        "aria-expanded": _
                    }))), (0, m.createElement)(E.Panel, {
                        className: l
                    }, e)))
                }));
                he.Slot = function({
                    scope: e,
                    ...t
                }) {
                    return (0, m.createElement)(E.Slot, {
                        name: `ComplementaryArea/${e}`,
                        ...t
                    })
                };
                const ge = he,
                    be = ({
                        isActive: e
                    }) => ((0, f.useEffect)((() => {
                        let e = !1;
                        return document.body.classList.contains("sticky-menu") && (e = !0, document.body.classList.remove("sticky-menu")), () => {
                            e && document.body.classList.add("sticky-menu")
                        }
                    }), []), (0, f.useEffect)((() => (e ? document.body.classList.add("is-fullscreen-mode") : document.body.classList.remove("is-fullscreen-mode"), () => {
                        e && document.body.classList.remove("is-fullscreen-mode")
                    })), [e]), null);

                function Ee({
                    children: e,
                    className: t,
                    ariaLabel: n,
                    as: o = "div",
                    ...r
                }) {
                    return (0, m.createElement)(o, {
                        className: S()("interface-navigable-region", t),
                        "aria-label": n,
                        role: "region",
                        tabIndex: "-1",
                        ...r
                    }, e)
                }
                const ye = {
                        hidden: {
                            opacity: 0
                        },
                        hover: {
                            opacity: 1,
                            transition: {
                                type: "tween",
                                delay: .2,
                                delayChildren: .2
                            }
                        },
                        distractionFreeInactive: {
                            opacity: 1,
                            transition: {
                                delay: 0
                            }
                        }
                    },
                    ve = (0, f.forwardRef)((function({
                        isDistractionFree: e,
                        footer: t,
                        header: n,
                        editorNotices: o,
                        sidebar: r,
                        secondarySidebar: i,
                        notices: s,
                        content: a,
                        actions: l,
                        labels: c,
                        className: d,
                        enableRegionNavigation: u = !0,
                        shortcuts: p
                    }, h) {
                        const g = (0, E.__unstableUseNavigateRegions)(p);
                        ! function(e) {
                            (0, f.useEffect)((() => {
                                const t = document && document.querySelector(`html:not(.${e})`);
                                if (t) return t.classList.toggle(e), () => {
                                    t.classList.toggle(e)
                                }
                            }), [e])
                        }("interface-interface-skeleton__html-container");
                        const b = {
                            /* translators: accessibility text for the top bar landmark region. */
                            header: (0, B._x)("Header", "header landmark area"),
                            /* translators: accessibility text for the content landmark region. */
                            body: (0, B.__)("Content"),
                            /* translators: accessibility text for the secondary sidebar landmark region. */
                            secondarySidebar: (0, B.__)("Block Library"),
                            /* translators: accessibility text for the settings landmark region. */
                            sidebar: (0, B.__)("Settings"),
                            /* translators: accessibility text for the publish landmark region. */
                            actions: (0, B.__)("Publish"),
                            /* translators: accessibility text for the footer landmark region. */
                            footer: (0, B.__)("Footer"),
                            ...c
                        };
                        return (0, m.createElement)("div", {
                            ...u ? g : {},
                            ref: (0, k.useMergeRefs)([h, u ? g.ref : void 0]),
                            className: S()(d, "interface-interface-skeleton", g.className, !!t && "has-footer")
                        }, (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__editor"
                        }, !!n && (0, m.createElement)(Ee, {
                            as: E.__unstableMotion.div,
                            className: "interface-interface-skeleton__header",
                            "aria-label": b.header,
                            initial: e ? "hidden" : "distractionFreeInactive",
                            whileHover: e ? "hover" : "distractionFreeInactive",
                            animate: e ? "hidden" : "distractionFreeInactive",
                            variants: ye,
                            transition: e ? {
                                type: "tween",
                                delay: .8
                            } : void 0
                        }, n), e && (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__header"
                        }, o), (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__body"
                        }, !!i && (0, m.createElement)(Ee, {
                            className: "interface-interface-skeleton__secondary-sidebar",
                            ariaLabel: b.secondarySidebar
                        }, i), !!s && (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__notices"
                        }, s), (0, m.createElement)(Ee, {
                            className: "interface-interface-skeleton__content",
                            ariaLabel: b.body
                        }, a), !!r && (0, m.createElement)(Ee, {
                            className: "interface-interface-skeleton__sidebar",
                            ariaLabel: b.sidebar
                        }, r), !!l && (0, m.createElement)(Ee, {
                            className: "interface-interface-skeleton__actions",
                            ariaLabel: b.actions
                        }, l))), !!t && (0, m.createElement)(Ee, {
                            className: "interface-interface-skeleton__footer",
                            ariaLabel: b.footer
                        }, t))
                    })),
                    _e = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        fillRule: "evenodd",
                        d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
                        clipRule: "evenodd"
                    })),
                    we = window.wp.privateApis,
                    {
                        unlock: Se
                    } = (0, we.__dangerousOptInToUnstableAPIsOnlyForCoreModules)("I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.", "@wordpress/edit-post"),
                    ke = {
                        document: "edit-post/document",
                        block: "edit-post/block"
                    },
                    {
                        Tabs: Te
                    } = Se(E.privateApis),
                    Ce = ({
                        documentInspector: e
                    }) => {
                        const {
                            documentLabel: t
                        } = (0, v.useSelect)((t => ({
                            // translators: Default label for the Document sidebar tab, not selected.
                            documentLabel: e && "string" == typeof e ? e : (0, B._x)("Document", "noun")
                        })), []);
                        return (0, m.createElement)(Te.TabList, null, !!e && (0, m.createElement)(Te.Tab, {
                            tabId: ke.document
                        }, t), (0, m.createElement)(Te.Tab, {
                            tabId: ke.block
                        }, (0, B.__)("Block")))
                    },
                    {
                        Fill: xe,
                        Slot: Ie
                    } = (0, E.createSlotFill)("PluginDocumentSettingPanel"),
                    Oe = ({
                        children: e
                    }) => (0, m.createElement)(xe, null, e);
                Oe.Slot = function(e) {
                    return (0, m.createElement)(Ie, null, (e => e || (0, m.createElement)("span", {
                        className: "block-editor-block-inspector__no-blocks"
                    }, (0, B.__)("Nothing to display"))))
                };
                const Ae = Oe;

                function Be({
                    as: e = E.Button,
                    scope: t,
                    identifier: n,
                    icon: o,
                    selectedIcon: r,
                    name: i,
                    ...s
                }) {
                    const a = e,
                        l = (0, v.useSelect)((e => e(oe).getActiveComplementaryArea(t) === n), [n]),
                        {
                            enableComplementaryArea: c,
                            disableComplementaryArea: d
                        } = (0, v.useDispatch)(oe);
                    return (0, m.createElement)(a, {
                        icon: r && l ? r : o,
                        onClick: () => {
                            l ? d(t) : c(t, n)
                        },
                        ...s
                    })
                }
                const Le = ({
                    smallScreenTitle: e,
                    children: t,
                    className: n,
                    toggleButtonProps: o
                }) => {
                    const r = (0, m.createElement)(Be, {
                        icon: D,
                        ...o
                    });
                    return (0, m.createElement)(m.Fragment, null, (0, m.createElement)("div", {
                        className: "components-panel__header interface-complementary-area-header__small"
                    }, e && (0, m.createElement)("span", {
                        className: "interface-complementary-area-header__small-title"
                    }, e), r), (0, m.createElement)("div", {
                        className: S()("components-panel__header", "interface-complementary-area-header", n),
                        tabIndex: -1
                    }, t, r))
                };

                function Pe({
                    scope: e,
                    children: t,
                    className: n
                }) {
                    return (0, m.createElement)(E.Fill, {
                        name: `ComplementaryArea/${e}`
                    }, (0, m.createElement)("div", {
                        className: n
                    }, t))
                }

                function Me({
                    className: e,
                    children: t,
                    header: n,
                    headerClassName: o,
                    toggleShortcut: r,
                    closeLabel: i,
                    title: s,
                    identifier: a,
                    ...l
                }) {
                    const {
                        postTitle: c,
                        isActive: d
                    } = (0, v.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t
                        } = e(oe), n = t("isolated/editor");
                        return {
                            postTitle: "",
                            showIconLabels: e("isolated/editor").isFeatureActive("showIconLabels"),
                            isActive: (o = n, ["edit-post/document", "edit-post/block"].includes(o))
                        };
                        var o
                    }), []);
                    return d ? (0, m.createElement)(Pe, {
                        className: "interface-complementary-area",
                        scope: "isolated/editor"
                    }, (0, m.createElement)(Le, {
                        className: o,
                        smallScreenTitle: c || (0, B.__)("(no title)"),
                        toggleButtonProps: {
                            label: i,
                            shortcut: r,
                            scope: "isolated/editor",
                            identifier: a
                        }
                    }, n), (0, m.createElement)(E.Panel, {
                        className: "edit-post-sidebar"
                    }, t)) : null
                }
                const {
                    Tabs: Re
                } = Se(E.privateApis), Ne = ({
                    documentInspector: e,
                    keyboardShortcut: t,
                    sidebarName: n
                }) => {
                    const o = (0, f.useContext)(Re.Context);
                    return (0, m.createElement)(Me, {
                        className: "iso-sidebar",
                        identifier: n,
                        header: (0, m.createElement)(Re.Context.Provider, {
                            value: o
                        }, (0, m.createElement)(Ce, {
                            documentInspector: e
                        })),
                        closeLabel: (0, B.__)("Close settings"),
                        headerClassName: "edit-post-sidebar__panel-tabs"
                            /* translators: button label text should, if possible, be under 16 characters. */
                            ,
                        title: (0, B.__)("Settings"),
                        toggleShortcut: t,
                        icon: _e,
                        isActiveByDefault: !1
                    }, (0, m.createElement)(Re.Context.Provider, {
                        value: o
                    }, (0, m.createElement)(Re.TabPanel, {
                        tabId: ke.document,
                        focusable: !1
                    }, (0, m.createElement)(Ae.Slot, null)), (0, m.createElement)(Re.TabPanel, {
                        tabId: ke.block,
                        focusable: !1
                    }, (0, m.createElement)(O.BlockInspector, null))))
                }, Fe = ({
                    documentInspector: e
                }) => {
                    const {
                        sidebarName: t,
                        keyboardShortcut: n,
                        isSettingsSidebarActive: o
                    } = (0, v.useSelect)((e => {
                        let t = e(oe).getActiveComplementaryArea("isolated/editor"),
                            n = !0;
                        var o;
                        return o = t, [ke.document, ke.block].includes(o) || (n = !1, e(O.store).getBlockSelectionStart() && (t = ke.block), t = ke.document), {
                            sidebarName: t,
                            keyboardShortcut: e(_.store).getShortcutRepresentation("core/edit-post/toggle-sidebar"),
                            isSettingsSidebarActive: n
                        }
                    }), []), {
                        openGeneralSidebar: r
                    } = (0, v.useDispatch)("isolated/editor");
                    return (0, m.createElement)(Re, {
                        selectedTabId: o ? t : null,
                        onSelect: r
                    }, (0, m.createElement)(Ne, {
                        documentInspector: e,
                        keyboardShortcut: n,
                        sidebarName: t
                    }))
                }, {
                    Fill: De,
                    Slot: Ve
                } = (0, E.createSlotFill)("IsolatedEditorHeading"), Ue = ({
                    children: e
                }) => (0, m.createElement)(De, null, e);
                Ue.Slot = function(e) {
                    return (0, m.createElement)(Ve, null, (e => e))
                };
                const ze = Ue,
                    {
                        Fill: He,
                        Slot: We
                    } = (0, E.createSlotFill)("IsolatedFooter"),
                    Ge = ({
                        children: e
                    }) => (0, m.createElement)(He, null, e);
                Ge.Slot = function(e) {
                    return (0, m.createElement)(We, null, (e => e))
                };
                const Ke = Ge,
                    {
                        LayoutStyle: je,
                        useLayoutClasses: Ye,
                        useLayoutStyles: $e,
                        ExperimentalBlockCanvas: qe
                    } = Se(O.privateApis);

                function Je(e) {
                    for (let t = 0; t < e.length; t++) {
                        if ("core/post-content" === e[t].name) return e[t].attributes;
                        if (e[t].innerBlocks.length) {
                            const n = Je(e[t].innerBlocks);
                            if (n) return n
                        }
                    }
                }

                function Xe(e) {
                    for (let t = 0; t < e.length; t++)
                        if ("core/post-content" === e[t].name) return !0;
                    return !1
                }

                function Ze({
                    styles: e
                }) {
                    const {
                        deviceType: t,
                        isWelcomeGuideVisible: n,
                        isTemplateMode: o,
                        postContentAttributes: r,
                        editedPostTemplate: i = {},
                        wrapperBlockName: s,
                        wrapperUniqueId: a,
                        isBlockBasedTheme: l,
                        hasV3BlocksOnly: c
                    } = (0, v.useSelect)((e => {
                        const {
                            isFeatureActive: t
                        } = e("isolated/editor"), {
                            getCurrentPostId: n,
                            getCurrentPostType: o,
                            getEditorSettings: r
                        } = e(g.store), {
                            getBlockTypes: i
                        } = e(I.store);
                        let s;
                        s = "wp_block" === o() ? "core/block" : "core/post-content";
                        const a = r();
                        return {
                            deviceType: "Desktop",
                            isWelcomeGuideVisible: t("welcomeGuide"),
                            isTemplateMode: !1,
                            postContentAttributes: r().postContentAttributes,
                            editedPostTemplate: void 0,
                            wrapperBlockName: s,
                            wrapperUniqueId: n(),
                            isBlockBasedTheme: a.__unstableIsBlockBasedTheme,
                            hasV3BlocksOnly: i().every((e => e.apiVersion >= 3))
                        }
                    }), []), {
                        isCleanNewPost: d
                    } = (0, v.useSelect)(g.store), {
                        themeHasDisabledLayoutStyles: u,
                        themeSupportsLayout: p
                    } = (0, v.useSelect)((e => {
                        const t = e(O.store).getSettings();
                        return {
                            themeHasDisabledLayoutStyles: t.disableLayoutStyles,
                            themeSupportsLayout: t.supportsLayout,
                            isFocusMode: t.focusMode,
                            hasRootPaddingAwareAlignments: t.__experimentalFeatures?.useRootPaddingAwareAlignments
                        }
                    }), []), h = {
                        height: "100%",
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "flex",
                        flexFlow: "column",
                        background: "white"
                    }, b = {
                        ...h,
                        borderRadius: "2px 2px 0 0",
                        border: "1px solid #ddd",
                        borderBottom: 0
                    }, y = (0, O.__experimentalUseResizeCanvas)(t, o), _ = (0, O.useSetting)("layout"), w = "is-" + t.toLowerCase() + "-preview";
                    let T, C = o ? b : h;
                    y && (C = y), y || o || (T = "40vh");
                    const x = (0, f.useRef)(),
                        A = (0, k.useMergeRefs)([x, (0, O.__unstableUseTypewriter)()]),
                        B = (0, f.useMemo)((() => o ? {
                            type: "default"
                        } : p ? {
                            ..._,
                            type: "constrained"
                        } : {
                            type: "default"
                        }), [o, p, _]),
                        L = (0, f.useMemo)((() => {
                            if (!i?.content && !i?.blocks) return r;
                            if (i?.blocks) return Je(i?.blocks);
                            const e = "string" == typeof i?.content ? i?.content : "";
                            return Je((0, I.parse)(e)) || {}
                        }), [i?.content, i?.blocks, r]),
                        P = (0, f.useMemo)((() => {
                            if (!i?.content && !i?.blocks) return !1;
                            if (i?.blocks) return Xe(i?.blocks);
                            const e = "string" == typeof i?.content ? i?.content : "";
                            return Xe((0, I.parse)(e)) || !1
                        }), [i?.content, i?.blocks]),
                        {
                            layout: M = {},
                            align: R = ""
                        } = L || {},
                        N = Ye(L, "core/post-content"),
                        F = S()({
                            "is-layout-flow": !p
                        }, p && N, R && `align${R}`),
                        D = $e(L, "core/post-content", ".block-editor-block-list__layout.is-root-container"),
                        V = (0, f.useMemo)((() => M && ("constrained" === M?.type || M?.inherit || M?.contentSize || M?.wideSize) ? {
                            ..._,
                            ...M,
                            type: "constrained"
                        } : {
                            ..._,
                            ...M,
                            type: "default"
                        }), [M?.type, M?.inherit, M?.contentSize, M?.wideSize, _]),
                        U = r ? V : B,
                        z = "default" !== U?.type || P ? U : B,
                        H = (0, f.useRef)();
                    (0, f.useEffect)((() => {
                        !n && d() && H?.current?.focus()
                    }), [n, d]), e = (0, f.useMemo)((() => [...e, {
                        css: ".edit-post-visual-editor__post-title-wrapper{margin-top:4rem}" + (T ? `body{padding-bottom:${T}}` : "")
                    }]), [e]);
                    return (0, m.createElement)(O.BlockTools, {
                        __unstableContentRef: x,
                        className: S()("edit-post-visual-editor", {
                            "is-template-mode": o,
                            "has-inline-canvas": !0
                        })
                    }, (0, m.createElement)(E.__unstableMotion.div, {
                        className: "edit-post-visual-editor__content-area",
                        animate: {
                            padding: o ? "48px 48px 0" : 0
                        }
                    }, (0, m.createElement)(E.__unstableMotion.div, {
                        animate: C,
                        initial: h,
                        className: w
                    }, (0, m.createElement)(qe, {
                        shouldIframe: !1,
                        contentRef: A,
                        styles: e,
                        height: "100%"
                    }, p && !u && !o && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(je, {
                        selector: ".edit-post-visual-editor__post-title-wrapper",
                        layout: B
                    }), (0, m.createElement)(je, {
                        selector: ".block-editor-block-list__layout.is-root-container",
                        layout: z
                    }), R && (0, m.createElement)(je, {
                        css: ".is-root-container.alignwide { max-width: var(--wp--style--global--wide-size); margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignwide:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: var(--wp--style--global--wide-size);}\n\t\t.is-root-container.alignfull { max-width: none; margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignfull:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: none;}"
                    }), D && (0, m.createElement)(je, {
                        layout: V,
                        css: D
                    })), (0, m.createElement)(ze.Slot, {
                        mode: "visual"
                    }), (0, m.createElement)(O.__experimentalRecursionProvider, {
                        blockName: s,
                        uniqueId: a
                    }, (0, m.createElement)(O.BlockList, {
                        className: o ? "wp-site-blocks" : `${F} wp-block-post-content`,
                        layout: U
                    })), (0, m.createElement)(Ke.Slot, {
                        mode: "visual"
                    })))))
                }
                var Qe = n(766);
                class et extends f.Component {
                    constructor(e) {
                        super(e), this.edit = this.edit.bind(this), this.stopEditing = this.stopEditing.bind(this), this.state = {}
                    }
                    static getDerivedStateFromProps(e, t) {
                        return t.isDirty ? null : {
                            value: e.value,
                            isDirty: !1
                        }
                    }
                    edit(e) {
                        const t = e.target.value;
                        this.props.onChange(t), this.setState({
                            value: t,
                            isDirty: !0
                        })
                    }
                    stopEditing() {
                        this.state.isDirty && (this.props.onPersist(this.state.value), this.setState({
                            isDirty: !1
                        }))
                    }
                    render() {
                        const {
                            value: e
                        } = this.state, {
                            instanceId: t
                        } = this.props;
                        return (0, m.createElement)(m.Fragment, null, (0, m.createElement)("label", {
                            htmlFor: `post-content-${t}`,
                            className: "screen-reader-text"
                        }, (0, B.__)("Type text or HTML")), (0, m.createElement)(Qe.A, {
                            autoComplete: "off",
                            dir: "auto",
                            value: e,
                            onChange: this.edit,
                            onBlur: this.stopEditing,
                            className: "editor-post-text-editor",
                            id: `post-content-${t}`,
                            placeholder: (0, B.__)("Start writing with text or HTML")
                        }))
                    }
                }
                const tt = (0, k.compose)([(0, v.withSelect)((e => {
                        const {
                            getBlocks: t
                        } = e("isolated/editor");
                        return {
                            value: (0, I.serialize)(t())
                        }
                    })), (0, v.withDispatch)((e => {
                        const {
                            updateBlocksWithoutUndo: t
                        } = e("isolated/editor");
                        return {
                            onChange(e) {
                                const n = (0, I.parse)(e);
                                t(n)
                            },
                            onPersist(e) {
                                const n = (0, I.parse)(e);
                                t(n)
                            }
                        }
                    })), k.withInstanceId])(et),
                    nt = function({}) {
                        return (0, m.createElement)("div", {
                            className: "edit-post-text-editor"
                        }, (0, m.createElement)("div", {
                            className: "edit-post-text-editor__body"
                        }, (0, m.createElement)(ze.Slot, {
                            mode: "text"
                        }), (0, m.createElement)(tt, null), (0, m.createElement)(Ke.Slot, {
                            mode: "text"
                        })))
                    },
                    ot = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M6.6 6L5.4 7l4.5 5-4.5 5 1.1 1 5.5-6-5.4-6zm6 0l-1.1 1 4.5 5-4.5 5 1.1 1 5.5-6-5.5-6z"
                    })),
                    rt = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M11.6 7l-1.1-1L5 12l5.5 6 1.1-1L7 12l4.6-5zm6 0l-1.1-1-5.5 6 5.5 6 1.1-1-4.6-5 4.6-5z"
                    })),
                    it = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
                    })),
                    st = (0, k.compose)([(0, v.withSelect)(((e, {
                        feature: t
                    }) => ({
                        isActive: e("isolated/editor").isFeatureActive(t)
                    }))), (0, v.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleFeature(t.feature), t.onClose()
                        }
                    }))), E.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: o,
                        messageActivated: r,
                        messageDeactivated: i,
                        speak: s
                    }) {
                        return (0, m.createElement)(E.MenuItem, {
                            icon: t && P,
                            isSelected: t,
                            onClick: (0, T.flow)(e, (() => {
                                s(t ? i || (0, B.__)("Feature deactivated") : r || (0, B.__)("Feature activated"))
                            })),
                            role: "menuitemcheckbox",
                            info: o
                        }, n)
                    })),
                    at = (0, k.compose)([(0, v.withSelect)(((e, {
                        option: t
                    }) => ({
                        isActive: e("isolated/editor").isOptionActive(t)
                    }))), (0, v.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleOption(t.option), t.onClose()
                        }
                    }))), E.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: o
                    }) {
                        return (0, m.createElement)(E.MenuItem, {
                            icon: t && P,
                            isSelected: t,
                            onClick: e,
                            role: "menuitemcheckbox",
                            info: o
                        }, n)
                    })),
                    lt = function({
                        onClose: e,
                        settings: t
                    }) {
                        const {
                            preview: n,
                            fullscreen: o,
                            topToolbar: r
                        } = t?.iso?.moreMenu || {}, {
                            isFullscreen: i
                        } = (0, v.useSelect)((e => ({
                            isFullscreen: e("isolated/editor").isOptionActive("fullscreenMode")
                        })), []);
                        return o || n || r ? (0, m.createElement)(E.MenuGroup, {
                            label: (0, B._x)("View", "noun")
                        }, r && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(st, {
                            feature: "fixedToolbar",
                            label: (0, B.__)("Top toolbar"),
                            info: (0, B.__)("Access all block and document tools in a single place."),
                            messageActivated: (0, B.__)("Top toolbar activated"),
                            messageDeactivated: (0, B.__)("Top toolbar deactivated"),
                            onClose: e
                        })), o && (0, m.createElement)(at, {
                            option: "fullscreenMode",
                            label: (0, B.__)("Fullscreen"),
                            info: (0, B.__)("Show editor fullscreen."),
                            onClose: e
                        }), n && !i && (0, m.createElement)(at, {
                            option: "preview",
                            label: (0, B.__)("Preview"),
                            info: (0, B.__)("Preview the content before posting."),
                            onClose: e
                        })) : null
                    },
                    ct = (0, k.compose)([(0, v.withSelect)((e => {
                        const {
                            getEditorMode: t
                        } = e("isolated/editor"), {
                            codeEditingEnabled: n
                        } = e("core/editor").getEditorSettings();
                        return {
                            editorMode: t(),
                            isCodeEditingEnabled: n
                        }
                    })), (0, v.withDispatch)((e => ({
                        onSetMode(t) {
                            e("isolated/editor").setEditorMode(t)
                        }
                    })))])((function({
                        onClose: e,
                        editorMode: t,
                        onSetMode: n,
                        isCodeEditingEnabled: o,
                        settings: r
                    }) {
                        const i = t => {
                            n(t), e()
                        };
                        return o && !1 !== r?.iso?.moreMenu && r?.iso?.moreMenu?.editor ? (0, m.createElement)(E.MenuGroup, {
                            label: (0, B._x)("Editor", "noun")
                        }, (0, m.createElement)(E.MenuItem, {
                            icon: "visual" === t ? P : null,
                            isSelected: "visual" === t,
                            onClick: () => i("visual"),
                            role: "menuitemcheckbox"
                        }, (0, B.__)("Visual editor")), (0, m.createElement)(E.MenuItem, {
                            icon: "text" === t ? P : null,
                            isSelected: "text" === t,
                            onClick: () => i("text"),
                            role: "menuitemcheckbox"
                        }, (0, B.__)("Code editor"))) : null
                    })),
                    dt = function({
                        settings: e
                    }) {
                        const {
                            linkMenu: t = []
                        } = e.iso || {};
                        return 0 === t.length ? null : (0, m.createElement)(E.MenuGroup, {
                            label: (0, B.__)("Links")
                        }, t.map((({
                            title: e,
                            url: t
                        }) => (0, m.createElement)(E.MenuItem, {
                            key: e
                        }, (0, m.createElement)(E.ExternalLink, {
                            href: t
                        }, e)))))
                    },
                    ut = {
                        className: "edit-post-more-menu__content",
                        position: "bottom left"
                    },
                    pt = {
                        tooltipPosition: "bottom"
                    },
                    mt = ({
                        settings: e,
                        onClick: t,
                        renderMoreMenu: n
                    }) => (0, m.createElement)(E.DropdownMenu, {
                        className: "edit-post-more-menu",
                        icon: it,
                        label: (0, B.__)("More tools & options"),
                        popoverProps: ut,
                        toggleProps: {
                            ...pt,
                            onClick: t
                        }
                    }, (({
                        onClose: t
                    }) => (0, m.createElement)(m.Fragment, null, n && n(e, t), (0, m.createElement)(ct, {
                        onClose: t,
                        settings: e
                    }), (0, m.createElement)(lt, {
                        onClose: t,
                        settings: e
                    }), (0, m.createElement)(dt, {
                        settings: e
                    })))),
                    ft = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
                    })),
                    ht = (0, m.createElement)(L.SVG, {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, m.createElement)(L.Path, {
                        d: "M3 6h11v1.5H3V6Zm3.5 5.5h11V13h-11v-1.5ZM21 17H10v1.5h11V17Z"
                    })),
                    gt = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"
                    })),
                    bt = (0, f.forwardRef)((function(e, t) {
                        const n = (0, v.useSelect)((e => e("isolated/editor").hasEditorRedo()), []),
                            {
                                redo: o
                            } = (0, v.useDispatch)("isolated/editor");
                        return (0, m.createElement)(E.Button, {
                            ...e,
                            ref: t,
                            icon: gt,
                            label: (0, B.__)("Redo"),
                            shortcut: A.displayShortcut.primaryShift("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__redo"
                        })
                    })),
                    Et = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"
                    })),
                    yt = (0, f.forwardRef)((function(e, t) {
                        const n = (0, v.useSelect)((e => e("isolated/editor").hasEditorUndo()), []),
                            {
                                undo: o
                            } = (0, v.useDispatch)("isolated/editor");
                        return (0, m.createElement)(E.Button, {
                            ...e,
                            ref: t,
                            icon: Et,
                            label: (0, B.__)("Undo"),
                            shortcut: A.displayShortcut.primary("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__undo"
                        })
                    })),
                    vt = window.wp.dom;

                function _t() {
                    return (0, m.createElement)(m.Fragment, null, (0, m.createElement)("div", {
                        className: "editor-list-view-sidebar__outline"
                    }, (0, m.createElement)("div", null, (0, m.createElement)(E.__experimentalText, null, (0, B.__)("Characters:")), (0, m.createElement)(E.__experimentalText, null, (0, m.createElement)(g.CharacterCount, null))), (0, m.createElement)("div", null, (0, m.createElement)(E.__experimentalText, null, (0, B.__)("Words:")), (0, m.createElement)(g.WordCount, null)), (0, m.createElement)("div", null, (0, m.createElement)(E.__experimentalText, null, (0, B.__)("Time to read:")), (0, m.createElement)(g.TimeToRead, null))), (0, m.createElement)(g.DocumentOutline, null))
                }
                const {
                    Tabs: wt
                } = Se(E.privateApis);

                function St({
                    canClose: e = !0
                }) {
                    const {
                        setIsListViewOpened: t
                    } = (0, v.useDispatch)("isolated/editor"), n = (0, k.useFocusOnMount)("firstElement"), o = (0, f.useCallback)((() => {
                        t(!1)
                    }), [t]), r = (0, f.useCallback)((e => {
                        e.keyCode !== A.ESCAPE || e.defaultPrevented || (e.preventDefault(), o())
                    }), [o]), [i, s] = (0, f.useState)(null), [a, l] = (0, f.useState)("list-view"), c = (0, f.useRef)(), d = (0, f.useRef)(), u = (0, f.useRef)(), p = (0, k.useMergeRefs)([n, u, s]), h = (0, f.useCallback)((() => {
                        c.current.contains(c.current.ownerDocument.activeElement) ? o() : function(e) {
                            const t = vt.focus.tabbable.find(d.current)[0];
                            if ("list-view" === e) {
                                const e = vt.focus.tabbable.find(u.current)[0];
                                (c.current.contains(e) ? e : t).focus()
                            } else t.focus()
                        }(a)
                    }), [o, a]);
                    return (0, _.useShortcut)("core/edit-post/toggle-list-view", h), (0, m.createElement)("div", {
                        className: "editor-list-view-sidebar",
                        onKeyDown: r,
                        ref: c
                    }, (0, m.createElement)(wt, {
                        onSelect: e => l(e),
                        selectOnMove: !1,
                        initialTabId: "list-view"
                    }, (0, m.createElement)("div", {
                        className: "edit-post-editor__document-overview-panel__header"
                    }, e && (0, m.createElement)(E.Button, {
                        className: "editor-list-view-sidebar__close-button",
                        icon: D,
                        label: (0, B.__)("Close"),
                        onClick: o
                    }), (0, m.createElement)(wt.TabList, {
                        className: "editor-list-view-sidebar__tabs-tablist",
                        ref: d
                    }, (0, m.createElement)(wt.Tab, {
                        className: "editor-list-view-sidebar__tabs-tab",
                        tabId: "list-view"
                    }, (0, B._x)("List View", "Post overview")), (0, m.createElement)(wt.Tab, {
                        className: "editor-list-view-sidebar__tabs-tab",
                        tabId: "outline"
                    }, (0, B._x)("Outline", "Post overview")))), (0, m.createElement)(wt.TabPanel, {
                        ref: p,
                        className: "editor-list-view-sidebar__tabs-tabpanel",
                        tabId: "list-view",
                        focusable: !1
                    }, (0, m.createElement)("div", {
                        className: "editor-list-view-sidebar__list-view-container"
                    }, (0, m.createElement)("div", {
                        className: "editor-list-view-sidebar__list-view-panel-content"
                    }, (0, m.createElement)(O.__experimentalListView, {
                        dropZoneElement: i
                    })))), (0, m.createElement)(wt.TabPanel, {
                        className: "editor-list-view-sidebar__tabs-tabpanel",
                        tabId: "outline",
                        focusable: !1
                    }, (0, m.createElement)("div", {
                        className: "editor-list-view-sidebar__list-view-container"
                    }, (0, m.createElement)(_t, null)))))
                }
                const kt = (0, f.forwardRef)((function({
                        isDisabled: e,
                        ...t
                    }, n) {
                        const o = (0, v.useSelect)((e => !!e(O.store).getBlockCount()), []) && !e;
                        return (0, m.createElement)(E.Dropdown, {
                            contentClassName: "block-editor-block-navigation__popover",
                            position: "bottom right",
                            renderToggle: ({
                                isOpen: e,
                                onToggle: r
                            }) => (0, m.createElement)(E.Button, {
                                ...t,
                                ref: n,
                                icon: ht,
                                "aria-expanded": e,
                                "aria-haspopup": "true",
                                onClick: o ? r : void 0
                                    /* translators: button label text should, if possible, be under 16 characters. */
                                    ,
                                label: (0, B.__)("List view"),
                                className: "block-editor-block-navigation",
                                "aria-disabled": !o
                            }),
                            renderContent: () => (0, m.createElement)(St, {
                                canClose: !1
                            })
                        })
                    })),
                    Tt = e => {
                        e.preventDefault()
                    },
                    Ct = function(e) {
                        const t = (0, f.useRef)(),
                            {
                                setIsInserterOpened: n,
                                setIsListViewOpened: o
                            } = (0, v.useDispatch)("isolated/editor"),
                            r = (0, k.useViewportMatch)("medium", "<"),
                            {
                                fixedToolbar: i,
                                isInserterEnabled: s,
                                isTextModeEnabled: a,
                                showIconLabels: l,
                                previewDeviceType: c,
                                isInserterOpened: d,
                                isListViewOpen: u,
                                listViewShortcut: p
                            } = (0, v.useSelect)((e => {
                                const {
                                    hasInserterItems: t,
                                    getBlockRootClientId: n,
                                    getBlockSelectionEnd: o
                                } = e("core/block-editor"), {
                                    isListViewOpened: r
                                } = e("isolated/editor"), {
                                    getShortcutRepresentation: i
                                } = e(_.store);
                                return {
                                    fixedToolbar: e("isolated/editor").isFeatureActive("fixedToolbar"),
                                    isInserterEnabled: "visual" === e("isolated/editor").getEditorMode() && e("core/editor").getEditorSettings().richEditingEnabled && t(n(o())),
                                    isListViewOpen: r(),
                                    isTextModeEnabled: "text" === e("isolated/editor").getEditorMode(),
                                    previewDeviceType: "Desktop",
                                    isInserterOpened: e("isolated/editor").isInserterOpened(),
                                    showIconLabels: !1,
                                    listViewShortcut: i("core/edit-post/toggle-list-view")
                                }
                            }), []),
                            h = (0, k.useViewportMatch)("medium"),
                            {
                                inserter: g,
                                navigation: b,
                                undo: y,
                                selectorTool: w
                            } = e.settings.iso.toolbar,
                            S = e.settings?.iso?.sidebar?.inserter || !1,
                            T = !h || "Desktop" !== c || i ? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */ /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
                            (0, B.__)("Document and block tools") : /* translators: accessibility text for the editor toolbar when Top Toolbar is off */ /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
                            (0, B.__)("Document tools"),
                            C = (0, f.useCallback)((() => {
                                n(!d)
                            }), [d, n]),
                            x = (0, f.useCallback)((() => o(!u)), [o, u]);
                        return (0, m.createElement)(O.NavigableToolbar, {
                            className: "editor-document-tools edit-post-header-toolbar",
                            "aria-label": T
                        }, (g || y || b || w) && (0, m.createElement)("div", {
                            className: "editor-document-tools__left edit-post-header-toolbar__left"
                        }, g && (0, m.createElement)(E.ToolbarItem, {
                            ref: t,
                            as: E.Button,
                            className: "editor-document-tools__inserter-toggle",
                            isPressed: d,
                            onMouseDown: Tt,
                            onClick: C,
                            disabled: !s,
                            isPrimary: !0,
                            icon: ft
                                /* translators: button label text should, if possible, be under 16
                                    characters. */
                                ,
                            label: (0, B._x)("Toggle block inserter", "Generic label for block inserter button"),
                            showTooltip: !l
                        }), d && !S && (0, m.createElement)(E.Popover, {
                            position: "bottom right",
                            onClose: () => n(!1),
                            anchor: t.current
                        }, (0, m.createElement)(O.__experimentalLibrary, {
                            showMostUsedBlocks: !1,
                            showInserterHelpPanel: !0,
                            onSelect: () => {
                                r && n(!1)
                            }
                        })), w && (0, m.createElement)(O.ToolSelector, null), y && (0, m.createElement)(E.ToolbarItem, {
                            as: yt,
                            showTooltip: !l,
                            variant: l ? "tertiary" : void 0
                        }), y && (0, m.createElement)(E.ToolbarItem, {
                            as: bt,
                            showTooltip: !l,
                            variant: l ? "tertiary" : void 0
                        }), b && !S && (0, m.createElement)(E.ToolbarItem, {
                            as: kt,
                            isDisabled: a
                        }), b && S && (0, m.createElement)(E.ToolbarItem, {
                            as: E.Button,
                            className: "edit-post-header-toolbar__list-view-toggle",
                            icon: ht,
                            disabled: a,
                            isPressed: u
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            label: (0, B.__)("List View"),
                            onClick: x,
                            shortcut: p,
                            showTooltip: !l
                        })))
                    },
                    xt = function({
                        button: e,
                        onToggle: t
                    }) {
                        return (0, m.createElement)(E.Popover, {
                            position: "bottom left",
                            className: "iso-inspector",
                            anchor: e?.current,
                            onFocusOutside: function(e) {
                                null !== e.target.closest(".block-editor-block-inspector") || e.target.classList.contains("iso-inspector") || (t(!1), e.preventDefault(), e.stopPropagation())
                            }
                        }, (0, m.createElement)(ge.Slot, {
                            scope: "isolated/editor"
                        }))
                    },
                    {
                        Fill: It,
                        Slot: Ot
                    } = (0, E.createSlotFill)("IsolatedToolbar"),
                    At = ({
                        children: e
                    }) => (0, m.createElement)(It, null, e);
                At.Slot = function(e) {
                    return (0, m.createElement)(Ot, null, (e => e))
                };
                const Bt = At,
                    Lt = e => {
                        const t = (0, f.useRef)(null),
                            {
                                settings: n,
                                editorMode: o,
                                renderMoreMenu: r
                            } = e,
                            i = (0, k.useViewportMatch)("huge", ">="),
                            s = (0, f.useRef)(),
                            a = (0, k.useViewportMatch)("medium"),
                            {
                                inspector: l
                            } = n.iso?.toolbar || {},
                            {
                                moreMenu: c
                            } = n.iso || {},
                            d = n?.iso?.sidebar?.inspector || !1,
                            {
                                openGeneralSidebar: u,
                                closeGeneralSidebar: p
                            } = (0, v.useDispatch)("isolated/editor"),
                            {
                                setIsInserterOpened: h
                            } = (0, v.useDispatch)("isolated/editor"),
                            {
                                isEditorSidebarOpened: g,
                                isBlockSelected: b,
                                hasBlockSelected: y,
                                isInserterOpened: _,
                                isEditing: w
                            } = (0, v.useSelect)((e => ({
                                isEditing: e("isolated/editor"),
                                isEditorSidebarOpened: e("isolated/editor").isEditorSidebarOpened(),
                                isBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                hasBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                isInserterOpened: e("isolated/editor").isInserterOpened()
                            })), []),
                            [T, C] = (0, f.useState)(!0);

                        function x(e) {
                            e ? u(y ? "edit-post/block" : "edit-post/document") : p()
                        }
                        return (0, f.useEffect)((() => {
                            b && C(!1)
                        }), [b]), (0, f.useEffect)((() => {
                            d || p()
                        }), []), (0, f.useEffect)((() => {
                            d || w || b || !g || p()
                        }), [w]), (0, f.useEffect)((() => {
                            g && !i && h(!1)
                        }), [g, i]), (0, f.useEffect)((() => {
                            !_ || i && d || p()
                        }), [_, i]), (0, m.createElement)("div", {
                            className: "edit-post-editor-regions__header",
                            role: "region",
                            tabIndex: -1
                        }, (0, m.createElement)("div", {
                            className: "edit-post-header"
                        }, (0, m.createElement)("div", {
                            className: "edit-post-header__toolbar"
                        }, (0, m.createElement)(Ct, {
                            settings: n
                        }), a && (0, m.createElement)(m.Fragment, null, (0, m.createElement)("div", {
                            className: S()("selected-block-tools-wrapper", {
                                "is-collapsed": T
                            })
                        }, (0, m.createElement)(O.BlockToolbar, {
                            hideDragHandle: !0
                        })), (0, m.createElement)(E.Popover.Slot, {
                            ref: s,
                            name: "block-toolbar"
                        }), b && (0, m.createElement)(E.Button, {
                            className: "edit-post-header__block-tools-toggle",
                            icon: T ? ot : rt,
                            onClick: () => {
                                C((e => !e))
                            },
                            label: T ? (0, B.__)("Show block tools") : (0, B.__)("Hide block tools")
                        }))), (0, m.createElement)("div", {
                            className: "edit-post-header__settings",
                            ref: t
                        }, (0, m.createElement)(Bt.Slot, null), l && (0, m.createElement)(E.Button, {
                            icon: _e,
                            label: (0, B.__)("Settings"),
                            onClick: () => x(!g),
                            isPressed: g,
                            "aria-expanded": g,
                            disabled: "text" === o
                        }), g && !d && (0, m.createElement)(xt, {
                            button: t,
                            onToggle: x
                        }), c && (0, m.createElement)(mt, {
                            settings: n,
                            onClick: () => p(),
                            renderMoreMenu: r
                        }))))
                    },
                    Pt = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
                    }));

                function Mt() {
                    const {
                        setIsInserterOpened: e
                    } = (0, v.useDispatch)("isolated/editor"), t = (0, k.useViewportMatch)("medium", "<"), n = t ? "div" : E.VisuallyHidden, [o, r] = (0, k.__experimentalUseDialog)({
                        onClose: () => e(!1),
                        focusOnMount: null
                    });
                    return (0, m.createElement)("div", {
                        ref: o,
                        ...r,
                        className: "edit-widgets-layout__inserter-panel"
                    }, (0, m.createElement)(n, {
                        className: "edit-widgets-layout__inserter-panel-header"
                    }, (0, m.createElement)(E.Button, {
                        icon: Pt,
                        onClick: () => e(!1)
                    })), (0, m.createElement)("div", {
                        className: "edit-widgets-layout__inserter-panel-content"
                    }, (0, m.createElement)(O.__experimentalLibrary, {
                        showMostUsedBlocks: !1,
                        showInserterHelpPanel: !0,
                        shouldFocusBlock: t
                    })))
                }
                const Rt = ({
                        editorMode: e
                    }) => {
                        const t = (0, k.useViewportMatch)("medium", "<"),
                            {
                                showBlockBreadcrumbs: n,
                                documentLabel: o
                            } = (0, v.useSelect)((e => {
                                const {
                                    getPostTypeLabel: t
                                } = e(g.store);
                                return {
                                    showBlockBreadcrumbs: !1,
                                    // translators: Default label for the Document in the Block Breadcrumb.
                                    documentLabel: t() || (0, B._x)("Document", "noun")
                                }
                            }), []);
                        return (0, m.createElement)("div", {
                            className: "edit-post-layout__footer"
                        }, n && !t && "visual" === e && (0, m.createElement)(O.BlockBreadcrumb, {
                            rootLabelText: o
                        }), (0, m.createElement)(Ke.Slot, null))
                    },
                    {
                        Fill: Nt,
                        Slot: Ft
                    } = (0, E.createSlotFill)("IsolatedFooter"),
                    Dt = ({
                        children: e
                    }) => (0, m.createElement)(Nt, null, e);
                Dt.Slot = function() {
                    return (0, m.createElement)(Ft, null, (e => e))
                };
                const Vt = Dt,
                    Ut = {
                        secondarySidebar: (0, B.__)("Block library"),
                        /* translators: accessibility text for the editor top bar landmark region. */
                        header: (0, B.__)("Editor top bar"),
                        /* translators: accessibility text for the editor content landmark region. */
                        body: (0, B.__)("Editor content"),
                        /* translators: accessibility text for the editor settings landmark region. */
                        sidebar: (0, B.__)("Editor settings"),
                        /* translators: accessibility text for the editor publish landmark region. */
                        actions: (0, B.__)("Editor publish"),
                        /* translators: accessibility text for the editor footer landmark region. */
                        footer: (0, B.__)("Editor footer")
                    },
                    zt = (0, v.withDispatch)((e => {
                        const {
                            redo: t,
                            undo: n
                        } = e("isolated/editor");
                        return {
                            redo: t,
                            undo: n
                        }
                    }))((function(e) {
                        var t, n, o;
                        const {
                            isEditing: r,
                            editorMode: i,
                            children: s,
                            undo: a,
                            redo: l,
                            settings: c,
                            renderMoreMenu: d
                        } = e, u = (0, k.useViewportMatch)("medium", "<"), p = (0, k.useViewportMatch)("medium"), h = c?.iso?.sidebar?.inspector || !1, b = c?.iso?.sidebar?.inserter || !1, y = null === (t = c?.iso?.header) || void 0 === t || t, w = c?.iso?.footer || !1, {
                            sidebarIsOpened: T,
                            fixedToolbar: C,
                            isInserterOpened: x,
                            isListViewOpened: I,
                            showIconLabels: B,
                            isFullscreenActive: L,
                            previousShortcut: P,
                            nextShortcut: M
                        } = (0, v.useSelect)((e => {
                            const {
                                isFeatureActive: t,
                                isInserterOpened: n,
                                isListViewOpened: o,
                                isOptionActive: r
                            } = e("isolated/editor");
                            return {
                                sidebarIsOpened: !!e(oe).getActiveComplementaryArea("isolated/editor"),
                                fixedToolbar: t("fixedToolbar", c?.editor.hasFixedToolbar),
                                isInserterOpened: n(),
                                isListViewOpened: o(),
                                isFullscreenActive: r("fullscreenMode"),
                                showIconLabels: t("showIconLabels"),
                                previousShortcut: e(_.store).getAllShortcutKeyCombinations("core/edit-post/previous-region"),
                                nextShortcut: e(_.store).getAllShortcutKeyCombinations("core/edit-post/next-region")
                            }
                        }), []), R = S()("edit-post-layout", "is-mode-" + i, {
                            "is-sidebar-opened": T,
                            "is-inserter-opened": x,
                            "has-fixed-toolbar": C,
                            "show-icon-labels": B
                        });
                        (0, f.useEffect)((() => {
                            const e = document.querySelector("html");
                            return L ? e.classList.add("is-fullscreen-mode") : e.classList.remove("is-fullscreen-mode"), () => {
                                e && e.classList.remove("is-fullscreen-mode")
                            }
                        }), [L]);
                        const N = y ? (0, m.createElement)(Lt, {
                                editorMode: i,
                                settings: c,
                                renderMoreMenu: d
                            }) : null,
                            F = null !== (n = c?.iso?.sidebar?.customComponent) && void 0 !== n ? n : Fe;
                        return (0, m.createElement)(m.Fragment, null, (0, m.createElement)(F, {
                            documentInspector: null !== (o = c?.iso?.toolbar?.documentInspector) && void 0 !== o && o
                        }), (0, m.createElement)(be, {
                            isActive: L
                        }), (0, m.createElement)(ve, {
                            className: R,
                            labels: Ut,
                            header: N,
                            secondarySidebar: b ? "visual" === i && x ? (0, m.createElement)(Mt, null) : "visual" === i && I ? (0, m.createElement)(St, null) : null : null,
                            sidebar: (!u || T) && h && (0, m.createElement)(ge.Slot, {
                                scope: "isolated/editor"
                            }),
                            notices: (0, m.createElement)(g.EditorSnackbars, null),
                            content: (0, m.createElement)(m.Fragment, null, (0, m.createElement)(g.EditorNotices, null), r && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(O.BlockEditorKeyboardShortcuts, null), (0, m.createElement)(O.BlockEditorKeyboardShortcuts.Register, null)), (0, m.createElement)(E.KeyboardShortcuts, {
                                bindGlobal: !1,
                                shortcuts: {
                                    [A.rawShortcut.primary("z")]: a,
                                    [A.rawShortcut.primaryShift("z")]: l
                                }
                            }, "visual" === i && (0, m.createElement)(m.Fragment, null, !p && (0, m.createElement)(O.BlockToolbar, {
                                hideDragHandle: !0
                            }), (0, m.createElement)(Ze, {
                                styles: []
                            })), "text" === i && (0, m.createElement)(nt, null)), s),
                            footer: w && (0, m.createElement)(Rt, {
                                editorMode: i
                            }),
                            actions: (0, m.createElement)(Vt.Slot, null),
                            shortcuts: {
                                previous: P,
                                next: M
                            }
                        }))
                    })),
                    Ht = (0, k.compose)([(0, v.withSelect)(((e, t) => {
                        var n;
                        const {
                            getBlocks: o,
                            getEditorSelection: r,
                            getEditorMode: i,
                            isEditing: s
                        } = e("isolated/editor");
                        return {
                            blocks: null !== (n = t.blocks) && void 0 !== n ? n : o(),
                            selection: r(),
                            isEditing: s(),
                            editorMode: i()
                        }
                    })), (0, v.withDispatch)(((e, t) => {
                        const {
                            updateBlocksWithUndo: n,
                            updateBlocksWithoutUndo: o
                        } = e("isolated/editor"), {
                            onInput: r,
                            onChange: i
                        } = t;
                        return {
                            onChange: (...e) => {
                                i?.(...e), n(...e)
                            },
                            onInput: (...e) => {
                                r?.(...e), o(...e)
                            }
                        }
                    }))])((function(e) {
                        const {
                            blocks: t,
                            onInput: n,
                            onChange: o,
                            selection: r,
                            isEditing: i,
                            editorMode: s
                        } = e, {
                            children: a,
                            settings: l,
                            renderMoreMenu: c,
                            onLoad: d
                        } = e;
                        return (0, f.useEffect)((() => {
                            (async () => {
                                const e = await async function(e, t) {
                                    var n;
                                    return (!(n = t) || "object" != typeof n && "function" != typeof n || "function" != typeof n.then ? new Promise((e => {
                                        e(t ? t(I.parse, I.rawHandler) : [])
                                    })) : t).then((t => function(e, t, n, o) {
                                        if (void 0 === e) return o;
                                        if (o && o.length > 0) return o;
                                        if (t) {
                                            const n = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                                            if (n) return (0, I.parse)(n.content)
                                        }
                                        return n ? (0, I.synchronizeBlocksWithTemplate)(o, n) : []
                                    }(e.iso.patterns, e.iso.currentPattern, e.editor.template, t)))
                                }(l, d);
                                e.length > 0 && (!t || 0 === t.length) && n(e, {
                                    isInitialContent: !0
                                })
                            })()
                        }), []), (0, m.createElement)(O.BlockEditorProvider, {
                            value: t || [],
                            onInput: n,
                            onChange: o,
                            useSubRegistry: !1,
                            selection: r,
                            settings: l.editor
                        }, (0, m.createElement)(zt, {
                            isEditing: i,
                            editorMode: s,
                            settings: l,
                            renderMoreMenu: c
                        }, a), (0, m.createElement)(E.Popover.Slot, null))
                    }));

                function Wt(e, t) {
                    const n = ["core/block-editor", "core/editor"];
                    return {
                        dispatch: t => null === Wt.targetDispatch || -1 === n.indexOf(t) ? e.dispatch(t) : Wt.targetDispatch(t),
                        select: t => null === Wt.targetSelect || -1 === n.indexOf(t) ? e.select(t) : Wt.targetSelect(t)
                    }
                }
                Wt.targetSelect = null, Wt.targetDispatch = null, Wt.setEditor = function(e, t) {
                    this.targetSelect = e, this.targetDispatch = t
                }, Wt.resetEditor = function() {
                    this.targetSelect = null, this.targetDispatch = null
                };
                const Gt = Wt,
                    Kt = (0, k.compose)([(0, v.withSelect)((e => {
                        const {
                            isEditing: t
                        } = e("isolated/editor");
                        return {
                            isEditing: t()
                        }
                    })), (0, v.withDispatch)(((e, t, {
                        select: n
                    }) => ({
                        hotSwap: t => {
                            Gt.resetEditor(), t && Gt.setEditor(n, e)
                        }
                    })))])((function({
                        isEditing: e,
                        hotSwap: t
                    }) {
                        return (0, f.useEffect)((() => {
                            t(e)
                        }), [e]), null
                    })),
                    jt = (0, k.compose)([(0, v.withSelect)(((e, {
                        settings: t
                    }) => {
                        const {
                            isEditorReady: n,
                            getEditorMode: o,
                            isEditing: r,
                            isFeatureActive: i,
                            isOptionActive: s
                        } = e("isolated/editor");
                        return {
                            isEditorReady: n(),
                            editorMode: o(),
                            isEditing: r(),
                            fixedToolbar: i("fixedToolbar", t?.editor.hasFixedToolbar),
                            isPreview: s("preview")
                        }
                    })), (0, v.withDispatch)((e => {
                        const {
                            setEditing: t
                        } = e("isolated/editor");
                        return {
                            setEditing: t
                        }
                    }))])((function(e) {
                        const {
                            children: t,
                            settings: n,
                            className: o,
                            onError: r,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: a,
                            onChange: l,
                            blocks: c
                        } = e, {
                            isEditorReady: d,
                            editorMode: u,
                            isEditing: p,
                            setEditing: f,
                            fixedToolbar: h,
                            isPreview: b
                        } = e, [E, {
                            width: y
                        }] = (0, k.useResizeObserver)(), v = S()(o, {
                            "iso-editor": !0,
                            "is-large": !!y && y >= 720,
                            "is-medium": !y || y >= 480 && y < 720,
                            "is-small": !!y && y < 480,
                            "iso-editor__loading": !d,
                            "iso-editor__selected": p,
                            "block-editor": !0,
                            "edit-post-layout": !0,
                            "has-fixed-toolbar": h,
                            ["is-mode-" + u]: !0,
                            "is-preview-mode": b
                        });
                        return (0, m.createElement)("div", {
                            className: v
                        }, (0, m.createElement)(g.ErrorBoundary, {
                            onError: r
                        }, (0, m.createElement)(Kt, null), E, (0, m.createElement)(x, {
                            onOutside: () => f(!1),
                            onFocus: () => !p && f(!0)
                        }, (0, m.createElement)(Ht, {
                            blocks: c,
                            settings: n,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: a,
                            onChange: l
                        }, t))))
                    })),
                    Yt = "@@redux-undo/UNDO",
                    $t = "@@redux-undo/REDO",
                    qt = "@@redux-undo/JUMP_TO_FUTURE",
                    Jt = "@@redux-undo/JUMP_TO_PAST",
                    Xt = "@@redux-undo/JUMP",
                    Zt = "@@redux-undo/CLEAR_HISTORY",
                    Qt = () => ({
                        type: Yt
                    }),
                    en = () => ({
                        type: $t
                    });

                function tn(e, t = []) {
                    return Array.isArray(e) ? e : "string" == typeof e ? [e] : t
                }

                function nn(e, t, n, o = null) {
                    return {
                        past: e,
                        present: t,
                        future: n,
                        group: o,
                        _latestUnfiltered: t,
                        index: e.length,
                        limit: e.length + n.length + 1
                    }
                }
                let on, rn;
                const sn = "#9E9E9E",
                    an = "#03A9F4",
                    ln = "#4CAF50";

                function cn(e, t, n) {
                    return [`%c${e}`, `color: ${t}; font-weight: bold`, n]
                }

                function dn(e) {
                    on && (console.group ? rn.next = cn("next history", ln, e) : rn.next = ["next history", e], function() {
                        const {
                            header: e,
                            prev: t,
                            next: n,
                            action: o,
                            msgs: r
                        } = rn;
                        console.group ? (console.groupCollapsed(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r), console.groupEnd()) : (console.log(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r))
                    }())
                }

                function un(...e) {
                    on && (rn.msgs = rn.msgs.concat([...e, "\n"]))
                }

                function pn(e, t) {
                    const n = nn([], e, []);
                    return t && (n._latestUnfiltered = null), n
                }

                function mn(e, t) {
                    if (t < 0 || t >= e.future.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e;
                    return nn([...n, r, ...o.slice(0, t)], o[t], o.slice(t + 1))
                }

                function fn(e, t) {
                    if (t < 0 || t >= e.past.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e, i = n.slice(0, t), s = [...n.slice(t + 1), r, ...o];
                    return nn(i, n[t], s)
                }

                function hn(e, t) {
                    return t > 0 ? mn(e, t - 1) : t < 0 ? fn(e, e.past.length + t) : e
                }
                const gn = window.wp.isShallowEqual;
                var bn = n.n(gn);
                const En = {
                    editCount: 0,
                    selection: null,
                    blocks: null
                };

                function yn(e, t) {
                    return e.find((e => e.clientId === t.clientId))
                }

                function vn(e, t) {
                    const {
                        type: n,
                        selection: o
                    } = e;
                    if ("UPDATE_BLOCKS_WITHOUT_UNDO" === n) return !1;
                    if (!o) return !0;
                    if (bn()(o, t.selection)) {
                        const n = yn(t.blocks, o.selectionStart),
                            r = yn(e.blocks, o.selectionStart);
                        if (n && r && bn()(n.attributes, r.attributes)) return !1
                    }
                    return !0
                }
                const wn = function(e, t = {}) {
                        ! function(e) {
                            on = e
                        }(t.debug);
                        const n = {
                                limit: void 0,
                                filter: () => !0,
                                groupBy: () => null,
                                undoType: Yt,
                                redoType: $t,
                                jumpToPastType: Jt,
                                jumpToFutureType: qt,
                                jumpType: Xt,
                                neverSkipReducer: !1,
                                ignoreInitialState: !1,
                                syncFilter: !1,
                                ...t,
                                initTypes: tn(t.initTypes, ["@@redux-undo/INIT"]),
                                clearHistoryType: tn(t.clearHistoryType, [Zt])
                            },
                            o = n.neverSkipReducer ? (t, n, ...o) => ({
                                ...t,
                                present: e(t.present, n, ...o)
                            }) : e => e;
                        let r;
                        return (t = r, i = {}, ...s) => {
                            ! function(e, t) {
                                rn = {
                                    header: [],
                                    prev: [],
                                    action: [],
                                    next: [],
                                    msgs: []
                                }, on && (console.group ? (rn.header = ["%credux-undo", "font-style: italic", "action", e.type], rn.action = cn("action", an, e), rn.prev = cn("prev history", sn, t)) : (rn.header = ["redux-undo action", e.type], rn.action = ["action", e], rn.prev = ["prev history", t]))
                            }(i, t);
                            let a, l = t;
                            if (!r) {
                                if (un("history is uninitialized"), void 0 === t) return l = pn(e(t, {
                                    type: "@@redux-undo/CREATE_HISTORY"
                                }, ...s), n.ignoreInitialState), un("do not set initialState on probe actions"), dn(l), l;
                                ! function(e) {
                                    return typeof e.present < "u" && typeof e.future < "u" && typeof e.past < "u" && Array.isArray(e.future) && Array.isArray(e.past)
                                }(t) ? (l = r = pn(t, n.ignoreInitialState), un("initialHistory initialized: initialState is not a history", r)) : (l = r = n.ignoreInitialState ? t : nn(t.past, t.present, t.future), un("initialHistory initialized: initialState is a history", r))
                            }
                            switch (i.type) {
                                case void 0:
                                    return l;
                                case n.undoType:
                                    return a = hn(l, -1), un("perform undo"), dn(a), o(a, i, ...s);
                                case n.redoType:
                                    return a = hn(l, 1), un("perform redo"), dn(a), o(a, i, ...s);
                                case n.jumpToPastType:
                                    return a = fn(l, i.index), un(`perform jumpToPast to ${i.index}`), dn(a), o(a, i, ...s);
                                case n.jumpToFutureType:
                                    return a = mn(l, i.index), un(`perform jumpToFuture to ${i.index}`), dn(a), o(a, i, ...s);
                                case n.jumpType:
                                    return a = hn(l, i.index), un(`perform jump to ${i.index}`), dn(a), o(a, i, ...s);
                                case
                                function(e, t) {
                                    return t.indexOf(e) > -1 ? e : !e
                                }(i.type, n.clearHistoryType):
                                    return a = pn(l.present, n.ignoreInitialState), un("perform clearHistory"), dn(a), o(a, i, ...s);
                                default:
                                    if (a = e(l.present, i, ...s), n.initTypes.some((e => e === i.type))) return un("reset history due to init action"), dn(r), r;
                                    if (l._latestUnfiltered === a) return l;
                                    if ("function" == typeof n.filter && !n.filter(i, a, l)) {
                                        const e = nn(l.past, a, l.future, l.group);
                                        return n.syncFilter || (e._latestUnfiltered = l._latestUnfiltered), un("filter ignored action, not storing it in past"), dn(e), e
                                    }
                                    const t = n.groupBy(i, a, l);
                                    if (null != t && t === l.group) {
                                        const e = nn(l.past, a, l.future, l.group);
                                        return un("groupBy grouped the action with the previous action"), dn(e), e
                                    }
                                    return l = function(e, t, n, o) {
                                        const r = e.past.length + 1;
                                        un("inserting", t), un("new free: ", n - r);
                                        const {
                                            past: i,
                                            _latestUnfiltered: s
                                        } = e, a = n && n <= r, l = i.slice(a ? 1 : 0);
                                        return nn(null != s ? [...l, s] : l, t, [], o)
                                    }(l, a, n.limit, t), un("inserted new state into history"), dn(l), l
                            }
                        }
                    }(((e = En, t) => {
                        switch (t.type) {
                            case "UPDATE_BLOCKS_WITHOUT_UNDO":
                            case "UPDATE_BLOCKS_WITH_UNDO":
                                return {
                                    ...e, editCount: vn(t, e) ? e.editCount + 1 : e.editCount, blocks: t.blocks, selection: t.selection
                                }
                        }
                        return e
                    }), {
                        groupBy: (e, t, n) => t.editCount
                    }),
                    Sn = {
                        * undo() {
                            return yield Qt()
                        },
                        * redo() {
                            return yield en()
                        },
                        * updateBlocksWithUndo(e, t = {}) {
                            return yield {
                                type: "UPDATE_BLOCKS_WITH_UNDO",
                                blocks: e,
                                ...t
                            }
                        },
                        * updateBlocksWithoutUndo(e, t = {}) {
                            return yield {
                                type: "UPDATE_BLOCKS_WITHOUT_UNDO",
                                blocks: e,
                                ...t
                            }
                        }
                    },
                    kn = {
                        editorMode: "visual",
                        isInserterOpened: !1,
                        isEditing: !1,
                        isListViewOpened: !1,
                        isReady: !1,
                        patterns: [],
                        currentPattern: null,
                        gutenbergTemplate: null,
                        ignoredContent: [],
                        deviceType: "Desktop",
                        canvasStyles: null,
                        isIframePreview: !1,
                        settings: {
                            preferencesKey: null,
                            persistenceKey: null,
                            blocks: {
                                allowBlocks: [],
                                disallowBlocks: []
                            },
                            disallowEmbed: [],
                            customStores: [],
                            toolbar: {
                                inserter: !0,
                                undo: !0,
                                inspector: !0,
                                navigation: !1,
                                documentInspector: !1,
                                selectorTool: !1
                            },
                            sidebar: {
                                inspector: !1,
                                inserter: !1
                            },
                            moreMenu: {
                                editor: !1,
                                fullscreen: !1,
                                preview: !1,
                                topToolbar: !1
                            },
                            linkMenu: [],
                            currentPattern: null,
                            patterns: [],
                            defaultPreferences: {},
                            allowApi: !1,
                            disableCanvasAnimations: !1
                        }
                    };

                function Tn(e, t, n) {
                    const o = [(0, I.serialize)((0, I.createBlock)("core/paragraph")), (0, I.serialize)((0, I.createBlock)("core/paragraph", {
                            className: ""
                        }))],
                        r = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                    return r && o.push((0, I.serialize)((0, I.parse)(r.content))), n && o.push((0, I.serialize)((0, I.synchronizeBlocksWithTemplate)([], n))), o
                }
                const Cn = (e = kn, t) => {
                        switch (t.type) {
                            case "SETUP_EDITOR": {
                                const {
                                    currentPattern: n,
                                    patterns: o
                                } = t.settings.iso;
                                return {
                                    ...e,
                                    patterns: o,
                                    currentPattern: n,
                                    ignoredContent: Tn(o, n, t.settings.editor.template),
                                    gutenbergTemplate: t.settings.editor.template,
                                    settings: {
                                        ...e.settings,
                                        ...t.settings.iso
                                    }
                                }
                            }
                            case "SET_CURRENT_PATTERN":
                                return {
                                    ...e, currentPattern: t.pattern, ignoredContent: Tn(e.patterns, t.pattern, e.gutenbergTemplate)
                                };
                            case "SET_EDITOR_MODE":
                                return {
                                    ...e, editorMode: t.editorMode
                                };
                            case "SET_INSERTER_OPEN":
                                return {
                                    ...e, isInserterOpened: t.isOpen, isInspectorOpened: !1, isListViewOpened: !1
                                };
                            case "SET_INSPECTOR_OPEN":
                                return {
                                    ...e, isInspectorOpened: t.isOpen, isListViewOpened: !1
                                };
                            case "SET_LISTVIEW_OPEN":
                                return {
                                    ...e, isInserterOpened: !1, isInspectorOpened: !1, isListViewOpened: t.isOpen
                                };
                            case "SET_EDITING":
                                return {
                                    ...e, isEditing: t.isEditing
                                };
                            case "SET_EDITOR_READY":
                                return {
                                    ...e, isReady: t.isReady
                                };
                            case "SET_DEVICE_TYPE":
                                return {
                                    ...e, deviceType: t.deviceType
                                };
                            case "SET_CANVAS_STYLES":
                                return {
                                    ...e, canvasStyles: t.canvasStyles
                                };
                            case "SET_IFRAME_PREVIEW":
                                return {
                                    ...e, isIframePreview: t.isIframePreview
                                }
                        }
                        return e
                    },
                    xn = {
                        setReady: e => ({
                            type: "SET_EDITOR_READY",
                            isReady: e
                        }),
                        setEditorMode: e => ({
                            type: "SET_EDITOR_MODE",
                            editorMode: e
                        }),
                        setupEditor: e => ({
                            type: "SETUP_EDITOR",
                            settings: e
                        }),
                        setCurrentPattern: e => ({
                            type: "SET_CURRENT_PATTERN",
                            pattern: e
                        }),
                        setIsInserterOpened: e => ({
                            type: "SET_INSERTER_OPEN",
                            isOpen: e
                        }),
                        setDeviceType: e => ({
                            type: "SET_DEVICE_TYPE",
                            deviceType: e
                        }),
                        setCanvasStyles: e => ({
                            type: "SET_CANVAS_STYLES",
                            canvasStyles: e
                        }),
                        setIsIframePreview: e => ({
                            type: "SET_IFRAME_PREVIEW",
                            isIframePreview: e
                        }),
                        setEditing: e => ({
                            type: "SET_EDITING",
                            isEditing: e
                        }),
                        * openGeneralSidebar(e) {
                            yield v.controls.dispatch(oe, "enableComplementaryArea", "isolated/editor", e)
                        },
                        * closeGeneralSidebar() {
                            yield v.controls.dispatch(oe, "disableComplementaryArea", "isolated/editor")
                        },
                        setIsListViewOpened: e => ({
                            type: "SET_LISTVIEW_OPEN",
                            isOpen: e
                        })
                    },
                    In = xn,
                    On = (e, t) => {
                        if ("TOGGLE_FEATURE" === t.type) {
                            const {
                                preferencesKey: n,
                                ...o
                            } = e, r = {
                                ...o,
                                [t.feature]: !e[t.feature] || !e[t.feature]
                            };
                            return n && window.localStorage && localStorage.setItem(n, JSON.stringify(r)), {
                                preferencesKey: n,
                                ...r
                            }
                        }
                        return e
                    },
                    An = {
                        toggleFeature: e => ({
                            type: "TOGGLE_FEATURE",
                            feature: e
                        })
                    },
                    Bn = {},
                    Ln = (e = Bn, t) => "TOGGLE_OPTION" === t.type ? {
                        ...e,
                        [t.option]: !e[t.option] || !e[t.option]
                    } : e,
                    Pn = {
                        toggleOption: e => ({
                            type: "TOGGLE_OPTION",
                            option: e
                        })
                    };

                function Mn(e) {
                    return e.editor.editorMode
                }

                function Rn(e) {
                    return e.editor.settings
                }

                function Nn(e) {
                    return e.editor.isReady
                }

                function Fn(e) {
                    return e.editor.currentPattern
                }

                function Dn(e) {
                    const {
                        currentPattern: t,
                        patterns: n
                    } = e.editor;
                    if (t && n)
                        for (let e = 0; e < n.length; e++)
                            if (n[e].name === t) return n[e];
                    return null
                }

                function Vn(e) {
                    return e.editor.ignoredContent
                }

                function Un(e, t) {
                    const {
                        patterns: n = []
                    } = e.editor;
                    let o = n.find((e => e.name === t));
                    return o || (o = n.find((e => e.name.replace("p2/", "") === t)), o || null)
                }

                function zn(e) {
                    return e.editor.isInserterOpened
                }
                const Hn = (0, v.createRegistrySelector)((e => () => {
                    const t = e(oe).getActiveComplementaryArea("isolated/editor");
                    return (0, T.includes)(["edit-post/document", "edit-post/block"], t)
                }));

                function Wn(e) {
                    return e.editor.isEditing
                }

                function Gn(e) {
                    return e.editor.patterns
                }

                function Kn(e) {
                    return e.editor.isListViewOpened
                }

                function jn(e) {
                    return e.editor.deviceType
                }

                function Yn(e) {
                    return e.editor.canvasStyles
                }

                function $n(e) {
                    return e.editor.isIframePreview || ["Tablet", "Mobile"].includes(e.editor.deviceType)
                }

                function qn(e) {
                    return e.blocks.present.blocks
                }

                function Jn(e) {
                    return e.blocks.present.selection
                }

                function Xn(e) {
                    return "visual" === Mn(e) && e.blocks.past.length > 0
                }

                function Zn(e) {
                    return "visual" === Mn(e) && e.blocks.future.length > 0
                }

                function Qn(e) {
                    return e.blocks.present.editCount
                }

                function eo(e, t, n = !1) {
                    return void 0 === e.preferences[t] ? n : e.preferences[t]
                }

                function to(e, t) {
                    return !!e.options[t] && e.options[t]
                }

                function* no(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCK_TO_STATIC",
                            clientId: e
                        }
                    }(e)
                }

                function* oo(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCKS_TO_REUSABLE",
                            clientIds: e
                        }
                    }(e)
                }

                function* ro(e) {
                    yield function(e) {
                        return {
                            type: "DELETE_REUSABLE_BLOCK",
                            id: e
                        }
                    }(e)
                }

                function io(e, t) {
                    return {
                        type: "SET_EDITING_REUSABLE_BLOCK",
                        clientId: e,
                        isEditing: t
                    }
                }

                function so(e, t) {
                    return e.isEditingReusableBlock[t]
                }
                const ao = {
                        actions: c,
                        controls: {
                            CONVERT_BLOCK_TO_STATIC: (0, v.createRegistryControl)((e => ({
                                clientId: t
                            }) => {
                                const n = e.select("core/block-editor").getBlock(t),
                                    o = e.select("core").getEditedEntityRecord("postType", "wp_block", n.attributes.ref),
                                    r = (0, I.parse)(o.content);
                                e.dispatch("core/block-editor").replaceBlocks(n.clientId, r)
                            })),
                            CONVERT_BLOCKS_TO_REUSABLE: (0, v.createRegistryControl)((e => async function({
                                clientIds: t
                            }) {
                                const n = {
                                        title: (0, B.__)("Untitled Reusable Block"),
                                        content: (0, I.serialize)(e.select("core/block-editor").getBlocksByClientId(t)),
                                        status: "publish"
                                    },
                                    o = await e.dispatch("core").saveEntityRecord("postType", "wp_block", n),
                                    r = (0, I.createBlock)("core/block", {
                                        ref: o.id
                                    });
                                e.dispatch("core/block-editor").replaceBlocks(t, r), e.dispatch(reusableBlocksStore).__experimentalSetEditingReusableBlock(r.clientId, !0)
                            })),
                            DELETE_REUSABLE_BLOCK: (0, v.createRegistryControl)((e => async function({
                                id: t
                            }) {
                                if (!e.select("core").getEditedEntityRecord("postType", "wp_block", t)) return;
                                const n = e.select("core/block-editor").getBlocks().filter((e => (0, I.isReusableBlock)(e) && e.attributes.ref === t)).map((e => e.clientId));
                                n.length && e.dispatch("core/block-editor").removeBlocks(n), await e.dispatch("core").deleteEntityRecord("postType", "wp_block", t)
                            }))
                        },
                        reducer: (0, v.combineReducers)({
                            isEditingReusableBlock: function(e = {}, t) {
                                return "SET_EDITING_REUSABLE_BLOCK" === t?.type ? {
                                    ...e,
                                    [t.clientId]: t.isEditing
                                } : e
                            }
                        }),
                        selectors: d
                    },
                    lo = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    co = (e, t) => ({
                        registry: n,
                        dispatch: o
                    }) => {
                        t && (n.select(F.store).get(e, "isComplementaryAreaVisible") || n.dispatch(F.store).set(e, "isComplementaryAreaVisible", !0), o({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    uo = e => ({
                        registry: t
                    }) => {
                        t.select(F.store).get(e, "isComplementaryAreaVisible") && t.dispatch(F.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    po = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(F.store).get(e, "pinnedItems");
                        !0 !== o?.[t] && n.dispatch(F.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !0
                        })
                    },
                    mo = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(F.store).get(e, "pinnedItems");
                        n.dispatch(F.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !1
                        })
                    };

                function fo(e, t) {
                    return function({
                        registry: n
                    }) {
                        U()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(F.store).toggle(e, t)
                    }
                }

                function ho(e, t, n) {
                    return function({
                        registry: o
                    }) {
                        U()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), o.dispatch(F.store).set(e, t, !!n)
                    }
                }

                function go(e, t) {
                    return function({
                        registry: n
                    }) {
                        U()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(F.store).setDefaults(e, t)
                    }
                }
                const bo = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(F.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== o) return o ? t?.complementaryAreas?.[n] : null
                    })),
                    Eo = (0, v.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(F.store).get(n, "pinnedItems");
                        return null === (r = i?.[o]) || void 0 === r || r
                    })),
                    yo = (0, v.createRegistrySelector)((e => (t, n, o) => (U()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(F.store).get(n, o)))),
                    vo = {
                        reducer: (0, v.combineReducers)({
                            complementaryAreas: function(e = {}, t) {
                                switch (t.type) {
                                    case "SET_DEFAULT_COMPLEMENTARY_AREA": {
                                        const {
                                            scope: n,
                                            area: o
                                        } = t;
                                        return e[n] ? e : {
                                            ...e,
                                            [n]: o
                                        }
                                    }
                                    case "ENABLE_COMPLEMENTARY_AREA": {
                                        const {
                                            scope: n,
                                            area: o
                                        } = t;
                                        return {
                                            ...e,
                                            [n]: o
                                        }
                                    }
                                }
                                return e
                            }
                        }),
                        actions: u,
                        selectors: p
                    };
                let _o = [];
                const wo = (0, k.createHigherOrderComponent)((e => (0, v.withRegistry)((t => {
                        const {
                            registry: n,
                            settings: o,
                            ...r
                        } = t, c = function(e) {
                            var t, n, o, r, i, s, a, l, c, d, u, p, m, f, h, g, b, E, y, v;
                            const {
                                iso: _,
                                editor: w
                            } = e;
                            return {
                                iso: {
                                    preferencesKey: null !== (t = _?.preferencesKey) && void 0 !== t ? t : null,
                                    persistenceKey: null !== (n = _?.persistenceKey) && void 0 !== n ? n : null,
                                    disallowEmbed: null !== (o = _?.disallowEmbed) && void 0 !== o ? o : [],
                                    customStores: null !== (r = _?.customStores) && void 0 !== r ? r : [],
                                    blocks: {
                                        allowBlocks: null !== (i = _?.blocks?.allowBlocks) && void 0 !== i ? i : [],
                                        disallowBlocks: null !== (s = _?.blocks?.disallowBlocks) && void 0 !== s ? s : []
                                    },
                                    toolbar: {
                                        inserter: !0,
                                        inspector: !1,
                                        navigation: !1,
                                        documentInspector: !1,
                                        undo: !0,
                                        selectorTool: !1,
                                        ...null !== (a = _?.toolbar) && void 0 !== a ? a : {}
                                    },
                                    header: null === (l = _?.header) || void 0 === l || l,
                                    sidebar: {
                                        inserter: !1,
                                        inspector: !1,
                                        customComponent: null,
                                        ...null !== (c = _?.sidebar) && void 0 !== c ? c : {}
                                    },
                                    footer: null !== (d = _?.footer) && void 0 !== d && d,
                                    moreMenu: (S = _?.moreMenu, k = {
                                        editor: !1,
                                        fullscreen: !1,
                                        preview: !1,
                                        topToolbar: !1,
                                        ...null !== (u = _?.moreMenu) && void 0 !== u ? u : {}
                                    }, !1 !== S && k),
                                    linkMenu: null !== (p = _?.linkMenu) && void 0 !== p ? p : [],
                                    defaultPreferences: {
                                        ...null !== (m = _?.defaultPreferences) && void 0 !== m ? m : {}
                                    },
                                    allowApi: null !== (f = _?.allowApi) && void 0 !== f && f,
                                    disableCanvasAnimations: null !== (h = _?.disableCanvasAnimations) && void 0 !== h && h,
                                    currentPattern: null !== (g = _?.currentPattern) && void 0 !== g ? g : null,
                                    patterns: null !== (b = _?.patterns) && void 0 !== b ? b : []
                                },
                                editor: {
                                    alignWide: !0,
                                    disableCustomColors: !1,
                                    disableCustomFontSizes: !1,
                                    disablePostFormats: !0,
                                    titlePlaceholder: (0, B.__)("Add title"),
                                    isRTL: !1,
                                    autosaveInterval: 60,
                                    maxUploadFileSize: 0,
                                    allowedMimeTypes: [],
                                    styles: [{
                                        baseURL: "",
                                        __unstableType: "theme",
                                        css: "body { font-family: 'Noto Serif' }"
                                    }],
                                    imageSizes: [],
                                    richEditingEnabled: !0,
                                    codeEditingEnabled: !1,
                                    allowedBlockTypes: !0,
                                    __experimentalCanUserUseUnfilteredHTML: !1,
                                    __experimentalBlockPatterns: [],
                                    reusableBlocks: [],
                                    fixedToolbar: !0,
                                    hasFixedToolbar: !0,
                                    hasInlineToolbar: !1,
                                    ...w,
                                    bodyPlaceholder: null !== (E = w?.bodyPlaceholder) && void 0 !== E ? E : (0, B.__)("Start writing or type / to choose a block"),
                                    availableLegacyWidgets: {},
                                    hasPermissionsToManageWidgets: !1,
                                    fetchLinkSuggestions: (null !== (y = w?.fetchLinkSuggestions) && void 0 !== y ? y : w?.__experimentalFetchLinkSuggestions) ? null !== (v = w?.fetchLinkSuggestions) && void 0 !== v ? v : w?.__experimentalFetchLinkSuggestions : () => []
                                }
                            };
                            var S, k
                        }(o), {
                            persistenceKey: d,
                            preferencesKey: u,
                            defaultPreferences: p,
                            customStores: h = []
                        } = c.iso || {}, [b, E] = (0, f.useState)(null);
                        return (0, f.useEffect)((() => {
                            const e = (0, v.createRegistry)({
                                "core/reusable-blocks": ao,
                                "core/interface": vo
                            }, n);
                            d && e.use(v.plugins.persistence, {
                                persistenceKey: d
                            });
                            const t = e.registerStore("isolated/editor", function(e, t) {
                                    return {
                                        reducer: (0, v.combineReducers)({
                                            blocks: wn,
                                            editor: Cn,
                                            preferences: On,
                                            options: Ln
                                        }),
                                        actions: {
                                            ...Sn,
                                            ...In,
                                            ...Pn,
                                            ...An
                                        },
                                        selectors: {
                                            ...s,
                                            ...i,
                                            ...a,
                                            ...l
                                        },
                                        persist: ["preferences"],
                                        initialState: {
                                            preferences: {
                                                preferencesKey: e,
                                                ...e && localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : t
                                            }
                                        }
                                    }
                                }(u, p)),
                                o = e.registerStore("core/block-editor", {
                                    ...O.storeConfig,
                                    persist: ["preferences"]
                                }),
                                r = e.registerStore("core/editor", {
                                    ...g.storeConfig,
                                    selectors: {
                                        ...g.storeConfig.selectors,
                                        ...(c = g.storeConfig.selectors, m = e.select, {
                                            getEditedPostAttribute: (e, t) => "content" === t ? (0, I.serialize)(m("core/block-editor").getBlocks()) : c.getEditedPostAttribute(e, t),
                                            getEditedPostContent: () => (0, I.serialize)(m("core/block-editor").getBlocks())
                                        })
                                    },
                                    persist: ["preferences"]
                                });
                            var c, m;
                            return h.map((t => {
                                    _o.push(e.registerStore(t.name, t.config))
                                })), _o.push(t), _o.push(o), _o.push(r), E(e),
                                function() {
                                    _o = _o.filter((e => e !== t))
                                }
                        }), [n]), b ? (0, m.createElement)(v.RegistryProvider, {
                            value: b
                        }, (0, m.createElement)(e, {
                            ...r,
                            settings: c
                        })) : null
                    }))), "withRegistryProvider"),
                    So = wo;

                function ko(e, t) {
                    return e && e.allowBlocks && e.allowBlocks.length > 0 ? e.allowBlocks : t.map((e => e.name))
                }

                function To(e, t, n, o) {
                    const r = (i = t.blocks) && i.disallowBlocks ? i.disallowBlocks : [];
                    var i;
                    return {
                        ...e,
                        fixedToolbar: o,
                        hasFixedToolbar: o,
                        allowedBlockTypes: ko(t.blocks, n).filter((e => -1 === r.indexOf(e)))
                    }
                }
                const Co = (0, k.compose)([(0, v.withSelect)((e => {
                        const {
                            getCurrentPattern: t
                        } = e("isolated/editor");
                        return {
                            currentPattern: t()
                        }
                    })), (0, v.withDispatch)((e => {
                        const {
                            updateBlocksWithoutUndo: t
                        } = e("isolated/editor");
                        return {
                            updateBlocksWithoutUndo: t
                        }
                    }))])((function(e) {
                        const {
                            currentPattern: t,
                            updateBlocksWithoutUndo: n
                        } = e, o = (0, f.useRef)(null);
                        return (0, f.useEffect)((() => {
                            null !== t && o.current !== t ? (o.current = t.name, setTimeout((() => {
                                n((0, I.parse)(t.content))
                            }), 0)) : o.current = t
                        }), [t]), null
                    })),
                    xo = function(e) {
                        const {
                            onSaveBlocks: t,
                            onSaveContent: n
                        } = e, o = (0, f.useRef)(!0), {
                            setReady: r
                        } = (0, v.useDispatch)("isolated/editor"), {
                            blocks: i,
                            ignoredContent: s
                        } = (0, v.useSelect)((e => ({
                            blocks: e("isolated/editor").getBlocks(),
                            ignoredContent: e("isolated/editor").getIgnoredContent()
                        })), []);

                        function a() {
                            t?.(i, s), n?.((0, I.serialize)(i))
                        }
                        return (0, f.useEffect)((() => {
                            i ? o.current ? (o.current = !1, r(!0), i && i.length > 1 && a()) : a() : r(!0)
                        }), [i]), null
                    },
                    Io = window.wp.apiFetch;
                var Oo = n.n(Io);

                function Ao({
                    undoManager: e
                } = {}) {
                    window.isoInitialisedBlocks || (window.isoInitialised || ((0, y.registerCoreBlocks)(), window.isoInitialised = !0), (0, v.use)(Gt, {}), Oo().use(Oo().createPreloadingMiddleware({
                        OPTIONS: {
                            "/wp/v2/blocks": {
                                body: []
                            },
                            "/wp/v2/templates": {
                                body: []
                            }
                        },
                        "/wp/v2/types?context=view": {
                            body: {
                                post: {
                                    capabilities: {
                                        edit_post: "edit_post"
                                    },
                                    description: "",
                                    hierarchical: !1,
                                    viewable: !0,
                                    name: "Posts",
                                    slug: "post",
                                    labels: {
                                        name: "Posts",
                                        singular_name: "Post"
                                    },
                                    supports: {
                                        title: !1,
                                        editor: !0,
                                        author: !1,
                                        thumbnail: !1,
                                        excerpt: !1,
                                        trackbacks: !1,
                                        "custom-fields": !1,
                                        comments: !1,
                                        revisions: !1,
                                        "post-formats": !1,
                                        "geo-location": !1
                                    },
                                    taxonomies: [],
                                    rest_base: "posts"
                                }
                            }
                        },
                        "/wp/v2/types?context=edit": {
                            body: {
                                post: {
                                    capabilities: {
                                        edit_post: "edit_post"
                                    },
                                    description: "",
                                    hierarchical: !1,
                                    viewable: !0,
                                    name: "Posts",
                                    slug: "post",
                                    labels: {
                                        name: "Posts",
                                        singular_name: "Post"
                                    },
                                    supports: {
                                        title: !1,
                                        editor: !0,
                                        author: !1,
                                        thumbnail: !1,
                                        excerpt: !1,
                                        trackbacks: !1,
                                        "custom-fields": !1,
                                        comments: !1,
                                        revisions: !1,
                                        "post-formats": !1,
                                        "geo-location": !1
                                    },
                                    taxonomies: [],
                                    rest_base: "posts"
                                }
                            }
                        },
                        "/wp/v2/posts/0?context=edit": {
                            body: {
                                id: 0,
                                type: "post"
                            }
                        },
                        "/wp/v2/posts?context=edit": {
                            body: {
                                id: 0,
                                type: "post"
                            }
                        },
                        "/wp/v2/templates": () => ({}),
                        "/wp/v2/types/post?context=edit": () => ({})
                    })), window.isoInitialisedBlocks = !0)
                }
                const Bo = So((function(e) {
                        const {
                            children: t,
                            onSaveContent: n,
                            onSaveBlocks: o,
                            __experimentalUndoManager: r,
                            __experimentalOnInput: i,
                            __experimentalOnChange: s,
                            __experimentalValue: a,
                            __experimentalOnSelection: l,
                            ...c
                        } = e;
                        Ao({
                            undoManager: r
                        });
                        const d = function(e) {
                                const {
                                    undo: t,
                                    setupEditor: n
                                } = (0, v.useDispatch)("isolated/editor"), {
                                    updateEditorSettings: o,
                                    setEditedPost: r
                                } = (0, v.useDispatch)("core/editor"), {
                                    updateSettings: i
                                } = (0, v.useDispatch)("core/block-editor"), {
                                    isEditing: s,
                                    topToolbar: a,
                                    currentSettings: l
                                } = (0, v.useSelect)((n => {
                                    const {
                                        isEditing: o,
                                        isFeatureActive: r
                                    } = n("isolated/editor"), {
                                        getBlockTypes: i
                                    } = n(I.store), s = i(), a = r("fixedToolbar", e?.editor.hasFixedToolbar);
                                    return {
                                        isEditing: o(),
                                        topToolbar: a,
                                        currentSettings: {
                                            ...e,
                                            editor: {
                                                ...To(e.editor, e.iso, s, void 0 !== e.iso?.defaultPreferences?.fixedToolbar ? e.iso?.defaultPreferences?.fixedToolbar : a),
                                                __experimentalReusableBlocks: [],
                                                __experimentalFetchReusableBlocks: !1,
                                                __experimentalUndo: t
                                            }
                                        }
                                    }
                                }), [e]);
                                return (0, f.useEffect)((() => {
                                    var e;
                                    void 0 === window.__editorAssets && (window.__editorAssets = {
                                        styles: "",
                                        scripts: ""
                                    }), n(l), i((e = l).editor), o(e.editor), r("post", 0)
                                }), []), (0, f.useEffect)((() => {
                                    s && i(l)
                                }), [s, a, l?.editor?.reusableBlocks]), e
                            }(e.settings),
                            u = (0, v.useSelect)((e => ({
                                start: e("core/block-editor").getSelectionStart(),
                                end: e("core/block-editor").getSelectionEnd()
                            })), []);
                        return (0, f.useEffect)((() => {
                            l?.(u)
                        }), [u]), (0, m.createElement)(f.StrictMode, null, (0, m.createElement)(xo, {
                            onSaveBlocks: o,
                            onSaveContent: n
                        }), (0, m.createElement)(Co, null), (0, m.createElement)(E.SlotFillProvider, null, (0, m.createElement)(jt, {
                            ...c,
                            onInput: i,
                            onChange: s,
                            blocks: a,
                            settings: d
                        }, t)))
                    })),
                    Lo = function({
                        onLoaded: e,
                        onLoading: t
                    }) {
                        const {
                            isEditorReady: n
                        } = (0, v.useSelect)((e => ({
                            isEditorReady: e("isolated/editor").isEditorReady()
                        })), []);
                        return (0, f.useEffect)((() => {
                            n ? e && e() : t && t()
                        }), [n]), null
                    },
                    Po = window.wp.domReady;
                var Mo;
                const Ro = (e, t) => {
                    if ("POST" === e.method && "/wp/v2/media" === e.path) {
                        const t = e.body;
                        t instanceof FormData && t.has("post") && "null" === t.get("post") && t.delete("post")
                    }
                    return t(e)
                };
                n.n(Po)()((() => {
                    Oo().use(Ro)
                }));
                const No = {
                    iso: {
                        moreMenu: !1
                    }
                };
                window.wp = {
                    ...null !== (Mo = window.wp) && void 0 !== Mo ? Mo : {},
                    attachEditor: function(e, t = {}) {
                        if ("textarea" !== e.type.toLowerCase()) return;
                        const n = document.createElement("div");
                        n.classList.add("editor"), e.parentNode.insertBefore(n, e.nextSibling), e.style.display = "none";
                        var o = {
                            ...No,
                            ...t
                        };
                        o?.iso?.noToolbar && n.classList.add("no-toolbar"), o?.editor?.enableUpload && (o.editor.mediaUpload = g.mediaUpload), o?.editor?.enableLibrary && (0, b.addFilter)("editor.MediaUpload", "acfe/media-upload", (() => h.MediaUpload)), o.iso.blocks.allowBlocks && o.iso.blocks.allowBlocks.length > 0 && (o.editor.allowedBlockTypes = o.iso.blocks.allowBlocks), (0, f.createRoot)(n).render((0, m.createElement)(Bo, {
                            settings: o,
                            onLoad: (t, n) => function(e, t, n) {
                                return -1 !== e.indexOf("\x3c!--") ? t(e) : n({
                                    HTML: e
                                })
                            }(e.value, t, n),
                            onSaveContent: t => function(e, t) {
                                t.value = e
                            }(t, e),
                            onError: () => document.location.reload(),
                            __experimentalOnInput: e => o?.iso.__experimentalOnInput?.(e),
                            __experimentalOnChange: e => o?.iso.__experimentalOnChange?.(e),
                            __experimentalOnSelection: e => o?.iso.__experimentalOnSelection?.(e),
                            className: o?.iso?.className
                        }, (0, m.createElement)(Lo, {
                            onLoaded: () => function(e) {
                                const t = e.closest(".iso-editor__loading");
                                t && t.classList.remove("iso-editor__loading")
                            }(e)
                        })))
                    },
                    detachEditor: function(e) {
                        const t = e.nextSibling;
                        t && t.classList.contains("editor") && ((0, f.unmountComponentAtNode)(t), e.style.display = null, t.parentNode.removeChild(t))
                    }
                }
            },
            283: e => {
                e.exports = function(e, t, n) {
                    return ((n = window.getComputedStyle) ? n(e) : e.currentStyle)[t.replace(/-(\w)/gi, (function(e, t) {
                        return t.toUpperCase()
                    }))]
                }
            },
            467: (e, t, n) => {
                var o = n(283);
                e.exports = function(e) {
                    var t = o(e, "line-height"),
                        n = parseFloat(t, 10);
                    if (t === n + "") {
                        var r = e.style.lineHeight;
                        e.style.lineHeight = t + "em", t = o(e, "line-height"), n = parseFloat(t, 10), r ? e.style.lineHeight = r : delete e.style.lineHeight
                    }
                    if (-1 !== t.indexOf("pt") ? (n *= 4, n /= 3) : -1 !== t.indexOf("mm") ? (n *= 96, n /= 25.4) : -1 !== t.indexOf("cm") ? (n *= 96, n /= 2.54) : -1 !== t.indexOf("in") ? n *= 96 : -1 !== t.indexOf("pc") && (n *= 16), n = Math.round(n), "normal" === t) {
                        var i = e.nodeName,
                            s = document.createElement(i);
                        s.innerHTML = "&nbsp;", "TEXTAREA" === i.toUpperCase() && s.setAttribute("rows", "1");
                        var a = o(e, "font-size");
                        s.style.fontSize = a, s.style.padding = "0px", s.style.border = "0px";
                        var l = document.body;
                        l.appendChild(s), n = s.offsetHeight, l.removeChild(s)
                    }
                    return n
                }
            },
            694: (e, t, n) => {
                "use strict";
                var o = n(925);

                function r() {}

                function i() {}
                i.resetWarningCache = r, e.exports = function() {
                    function e(e, t, n, r, i, s) {
                        if (s !== o) {
                            var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                            throw a.name = "Invariant Violation", a
                        }
                    }

                    function t() {
                        return e
                    }
                    e.isRequired = e;
                    var n = {
                        array: e,
                        bigint: e,
                        bool: e,
                        func: e,
                        number: e,
                        object: e,
                        string: e,
                        symbol: e,
                        any: e,
                        arrayOf: t,
                        element: e,
                        elementType: e,
                        instanceOf: t,
                        node: e,
                        objectOf: t,
                        oneOf: t,
                        oneOfType: t,
                        shape: t,
                        exact: t,
                        checkPropTypes: i,
                        resetWarningCache: r
                    };
                    return n.PropTypes = n, n
                }
            },
            556: (e, t, n) => {
                e.exports = n(694)()
            },
            925: e => {
                "use strict";
                e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
            },
            736: function(e, t, n) {
                "use strict";
                var o, r = this && this.__extends || (o = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                        },
                        function(e, t) {
                            function __() {
                                this.constructor = e
                            }
                            o(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
                        }),
                    i = this && this.__assign || Object.assign || function(e) {
                        for (var t, n = 1, o = arguments.length; n < o; n++)
                            for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        return e
                    },
                    s = this && this.__rest || function(e, t) {
                        var n = {};
                        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var r = 0;
                            for (o = Object.getOwnPropertySymbols(e); r < o.length; r++) t.indexOf(o[r]) < 0 && (n[o[r]] = e[o[r]])
                        }
                        return n
                    };
                t.__esModule = !0;
                var a = n(609),
                    l = n(556),
                    c = n(692),
                    d = n(467),
                    u = "autosize:resized",
                    p = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.state = {
                                lineHeight: null
                            }, t.textarea = null, t.onResize = function(e) {
                                t.props.onResize && t.props.onResize(e)
                            }, t.updateLineHeight = function() {
                                t.textarea && t.setState({
                                    lineHeight: d(t.textarea)
                                })
                            }, t.onChange = function(e) {
                                var n = t.props.onChange;
                                t.currentValue = e.currentTarget.value, n && n(e)
                            }, t
                        }
                        return r(t, e), t.prototype.componentDidMount = function() {
                            var e = this,
                                t = this.props,
                                n = t.maxRows,
                                o = t.async;
                            "number" == typeof n && this.updateLineHeight(), "number" == typeof n || o ? setTimeout((function() {
                                return e.textarea && c(e.textarea)
                            })) : this.textarea && c(this.textarea), this.textarea && this.textarea.addEventListener(u, this.onResize)
                        }, t.prototype.componentWillUnmount = function() {
                            this.textarea && (this.textarea.removeEventListener(u, this.onResize), c.destroy(this.textarea))
                        }, t.prototype.render = function() {
                            var e = this,
                                t = this.props,
                                n = (t.onResize, t.maxRows),
                                o = (t.onChange, t.style),
                                r = (t.innerRef, t.children),
                                l = s(t, ["onResize", "maxRows", "onChange", "style", "innerRef", "children"]),
                                c = this.state.lineHeight,
                                d = n && c ? c * n : null;
                            return a.createElement("textarea", i({}, l, {
                                onChange: this.onChange,
                                style: d ? i({}, o, {
                                    maxHeight: d
                                }) : o,
                                ref: function(t) {
                                    e.textarea = t, "function" == typeof e.props.innerRef ? e.props.innerRef(t) : e.props.innerRef && (e.props.innerRef.current = t)
                                }
                            }), r)
                        }, t.prototype.componentDidUpdate = function() {
                            this.textarea && c.update(this.textarea)
                        }, t.defaultProps = {
                            rows: 1,
                            async: !1
                        }, t.propTypes = {
                            rows: l.number,
                            maxRows: l.number,
                            onResize: l.func,
                            innerRef: l.any,
                            async: l.bool
                        }, t
                    }(a.Component);
                t.TextareaAutosize = a.forwardRef((function(e, t) {
                    return a.createElement(p, i({}, e, {
                        innerRef: t
                    }))
                }))
            },
            766: (e, t, n) => {
                "use strict";
                var o = n(736);
                t.A = o.TextareaAutosize
            },
            609: e => {
                "use strict";
                e.exports = window.React
            },
            942: (e, t) => {
                var n;
                ! function() {
                    "use strict";
                    var o = {}.hasOwnProperty;

                    function r() {
                        for (var e = "", t = 0; t < arguments.length; t++) {
                            var n = arguments[t];
                            n && (e = s(e, i(n)))
                        }
                        return e
                    }

                    function i(e) {
                        if ("string" == typeof e || "number" == typeof e) return e;
                        if ("object" != typeof e) return "";
                        if (Array.isArray(e)) return r.apply(null, e);
                        if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) return e.toString();
                        var t = "";
                        for (var n in e) o.call(e, n) && e[n] && (t = s(t, n));
                        return t
                    }

                    function s(e, t) {
                        return t ? e ? e + " " + t : e + t : e
                    }
                    e.exports ? (r.default = r, e.exports = r) : void 0 === (n = function() {
                        return r
                    }.apply(t, [])) || (e.exports = n)
                }()
            }
        },
        n = {};

    function o(e) {
        var r = n[e];
        if (void 0 !== r) return r.exports;
        var i = n[e] = {
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, o), i.exports
    }
    o.m = t, e = [], o.O = (t, n, r, i) => {
        if (!n) {
            var s = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [n, r, i] = e[d], a = !0, l = 0; l < n.length; l++)(!1 & i || s >= i) && Object.keys(o.O).every((e => o.O[e](n[l]))) ? n.splice(l--, 1) : (a = !1, i < s && (s = i));
                if (a) {
                    e.splice(d--, 1);
                    var c = r();
                    void 0 !== c && (t = c)
                }
            }
            return t
        }
        i = i || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > i; d--) e[d] = e[d - 1];
        e[d] = [n, r, i]
    }, o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t
    }, o.d = (e, t) => {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        var e = {
            57: 0,
            350: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
                var r, i, [s, a, l] = n,
                    c = 0;
                if (s.some((t => 0 !== e[t]))) {
                    for (r in a) o.o(a, r) && (o.m[r] = a[r]);
                    if (l) var d = l(o)
                }
                for (t && t(n); c < s.length; c++) i = s[c], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
                return o.O(d)
            },
            n = globalThis.webpackChunkbuild_iso = globalThis.webpackChunkbuild_iso || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
    })();
    var r = o.O(void 0, [350], (() => o(366)));
    r = o.O(r)
})();