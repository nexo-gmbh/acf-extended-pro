! function() {
    var e, t = {
            367: function(e, t) {
                var n, r;
                n = function(e, t) {
                    "use strict";
                    var n, r, o = "function" == typeof Map ? new Map : (n = [], r = [], {
                            has: function(e) {
                                return n.indexOf(e) > -1
                            },
                            get: function(e) {
                                return r[n.indexOf(e)]
                            },
                            set: function(e, t) {
                                -1 === n.indexOf(e) && (n.push(e), r.push(t))
                            },
                            delete: function(e) {
                                var t = n.indexOf(e);
                                t > -1 && (n.splice(t, 1), r.splice(t, 1))
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
                        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !o.has(e)) {
                            var t = null,
                                n = null,
                                r = null,
                                s = function() {
                                    e.clientWidth !== n && d()
                                },
                                a = function(t) {
                                    window.removeEventListener("resize", s, !1), e.removeEventListener("input", d, !1), e.removeEventListener("keyup", d, !1), e.removeEventListener("autosize:destroy", a, !1), e.removeEventListener("autosize:update", d, !1), Object.keys(t).forEach((function(n) {
                                        e.style[n] = t[n]
                                    })), o.delete(e)
                                }.bind(e, {
                                    height: e.style.height,
                                    resize: e.style.resize,
                                    overflowY: e.style.overflowY,
                                    overflowX: e.style.overflowX,
                                    wordWrap: e.style.wordWrap
                                });
                            e.addEventListener("autosize:destroy", a, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", d, !1), window.addEventListener("resize", s, !1), e.addEventListener("input", d, !1), e.addEventListener("autosize:update", d, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", o.set(e, {
                                destroy: a,
                                update: d
                            }), "vertical" === (l = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === l.resize && (e.style.resize = "horizontal"), t = "content-box" === l.boxSizing ? -(parseFloat(l.paddingTop) + parseFloat(l.paddingBottom)) : parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth), isNaN(t) && (t = 0), d()
                        }
                        var l;

                        function c(t) {
                            var n = e.style.width;
                            e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
                        }

                        function u() {
                            if (0 !== e.scrollHeight) {
                                var r = function(e) {
                                        for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                                            node: e.parentNode,
                                            scrollTop: e.parentNode.scrollTop
                                        }), e = e.parentNode;
                                        return t
                                    }(e),
                                    o = document.documentElement && document.documentElement.scrollTop;
                                e.style.height = "", e.style.height = e.scrollHeight + t + "px", n = e.clientWidth, r.forEach((function(e) {
                                    e.node.scrollTop = e.scrollTop
                                })), o && (document.documentElement.scrollTop = o)
                            }
                        }

                        function d() {
                            u();
                            var t = Math.round(parseFloat(e.style.height)),
                                n = window.getComputedStyle(e, null),
                                o = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
                            if (o < t ? "hidden" === n.overflowY && (c("scroll"), u(), o = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (c("hidden"), u(), o = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), r !== o) {
                                r = o;
                                var s = i("autosize:resized");
                                try {
                                    e.dispatchEvent(s)
                                } catch (e) {}
                            }
                        }
                    }

                    function a(e) {
                        var t = o.get(e);
                        t && t.destroy()
                    }

                    function l(e) {
                        var t = o.get(e);
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
                }, void 0 === (r = n.apply(t, [e, t])) || (e.exports = r)
            },
            624: function(e, t, n) {
                "use strict";
                var r = {};
                n.r(r), n.d(r, {
                    closeModal: function() {
                        return te
                    },
                    disableComplementaryArea: function() {
                        return $
                    },
                    enableComplementaryArea: function() {
                        return Y
                    },
                    openModal: function() {
                        return ee
                    },
                    pinItem: function() {
                        return Z
                    },
                    setDefaultComplementaryArea: function() {
                        return K
                    },
                    setFeatureDefaults: function() {
                        return Q
                    },
                    setFeatureValue: function() {
                        return X
                    },
                    toggleFeature: function() {
                        return J
                    },
                    unpinItem: function() {
                        return q
                    }
                });
                var o = {};
                n.r(o), n.d(o, {
                    getActiveComplementaryArea: function() {
                        return ne
                    },
                    isComplementaryAreaLoading: function() {
                        return re
                    },
                    isFeatureActive: function() {
                        return ie
                    },
                    isItemPinned: function() {
                        return oe
                    },
                    isModalActive: function() {
                        return se
                    }
                });
                var i = {};
                n.r(i), n.d(i, {
                    getCanvasStyles: function() {
                        return Gn
                    },
                    getCurrentPattern: function() {
                        return Rn
                    },
                    getCurrentPatternName: function() {
                        return Bn
                    },
                    getEditorMode: function() {
                        return Ln
                    },
                    getEditorSettings: function() {
                        return Fn
                    },
                    getIgnoredContent: function() {
                        return Pn
                    },
                    getNamedPattern: function() {
                        return Nn
                    },
                    getPatterns: function() {
                        return Hn
                    },
                    getPreviewDeviceType: function() {
                        return Wn
                    },
                    isEditing: function() {
                        return Un
                    },
                    isEditorReady: function() {
                        return Mn
                    },
                    isEditorSidebarOpened: function() {
                        return Vn
                    },
                    isIframePreview: function() {
                        return jn
                    },
                    isInserterOpened: function() {
                        return Dn
                    },
                    isListViewOpened: function() {
                        return zn
                    }
                });
                var s = {};
                n.r(s), n.d(s, {
                    getBlocks: function() {
                        return Kn
                    },
                    getEditCount: function() {
                        return qn
                    },
                    getEditorSelection: function() {
                        return Yn
                    },
                    hasEditorRedo: function() {
                        return Zn
                    },
                    hasEditorUndo: function() {
                        return $n
                    }
                });
                var a = {};
                n.r(a), n.d(a, {
                    isFeatureActive: function() {
                        return Jn
                    }
                });
                var l = {};
                n.r(l), n.d(l, {
                    isOptionActive: function() {
                        return Xn
                    }
                });
                var c = {};
                n.r(c), n.d(c, {
                    setUndoManager: function() {
                        return er
                    },
                    setYDoc: function() {
                        return Qn
                    }
                });
                var u = {};
                n.r(u), n.d(u, {
                    getUndoManager: function() {
                        return nr
                    },
                    getYDoc: function() {
                        return tr
                    }
                });
                var d = {};
                n.r(d), n.d(d, {
                    setAvailableCollabPeers: function() {
                        return rr
                    },
                    setCollabPeerSelection: function() {
                        return or
                    }
                });
                var p = {};
                n.r(p), n.d(p, {
                    getCollabPeers: function() {
                        return ir
                    },
                    hasCollabPeers: function() {
                        return sr
                    }
                });
                var m = {};
                n.r(m), n.d(m, {
                    __experimentalConvertBlockToStatic: function() {
                        return mr
                    },
                    __experimentalConvertBlocksToReusable: function() {
                        return fr
                    },
                    __experimentalDeleteReusableBlock: function() {
                        return hr
                    },
                    __experimentalSetEditingReusableBlock: function() {
                        return gr
                    }
                });
                var f = {};
                n.r(f), n.d(f, {
                    __experimentalIsEditingReusableBlock: function() {
                        return Er
                    }
                });
                var h = {};
                n.r(h), n.d(h, {
                    disableComplementaryArea: function() {
                        return _r
                    },
                    enableComplementaryArea: function() {
                        return vr
                    },
                    pinItem: function() {
                        return Cr
                    },
                    setDefaultComplementaryArea: function() {
                        return yr
                    },
                    setFeatureDefaults: function() {
                        return Tr
                    },
                    setFeatureValue: function() {
                        return kr
                    },
                    toggleFeature: function() {
                        return Sr
                    },
                    unpinItem: function() {
                        return wr
                    }
                });
                var g = {};
                n.r(g), n.d(g, {
                    getActiveComplementaryArea: function() {
                        return xr
                    },
                    isFeatureActive: function() {
                        return Ar
                    },
                    isItemPinned: function() {
                        return Or
                    }
                });
                var E = n(196),
                    b = window.wp.element,
                    y = window.wp.mediaUtils,
                    v = window.wp.editor,
                    _ = window.wp.hooks,
                    C = window.wp.components,
                    w = window.wp.blockLibrary,
                    S = window.wp.data,
                    k = (window.wp.formatLibrary, window.wp.keyboardShortcuts),
                    T = n(184),
                    x = n.n(T),
                    O = window.wp.compose,
                    A = window.lodash;
                const I = ["button", "submit"];
                var L = (0, O.createHigherOrderComponent)((e => class extends b.Component {
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
                            (0, A.includes)(["mouseup", "touchend"], t) ? this.preventBlurCheck = !1: function(e) {
                                switch (e.nodeName) {
                                    case "A":
                                    case "BUTTON":
                                        return !0;
                                    case "INPUT":
                                        return (0, A.includes)(I, e.type)
                                }
                                return !1
                            }(n) && (this.preventBlurCheck = !0)
                        }
                        render() {
                            return (0, b.createElement)("div", {
                                onFocus: this.cancelBlurCheck,
                                onMouseDown: this.normalizeButtonFocus,
                                onMouseUp: this.normalizeButtonFocus,
                                onTouchStart: this.normalizeButtonFocus,
                                onTouchEnd: this.normalizeButtonFocus,
                                onBlur: this.queueBlurCheck
                            }, (0, b.createElement)(e, {
                                ref: this.bindNode,
                                ...this.props
                            }))
                        }
                    }), "withFocusOutside"),
                    F = L(class extends b.Component {
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
                    M = window.wp.blocks,
                    B = window.wp.blockEditor,
                    R = window.wp.keycodes,
                    P = window.wp.i18n,
                    N = window.wp.primitives,
                    D = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
                    })),
                    V = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
                    })),
                    U = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        fillRule: "evenodd",
                        d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
                        clipRule: "evenodd"
                    })),
                    H = window.wp.viewport,
                    z = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
                    })),
                    W = window.wp.deprecated,
                    G = n.n(W),
                    j = window.wp.preferences;
                const K = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    Y = (e, t) => ({
                        registry: n,
                        dispatch: r
                    }) => {
                        t && (n.select(j.store).get(e, "isComplementaryAreaVisible") || n.dispatch(j.store).set(e, "isComplementaryAreaVisible", !0), r({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    $ = e => ({
                        registry: t
                    }) => {
                        t.select(j.store).get(e, "isComplementaryAreaVisible") && t.dispatch(j.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    Z = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const r = n.select(j.store).get(e, "pinnedItems");
                        !0 !== r?.[t] && n.dispatch(j.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !0
                        })
                    },
                    q = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const r = n.select(j.store).get(e, "pinnedItems");
                        n.dispatch(j.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !1
                        })
                    };

                function J(e, t) {
                    return function({
                        registry: n
                    }) {
                        G()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(j.store).toggle(e, t)
                    }
                }

                function X(e, t, n) {
                    return function({
                        registry: r
                    }) {
                        G()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), r.dispatch(j.store).set(e, t, !!n)
                    }
                }

                function Q(e, t) {
                    return function({
                        registry: n
                    }) {
                        G()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(j.store).setDefaults(e, t)
                    }
                }

                function ee(e) {
                    return {
                        type: "OPEN_MODAL",
                        name: e
                    }
                }

                function te() {
                    return {
                        type: "CLOSE_MODAL"
                    }
                }
                const ne = (0, S.createRegistrySelector)((e => (t, n) => {
                        const r = e(j.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== r) return !1 === r ? null : t?.complementaryAreas?.[n]
                    })),
                    re = (0, S.createRegistrySelector)((e => (t, n) => {
                        const r = e(j.store).get(n, "isComplementaryAreaVisible"),
                            o = t?.complementaryAreas?.[n];
                        return r && void 0 === o
                    })),
                    oe = (0, S.createRegistrySelector)((e => (t, n, r) => {
                        var o;
                        const i = e(j.store).get(n, "pinnedItems");
                        return null === (o = i?.[r]) || void 0 === o || o
                    })),
                    ie = (0, S.createRegistrySelector)((e => (t, n, r) => (G()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(j.store).get(n, r))));

                function se(e, t) {
                    return e.activeModal === t
                }
                var ae = (0, S.combineReducers)({
                    complementaryAreas: function(e = {}, t) {
                        switch (t.type) {
                            case "SET_DEFAULT_COMPLEMENTARY_AREA": {
                                const {
                                    scope: n,
                                    area: r
                                } = t;
                                return e[n] ? e : {
                                    ...e,
                                    [n]: r
                                }
                            }
                            case "ENABLE_COMPLEMENTARY_AREA": {
                                const {
                                    scope: n,
                                    area: r
                                } = t;
                                return {
                                    ...e,
                                    [n]: r
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
                });
                const le = (0, S.createReduxStore)("core/interface", {
                    reducer: ae,
                    actions: r,
                    selectors: o
                });
                (0, S.register)(le);
                var ce = (0, window.wp.plugins.withPluginContext)(((e, t) => ({
                        icon: t.icon || e.icon,
                        identifier: t.identifier || `${e.name}/${t.name}`
                    }))),
                    ue = ce((function({
                        as: e = C.Button,
                        scope: t,
                        identifier: n,
                        icon: r,
                        selectedIcon: o,
                        name: i,
                        ...s
                    }) {
                        const a = e,
                            l = (0, S.useSelect)((e => e(le).getActiveComplementaryArea(t) === n), [n]),
                            {
                                enableComplementaryArea: c,
                                disableComplementaryArea: u
                            } = (0, S.useDispatch)(le);
                        return (0, b.createElement)(a, {
                            icon: o && l ? o : r,
                            onClick: () => {
                                l ? u(t) : c(t, n)
                            },
                            ...s
                        })
                    })),
                    de = ({
                        smallScreenTitle: e,
                        children: t,
                        className: n,
                        toggleButtonProps: r
                    }) => {
                        const o = (0, b.createElement)(ue, {
                            icon: z,
                            ...r
                        });
                        return (0, b.createElement)(b.Fragment, null, (0, b.createElement)("div", {
                            className: "components-panel__header interface-complementary-area-header__small"
                        }, e && (0, b.createElement)("span", {
                            className: "interface-complementary-area-header__small-title"
                        }, e), o), (0, b.createElement)("div", {
                            className: x()("components-panel__header", "interface-complementary-area-header", n),
                            tabIndex: -1
                        }, t, o))
                    };
                const pe = () => {};

                function me({
                    name: e,
                    as: t = C.Button,
                    onClick: n,
                    ...r
                }) {
                    return (0, b.createElement)(C.Fill, {
                        name: e
                    }, (({
                        onClick: e
                    }) => (0, b.createElement)(t, {
                        onClick: n || e ? (...t) => {
                            (n || pe)(...t), (e || pe)(...t)
                        } : void 0,
                        ...r
                    })))
                }
                me.Slot = function({
                    name: e,
                    as: t = C.ButtonGroup,
                    fillProps: n = {},
                    bubblesVirtually: r,
                    ...o
                }) {
                    return (0, b.createElement)(C.Slot, {
                        name: e,
                        bubblesVirtually: r,
                        fillProps: n
                    }, (e => {
                        if (!b.Children.toArray(e).length) return null;
                        const n = [];
                        b.Children.forEach(e, (({
                            props: {
                                __unstableExplicitMenuItem: e,
                                __unstableTarget: t
                            }
                        }) => {
                            t && e && n.push(t)
                        }));
                        const r = b.Children.map(e, (e => !e.props.__unstableExplicitMenuItem && n.includes(e.props.__unstableTarget) ? null : e));
                        return (0, b.createElement)(t, {
                            ...o
                        }, r)
                    }))
                };
                var fe = me;
                const he = ({
                    __unstableExplicitMenuItem: e,
                    __unstableTarget: t,
                    ...n
                }) => (0, b.createElement)(C.MenuItem, {
                    ...n
                });

                function ge({
                    scope: e,
                    target: t,
                    __unstableExplicitMenuItem: n,
                    ...r
                }) {
                    return (0, b.createElement)(ue, {
                        as: r => (0, b.createElement)(fe, {
                            __unstableExplicitMenuItem: n,
                            __unstableTarget: `${e}/${t}`,
                            as: he,
                            name: `${e}/plugin-more-menu`,
                            ...r
                        }),
                        role: "menuitemcheckbox",
                        selectedIcon: D,
                        name: t,
                        scope: e,
                        ...r
                    })
                }

                function Ee({
                    scope: e,
                    ...t
                }) {
                    return (0, b.createElement)(C.Fill, {
                        name: `PinnedItems/${e}`,
                        ...t
                    })
                }
                Ee.Slot = function({
                    scope: e,
                    className: t,
                    ...n
                }) {
                    return (0, b.createElement)(C.Slot, {
                        name: `PinnedItems/${e}`,
                        ...n
                    }, (e => e?.length > 0 && (0, b.createElement)("div", {
                        className: x()(t, "interface-pinned-items")
                    }, e)))
                };
                var be = Ee;

                function ye({
                    scope: e,
                    children: t,
                    className: n
                }) {
                    return (0, b.createElement)(C.Fill, {
                        name: `ComplementaryArea/${e}`
                    }, (0, b.createElement)("div", {
                        className: n
                    }, t))
                }
                const ve = ce((function({
                    children: e,
                    className: t,
                    closeLabel: n = (0, P.__)("Close plugin"),
                    identifier: r,
                    header: o,
                    headerClassName: i,
                    icon: s,
                    isPinnable: a = !0,
                    panelClassName: l,
                    scope: c,
                    name: u,
                    smallScreenTitle: d,
                    title: p,
                    toggleShortcut: m,
                    isActiveByDefault: f,
                    showIconLabels: h = !1
                }) {
                    const {
                        isLoading: g,
                        isActive: E,
                        isPinned: y,
                        activeArea: v,
                        isSmall: _,
                        isLarge: w
                    } = (0, S.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t,
                            isComplementaryAreaLoading: n,
                            isItemPinned: o
                        } = e(le), i = t(c);
                        return {
                            isLoading: n(c),
                            isActive: i === r,
                            isPinned: o(c, r),
                            activeArea: i,
                            isSmall: e(H.store).isViewportMatch("< medium"),
                            isLarge: e(H.store).isViewportMatch("large")
                        }
                    }), [r, c]);
                    ! function(e, t, n, r, o) {
                        const i = (0, b.useRef)(!1),
                            s = (0, b.useRef)(!1),
                            {
                                enableComplementaryArea: a,
                                disableComplementaryArea: l
                            } = (0, S.useDispatch)(le);
                        (0, b.useEffect)((() => {
                            r && o && !i.current ? (l(e), s.current = !0) : s.current && !o && i.current ? (s.current = !1, a(e, t)) : s.current && n && n !== t && (s.current = !1), o !== i.current && (i.current = o)
                        }), [r, o, e, t, n])
                    }(c, r, v, E, _);
                    const {
                        enableComplementaryArea: k,
                        disableComplementaryArea: T,
                        pinItem: O,
                        unpinItem: A
                    } = (0, S.useDispatch)(le);
                    return (0, b.useEffect)((() => {
                        f && void 0 === v && !_ ? k(c, r) : void 0 === v && _ && T(c, r)
                    }), [v, f, c, r, _]), (0, b.createElement)(b.Fragment, null, a && (0, b.createElement)(be, {
                        scope: c
                    }, y && (0, b.createElement)(ue, {
                        scope: c,
                        identifier: r,
                        isPressed: E && (!h || w),
                        "aria-expanded": E,
                        "aria-disabled": g,
                        label: p,
                        icon: h ? D : s,
                        showTooltip: !h,
                        variant: h ? "tertiary" : void 0
                    })), u && a && (0, b.createElement)(ge, {
                        target: u,
                        scope: c,
                        icon: s
                    }, p), E && (0, b.createElement)(ye, {
                        className: x()("interface-complementary-area", t),
                        scope: c
                    }, (0, b.createElement)(de, {
                        className: i,
                        closeLabel: n,
                        onClose: () => T(c),
                        smallScreenTitle: d,
                        toggleButtonProps: {
                            label: n,
                            shortcut: m,
                            scope: c,
                            identifier: r
                        }
                    }, o || (0, b.createElement)(b.Fragment, null, (0, b.createElement)("strong", null, p), a && (0, b.createElement)(C.Button, {
                        className: "interface-complementary-area__pin-unpin-item",
                        icon: y ? V : U,
                        label: y ? (0, P.__)("Unpin from toolbar") : (0, P.__)("Pin to toolbar"),
                        onClick: () => (y ? A : O)(c, r),
                        isPressed: y,
                        "aria-expanded": y
                    }))), (0, b.createElement)(C.Panel, {
                        className: l
                    }, e)))
                }));
                ve.Slot = function({
                    scope: e,
                    ...t
                }) {
                    return (0, b.createElement)(C.Slot, {
                        name: `ComplementaryArea/${e}`,
                        ...t
                    })
                };
                var _e = ve,
                    Ce = ({
                        isActive: e
                    }) => ((0, b.useEffect)((() => {
                        let e = !1;
                        return document.body.classList.contains("sticky-menu") && (e = !0, document.body.classList.remove("sticky-menu")), () => {
                            e && document.body.classList.add("sticky-menu")
                        }
                    }), []), (0, b.useEffect)((() => (e ? document.body.classList.add("is-fullscreen-mode") : document.body.classList.remove("is-fullscreen-mode"), () => {
                        e && document.body.classList.remove("is-fullscreen-mode")
                    })), [e]), null);

                function we({
                    children: e,
                    className: t,
                    ariaLabel: n,
                    as: r = "div",
                    ...o
                }) {
                    return (0, b.createElement)(r, {
                        className: x()("interface-navigable-region", t),
                        "aria-label": n,
                        role: "region",
                        tabIndex: "-1",
                        ...o
                    }, e)
                }
                const Se = {
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
                };
                var ke = (0, b.forwardRef)((function({
                        isDistractionFree: e,
                        footer: t,
                        header: n,
                        editorNotices: r,
                        sidebar: o,
                        secondarySidebar: i,
                        notices: s,
                        content: a,
                        actions: l,
                        labels: c,
                        className: u,
                        enableRegionNavigation: d = !0,
                        shortcuts: p
                    }, m) {
                        const f = (0, C.__unstableUseNavigateRegions)(p);
                        ! function(e) {
                            (0, b.useEffect)((() => {
                                const t = document && document.querySelector(`html:not(.${e})`);
                                if (t) return t.classList.toggle(e), () => {
                                    t.classList.toggle(e)
                                }
                            }), [e])
                        }("interface-interface-skeleton__html-container");
                        const h = {
                            /* translators: accessibility text for the top bar landmark region. */
                            header: (0, P.__)("Header"),
                            /* translators: accessibility text for the content landmark region. */
                            body: (0, P.__)("Content"),
                            /* translators: accessibility text for the secondary sidebar landmark region. */
                            secondarySidebar: (0, P.__)("Block Library"),
                            /* translators: accessibility text for the settings landmark region. */
                            sidebar: (0, P.__)("Settings"),
                            /* translators: accessibility text for the publish landmark region. */
                            actions: (0, P.__)("Publish"),
                            /* translators: accessibility text for the footer landmark region. */
                            footer: (0, P.__)("Footer"),
                            ...c
                        };
                        return (0, b.createElement)("div", {
                            ...d ? f : {},
                            ref: (0, O.useMergeRefs)([m, d ? f.ref : void 0]),
                            className: x()(u, "interface-interface-skeleton", f.className, !!t && "has-footer")
                        }, (0, b.createElement)("div", {
                            className: "interface-interface-skeleton__editor"
                        }, !!n && (0, b.createElement)(we, {
                            as: C.__unstableMotion.div,
                            className: "interface-interface-skeleton__header",
                            "aria-label": h.header,
                            initial: e ? "hidden" : "distractionFreeInactive",
                            whileHover: e ? "hover" : "distractionFreeInactive",
                            animate: e ? "hidden" : "distractionFreeInactive",
                            variants: Se,
                            transition: e ? {
                                type: "tween",
                                delay: .8
                            } : void 0
                        }, n), e && (0, b.createElement)("div", {
                            className: "interface-interface-skeleton__header"
                        }, r), (0, b.createElement)("div", {
                            className: "interface-interface-skeleton__body"
                        }, !!i && (0, b.createElement)(we, {
                            className: "interface-interface-skeleton__secondary-sidebar",
                            ariaLabel: h.secondarySidebar
                        }, i), !!s && (0, b.createElement)("div", {
                            className: "interface-interface-skeleton__notices"
                        }, s), (0, b.createElement)(we, {
                            className: "interface-interface-skeleton__content",
                            ariaLabel: h.body
                        }, a), !!o && (0, b.createElement)(we, {
                            className: "interface-interface-skeleton__sidebar",
                            ariaLabel: h.sidebar
                        }, o), !!l && (0, b.createElement)(we, {
                            className: "interface-interface-skeleton__actions",
                            ariaLabel: h.actions
                        }, l))), !!t && (0, b.createElement)(we, {
                            className: "interface-interface-skeleton__footer",
                            ariaLabel: h.footer
                        }, t))
                    })),
                    Te = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        fillRule: "evenodd",
                        d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
                        clipRule: "evenodd"
                    })),
                    xe = ({
                        sidebarName: e,
                        documentInspector: t
                    }) => {
                        const {
                            openGeneralSidebar: n
                        } = (0, S.useDispatch)("isolated/editor"), {
                            documentLabel: r
                        } = (0, S.useSelect)((e => ({
                            // translators: Default label for the Document sidebar tab, not selected.
                            documentLabel: t && "string" == typeof t ? t : (0, P._x)("Document", "noun")
                        })), []), [o, i] = "edit-post/document" === e ?
                            // translators: ARIA label for the Document sidebar tab, selected. %s: Document label.
                            [(0, P.sprintf)((0, P.__)("%s (selected)"), r), "is-active"] : [r, ""], [s, a] = "edit-post/block" === e ?
                            // translators: ARIA label for the Block Settings Sidebar tab, selected.
                            [(0, P.__)("Block (selected)"), "is-active"] :
                            // translators: ARIA label for the Block Settings Sidebar tab, not selected.
                            [(0, P.__)("Block"), ""];
                        return (0, b.createElement)("ul", null, !!t && (0, b.createElement)("li", null, (0, b.createElement)(C.Button, {
                            onClick: () => n("edit-post/document"),
                            className: `edit-post-sidebar__panel-tab ${i}`,
                            "aria-label": o,
                            "data-label": r
                        }, r)), (0, b.createElement)("li", null, (0, b.createElement)(C.Button, {
                                onClick: () => n("edit-post/block"),
                                className: `edit-post-sidebar__panel-tab ${a}`,
                                "aria-label": s,
                                "data-label": (0, P.__)("Block")
                            },
                            // translators: Text label for the Block Settings Sidebar tab.
                            (0, P.__)("Block"))))
                    };
                const {
                    Fill: Oe,
                    Slot: Ae
                } = (0, C.createSlotFill)("PluginDocumentSettingPanel"), Ie = ({
                    children: e
                }) => (0, b.createElement)(Oe, null, e);
                Ie.Slot = function(e) {
                    return (0, b.createElement)(Ae, null, (e => 0 === e.length ? (0, b.createElement)("span", {
                        className: "block-editor-block-inspector__no-blocks"
                    }, (0, P.__)("Nothing to display")) : e))
                };
                var Le = Ie;

                function Fe({
                    as: e = C.Button,
                    scope: t,
                    identifier: n,
                    icon: r,
                    selectedIcon: o,
                    name: i,
                    ...s
                }) {
                    const a = e,
                        l = (0, S.useSelect)((e => e(le).getActiveComplementaryArea(t) === n), [n]),
                        {
                            enableComplementaryArea: c,
                            disableComplementaryArea: u
                        } = (0, S.useDispatch)(le);
                    return (0, b.createElement)(a, {
                        icon: o && l ? o : r,
                        onClick: () => {
                            l ? u(t) : c(t, n)
                        },
                        ...s
                    })
                }
                var Me = ({
                    smallScreenTitle: e,
                    children: t,
                    className: n,
                    toggleButtonProps: r
                }) => {
                    const o = (0, b.createElement)(Fe, {
                        icon: z,
                        ...r
                    });
                    return (0, b.createElement)(b.Fragment, null, (0, b.createElement)("div", {
                        className: "components-panel__header interface-complementary-area-header__small"
                    }, e && (0, b.createElement)("span", {
                        className: "interface-complementary-area-header__small-title"
                    }, e), o), (0, b.createElement)("div", {
                        className: x()("components-panel__header", "interface-complementary-area-header", n),
                        tabIndex: -1
                    }, t, o))
                };

                function Be({
                    scope: e,
                    children: t,
                    className: n
                }) {
                    return (0, b.createElement)(C.Fill, {
                        name: `ComplementaryArea/${e}`
                    }, (0, b.createElement)("div", {
                        className: n
                    }, t))
                }

                function Re({
                    className: e,
                    children: t,
                    header: n,
                    headerClassName: r,
                    toggleShortcut: o,
                    closeLabel: i,
                    title: s,
                    identifier: a,
                    ...l
                }) {
                    const {
                        postTitle: c,
                        isActive: u
                    } = (0, S.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t
                        } = e(le), n = t("isolated/editor");
                        return {
                            postTitle: "",
                            showIconLabels: e("isolated/editor").isFeatureActive("showIconLabels"),
                            isActive: (r = n, ["edit-post/document", "edit-post/block"].includes(r))
                        };
                        var r
                    }), []);
                    return u ? (0, b.createElement)(Be, {
                        className: "interface-complementary-area",
                        scope: "isolated/editor"
                    }, (0, b.createElement)(Me, {
                        className: r,
                        smallScreenTitle: c || (0, P.__)("(no title)"),
                        toggleButtonProps: {
                            label: i,
                            shortcut: o,
                            scope: "isolated/editor",
                            identifier: a
                        }
                    }, n), (0, b.createElement)(C.Panel, {
                        className: "edit-post-sidebar"
                    }, t)) : null
                }
                var Pe = ({
                        documentInspector: e
                    }) => {
                        const {
                            sidebarName: t,
                            keyboardShortcut: n
                        } = (0, S.useSelect)((e => {
                            let t = e(le).getActiveComplementaryArea("isolated/editor");
                            return ["edit-post/document", "edit-post/block"].includes(t) || (t = "edit-post/document", e(B.store).getBlockSelectionStart() && (t = "edit-post/block")), {
                                sidebarName: t,
                                keyboardShortcut: e(k.store).getShortcutRepresentation("core/edit-post/toggle-sidebar")
                            }
                        }), []);
                        return (0, b.createElement)(Re, {
                            className: "iso-sidebar",
                            identifier: t,
                            header: (0, b.createElement)(xe, {
                                sidebarName: t,
                                documentInspector: e
                            }),
                            closeLabel: (0, P.__)("Close settings"),
                            headerClassName: "edit-post-sidebar__panel-tabs"
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            title: (0, P.__)("Settings"),
                            toggleShortcut: n,
                            icon: Te,
                            isActiveByDefault: !1
                        }, "edit-post/document" === t && (0, b.createElement)(Le.Slot, null), "edit-post/block" === t && (0, b.createElement)(B.BlockInspector, null))
                    },
                    Ne = window.wp.privateApis;
                const {
                    Fill: De,
                    Slot: Ve
                } = (0, C.createSlotFill)("IsolatedEditorHeading"), Ue = ({
                    children: e
                }) => (0, b.createElement)(De, null, e);
                Ue.Slot = function(e) {
                    return (0, b.createElement)(Ve, null, (e => e))
                };
                var He = Ue;
                const {
                    Fill: ze,
                    Slot: We
                } = (0, C.createSlotFill)("IsolatedFooter"), Ge = ({
                    children: e
                }) => (0, b.createElement)(ze, null, e);
                Ge.Slot = function(e) {
                    return (0, b.createElement)(We, null, (e => e))
                };
                var je = Ge;
                const {
                    lock: Ke,
                    unlock: Ye
                } = (0, Ne.__dangerousOptInToUnstableAPIsOnlyForCoreModules)("I know using unstable features means my plugin or theme will inevitably break on the next WordPress release.", "@wordpress/edit-post"), {
                    LayoutStyle: $e,
                    useLayoutClasses: Ze,
                    useLayoutStyles: qe
                } = Ye(B.privateApis);

                function Je({
                    children: e,
                    contentRef: t,
                    shouldIframe: n,
                    styles: r,
                    style: o
                }) {
                    const i = (0, B.__unstableUseMouseMoveTypingReset)();
                    return n ? (0, b.createElement)(B.__unstableIframe, {
                        ref: i,
                        contentRef: t,
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "block"
                        },
                        name: "editor-canvas"
                    }, (0, b.createElement)(B.__unstableEditorStyles, {
                        styles: r
                    }), e) : (0, b.createElement)(b.Fragment, null, (0, b.createElement)(B.__unstableEditorStyles, {
                        styles: r
                    }), (0, b.createElement)(B.WritingFlow, {
                        ref: t,
                        className: "editor-styles-wrapper",
                        style: {
                            flex: "1",
                            ...o
                        },
                        tabIndex: -1
                    }, e))
                }

                function Xe({
                    styles: e
                }) {
                    const {
                        deviceType: t,
                        isWelcomeGuideVisible: n,
                        isTemplateMode: r,
                        postContentAttributes: o,
                        editedPostTemplate: i = {},
                        wrapperBlockName: s,
                        wrapperUniqueId: a
                    } = (0, S.useSelect)((e => {
                        const {
                            isFeatureActive: t
                        } = e("isolated/editor"), {
                            getCurrentPostId: n,
                            getCurrentPostType: r,
                            getEditorSettings: o
                        } = e(v.store);
                        let i;
                        i = "wp_block" === r() ? "core/block" : "core/post-content";
                        const s = o();
                        return {
                            deviceType: "Desktop",
                            isWelcomeGuideVisible: t("welcomeGuide"),
                            isTemplateMode: !1,
                            postContentAttributes: o().postContentAttributes,
                            editedPostTemplate: void 0,
                            wrapperBlockName: i,
                            wrapperUniqueId: n(),
                            isBlockBasedTheme: s.__unstableIsBlockBasedTheme
                        }
                    }), []), {
                        isCleanNewPost: l
                    } = (0, S.useSelect)(v.store), {
                        themeHasDisabledLayoutStyles: c,
                        themeSupportsLayout: u
                    } = (0, S.useSelect)((e => {
                        const t = e(B.store).getSettings();
                        return {
                            themeHasDisabledLayoutStyles: t.disableLayoutStyles,
                            themeSupportsLayout: t.supportsLayout,
                            isFocusMode: t.focusMode
                        }
                    }), []), d = {
                        height: "100%",
                        width: "100%",
                        margin: 0,
                        display: "flex",
                        flexFlow: "column",
                        background: "white"
                    }, p = {
                        ...d,
                        borderRadius: "2px 2px 0 0",
                        border: "1px solid #ddd",
                        borderBottom: 0
                    }, m = (0, B.__experimentalUseResizeCanvas)(t, r), f = (0, B.useSetting)("layout"), h = "is-" + t.toLowerCase() + "-preview";
                    let g, E = r ? p : d;
                    m && (E = m), m || r || (g = "40vh");
                    const y = (0, b.useRef)(),
                        _ = (0, O.useMergeRefs)([y, (0, B.__unstableUseClipboardHandler)(), (0, B.__unstableUseTypewriter)(), (0, B.__unstableUseTypingObserver)(), (0, B.__unstableUseBlockSelectionClearer)()]),
                        w = (0, B.__unstableUseBlockSelectionClearer)(),
                        k = (0, b.useMemo)((() => r ? {
                            type: "default"
                        } : u ? {
                            ...f,
                            type: "constrained"
                        } : {
                            type: "default"
                        }), [r, u, f]),
                        T = (0, b.useMemo)((() => i?.content || i?.blocks ? i?.blocks ? getPostContentAttributes(i?.blocks) : getPostContentAttributes(parse("string" == typeof i?.content ? i?.content : "")) || {} : o), [i?.content, i?.blocks, o]),
                        A = T?.layout || {},
                        I = Ze(T, "core/post-content"),
                        L = x()({
                            "is-layout-flow": !u
                        }, u && I),
                        F = qe(T, "core/post-content", ".block-editor-block-list__layout.is-root-container"),
                        M = (0, b.useMemo)((() => A && ("constrained" === A?.type || A?.inherit || A?.contentSize || A?.wideSize) ? {
                            ...f,
                            ...A,
                            type: "constrained"
                        } : {
                            ...f,
                            ...A,
                            type: "default"
                        }), [A?.type, A?.inherit, A?.contentSize, A?.wideSize, f]),
                        R = o ? M : k,
                        P = (0, b.useRef)();
                    return (0, b.useEffect)((() => {
                        !n && l() && P?.current?.focus()
                    }), [n, l]), e = (0, b.useMemo)((() => [...e, {
                        css: ".edit-post-visual-editor__post-title-wrapper{margin-top:4rem}" + (g ? `body{padding-bottom:${g}}` : "")
                    }]), [e]), (0, b.createElement)(B.BlockTools, {
                        __unstableContentRef: y,
                        className: x()("edit-post-visual-editor", {
                            "is-template-mode": r
                        })
                    }, (0, b.createElement)(v.VisualEditorGlobalKeyboardShortcuts, null), (0, b.createElement)(C.__unstableMotion.div, {
                        className: "edit-post-visual-editor__content-area",
                        animate: {
                            padding: r ? "48px 48px 0" : 0
                        },
                        ref: w
                    }, (0, b.createElement)(C.__unstableMotion.div, {
                        animate: E,
                        initial: d,
                        className: h
                    }, (0, b.createElement)(Je, {
                        shouldIframe: r || "Tablet" === t || "Mobile" === t,
                        contentRef: _,
                        styles: e,
                        style: {}
                    }, u && !c && !r && (0, b.createElement)(b.Fragment, null, (0, b.createElement)($e, {
                        selector: ".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container",
                        layout: k,
                        layoutDefinitions: f?.definitions
                    }), F && (0, b.createElement)($e, {
                        layout: M,
                        css: F,
                        layoutDefinitions: f?.definitions
                    })), (0, b.createElement)(He.Slot, {
                        mode: "visual"
                    }), (0, b.createElement)(B.__experimentalRecursionProvider, {
                        blockName: s,
                        uniqueId: a
                    }, (0, b.createElement)(B.BlockList, {
                        className: r ? "wp-site-blocks" : `${L} wp-block-post-content`,
                        __experimentalLayout: R
                    })), (0, b.createElement)(je.Slot, {
                        mode: "visual"
                    })))))
                }
                var Qe = n(42);
                class et extends b.Component {
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
                        return (0, b.createElement)(b.Fragment, null, (0, b.createElement)("label", {
                            htmlFor: `post-content-${t}`,
                            className: "screen-reader-text"
                        }, (0, P.__)("Type text or HTML")), (0, b.createElement)(Qe.Z, {
                            autoComplete: "off",
                            dir: "auto",
                            value: e,
                            onChange: this.edit,
                            onBlur: this.stopEditing,
                            className: "editor-post-text-editor",
                            id: `post-content-${t}`,
                            placeholder: (0, P.__)("Start writing with text or HTML")
                        }))
                    }
                }
                var tt = (0, O.compose)([(0, S.withSelect)((e => {
                        const {
                            getBlocks: t
                        } = e("isolated/editor");
                        return {
                            value: (0, M.serialize)(t())
                        }
                    })), (0, S.withDispatch)((e => {
                        const {
                            updateBlocksWithoutUndo: t
                        } = e("isolated/editor");
                        return {
                            onChange(e) {
                                const n = (0, M.parse)(e);
                                t(n)
                            },
                            onPersist(e) {
                                const n = (0, M.parse)(e);
                                t(n)
                            }
                        }
                    })), O.withInstanceId])(et),
                    nt = function({}) {
                        return (0, b.createElement)("div", {
                            className: "edit-post-text-editor"
                        }, (0, b.createElement)("div", {
                            className: "edit-post-text-editor__body"
                        }, (0, b.createElement)(He.Slot, {
                            mode: "text"
                        }), (0, b.createElement)(tt, null), (0, b.createElement)(je.Slot, {
                            mode: "text"
                        })))
                    },
                    rt = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
                    })),
                    ot = (0, O.compose)([(0, S.withSelect)(((e, {
                        feature: t
                    }) => ({
                        isActive: e("isolated/editor").isFeatureActive(t)
                    }))), (0, S.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleFeature(t.feature), t.onClose()
                        }
                    }))), C.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: r,
                        messageActivated: o,
                        messageDeactivated: i,
                        speak: s
                    }) {
                        return (0, b.createElement)(C.MenuItem, {
                            icon: t && D,
                            isSelected: t,
                            onClick: (0, A.flow)(e, (() => {
                                s(t ? i || (0, P.__)("Feature deactivated") : o || (0, P.__)("Feature activated"))
                            })),
                            role: "menuitemcheckbox",
                            info: r
                        }, n)
                    })),
                    it = (0, O.compose)([(0, S.withSelect)(((e, {
                        option: t
                    }) => ({
                        isActive: e("isolated/editor").isOptionActive(t)
                    }))), (0, S.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleOption(t.option), t.onClose()
                        }
                    }))), C.withSpokenMessages])((function({
                        onToggle: e,
                        isActive: t,
                        label: n,
                        info: r
                    }) {
                        return (0, b.createElement)(C.MenuItem, {
                            icon: t && D,
                            isSelected: t,
                            onClick: e,
                            role: "menuitemcheckbox",
                            info: r
                        }, n)
                    })),
                    st = function({
                        onClose: e,
                        settings: t
                    }) {
                        const {
                            preview: n,
                            fullscreen: r,
                            topToolbar: o
                        } = t?.iso?.moreMenu || {}, {
                            isFullscreen: i
                        } = (0, S.useSelect)((e => ({
                            isFullscreen: e("isolated/editor").isOptionActive("fullscreenMode")
                        })), []);
                        return r || n || o ? (0, b.createElement)(C.MenuGroup, {
                            label: (0, P._x)("View", "noun")
                        }, o && (0, b.createElement)(b.Fragment, null, (0, b.createElement)(ot, {
                            feature: "fixedToolbar",
                            label: (0, P.__)("Top toolbar"),
                            info: (0, P.__)("Access all block and document tools in a single place."),
                            messageActivated: (0, P.__)("Top toolbar activated"),
                            messageDeactivated: (0, P.__)("Top toolbar deactivated"),
                            onClose: e
                        })), r && (0, b.createElement)(it, {
                            option: "fullscreenMode",
                            label: (0, P.__)("Fullscreen"),
                            info: (0, P.__)("Show editor fullscreen."),
                            onClose: e
                        }), n && !i && (0, b.createElement)(it, {
                            option: "preview",
                            label: (0, P.__)("Preview"),
                            info: (0, P.__)("Preview the content before posting."),
                            onClose: e
                        })) : null
                    },
                    at = (0, O.compose)([(0, S.withSelect)((e => {
                        const {
                            getEditorMode: t
                        } = e("isolated/editor"), {
                            codeEditingEnabled: n
                        } = e("core/editor").getEditorSettings();
                        return {
                            editorMode: t(),
                            isCodeEditingEnabled: n
                        }
                    })), (0, S.withDispatch)((e => ({
                        onSetMode(t) {
                            e("isolated/editor").setEditorMode(t)
                        }
                    })))])((function({
                        onClose: e,
                        editorMode: t,
                        onSetMode: n,
                        isCodeEditingEnabled: r,
                        settings: o
                    }) {
                        const i = t => {
                            n(t), e()
                        };
                        return r && !1 !== o?.iso?.moreMenu && o?.iso?.moreMenu?.editor ? (0, b.createElement)(C.MenuGroup, {
                            label: (0, P._x)("Editor", "noun")
                        }, (0, b.createElement)(C.MenuItem, {
                            icon: "visual" === t && D,
                            isSelected: "visual" === t,
                            onClick: () => i("visual"),
                            role: "menuitemcheckbox"
                        }, (0, P.__)("Visual editor")), (0, b.createElement)(C.MenuItem, {
                            icon: "text" === t && D,
                            isSelected: "text" === t,
                            onClick: () => i("text"),
                            role: "menuitemcheckbox"
                        }, (0, P.__)("Code editor"))) : null
                    })),
                    lt = function({
                        settings: e
                    }) {
                        const {
                            linkMenu: t = []
                        } = e.iso || {};
                        return 0 === t.length ? null : (0, b.createElement)(C.MenuGroup, {
                            label: (0, P.__)("Links")
                        }, t.map((({
                            title: e,
                            url: t
                        }) => (0, b.createElement)(C.MenuItem, {
                            key: e
                        }, (0, b.createElement)(C.ExternalLink, {
                            href: t
                        }, e)))))
                    };
                const ct = {
                        className: "edit-post-more-menu__content",
                        position: "bottom left"
                    },
                    ut = {
                        tooltipPosition: "bottom"
                    };
                var dt = ({
                        settings: e,
                        onClick: t,
                        renderMoreMenu: n
                    }) => (0, b.createElement)(C.DropdownMenu, {
                        className: "edit-post-more-menu",
                        icon: rt,
                        label: (0, P.__)("More tools & options"),
                        popoverProps: ct,
                        toggleProps: {
                            ...ut,
                            onClick: t
                        }
                    }, (({
                        onClose: t
                    }) => (0, b.createElement)(b.Fragment, null, n && n(e, t), (0, b.createElement)(at, {
                        onClose: t,
                        settings: e
                    }), (0, b.createElement)(st, {
                        onClose: t,
                        settings: e
                    }), (0, b.createElement)(lt, {
                        settings: e
                    })))),
                    pt = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"
                    })),
                    mt = (0, b.createElement)(N.SVG, {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, b.createElement)(N.Path, {
                        d: "M3 6h11v1.5H3V6Zm3.5 5.5h11V13h-11v-1.5ZM21 17H10v1.5h11V17Z"
                    })),
                    ft = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"
                    })),
                    ht = (0, b.forwardRef)((function(e, t) {
                        const n = (0, S.useSelect)((e => e("isolated/editor").hasEditorRedo()), []),
                            {
                                redo: r
                            } = (0, S.useDispatch)("isolated/editor");
                        return (0, b.createElement)(C.Button, {
                            ...e,
                            ref: t,
                            icon: ft,
                            label: (0, P.__)("Redo"),
                            shortcut: R.displayShortcut.primaryShift("z"),
                            "aria-disabled": !n,
                            onClick: n ? r : void 0,
                            className: "editor-history__redo"
                        })
                    })),
                    gt = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"
                    })),
                    Et = (0, b.forwardRef)((function(e, t) {
                        const n = (0, S.useSelect)((e => e("isolated/editor").hasEditorUndo()), []),
                            {
                                undo: r
                            } = (0, S.useDispatch)("isolated/editor");
                        return (0, b.createElement)(C.Button, {
                            ...e,
                            ref: t,
                            icon: gt,
                            label: (0, P.__)("Undo"),
                            shortcut: R.displayShortcut.primary("z"),
                            "aria-disabled": !n,
                            onClick: n ? r : void 0,
                            className: "editor-history__undo"
                        })
                    })),
                    bt = window.wp.dom;

                function yt() {
                    return (0, b.createElement)(C.SVG, {
                        width: "138",
                        height: "148",
                        viewBox: "0 0 138 148",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, b.createElement)(C.Rect, {
                        width: "138",
                        height: "148",
                        rx: "4",
                        fill: "#F0F6FC"
                    }), (0, b.createElement)(C.Line, {
                        x1: "44",
                        y1: "28",
                        x2: "24",
                        y2: "28",
                        stroke: "#DDDDDD"
                    }), (0, b.createElement)(C.Rect, {
                        x: "48",
                        y: "16",
                        width: "27",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, b.createElement)(C.Path, {
                        d: "M54.7585 32V23.2727H56.6037V26.8736H60.3494V23.2727H62.1903V32H60.3494V28.3949H56.6037V32H54.7585ZM67.4574 23.2727V32H65.6122V25.0241H65.5611L63.5625 26.277V24.6406L65.723 23.2727H67.4574Z",
                        fill: "black"
                    }), (0, b.createElement)(C.Line, {
                        x1: "55",
                        y1: "59",
                        x2: "24",
                        y2: "59",
                        stroke: "#DDDDDD"
                    }), (0, b.createElement)(C.Rect, {
                        x: "59",
                        y: "47",
                        width: "29",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, b.createElement)(C.Path, {
                        d: "M65.7585 63V54.2727H67.6037V57.8736H71.3494V54.2727H73.1903V63H71.3494V59.3949H67.6037V63H65.7585ZM74.6605 63V61.6705L77.767 58.794C78.0313 58.5384 78.2528 58.3082 78.4318 58.1037C78.6136 57.8991 78.7514 57.6989 78.8452 57.5028C78.9389 57.304 78.9858 57.0895 78.9858 56.8594C78.9858 56.6037 78.9276 56.3835 78.8111 56.1989C78.6946 56.0114 78.5355 55.8679 78.3338 55.7685C78.1321 55.6662 77.9034 55.6151 77.6477 55.6151C77.3807 55.6151 77.1477 55.669 76.9489 55.777C76.75 55.8849 76.5966 56.0398 76.4886 56.2415C76.3807 56.4432 76.3267 56.6832 76.3267 56.9616H74.5753C74.5753 56.3906 74.7045 55.8949 74.9631 55.4744C75.2216 55.054 75.5838 54.7287 76.0497 54.4986C76.5156 54.2685 77.0526 54.1534 77.6605 54.1534C78.2855 54.1534 78.8295 54.2642 79.2926 54.4858C79.7585 54.7045 80.1207 55.0085 80.3793 55.3977C80.6378 55.7869 80.767 56.233 80.767 56.7358C80.767 57.0653 80.7017 57.3906 80.571 57.7116C80.4432 58.0327 80.2145 58.3892 79.8849 58.7812C79.5554 59.1705 79.0909 59.6378 78.4915 60.1832L77.2173 61.4318V61.4915H80.8821V63H74.6605Z",
                        fill: "black"
                    }), (0, b.createElement)(C.Line, {
                        x1: "80",
                        y1: "90",
                        x2: "24",
                        y2: "90",
                        stroke: "#DDDDDD"
                    }), (0, b.createElement)(C.Rect, {
                        x: "84",
                        y: "78",
                        width: "30",
                        height: "23",
                        rx: "4",
                        fill: "#F0B849"
                    }), (0, b.createElement)(C.Path, {
                        d: "M90.7585 94V85.2727H92.6037V88.8736H96.3494V85.2727H98.1903V94H96.3494V90.3949H92.6037V94H90.7585ZM99.5284 92.4659V91.0128L103.172 85.2727H104.425V87.2841H103.683L101.386 90.919V90.9872H106.564V92.4659H99.5284ZM103.717 94V92.0227L103.751 91.3793V85.2727H105.482V94H103.717Z",
                        fill: "black"
                    }), (0, b.createElement)(C.Line, {
                        x1: "66",
                        y1: "121",
                        x2: "24",
                        y2: "121",
                        stroke: "#DDDDDD"
                    }), (0, b.createElement)(C.Rect, {
                        x: "70",
                        y: "109",
                        width: "29",
                        height: "23",
                        rx: "4",
                        fill: "#DDDDDD"
                    }), (0, b.createElement)(C.Path, {
                        d: "M76.7585 125V116.273H78.6037V119.874H82.3494V116.273H84.1903V125H82.3494V121.395H78.6037V125H76.7585ZM88.8864 125.119C88.25 125.119 87.6832 125.01 87.1861 124.791C86.6918 124.57 86.3011 124.266 86.0142 123.879C85.7301 123.49 85.5838 123.041 85.5753 122.533H87.4332C87.4446 122.746 87.5142 122.933 87.642 123.095C87.7727 123.254 87.946 123.378 88.1619 123.466C88.3778 123.554 88.6207 123.598 88.8906 123.598C89.1719 123.598 89.4205 123.548 89.6364 123.449C89.8523 123.349 90.0213 123.212 90.1435 123.036C90.2656 122.859 90.3267 122.656 90.3267 122.426C90.3267 122.193 90.2614 121.987 90.1307 121.808C90.0028 121.626 89.8182 121.484 89.5767 121.382C89.3381 121.28 89.054 121.229 88.7244 121.229H87.9105V119.874H88.7244C89.0028 119.874 89.2486 119.825 89.4616 119.729C89.6776 119.632 89.8452 119.499 89.9645 119.328C90.0838 119.155 90.1435 118.953 90.1435 118.723C90.1435 118.504 90.0909 118.312 89.9858 118.148C89.8835 117.98 89.7386 117.849 89.5511 117.756C89.3665 117.662 89.1506 117.615 88.9034 117.615C88.6534 117.615 88.4247 117.661 88.2173 117.751C88.0099 117.839 87.8438 117.966 87.7188 118.131C87.5938 118.295 87.527 118.489 87.5185 118.71H85.75C85.7585 118.207 85.902 117.764 86.1804 117.381C86.4588 116.997 86.8338 116.697 87.3054 116.482C87.7798 116.263 88.3153 116.153 88.9119 116.153C89.5142 116.153 90.0412 116.263 90.4929 116.482C90.9446 116.7 91.2955 116.996 91.5455 117.368C91.7983 117.737 91.9233 118.152 91.9205 118.612C91.9233 119.101 91.7713 119.509 91.4645 119.835C91.1605 120.162 90.7642 120.369 90.2756 120.457V120.526C90.9176 120.608 91.4063 120.831 91.7415 121.195C92.0795 121.555 92.2472 122.007 92.2443 122.55C92.2472 123.047 92.1037 123.489 91.8139 123.875C91.527 124.261 91.1307 124.565 90.625 124.787C90.1193 125.009 89.5398 125.119 88.8864 125.119Z",
                        fill: "black"
                    }))
                }

                function vt() {
                    const {
                        headingCount: e
                    } = (0, S.useSelect)((e => {
                        const {
                            getGlobalBlockCount: t
                        } = e(B.store);
                        return {
                            headingCount: t("core/heading")
                        }
                    }), []);
                    return (0, b.createElement)(b.Fragment, null, (0, b.createElement)("div", {
                        className: "edit-post-editor__list-view-overview"
                    }, (0, b.createElement)("div", null, (0, b.createElement)(C.__experimentalText, null, (0, P.__)("Characters:")), (0, b.createElement)(C.__experimentalText, null, (0, b.createElement)(v.CharacterCount, null))), (0, b.createElement)("div", null, (0, b.createElement)(C.__experimentalText, null, (0, P.__)("Words:")), (0, b.createElement)(v.WordCount, null)), (0, b.createElement)("div", null, (0, b.createElement)(C.__experimentalText, null, (0, P.__)("Time to read:")), (0, b.createElement)(v.TimeToRead, null))), e > 0 ? (0, b.createElement)(v.DocumentOutline, null) : (0, b.createElement)("div", {
                        className: "edit-post-editor__list-view-empty-headings"
                    }, (0, b.createElement)(yt, null), (0, b.createElement)("p", null, (0, P.__)("Navigate the structure of your document and address issues like empty or incorrect heading levels."))))
                }

                function _t({
                    canClose: e = !0
                }) {
                    const {
                        setIsListViewOpened: t
                    } = (0, S.useDispatch)("isolated/editor"), n = (0, O.useFocusOnMount)("firstElement"), r = (0, O.useFocusReturn)(), o = (0, O.useFocusReturn)(), [i, s] = (0, b.useState)("list-view"), a = (0, b.useRef)(), l = (0, b.useRef)(), c = (0, b.useRef)(), u = (0, b.useRef)();
                    return (0, k.useShortcut)("core/edit-post/toggle-list-view", (() => {
                        a.current.contains(a.current.ownerDocument.activeElement) ? t(!1) : function(e) {
                            if ("list-view" === e) {
                                const e = bt.focus.tabbable.find(u.current)[0];
                                (a.current.contains(e) ? e : l.current).focus()
                            } else c.current.focus()
                        }(i)
                    })), (0, b.createElement)("div", {
                        "aria-label": (0, P.__)("Document Overview"),
                        className: "edit-post-editor__document-overview-panel",
                        onKeyDown: function(e) {
                            e.keyCode !== R.ESCAPE || e.defaultPrevented || (e.preventDefault(), t(!1))
                        },
                        ref: a
                    }, (0, b.createElement)("div", {
                        className: "edit-post-editor__document-overview-panel-header components-panel__header edit-post-sidebar__panel-tabs",
                        ref: r
                    }, e && (0, b.createElement)(C.Button, {
                        icon: z,
                        label: (0, P.__)("Close Document Overview Sidebar"),
                        onClick: () => t(!1)
                    }), (0, b.createElement)("ul", null, (0, b.createElement)("li", null, (0, b.createElement)(C.Button, {
                        ref: l,
                        onClick: () => {
                            s("list-view")
                        },
                        className: x()("edit-post-sidebar__panel-tab", {
                            "is-active": "list-view" === i
                        }),
                        "aria-current": "list-view" === i
                    }, (0, P.__)("List View"))), (0, b.createElement)("li", null, (0, b.createElement)(C.Button, {
                        ref: c,
                        onClick: () => {
                            s("outline")
                        },
                        className: x()("edit-post-sidebar__panel-tab", {
                            "is-active": "outline" === i
                        }),
                        "aria-current": "outline" === i
                    }, (0, P.__)("Outline"))))), (0, b.createElement)("div", {
                        ref: (0, O.useMergeRefs)([o, n, u]),
                        className: "edit-post-editor__list-view-container"
                    }, "list-view" === i && (0, b.createElement)("div", {
                        className: "edit-post-editor__list-view-panel-content"
                    }, (0, b.createElement)(B.__experimentalListView, null)), "outline" === i && (0, b.createElement)(vt, null)))
                }
                var Ct = (0, b.forwardRef)((function({
                    isDisabled: e,
                    ...t
                }, n) {
                    const r = (0, S.useSelect)((e => !!e(B.store).getBlockCount()), []) && !e;
                    return (0, b.createElement)(C.Dropdown, {
                        contentClassName: "block-editor-block-navigation__popover",
                        position: "bottom right",
                        renderToggle: ({
                            isOpen: e,
                            onToggle: o
                        }) => (0, b.createElement)(C.Button, {
                            ...t,
                            ref: n,
                            icon: mt,
                            "aria-expanded": e,
                            "aria-haspopup": "true",
                            onClick: r ? o : void 0
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            label: (0, P.__)("List view"),
                            className: "block-editor-block-navigation",
                            "aria-disabled": !r
                        }),
                        renderContent: () => (0, b.createElement)(_t, {
                            canClose: !1
                        })
                    })
                }));
                const wt = e => {
                    e.preventDefault()
                };
                var St = function(e) {
                        const t = (0, b.useRef)(),
                            {
                                setIsInserterOpened: n,
                                setIsListViewOpened: r
                            } = (0, S.useDispatch)("isolated/editor"),
                            o = (0, O.useViewportMatch)("medium", "<"),
                            {
                                hasFixedToolbar: i,
                                isInserterEnabled: s,
                                isTextModeEnabled: a,
                                showIconLabels: l,
                                previewDeviceType: c,
                                isInserterOpened: u,
                                isListViewOpen: d,
                                listViewShortcut: p
                            } = (0, S.useSelect)((e => {
                                const {
                                    hasInserterItems: t,
                                    getBlockRootClientId: n,
                                    getBlockSelectionEnd: r
                                } = e("core/block-editor"), {
                                    isListViewOpened: o
                                } = e("isolated/editor"), {
                                    getShortcutRepresentation: i
                                } = e(k.store);
                                return {
                                    hasFixedToolbar: e("isolated/editor").isFeatureActive("fixedToolbar"),
                                    isInserterEnabled: "visual" === e("isolated/editor").getEditorMode() && e("core/editor").getEditorSettings().richEditingEnabled && t(n(r())),
                                    isListViewOpen: o(),
                                    isTextModeEnabled: "text" === e("isolated/editor").getEditorMode(),
                                    previewDeviceType: "Desktop",
                                    isInserterOpened: e("isolated/editor").isInserterOpened(),
                                    showIconLabels: !1,
                                    listViewShortcut: i("core/edit-post/toggle-list-view")
                                }
                            }), []),
                            m = (0, O.useViewportMatch)("medium"),
                            {
                                inserter: f,
                                navigation: h,
                                undo: g,
                                selectorTool: E
                            } = e.settings.iso.toolbar,
                            y = e.settings?.iso?.sidebar?.inserter || !1,
                            v = !m || "Desktop" !== c || i ? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
                            (0, P.__)("Document and block tools") : /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
                            (0, P.__)("Document tools"),
                            _ = (0, b.useCallback)((() => {
                                n(!u)
                            }), [u, n]),
                            w = (0, b.useCallback)((() => r(!d)), [r, d]);
                        return (0, b.createElement)(B.NavigableToolbar, {
                            className: "edit-post-header-toolbar",
                            "aria-label": v
                        }, (f || g || h || E) && (0, b.createElement)("div", {
                            className: "edit-post-header-toolbar__left"
                        }, f && (0, b.createElement)(C.ToolbarItem, {
                            ref: t,
                            as: C.Button,
                            className: "edit-post-header-toolbar__inserter-toggle",
                            isPressed: u,
                            onMouseDown: wt,
                            onClick: _,
                            disabled: !s,
                            isPrimary: !0,
                            icon: pt
                                /* translators: button label text should, if possible, be under 16
                                    characters. */
                                ,
                            label: (0, P._x)("Toggle block inserter", "Generic label for block inserter button"),
                            showTooltip: !l
                        }), u && !y && (0, b.createElement)(C.Popover, {
                            position: "bottom right",
                            onClose: () => n(!1),
                            anchor: t.current
                        }, (0, b.createElement)(B.__experimentalLibrary, {
                            showMostUsedBlocks: !1,
                            showInserterHelpPanel: !0,
                            onSelect: () => {
                                o && n(!1)
                            }
                        })), E && (0, b.createElement)(B.ToolSelector, null), g && (0, b.createElement)(C.ToolbarItem, {
                            as: Et,
                            showTooltip: !l,
                            variant: l ? "tertiary" : void 0
                        }), g && (0, b.createElement)(C.ToolbarItem, {
                            as: ht,
                            showTooltip: !l,
                            variant: l ? "tertiary" : void 0
                        }), h && !y && (0, b.createElement)(C.ToolbarItem, {
                            as: Ct,
                            isDisabled: a
                        }), h && y && (0, b.createElement)(C.ToolbarItem, {
                            as: C.Button,
                            className: "edit-post-header-toolbar__list-view-toggle",
                            icon: mt,
                            disabled: a,
                            isPressed: d
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            label: (0, P.__)("List View"),
                            onClick: w,
                            shortcut: p,
                            showTooltip: !l
                        })))
                    },
                    kt = function({
                        button: e,
                        onToggle: t
                    }) {
                        return (0, b.createElement)(C.Popover, {
                            position: "bottom left",
                            className: "iso-inspector",
                            anchor: e?.current,
                            onFocusOutside: function(e) {
                                null !== e.target.closest(".block-editor-block-inspector") || e.target.classList.contains("iso-inspector") || (t(!1), e.preventDefault(), e.stopPropagation())
                            }
                        }, (0, b.createElement)(_e.Slot, {
                            scope: "isolated/editor"
                        }))
                    };
                const {
                    Fill: Tt,
                    Slot: xt
                } = (0, C.createSlotFill)("IsolatedToolbar"), Ot = ({
                    children: e
                }) => (0, b.createElement)(Tt, null, e);
                Ot.Slot = function(e) {
                    return (0, b.createElement)(xt, null, (e => e))
                };
                var At = Ot,
                    It = e => {
                        const t = (0, b.useRef)(null),
                            {
                                settings: n,
                                editorMode: r,
                                renderMoreMenu: o
                            } = e,
                            i = (0, O.useViewportMatch)("huge", ">="),
                            {
                                inspector: s
                            } = n.iso?.toolbar || {},
                            {
                                moreMenu: a
                            } = n.iso || {},
                            l = n?.iso?.sidebar?.inspector || !1,
                            {
                                openGeneralSidebar: c,
                                closeGeneralSidebar: u
                            } = (0, S.useDispatch)("isolated/editor"),
                            {
                                setIsInserterOpened: d
                            } = (0, S.useDispatch)("isolated/editor"),
                            {
                                isEditorSidebarOpened: p,
                                isBlockSelected: m,
                                hasBlockSelected: f,
                                isInserterOpened: h,
                                isEditing: g
                            } = (0, S.useSelect)((e => ({
                                isEditing: e("isolated/editor"),
                                isEditorSidebarOpened: e("isolated/editor").isEditorSidebarOpened(),
                                isBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                hasBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                isInserterOpened: e("isolated/editor").isInserterOpened()
                            })), []);

                        function E(e) {
                            e ? c(f ? "edit-post/block" : "edit-post/document") : u()
                        }
                        return (0, b.useEffect)((() => {
                            l || u()
                        }), []), (0, b.useEffect)((() => {
                            l || g || m || !p || u()
                        }), [g]), (0, b.useEffect)((() => {
                            p && !i && d(!1)
                        }), [p, i]), (0, b.useEffect)((() => {
                            !h || i && l || u()
                        }), [h, i]), (0, b.createElement)("div", {
                            className: "edit-post-editor-regions__header",
                            role: "region",
                            tabIndex: -1
                        }, (0, b.createElement)("div", {
                            className: "edit-post-header"
                        }, (0, b.createElement)("div", {
                            className: "edit-post-header__toolbar"
                        }, (0, b.createElement)(St, {
                            settings: n
                        })), (0, b.createElement)("div", {
                            className: "edit-post-header__settings",
                            ref: t
                        }, (0, b.createElement)(At.Slot, null), s && (0, b.createElement)(C.Button, {
                            icon: Te,
                            label: (0, P.__)("Settings"),
                            onClick: () => E(!p),
                            isPressed: p,
                            "aria-expanded": p,
                            disabled: "text" === r
                        }), p && !l && (0, b.createElement)(kt, {
                            button: t,
                            onToggle: E
                        }), a && (0, b.createElement)(dt, {
                            settings: n,
                            onClick: () => u(),
                            renderMoreMenu: o
                        }))))
                    },
                    Lt = (0, b.createElement)(N.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, b.createElement)(N.Path, {
                        d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
                    }));

                function Ft() {
                    const {
                        setIsInserterOpened: e
                    } = (0, S.useDispatch)("isolated/editor"), t = (0, O.useViewportMatch)("medium", "<"), n = t ? "div" : C.VisuallyHidden, [r, o] = (0, O.__experimentalUseDialog)({
                        onClose: () => e(!1),
                        focusOnMount: null
                    });
                    return (0, b.createElement)("div", {
                        ref: r,
                        ...o,
                        className: "edit-post-editor__inserter-panel"
                    }, (0, b.createElement)(n, {
                        className: "edit-post-editor__inserter-panel-header"
                    }, (0, b.createElement)(C.Button, {
                        icon: Lt,
                        onClick: () => e(!1)
                    })), (0, b.createElement)("div", {
                        className: "edit-post-editor__inserter-panel-content"
                    }, (0, b.createElement)(B.__experimentalLibrary, {
                        showMostUsedBlocks: !1,
                        showInserterHelpPanel: !0,
                        shouldFocusBlock: t
                    })))
                }
                var Mt = ({
                    editorMode: e
                }) => {
                    const t = (0, O.useViewportMatch)("medium", "<"),
                        {
                            showBlockBreadcrumbs: n,
                            documentLabel: r
                        } = (0, S.useSelect)((e => {
                            const {
                                getPostTypeLabel: t
                            } = e(v.store), n = t(), {
                                isFeatureActive: r
                            } = e("isolated/editor");
                            return {
                                hasFixedToolbar: r("fixedToolbar"),
                                showBlockBreadcrumbs: !1,
                                // translators: Default label for the Document in the Block Breadcrumb.
                                documentLabel: n || (0, P._x)("Document", "noun")
                            }
                        }), []);
                    return (0, b.createElement)("div", {
                        className: "edit-post-layout__footer"
                    }, n && !t && "visual" === e && (0, b.createElement)(B.BlockBreadcrumb, {
                        rootLabelText: r
                    }), (0, b.createElement)(je.Slot, null))
                };
                const {
                    Fill: Bt,
                    Slot: Rt
                } = (0, C.createSlotFill)("IsolatedFooter"), Pt = ({
                    children: e
                }) => (0, b.createElement)(Bt, null, e);
                Pt.Slot = function() {
                    return (0, b.createElement)(Rt, null, (e => e))
                };
                var Nt = Pt;
                const Dt = {
                    secondarySidebar: (0, P.__)("Block library"),
                    /* translators: accessibility text for the editor top bar landmark region. */
                    header: (0, P.__)("Editor top bar"),
                    /* translators: accessibility text for the editor content landmark region. */
                    body: (0, P.__)("Editor content"),
                    /* translators: accessibility text for the editor settings landmark region. */
                    sidebar: (0, P.__)("Editor settings"),
                    /* translators: accessibility text for the editor publish landmark region. */
                    actions: (0, P.__)("Editor publish"),
                    /* translators: accessibility text for the editor footer landmark region. */
                    footer: (0, P.__)("Editor footer")
                };
                var Vt = (0, S.withDispatch)((e => {
                        const {
                            redo: t,
                            undo: n
                        } = e("isolated/editor");
                        return {
                            redo: t,
                            undo: n
                        }
                    }))((function(e) {
                        var t, n, r;
                        const {
                            isEditing: o,
                            editorMode: i,
                            children: s,
                            undo: a,
                            redo: l,
                            settings: c,
                            renderMoreMenu: u
                        } = e, d = (0, O.useViewportMatch)("medium", "<"), p = c?.iso?.sidebar?.inspector || !1, m = c?.iso?.sidebar?.inserter || !1, f = null === (t = c?.iso?.header) || void 0 === t || t, h = c?.iso?.footer || !1, {
                            sidebarIsOpened: g,
                            hasFixedToolbar: E,
                            isInserterOpened: y,
                            isListViewOpened: _,
                            showIconLabels: w,
                            isFullscreenActive: T,
                            previousShortcut: A,
                            nextShortcut: I
                        } = (0, S.useSelect)((e => {
                            const {
                                isFeatureActive: t,
                                isInserterOpened: n,
                                isListViewOpened: r,
                                isOptionActive: o
                            } = e("isolated/editor");
                            return {
                                sidebarIsOpened: !!e(le).getActiveComplementaryArea("isolated/editor"),
                                hasFixedToolbar: t("fixedToolbar"),
                                isInserterOpened: n(),
                                isListViewOpened: r(),
                                isFullscreenActive: o("fullscreenMode"),
                                showIconLabels: t("showIconLabels"),
                                previousShortcut: e(k.store).getAllShortcutKeyCombinations("core/edit-post/previous-region"),
                                nextShortcut: e(k.store).getAllShortcutKeyCombinations("core/edit-post/next-region")
                            }
                        }), []), L = x()("edit-post-layout", "is-mode-" + i, {
                            "is-sidebar-opened": g,
                            "has-fixed-toolbar": E,
                            "show-icon-labels": w
                        });
                        (0, b.useEffect)((() => {
                            const e = document.querySelector("html");
                            return T ? e.classList.add("is-fullscreen-mode") : e.classList.remove("is-fullscreen-mode"), () => {
                                e && e.classList.remove("is-fullscreen-mode")
                            }
                        }), [T]);
                        const F = f ? (0, b.createElement)(It, {
                                editorMode: i,
                                settings: c,
                                renderMoreMenu: u
                            }) : null,
                            M = null !== (n = c?.iso?.sidebar?.customComponent) && void 0 !== n ? n : Pe;
                        return (0, b.createElement)(b.Fragment, null, (0, b.createElement)(M, {
                            documentInspector: null !== (r = c?.iso?.toolbar?.documentInspector) && void 0 !== r && r
                        }), (0, b.createElement)(Ce, {
                            isActive: T
                        }), (0, b.createElement)(ke, {
                            className: L,
                            labels: Dt,
                            header: F,
                            secondarySidebar: m ? "visual" === i && y ? (0, b.createElement)(Ft, null) : "visual" === i && _ ? (0, b.createElement)(_t, null) : null : null,
                            sidebar: (!d || g) && p && (0, b.createElement)(_e.Slot, {
                                scope: "isolated/editor"
                            }),
                            notices: (0, b.createElement)(v.EditorSnackbars, null),
                            content: (0, b.createElement)(b.Fragment, null, (0, b.createElement)(v.EditorNotices, null), o && (0, b.createElement)(b.Fragment, null, (0, b.createElement)(B.BlockEditorKeyboardShortcuts, null), (0, b.createElement)(B.BlockEditorKeyboardShortcuts.Register, null)), (0, b.createElement)(C.KeyboardShortcuts, {
                                bindGlobal: !1,
                                shortcuts: {
                                    [R.rawShortcut.primary("z")]: a,
                                    [R.rawShortcut.primaryShift("z")]: l
                                }
                            }, "visual" === i && (0, b.createElement)(Xe, {
                                styles: []
                            }), "text" === i && (0, b.createElement)(nt, null)), s),
                            footer: h && (0, b.createElement)(Mt, {
                                editorMode: i
                            }),
                            actions: (0, b.createElement)(Nt.Slot, null),
                            shortcuts: {
                                previous: A,
                                next: I
                            }
                        }))
                    })),
                    Ut = (0, O.compose)([(0, S.withSelect)(((e, t) => {
                        var n;
                        const {
                            getBlocks: r,
                            getEditorSelection: o,
                            getEditorMode: i,
                            isEditing: s
                        } = e("isolated/editor");
                        return {
                            blocks: null !== (n = t.blocks) && void 0 !== n ? n : r(),
                            selection: o(),
                            isEditing: s(),
                            editorMode: i()
                        }
                    })), (0, S.withDispatch)(((e, t) => {
                        const {
                            updateBlocksWithUndo: n,
                            updateBlocksWithoutUndo: r
                        } = e("isolated/editor"), {
                            onInput: o,
                            onChange: i
                        } = t;
                        return {
                            onChange: (...e) => {
                                i?.(...e), n(...e)
                            },
                            onInput: (...e) => {
                                o?.(...e), r(...e)
                            }
                        }
                    }))])((function(e) {
                        const {
                            blocks: t,
                            onInput: n,
                            onChange: r,
                            selection: o,
                            isEditing: i,
                            editorMode: s
                        } = e, {
                            children: a,
                            settings: l,
                            renderMoreMenu: c,
                            onLoad: u
                        } = e;
                        return (0, b.useEffect)((() => {
                            (async () => {
                                const e = await async function(e, t) {
                                    var n;
                                    return (!(n = t) || "object" != typeof n && "function" != typeof n || "function" != typeof n.then ? new Promise((e => {
                                        e(t ? t(M.parse, M.rawHandler) : [])
                                    })) : t).then((t => function(e, t, n, r) {
                                        if (void 0 === e) return r;
                                        if (r && r.length > 0) return r;
                                        if (t) {
                                            const n = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                                            if (n) return (0, M.parse)(n.content)
                                        }
                                        return n ? (0, M.synchronizeBlocksWithTemplate)(r, n) : []
                                    }(e.iso.patterns, e.iso.currentPattern, e.editor.template, t)))
                                }(l, u);
                                e.length > 0 && (!t || 0 === t.length) && n(e, {
                                    isInitialContent: !0
                                })
                            })()
                        }), []), (0, b.createElement)(B.BlockEditorProvider, {
                            value: t || [],
                            onInput: n,
                            onChange: r,
                            useSubRegistry: !1,
                            selection: o,
                            settings: l.editor
                        }, (0, b.createElement)(Vt, {
                            isEditing: i,
                            editorMode: s,
                            settings: l,
                            renderMoreMenu: c
                        }, a), (0, b.createElement)(C.Popover.Slot, null))
                    }));

                function Ht(e, t) {
                    const n = ["core/block-editor", "core/editor"];
                    return {
                        dispatch(t) {
                            return null === Ht.targetDispatch || -1 === n.indexOf(t) ? e.dispatch(t) : Ht.targetDispatch(t)
                        },
                        select(t) {
                            return null === Ht.targetSelect || -1 === n.indexOf(t) ? e.select(t) : Ht.targetSelect(t)
                        }
                    }
                }
                Ht.targetSelect = null, Ht.targetDispatch = null, Ht.setEditor = function(e, t) {
                    this.targetSelect = e, this.targetDispatch = t
                }, Ht.resetEditor = function() {
                    this.targetSelect = null, this.targetDispatch = null
                };
                var zt = Ht,
                    Wt = (0, O.compose)([(0, S.withSelect)((e => {
                        const {
                            isEditing: t
                        } = e("isolated/editor");
                        return {
                            isEditing: t()
                        }
                    })), (0, S.withDispatch)(((e, t, {
                        select: n
                    }) => ({
                        hotSwap: t => {
                            zt.resetEditor(), t && zt.setEditor(n, e)
                        }
                    })))])((function({
                        isEditing: e,
                        hotSwap: t
                    }) {
                        return (0, b.useEffect)((() => {
                            t(e)
                        }), [e]), null
                    })),
                    Gt = (0, O.compose)([(0, S.withSelect)((e => {
                        const {
                            isEditorReady: t,
                            getEditorMode: n,
                            isEditing: r,
                            isFeatureActive: o,
                            isOptionActive: i
                        } = e("isolated/editor");
                        return {
                            isEditorReady: t(),
                            editorMode: n(),
                            isEditing: r(),
                            hasFixedToolbar: o("fixedToolbar"),
                            isPreview: i("preview")
                        }
                    })), (0, S.withDispatch)((e => {
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
                            className: r,
                            onError: o,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: a,
                            onChange: l,
                            blocks: c
                        } = e, {
                            isEditorReady: u,
                            editorMode: d,
                            isEditing: p,
                            setEditing: m,
                            hasFixedToolbar: f,
                            isPreview: h
                        } = e, [g, {
                            width: E
                        }] = (0, O.useResizeObserver)(), y = x()(r, {
                            "iso-editor": !0,
                            "is-large": !!E && E >= 720,
                            "is-medium": !E || E >= 480 && E < 720,
                            "is-small": !!E && E < 480,
                            "iso-editor__loading": !u,
                            "iso-editor__selected": p,
                            "block-editor": !0,
                            "edit-post-layout": !0,
                            "has-fixed-toolbar": f,
                            ["is-mode-" + d]: !0,
                            "is-preview-mode": h
                        });
                        return (0, b.createElement)("div", {
                            className: y
                        }, (0, b.createElement)(v.ErrorBoundary, {
                            onError: o
                        }, (0, b.createElement)(Wt, null), g, (0, b.createElement)(F, {
                            onOutside: () => m(!1),
                            onFocus: () => !p && m(!0)
                        }, (0, b.createElement)(Ut, {
                            blocks: c,
                            settings: n,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: a,
                            onChange: l
                        }, t))))
                    }));
                const jt = "@@redux-undo/UNDO",
                    Kt = "@@redux-undo/REDO",
                    Yt = "@@redux-undo/JUMP_TO_FUTURE",
                    $t = "@@redux-undo/JUMP_TO_PAST",
                    Zt = "@@redux-undo/JUMP",
                    qt = "@@redux-undo/CLEAR_HISTORY",
                    Jt = {
                        undo() {
                            return {
                                type: jt
                            }
                        },
                        redo() {
                            return {
                                type: Kt
                            }
                        },
                        jumpToFuture(e) {
                            return {
                                type: Yt,
                                index: e
                            }
                        },
                        jumpToPast(e) {
                            return {
                                type: $t,
                                index: e
                            }
                        },
                        jump(e) {
                            return {
                                type: Zt,
                                index: e
                            }
                        },
                        clearHistory() {
                            return {
                                type: qt
                            }
                        }
                    };

                function Xt(e, t = []) {
                    return Array.isArray(e) ? e : "string" == typeof e ? [e] : t
                }

                function Qt(e, t, n, r = null) {
                    return {
                        past: e,
                        present: t,
                        future: n,
                        group: r,
                        _latestUnfiltered: t,
                        index: e.length,
                        limit: e.length + n.length + 1
                    }
                }
                let en, tn;
                const nn = "#9E9E9E",
                    rn = "#03A9F4",
                    on = "#4CAF50";

                function sn(e, t, n) {
                    return [`%c${e}`, `color: ${t}; font-weight: bold`, n]
                }

                function an(e) {
                    en && (console.group ? tn.next = sn("next history", on, e) : tn.next = ["next history", e], function() {
                        const {
                            header: e,
                            prev: t,
                            next: n,
                            action: r,
                            msgs: o
                        } = tn;
                        console.group ? (console.groupCollapsed(...e), console.log(...t), console.log(...r), console.log(...n), console.log(...o), console.groupEnd()) : (console.log(...e), console.log(...t), console.log(...r), console.log(...n), console.log(...o))
                    }())
                }

                function ln(...e) {
                    en && (tn.msgs = tn.msgs.concat([...e, "\n"]))
                }

                function cn(e, t) {
                    const n = Qt([], e, []);
                    return t && (n._latestUnfiltered = null), n
                }

                function un(e, t) {
                    if (t < 0 || t >= e.future.length) return e;
                    const {
                        past: n,
                        future: r,
                        _latestUnfiltered: o
                    } = e;
                    return Qt([...n, o, ...r.slice(0, t)], r[t], r.slice(t + 1))
                }

                function dn(e, t) {
                    if (t < 0 || t >= e.past.length) return e;
                    const {
                        past: n,
                        future: r,
                        _latestUnfiltered: o
                    } = e, i = n.slice(0, t), s = [...n.slice(t + 1), o, ...r];
                    return Qt(i, n[t], s)
                }

                function pn(e, t) {
                    return t > 0 ? un(e, t - 1) : t < 0 ? dn(e, e.past.length + t) : e
                }
                var mn = window.wp.isShallowEqual,
                    fn = n.n(mn);
                const hn = {
                    editCount: 0,
                    selection: null,
                    blocks: null
                };

                function gn(e, t) {
                    return e.find((e => e.clientId === t.clientId))
                }

                function En(e, t) {
                    const {
                        type: n,
                        selection: r
                    } = e;
                    if ("UPDATE_BLOCKS_WITHOUT_UNDO" === n) return !1;
                    if (!r) return !0;
                    if (fn()(r, t.selection)) {
                        const n = gn(t.blocks, r.selectionStart),
                            o = gn(e.blocks, r.selectionStart);
                        if (n && o && fn()(n.attributes, o.attributes)) return !1
                    }
                    return !0
                }
                var bn = function(e, t = {}) {
                        ! function(e) {
                            en = e
                        }(t.debug);
                        const n = {
                                limit: void 0,
                                filter: () => !0,
                                groupBy: () => null,
                                undoType: jt,
                                redoType: Kt,
                                jumpToPastType: $t,
                                jumpToFutureType: Yt,
                                jumpType: Zt,
                                neverSkipReducer: !1,
                                ignoreInitialState: !1,
                                syncFilter: !1,
                                ...t,
                                initTypes: Xt(t.initTypes, ["@@redux-undo/INIT"]),
                                clearHistoryType: Xt(t.clearHistoryType, [qt])
                            },
                            r = n.neverSkipReducer ? (t, n, ...r) => ({
                                ...t,
                                present: e(t.present, n, ...r)
                            }) : e => e;
                        let o;
                        return (t = o, i = {}, ...s) => {
                            ! function(e, t) {
                                tn = {
                                    header: [],
                                    prev: [],
                                    action: [],
                                    next: [],
                                    msgs: []
                                }, en && (console.group ? (tn.header = ["%credux-undo", "font-style: italic", "action", e.type], tn.action = sn("action", rn, e), tn.prev = sn("prev history", nn, t)) : (tn.header = ["redux-undo action", e.type], tn.action = ["action", e], tn.prev = ["prev history", t]))
                            }(i, t);
                            let a, l = t;
                            if (!o) {
                                if (ln("history is uninitialized"), void 0 === t) return l = cn(e(t, {
                                    type: "@@redux-undo/CREATE_HISTORY"
                                }, ...s), n.ignoreInitialState), ln("do not set initialState on probe actions"), an(l), l;
                                ! function(e) {
                                    return typeof e.present < "u" && typeof e.future < "u" && typeof e.past < "u" && Array.isArray(e.future) && Array.isArray(e.past)
                                }(t) ? (l = o = cn(t, n.ignoreInitialState), ln("initialHistory initialized: initialState is not a history", o)) : (l = o = n.ignoreInitialState ? t : Qt(t.past, t.present, t.future), ln("initialHistory initialized: initialState is a history", o))
                            }
                            switch (i.type) {
                                case void 0:
                                    return l;
                                case n.undoType:
                                    return a = pn(l, -1), ln("perform undo"), an(a), r(a, i, ...s);
                                case n.redoType:
                                    return a = pn(l, 1), ln("perform redo"), an(a), r(a, i, ...s);
                                case n.jumpToPastType:
                                    return a = dn(l, i.index), ln(`perform jumpToPast to ${i.index}`), an(a), r(a, i, ...s);
                                case n.jumpToFutureType:
                                    return a = un(l, i.index), ln(`perform jumpToFuture to ${i.index}`), an(a), r(a, i, ...s);
                                case n.jumpType:
                                    return a = pn(l, i.index), ln(`perform jump to ${i.index}`), an(a), r(a, i, ...s);
                                case
                                function(e, t) {
                                    return t.indexOf(e) > -1 ? e : !e
                                }(i.type, n.clearHistoryType):
                                    return a = cn(l.present, n.ignoreInitialState), ln("perform clearHistory"), an(a), r(a, i, ...s);
                                default:
                                    if (a = e(l.present, i, ...s), n.initTypes.some((e => e === i.type))) return ln("reset history due to init action"), an(o), o;
                                    if (l._latestUnfiltered === a) return l;
                                    if ("function" == typeof n.filter && !n.filter(i, a, l)) {
                                        const e = Qt(l.past, a, l.future, l.group);
                                        return n.syncFilter || (e._latestUnfiltered = l._latestUnfiltered), ln("filter ignored action, not storing it in past"), an(e), e
                                    }
                                    const t = n.groupBy(i, a, l);
                                    if (null != t && t === l.group) {
                                        const e = Qt(l.past, a, l.future, l.group);
                                        return ln("groupBy grouped the action with the previous action"), an(e), e
                                    }
                                    return l = function(e, t, n, r) {
                                        const o = e.past.length + 1;
                                        ln("inserting", t), ln("new free: ", n - o);
                                        const {
                                            past: i,
                                            _latestUnfiltered: s
                                        } = e, a = n && n <= o, l = i.slice(a ? 1 : 0);
                                        return Qt(null != s ? [...l, s] : l, t, [], r)
                                    }(l, a, n.limit, t), ln("inserted new state into history"), an(l), l
                            }
                        }
                    }(((e = hn, t) => {
                        switch (t.type) {
                            case "UPDATE_BLOCKS_WITHOUT_UNDO":
                            case "UPDATE_BLOCKS_WITH_UNDO":
                                return {
                                    ...e, editCount: En(t, e) ? e.editCount + 1 : e.editCount, blocks: t.blocks, selection: t.selection
                                }
                        }
                        return e
                    }), {
                        groupBy: (e, t, n) => t.editCount
                    }),
                    yn = {
                        * undo() {
                            return yield Jt.undo()
                        },
                        * redo() {
                            return yield Jt.redo()
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
                    };
                const vn = {
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

                function Cn(e, t, n) {
                    const r = [(0, M.serialize)((0, M.createBlock)("core/paragraph")), (0, M.serialize)((0, M.createBlock)("core/paragraph", {
                            className: ""
                        }))],
                        o = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                    return o && r.push((0, M.serialize)((0, M.parse)(o.content))), n && r.push((0, M.serialize)((0, M.synchronizeBlocksWithTemplate)([], n))), r
                }
                var wn = (e = vn, t) => {
                    switch (t.type) {
                        case "SETUP_EDITOR": {
                            const {
                                currentPattern: n,
                                patterns: r
                            } = t.settings.iso;
                            return {
                                ...e,
                                patterns: r,
                                currentPattern: n,
                                ignoredContent: Cn(r, n, t.settings.editor.template),
                                gutenbergTemplate: t.settings.editor.template,
                                settings: {
                                    ...e.settings,
                                    ...t.settings.iso
                                }
                            }
                        }
                        case "SET_CURRENT_PATTERN":
                            return {
                                ...e, currentPattern: t.pattern, ignoredContent: Cn(e.patterns, t.pattern, e.gutenbergTemplate)
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
                };
                const Sn = {
                    setReady(e) {
                        return {
                            type: "SET_EDITOR_READY",
                            isReady: e
                        }
                    },
                    setEditorMode(e) {
                        return {
                            type: "SET_EDITOR_MODE",
                            editorMode: e
                        }
                    },
                    setupEditor(e) {
                        return {
                            type: "SETUP_EDITOR",
                            settings: e
                        }
                    },
                    setCurrentPattern(e) {
                        return {
                            type: "SET_CURRENT_PATTERN",
                            pattern: e
                        }
                    },
                    setIsInserterOpened(e) {
                        return {
                            type: "SET_INSERTER_OPEN",
                            isOpen: e
                        }
                    },
                    setDeviceType(e) {
                        return {
                            type: "SET_DEVICE_TYPE",
                            deviceType: e
                        }
                    },
                    setCanvasStyles(e) {
                        return {
                            type: "SET_CANVAS_STYLES",
                            canvasStyles: e
                        }
                    },
                    setIsIframePreview(e) {
                        return {
                            type: "SET_IFRAME_PREVIEW",
                            isIframePreview: e
                        }
                    },
                    setEditing(e) {
                        return {
                            type: "SET_EDITING",
                            isEditing: e
                        }
                    },
                    * openGeneralSidebar(e) {
                        yield S.controls.dispatch(le, "enableComplementaryArea", "isolated/editor", e)
                    },
                    * closeGeneralSidebar() {
                        yield S.controls.dispatch(le, "disableComplementaryArea", "isolated/editor")
                    },
                    setIsListViewOpened(e) {
                        return {
                            type: "SET_LISTVIEW_OPEN",
                            isOpen: e
                        }
                    }
                };
                var kn = Sn,
                    Tn = (e, t) => {
                        if ("TOGGLE_FEATURE" === t.type) {
                            const {
                                preferencesKey: n,
                                ...r
                            } = e, o = {
                                ...r,
                                [t.feature]: !e[t.feature] || !e[t.feature]
                            };
                            return n && window.localStorage && localStorage.setItem(n, JSON.stringify(o)), {
                                preferencesKey: n,
                                ...o
                            }
                        }
                        return e
                    },
                    xn = {
                        toggleFeature(e) {
                            return {
                                type: "TOGGLE_FEATURE",
                                feature: e
                            }
                        }
                    };
                const On = {};
                var An = (e = On, t) => "TOGGLE_OPTION" === t.type ? {
                        ...e,
                        [t.option]: !e[t.option] || !e[t.option]
                    } : e,
                    In = {
                        toggleOption(e) {
                            return {
                                type: "TOGGLE_OPTION",
                                option: e
                            }
                        }
                    };

                function Ln(e) {
                    return e.editor.editorMode
                }

                function Fn(e) {
                    return e.editor.settings
                }

                function Mn(e) {
                    return e.editor.isReady
                }

                function Bn(e) {
                    return e.editor.currentPattern
                }

                function Rn(e) {
                    const {
                        currentPattern: t,
                        patterns: n
                    } = e.editor;
                    if (t && n)
                        for (let e = 0; e < n.length; e++)
                            if (n[e].name === t) return n[e];
                    return null
                }

                function Pn(e) {
                    return e.editor.ignoredContent
                }

                function Nn(e, t) {
                    const {
                        patterns: n = []
                    } = e.editor;
                    let r = n.find((e => e.name === t));
                    return r || (r = n.find((e => e.name.replace("p2/", "") === t)), r || null)
                }

                function Dn(e) {
                    return e.editor.isInserterOpened
                }
                const Vn = (0, S.createRegistrySelector)((e => () => {
                    const t = e(le).getActiveComplementaryArea("isolated/editor");
                    return (0, A.includes)(["edit-post/document", "edit-post/block"], t)
                }));

                function Un(e) {
                    return e.editor.isEditing
                }

                function Hn(e) {
                    return e.editor.patterns
                }

                function zn(e) {
                    return e.editor.isListViewOpened
                }

                function Wn(e) {
                    return e.editor.deviceType
                }

                function Gn(e) {
                    return e.editor.canvasStyles
                }

                function jn(e) {
                    return e.editor.isIframePreview || ["Tablet", "Mobile"].includes(e.editor.deviceType)
                }

                function Kn(e) {
                    return e.blocks.present.blocks
                }

                function Yn(e) {
                    return e.blocks.present.selection
                }

                function $n(e) {
                    return "visual" === Ln(e) && (e.collab?.undoManager ? !!e.collab.undoManager.undoStack.length : e.blocks.past.length > 0)
                }

                function Zn(e) {
                    return "visual" === Ln(e) && (e.collab?.undoManager ? !!e.collab.undoManager.redoStack.length : e.blocks.future.length > 0)
                }

                function qn(e) {
                    return e.blocks.present.editCount
                }

                function Jn(e, t) {
                    return !!e.preferences[t] && e.preferences[t]
                }

                function Xn(e, t) {
                    return !!e.options[t] && e.options[t]
                }

                function Qn(e) {
                    return {
                        type: "SET_COLLAB_YJS_DOC",
                        doc: e
                    }
                }

                function er(e) {
                    return {
                        type: "SET_COLLAB_UNDO_MANAGER",
                        undoManager: e
                    }
                }

                function tr(e) {
                    return e.collab.yDoc
                }

                function nr(e) {
                    return e.collab.undoManager
                }

                function rr(e) {
                    return {
                        type: "SET_AVAILABLE_COLLAB_PEERS",
                        peers: e
                    }
                }

                function or(e, t) {
                    return {
                        type: "SET_COLLAB_PEER_SELECTION",
                        peerId: e,
                        selection: t
                    }
                }

                function ir(e) {
                    return e.collabPeers
                }

                function sr(e) {
                    return Object.keys(e.collabPeers).length > 0
                }
                const ar = n(227)("iso-editor:collab:undo"),
                    lr = e => {
                        const {
                            clientId: t,
                            attributeKey: n
                        } = e.select("core/block-editor").getSelectionStart();
                        return "string" == typeof n ? {
                            clientId: t,
                            attributeKey: n
                        } : void 0
                    },
                    cr = (0, S.createRegistryControl)((e => t => {
                        const n = e.select("isolated/editor").getYDoc();
                        return n && !t.isTriggeredByYDoc && n.applyLocalChangesToYDoc({
                            blocks: t.blocks
                        }, {
                            isInitialContent: t.isInitialContent,
                            richTextHint: lr(e)
                        }), t
                    }));
                var ur = {
                        UPDATE_BLOCKS_WITH_UNDO: cr,
                        UPDATE_BLOCKS_WITHOUT_UNDO: cr,
                        [Jt.undo().type]: (0, S.createRegistryControl)((e => t => {
                            const n = e.select("isolated/editor").getUndoManager();
                            if (!n) return ar("Undoing from redux-undo state"), t;
                            ar("Undoing from yjs undoManager"), ar("undo"), n.undo()
                        })),
                        [Jt.redo().type]: (0, S.createRegistryControl)((e => t => {
                            if (!e.select("isolated/editor").getUndoManager()) return t;
                            ar("redo"), e.select("isolated/editor").getUndoManager().redo()
                        }))
                    },
                    dr = (e = {}, t) => {
                        switch (t.type) {
                            case "SET_COLLAB_YJS_DOC":
                                return {
                                    ...e, yDoc: t.doc
                                };
                            case "SET_COLLAB_UNDO_MANAGER":
                                return {
                                    ...e, undoManager: t.undoManager
                                }
                        }
                        return e
                    },
                    pr = (e = {}, t) => {
                        switch (t.type) {
                            case "SET_COLLAB_PEER_SELECTION":
                                return e[t.peerId] ? {
                                    ...e,
                                    [t.peerId]: {
                                        ...e[t.peerId],
                                        ...t.selection
                                    }
                                } : e;
                            case "SET_AVAILABLE_COLLAB_PEERS":
                                return t.peers.reduce(((t, {
                                    id: n,
                                    name: r,
                                    color: o,
                                    avatarUrl: i
                                }) => (t[n] = e[n] || {
                                    name: r,
                                    color: o,
                                    avatarUrl: i
                                }, t)), {})
                        }
                        return e
                    };

                function* mr(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCK_TO_STATIC",
                            clientId: e
                        }
                    }(e)
                }

                function* fr(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCKS_TO_REUSABLE",
                            clientIds: e
                        }
                    }(e)
                }

                function* hr(e) {
                    yield function(e) {
                        return {
                            type: "DELETE_REUSABLE_BLOCK",
                            id: e
                        }
                    }(e)
                }

                function gr(e, t) {
                    return {
                        type: "SET_EDITING_REUSABLE_BLOCK",
                        clientId: e,
                        isEditing: t
                    }
                }

                function Er(e, t) {
                    return e.isEditingReusableBlock[t]
                }
                var br = {
                    actions: m,
                    controls: {
                        CONVERT_BLOCK_TO_STATIC: (0, S.createRegistryControl)((e => ({
                            clientId: t
                        }) => {
                            const n = e.select("core/block-editor").getBlock(t),
                                r = e.select("core").getEditedEntityRecord("postType", "wp_block", n.attributes.ref),
                                o = (0, M.parse)(r.content);
                            e.dispatch("core/block-editor").replaceBlocks(n.clientId, o)
                        })),
                        CONVERT_BLOCKS_TO_REUSABLE: (0, S.createRegistryControl)((e => async function({
                            clientIds: t
                        }) {
                            const n = {
                                    title: (0, P.__)("Untitled Reusable Block"),
                                    content: (0, M.serialize)(e.select("core/block-editor").getBlocksByClientId(t)),
                                    status: "publish"
                                },
                                r = await e.dispatch("core").saveEntityRecord("postType", "wp_block", n),
                                o = (0, M.createBlock)("core/block", {
                                    ref: r.id
                                });
                            e.dispatch("core/block-editor").replaceBlocks(t, o), e.dispatch(reusableBlocksStore).__experimentalSetEditingReusableBlock(o.clientId, !0)
                        })),
                        DELETE_REUSABLE_BLOCK: (0, S.createRegistryControl)((e => async function({
                            id: t
                        }) {
                            if (!e.select("core").getEditedEntityRecord("postType", "wp_block", t)) return;
                            const n = e.select("core/block-editor").getBlocks().filter((e => (0, M.isReusableBlock)(e) && e.attributes.ref === t)).map((e => e.clientId));
                            n.length && e.dispatch("core/block-editor").removeBlocks(n), await e.dispatch("core").deleteEntityRecord("postType", "wp_block", t)
                        }))
                    },
                    reducer: (0, S.combineReducers)({
                        isEditingReusableBlock: function(e = {}, t) {
                            return "SET_EDITING_REUSABLE_BLOCK" === t?.type ? {
                                ...e,
                                [t.clientId]: t.isEditing
                            } : e
                        }
                    }),
                    selectors: f
                };
                const yr = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    vr = (e, t) => ({
                        registry: n,
                        dispatch: r
                    }) => {
                        t && (n.select(j.store).get(e, "isComplementaryAreaVisible") || n.dispatch(j.store).set(e, "isComplementaryAreaVisible", !0), r({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    _r = e => ({
                        registry: t
                    }) => {
                        t.select(j.store).get(e, "isComplementaryAreaVisible") && t.dispatch(j.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    Cr = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const r = n.select(j.store).get(e, "pinnedItems");
                        !0 !== r?.[t] && n.dispatch(j.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !0
                        })
                    },
                    wr = (e, t) => ({
                        registry: n
                    }) => {
                        if (!t) return;
                        const r = n.select(j.store).get(e, "pinnedItems");
                        n.dispatch(j.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !1
                        })
                    };

                function Sr(e, t) {
                    return function({
                        registry: n
                    }) {
                        G()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), n.dispatch(j.store).toggle(e, t)
                    }
                }

                function kr(e, t, n) {
                    return function({
                        registry: r
                    }) {
                        G()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), r.dispatch(j.store).set(e, t, !!n)
                    }
                }

                function Tr(e, t) {
                    return function({
                        registry: n
                    }) {
                        G()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), n.dispatch(j.store).setDefaults(e, t)
                    }
                }
                const xr = (0, S.createRegistrySelector)((e => (t, n) => {
                        const r = e(j.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== r) return r ? t?.complementaryAreas?.[n] : null
                    })),
                    Or = (0, S.createRegistrySelector)((e => (t, n, r) => {
                        var o;
                        const i = e(j.store).get(n, "pinnedItems");
                        return null === (o = i?.[r]) || void 0 === o || o
                    })),
                    Ar = (0, S.createRegistrySelector)((e => (t, n, r) => (G()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(j.store).get(n, r))));
                var Ir = {
                    reducer: (0, S.combineReducers)({
                        complementaryAreas: function(e = {}, t) {
                            switch (t.type) {
                                case "SET_DEFAULT_COMPLEMENTARY_AREA": {
                                    const {
                                        scope: n,
                                        area: r
                                    } = t;
                                    return e[n] ? e : {
                                        ...e,
                                        [n]: r
                                    }
                                }
                                case "ENABLE_COMPLEMENTARY_AREA": {
                                    const {
                                        scope: n,
                                        area: r
                                    } = t;
                                    return {
                                        ...e,
                                        [n]: r
                                    }
                                }
                            }
                            return e
                        }
                    }),
                    actions: h,
                    selectors: g
                };
                let Lr = [];
                const Fr = (0, O.createHigherOrderComponent)((e => (0, S.withRegistry)((t => {
                    const {
                        registry: n,
                        settings: r,
                        ...o
                    } = t, m = function(e) {
                        var t, n, r, o, i, s, a, l, c, u, d, p, m, f, h, g, E, b, y, v;
                        const {
                            iso: _,
                            editor: C
                        } = e;
                        return {
                            iso: {
                                preferencesKey: null !== (t = _?.preferencesKey) && void 0 !== t ? t : null,
                                persistenceKey: null !== (n = _?.persistenceKey) && void 0 !== n ? n : null,
                                disallowEmbed: null !== (r = _?.disallowEmbed) && void 0 !== r ? r : [],
                                customStores: null !== (o = _?.customStores) && void 0 !== o ? o : [],
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
                                footer: null !== (u = _?.footer) && void 0 !== u && u,
                                moreMenu: (w = _?.moreMenu, S = {
                                    editor: !1,
                                    fullscreen: !1,
                                    preview: !1,
                                    topToolbar: !1,
                                    ...null !== (d = _?.moreMenu) && void 0 !== d ? d : {}
                                }, !1 !== w && S),
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
                                titlePlaceholder: (0, P.__)("Add title"),
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
                                ...C,
                                bodyPlaceholder: null !== (b = C?.bodyPlaceholder) && void 0 !== b ? b : (0, P.__)("Start writing or type / to choose a block"),
                                availableLegacyWidgets: {},
                                hasPermissionsToManageWidgets: !1,
                                fetchLinkSuggestions: (null !== (y = C?.fetchLinkSuggestions) && void 0 !== y ? y : C?.__experimentalFetchLinkSuggestions) ? null !== (v = C?.fetchLinkSuggestions) && void 0 !== v ? v : C?.__experimentalFetchLinkSuggestions : () => []
                            }
                        };
                        var w, S
                    }(r), {
                        persistenceKey: f,
                        preferencesKey: h,
                        defaultPreferences: g,
                        customStores: E = []
                    } = m.iso || {}, [y, _] = (0, b.useState)(null);
                    return (0, b.useEffect)((() => {
                        const e = (0, S.createRegistry)({
                            "core/reusable-blocks": br,
                            "core/interface": Ir
                        }, n);
                        f && e.use(S.plugins.persistence, {
                            persistenceKey: f
                        });
                        const t = e.registerStore("isolated/editor", function(e, t) {
                                return {
                                    reducer: (0, S.combineReducers)({
                                        blocks: bn,
                                        editor: wn,
                                        preferences: Tn,
                                        options: An,
                                        collab: dr,
                                        collabPeers: pr
                                    }),
                                    actions: {
                                        ...yn,
                                        ...kn,
                                        ...In,
                                        ...xn,
                                        ...c,
                                        ...d
                                    },
                                    selectors: {
                                        ...s,
                                        ...i,
                                        ...a,
                                        ...l,
                                        ...u,
                                        ...p
                                    },
                                    controls: {
                                        ...ur
                                    },
                                    persist: ["preferences"],
                                    initialState: {
                                        preferences: {
                                            preferencesKey: e,
                                            ...e && localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : t
                                        }
                                    }
                                }
                            }(h, g)),
                            r = e.registerStore("core/block-editor", {
                                ...B.storeConfig,
                                persist: ["preferences"]
                            }),
                            o = e.registerStore("core/editor", {
                                ...v.storeConfig,
                                selectors: {
                                    ...v.storeConfig.selectors,
                                    ...(m = v.storeConfig.selectors, b = e.select, {
                                        getEditedPostAttribute: (e, t) => "content" === t ? (0, M.serialize)(b("core/block-editor").getBlocks()) : m.getEditedPostAttribute(e, t),
                                        getEditedPostContent: () => (0, M.serialize)(b("core/block-editor").getBlocks())
                                    })
                                },
                                persist: ["preferences"]
                            });
                        var m, b;
                        return E.map((t => {
                                Lr.push(e.registerStore(t.name, t.config))
                            })), Lr.push(t), Lr.push(r), Lr.push(o), _(e),
                            function() {
                                Lr = Lr.filter((e => e !== t))
                            }
                    }), [n]), y ? (0, b.createElement)(S.RegistryProvider, {
                        value: y
                    }, (0, b.createElement)(e, {
                        ...o,
                        settings: m
                    })) : null
                }))), "withRegistryProvider");
                var Mr = Fr;

                function Br(e, t) {
                    return e && e.allowBlocks && e.allowBlocks.length > 0 ? e.allowBlocks : t.map((e => e.name))
                }

                function Rr(e, t, n, r) {
                    const o = (i = t.blocks) && i.disallowBlocks ? i.disallowBlocks : [];
                    var i;
                    return {
                        ...e,
                        hasFixedToolbar: r,
                        allowedBlockTypes: Br(t.blocks, n).filter((e => -1 === o.indexOf(e)))
                    }
                }
                var Pr = (0, O.compose)([(0, S.withSelect)((e => {
                        const {
                            getCurrentPattern: t
                        } = e("isolated/editor");
                        return {
                            currentPattern: t()
                        }
                    })), (0, S.withDispatch)((e => {
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
                        } = e, r = (0, b.useRef)(null);
                        return (0, b.useEffect)((() => {
                            null !== t && r.current !== t ? (r.current = t.name, setTimeout((() => {
                                n((0, M.parse)(t.content))
                            }), 0)) : r.current = t
                        }), [t]), null
                    })),
                    Nr = function(e) {
                        const {
                            onSaveBlocks: t,
                            onSaveContent: n
                        } = e, r = (0, b.useRef)(!0), {
                            setReady: o
                        } = (0, S.useDispatch)("isolated/editor"), {
                            blocks: i,
                            ignoredContent: s
                        } = (0, S.useSelect)((e => ({
                            blocks: e("isolated/editor").getBlocks(),
                            ignoredContent: e("isolated/editor").getIgnoredContent()
                        })), []);

                        function a() {
                            t?.(i, s), n?.((0, M.serialize)(i))
                        }
                        return (0, b.useEffect)((() => {
                            i ? r.current ? (r.current = !1, o(!0), i && i.length > 1 && a()) : a() : o(!0)
                        }), [i]), null
                    },
                    Dr = window.wp.apiFetch,
                    Vr = n.n(Dr);

                function Ur({
                    undoManager: e
                } = {}) {
                    const {
                        setUndoManager: t
                    } = (0, S.useDispatch)("isolated/editor");
                    (0, b.useEffect)((() => {
                        t(e)
                    }), [e]), window.isoInitialisedBlocks || (window.isoInitialised || ((0, w.registerCoreBlocks)(), window.isoInitialised = !0), (0, S.use)(zt, {}), Vr().use(Vr().createPreloadingMiddleware({
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
                var Hr, zr = Mr((function(e) {
                        const {
                            children: t,
                            onSaveContent: n,
                            onSaveBlocks: r,
                            __experimentalUndoManager: o,
                            __experimentalOnInput: i,
                            __experimentalOnChange: s,
                            __experimentalValue: a,
                            __experimentalOnSelection: l,
                            ...c
                        } = e;
                        Ur({
                            undoManager: o
                        });
                        const u = function(e) {
                                const {
                                    undo: t,
                                    setupEditor: n
                                } = (0, S.useDispatch)("isolated/editor"), {
                                    updateEditorSettings: r,
                                    setupEditorState: o
                                } = (0, S.useDispatch)("core/editor"), {
                                    updateSettings: i
                                } = (0, S.useDispatch)("core/block-editor"), {
                                    isEditing: s,
                                    topToolbar: a,
                                    currentSettings: l
                                } = (0, S.useSelect)((n => {
                                    const {
                                        isEditing: r,
                                        isFeatureActive: o
                                    } = n("isolated/editor"), {
                                        getBlockTypes: i
                                    } = n(M.store), s = i(), a = o("fixedToolbar");
                                    return {
                                        isEditing: r(),
                                        topToolbar: a,
                                        currentSettings: {
                                            ...e,
                                            editor: {
                                                ...Rr(e.editor, e.iso, s, void 0 !== e.iso?.defaultPreferences?.fixedToolbar ? e.iso?.defaultPreferences?.fixedToolbar : a),
                                                __experimentalReusableBlocks: [],
                                                __experimentalFetchReusableBlocks: !1,
                                                __experimentalUndo: t
                                            }
                                        }
                                    }
                                }), [e]);
                                return (0, b.useEffect)((() => {
                                    var e;
                                    void 0 === window.__editorAssets && (window.__editorAssets = {
                                        styles: "",
                                        scripts: ""
                                    }), n(l), i((e = l).editor), r(e.editor), o({
                                        id: 0,
                                        type: "post"
                                    }, [])
                                }), []), (0, b.useEffect)((() => {
                                    s && i(l)
                                }), [s, a, l?.editor?.reusableBlocks]), e
                            }(e.settings),
                            d = (0, S.useSelect)((e => ({
                                start: e("core/block-editor").getSelectionStart(),
                                end: e("core/block-editor").getSelectionEnd()
                            })), []);
                        return (0, b.useEffect)((() => {
                            l?.(d)
                        }), [d]), (0, b.createElement)(b.StrictMode, null, (0, b.createElement)(k.ShortcutProvider, null, (0, b.createElement)(Nr, {
                            onSaveBlocks: r,
                            onSaveContent: n
                        }), (0, b.createElement)(Pr, null), (0, b.createElement)(C.SlotFillProvider, null, (0, b.createElement)(Gt, {
                            ...c,
                            onInput: i,
                            onChange: s,
                            blocks: a,
                            settings: u
                        }, t))))
                    })),
                    Wr = function({
                        onLoaded: e,
                        onLoading: t
                    }) {
                        const {
                            isEditorReady: n
                        } = (0, S.useSelect)((e => ({
                            isEditorReady: e("isolated/editor").isEditorReady()
                        })), []);
                        return (0, b.useEffect)((() => {
                            n ? e && e() : t && t()
                        }), [n]), null
                    },
                    Gr = window.wp.domReady;
                const jr = (e, t) => {
                    if ("POST" === e.method && "/wp/v2/media" === e.path) {
                        const t = e.body;
                        t instanceof FormData && t.has("post") && "null" === t.get("post") && t.delete("post")
                    }
                    return t(e)
                };
                n.n(Gr)()((() => {
                    Vr().use(jr)
                }));
                const Kr = {
                    iso: {
                        moreMenu: !1
                    }
                };
                window.wp = {
                    ...null !== (Hr = window.wp) && void 0 !== Hr ? Hr : {},
                    attachEditor: function(e, t = {}) {
                        if ("textarea" !== e.type.toLowerCase()) return;
                        const n = document.createElement("div");
                        n.classList.add("editor"), e.parentNode.insertBefore(n, e.nextSibling), e.style.display = "none";
                        var r = {
                            ...Kr,
                            ...t
                        };
                        r?.iso?.noToolbar && n.classList.add("no-toolbar"), r?.editor?.enableUpload && (r.editor.mediaUpload = v.mediaUpload), r?.editor?.enableLibrary && (0, _.addFilter)("editor.MediaUpload", "acfe/media-upload", (() => y.MediaUpload)), r.iso.blocks.allowBlocks && r.iso.blocks.allowBlocks.length > 0 && (r.editor.allowedBlockTypes = r.iso.blocks.allowBlocks), (0, b.createRoot)(n).render((0, E.createElement)(zr, {
                            settings: r,
                            onLoad: (t, n) => function(e, t, n) {
                                return -1 !== e.indexOf("\x3c!--") ? t(e) : n({
                                    HTML: e
                                })
                            }(e.value, t, n),
                            onSaveContent: t => function(e, t) {
                                t.value = e
                            }(t, e),
                            onError: () => document.location.reload(),
                            __experimentalOnInput: e => r?.iso.__experimentalOnInput?.(e),
                            __experimentalOnChange: e => r?.iso.__experimentalOnChange?.(e),
                            __experimentalOnSelection: e => r?.iso.__experimentalOnSelection?.(e),
                            className: r?.iso?.className
                        }, (0, E.createElement)(Wr, {
                            onLoaded: () => function(e) {
                                const t = e.closest(".iso-editor__loading");
                                t && t.classList.remove("iso-editor__loading")
                            }(e)
                        })))
                    },
                    detachEditor: function(e) {
                        const t = e.nextSibling;
                        t && t.classList.contains("editor") && ((0, b.unmountComponentAtNode)(t), e.style.display = null, t.parentNode.removeChild(t))
                    }
                }
            },
            184: function(e, t) {
                var n;
                ! function() {
                    "use strict";
                    var r = {}.hasOwnProperty;

                    function o() {
                        for (var e = [], t = 0; t < arguments.length; t++) {
                            var n = arguments[t];
                            if (n) {
                                var i = typeof n;
                                if ("string" === i || "number" === i) e.push(n);
                                else if (Array.isArray(n)) {
                                    if (n.length) {
                                        var s = o.apply(null, n);
                                        s && e.push(s)
                                    }
                                } else if ("object" === i) {
                                    if (n.toString !== Object.prototype.toString && !n.toString.toString().includes("[native code]")) {
                                        e.push(n.toString());
                                        continue
                                    }
                                    for (var a in n) r.call(n, a) && n[a] && e.push(a)
                                }
                            }
                        }
                        return e.join(" ")
                    }
                    e.exports ? (o.default = o, e.exports = o) : void 0 === (n = function() {
                        return o
                    }.apply(t, [])) || (e.exports = n)
                }()
            },
            934: function(e) {
                e.exports = function(e, t, n) {
                    return ((n = window.getComputedStyle) ? n(e) : e.currentStyle)[t.replace(/-(\w)/gi, (function(e, t) {
                        return t.toUpperCase()
                    }))]
                }
            },
            227: function(e, t, n) {
                t.formatArgs = function(t) {
                    if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
                    const n = "color: " + this.color;
                    t.splice(1, 0, n, "color: inherit");
                    let r = 0,
                        o = 0;
                    t[0].replace(/%[a-zA-Z%]/g, (e => {
                        "%%" !== e && (r++, "%c" === e && (o = r))
                    })), t.splice(o, 0, n)
                }, t.save = function(e) {
                    try {
                        e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
                    } catch (e) {}
                }, t.load = function() {
                    let e;
                    try {
                        e = t.storage.getItem("debug")
                    } catch (e) {}
                    return !e && "undefined" != typeof process && "env" in process && (e = process.env.DEBUG), e
                }, t.useColors = function() {
                    return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
                }, t.storage = function() {
                    try {
                        return localStorage
                    } catch (e) {}
                }(), t.destroy = (() => {
                    let e = !1;
                    return () => {
                        e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
                    }
                })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => {}), e.exports = n(447)(t);
                const {
                    formatters: r
                } = e.exports;
                r.j = function(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                }
            },
            447: function(e, t, n) {
                e.exports = function(e) {
                    function t(e) {
                        let n, o, i, s = null;

                        function a(...e) {
                            if (!a.enabled) return;
                            const r = a,
                                o = Number(new Date),
                                i = o - (n || o);
                            r.diff = i, r.prev = n, r.curr = o, n = o, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                            let s = 0;
                            e[0] = e[0].replace(/%([a-zA-Z%])/g, ((n, o) => {
                                if ("%%" === n) return "%";
                                s++;
                                const i = t.formatters[o];
                                if ("function" == typeof i) {
                                    const t = e[s];
                                    n = i.call(r, t), e.splice(s, 1), s--
                                }
                                return n
                            })), t.formatArgs.call(r, e), (r.log || t.log).apply(r, e)
                        }
                        return a.namespace = e, a.useColors = t.useColors(), a.color = t.selectColor(e), a.extend = r, a.destroy = t.destroy, Object.defineProperty(a, "enabled", {
                            enumerable: !0,
                            configurable: !1,
                            get: () => null !== s ? s : (o !== t.namespaces && (o = t.namespaces, i = t.enabled(e)), i),
                            set: e => {
                                s = e
                            }
                        }), "function" == typeof t.init && t.init(a), a
                    }

                    function r(e, n) {
                        const r = t(this.namespace + (void 0 === n ? ":" : n) + e);
                        return r.log = this.log, r
                    }

                    function o(e) {
                        return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
                    }
                    return t.debug = t, t.default = t, t.coerce = function(e) {
                        return e instanceof Error ? e.stack || e.message : e
                    }, t.disable = function() {
                        const e = [...t.names.map(o), ...t.skips.map(o).map((e => "-" + e))].join(",");
                        return t.enable(""), e
                    }, t.enable = function(e) {
                        let n;
                        t.save(e), t.namespaces = e, t.names = [], t.skips = [];
                        const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                            o = r.length;
                        for (n = 0; n < o; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.slice(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
                    }, t.enabled = function(e) {
                        if ("*" === e[e.length - 1]) return !0;
                        let n, r;
                        for (n = 0, r = t.skips.length; n < r; n++)
                            if (t.skips[n].test(e)) return !1;
                        for (n = 0, r = t.names.length; n < r; n++)
                            if (t.names[n].test(e)) return !0;
                        return !1
                    }, t.humanize = n(824), t.destroy = function() {
                        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
                    }, Object.keys(e).forEach((n => {
                        t[n] = e[n]
                    })), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function(e) {
                        let n = 0;
                        for (let t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
                        return t.colors[Math.abs(n) % t.colors.length]
                    }, t.enable(t.load()), t
                }
            },
            303: function(e, t, n) {
                var r = n(934);
                e.exports = function(e) {
                    var t = r(e, "line-height"),
                        n = parseFloat(t, 10);
                    if (t === n + "") {
                        var o = e.style.lineHeight;
                        e.style.lineHeight = t + "em", t = r(e, "line-height"), n = parseFloat(t, 10), o ? e.style.lineHeight = o : delete e.style.lineHeight
                    }
                    if (-1 !== t.indexOf("pt") ? (n *= 4, n /= 3) : -1 !== t.indexOf("mm") ? (n *= 96, n /= 25.4) : -1 !== t.indexOf("cm") ? (n *= 96, n /= 2.54) : -1 !== t.indexOf("in") ? n *= 96 : -1 !== t.indexOf("pc") && (n *= 16), n = Math.round(n), "normal" === t) {
                        var i = e.nodeName,
                            s = document.createElement(i);
                        s.innerHTML = "&nbsp;", "TEXTAREA" === i.toUpperCase() && s.setAttribute("rows", "1");
                        var a = r(e, "font-size");
                        s.style.fontSize = a, s.style.padding = "0px", s.style.border = "0px";
                        var l = document.body;
                        l.appendChild(s), n = s.offsetHeight, l.removeChild(s)
                    }
                    return n
                }
            },
            824: function(e) {
                var t = 1e3,
                    n = 60 * t,
                    r = 60 * n,
                    o = 24 * r;

                function i(e, t, n, r) {
                    var o = t >= 1.5 * n;
                    return Math.round(e / n) + " " + r + (o ? "s" : "")
                }
                e.exports = function(e, s) {
                    s = s || {};
                    var a, l, c = typeof e;
                    if ("string" === c && e.length > 0) return function(e) {
                        if (!((e = String(e)).length > 100)) {
                            var i = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                            if (i) {
                                var s = parseFloat(i[1]);
                                switch ((i[2] || "ms").toLowerCase()) {
                                    case "years":
                                    case "year":
                                    case "yrs":
                                    case "yr":
                                    case "y":
                                        return 315576e5 * s;
                                    case "weeks":
                                    case "week":
                                    case "w":
                                        return 6048e5 * s;
                                    case "days":
                                    case "day":
                                    case "d":
                                        return s * o;
                                    case "hours":
                                    case "hour":
                                    case "hrs":
                                    case "hr":
                                    case "h":
                                        return s * r;
                                    case "minutes":
                                    case "minute":
                                    case "mins":
                                    case "min":
                                    case "m":
                                        return s * n;
                                    case "seconds":
                                    case "second":
                                    case "secs":
                                    case "sec":
                                    case "s":
                                        return s * t;
                                    case "milliseconds":
                                    case "millisecond":
                                    case "msecs":
                                    case "msec":
                                    case "ms":
                                        return s;
                                    default:
                                        return
                                }
                            }
                        }
                    }(e);
                    if ("number" === c && isFinite(e)) return s.long ? (a = e, (l = Math.abs(a)) >= o ? i(a, l, o, "day") : l >= r ? i(a, l, r, "hour") : l >= n ? i(a, l, n, "minute") : l >= t ? i(a, l, t, "second") : a + " ms") : function(e) {
                        var i = Math.abs(e);
                        return i >= o ? Math.round(e / o) + "d" : i >= r ? Math.round(e / r) + "h" : i >= n ? Math.round(e / n) + "m" : i >= t ? Math.round(e / t) + "s" : e + "ms"
                    }(e);
                    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
                }
            },
            703: function(e, t, n) {
                "use strict";
                var r = n(414);

                function o() {}

                function i() {}
                i.resetWarningCache = o, e.exports = function() {
                    function e(e, t, n, o, i, s) {
                        if (s !== r) {
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
                        resetWarningCache: o
                    };
                    return n.PropTypes = n, n
                }
            },
            697: function(e, t, n) {
                e.exports = n(703)()
            },
            414: function(e) {
                "use strict";
                e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
            },
            857: function(e, t, n) {
                "use strict";
                var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
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
                            r(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, new __)
                        }),
                    i = this && this.__assign || Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                        return e
                    },
                    s = this && this.__rest || function(e, t) {
                        var n = {};
                        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var o = 0;
                            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]])
                        }
                        return n
                    };
                t.__esModule = !0;
                var a = n(196),
                    l = n(697),
                    c = n(367),
                    u = n(303),
                    d = "autosize:resized",
                    p = function(e) {
                        function t() {
                            var t = null !== e && e.apply(this, arguments) || this;
                            return t.state = {
                                lineHeight: null
                            }, t.textarea = null, t.onResize = function(e) {
                                t.props.onResize && t.props.onResize(e)
                            }, t.updateLineHeight = function() {
                                t.textarea && t.setState({
                                    lineHeight: u(t.textarea)
                                })
                            }, t.onChange = function(e) {
                                var n = t.props.onChange;
                                t.currentValue = e.currentTarget.value, n && n(e)
                            }, t
                        }
                        return o(t, e), t.prototype.componentDidMount = function() {
                            var e = this,
                                t = this.props,
                                n = t.maxRows,
                                r = t.async;
                            "number" == typeof n && this.updateLineHeight(), "number" == typeof n || r ? setTimeout((function() {
                                return e.textarea && c(e.textarea)
                            })) : this.textarea && c(this.textarea), this.textarea && this.textarea.addEventListener(d, this.onResize)
                        }, t.prototype.componentWillUnmount = function() {
                            this.textarea && (this.textarea.removeEventListener(d, this.onResize), c.destroy(this.textarea))
                        }, t.prototype.render = function() {
                            var e = this,
                                t = this.props,
                                n = (t.onResize, t.maxRows),
                                r = (t.onChange, t.style),
                                o = (t.innerRef, t.children),
                                l = s(t, ["onResize", "maxRows", "onChange", "style", "innerRef", "children"]),
                                c = this.state.lineHeight,
                                u = n && c ? c * n : null;
                            return a.createElement("textarea", i({}, l, {
                                onChange: this.onChange,
                                style: u ? i({}, r, {
                                    maxHeight: u
                                }) : r,
                                ref: function(t) {
                                    e.textarea = t, "function" == typeof e.props.innerRef ? e.props.innerRef(t) : e.props.innerRef && (e.props.innerRef.current = t)
                                }
                            }), o)
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
            42: function(e, t, n) {
                "use strict";
                var r = n(857);
                t.Z = r.TextareaAutosize
            },
            196: function(e) {
                "use strict";
                e.exports = window.React
            }
        },
        n = {};

    function r(e) {
        var o = n[e];
        if (void 0 !== o) return o.exports;
        var i = n[e] = {
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, r), i.exports
    }
    r.m = t, e = [], r.O = function(t, n, o, i) {
            if (!n) {
                var s = 1 / 0;
                for (u = 0; u < e.length; u++) {
                    n = e[u][0], o = e[u][1], i = e[u][2];
                    for (var a = !0, l = 0; l < n.length; l++)(!1 & i || s >= i) && Object.keys(r.O).every((function(e) {
                        return r.O[e](n[l])
                    })) ? n.splice(l--, 1) : (a = !1, i < s && (s = i));
                    if (a) {
                        e.splice(u--, 1);
                        var c = o();
                        void 0 !== c && (t = c)
                    }
                }
                return t
            }
            i = i || 0;
            for (var u = e.length; u > 0 && e[u - 1][2] > i; u--) e[u] = e[u - 1];
            e[u] = [n, o, i]
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, {
                a: t
            }), t
        }, r.d = function(e, t) {
            for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        },
        function() {
            var e = {
                826: 0,
                431: 0
            };
            r.O.j = function(t) {
                return 0 === e[t]
            };
            var t = function(t, n) {
                    var o, i, s = n[0],
                        a = n[1],
                        l = n[2],
                        c = 0;
                    if (s.some((function(t) {
                            return 0 !== e[t]
                        }))) {
                        for (o in a) r.o(a, o) && (r.m[o] = a[o]);
                        if (l) var u = l(r)
                    }
                    for (t && t(n); c < s.length; c++) i = s[c], r.o(e, i) && e[i] && e[i][0](), e[i] = 0;
                    return r.O(u)
                },
                n = self.webpackChunkbuild_iso = self.webpackChunkbuild_iso || [];
            n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
        }();
    var o = r.O(void 0, [431], (function() {
        return r(624)
    }));
    o = r.O(o)
}();