(() => {
    var e, t = {
            367: function(e, t) {
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
                                l = function(t) {
                                    window.removeEventListener("resize", s, !1), e.removeEventListener("input", u, !1), e.removeEventListener("keyup", u, !1), e.removeEventListener("autosize:destroy", l, !1), e.removeEventListener("autosize:update", u, !1), Object.keys(t).forEach((function(n) {
                                        e.style[n] = t[n]
                                    })), r.delete(e)
                                }.bind(e, {
                                    height: e.style.height,
                                    resize: e.style.resize,
                                    overflowY: e.style.overflowY,
                                    overflowX: e.style.overflowX,
                                    wordWrap: e.style.wordWrap
                                });
                            e.addEventListener("autosize:destroy", l, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", u, !1), window.addEventListener("resize", s, !1), e.addEventListener("input", u, !1), e.addEventListener("autosize:update", u, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", r.set(e, {
                                destroy: l,
                                update: u
                            }), "vertical" === (a = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === a.resize && (e.style.resize = "horizontal"), t = "content-box" === a.boxSizing ? -(parseFloat(a.paddingTop) + parseFloat(a.paddingBottom)) : parseFloat(a.borderTopWidth) + parseFloat(a.borderBottomWidth), isNaN(t) && (t = 0), u()
                        }
                        var a;

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

                    function l(e) {
                        var t = r.get(e);
                        t && t.destroy()
                    }

                    function a(e) {
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
                        return e && Array.prototype.forEach.call(e.length ? e : [e], l), e
                    }, c.update = function(e) {
                        return e && Array.prototype.forEach.call(e.length ? e : [e], a), e
                    }), t.default = c, e.exports = t.default
                }, void 0 === (o = n.apply(t, [e, t])) || (e.exports = o)
            },
            993: (e, t, n) => {
                "use strict";
                var o = {};
                n.r(o), n.d(o, {
                    closeModal: () => q,
                    disableComplementaryArea: () => W,
                    enableComplementaryArea: () => z,
                    openModal: () => Z,
                    pinItem: () => G,
                    setDefaultComplementaryArea: () => U,
                    setFeatureDefaults: () => Y,
                    setFeatureValue: () => $,
                    toggleFeature: () => j,
                    unpinItem: () => K
                });
                var r = {};
                n.r(r), n.d(r, {
                    getActiveComplementaryArea: () => J,
                    isComplementaryAreaLoading: () => X,
                    isFeatureActive: () => ee,
                    isItemPinned: () => Q,
                    isModalActive: () => te
                });
                var i = {};
                n.r(i), n.d(i, {
                    getCanvasStyles: () => zn,
                    getCurrentPattern: () => Mn,
                    getCurrentPatternName: () => Ln,
                    getEditorMode: () => In,
                    getEditorSettings: () => An,
                    getIgnoredContent: () => Rn,
                    getNamedPattern: () => Pn,
                    getPatterns: () => Vn,
                    getPreviewDeviceType: () => Un,
                    isEditing: () => Fn,
                    isEditorReady: () => Bn,
                    isEditorSidebarOpened: () => Dn,
                    isIframePreview: () => Wn,
                    isInserterOpened: () => Nn,
                    isListViewOpened: () => Hn
                });
                var s = {};
                n.r(s), n.d(s, {
                    getBlocks: () => Gn,
                    getEditCount: () => Yn,
                    getEditorSelection: () => Kn,
                    hasEditorRedo: () => $n,
                    hasEditorUndo: () => jn
                });
                var l = {};
                n.r(l), n.d(l, {
                    isFeatureActive: () => Zn
                });
                var a = {};
                n.r(a), n.d(a, {
                    isOptionActive: () => qn
                });
                var c = {};
                n.r(c), n.d(c, {
                    __experimentalConvertBlockToStatic: () => Jn,
                    __experimentalConvertBlocksToReusable: () => Xn,
                    __experimentalDeleteReusableBlock: () => Qn,
                    __experimentalSetEditingReusableBlock: () => eo
                });
                var d = {};
                n.r(d), n.d(d, {
                    __experimentalIsEditingReusableBlock: () => to
                });
                var u = {};
                n.r(u), n.d(u, {
                    disableComplementaryArea: () => io,
                    enableComplementaryArea: () => ro,
                    pinItem: () => so,
                    setDefaultComplementaryArea: () => oo,
                    setFeatureDefaults: () => uo,
                    setFeatureValue: () => co,
                    toggleFeature: () => ao,
                    unpinItem: () => lo
                });
                var p = {};
                n.r(p), n.d(p, {
                    getActiveComplementaryArea: () => po,
                    isFeatureActive: () => fo,
                    isItemPinned: () => mo
                });
                var m = n(196);
                const f = window.wp.element,
                    h = window.wp.mediaUtils,
                    g = window.wp.editor,
                    E = window.wp.hooks,
                    b = window.wp.components,
                    y = window.wp.blockLibrary,
                    v = window.wp.data,
                    _ = (window.wp.formatLibrary, window.wp.keyboardShortcuts);
                var w = n(967),
                    S = n.n(w);
                const k = window.wp.compose,
                    C = window.lodash,
                    T = ["button", "submit"],
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
                            (0, C.includes)(["mouseup", "touchend"], t) ? this.preventBlurCheck = !1: function(e) {
                                switch (e.nodeName) {
                                    case "A":
                                    case "BUTTON":
                                        return !0;
                                    case "INPUT":
                                        return (0, C.includes)(T, e.type)
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
                    O = window.wp.blocks,
                    I = window.wp.blockEditor,
                    A = window.wp.keycodes,
                    B = window.wp.i18n,
                    L = window.wp.primitives,
                    M = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
                    })),
                    R = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
                    })),
                    P = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        fillRule: "evenodd",
                        d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
                        clipRule: "evenodd"
                    })),
                    N = window.wp.viewport,
                    D = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
                    })),
                    F = window.wp.deprecated;
                var V = n.n(F);
                const H = window.wp.preferences,
                    U = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    z = (e, t) => ({
                        registry: n,
                        dispatch: o
                    }) => {
                        t && (n.select(H.store).get(e, "isComplementaryAreaVisible") || n.dispatch(H.store).set(e, "isComplementaryAreaVisible", !0), o({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    W = e => ({
                        registry: t
                    }) => {
                        t.select(H.store).get(e, "isComplementaryAreaVisible") && t.dispatch(H.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    G = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(H.store).get(e, "pinnedItems");
                        !0 !== o?.[t] && n.dispatch(H.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !0
                        })
                    },
                    K = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(H.store).get(e, "pinnedItems");
                        n.dispatch(H.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !1
                        })
                    };

                function j(e, t) {
                    return function({
                        registry: n
                    }) {
                        V()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(H.store).toggle(e, t)
                    }
                }

                function $(e, t, n) {
                    return function({
                        registry: o
                    }) {
                        V()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), o.dispatch(H.store).set(e, t, !!n)
                    }
                }

                function Y(e, t) {
                    return function({
                        registry: n
                    }) {
                        V()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(H.store).setDefaults(e, t)
                    }
                }

                function Z(e) {
                    return {
                        type: "OPEN_MODAL",
                        name: e
                    }
                }

                function q() {
                    return {
                        type: "CLOSE_MODAL"
                    }
                }
                const J = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(H.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== o) return !1 === o ? null : t?.complementaryAreas?.[n]
                    })),
                    X = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(H.store).get(n, "isComplementaryAreaVisible"),
                            r = t?.complementaryAreas?.[n];
                        return o && void 0 === r
                    })),
                    Q = (0, v.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(H.store).get(n, "pinnedItems");
                        return null === (r = i?.[o]) || void 0 === r || r
                    })),
                    ee = (0, v.createRegistrySelector)((e => (t, n, o) => (V()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(H.store).get(n, o))));

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
                        as: e = b.Button,
                        scope: t,
                        identifier: n,
                        icon: o,
                        selectedIcon: r,
                        name: i,
                        ...s
                    }) {
                        const l = e,
                            a = (0, v.useSelect)((e => e(oe).getActiveComplementaryArea(t) === n), [n, t]),
                            {
                                enableComplementaryArea: c,
                                disableComplementaryArea: d
                            } = (0, v.useDispatch)(oe);
                        return (0, m.createElement)(l, {
                            icon: r && a ? r : o,
                            "aria-controls": n.replace("/", ":"),
                            onClick: () => {
                                a ? d(t) : c(t, n)
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
                        }, e && (0, m.createElement)("span", {
                            className: "interface-complementary-area-header__small-title"
                        }, e), r), (0, m.createElement)("div", {
                            className: S()("components-panel__header", "interface-complementary-area-header", n),
                            tabIndex: -1
                        }, t, r))
                    },
                    le = () => {};

                function ae({
                    name: e,
                    as: t = b.Button,
                    onClick: n,
                    ...o
                }) {
                    return (0, m.createElement)(b.Fill, {
                        name: e
                    }, (({
                        onClick: e
                    }) => (0, m.createElement)(t, {
                        onClick: n || e ? (...t) => {
                            (n || le)(...t), (e || le)(...t)
                        } : void 0,
                        ...o
                    })))
                }
                ae.Slot = function({
                    name: e,
                    as: t = b.ButtonGroup,
                    fillProps: n = {},
                    bubblesVirtually: o,
                    ...r
                }) {
                    return (0, m.createElement)(b.Slot, {
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
                const ce = ae,
                    de = ({
                        __unstableExplicitMenuItem: e,
                        __unstableTarget: t,
                        ...n
                    }) => (0, m.createElement)(b.MenuItem, {
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
                        selectedIcon: M,
                        name: t,
                        scope: e,
                        ...o
                    })
                }

                function pe({
                    scope: e,
                    ...t
                }) {
                    return (0, m.createElement)(b.Fill, {
                        name: `PinnedItems/${e}`,
                        ...t
                    })
                }
                pe.Slot = function({
                    scope: e,
                    className: t,
                    ...n
                }) {
                    return (0, m.createElement)(b.Slot, {
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
                    return (0, m.createElement)(b.Fill, {
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
                    isPinnable: l = !0,
                    panelClassName: a,
                    scope: c,
                    name: d,
                    smallScreenTitle: u,
                    title: p,
                    toggleShortcut: h,
                    isActiveByDefault: g,
                    showIconLabels: E = !1
                }) {
                    const {
                        isLoading: y,
                        isActive: _,
                        isPinned: w,
                        activeArea: k,
                        isSmall: C,
                        isLarge: T
                    } = (0, v.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t,
                            isComplementaryAreaLoading: n,
                            isItemPinned: r
                        } = e(oe), i = t(c);
                        return {
                            isLoading: n(c),
                            isActive: i === o,
                            isPinned: r(c, o),
                            activeArea: i,
                            isSmall: e(N.store).isViewportMatch("< medium"),
                            isLarge: e(N.store).isViewportMatch("large")
                        }
                    }), [o, c]);
                    ! function(e, t, n, o, r) {
                        const i = (0, f.useRef)(!1),
                            s = (0, f.useRef)(!1),
                            {
                                enableComplementaryArea: l,
                                disableComplementaryArea: a
                            } = (0, v.useDispatch)(oe);
                        (0, f.useEffect)((() => {
                            o && r && !i.current ? (a(e), s.current = !0) : s.current && !r && i.current ? (s.current = !1, l(e, t)) : s.current && n && n !== t && (s.current = !1), r !== i.current && (i.current = r)
                        }), [o, r, e, t, n, a, l])
                    }(c, o, k, _, C);
                    const {
                        enableComplementaryArea: x,
                        disableComplementaryArea: O,
                        pinItem: I,
                        unpinItem: A
                    } = (0, v.useDispatch)(oe);
                    return (0, f.useEffect)((() => {
                        g && void 0 === k && !C ? x(c, o) : void 0 === k && C && O(c, o)
                    }), [k, g, c, o, C, x, O]), (0, m.createElement)(m.Fragment, null, l && (0, m.createElement)(me, {
                        scope: c
                    }, w && (0, m.createElement)(ie, {
                        scope: c,
                        identifier: o,
                        isPressed: _ && (!E || T),
                        "aria-expanded": _,
                        "aria-disabled": y,
                        label: p,
                        icon: E ? M : s,
                        showTooltip: !E,
                        variant: E ? "tertiary" : void 0
                    })), d && l && (0, m.createElement)(ue, {
                        target: d,
                        scope: c,
                        icon: s
                    }, p), _ && (0, m.createElement)(fe, {
                        className: S()("interface-complementary-area", t),
                        scope: c,
                        id: o.replace("/", ":")
                    }, (0, m.createElement)(se, {
                        className: i,
                        closeLabel: n,
                        onClose: () => O(c),
                        smallScreenTitle: u,
                        toggleButtonProps: {
                            label: n,
                            shortcut: h,
                            scope: c,
                            identifier: o
                        }
                    }, r || (0, m.createElement)(m.Fragment, null, (0, m.createElement)("strong", null, p), l && (0, m.createElement)(b.Button, {
                        className: "interface-complementary-area__pin-unpin-item",
                        icon: w ? R : P,
                        label: w ? (0, B.__)("Unpin from toolbar") : (0, B.__)("Pin to toolbar"),
                        onClick: () => (w ? A : I)(c, o),
                        isPressed: w,
                        "aria-expanded": w
                    }))), (0, m.createElement)(b.Panel, {
                        className: a
                    }, e)))
                }));
                he.Slot = function({
                    scope: e,
                    ...t
                }) {
                    return (0, m.createElement)(b.Slot, {
                        name: `ComplementaryArea/${e}`,
                        ...t
                    })
                };
                const ge = he,
                    Ee = ({
                        isActive: e
                    }) => ((0, f.useEffect)((() => {
                        let e = !1;
                        return document.body.classList.contains("sticky-menu") && (e = !0, document.body.classList.remove("sticky-menu")), () => {
                            e && document.body.classList.add("sticky-menu")
                        }
                    }), []), (0, f.useEffect)((() => (e ? document.body.classList.add("is-fullscreen-mode") : document.body.classList.remove("is-fullscreen-mode"), () => {
                        e && document.body.classList.remove("is-fullscreen-mode")
                    })), [e]), null);

                function be({
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
                        content: l,
                        contentProps: a,
                        actions: c,
                        labels: d,
                        className: u,
                        enableRegionNavigation: p = !0,
                        shortcuts: h
                    }, g) {
                        const E = (0, b.__unstableUseNavigateRegions)(h);
                        ! function(e) {
                            (0, f.useEffect)((() => {
                                const t = document && document.querySelector(`html:not(.${e})`);
                                if (t) return t.classList.toggle(e), () => {
                                    t.classList.toggle(e)
                                }
                            }), [e])
                        }("interface-interface-skeleton__html-container");
                        const y = {
                            /* translators: accessibility text for the top bar landmark region. */
                            header: (0, B.__)("Header"),
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
                            ...d
                        };
                        return (0, m.createElement)("div", {
                            ...p ? E : {},
                            ref: (0, k.useMergeRefs)([g, p ? E.ref : void 0]),
                            className: S()(u, "interface-interface-skeleton", E.className, !!t && "has-footer")
                        }, (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__editor"
                        }, !!n && (0, m.createElement)(be, {
                            as: b.__unstableMotion.div,
                            className: "interface-interface-skeleton__header",
                            "aria-label": y.header,
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
                        }, !!i && (0, m.createElement)(be, {
                            className: "interface-interface-skeleton__secondary-sidebar",
                            ariaLabel: y.secondarySidebar
                        }, i), !!s && (0, m.createElement)("div", {
                            className: "interface-interface-skeleton__notices"
                        }, s), (0, m.createElement)(be, {
                            className: "interface-interface-skeleton__content",
                            ariaLabel: y.body,
                            ...a
                        }, l), !!r && (0, m.createElement)(be, {
                            className: "interface-interface-skeleton__sidebar",
                            ariaLabel: y.sidebar
                        }, r), !!c && (0, m.createElement)(be, {
                            className: "interface-interface-skeleton__actions",
                            ariaLabel: y.actions
                        }, c))), !!t && (0, m.createElement)(be, {
                            className: "interface-interface-skeleton__footer",
                            ariaLabel: y.footer
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
                    we = ({
                        sidebarName: e,
                        documentInspector: t
                    }) => {
                        const {
                            openGeneralSidebar: n
                        } = (0, v.useDispatch)("isolated/editor"), {
                            documentLabel: o
                        } = (0, v.useSelect)((e => ({
                            // translators: Default label for the Document sidebar tab, not selected.
                            documentLabel: t && "string" == typeof t ? t : (0, B._x)("Document", "noun")
                        })), []), [r, i] = "edit-post/document" === e ?
                            // translators: ARIA label for the Document sidebar tab, selected. %s: Document label.
                            [(0, B.sprintf)((0, B.__)("%s (selected)"), o), "is-active"] : [o, ""], [s, l] = "edit-post/block" === e ?
                            // translators: ARIA label for the Block Settings Sidebar tab, selected.
                            [(0, B.__)("Block (selected)"), "is-active"] :
                            // translators: ARIA label for the Block Settings Sidebar tab, not selected.
                            [(0, B.__)("Block"), ""];
                        return (0, m.createElement)("ul", null, !!t && (0, m.createElement)("li", null, (0, m.createElement)(b.Button, {
                            onClick: () => n("edit-post/document"),
                            className: `edit-post-sidebar__panel-tab ${i}`,
                            "aria-label": r,
                            "data-label": o
                        }, o)), (0, m.createElement)("li", null, (0, m.createElement)(b.Button, {
                                onClick: () => n("edit-post/block"),
                                className: `edit-post-sidebar__panel-tab ${l}`,
                                "aria-label": s,
                                "data-label": (0, B.__)("Block")
                            },
                            // translators: Text label for the Block Settings Sidebar tab.
                            (0, B.__)("Block"))))
                    },
                    {
                        Fill: Se,
                        Slot: ke
                    } = (0, b.createSlotFill)("PluginDocumentSettingPanel"),
                    Ce = ({
                        children: e
                    }) => (0, m.createElement)(Se, null, e);
                Ce.Slot = function(e) {
                    return (0, m.createElement)(ke, null, (e => e || (0, m.createElement)("span", {
                        className: "block-editor-block-inspector__no-blocks"
                    }, (0, B.__)("Nothing to display"))))
                };
                const Te = Ce;

                function xe({
                    as: e = b.Button,
                    scope: t,
                    identifier: n,
                    icon: o,
                    selectedIcon: r,
                    name: i,
                    ...s
                }) {
                    const l = e,
                        a = (0, v.useSelect)((e => e(oe).getActiveComplementaryArea(t) === n), [n]),
                        {
                            enableComplementaryArea: c,
                            disableComplementaryArea: d
                        } = (0, v.useDispatch)(oe);
                    return (0, m.createElement)(l, {
                        icon: r && a ? r : o,
                        onClick: () => {
                            a ? d(t) : c(t, n)
                        },
                        ...s
                    })
                }
                const Oe = ({
                    smallScreenTitle: e,
                    children: t,
                    className: n,
                    toggleButtonProps: o
                }) => {
                    const r = (0, m.createElement)(xe, {
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

                function Ie({
                    scope: e,
                    children: t,
                    className: n
                }) {
                    return (0, m.createElement)(b.Fill, {
                        name: `ComplementaryArea/${e}`
                    }, (0, m.createElement)("div", {
                        className: n
                    }, t))
                }

                function Ae({
                    className: e,
                    children: t,
                    header: n,
                    headerClassName: o,
                    toggleShortcut: r,
                    closeLabel: i,
                    title: s,
                    identifier: l,
                    ...a
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
                    return d ? (0, m.createElement)(Ie, {
                        className: "interface-complementary-area",
                        scope: "isolated/editor"
                    }, (0, m.createElement)(Oe, {
                        className: o,
                        smallScreenTitle: c || (0, B.__)("(no title)"),
                        toggleButtonProps: {
                            label: i,
                            shortcut: r,
                            scope: "isolated/editor",
                            identifier: l
                        }
                    }, n), (0, m.createElement)(b.Panel, {
                        className: "edit-post-sidebar"
                    }, t)) : null
                }
                const Be = ({
                        documentInspector: e
                    }) => {
                        const {
                            sidebarName: t,
                            keyboardShortcut: n
                        } = (0, v.useSelect)((e => {
                            let t = e(oe).getActiveComplementaryArea("isolated/editor");
                            return ["edit-post/document", "edit-post/block"].includes(t) || (t = "edit-post/document", e(I.store).getBlockSelectionStart() && (t = "edit-post/block")), {
                                sidebarName: t,
                                keyboardShortcut: e(_.store).getShortcutRepresentation("core/edit-post/toggle-sidebar")
                            }
                        }), []);
                        return (0, m.createElement)(Ae, {
                            className: "iso-sidebar",
                            identifier: t,
                            header: (0, m.createElement)(we, {
                                sidebarName: t,
                                documentInspector: e
                            }),
                            closeLabel: (0, B.__)("Close settings"),
                            headerClassName: "edit-post-sidebar__panel-tabs"
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            title: (0, B.__)("Settings"),
                            toggleShortcut: n,
                            icon: _e,
                            isActiveByDefault: !1
                        }, "edit-post/document" === t && (0, m.createElement)(Te.Slot, null), "edit-post/block" === t && (0, m.createElement)(I.BlockInspector, null))
                    },
                    Le = window.wp.privateApis,
                    {
                        Fill: Me,
                        Slot: Re
                    } = (0, b.createSlotFill)("IsolatedEditorHeading"),
                    Pe = ({
                        children: e
                    }) => (0, m.createElement)(Me, null, e);
                Pe.Slot = function(e) {
                    return (0, m.createElement)(Re, null, (e => e))
                };
                const Ne = Pe,
                    {
                        Fill: De,
                        Slot: Fe
                    } = (0, b.createSlotFill)("IsolatedFooter"),
                    Ve = ({
                        children: e
                    }) => (0, m.createElement)(De, null, e);
                Ve.Slot = function(e) {
                    return (0, m.createElement)(Fe, null, (e => e))
                };
                const He = Ve,
                    {
                        lock: Ue,
                        unlock: ze
                    } = (0, Le.__dangerousOptInToUnstableAPIsOnlyForCoreModules)("I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.", "@wordpress/edit-post"),
                    {
                        LayoutStyle: We,
                        useLayoutClasses: Ge,
                        useLayoutStyles: Ke,
                        ExperimentalBlockCanvas: je
                    } = ze(I.privateApis);

                function $e(e) {
                    for (let t = 0; t < e.length; t++) {
                        if ("core/post-content" === e[t].name) return e[t].attributes;
                        if (e[t].innerBlocks.length) {
                            const n = $e(e[t].innerBlocks);
                            if (n) return n
                        }
                    }
                }

                function Ye(e) {
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
                        wrapperUniqueId: l,
                        isBlockBasedTheme: a,
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
                        } = e(O.store);
                        let s;
                        s = "wp_block" === o() ? "core/block" : "core/post-content";
                        const l = r();
                        return {
                            deviceType: "Desktop",
                            isWelcomeGuideVisible: t("welcomeGuide"),
                            isTemplateMode: !1,
                            postContentAttributes: r().postContentAttributes,
                            editedPostTemplate: void 0,
                            wrapperBlockName: s,
                            wrapperUniqueId: n(),
                            isBlockBasedTheme: l.__unstableIsBlockBasedTheme,
                            hasV3BlocksOnly: i().every((e => e.apiVersion >= 3))
                        }
                    }), []), {
                        isCleanNewPost: d
                    } = (0, v.useSelect)(g.store), {
                        themeHasDisabledLayoutStyles: u,
                        themeSupportsLayout: p
                    } = (0, v.useSelect)((e => {
                        const t = e(I.store).getSettings();
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
                    }, E = {
                        ...h,
                        borderRadius: "2px 2px 0 0",
                        border: "1px solid #ddd",
                        borderBottom: 0
                    }, y = (0, I.__experimentalUseResizeCanvas)(t, o), _ = (0, I.useSetting)("layout"), w = "is-" + t.toLowerCase() + "-preview";
                    let C, T = o ? E : h;
                    y && (T = y), y || o || (C = "40vh");
                    const x = (0, f.useRef)(),
                        A = (0, k.useMergeRefs)([x, (0, I.__unstableUseTypewriter)()]),
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
                            if (i?.blocks) return $e(i?.blocks);
                            const e = "string" == typeof i?.content ? i?.content : "";
                            return $e((0, O.parse)(e)) || {}
                        }), [i?.content, i?.blocks, r]),
                        M = (0, f.useMemo)((() => {
                            if (!i?.content && !i?.blocks) return !1;
                            if (i?.blocks) return Ye(i?.blocks);
                            const e = "string" == typeof i?.content ? i?.content : "";
                            return Ye((0, O.parse)(e)) || !1
                        }), [i?.content, i?.blocks]),
                        {
                            layout: R = {},
                            align: P = ""
                        } = L || {},
                        N = Ge(L, "core/post-content"),
                        D = S()({
                            "is-layout-flow": !p
                        }, p && N, P && `align${P}`),
                        F = Ke(L, "core/post-content", ".block-editor-block-list__layout.is-root-container"),
                        V = (0, f.useMemo)((() => R && ("constrained" === R?.type || R?.inherit || R?.contentSize || R?.wideSize) ? {
                            ..._,
                            ...R,
                            type: "constrained"
                        } : {
                            ..._,
                            ...R,
                            type: "default"
                        }), [R?.type, R?.inherit, R?.contentSize, R?.wideSize, _]),
                        H = r ? V : B,
                        U = "default" !== H?.type || M ? H : B,
                        z = (0, f.useRef)();
                    return (0, f.useEffect)((() => {
                        !n && d() && z?.current?.focus()
                    }), [n, d]), e = (0, f.useMemo)((() => [...e, {
                        css: ".edit-post-visual-editor__post-title-wrapper{margin-top:4rem}" + (C ? `body{padding-bottom:${C}}` : "")
                    }]), [e]), (0, m.createElement)(I.BlockTools, {
                        __unstableContentRef: x,
                        className: S()("edit-post-visual-editor", {
                            "is-template-mode": o,
                            "has-inline-canvas": !0
                        })
                    }, (0, m.createElement)(b.__unstableMotion.div, {
                        className: "edit-post-visual-editor__content-area",
                        animate: {
                            padding: o ? "48px 48px 0" : 0
                        }
                    }, (0, m.createElement)(b.__unstableMotion.div, {
                        animate: T,
                        initial: h,
                        className: w
                    }, (0, m.createElement)(je, {
                        shouldIframe: !1,
                        contentRef: A,
                        styles: e,
                        height: "100%"
                    }, p && !u && !o && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(We, {
                        selector: ".edit-post-visual-editor__post-title-wrapper",
                        layout: B
                    }), (0, m.createElement)(We, {
                        selector: ".block-editor-block-list__layout.is-root-container",
                        layout: U
                    }), P && (0, m.createElement)(We, {
                        css: ".is-root-container.alignwide { max-width: var(--wp--style--global--wide-size); margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignwide:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: var(--wp--style--global--wide-size);}\n\t\t.is-root-container.alignfull { max-width: none; margin-left: auto; margin-right: auto;}\n\t\t.is-root-container.alignfull:where(.is-layout-flow) > :not(.alignleft):not(.alignright) { max-width: none;}"
                    }), F && (0, m.createElement)(We, {
                        layout: V,
                        css: F
                    })), (0, m.createElement)(Ne.Slot, {
                        mode: "visual"
                    }), (0, m.createElement)(I.__experimentalRecursionProvider, {
                        blockName: s,
                        uniqueId: l
                    }, (0, m.createElement)(I.BlockList, {
                        className: o ? "wp-site-blocks" : `${D} wp-block-post-content`,
                        layout: H
                    })), (0, m.createElement)(He.Slot, {
                        mode: "visual"
                    })))))
                }
                var qe = n(42);
                class Je extends f.Component {
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
                        }, (0, B.__)("Type text or HTML")), (0, m.createElement)(qe.Z, {
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
                const Xe = (0, k.compose)([(0, v.withSelect)((e => {
                        const {
                            getBlocks: t
                        } = e("isolated/editor");
                        return {
                            value: (0, O.serialize)(t())
                        }
                    })), (0, v.withDispatch)((e => {
                        const {
                            updateBlocksWithoutUndo: t
                        } = e("isolated/editor");
                        return {
                            onChange(e) {
                                const n = (0, O.parse)(e);
                                t(n)
                            },
                            onPersist(e) {
                                const n = (0, O.parse)(e);
                                t(n)
                            }
                        }
                    })), k.withInstanceId])(Je),
                    Qe = function({}) {
                        return (0, m.createElement)("div", {
                            className: "edit-post-text-editor"
                        }, (0, m.createElement)("div", {
                            className: "edit-post-text-editor__body"
                        }, (0, m.createElement)(Ne.Slot, {
                            mode: "text"
                        }), (0, m.createElement)(Xe, null), (0, m.createElement)(He.Slot, {
                            mode: "text"
                        })))
                    },
                    et = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
                    })),
                    tt = (0, k.compose)([(0, v.withSelect)(((e, {
                        feature: t
                    }) => ({
                        isActive: e("isolated/editor").isFeatureActive(t)
                    }))), (0, v.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleFeature(t.feature), t.onClose()
                        }
                    }))), b.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: o,
                        messageActivated: r,
                        messageDeactivated: i,
                        speak: s
                    }) {
                        return (0, m.createElement)(b.MenuItem, {
                            icon: t && M,
                            isSelected: t,
                            onClick: (0, C.flow)(e, (() => {
                                s(t ? i || (0, B.__)("Feature deactivated") : r || (0, B.__)("Feature activated"))
                            })),
                            role: "menuitemcheckbox",
                            info: o
                        }, n)
                    })),
                    nt = (0, k.compose)([(0, v.withSelect)(((e, {
                        option: t
                    }) => ({
                        isActive: e("isolated/editor").isOptionActive(t)
                    }))), (0, v.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleOption(t.option), t.onClose()
                        }
                    }))), b.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: o
                    }) {
                        return (0, m.createElement)(b.MenuItem, {
                            icon: t && M,
                            isSelected: t,
                            onClick: e,
                            role: "menuitemcheckbox",
                            info: o
                        }, n)
                    })),
                    ot = function({
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
                        return o || n || r ? (0, m.createElement)(b.MenuGroup, {
                            label: (0, B._x)("View", "noun")
                        }, r && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(tt, {
                            feature: "fixedToolbar",
                            label: (0, B.__)("Top toolbar"),
                            info: (0, B.__)("Access all block and document tools in a single place."),
                            messageActivated: (0, B.__)("Top toolbar activated"),
                            messageDeactivated: (0, B.__)("Top toolbar deactivated"),
                            onClose: e
                        })), o && (0, m.createElement)(nt, {
                            option: "fullscreenMode",
                            label: (0, B.__)("Fullscreen"),
                            info: (0, B.__)("Show editor fullscreen."),
                            onClose: e
                        }), n && !i && (0, m.createElement)(nt, {
                            option: "preview",
                            label: (0, B.__)("Preview"),
                            info: (0, B.__)("Preview the content before posting."),
                            onClose: e
                        })) : null
                    },
                    rt = (0, k.compose)([(0, v.withSelect)((e => {
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
                        return o && !1 !== r?.iso?.moreMenu && r?.iso?.moreMenu?.editor ? (0, m.createElement)(b.MenuGroup, {
                            label: (0, B._x)("Editor", "noun")
                        }, (0, m.createElement)(b.MenuItem, {
                            icon: "visual" === t ? M : null,
                            isSelected: "visual" === t,
                            onClick: () => i("visual"),
                            role: "menuitemcheckbox"
                        }, (0, B.__)("Visual editor")), (0, m.createElement)(b.MenuItem, {
                            icon: "text" === t ? M : null,
                            isSelected: "text" === t,
                            onClick: () => i("text"),
                            role: "menuitemcheckbox"
                        }, (0, B.__)("Code editor"))) : null
                    })),
                    it = function({
                        settings: e
                    }) {
                        const {
                            linkMenu: t = []
                        } = e.iso || {};
                        return 0 === t.length ? null : (0, m.createElement)(b.MenuGroup, {
                            label: (0, B.__)("Links")
                        }, t.map((({
                            title: e,
                            url: t
                        }) => (0, m.createElement)(b.MenuItem, {
                            key: e
                        }, (0, m.createElement)(b.ExternalLink, {
                            href: t
                        }, e)))))
                    },
                    st = {
                        className: "edit-post-more-menu__content",
                        position: "bottom left"
                    },
                    lt = {
                        tooltipPosition: "bottom"
                    },
                    at = ({
                        settings: e,
                        onClick: t,
                        renderMoreMenu: n
                    }) => (0, m.createElement)(b.DropdownMenu, {
                        className: "edit-post-more-menu",
                        icon: et,
                        label: (0, B.__)("More tools & options"),
                        popoverProps: st,
                        toggleProps: {
                            ...lt,
                            onClick: t
                        }
                    }, (({
                        onClose: t
                    }) => (0, m.createElement)(m.Fragment, null, n && n(e, t), (0, m.createElement)(rt, {
                        onClose: t,
                        settings: e
                    }), (0, m.createElement)(ot, {
                        onClose: t,
                        settings: e
                    }), (0, m.createElement)(it, {
                        settings: e
                    })))),
                    ct = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"
                    })),
                    dt = (0, m.createElement)(L.SVG, {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, m.createElement)(L.Path, {
                        d: "M3 6h11v1.5H3V6Zm3.5 5.5h11V13h-11v-1.5ZM21 17H10v1.5h11V17Z"
                    })),
                    ut = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"
                    })),
                    pt = (0, f.forwardRef)((function(e, t) {
                        const n = (0, v.useSelect)((e => e("isolated/editor").hasEditorRedo()), []),
                            {
                                redo: o
                            } = (0, v.useDispatch)("isolated/editor");
                        return (0, m.createElement)(b.Button, {
                            ...e,
                            ref: t,
                            icon: ut,
                            label: (0, B.__)("Redo"),
                            shortcut: A.displayShortcut.primaryShift("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__redo"
                        })
                    })),
                    mt = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"
                    })),
                    ft = (0, f.forwardRef)((function(e, t) {
                        const n = (0, v.useSelect)((e => e("isolated/editor").hasEditorUndo()), []),
                            {
                                undo: o
                            } = (0, v.useDispatch)("isolated/editor");
                        return (0, m.createElement)(b.Button, {
                            ...e,
                            ref: t,
                            icon: mt,
                            label: (0, B.__)("Undo"),
                            shortcut: A.displayShortcut.primary("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__undo"
                        })
                    })),
                    ht = window.wp.dom;

                function gt() {
                    return (0, m.createElement)(b.SVG, {
                        width: "138",
                        height: "148",
                        viewBox: "0 0 138 148",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, m.createElement)(b.Rect, {
                        width: "138",
                        height: "148",
                        rx: "4",
                        fill: "#F0F6FC"
                    }), (0, m.createElement)(b.Line, {
                        x1: "44",
                        y1: "28",
                        x2: "24",
                        y2: "28",
                        stroke: "#DDDDDD"
                    }), (0, m.createElement)(b.Rect, {
                        x: "48",
                        y: "16",
                        width: "27",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, m.createElement)(b.Path, {
                        d: "M54.7585 32V23.2727H56.6037V26.8736H60.3494V23.2727H62.1903V32H60.3494V28.3949H56.6037V32H54.7585ZM67.4574 23.2727V32H65.6122V25.0241H65.5611L63.5625 26.277V24.6406L65.723 23.2727H67.4574Z",
                        fill: "black"
                    }), (0, m.createElement)(b.Line, {
                        x1: "55",
                        y1: "59",
                        x2: "24",
                        y2: "59",
                        stroke: "#DDDDDD"
                    }), (0, m.createElement)(b.Rect, {
                        x: "59",
                        y: "47",
                        width: "29",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, m.createElement)(b.Path, {
                        d: "M65.7585 63V54.2727H67.6037V57.8736H71.3494V54.2727H73.1903V63H71.3494V59.3949H67.6037V63H65.7585ZM74.6605 63V61.6705L77.767 58.794C78.0313 58.5384 78.2528 58.3082 78.4318 58.1037C78.6136 57.8991 78.7514 57.6989 78.8452 57.5028C78.9389 57.304 78.9858 57.0895 78.9858 56.8594C78.9858 56.6037 78.9276 56.3835 78.8111 56.1989C78.6946 56.0114 78.5355 55.8679 78.3338 55.7685C78.1321 55.6662 77.9034 55.6151 77.6477 55.6151C77.3807 55.6151 77.1477 55.669 76.9489 55.777C76.75 55.8849 76.5966 56.0398 76.4886 56.2415C76.3807 56.4432 76.3267 56.6832 76.3267 56.9616H74.5753C74.5753 56.3906 74.7045 55.8949 74.9631 55.4744C75.2216 55.054 75.5838 54.7287 76.0497 54.4986C76.5156 54.2685 77.0526 54.1534 77.6605 54.1534C78.2855 54.1534 78.8295 54.2642 79.2926 54.4858C79.7585 54.7045 80.1207 55.0085 80.3793 55.3977C80.6378 55.7869 80.767 56.233 80.767 56.7358C80.767 57.0653 80.7017 57.3906 80.571 57.7116C80.4432 58.0327 80.2145 58.3892 79.8849 58.7812C79.5554 59.1705 79.0909 59.6378 78.4915 60.1832L77.2173 61.4318V61.4915H80.8821V63H74.6605Z",
                        fill: "black"
                    }), (0, m.createElement)(b.Line, {
                        x1: "80",
                        y1: "90",
                        x2: "24",
                        y2: "90",
                        stroke: "#DDDDDD"
                    }), (0, m.createElement)(b.Rect, {
                        x: "84",
                        y: "78",
                        width: "30",
                        height: "23",
                        rx: "4",
                        fill: "#F0B849"
                    }), (0, m.createElement)(b.Path, {
                        d: "M90.7585 94V85.2727H92.6037V88.8736H96.3494V85.2727H98.1903V94H96.3494V90.3949H92.6037V94H90.7585ZM99.5284 92.4659V91.0128L103.172 85.2727H104.425V87.2841H103.683L101.386 90.919V90.9872H106.564V92.4659H99.5284ZM103.717 94V92.0227L103.751 91.3793V85.2727H105.482V94H103.717Z",
                        fill: "black"
                    }), (0, m.createElement)(b.Line, {
                        x1: "66",
                        y1: "121",
                        x2: "24",
                        y2: "121",
                        stroke: "#DDDDDD"
                    }), (0, m.createElement)(b.Rect, {
                        x: "70",
                        y: "109",
                        width: "29",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, m.createElement)(b.Path, {
                        d: "M76.7585 125V116.273H78.6037V119.874H82.3494V116.273H84.1903V125H82.3494V121.395H78.6037V125H76.7585ZM88.8864 125.119C88.25 125.119 87.6832 125.01 87.1861 124.791C86.6918 124.57 86.3011 124.266 86.0142 123.879C85.7301 123.49 85.5838 123.041 85.5753 122.533H87.4332C87.4446 122.746 87.5142 122.933 87.642 123.095C87.7727 123.254 87.946 123.378 88.1619 123.466C88.3778 123.554 88.6207 123.598 88.8906 123.598C89.1719 123.598 89.4205 123.548 89.6364 123.449C89.8523 123.349 90.0213 123.212 90.1435 123.036C90.2656 122.859 90.3267 122.656 90.3267 122.426C90.3267 122.193 90.2614 121.987 90.1307 121.808C90.0028 121.626 89.8182 121.484 89.5767 121.382C89.3381 121.28 89.054 121.229 88.7244 121.229H87.9105V119.874H88.7244C89.0028 119.874 89.2486 119.825 89.4616 119.729C89.6776 119.632 89.8452 119.499 89.9645 119.328C90.0838 119.155 90.1435 118.953 90.1435 118.723C90.1435 118.504 90.0909 118.312 89.9858 118.148C89.8835 117.98 89.7386 117.849 89.5511 117.756C89.3665 117.662 89.1506 117.615 88.9034 117.615C88.6534 117.615 88.4247 117.661 88.2173 117.751C88.0099 117.839 87.8438 117.966 87.7188 118.131C87.5938 118.295 87.527 118.489 87.5185 118.71H85.75C85.7585 118.207 85.902 117.764 86.1804 117.381C86.4588 116.997 86.8338 116.697 87.3054 116.482C87.7798 116.263 88.3153 116.153 88.9119 116.153C89.5142 116.153 90.0412 116.263 90.4929 116.482C90.9446 116.7 91.2955 116.996 91.5455 117.368C91.7983 117.737 91.9233 118.152 91.9205 118.612C91.9233 119.101 91.7713 119.509 91.4645 119.835C91.1605 120.162 90.7642 120.369 90.2756 120.457V120.526C90.9176 120.608 91.4063 120.831 91.7415 121.195C92.0795 121.555 92.2472 122.007 92.2443 122.55C92.2472 123.047 92.1037 123.489 91.8139 123.875C91.527 124.261 91.1307 124.565 90.625 124.787C90.1193 125.009 89.5398 125.119 88.8864 125.119Z",
                        fill: "black"
                    }))
                }

                function Et() {
                    const {
                        headingCount: e
                    } = (0, v.useSelect)((e => {
                        const {
                            getGlobalBlockCount: t
                        } = e(I.store);
                        return {
                            headingCount: t("core/heading")
                        }
                    }), []);
                    return (0, m.createElement)(m.Fragment, null, (0, m.createElement)("div", {
                        className: "edit-post-editor__list-view-overview"
                    }, (0, m.createElement)("div", null, (0, m.createElement)(b.__experimentalText, null, (0, B.__)("Characters:")), (0, m.createElement)(b.__experimentalText, null, (0, m.createElement)(g.CharacterCount, null))), (0, m.createElement)("div", null, (0, m.createElement)(b.__experimentalText, null, (0, B.__)("Words:")), (0, m.createElement)(g.WordCount, null)), (0, m.createElement)("div", null, (0, m.createElement)(b.__experimentalText, null, (0, B.__)("Time to read:")), (0, m.createElement)(g.TimeToRead, null))), e > 0 ? (0, m.createElement)(g.DocumentOutline, null) : (0, m.createElement)("div", {
                        className: "edit-post-editor__list-view-empty-headings"
                    }, (0, m.createElement)(gt, null), (0, m.createElement)("p", null, (0, B.__)("Navigate the structure of your document and address issues like empty or incorrect heading levels."))))
                }

                function bt({
                    canClose: e = !0
                }) {
                    const {
                        setIsListViewOpened: t
                    } = (0, v.useDispatch)("isolated/editor"), n = (0, k.useFocusOnMount)("firstElement"), o = (0, k.useFocusReturn)(), r = (0, k.useFocusReturn)(), [i, s] = (0, f.useState)("list-view"), l = (0, f.useRef)(), a = (0, f.useRef)(), c = (0, f.useRef)(), d = (0, f.useRef)();
                    return (0, _.useShortcut)("core/edit-post/toggle-list-view", (() => {
                        l.current.contains(l.current.ownerDocument.activeElement) ? t(!1) : function(e) {
                            if ("list-view" === e) {
                                const e = ht.focus.tabbable.find(d.current)[0];
                                (l.current.contains(e) ? e : a.current).focus()
                            } else c.current.focus()
                        }(i)
                    })), (0, m.createElement)("div", {
                        "aria-label": (0, B.__)("Document Overview"),
                        className: "edit-post-editor__document-overview-panel",
                        onKeyDown: function(e) {
                            e.keyCode !== A.ESCAPE || e.defaultPrevented || (e.preventDefault(), t(!1))
                        },
                        ref: l
                    }, (0, m.createElement)("div", {
                        className: "edit-post-editor__document-overview-panel-header components-panel__header edit-post-sidebar__panel-tabs",
                        ref: o
                    }, e && (0, m.createElement)(b.Button, {
                        icon: D,
                        label: (0, B.__)("Close Document Overview Sidebar"),
                        onClick: () => t(!1)
                    }), (0, m.createElement)("ul", null, (0, m.createElement)("li", null, (0, m.createElement)(b.Button, {
                        ref: a,
                        onClick: () => {
                            s("list-view")
                        },
                        className: S()("edit-post-sidebar__panel-tab", {
                            "is-active": "list-view" === i
                        }),
                        "aria-current": "list-view" === i
                    }, (0, B.__)("List View"))), (0, m.createElement)("li", null, (0, m.createElement)(b.Button, {
                        ref: c,
                        onClick: () => {
                            s("outline")
                        },
                        className: S()("edit-post-sidebar__panel-tab", {
                            "is-active": "outline" === i
                        }),
                        "aria-current": "outline" === i
                    }, (0, B.__)("Outline"))))), (0, m.createElement)("div", {
                        ref: (0, k.useMergeRefs)([r, n, d]),
                        className: "edit-post-editor__list-view-container"
                    }, "list-view" === i && (0, m.createElement)("div", {
                        className: "edit-post-editor__list-view-panel-content"
                    }, (0, m.createElement)(I.__experimentalListView, null)), "outline" === i && (0, m.createElement)(Et, null)))
                }
                const yt = (0, f.forwardRef)((function({
                        isDisabled: e,
                        ...t
                    }, n) {
                        const o = (0, v.useSelect)((e => !!e(I.store).getBlockCount()), []) && !e;
                        return (0, m.createElement)(b.Dropdown, {
                            contentClassName: "block-editor-block-navigation__popover",
                            position: "bottom right",
                            renderToggle: ({
                                isOpen: e,
                                onToggle: r
                            }) => (0, m.createElement)(b.Button, {
                                ...t,
                                ref: n,
                                icon: dt,
                                "aria-expanded": e,
                                "aria-haspopup": "true",
                                onClick: o ? r : void 0
                                    /* translators: button label text should, if possible, be under 16 characters. */
                                    ,
                                label: (0, B.__)("List view"),
                                className: "block-editor-block-navigation",
                                "aria-disabled": !o
                            }),
                            renderContent: () => (0, m.createElement)(bt, {
                                canClose: !1
                            })
                        })
                    })),
                    vt = e => {
                        e.preventDefault()
                    },
                    _t = function(e) {
                        const t = (0, f.useRef)(),
                            {
                                setIsInserterOpened: n,
                                setIsListViewOpened: o
                            } = (0, v.useDispatch)("isolated/editor"),
                            r = (0, k.useViewportMatch)("medium", "<"),
                            {
                                fixedToolbar: i,
                                isInserterEnabled: s,
                                isTextModeEnabled: l,
                                showIconLabels: a,
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
                                navigation: E,
                                undo: y,
                                selectorTool: w
                            } = e.settings.iso.toolbar,
                            S = e.settings?.iso?.sidebar?.inserter || !1,
                            C = !h || "Desktop" !== c || i ? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
                            (0, B.__)("Document and block tools") : /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
                            (0, B.__)("Document tools"),
                            T = (0, f.useCallback)((() => {
                                n(!d)
                            }), [d, n]),
                            x = (0, f.useCallback)((() => o(!u)), [o, u]);
                        return (0, m.createElement)(I.NavigableToolbar, {
                            className: "edit-post-header-toolbar",
                            "aria-label": C
                        }, (g || y || E || w) && (0, m.createElement)("div", {
                            className: "edit-post-header-toolbar__left"
                        }, g && (0, m.createElement)(b.ToolbarItem, {
                            ref: t,
                            as: b.Button,
                            className: "edit-post-header-toolbar__inserter-toggle",
                            isPressed: d,
                            onMouseDown: vt,
                            onClick: T,
                            disabled: !s,
                            isPrimary: !0,
                            icon: ct
                                /* translators: button label text should, if possible, be under 16
                                    characters. */
                                ,
                            label: (0, B._x)("Toggle block inserter", "Generic label for block inserter button"),
                            showTooltip: !a
                        }), d && !S && (0, m.createElement)(b.Popover, {
                            position: "bottom right",
                            onClose: () => n(!1),
                            anchor: t.current
                        }, (0, m.createElement)(I.__experimentalLibrary, {
                            showMostUsedBlocks: !1,
                            showInserterHelpPanel: !0,
                            onSelect: () => {
                                r && n(!1)
                            }
                        })), w && (0, m.createElement)(I.ToolSelector, null), y && (0, m.createElement)(b.ToolbarItem, {
                            as: ft,
                            showTooltip: !a,
                            variant: a ? "tertiary" : void 0
                        }), y && (0, m.createElement)(b.ToolbarItem, {
                            as: pt,
                            showTooltip: !a,
                            variant: a ? "tertiary" : void 0
                        }), E && !S && (0, m.createElement)(b.ToolbarItem, {
                            as: yt,
                            isDisabled: l
                        }), E && S && (0, m.createElement)(b.ToolbarItem, {
                            as: b.Button,
                            className: "edit-post-header-toolbar__list-view-toggle",
                            icon: dt,
                            disabled: l,
                            isPressed: u
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            label: (0, B.__)("List View"),
                            onClick: x,
                            shortcut: p,
                            showTooltip: !a
                        })))
                    },
                    wt = function({
                        button: e,
                        onToggle: t
                    }) {
                        return (0, m.createElement)(b.Popover, {
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
                        Fill: St,
                        Slot: kt
                    } = (0, b.createSlotFill)("IsolatedToolbar"),
                    Ct = ({
                        children: e
                    }) => (0, m.createElement)(St, null, e);
                Ct.Slot = function(e) {
                    return (0, m.createElement)(kt, null, (e => e))
                };
                const Tt = Ct,
                    xt = e => {
                        const t = (0, f.useRef)(null),
                            {
                                settings: n,
                                editorMode: o,
                                renderMoreMenu: r
                            } = e,
                            i = (0, k.useViewportMatch)("huge", ">="),
                            {
                                inspector: s
                            } = n.iso?.toolbar || {},
                            {
                                moreMenu: l
                            } = n.iso || {},
                            a = n?.iso?.sidebar?.inspector || !1,
                            {
                                openGeneralSidebar: c,
                                closeGeneralSidebar: d
                            } = (0, v.useDispatch)("isolated/editor"),
                            {
                                setIsInserterOpened: u
                            } = (0, v.useDispatch)("isolated/editor"),
                            {
                                isEditorSidebarOpened: p,
                                isBlockSelected: h,
                                hasBlockSelected: g,
                                isInserterOpened: E,
                                isEditing: y
                            } = (0, v.useSelect)((e => ({
                                isEditing: e("isolated/editor"),
                                isEditorSidebarOpened: e("isolated/editor").isEditorSidebarOpened(),
                                isBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                hasBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                isInserterOpened: e("isolated/editor").isInserterOpened()
                            })), []);

                        function _(e) {
                            e ? c(g ? "edit-post/block" : "edit-post/document") : d()
                        }
                        return (0, f.useEffect)((() => {
                            a || d()
                        }), []), (0, f.useEffect)((() => {
                            a || y || h || !p || d()
                        }), [y]), (0, f.useEffect)((() => {
                            p && !i && u(!1)
                        }), [p, i]), (0, f.useEffect)((() => {
                            !E || i && a || d()
                        }), [E, i]), (0, m.createElement)("div", {
                            className: "edit-post-editor-regions__header",
                            role: "region",
                            tabIndex: -1
                        }, (0, m.createElement)("div", {
                            className: "edit-post-header"
                        }, (0, m.createElement)("div", {
                            className: "edit-post-header__toolbar"
                        }, (0, m.createElement)(_t, {
                            settings: n
                        })), (0, m.createElement)("div", {
                            className: "edit-post-header__settings",
                            ref: t
                        }, (0, m.createElement)(Tt.Slot, null), s && (0, m.createElement)(b.Button, {
                            icon: _e,
                            label: (0, B.__)("Settings"),
                            onClick: () => _(!p),
                            isPressed: p,
                            "aria-expanded": p,
                            disabled: "text" === o
                        }), p && !a && (0, m.createElement)(wt, {
                            button: t,
                            onToggle: _
                        }), l && (0, m.createElement)(at, {
                            settings: n,
                            onClick: () => d(),
                            renderMoreMenu: r
                        }))))
                    },
                    Ot = (0, m.createElement)(L.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, m.createElement)(L.Path, {
                        d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
                    }));

                function It() {
                    const {
                        setIsInserterOpened: e
                    } = (0, v.useDispatch)("isolated/editor"), t = (0, k.useViewportMatch)("medium", "<"), n = t ? "div" : b.VisuallyHidden, [o, r] = (0, k.__experimentalUseDialog)({
                        onClose: () => e(!1),
                        focusOnMount: null
                    });
                    return (0, m.createElement)("div", {
                        ref: o,
                        ...r,
                        className: "edit-post-editor__inserter-panel"
                    }, (0, m.createElement)(n, {
                        className: "edit-post-editor__inserter-panel-header"
                    }, (0, m.createElement)(b.Button, {
                        icon: Ot,
                        onClick: () => e(!1)
                    })), (0, m.createElement)("div", {
                        className: "edit-post-editor__inserter-panel-content"
                    }, (0, m.createElement)(I.__experimentalLibrary, {
                        showMostUsedBlocks: !1,
                        showInserterHelpPanel: !0,
                        shouldFocusBlock: t
                    })))
                }
                const At = ({
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
                        }, n && !t && "visual" === e && (0, m.createElement)(I.BlockBreadcrumb, {
                            rootLabelText: o
                        }), (0, m.createElement)(He.Slot, null))
                    },
                    {
                        Fill: Bt,
                        Slot: Lt
                    } = (0, b.createSlotFill)("IsolatedFooter"),
                    Mt = ({
                        children: e
                    }) => (0, m.createElement)(Bt, null, e);
                Mt.Slot = function() {
                    return (0, m.createElement)(Lt, null, (e => e))
                };
                const Rt = Mt,
                    Pt = {
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
                    Nt = (0, v.withDispatch)((e => {
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
                            undo: l,
                            redo: a,
                            settings: c,
                            renderMoreMenu: d
                        } = e, u = (0, k.useViewportMatch)("medium", "<"), p = c?.iso?.sidebar?.inspector || !1, h = c?.iso?.sidebar?.inserter || !1, E = null === (t = c?.iso?.header) || void 0 === t || t, y = c?.iso?.footer || !1, {
                            sidebarIsOpened: w,
                            fixedToolbar: C,
                            isInserterOpened: T,
                            isListViewOpened: x,
                            showIconLabels: O,
                            isFullscreenActive: B,
                            previousShortcut: L,
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
                            "is-sidebar-opened": w,
                            "is-inserter-opened": T,
                            "has-fixed-toolbar": C,
                            "show-icon-labels": O
                        });
                        (0, f.useEffect)((() => {
                            const e = document.querySelector("html");
                            return B ? e.classList.add("is-fullscreen-mode") : e.classList.remove("is-fullscreen-mode"), () => {
                                e && e.classList.remove("is-fullscreen-mode")
                            }
                        }), [B]);
                        const P = E ? (0, m.createElement)(xt, {
                                editorMode: i,
                                settings: c,
                                renderMoreMenu: d
                            }) : null,
                            N = null !== (n = c?.iso?.sidebar?.customComponent) && void 0 !== n ? n : Be;
                        return (0, m.createElement)(m.Fragment, null, (0, m.createElement)(N, {
                            documentInspector: null !== (o = c?.iso?.toolbar?.documentInspector) && void 0 !== o && o
                        }), (0, m.createElement)(Ee, {
                            isActive: B
                        }), (0, m.createElement)(ve, {
                            className: R,
                            labels: Pt,
                            header: P,
                            secondarySidebar: h ? "visual" === i && T ? (0, m.createElement)(It, null) : "visual" === i && x ? (0, m.createElement)(bt, null) : null : null,
                            sidebar: (!u || w) && p && (0, m.createElement)(ge.Slot, {
                                scope: "isolated/editor"
                            }),
                            notices: (0, m.createElement)(g.EditorSnackbars, null),
                            content: (0, m.createElement)(m.Fragment, null, (0, m.createElement)(g.EditorNotices, null), r && (0, m.createElement)(m.Fragment, null, (0, m.createElement)(I.BlockEditorKeyboardShortcuts, null), (0, m.createElement)(I.BlockEditorKeyboardShortcuts.Register, null)), (0, m.createElement)(b.KeyboardShortcuts, {
                                bindGlobal: !1,
                                shortcuts: {
                                    [A.rawShortcut.primary("z")]: l,
                                    [A.rawShortcut.primaryShift("z")]: a
                                }
                            }, "visual" === i && (0, m.createElement)(Ze, {
                                styles: []
                            }), "text" === i && (0, m.createElement)(Qe, null)), s),
                            footer: y && (0, m.createElement)(At, {
                                editorMode: i
                            }),
                            actions: (0, m.createElement)(Rt.Slot, null),
                            shortcuts: {
                                previous: L,
                                next: M
                            }
                        }))
                    })),
                    Dt = (0, k.compose)([(0, v.withSelect)(((e, t) => {
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
                            children: l,
                            settings: a,
                            renderMoreMenu: c,
                            onLoad: d
                        } = e;
                        return (0, f.useEffect)((() => {
                            (async () => {
                                const e = await async function(e, t) {
                                    var n;
                                    return (!(n = t) || "object" != typeof n && "function" != typeof n || "function" != typeof n.then ? new Promise((e => {
                                        e(t ? t(O.parse, O.rawHandler) : [])
                                    })) : t).then((t => function(e, t, n, o) {
                                        if (void 0 === e) return o;
                                        if (o && o.length > 0) return o;
                                        if (t) {
                                            const n = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                                            if (n) return (0, O.parse)(n.content)
                                        }
                                        return n ? (0, O.synchronizeBlocksWithTemplate)(o, n) : []
                                    }(e.iso.patterns, e.iso.currentPattern, e.editor.template, t)))
                                }(a, d);
                                e.length > 0 && (!t || 0 === t.length) && n(e, {
                                    isInitialContent: !0
                                })
                            })()
                        }), []), (0, m.createElement)(I.BlockEditorProvider, {
                            value: t || [],
                            onInput: n,
                            onChange: o,
                            useSubRegistry: !1,
                            selection: r,
                            settings: a.editor
                        }, (0, m.createElement)(Nt, {
                            isEditing: i,
                            editorMode: s,
                            settings: a,
                            renderMoreMenu: c
                        }, l), (0, m.createElement)(b.Popover.Slot, null))
                    }));

                function Ft(e, t) {
                    const n = ["core/block-editor", "core/editor"];
                    return {
                        dispatch: t => null === Ft.targetDispatch || -1 === n.indexOf(t) ? e.dispatch(t) : Ft.targetDispatch(t),
                        select: t => null === Ft.targetSelect || -1 === n.indexOf(t) ? e.select(t) : Ft.targetSelect(t)
                    }
                }
                Ft.targetSelect = null, Ft.targetDispatch = null, Ft.setEditor = function(e, t) {
                    this.targetSelect = e, this.targetDispatch = t
                }, Ft.resetEditor = function() {
                    this.targetSelect = null, this.targetDispatch = null
                };
                const Vt = Ft,
                    Ht = (0, k.compose)([(0, v.withSelect)((e => {
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
                            Vt.resetEditor(), t && Vt.setEditor(n, e)
                        }
                    })))])((function({
                        isEditing: e,
                        hotSwap: t
                    }) {
                        return (0, f.useEffect)((() => {
                            t(e)
                        }), [e]), null
                    })),
                    Ut = (0, k.compose)([(0, v.withSelect)(((e, {
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
                            onInput: l,
                            onChange: a,
                            blocks: c
                        } = e, {
                            isEditorReady: d,
                            editorMode: u,
                            isEditing: p,
                            setEditing: f,
                            fixedToolbar: h,
                            isPreview: E
                        } = e, [b, {
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
                            "is-preview-mode": E
                        });
                        return (0, m.createElement)("div", {
                            className: v
                        }, (0, m.createElement)(g.ErrorBoundary, {
                            onError: r
                        }, (0, m.createElement)(Ht, null), b, (0, m.createElement)(x, {
                            onOutside: () => f(!1),
                            onFocus: () => !p && f(!0)
                        }, (0, m.createElement)(Dt, {
                            blocks: c,
                            settings: n,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: l,
                            onChange: a
                        }, t))))
                    })),
                    zt = "@@redux-undo/UNDO",
                    Wt = "@@redux-undo/REDO",
                    Gt = "@@redux-undo/JUMP_TO_FUTURE",
                    Kt = "@@redux-undo/JUMP_TO_PAST",
                    jt = "@@redux-undo/JUMP",
                    $t = "@@redux-undo/CLEAR_HISTORY",
                    Yt = () => ({
                        type: zt
                    }),
                    Zt = () => ({
                        type: Wt
                    });

                function qt(e, t = []) {
                    return Array.isArray(e) ? e : "string" == typeof e ? [e] : t
                }

                function Jt(e, t, n, o = null) {
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
                let Xt, Qt;
                const en = "#9E9E9E",
                    tn = "#03A9F4",
                    nn = "#4CAF50";

                function on(e, t, n) {
                    return [`%c${e}`, `color: ${t}; font-weight: bold`, n]
                }

                function rn(e) {
                    Xt && (console.group ? Qt.next = on("next history", nn, e) : Qt.next = ["next history", e], function() {
                        const {
                            header: e,
                            prev: t,
                            next: n,
                            action: o,
                            msgs: r
                        } = Qt;
                        console.group ? (console.groupCollapsed(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r), console.groupEnd()) : (console.log(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r))
                    }())
                }

                function sn(...e) {
                    Xt && (Qt.msgs = Qt.msgs.concat([...e, "\n"]))
                }

                function ln(e, t) {
                    const n = Jt([], e, []);
                    return t && (n._latestUnfiltered = null), n
                }

                function an(e, t) {
                    if (t < 0 || t >= e.future.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e;
                    return Jt([...n, r, ...o.slice(0, t)], o[t], o.slice(t + 1))
                }

                function cn(e, t) {
                    if (t < 0 || t >= e.past.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e, i = n.slice(0, t), s = [...n.slice(t + 1), r, ...o];
                    return Jt(i, n[t], s)
                }

                function dn(e, t) {
                    return t > 0 ? an(e, t - 1) : t < 0 ? cn(e, e.past.length + t) : e
                }
                const un = window.wp.isShallowEqual;
                var pn = n.n(un);
                const mn = {
                    editCount: 0,
                    selection: null,
                    blocks: null
                };

                function fn(e, t) {
                    return e.find((e => e.clientId === t.clientId))
                }

                function hn(e, t) {
                    const {
                        type: n,
                        selection: o
                    } = e;
                    if ("UPDATE_BLOCKS_WITHOUT_UNDO" === n) return !1;
                    if (!o) return !0;
                    if (pn()(o, t.selection)) {
                        const n = fn(t.blocks, o.selectionStart),
                            r = fn(e.blocks, o.selectionStart);
                        if (n && r && pn()(n.attributes, r.attributes)) return !1
                    }
                    return !0
                }
                const gn = function(e, t = {}) {
                        ! function(e) {
                            Xt = e
                        }(t.debug);
                        const n = {
                                limit: void 0,
                                filter: () => !0,
                                groupBy: () => null,
                                undoType: zt,
                                redoType: Wt,
                                jumpToPastType: Kt,
                                jumpToFutureType: Gt,
                                jumpType: jt,
                                neverSkipReducer: !1,
                                ignoreInitialState: !1,
                                syncFilter: !1,
                                ...t,
                                initTypes: qt(t.initTypes, ["@@redux-undo/INIT"]),
                                clearHistoryType: qt(t.clearHistoryType, [$t])
                            },
                            o = n.neverSkipReducer ? (t, n, ...o) => ({
                                ...t,
                                present: e(t.present, n, ...o)
                            }) : e => e;
                        let r;
                        return (t = r, i = {}, ...s) => {
                            ! function(e, t) {
                                Qt = {
                                    header: [],
                                    prev: [],
                                    action: [],
                                    next: [],
                                    msgs: []
                                }, Xt && (console.group ? (Qt.header = ["%credux-undo", "font-style: italic", "action", e.type], Qt.action = on("action", tn, e), Qt.prev = on("prev history", en, t)) : (Qt.header = ["redux-undo action", e.type], Qt.action = ["action", e], Qt.prev = ["prev history", t]))
                            }(i, t);
                            let l, a = t;
                            if (!r) {
                                if (sn("history is uninitialized"), void 0 === t) return a = ln(e(t, {
                                    type: "@@redux-undo/CREATE_HISTORY"
                                }, ...s), n.ignoreInitialState), sn("do not set initialState on probe actions"), rn(a), a;
                                ! function(e) {
                                    return typeof e.present < "u" && typeof e.future < "u" && typeof e.past < "u" && Array.isArray(e.future) && Array.isArray(e.past)
                                }(t) ? (a = r = ln(t, n.ignoreInitialState), sn("initialHistory initialized: initialState is not a history", r)) : (a = r = n.ignoreInitialState ? t : Jt(t.past, t.present, t.future), sn("initialHistory initialized: initialState is a history", r))
                            }
                            switch (i.type) {
                                case void 0:
                                    return a;
                                case n.undoType:
                                    return l = dn(a, -1), sn("perform undo"), rn(l), o(l, i, ...s);
                                case n.redoType:
                                    return l = dn(a, 1), sn("perform redo"), rn(l), o(l, i, ...s);
                                case n.jumpToPastType:
                                    return l = cn(a, i.index), sn(`perform jumpToPast to ${i.index}`), rn(l), o(l, i, ...s);
                                case n.jumpToFutureType:
                                    return l = an(a, i.index), sn(`perform jumpToFuture to ${i.index}`), rn(l), o(l, i, ...s);
                                case n.jumpType:
                                    return l = dn(a, i.index), sn(`perform jump to ${i.index}`), rn(l), o(l, i, ...s);
                                case
                                function(e, t) {
                                    return t.indexOf(e) > -1 ? e : !e
                                }(i.type, n.clearHistoryType):
                                    return l = ln(a.present, n.ignoreInitialState), sn("perform clearHistory"), rn(l), o(l, i, ...s);
                                default:
                                    if (l = e(a.present, i, ...s), n.initTypes.some((e => e === i.type))) return sn("reset history due to init action"), rn(r), r;
                                    if (a._latestUnfiltered === l) return a;
                                    if ("function" == typeof n.filter && !n.filter(i, l, a)) {
                                        const e = Jt(a.past, l, a.future, a.group);
                                        return n.syncFilter || (e._latestUnfiltered = a._latestUnfiltered), sn("filter ignored action, not storing it in past"), rn(e), e
                                    }
                                    const t = n.groupBy(i, l, a);
                                    if (null != t && t === a.group) {
                                        const e = Jt(a.past, l, a.future, a.group);
                                        return sn("groupBy grouped the action with the previous action"), rn(e), e
                                    }
                                    return a = function(e, t, n, o) {
                                        const r = e.past.length + 1;
                                        sn("inserting", t), sn("new free: ", n - r);
                                        const {
                                            past: i,
                                            _latestUnfiltered: s
                                        } = e, l = n && n <= r, a = i.slice(l ? 1 : 0);
                                        return Jt(null != s ? [...a, s] : a, t, [], o)
                                    }(a, l, n.limit, t), sn("inserted new state into history"), rn(a), a
                            }
                        }
                    }(((e = mn, t) => {
                        switch (t.type) {
                            case "UPDATE_BLOCKS_WITHOUT_UNDO":
                            case "UPDATE_BLOCKS_WITH_UNDO":
                                return {
                                    ...e, editCount: hn(t, e) ? e.editCount + 1 : e.editCount, blocks: t.blocks, selection: t.selection
                                }
                        }
                        return e
                    }), {
                        groupBy: (e, t, n) => t.editCount
                    }),
                    En = {
                        * undo() {
                            return yield Yt()
                        },
                        * redo() {
                            return yield Zt()
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
                    bn = {
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

                function yn(e, t, n) {
                    const o = [(0, O.serialize)((0, O.createBlock)("core/paragraph")), (0, O.serialize)((0, O.createBlock)("core/paragraph", {
                            className: ""
                        }))],
                        r = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                    return r && o.push((0, O.serialize)((0, O.parse)(r.content))), n && o.push((0, O.serialize)((0, O.synchronizeBlocksWithTemplate)([], n))), o
                }
                const vn = (e = bn, t) => {
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
                                    ignoredContent: yn(o, n, t.settings.editor.template),
                                    gutenbergTemplate: t.settings.editor.template,
                                    settings: {
                                        ...e.settings,
                                        ...t.settings.iso
                                    }
                                }
                            }
                            case "SET_CURRENT_PATTERN":
                                return {
                                    ...e, currentPattern: t.pattern, ignoredContent: yn(e.patterns, t.pattern, e.gutenbergTemplate)
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
                    wn = {
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
                    Sn = wn,
                    kn = (e, t) => {
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
                    Cn = {
                        toggleFeature: e => ({
                            type: "TOGGLE_FEATURE",
                            feature: e
                        })
                    },
                    Tn = {},
                    xn = (e = Tn, t) => "TOGGLE_OPTION" === t.type ? {
                        ...e,
                        [t.option]: !e[t.option] || !e[t.option]
                    } : e,
                    On = {
                        toggleOption: e => ({
                            type: "TOGGLE_OPTION",
                            option: e
                        })
                    };

                function In(e) {
                    return e.editor.editorMode
                }

                function An(e) {
                    return e.editor.settings
                }

                function Bn(e) {
                    return e.editor.isReady
                }

                function Ln(e) {
                    return e.editor.currentPattern
                }

                function Mn(e) {
                    const {
                        currentPattern: t,
                        patterns: n
                    } = e.editor;
                    if (t && n)
                        for (let e = 0; e < n.length; e++)
                            if (n[e].name === t) return n[e];
                    return null
                }

                function Rn(e) {
                    return e.editor.ignoredContent
                }

                function Pn(e, t) {
                    const {
                        patterns: n = []
                    } = e.editor;
                    let o = n.find((e => e.name === t));
                    return o || (o = n.find((e => e.name.replace("p2/", "") === t)), o || null)
                }

                function Nn(e) {
                    return e.editor.isInserterOpened
                }
                const Dn = (0, v.createRegistrySelector)((e => () => {
                    const t = e(oe).getActiveComplementaryArea("isolated/editor");
                    return (0, C.includes)(["edit-post/document", "edit-post/block"], t)
                }));

                function Fn(e) {
                    return e.editor.isEditing
                }

                function Vn(e) {
                    return e.editor.patterns
                }

                function Hn(e) {
                    return e.editor.isListViewOpened
                }

                function Un(e) {
                    return e.editor.deviceType
                }

                function zn(e) {
                    return e.editor.canvasStyles
                }

                function Wn(e) {
                    return e.editor.isIframePreview || ["Tablet", "Mobile"].includes(e.editor.deviceType)
                }

                function Gn(e) {
                    return e.blocks.present.blocks
                }

                function Kn(e) {
                    return e.blocks.present.selection
                }

                function jn(e) {
                    return "visual" === In(e) && e.blocks.past.length > 0
                }

                function $n(e) {
                    return "visual" === In(e) && e.blocks.future.length > 0
                }

                function Yn(e) {
                    return e.blocks.present.editCount
                }

                function Zn(e, t, n = !1) {
                    return void 0 === e.preferences[t] ? n : e.preferences[t]
                }

                function qn(e, t) {
                    return !!e.options[t] && e.options[t]
                }

                function* Jn(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCK_TO_STATIC",
                            clientId: e
                        }
                    }(e)
                }

                function* Xn(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCKS_TO_REUSABLE",
                            clientIds: e
                        }
                    }(e)
                }

                function* Qn(e) {
                    yield function(e) {
                        return {
                            type: "DELETE_REUSABLE_BLOCK",
                            id: e
                        }
                    }(e)
                }

                function eo(e, t) {
                    return {
                        type: "SET_EDITING_REUSABLE_BLOCK",
                        clientId: e,
                        isEditing: t
                    }
                }

                function to(e, t) {
                    return e.isEditingReusableBlock[t]
                }
                const no = {
                        actions: c,
                        controls: {
                            CONVERT_BLOCK_TO_STATIC: (0, v.createRegistryControl)((e => ({
                                clientId: t
                            }) => {
                                const n = e.select("core/block-editor").getBlock(t),
                                    o = e.select("core").getEditedEntityRecord("postType", "wp_block", n.attributes.ref),
                                    r = (0, O.parse)(o.content);
                                e.dispatch("core/block-editor").replaceBlocks(n.clientId, r)
                            })),
                            CONVERT_BLOCKS_TO_REUSABLE: (0, v.createRegistryControl)((e => async function({
                                clientIds: t
                            }) {
                                const n = {
                                        title: (0, B.__)("Untitled Reusable Block"),
                                        content: (0, O.serialize)(e.select("core/block-editor").getBlocksByClientId(t)),
                                        status: "publish"
                                    },
                                    o = await e.dispatch("core").saveEntityRecord("postType", "wp_block", n),
                                    r = (0, O.createBlock)("core/block", {
                                        ref: o.id
                                    });
                                e.dispatch("core/block-editor").replaceBlocks(t, r), e.dispatch(reusableBlocksStore).__experimentalSetEditingReusableBlock(r.clientId, !0)
                            })),
                            DELETE_REUSABLE_BLOCK: (0, v.createRegistryControl)((e => async function({
                                id: t
                            }) {
                                if (!e.select("core").getEditedEntityRecord("postType", "wp_block", t)) return;
                                const n = e.select("core/block-editor").getBlocks().filter((e => (0, O.isReusableBlock)(e) && e.attributes.ref === t)).map((e => e.clientId));
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
                    oo = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    ro = (e, t) => ({
                        registry: n,
                        dispatch: o
                    }) => {
                        t && (n.select(H.store).get(e, "isComplementaryAreaVisible") || n.dispatch(H.store).set(e, "isComplementaryAreaVisible", !0), o({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    io = e => ({
                        registry: t
                    }) => {
                        t.select(H.store).get(e, "isComplementaryAreaVisible") && t.dispatch(H.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    so = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(H.store).get(e, "pinnedItems");
                        !0 !== o?.[t] && n.dispatch(H.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !0
                        })
                    },
                    lo = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const o = n.select(H.store).get(e, "pinnedItems");
                        n.dispatch(H.store).set(e, "pinnedItems", {
                            ...o,
                            [t]: !1
                        })
                    };

                function ao(e, t) {
                    return function({
                        registry: n
                    }) {
                        V()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(H.store).toggle(e, t)
                    }
                }

                function co(e, t, n) {
                    return function({
                        registry: o
                    }) {
                        V()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), o.dispatch(H.store).set(e, t, !!n)
                    }
                }

                function uo(e, t) {
                    return function({
                        registry: n
                    }) {
                        V()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(H.store).setDefaults(e, t)
                    }
                }
                const po = (0, v.createRegistrySelector)((e => (t, n) => {
                        const o = e(H.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== o) return o ? t?.complementaryAreas?.[n] : null
                    })),
                    mo = (0, v.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(H.store).get(n, "pinnedItems");
                        return null === (r = i?.[o]) || void 0 === r || r
                    })),
                    fo = (0, v.createRegistrySelector)((e => (t, n, o) => (V()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(H.store).get(n, o)))),
                    ho = {
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
                let go = [];
                const Eo = (0, k.createHigherOrderComponent)((e => (0, v.withRegistry)((t => {
                        const {
                            registry: n,
                            settings: o,
                            ...r
                        } = t, c = function(e) {
                            var t, n, o, r, i, s, l, a, c, d, u, p, m, f, h, g, E, b, y, v;
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
                                        ...null !== (l = _?.toolbar) && void 0 !== l ? l : {}
                                    },
                                    header: null === (a = _?.header) || void 0 === a || a,
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
                                    patterns: null !== (E = _?.patterns) && void 0 !== E ? E : []
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
                                    bodyPlaceholder: null !== (b = w?.bodyPlaceholder) && void 0 !== b ? b : (0, B.__)("Start writing or type / to choose a block"),
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
                        } = c.iso || {}, [E, b] = (0, f.useState)(null);
                        return (0, f.useEffect)((() => {
                            const e = (0, v.createRegistry)({
                                "core/reusable-blocks": no,
                                "core/interface": ho
                            }, n);
                            d && e.use(v.plugins.persistence, {
                                persistenceKey: d
                            });
                            const t = e.registerStore("isolated/editor", function(e, t) {
                                    return {
                                        reducer: (0, v.combineReducers)({
                                            blocks: gn,
                                            editor: vn,
                                            preferences: kn,
                                            options: xn
                                        }),
                                        actions: {
                                            ...En,
                                            ...Sn,
                                            ...On,
                                            ...Cn
                                        },
                                        selectors: {
                                            ...s,
                                            ...i,
                                            ...l,
                                            ...a
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
                                    ...I.storeConfig,
                                    persist: ["preferences"]
                                }),
                                r = e.registerStore("core/editor", {
                                    ...g.storeConfig,
                                    selectors: {
                                        ...g.storeConfig.selectors,
                                        ...(c = g.storeConfig.selectors, m = e.select, {
                                            getEditedPostAttribute: (e, t) => "content" === t ? (0, O.serialize)(m("core/block-editor").getBlocks()) : c.getEditedPostAttribute(e, t),
                                            getEditedPostContent: () => (0, O.serialize)(m("core/block-editor").getBlocks())
                                        })
                                    },
                                    persist: ["preferences"]
                                });
                            var c, m;
                            return h.map((t => {
                                    go.push(e.registerStore(t.name, t.config))
                                })), go.push(t), go.push(o), go.push(r), b(e),
                                function() {
                                    go = go.filter((e => e !== t))
                                }
                        }), [n]), E ? (0, m.createElement)(v.RegistryProvider, {
                            value: E
                        }, (0, m.createElement)(e, {
                            ...r,
                            settings: c
                        })) : null
                    }))), "withRegistryProvider"),
                    bo = Eo;

                function yo(e, t) {
                    return e && e.allowBlocks && e.allowBlocks.length > 0 ? e.allowBlocks : t.map((e => e.name))
                }

                function vo(e, t, n, o) {
                    const r = (i = t.blocks) && i.disallowBlocks ? i.disallowBlocks : [];
                    var i;
                    return {
                        ...e,
                        fixedToolbar: o,
                        hasFixedToolbar: o,
                        allowedBlockTypes: yo(t.blocks, n).filter((e => -1 === r.indexOf(e)))
                    }
                }
                const _o = (0, k.compose)([(0, v.withSelect)((e => {
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
                                n((0, O.parse)(t.content))
                            }), 0)) : o.current = t
                        }), [t]), null
                    })),
                    wo = function(e) {
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

                        function l() {
                            t?.(i, s), n?.((0, O.serialize)(i))
                        }
                        return (0, f.useEffect)((() => {
                            i ? o.current ? (o.current = !1, r(!0), i && i.length > 1 && l()) : l() : r(!0)
                        }), [i]), null
                    },
                    So = window.wp.apiFetch;
                var ko = n.n(So);

                function Co({
                    undoManager: e
                } = {}) {
                    window.isoInitialisedBlocks || (window.isoInitialised || ((0, y.registerCoreBlocks)(), window.isoInitialised = !0), (0, v.use)(Vt, {}), ko().use(ko().createPreloadingMiddleware({
                        OPTIONS: {
                            "/wp/v2/blocks": {
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
                        }
                    })), window.isoInitialisedBlocks = !0)
                }
                const To = bo((function(e) {
                        const {
                            children: t,
                            onSaveContent: n,
                            onSaveBlocks: o,
                            __experimentalUndoManager: r,
                            __experimentalOnInput: i,
                            __experimentalOnChange: s,
                            __experimentalValue: l,
                            __experimentalOnSelection: a,
                            ...c
                        } = e;
                        Co({
                            undoManager: r
                        });
                        const d = function(e) {
                                const {
                                    undo: t,
                                    setupEditor: n
                                } = (0, v.useDispatch)("isolated/editor"), {
                                    updateEditorSettings: o,
                                    setupEditorState: r
                                } = (0, v.useDispatch)("core/editor"), {
                                    updateSettings: i
                                } = (0, v.useDispatch)("core/block-editor"), {
                                    isEditing: s,
                                    topToolbar: l,
                                    currentSettings: a
                                } = (0, v.useSelect)((n => {
                                    const {
                                        isEditing: o,
                                        isFeatureActive: r
                                    } = n("isolated/editor"), {
                                        getBlockTypes: i
                                    } = n(O.store), s = i(), l = r("fixedToolbar", e?.editor.hasFixedToolbar);
                                    return {
                                        isEditing: o(),
                                        topToolbar: l,
                                        currentSettings: {
                                            ...e,
                                            editor: {
                                                ...vo(e.editor, e.iso, s, void 0 !== e.iso?.defaultPreferences?.fixedToolbar ? e.iso?.defaultPreferences?.fixedToolbar : l),
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
                                    }), n(a), i((e = a).editor), o(e.editor), r({
                                        id: 0,
                                        type: "post"
                                    }, [])
                                }), []), (0, f.useEffect)((() => {
                                    s && i(a)
                                }), [s, l, a?.editor?.reusableBlocks]), e
                            }(e.settings),
                            u = (0, v.useSelect)((e => ({
                                start: e("core/block-editor").getSelectionStart(),
                                end: e("core/block-editor").getSelectionEnd()
                            })), []);
                        return (0, f.useEffect)((() => {
                            a?.(u)
                        }), [u]), (0, m.createElement)(f.StrictMode, null, (0, m.createElement)(wo, {
                            onSaveBlocks: o,
                            onSaveContent: n
                        }), (0, m.createElement)(_o, null), (0, m.createElement)(b.SlotFillProvider, null, (0, m.createElement)(Ut, {
                            ...c,
                            onInput: i,
                            onChange: s,
                            blocks: l,
                            settings: d
                        }, t)))
                    })),
                    xo = function({
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
                    Oo = window.wp.domReady;
                var Io;
                const Ao = (e, t) => {
                    if ("POST" === e.method && "/wp/v2/media" === e.path) {
                        const t = e.body;
                        t instanceof FormData && t.has("post") && "null" === t.get("post") && t.delete("post")
                    }
                    return t(e)
                };
                n.n(Oo)()((() => {
                    ko().use(Ao)
                }));
                const Bo = {
                    iso: {
                        moreMenu: !1
                    }
                };
                window.wp = {
                    ...null !== (Io = window.wp) && void 0 !== Io ? Io : {},
                    attachEditor: function(e, t = {}) {
                        if ("textarea" !== e.type.toLowerCase()) return;
                        const n = document.createElement("div");
                        n.classList.add("editor"), e.parentNode.insertBefore(n, e.nextSibling), e.style.display = "none";
                        var o = {
                            ...Bo,
                            ...t
                        };
                        o?.iso?.noToolbar && n.classList.add("no-toolbar"), o?.editor?.enableUpload && (o.editor.mediaUpload = g.mediaUpload), o?.editor?.enableLibrary && (0, E.addFilter)("editor.MediaUpload", "acfe/media-upload", (() => h.MediaUpload)), o.iso.blocks.allowBlocks && o.iso.blocks.allowBlocks.length > 0 && (o.editor.allowedBlockTypes = o.iso.blocks.allowBlocks), (0, f.createRoot)(n).render((0, m.createElement)(To, {
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
                        }, (0, m.createElement)(xo, {
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
            934: e => {
                e.exports = function(e, t, n) {
                    return ((n = window.getComputedStyle) ? n(e) : e.currentStyle)[t.replace(/-(\w)/gi, (function(e, t) {
                        return t.toUpperCase()
                    }))]
                }
            },
            303: (e, t, n) => {
                var o = n(934);
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
                        var l = o(e, "font-size");
                        s.style.fontSize = l, s.style.padding = "0px", s.style.border = "0px";
                        var a = document.body;
                        a.appendChild(s), n = s.offsetHeight, a.removeChild(s)
                    }
                    return n
                }
            },
            703: (e, t, n) => {
                "use strict";
                var o = n(414);

                function r() {}

                function i() {}
                i.resetWarningCache = r, e.exports = function() {
                    function e(e, t, n, r, i, s) {
                        if (s !== o) {
                            var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                            throw l.name = "Invariant Violation", l
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
            697: (e, t, n) => {
                e.exports = n(703)()
            },
            414: e => {
                "use strict";
                e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
            },
            857: function(e, t, n) {
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
                var l = n(196),
                    a = n(697),
                    c = n(367),
                    d = n(303),
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
                                a = s(t, ["onResize", "maxRows", "onChange", "style", "innerRef", "children"]),
                                c = this.state.lineHeight,
                                d = n && c ? c * n : null;
                            return l.createElement("textarea", i({}, a, {
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
                            rows: a.number,
                            maxRows: a.number,
                            onResize: a.func,
                            innerRef: a.any,
                            async: a.bool
                        }, t
                    }(l.Component);
                t.TextareaAutosize = l.forwardRef((function(e, t) {
                    return l.createElement(p, i({}, e, {
                        innerRef: t
                    }))
                }))
            },
            42: (e, t, n) => {
                "use strict";
                var o = n(857);
                t.Z = o.TextareaAutosize
            },
            196: e => {
                "use strict";
                e.exports = window.React
            },
            967: (e, t) => {
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
                for (var [n, r, i] = e[d], l = !0, a = 0; a < n.length; a++)(!1 & i || s >= i) && Object.keys(o.O).every((e => o.O[e](n[a]))) ? n.splice(a--, 1) : (l = !1, i < s && (s = i));
                if (l) {
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
            826: 0,
            431: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
                var r, i, [s, l, a] = n,
                    c = 0;
                if (s.some((t => 0 !== e[t]))) {
                    for (r in l) o.o(l, r) && (o.m[r] = l[r]);
                    if (a) var d = a(o)
                }
                for (t && t(n); c < s.length; c++) i = s[c], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
                return o.O(d)
            },
            n = globalThis.webpackChunkbuild_iso = globalThis.webpackChunkbuild_iso || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
    })();
    var r = o.O(void 0, [431], (() => o(993)));
    r = o.O(r)
})();