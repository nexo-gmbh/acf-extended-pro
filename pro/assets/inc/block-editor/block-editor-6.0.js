! function() {
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
                                    e.clientWidth !== n && d()
                                },
                                l = function(t) {
                                    window.removeEventListener("resize", s, !1), e.removeEventListener("input", d, !1), e.removeEventListener("keyup", d, !1), e.removeEventListener("autosize:destroy", l, !1), e.removeEventListener("autosize:update", d, !1), Object.keys(t).forEach((function(n) {
                                        e.style[n] = t[n]
                                    })), r.delete(e)
                                }.bind(e, {
                                    height: e.style.height,
                                    resize: e.style.resize,
                                    overflowY: e.style.overflowY,
                                    overflowX: e.style.overflowX,
                                    wordWrap: e.style.wordWrap
                                });
                            e.addEventListener("autosize:destroy", l, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", d, !1), window.addEventListener("resize", s, !1), e.addEventListener("input", d, !1), e.addEventListener("autosize:update", d, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", r.set(e, {
                                destroy: l,
                                update: d
                            }), "vertical" === (a = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === a.resize && (e.style.resize = "horizontal"), t = "content-box" === a.boxSizing ? -(parseFloat(a.paddingTop) + parseFloat(a.paddingBottom)) : parseFloat(a.borderTopWidth) + parseFloat(a.borderBottomWidth), isNaN(t) && (t = 0), d()
                        }
                        var a;

                        function c(t) {
                            var n = e.style.width;
                            e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
                        }

                        function u() {
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

                        function d() {
                            u();
                            var t = Math.round(parseFloat(e.style.height)),
                                n = window.getComputedStyle(e, null),
                                r = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
                            if (r < t ? "hidden" === n.overflowY && (c("scroll"), u(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (c("hidden"), u(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), o !== r) {
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
            902: function(e, t, n) {
                "use strict";
                var o = {};
                n.r(o), n.d(o, {
                    disableComplementaryArea: function() {
                        return J
                    },
                    enableComplementaryArea: function() {
                        return $
                    },
                    pinItem: function() {
                        return q
                    },
                    setDefaultComplementaryArea: function() {
                        return Y
                    },
                    setFeatureDefaults: function() {
                        return ee
                    },
                    setFeatureValue: function() {
                        return Q
                    },
                    toggleFeature: function() {
                        return Z
                    },
                    unpinItem: function() {
                        return X
                    }
                });
                var r = {};
                n.r(r), n.d(r, {
                    getActiveComplementaryArea: function() {
                        return te
                    },
                    isFeatureActive: function() {
                        return oe
                    },
                    isItemPinned: function() {
                        return ne
                    }
                });
                var i = {};
                n.r(i), n.d(i, {
                    getCanvasStyles: function() {
                        return Fn
                    },
                    getCurrentPattern: function() {
                        return wn
                    },
                    getCurrentPatternName: function() {
                        return yn
                    },
                    getEditorMode: function() {
                        return vn
                    },
                    getEditorSettings: function() {
                        return En
                    },
                    getIgnoredContent: function() {
                        return Cn
                    },
                    getNamedPattern: function() {
                        return Sn
                    },
                    getPatterns: function() {
                        return In
                    },
                    getPreviewDeviceType: function() {
                        return An
                    },
                    isEditing: function() {
                        return xn
                    },
                    isEditorReady: function() {
                        return bn
                    },
                    isEditorSidebarOpened: function() {
                        return Tn
                    },
                    isIframePreview: function() {
                        return Ln
                    },
                    isInserterOpened: function() {
                        return kn
                    },
                    isListViewOpened: function() {
                        return On
                    }
                });
                var s = {};
                n.r(s), n.d(s, {
                    getBlocks: function() {
                        return Bn
                    },
                    getEditCount: function() {
                        return Nn
                    },
                    getEditorSelection: function() {
                        return Mn
                    },
                    hasEditorRedo: function() {
                        return Rn
                    },
                    hasEditorUndo: function() {
                        return Pn
                    }
                });
                var l = {};
                n.r(l), n.d(l, {
                    isFeatureActive: function() {
                        return Dn
                    }
                });
                var a = {};
                n.r(a), n.d(a, {
                    isOptionActive: function() {
                        return Un
                    }
                });
                var c = {};
                n.r(c), n.d(c, {
                    setUndoManager: function() {
                        return Vn
                    },
                    setYDoc: function() {
                        return zn
                    }
                });
                var u = {};
                n.r(u), n.d(u, {
                    getUndoManager: function() {
                        return jn
                    },
                    getYDoc: function() {
                        return Hn
                    }
                });
                var d = {};
                n.r(d), n.d(d, {
                    setAvailableCollabPeers: function() {
                        return Gn
                    },
                    setCollabPeerSelection: function() {
                        return Wn
                    }
                });
                var p = {};
                n.r(p), n.d(p, {
                    getCollabPeers: function() {
                        return Kn
                    },
                    hasCollabPeers: function() {
                        return Yn
                    }
                });
                var m = {};
                n.r(m), n.d(m, {
                    __experimentalConvertBlockToStatic: function() {
                        return to
                    },
                    __experimentalConvertBlocksToReusable: function() {
                        return no
                    },
                    __experimentalDeleteReusableBlock: function() {
                        return oo
                    },
                    __experimentalSetEditingReusableBlock: function() {
                        return ro
                    }
                });
                var f = {};
                n.r(f), n.d(f, {
                    __experimentalIsEditingReusableBlock: function() {
                        return so
                    }
                });
                var g = {};
                n.r(g), n.d(g, {
                    disableComplementaryArea: function() {
                        return uo
                    },
                    enableComplementaryArea: function() {
                        return co
                    },
                    pinItem: function() {
                        return po
                    },
                    setDefaultComplementaryArea: function() {
                        return ao
                    },
                    setFeatureDefaults: function() {
                        return ho
                    },
                    setFeatureValue: function() {
                        return go
                    },
                    toggleFeature: function() {
                        return fo
                    },
                    unpinItem: function() {
                        return mo
                    }
                });
                var h = {};
                n.r(h), n.d(h, {
                    getActiveComplementaryArea: function() {
                        return vo
                    },
                    isFeatureActive: function() {
                        return bo
                    },
                    isItemPinned: function() {
                        return Eo
                    }
                });
                var v = n(196),
                    E = window.wp.element,
                    b = window.wp.mediaUtils,
                    y = window.wp.editor,
                    _ = window.wp.hooks;

                function w() {
                    return w = Object.assign ? Object.assign.bind() : function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                        }
                        return e
                    }, w.apply(this, arguments)
                }
                var C = window.wp.components,
                    S = window.wp.blockLibrary,
                    k = window.wp.data,
                    T = (window.wp.formatLibrary, window.wp.keyboardShortcuts),
                    x = n(184),
                    I = n.n(x),
                    O = window.wp.compose,
                    A = window.lodash;
                const F = ["button", "submit"];
                var L = (0, O.createHigherOrderComponent)((e => class extends E.Component {
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
                                        return (0, A.includes)(F, e.type)
                                }
                                return !1
                            }(n) && (this.preventBlurCheck = !0)
                        }
                        render() {
                            return (0, E.createElement)("div", {
                                onFocus: this.cancelBlurCheck,
                                onMouseDown: this.normalizeButtonFocus,
                                onMouseUp: this.normalizeButtonFocus,
                                onTouchStart: this.normalizeButtonFocus,
                                onTouchEnd: this.normalizeButtonFocus,
                                onBlur: this.queueBlurCheck
                            }, (0, E.createElement)(e, w({
                                ref: this.bindNode
                            }, this.props)))
                        }
                    }), "withFocusOutside"),
                    B = L(class extends E.Component {
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
                    P = window.wp.blockEditor,
                    R = window.wp.keycodes,
                    N = window.wp.i18n,
                    D = window.wp.primitives,
                    U = (0, v.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, v.createElement)(D.Path, {
                        d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
                    })),
                    z = (0, v.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, v.createElement)(D.Path, {
                        d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
                    })),
                    V = (0, v.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, v.createElement)(D.Path, {
                        fillRule: "evenodd",
                        d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
                        clipRule: "evenodd"
                    })),
                    H = window.wp.viewport,
                    j = (0, v.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, v.createElement)(D.Path, {
                        d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
                    })),
                    G = window.wp.deprecated,
                    W = n.n(G),
                    K = window.wp.preferences;
                const Y = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    $ = (e, t) => n => {
                        let {
                            registry: o,
                            dispatch: r
                        } = n;
                        t && (o.select(K.store).get(e, "isComplementaryAreaVisible") || o.dispatch(K.store).set(e, "isComplementaryAreaVisible", !0), r({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    J = e => t => {
                        let {
                            registry: n
                        } = t;
                        n.select(K.store).get(e, "isComplementaryAreaVisible") && n.dispatch(K.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    q = (e, t) => n => {
                        let {
                            registry: o
                        } = n;
                        if (!t) return;
                        const r = o.select(K.store).get(e, "pinnedItems");
                        !0 !== (null == r ? void 0 : r[t]) && o.dispatch(K.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !0
                        })
                    },
                    X = (e, t) => n => {
                        let {
                            registry: o
                        } = n;
                        if (!t) return;
                        const r = o.select(K.store).get(e, "pinnedItems");
                        o.dispatch(K.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !1
                        })
                    };

                function Z(e, t) {
                    return function(n) {
                        let {
                            registry: o
                        } = n;
                        W()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), o.dispatch(K.store).toggle(e, t)
                    }
                }

                function Q(e, t, n) {
                    return function(o) {
                        let {
                            registry: r
                        } = o;
                        W()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), r.dispatch(K.store).set(e, t, !!n)
                    }
                }

                function ee(e, t) {
                    return function(n) {
                        let {
                            registry: o
                        } = n;
                        W()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), o.dispatch(K.store).setDefaults(e, t)
                    }
                }
                const te = (0, k.createRegistrySelector)((e => (t, n) => {
                        var o;
                        const r = e(K.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== r) return r ? null == t || null === (o = t.complementaryAreas) || void 0 === o ? void 0 : o[n] : null
                    })),
                    ne = (0, k.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(K.store).get(n, "pinnedItems");
                        return null === (r = null == i ? void 0 : i[o]) || void 0 === r || r
                    })),
                    oe = (0, k.createRegistrySelector)((e => (t, n, o) => (W()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(K.store).get(n, o))));
                var re = (0, k.combineReducers)({
                    complementaryAreas: function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = arguments.length > 1 ? arguments[1] : void 0;
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
                });
                const ie = (0, k.createReduxStore)("core/interface", {
                    reducer: re,
                    actions: o,
                    selectors: r
                });
                (0, k.register)(ie);
                var se = (0, window.wp.plugins.withPluginContext)(((e, t) => ({
                        icon: t.icon || e.icon,
                        identifier: t.identifier || `${e.name}/${t.name}`
                    }))),
                    le = se((function(e) {
                        let {
                            as: t = C.Button,
                            scope: n,
                            identifier: o,
                            icon: r,
                            selectedIcon: i,
                            name: s,
                            ...l
                        } = e;
                        const a = t,
                            c = (0, k.useSelect)((e => e(ie).getActiveComplementaryArea(n) === o), [o]),
                            {
                                enableComplementaryArea: u,
                                disableComplementaryArea: d
                            } = (0, k.useDispatch)(ie);
                        return (0, E.createElement)(a, w({
                            icon: i && c ? i : r,
                            onClick: () => {
                                c ? d(n) : u(n, o)
                            }
                        }, l))
                    })),
                    ae = e => {
                        let {
                            smallScreenTitle: t,
                            children: n,
                            className: o,
                            toggleButtonProps: r
                        } = e;
                        const i = (0, E.createElement)(le, w({
                            icon: j
                        }, r));
                        return (0, E.createElement)(E.Fragment, null, (0, E.createElement)("div", {
                            className: "components-panel__header interface-complementary-area-header__small"
                        }, t && (0, E.createElement)("span", {
                            className: "interface-complementary-area-header__small-title"
                        }, t), i), (0, E.createElement)("div", {
                            className: I()("components-panel__header", "interface-complementary-area-header", o),
                            tabIndex: -1
                        }, n, i))
                    };
                const ce = () => {};

                function ue(e) {
                    let {
                        name: t,
                        as: n = C.Button,
                        onClick: o,
                        ...r
                    } = e;
                    return (0, E.createElement)(C.Fill, {
                        name: t
                    }, (e => {
                        let {
                            onClick: t
                        } = e;
                        return (0, E.createElement)(n, w({
                            onClick: o || t ? function() {
                                (o || ce)(...arguments), (t || ce)(...arguments)
                            } : void 0
                        }, r))
                    }))
                }
                ue.Slot = function(e) {
                    let {
                        name: t,
                        as: n = C.ButtonGroup,
                        fillProps: o = {},
                        bubblesVirtually: r,
                        ...i
                    } = e;
                    return (0, E.createElement)(C.Slot, {
                        name: t,
                        bubblesVirtually: r,
                        fillProps: o
                    }, (e => {
                        if (!E.Children.toArray(e).length) return null;
                        const t = [];
                        E.Children.forEach(e, (e => {
                            let {
                                props: {
                                    __unstableExplicitMenuItem: n,
                                    __unstableTarget: o
                                }
                            } = e;
                            o && n && t.push(o)
                        }));
                        const o = E.Children.map(e, (e => !e.props.__unstableExplicitMenuItem && t.includes(e.props.__unstableTarget) ? null : e));
                        return (0, E.createElement)(n, i, o)
                    }))
                };
                var de = ue;
                const pe = e => {
                    let {
                        __unstableExplicitMenuItem: t,
                        __unstableTarget: n,
                        ...o
                    } = e;
                    return (0, E.createElement)(C.MenuItem, o)
                };

                function me(e) {
                    let {
                        scope: t,
                        target: n,
                        __unstableExplicitMenuItem: o,
                        ...r
                    } = e;
                    return (0, E.createElement)(le, w({
                        as: e => (0, E.createElement)(de, w({
                            __unstableExplicitMenuItem: o,
                            __unstableTarget: `${t}/${n}`,
                            as: pe,
                            name: `${t}/plugin-more-menu`
                        }, e)),
                        role: "menuitemcheckbox",
                        selectedIcon: U,
                        name: n,
                        scope: t
                    }, r))
                }

                function fe(e) {
                    let {
                        scope: t,
                        ...n
                    } = e;
                    return (0, E.createElement)(C.Fill, w({
                        name: `PinnedItems/${t}`
                    }, n))
                }
                fe.Slot = function(e) {
                    let {
                        scope: t,
                        className: n,
                        ...o
                    } = e;
                    return (0, E.createElement)(C.Slot, w({
                        name: `PinnedItems/${t}`
                    }, o), (e => (null == e ? void 0 : e.length) > 0 && (0, E.createElement)("div", {
                        className: I()(n, "interface-pinned-items")
                    }, e)))
                };
                var ge = fe;

                function he(e) {
                    let {
                        scope: t,
                        children: n,
                        className: o
                    } = e;
                    return (0, E.createElement)(C.Fill, {
                        name: `ComplementaryArea/${t}`
                    }, (0, E.createElement)("div", {
                        className: o
                    }, n))
                }
                const ve = se((function(e) {
                    let {
                        children: t,
                        className: n,
                        closeLabel: o = (0, N.__)("Close plugin"),
                        identifier: r,
                        header: i,
                        headerClassName: s,
                        icon: l,
                        isPinnable: a = !0,
                        panelClassName: c,
                        scope: u,
                        name: d,
                        smallScreenTitle: p,
                        title: m,
                        toggleShortcut: f,
                        isActiveByDefault: g,
                        showIconLabels: h = !1
                    } = e;
                    const {
                        isActive: v,
                        isPinned: b,
                        activeArea: y,
                        isSmall: _,
                        isLarge: w
                    } = (0, k.useSelect)((e => {
                        const {
                            getActiveComplementaryArea: t,
                            isItemPinned: n
                        } = e(ie), o = t(u);
                        return {
                            isActive: o === r,
                            isPinned: n(u, r),
                            activeArea: o,
                            isSmall: e(H.store).isViewportMatch("< medium"),
                            isLarge: e(H.store).isViewportMatch("large")
                        }
                    }), [r, u]);
                    ! function(e, t, n, o, r) {
                        const i = (0, E.useRef)(!1),
                            s = (0, E.useRef)(!1),
                            {
                                enableComplementaryArea: l,
                                disableComplementaryArea: a
                            } = (0, k.useDispatch)(ie);
                        (0, E.useEffect)((() => {
                            o && r && !i.current ? (a(e), s.current = !0) : s.current && !r && i.current ? (s.current = !1, l(e, t)) : s.current && n && n !== t && (s.current = !1), r !== i.current && (i.current = r)
                        }), [o, r, e, t, n])
                    }(u, r, y, v, _);
                    const {
                        enableComplementaryArea: S,
                        disableComplementaryArea: T,
                        pinItem: x,
                        unpinItem: O
                    } = (0, k.useDispatch)(ie);
                    return (0, E.useEffect)((() => {
                        g && void 0 === y && !_ && S(u, r)
                    }), [y, g, u, r, _]), (0, E.createElement)(E.Fragment, null, a && (0, E.createElement)(ge, {
                        scope: u
                    }, b && (0, E.createElement)(le, {
                        scope: u,
                        identifier: r,
                        isPressed: v && (!h || w),
                        "aria-expanded": v,
                        label: m,
                        icon: h ? U : l,
                        showTooltip: !h,
                        variant: h ? "tertiary" : void 0
                    })), d && a && (0, E.createElement)(me, {
                        target: d,
                        scope: u,
                        icon: l
                    }, m), v && (0, E.createElement)(he, {
                        className: I()("interface-complementary-area", n),
                        scope: u
                    }, (0, E.createElement)(ae, {
                        className: s,
                        closeLabel: o,
                        onClose: () => T(u),
                        smallScreenTitle: p,
                        toggleButtonProps: {
                            label: o,
                            shortcut: f,
                            scope: u,
                            identifier: r
                        }
                    }, i || (0, E.createElement)(E.Fragment, null, (0, E.createElement)("strong", null, m), a && (0, E.createElement)(C.Button, {
                        className: "interface-complementary-area__pin-unpin-item",
                        icon: b ? z : V,
                        label: b ? (0, N.__)("Unpin from toolbar") : (0, N.__)("Pin to toolbar"),
                        onClick: () => (b ? O : x)(u, r),
                        isPressed: b,
                        "aria-expanded": b
                    }))), (0, E.createElement)(C.Panel, {
                        className: c
                    }, t)))
                }));
                ve.Slot = function(e) {
                    let {
                        scope: t,
                        ...n
                    } = e;
                    return (0, E.createElement)(C.Slot, w({
                        name: `ComplementaryArea/${t}`
                    }, n))
                };
                var Ee = ve,
                    be = e => {
                        let {
                            isActive: t
                        } = e;
                        return (0, E.useEffect)((() => {
                            let e = !1;
                            return document.body.classList.contains("sticky-menu") && (e = !0, document.body.classList.remove("sticky-menu")), () => {
                                e && document.body.classList.add("sticky-menu")
                            }
                        }), []), (0, E.useEffect)((() => (t ? document.body.classList.add("is-fullscreen-mode") : document.body.classList.remove("is-fullscreen-mode"), () => {
                            t && document.body.classList.remove("is-fullscreen-mode")
                        })), [t]), null
                    },
                    ye = (0, E.forwardRef)((function(e, t) {
                        let {
                            footer: n,
                            header: o,
                            sidebar: r,
                            secondarySidebar: i,
                            notices: s,
                            content: l,
                            drawer: a,
                            actions: c,
                            labels: u,
                            className: d,
                            shortcuts: p
                        } = e;
                        const m = (0, C.__unstableUseNavigateRegions)(p);
                        ! function(e) {
                            (0, E.useEffect)((() => {
                                const t = document && document.querySelector(`html:not(.${e})`);
                                if (t) return t.classList.toggle(e), () => {
                                    t.classList.toggle(e)
                                }
                            }), [e])
                        }("interface-interface-skeleton__html-container");
                        const f = {
                            /* translators: accessibility text for the nav bar landmark region. */
                            drawer: (0, N.__)("Drawer"),
                            /* translators: accessibility text for the top bar landmark region. */
                            header: (0, N.__)("Header"),
                            /* translators: accessibility text for the content landmark region. */
                            body: (0, N.__)("Content"),
                            /* translators: accessibility text for the secondary sidebar landmark region. */
                            secondarySidebar: (0, N.__)("Block Library"),
                            /* translators: accessibility text for the settings landmark region. */
                            sidebar: (0, N.__)("Settings"),
                            /* translators: accessibility text for the publish landmark region. */
                            actions: (0, N.__)("Publish"),
                            /* translators: accessibility text for the footer landmark region. */
                            footer: (0, N.__)("Footer"),
                            ...u
                        };
                        return (0, E.createElement)("div", w({}, m, {
                            ref: (0, O.useMergeRefs)([t, m.ref]),
                            className: I()(d, "interface-interface-skeleton", m.className, !!n && "has-footer")
                        }), !!a && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__drawer",
                            role: "region",
                            "aria-label": f.drawer,
                            tabIndex: "-1"
                        }, a), (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__editor"
                        }, !!o && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__header",
                            role: "region",
                            "aria-label": f.header,
                            tabIndex: "-1"
                        }, o), (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__body"
                        }, !!i && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__secondary-sidebar",
                            role: "region",
                            "aria-label": f.secondarySidebar,
                            tabIndex: "-1"
                        }, i), !!s && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__notices"
                        }, s), (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__content",
                            role: "region",
                            "aria-label": f.body,
                            tabIndex: "-1"
                        }, l), !!r && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__sidebar",
                            role: "region",
                            "aria-label": f.sidebar,
                            tabIndex: "-1"
                        }, r), !!c && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__actions",
                            role: "region",
                            "aria-label": f.actions,
                            tabIndex: "-1"
                        }, c))), !!n && (0, E.createElement)("div", {
                            className: "interface-interface-skeleton__footer",
                            role: "region",
                            "aria-label": f.footer,
                            tabIndex: "-1"
                        }, n))
                    })),
                    _e = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        fillRule: "evenodd",
                        d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
                        clipRule: "evenodd"
                    })),
                    we = e => {
                        let {
                            sidebarName: t,
                            documentInspector: n
                        } = e;
                        const {
                            openGeneralSidebar: o
                        } = (0, k.useDispatch)("isolated/editor"), {
                            documentLabel: r
                        } = (0, k.useSelect)((e => ({
                            // translators: Default label for the Document sidebar tab, not selected.
                            documentLabel: n && "string" == typeof n ? n : (0, N._x)("Document", "noun")
                        })), []), [i, s] = "edit-post/document" === t ? // translators: ARIA label for the Document sidebar tab, selected. %s: Document label.
                            [(0, N.sprintf)((0, N.__)("%s (selected)"), r), "is-active"] : [r, ""], [l, a] = "edit-post/block" === t ? // translators: ARIA label for the Block Settings Sidebar tab, selected.
                            [(0, N.__)("Block (selected)"), "is-active"] : // translators: ARIA label for the Block Settings Sidebar tab, not selected.
                            [(0, N.__)("Block"), ""];
                        return (0, E.createElement)("ul", null, !!n && (0, E.createElement)("li", null, (0, E.createElement)(C.Button, {
                            onClick: () => o("edit-post/document"),
                            className: `edit-post-sidebar__panel-tab ${s}`,
                            "aria-label": i,
                            "data-label": r
                        }, r)), (0, E.createElement)("li", null, (0, E.createElement)(C.Button, {
                                onClick: () => o("edit-post/block"),
                                className: `edit-post-sidebar__panel-tab ${a}`,
                                "aria-label": l,
                                "data-label": (0, N.__)("Block")
                            }, // translators: Text label for the Block Settings Sidebar tab.
                            (0, N.__)("Block"))))
                    };
                const {
                    Fill: Ce,
                    Slot: Se
                } = (0, C.createSlotFill)("PluginDocumentSettingPanel"), ke = e => {
                    let {
                        children: t
                    } = e;
                    return (0, E.createElement)(Ce, null, t)
                };
                ke.Slot = function(e) {
                    return (0, E.createElement)(Se, null, (e => 0 === e.length ? (0, E.createElement)("span", {
                        className: "block-editor-block-inspector__no-blocks"
                    }, (0, N.__)("Nothing to display")) : e))
                };
                var Te = ke;

                function xe(e) {
                    let {
                        className: t,
                        ...n
                    } = e;
                    const {
                        postTitle: o,
                        shortcut: r,
                        showIconLabels: i
                    } = (0, k.useSelect)((e => ({
                        postTitle: "",
                        shortcut: e(T.store).getShortcutRepresentation("core/edit-post/toggle-sidebar"),
                        showIconLabels: e("isolated/editor").isFeatureActive("showIconLabels")
                    })), []);
                    return (0, E.createElement)(Ee, w({
                        panelClassName: t,
                        className: "edit-post-sidebar",
                        smallScreenTitle: o || (0, N.__)("(no title)"),
                        scope: "isolated/editor",
                        toggleShortcut: r,
                        showIconLabels: i
                    }, n))
                }
                var Ie = e => {
                    let {
                        documentInspector: t
                    } = e;
                    const {
                        sidebarName: n,
                        keyboardShortcut: o
                    } = (0, k.useSelect)((e => {
                        let t = e(ie).getActiveComplementaryArea("isolated/editor");
                        return ["edit-post/document", "edit-post/block"].includes(t) || (t = "edit-post/document", e(P.store).getBlockSelectionStart() && (t = "edit-post/block")), {
                            sidebarName: t,
                            keyboardShortcut: e(T.store).getShortcutRepresentation("core/edit-post/toggle-sidebar")
                        }
                    }), []);
                    return (0, E.createElement)(xe, {
                        className: "iso-sidebar",
                        identifier: n,
                        header: (0, E.createElement)(we, {
                            sidebarName: n,
                            documentInspector: t
                        }),
                        closeLabel: (0, N.__)("Close settings"),
                        headerClassName: "edit-post-sidebar__panel-tabs"
                            /* translators: button label text should, if possible, be under 16 characters. */
                            ,
                        title: (0, N.__)("Settings"),
                        toggleShortcut: o,
                        icon: _e,
                        isActiveByDefault: !1
                    }, "edit-post/document" === n && (0, E.createElement)(Te.Slot, null), "edit-post/block" === n && (0, E.createElement)(P.BlockInspector, null))
                };
                const {
                    Fill: Oe,
                    Slot: Ae
                } = (0, C.createSlotFill)("IsolatedEditorHeading"), Fe = e => {
                    let {
                        children: t
                    } = e;
                    return (0, E.createElement)(Oe, null, t)
                };
                Fe.Slot = function(e) {
                    return (0, E.createElement)(Ae, null, (e => e))
                };
                var Le = Fe;
                const {
                    Fill: Be,
                    Slot: Me
                } = (0, C.createSlotFill)("IsolatedFooter"), Pe = e => {
                    let {
                        children: t
                    } = e;
                    return (0, E.createElement)(Be, null, t)
                };
                Pe.Slot = function(e) {
                    return (0, E.createElement)(Me, null, (e => e))
                };
                var Re = Pe;

                function Ne(e) {
                    let {
                        children: t,
                        contentRef: n,
                        shouldIframe: o,
                        styles: r,
                        style: i
                    } = e;
                    const s = (0, P.__unstableUseMouseMoveTypingReset)(),
                        {
                            assets: l
                        } = (0, k.useSelect)((e => ({
                            assets: e("core/block-editor").getSettings().__unstableResolvedAssets
                        })), []);
                    return o ? (0, E.createElement)(P.__unstableIframe, {
                        head: (0, E.createElement)(P.__unstableEditorStyles, {
                            styles: r
                        }),
                        assets: l,
                        ref: s,
                        contentRef: n,
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "block"
                        },
                        name: "editor-canvas"
                    }, t) : (0, E.createElement)(E.Fragment, null, (0, E.createElement)(P.__unstableEditorStyles, {
                        styles: r
                    }), (0, E.createElement)(P.WritingFlow, {
                        ref: n,
                        className: "editor-styles-wrapper",
                        style: {
                            flex: "1",
                            ...i
                        },
                        tabIndex: -1
                    }, t))
                }
                const De = e => {
                    let {
                        children: t,
                        disableAnimations: n,
                        initialStyle: o,
                        currentStyle: r,
                        ...i
                    } = e;
                    return n ? (0, E.createElement)("div", w({
                        style: r
                    }, i), t) : (0, E.createElement)(C.__unstableMotion.div, w({
                        animate: r,
                        initial: o
                    }, i), t)
                };
                var Ue = e => {
                        let {
                            styles: t
                        } = e;
                        const n = (0, k.useSelect)((e => {
                                const {
                                    getSettings: t
                                } = e(P.store);
                                return t().supportsLayout
                            }), []),
                            {
                                canvasStyles: o,
                                deviceType: r,
                                disableCanvasAnimations: i,
                                isIframePreview: s
                            } = (0, k.useSelect)((e => {
                                const {
                                    getCanvasStyles: t,
                                    getPreviewDeviceType: n,
                                    getEditorSettings: o,
                                    isIframePreview: r
                                } = e("isolated/editor");
                                return {
                                    canvasStyles: t(),
                                    deviceType: n(),
                                    disableCanvasAnimations: o().disableCanvasAnimations,
                                    isIframePreview: r()
                                }
                            }), []),
                            l = (0, P.__experimentalUseResizeCanvas)(r, !1),
                            a = (0, P.useSetting)("layout"),
                            c = "is-" + r.toLowerCase() + "-preview",
                            u = {
                                width: "100%",
                                margin: 0,
                                display: "flex",
                                flexFlow: "column",
                                background: "white"
                            };
                        let d = u;
                        l && (d = l), o && (d = {
                            ...d,
                            ...o
                        });
                        const p = (0, P.__unstableUseBlockSelectionClearer)(),
                            m = (0, E.useRef)(),
                            f = (0, O.useMergeRefs)([m, (0, P.__unstableUseClipboardHandler)(), (0, P.__unstableUseTypewriter)(), (0, P.__unstableUseBlockSelectionClearer)(), (0, P.__unstableUseTypingObserver)()]),
                            g = (0, E.useMemo)((() => {
                                if (n) return a
                            }), [n, a]),
                            h = null != g && g.definitions ? {
                                ...g,
                                type: "constrained"
                            } : g;
                        return (0, E.createElement)(P.BlockTools, {
                            __unstableContentRef: m,
                            className: "edit-post-visual-editor"
                        }, (0, E.createElement)(C.__unstableMotion.div, {
                            className: "edit-post-visual-editor__content-area",
                            animate: {
                                padding: "0"
                            },
                            ref: p
                        }, (0, E.createElement)(De, {
                            className: c,
                            currentStyle: d,
                            disableAnimations: i,
                            initialStyle: u
                        }, (0, E.createElement)(Ne, {
                            shouldIframe: s,
                            contentRef: f,
                            styles: t,
                            style: {}
                        }, (0, E.createElement)(P.__experimentalLayoutStyle, {
                            selector: ".edit-post-visual-editor__post-title-wrapper, .block-editor-block-list__layout.is-root-container",
                            layout: h
                        }), (0, E.createElement)(Le.Slot, {
                            mode: "visual"
                        }), (0, E.createElement)(P.BlockList, {
                            className: void 0,
                            __experimentalLayout: g
                        }), (0, E.createElement)(Re.Slot, {
                            mode: "visual"
                        })))))
                    },
                    ze = n(42);
                class Ve extends E.Component {
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
                        return (0, E.createElement)(E.Fragment, null, (0, E.createElement)("label", {
                            htmlFor: `post-content-${t}`,
                            className: "screen-reader-text"
                        }, (0, N.__)("Type text or HTML")), (0, E.createElement)(ze.Z, {
                            autoComplete: "off",
                            dir: "auto",
                            value: e,
                            onChange: this.edit,
                            onBlur: this.stopEditing,
                            className: "editor-post-text-editor",
                            id: `post-content-${t}`,
                            placeholder: (0, N.__)("Start writing with text or HTML")
                        }))
                    }
                }
                var He = (0, O.compose)([(0, k.withSelect)((e => {
                        const {
                            getBlocks: t
                        } = e("isolated/editor");
                        return {
                            value: (0, M.serialize)(t())
                        }
                    })), (0, k.withDispatch)((e => {
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
                    })), O.withInstanceId])(Ve),
                    je = function(e) {
                        let {} = e;
                        return (0, E.createElement)("div", {
                            className: "edit-post-text-editor"
                        }, (0, E.createElement)("div", {
                            className: "edit-post-text-editor__body"
                        }, (0, E.createElement)(Le.Slot, {
                            mode: "text"
                        }), (0, E.createElement)(He, null), (0, E.createElement)(Re.Slot, {
                            mode: "text"
                        })))
                    },
                    Ge = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
                    })),
                    We = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
                    })),
                    Ke = (0, O.compose)([(0, k.withSelect)(((e, t) => {
                        let {
                            feature: n
                        } = t;
                        return {
                            isActive: e("isolated/editor").isFeatureActive(n)
                        }
                    })), (0, k.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleFeature(t.feature), t.onClose()
                        }
                    }))), C.withSpokenMessages])((function(e) {
                        let {
                            onToggle: t,
                            isActive: n,
                            label: o,
                            info: r,
                            messageActivated: i,
                            messageDeactivated: s,
                            speak: l
                        } = e;
                        return (0, E.createElement)(C.MenuItem, {
                            icon: n && We,
                            isSelected: n,
                            onClick: (0, A.flow)(t, (() => {
                                l(n ? s || (0, N.__)("Feature deactivated") : i || (0, N.__)("Feature activated"))
                            })),
                            role: "menuitemcheckbox",
                            info: r
                        }, o)
                    })),
                    Ye = (0, O.compose)([(0, k.withSelect)(((e, t) => {
                        let {
                            option: n
                        } = t;
                        return {
                            isActive: e("isolated/editor").isOptionActive(n)
                        }
                    })), (0, k.withDispatch)(((e, t) => ({
                        onToggle() {
                            e("isolated/editor").toggleOption(t.option), t.onClose()
                        }
                    }))), C.withSpokenMessages])((function(e) {
                        let {
                            onToggle: t,
                            isActive: n,
                            label: o,
                            info: r
                        } = e;
                        return (0, E.createElement)(C.MenuItem, {
                            icon: n && We,
                            isSelected: n,
                            onClick: t,
                            role: "menuitemcheckbox",
                            info: r
                        }, o)
                    })),
                    $e = function(e) {
                        var t;
                        let {
                            onClose: n,
                            settings: o
                        } = e;
                        const {
                            preview: r,
                            fullscreen: i,
                            topToolbar: s
                        } = (null == o || null === (t = o.iso) || void 0 === t ? void 0 : t.moreMenu) || {}, {
                            isFullscreen: l
                        } = (0, k.useSelect)((e => ({
                            isFullscreen: e("isolated/editor").isOptionActive("fullscreenMode")
                        })), []);
                        return i || r || s ? (0, E.createElement)(C.MenuGroup, {
                            label: (0, N._x)("View", "noun")
                        }, s && (0, E.createElement)(E.Fragment, null, (0, E.createElement)(Ke, {
                            feature: "fixedToolbar",
                            label: (0, N.__)("Top toolbar"),
                            info: (0, N.__)("Access all block and document tools in a single place."),
                            messageActivated: (0, N.__)("Top toolbar activated"),
                            messageDeactivated: (0, N.__)("Top toolbar deactivated"),
                            onClose: n
                        })), i && (0, E.createElement)(Ye, {
                            option: "fullscreenMode",
                            label: (0, N.__)("Fullscreen"),
                            info: (0, N.__)("Show editor fullscreen."),
                            onClose: n
                        }), r && !l && (0, E.createElement)(Ye, {
                            option: "preview",
                            label: (0, N.__)("Preview"),
                            info: (0, N.__)("Preview the content before posting."),
                            onClose: n
                        })) : null
                    },
                    Je = (0, O.compose)([(0, k.withSelect)((e => {
                        const {
                            getEditorMode: t
                        } = e("isolated/editor"), {
                            codeEditingEnabled: n
                        } = e("core/editor").getEditorSettings();
                        return {
                            editorMode: t(),
                            isCodeEditingEnabled: n
                        }
                    })), (0, k.withDispatch)((e => ({
                        onSetMode(t) {
                            e("isolated/editor").setEditorMode(t)
                        }
                    })))])((function(e) {
                        var t, n, o;
                        let {
                            onClose: r,
                            editorMode: i,
                            onSetMode: s,
                            isCodeEditingEnabled: l,
                            settings: a
                        } = e;
                        const c = e => {
                            s(e), r()
                        };
                        return l && !1 !== (null == a || null === (t = a.iso) || void 0 === t ? void 0 : t.moreMenu) && null != a && null !== (n = a.iso) && void 0 !== n && null !== (o = n.moreMenu) && void 0 !== o && o.editor ? (0, E.createElement)(C.MenuGroup, {
                            label: (0, N._x)("Editor", "noun")
                        }, (0, E.createElement)(C.MenuItem, {
                            icon: "visual" === i && We,
                            isSelected: "visual" === i,
                            onClick: () => c("visual"),
                            role: "menuitemcheckbox"
                        }, (0, N.__)("Visual editor")), (0, E.createElement)(C.MenuItem, {
                            icon: "text" === i && We,
                            isSelected: "text" === i,
                            onClick: () => c("text"),
                            role: "menuitemcheckbox"
                        }, (0, N.__)("Code editor"))) : null
                    })),
                    qe = function(e) {
                        let {
                            settings: t
                        } = e;
                        const {
                            linkMenu: n = []
                        } = t.iso || {};
                        return 0 === n.length ? null : (0, E.createElement)(C.MenuGroup, {
                            label: (0, N.__)("Links")
                        }, n.map((e => {
                            let {
                                title: t,
                                url: n
                            } = e;
                            return (0, E.createElement)(C.MenuItem, {
                                key: t
                            }, (0, E.createElement)(C.ExternalLink, {
                                href: n
                            }, t))
                        })))
                    };
                const Xe = {
                        className: "edit-post-more-menu__content",
                        position: "bottom left"
                    },
                    Ze = {
                        tooltipPosition: "bottom"
                    };
                var Qe = e => {
                        let {
                            settings: t,
                            onClick: n,
                            renderMoreMenu: o
                        } = e;
                        return (0, E.createElement)(C.DropdownMenu, {
                            className: "edit-post-more-menu",
                            icon: Ge,
                            label: (0, N.__)("More tools & options"),
                            popoverProps: Xe,
                            toggleProps: {
                                ...Ze,
                                onClick: n
                            }
                        }, (e => {
                            let {
                                onClose: n
                            } = e;
                            return (0, E.createElement)(E.Fragment, null, o && o(t, n), (0, E.createElement)(Je, {
                                onClose: n,
                                settings: t
                            }), (0, E.createElement)($e, {
                                onClose: n,
                                settings: t
                            }), (0, E.createElement)(qe, {
                                settings: t
                            }))
                        }))
                    },
                    et = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"
                    })),
                    tt = (0, E.createElement)(D.SVG, {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, (0, E.createElement)(D.Path, {
                        d: "M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"
                    })),
                    nt = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"
                    })),
                    ot = (0, E.forwardRef)((function(e, t) {
                        const n = (0, k.useSelect)((e => e("isolated/editor").hasEditorRedo()), []),
                            {
                                redo: o
                            } = (0, k.useDispatch)("isolated/editor");
                        return (0, E.createElement)(C.Button, w({}, e, {
                            ref: t,
                            icon: nt,
                            label: (0, N.__)("Redo"),
                            shortcut: R.displayShortcut.primaryShift("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__redo"
                        }))
                    })),
                    rt = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"
                    })),
                    it = (0, E.forwardRef)((function(e, t) {
                        const n = (0, k.useSelect)((e => e("isolated/editor").hasEditorUndo()), []),
                            {
                                undo: o
                            } = (0, k.useDispatch)("isolated/editor");
                        return (0, E.createElement)(C.Button, w({}, e, {
                            ref: t,
                            icon: rt,
                            label: (0, N.__)("Undo"),
                            shortcut: R.displayShortcut.primary("z"),
                            "aria-disabled": !n,
                            onClick: n ? o : void 0,
                            className: "editor-history__undo"
                        }))
                    })),
                    st = (0, E.forwardRef)((function(e, t) {
                        let {
                            isDisabled: n,
                            ...o
                        } = e;
                        const r = (0, k.useSelect)((e => !!e(P.store).getBlockCount()), []) && !n;
                        return (0, E.createElement)(C.Dropdown, {
                            contentClassName: "block-editor-block-navigation__popover",
                            position: "bottom right",
                            renderToggle: e => {
                                let {
                                    isOpen: n,
                                    onToggle: i
                                } = e;
                                return (0, E.createElement)(C.Button, w({}, o, {
                                    ref: t,
                                    icon: tt,
                                    "aria-expanded": n,
                                    "aria-haspopup": "true",
                                    onClick: r ? i : void 0
                                        /* translators: button label text should, if possible, be under 16 characters. */
                                        ,
                                    label: (0, N.__)("List view"),
                                    className: "block-editor-block-navigation",
                                    "aria-disabled": !r
                                }))
                            },
                            renderContent: () => (0, E.createElement)("div", {
                                className: "block-editor-block-navigation__container"
                            }, (0, E.createElement)("p", {
                                className: "block-editor-block-navigation__label"
                            }, (0, N.__)("List view")), (0, E.createElement)(P.__experimentalListView, null))
                        })
                    }));
                const lt = e => {
                    e.preventDefault()
                };
                var at = function(e) {
                        var t, n, o;
                        const r = (0, E.useRef)(),
                            {
                                setIsInserterOpened: i,
                                setIsListViewOpened: s
                            } = (0, k.useDispatch)("isolated/editor"),
                            l = (0, O.useViewportMatch)("medium", "<"),
                            {
                                hasFixedToolbar: a,
                                isInserterEnabled: c,
                                isTextModeEnabled: u,
                                showIconLabels: d,
                                previewDeviceType: p,
                                isInserterOpened: m,
                                isListViewOpen: f,
                                listViewShortcut: g
                            } = (0, k.useSelect)((e => {
                                const {
                                    hasInserterItems: t,
                                    getBlockRootClientId: n,
                                    getBlockSelectionEnd: o
                                } = e("core/block-editor"), {
                                    isListViewOpened: r
                                } = e("isolated/editor"), {
                                    getShortcutRepresentation: i
                                } = e(T.store);
                                return {
                                    hasFixedToolbar: e("isolated/editor").isFeatureActive("fixedToolbar"),
                                    isInserterEnabled: "visual" === e("isolated/editor").getEditorMode() && e("core/editor").getEditorSettings().richEditingEnabled && t(n(o())),
                                    isListViewOpen: r(),
                                    isTextModeEnabled: "text" === e("isolated/editor").getEditorMode(),
                                    previewDeviceType: "Desktop",
                                    isInserterOpened: e("isolated/editor").isInserterOpened(),
                                    showIconLabels: !1,
                                    listViewShortcut: i("core/edit-post/toggle-list-view")
                                }
                            }), []),
                            h = (0, O.useViewportMatch)("medium"),
                            v = (0, O.useViewportMatch)("wide"),
                            {
                                inserter: b,
                                toc: _,
                                navigation: w,
                                undo: S,
                                selectorTool: x
                            } = e.settings.iso.toolbar,
                            I = (null === (t = e.settings) || void 0 === t || null === (n = t.iso) || void 0 === n || null === (o = n.sidebar) || void 0 === o ? void 0 : o.inserter) || !1,
                            A = !h || "Desktop" !== p || a ?
                            /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
                            (0, N.__)("Document and block tools") :
                            /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
                            (0, N.__)("Document tools"),
                            F = (0, E.useCallback)((() => {
                                i(!m)
                            }), [m, i]),
                            L = (0, E.useCallback)((() => s(!f)), [s, f]);
                        return (0, E.createElement)(P.NavigableToolbar, {
                            className: "edit-post-header-toolbar",
                            "aria-label": A
                        }, (b || S || w || _ || x) && (0, E.createElement)("div", {
                            className: "edit-post-header-toolbar__left"
                        }, b && (0, E.createElement)(C.ToolbarItem, {
                            ref: r,
                            as: C.Button,
                            className: "edit-post-header-toolbar__inserter-toggle",
                            isPressed: m,
                            onMouseDown: lt,
                            onClick: F,
                            disabled: !c,
                            isPrimary: !0,
                            icon: et
                                /* translators: button label text should, if possible, be under 16
                                    characters. */
                                ,
                            label: (0, N._x)("Toggle block inserter", "Generic label for block inserter button"),
                            showTooltip: !d
                        }), m && !I && (0, E.createElement)(C.Popover, {
                            position: "bottom right",
                            onClose: () => i(!1),
                            anchor: r.current
                        }, (0, E.createElement)(P.__experimentalLibrary, {
                            showMostUsedBlocks: !1,
                            showInserterHelpPanel: !0,
                            onSelect: () => {
                                l && i(!1)
                            }
                        })), x && (0, E.createElement)(P.ToolSelector, null), S && (0, E.createElement)(C.ToolbarItem, {
                            as: it,
                            showTooltip: !d,
                            variant: d ? "tertiary" : void 0
                        }), S && (0, E.createElement)(C.ToolbarItem, {
                            as: ot,
                            showTooltip: !d,
                            variant: d ? "tertiary" : void 0
                        }), w && !I && (0, E.createElement)(C.ToolbarItem, {
                            as: st,
                            isDisabled: u
                        }), w && I && (0, E.createElement)(C.ToolbarItem, {
                            as: C.Button,
                            className: "edit-post-header-toolbar__list-view-toggle",
                            icon: tt,
                            disabled: u,
                            isPressed: f
                                /* translators: button label text should, if possible, be under 16 characters. */
                                ,
                            label: (0, N.__)("List View"),
                            onClick: L,
                            shortcut: g,
                            showTooltip: !d
                        }), _ && (0, E.createElement)(C.ToolbarItem, {
                            as: y.TableOfContents,
                            hasOutlineItemsDisabled: u,
                            repositionDropdown: d && !v,
                            showTooltip: !d,
                            variant: d ? "tertiary" : void 0
                        })))
                    },
                    ct = function(e) {
                        let {
                            button: t,
                            onToggle: n
                        } = e;
                        return (0, E.createElement)(C.Popover, {
                            position: "bottom left",
                            className: "iso-inspector",
                            anchor: null == t ? void 0 : t.current,
                            onFocusOutside: function(e) {
                                null !== e.target.closest(".block-editor-block-inspector") || e.target.classList.contains("iso-inspector") || (n(!1), e.preventDefault(), e.stopPropagation())
                            }
                        }, (0, E.createElement)(Ee.Slot, {
                            scope: "isolated/editor"
                        }))
                    };
                const {
                    Fill: ut,
                    Slot: dt
                } = (0, C.createSlotFill)("IsolatedToolbar"), pt = e => {
                    let {
                        children: t
                    } = e;
                    return (0, E.createElement)(ut, null, t)
                };
                pt.Slot = function(e) {
                    return (0, E.createElement)(dt, null, (e => e))
                };
                var mt = pt,
                    ft = e => {
                        var t, n, o;
                        const r = (0, E.useRef)(null),
                            {
                                settings: i,
                                editorMode: s,
                                renderMoreMenu: l
                            } = e,
                            a = (0, O.useViewportMatch)("huge", ">="),
                            {
                                inspector: c
                            } = (null === (t = i.iso) || void 0 === t ? void 0 : t.toolbar) || {},
                            {
                                moreMenu: u
                            } = i.iso || {},
                            d = (null == i || null === (n = i.iso) || void 0 === n || null === (o = n.sidebar) || void 0 === o ? void 0 : o.inspector) || !1,
                            {
                                openGeneralSidebar: p,
                                closeGeneralSidebar: m
                            } = (0, k.useDispatch)("isolated/editor"),
                            {
                                setIsInserterOpened: f
                            } = (0, k.useDispatch)("isolated/editor"),
                            {
                                isEditorSidebarOpened: g,
                                isBlockSelected: h,
                                hasBlockSelected: v,
                                isInserterOpened: b,
                                isEditing: y
                            } = (0, k.useSelect)((e => ({
                                isEditing: e("isolated/editor"),
                                isEditorSidebarOpened: e("isolated/editor").isEditorSidebarOpened(),
                                isBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                hasBlockSelected: !!e("core/block-editor").getBlockSelectionStart(),
                                isInserterOpened: e("isolated/editor").isInserterOpened()
                            })), []);

                        function _(e) {
                            e ? p(v ? "edit-post/block" : "edit-post/document") : m()
                        }
                        return (0, E.useEffect)((() => {
                            d || m()
                        }), []), (0, E.useEffect)((() => {
                            d || y || h || !g || m()
                        }), [y]), (0, E.useEffect)((() => {
                            g && !a && f(!1)
                        }), [g, a]), (0, E.useEffect)((() => {
                            !b || a && d || m()
                        }), [b, a]), (0, E.createElement)("div", {
                            className: "edit-post-editor-regions__header",
                            role: "region",
                            tabIndex: -1
                        }, (0, E.createElement)("div", {
                            className: "edit-post-header"
                        }, (0, E.createElement)("div", {
                            className: "edit-post-header__toolbar"
                        }, (0, E.createElement)(at, {
                            settings: i
                        })), (0, E.createElement)("div", {
                            className: "edit-post-header__settings",
                            ref: r
                        }, (0, E.createElement)(mt.Slot, null), c && (0, E.createElement)(C.Button, {
                            icon: _e,
                            label: (0, N.__)("Settings"),
                            onClick: () => _(!g),
                            isPressed: g,
                            "aria-expanded": g,
                            disabled: "text" === s
                        }), g && !d && (0, E.createElement)(ct, {
                            button: r,
                            onToggle: _
                        }), u && (0, E.createElement)(Qe, {
                            settings: i,
                            onClick: () => m(),
                            renderMoreMenu: l
                        }))))
                    },
                    gt = (0, E.createElement)(D.SVG, {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24"
                    }, (0, E.createElement)(D.Path, {
                        d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
                    }));

                function ht() {
                    const {
                        setIsInserterOpened: e
                    } = (0, k.useDispatch)("isolated/editor"), t = (0, O.useViewportMatch)("medium", "<"), n = t ? "div" : C.VisuallyHidden, [o, r] = (0, O.__experimentalUseDialog)({
                        onClose: () => e(!1),
                        focusOnMount: null
                    });
                    return (0, E.createElement)("div", w({
                        ref: o
                    }, r, {
                        className: "edit-post-editor__inserter-panel"
                    }), (0, E.createElement)(n, {
                        className: "edit-post-editor__inserter-panel-header"
                    }, (0, E.createElement)(C.Button, {
                        icon: gt,
                        onClick: () => e(!1)
                    })), (0, E.createElement)("div", {
                        className: "edit-post-editor__inserter-panel-content"
                    }, (0, E.createElement)(P.__experimentalLibrary, {
                        showMostUsedBlocks: !1,
                        showInserterHelpPanel: !0,
                        shouldFocusBlock: t
                    })))
                }
                var vt = (0, E.createElement)(D.SVG, {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24"
                }, (0, E.createElement)(D.Path, {
                    d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
                }));

                function Et() {
                    const {
                        setIsListViewOpened: e
                    } = (0, k.useDispatch)("isolated/editor"), {
                        clearSelectedBlock: t,
                        selectBlock: n
                    } = (0, k.useDispatch)(P.store), o = (0, O.useFocusOnMount)("firstElement"), r = (0, O.useFocusReturn)(), i = `edit-post-editor__list-view-panel-label-${(0,O.useInstanceId)(Et)}`;
                    return (0, E.createElement)("div", {
                        "aria-labelledby": i,
                        className: "edit-post-editor__list-view-panel",
                        onKeyDown: function(t) {
                            t.keyCode !== R.ESCAPE || t.defaultPrevented || (t.preventDefault(), e(!1))
                        }
                    }, (0, E.createElement)("div", {
                        className: "edit-post-editor__list-view-panel-header"
                    }, (0, E.createElement)("strong", {
                        id: i
                    }, (0, N.__)("List view")), (0, E.createElement)(C.Button, {
                        icon: vt,
                        label: (0, N.__)("Close list view sidebar"),
                        onClick: () => e(!1)
                    })), (0, E.createElement)("div", {
                        className: "edit-post-editor__list-view-panel-content",
                        ref: (0, O.useMergeRefs)([r, o])
                    }, (0, E.createElement)(P.__experimentalListView, {
                        onSelect: async function(e) {
                            await t(), n(e, -1)
                        },
                        showNestedBlocks: !0,
                        __experimentalPersistentListViewFeatures: !0
                    })))
                }
                var bt = e => {
                    let {
                        editorMode: t
                    } = e;
                    const n = (0, O.useViewportMatch)("medium", "<"),
                        {
                            showBlockBreadcrumbs: o,
                            documentLabel: r
                        } = (0, k.useSelect)((e => {
                            const {
                                getPostTypeLabel: t
                            } = e(y.store), n = t(), {
                                isFeatureActive: o
                            } = e("isolated/editor");
                            return {
                                hasFixedToolbar: o("fixedToolbar"),
                                showBlockBreadcrumbs: !1,
                                // translators: Default label for the Document in the Block Breadcrumb.
                                documentLabel: n || (0, N._x)("Document", "noun")
                            }
                        }), []);
                    return (0, E.createElement)("div", {
                        className: "edit-post-layout__footer"
                    }, o && !n && "visual" === t && (0, E.createElement)(P.BlockBreadcrumb, {
                        rootLabelText: r
                    }), (0, E.createElement)(Re.Slot, null))
                };
                const {
                    Fill: yt,
                    Slot: _t
                } = (0, C.createSlotFill)("IsolatedFooter"), wt = e => {
                    let {
                        children: t
                    } = e;
                    return (0, E.createElement)(yt, null, t)
                };
                wt.Slot = function() {
                    return (0, E.createElement)(_t, null, (e => e))
                };
                var Ct = wt;
                const St = {
                    secondarySidebar: (0, N.__)("Block library"),
                    /* translators: accessibility text for the editor top bar landmark region. */
                    header: (0, N.__)("Editor top bar"),
                    /* translators: accessibility text for the editor content landmark region. */
                    body: (0, N.__)("Editor content"),
                    /* translators: accessibility text for the editor settings landmark region. */
                    sidebar: (0, N.__)("Editor settings"),
                    /* translators: accessibility text for the editor publish landmark region. */
                    actions: (0, N.__)("Editor publish"),
                    /* translators: accessibility text for the editor footer landmark region. */
                    footer: (0, N.__)("Editor footer")
                };
                var kt = (0, k.withDispatch)((e => {
                        const {
                            redo: t,
                            undo: n
                        } = e("isolated/editor");
                        return {
                            redo: t,
                            undo: n
                        }
                    }))((function(e) {
                        var t, n, o, r, i, s, l, a, c, u;
                        const {
                            isEditing: d,
                            editorMode: p,
                            children: m,
                            undo: f,
                            redo: g,
                            settings: h,
                            renderMoreMenu: v
                        } = e, b = (0, O.useViewportMatch)("medium", "<"), _ = (null == h || null === (t = h.iso) || void 0 === t || null === (n = t.sidebar) || void 0 === n ? void 0 : n.inspector) || !1, w = (null == h || null === (o = h.iso) || void 0 === o || null === (r = o.sidebar) || void 0 === r ? void 0 : r.inserter) || !1, S = null === (i = null == h || null === (s = h.iso) || void 0 === s ? void 0 : s.header) || void 0 === i || i, x = (null == h || null === (l = h.iso) || void 0 === l ? void 0 : l.footer) || !1, {
                            sidebarIsOpened: A,
                            hasFixedToolbar: F,
                            isInserterOpened: L,
                            isListViewOpened: B,
                            showIconLabels: M,
                            isFullscreenActive: N,
                            previousShortcut: D,
                            nextShortcut: U
                        } = (0, k.useSelect)((e => {
                            const {
                                isFeatureActive: t,
                                isInserterOpened: n,
                                isListViewOpened: o,
                                isOptionActive: r
                            } = e("isolated/editor");
                            return {
                                sidebarIsOpened: !!e(ie).getActiveComplementaryArea("isolated/editor"),
                                hasFixedToolbar: t("fixedToolbar"),
                                isInserterOpened: n(),
                                isListViewOpened: o(),
                                isFullscreenActive: r("fullscreenMode"),
                                showIconLabels: t("showIconLabels"),
                                previousShortcut: e(T.store).getAllShortcutKeyCombinations("core/edit-post/previous-region"),
                                nextShortcut: e(T.store).getAllShortcutKeyCombinations("core/edit-post/next-region")
                            }
                        }), []), z = I()("edit-post-layout", "is-mode-" + p, {
                            "is-sidebar-opened": A,
                            "has-fixed-toolbar": F,
                            "show-icon-labels": M
                        });
                        (0, E.useEffect)((() => {
                            const e = document.querySelector("html");
                            return N ? e.classList.add("is-fullscreen-mode") : e.classList.remove("is-fullscreen-mode"), () => {
                                e && e.classList.remove("is-fullscreen-mode")
                            }
                        }), [N]);
                        const V = S ? (0, E.createElement)(ft, {
                            editorMode: p,
                            settings: h,
                            renderMoreMenu: v
                        }) : null;
                        return (0, E.createElement)(E.Fragment, null, (0, E.createElement)(Ie, {
                            documentInspector: null !== (a = null == h || null === (c = h.iso) || void 0 === c || null === (u = c.toolbar) || void 0 === u ? void 0 : u.documentInspector) && void 0 !== a && a
                        }), (0, E.createElement)(be, {
                            isActive: N
                        }), (0, E.createElement)(ye, {
                            className: z,
                            labels: St,
                            header: V,
                            secondarySidebar: w ? "visual" === p && L ? (0, E.createElement)(ht, null) : "visual" === p && B ? (0, E.createElement)(Et, null) : null : null,
                            sidebar: (!b || A) && _ && (0, E.createElement)(Ee.Slot, {
                                scope: "isolated/editor"
                            }),
                            notices: (0, E.createElement)(y.EditorSnackbars, null),
                            content: (0, E.createElement)(E.Fragment, null, (0, E.createElement)(y.EditorNotices, null), d && (0, E.createElement)(E.Fragment, null, (0, E.createElement)(P.BlockEditorKeyboardShortcuts, null), (0, E.createElement)(P.BlockEditorKeyboardShortcuts.Register, null)), (0, E.createElement)(C.KeyboardShortcuts, {
                                bindGlobal: !1,
                                shortcuts: {
                                    [R.rawShortcut.primary("z")]: f,
                                    [R.rawShortcut.primaryShift("z")]: g
                                }
                            }, "visual" === p && (0, E.createElement)(Ue, {
                                styles: {}
                            }), "text" === p && (0, E.createElement)(je, null)), m),
                            footer: x && (0, E.createElement)(bt, {
                                editorMode: p
                            }),
                            actions: (0, E.createElement)(Ct.Slot, null),
                            shortcuts: {
                                previous: D,
                                next: U
                            }
                        }))
                    })),
                    Tt = (0, O.compose)([(0, k.withSelect)(((e, t) => {
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
                    })), (0, k.withDispatch)(((e, t) => {
                        const {
                            updateBlocksWithUndo: n,
                            updateBlocksWithoutUndo: o
                        } = e("isolated/editor"), {
                            onInput: r,
                            onChange: i
                        } = t;
                        return {
                            onChange: function() {
                                for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                                null == i || i(...t), n(...t)
                            },
                            onInput: function() {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                null == r || r(...t), o(...t)
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
                            onLoad: u
                        } = e;
                        return (0, E.useEffect)((() => {
                            (async () => {
                                const e = await async function(e, t) {
                                    var n;
                                    return (!(n = t) || "object" != typeof n && "function" != typeof n || "function" != typeof n.then ? new Promise((e => {
                                        e(t ? t(M.parse, M.rawHandler) : [])
                                    })) : t).then((t => function(e, t, n, o) {
                                        if (void 0 === e) return o;
                                        if (o && o.length > 0) return o;
                                        if (t) {
                                            const n = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                                            if (n) return (0, M.parse)(n.content)
                                        }
                                        return n ? (0, M.synchronizeBlocksWithTemplate)(o, n) : []
                                    }(e.iso.patterns, e.iso.currentPattern, e.editor.template, t)))
                                }(a, u);
                                e.length > 0 && (!t || 0 === t.length) && n(e, {
                                    isInitialContent: !0
                                })
                            })()
                        }), []), (0, E.createElement)(P.BlockEditorProvider, {
                            value: t || [],
                            onInput: n,
                            onChange: o,
                            useSubRegistry: !1,
                            selection: r,
                            settings: a.editor
                        }, (0, E.createElement)(kt, {
                            isEditing: i,
                            editorMode: s,
                            settings: a,
                            renderMoreMenu: c
                        }, l), (0, E.createElement)(C.Popover.Slot, null))
                    }));

                function xt(e, t) {
                    const n = ["core/block-editor", "core/editor"];
                    return {
                        dispatch(t) {
                            return null === xt.targetDispatch || -1 === n.indexOf(t) ? e.dispatch(t) : xt.targetDispatch(t)
                        },
                        select(t) {
                            return null === xt.targetSelect || -1 === n.indexOf(t) ? e.select(t) : xt.targetSelect(t)
                        }
                    }
                }
                xt.targetSelect = null, xt.targetDispatch = null, xt.setEditor = function(e, t) {
                    this.targetSelect = e, this.targetDispatch = t
                }, xt.resetEditor = function() {
                    this.targetSelect = null, this.targetDispatch = null
                };
                var It = xt,
                    Ot = (0, O.compose)([(0, k.withSelect)((e => {
                        const {
                            isEditing: t
                        } = e("isolated/editor");
                        return {
                            isEditing: t()
                        }
                    })), (0, k.withDispatch)(((e, t, n) => {
                        let {
                            select: o
                        } = n;
                        return {
                            hotSwap: t => {
                                It.resetEditor(), t && It.setEditor(o, e)
                            }
                        }
                    }))])((function(e) {
                        let {
                            isEditing: t,
                            hotSwap: n
                        } = e;
                        return (0, E.useEffect)((() => {
                            n(t)
                        }), [t]), null
                    })),
                    At = (0, O.compose)([(0, k.withSelect)((e => {
                        const {
                            isEditorReady: t,
                            getEditorMode: n,
                            isEditing: o,
                            isFeatureActive: r,
                            isOptionActive: i
                        } = e("isolated/editor");
                        return {
                            isEditorReady: t(),
                            editorMode: n(),
                            isEditing: o(),
                            hasFixedToolbar: r("fixedToolbar"),
                            isPreview: i("preview")
                        }
                    })), (0, k.withDispatch)((e => {
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
                            isEditorReady: u,
                            editorMode: d,
                            isEditing: p,
                            setEditing: m,
                            hasFixedToolbar: f,
                            isPreview: g
                        } = e, [h, {
                            width: v
                        }] = (0, O.useResizeObserver)(), b = I()(o, {
                            "iso-editor": !0,
                            "is-large": !!v && v >= 720,
                            "is-medium": !v || v >= 480 && v < 720,
                            "is-small": !!v && v < 480,
                            "iso-editor__loading": !u,
                            "iso-editor__selected": p,
                            "block-editor": !0,
                            "edit-post-layout": !0,
                            "has-fixed-toolbar": f,
                            ["is-mode-" + d]: !0,
                            "is-preview-mode": g
                        });
                        return (0, E.createElement)("div", {
                            className: b
                        }, (0, E.createElement)(y.ErrorBoundary, {
                            onError: r
                        }, (0, E.createElement)(Ot, null), h, (0, E.createElement)(B, {
                            onOutside: () => m(!1),
                            onFocus: () => !p && m(!0)
                        }, (0, E.createElement)(Tt, {
                            blocks: c,
                            settings: n,
                            renderMoreMenu: i,
                            onLoad: s,
                            onInput: l,
                            onChange: a
                        }, t))))
                    }));
                const Ft = "@@redux-undo/UNDO",
                    Lt = "@@redux-undo/REDO",
                    Bt = "@@redux-undo/JUMP_TO_FUTURE",
                    Mt = "@@redux-undo/JUMP_TO_PAST",
                    Pt = "@@redux-undo/JUMP",
                    Rt = "@@redux-undo/CLEAR_HISTORY",
                    Nt = {
                        undo() {
                            return {
                                type: Ft
                            }
                        },
                        redo() {
                            return {
                                type: Lt
                            }
                        },
                        jumpToFuture(e) {
                            return {
                                type: Bt,
                                index: e
                            }
                        },
                        jumpToPast(e) {
                            return {
                                type: Mt,
                                index: e
                            }
                        },
                        jump(e) {
                            return {
                                type: Pt,
                                index: e
                            }
                        },
                        clearHistory() {
                            return {
                                type: Rt
                            }
                        }
                    };

                function Dt(e, t = []) {
                    return Array.isArray(e) ? e : "string" == typeof e ? [e] : t
                }

                function Ut(e, t, n, o = null) {
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
                let zt, Vt;
                const Ht = "#9E9E9E",
                    jt = "#03A9F4",
                    Gt = "#4CAF50";

                function Wt(e, t, n) {
                    return [`%c${e}`, `color: ${t}; font-weight: bold`, n]
                }

                function Kt(e) {
                    zt && (console.group ? Vt.next = Wt("next history", Gt, e) : Vt.next = ["next history", e], function() {
                        const {
                            header: e,
                            prev: t,
                            next: n,
                            action: o,
                            msgs: r
                        } = Vt;
                        console.group ? (console.groupCollapsed(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r), console.groupEnd()) : (console.log(...e), console.log(...t), console.log(...o), console.log(...n), console.log(...r))
                    }())
                }

                function Yt(...e) {
                    zt && (Vt.msgs = Vt.msgs.concat([...e, "\n"]))
                }

                function $t(e, t) {
                    const n = Ut([], e, []);
                    return t && (n._latestUnfiltered = null), n
                }

                function Jt(e, t) {
                    if (t < 0 || t >= e.future.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e;
                    return Ut([...n, r, ...o.slice(0, t)], o[t], o.slice(t + 1))
                }

                function qt(e, t) {
                    if (t < 0 || t >= e.past.length) return e;
                    const {
                        past: n,
                        future: o,
                        _latestUnfiltered: r
                    } = e, i = n.slice(0, t), s = [...n.slice(t + 1), r, ...o];
                    return Ut(i, n[t], s)
                }

                function Xt(e, t) {
                    return t > 0 ? Jt(e, t - 1) : t < 0 ? qt(e, e.past.length + t) : e
                }
                var Zt = window.wp.isShallowEqual,
                    Qt = n.n(Zt);
                const en = {
                    editCount: 0,
                    selection: null,
                    blocks: null
                };

                function tn(e, t) {
                    return e.find((e => e.clientId === t.clientId))
                }

                function nn(e, t) {
                    const {
                        type: n,
                        selection: o
                    } = e;
                    if ("UPDATE_BLOCKS_WITHOUT_UNDO" === n) return !1;
                    if (!o) return !0;
                    if (Qt()(o, t.selection)) {
                        const n = tn(t.blocks, o.selectionStart),
                            r = tn(e.blocks, o.selectionStart);
                        if (n && r && Qt()(n.attributes, r.attributes)) return !1
                    }
                    return !0
                }
                var on = function(e, t = {}) {
                    ! function(e) {
                        zt = e
                    }(t.debug);
                    const n = {
                            limit: void 0,
                            filter: () => !0,
                            groupBy: () => null,
                            undoType: Ft,
                            redoType: Lt,
                            jumpToPastType: Mt,
                            jumpToFutureType: Bt,
                            jumpType: Pt,
                            neverSkipReducer: !1,
                            ignoreInitialState: !1,
                            syncFilter: !1,
                            ...t,
                            initTypes: Dt(t.initTypes, ["@@redux-undo/INIT"]),
                            clearHistoryType: Dt(t.clearHistoryType, [Rt])
                        },
                        o = n.neverSkipReducer ? (t, n, ...o) => ({
                            ...t,
                            present: e(t.present, n, ...o)
                        }) : e => e;
                    let r;
                    return (t = r, i = {}, ...s) => {
                        ! function(e, t) {
                            Vt = {
                                header: [],
                                prev: [],
                                action: [],
                                next: [],
                                msgs: []
                            }, zt && (console.group ? (Vt.header = ["%credux-undo", "font-style: italic", "action", e.type], Vt.action = Wt("action", jt, e), Vt.prev = Wt("prev history", Ht, t)) : (Vt.header = ["redux-undo action", e.type], Vt.action = ["action", e], Vt.prev = ["prev history", t]))
                        }(i, t);
                        let l, a = t;
                        if (!r) {
                            if (Yt("history is uninitialized"), void 0 === t) return a = $t(e(t, {
                                type: "@@redux-undo/CREATE_HISTORY"
                            }, ...s), n.ignoreInitialState), Yt("do not set initialState on probe actions"), Kt(a), a;
                            ! function(e) {
                                return typeof e.present < "u" && typeof e.future < "u" && typeof e.past < "u" && Array.isArray(e.future) && Array.isArray(e.past)
                            }(t) ? (a = r = $t(t, n.ignoreInitialState), Yt("initialHistory initialized: initialState is not a history", r)) : (a = r = n.ignoreInitialState ? t : Ut(t.past, t.present, t.future), Yt("initialHistory initialized: initialState is a history", r))
                        }
                        switch (i.type) {
                            case void 0:
                                return a;
                            case n.undoType:
                                return l = Xt(a, -1), Yt("perform undo"), Kt(l), o(l, i, ...s);
                            case n.redoType:
                                return l = Xt(a, 1), Yt("perform redo"), Kt(l), o(l, i, ...s);
                            case n.jumpToPastType:
                                return l = qt(a, i.index), Yt(`perform jumpToPast to ${i.index}`), Kt(l), o(l, i, ...s);
                            case n.jumpToFutureType:
                                return l = Jt(a, i.index), Yt(`perform jumpToFuture to ${i.index}`), Kt(l), o(l, i, ...s);
                            case n.jumpType:
                                return l = Xt(a, i.index), Yt(`perform jump to ${i.index}`), Kt(l), o(l, i, ...s);
                            case
                            function(e, t) {
                                return t.indexOf(e) > -1 ? e : !e
                            }(i.type, n.clearHistoryType):
                                return l = $t(a.present, n.ignoreInitialState), Yt("perform clearHistory"), Kt(l), o(l, i, ...s);
                            default:
                                if (l = e(a.present, i, ...s), n.initTypes.some((e => e === i.type))) return Yt("reset history due to init action"), Kt(r), r;
                                if (a._latestUnfiltered === l) return a;
                                if ("function" == typeof n.filter && !n.filter(i, l, a)) {
                                    const e = Ut(a.past, l, a.future, a.group);
                                    return n.syncFilter || (e._latestUnfiltered = a._latestUnfiltered), Yt("filter ignored action, not storing it in past"), Kt(e), e
                                }
                                const t = n.groupBy(i, l, a);
                                if (null != t && t === a.group) {
                                    const e = Ut(a.past, l, a.future, a.group);
                                    return Yt("groupBy grouped the action with the previous action"), Kt(e), e
                                }
                                return a = function(e, t, n, o) {
                                    const r = e.past.length + 1;
                                    Yt("inserting", t), Yt("new free: ", n - r);
                                    const {
                                        past: i,
                                        _latestUnfiltered: s
                                    } = e, l = n && n <= r, a = i.slice(l ? 1 : 0);
                                    return Ut(null != s ? [...a, s] : a, t, [], o)
                                }(a, l, n.limit, t), Yt("inserted new state into history"), Kt(a), a
                        }
                    }
                }((function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : en,
                        t = arguments.length > 1 ? arguments[1] : void 0;
                    switch (t.type) {
                        case "UPDATE_BLOCKS_WITHOUT_UNDO":
                        case "UPDATE_BLOCKS_WITH_UNDO":
                            return {
                                ...e, editCount: nn(t, e) ? e.editCount + 1 : e.editCount, blocks: t.blocks, selection: t.selection
                            }
                    }
                    return e
                }), {
                    groupBy: (e, t, n) => t.editCount
                });
                const rn = {
                    * undo() {
                        return yield Nt.undo()
                    },
                    * redo() {
                        return yield Nt.redo()
                    },
                    * updateBlocksWithUndo(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return yield {
                            type: "UPDATE_BLOCKS_WITH_UNDO",
                            blocks: e,
                            ...t
                        }
                    },
                    * updateBlocksWithoutUndo(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return yield {
                            type: "UPDATE_BLOCKS_WITHOUT_UNDO",
                            blocks: e,
                            ...t
                        }
                    }
                };
                var sn = rn;
                const ln = {
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
                            toc: !1,
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

                function an(e, t, n) {
                    const o = [(0, M.serialize)((0, M.createBlock)("core/paragraph")), (0, M.serialize)((0, M.createBlock)("core/paragraph", {
                            className: ""
                        }))],
                        r = ((e, t) => e && e.find((e => e.name === t)))(e, t);
                    return r && o.push((0, M.serialize)((0, M.parse)(r.content))), n && o.push((0, M.serialize)((0, M.synchronizeBlocksWithTemplate)([], n))), o
                }
                var cn = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ln,
                        t = arguments.length > 1 ? arguments[1] : void 0;
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
                                ignoredContent: an(o, n, t.settings.editor.template),
                                gutenbergTemplate: t.settings.editor.template,
                                settings: {
                                    ...e.settings,
                                    ...t.settings.iso
                                }
                            }
                        }
                        case "SET_CURRENT_PATTERN":
                            return {
                                ...e, currentPattern: t.pattern, ignoredContent: an(e.patterns, t.pattern, e.gutenbergTemplate)
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
                const un = {
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
                        yield k.controls.dispatch(ie, "enableComplementaryArea", "isolated/editor", e)
                    },
                    * closeGeneralSidebar() {
                        yield k.controls.dispatch(ie, "disableComplementaryArea", "isolated/editor")
                    },
                    setIsListViewOpened(e) {
                        return {
                            type: "SET_LISTVIEW_OPEN",
                            isOpen: e
                        }
                    }
                };
                var dn = un,
                    pn = (e, t) => {
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
                    mn = {
                        toggleFeature(e) {
                            return {
                                type: "TOGGLE_FEATURE",
                                feature: e
                            }
                        }
                    };
                const fn = {};
                var gn = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : fn,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        return "TOGGLE_OPTION" === t.type ? {
                            ...e,
                            [t.option]: !e[t.option] || !e[t.option]
                        } : e
                    },
                    hn = {
                        toggleOption(e) {
                            return {
                                type: "TOGGLE_OPTION",
                                option: e
                            }
                        }
                    };

                function vn(e) {
                    return e.editor.editorMode
                }

                function En(e) {
                    return e.editor.settings
                }

                function bn(e) {
                    return e.editor.isReady
                }

                function yn(e) {
                    return e.editor.currentPattern
                }

                function wn(e) {
                    const {
                        currentPattern: t,
                        patterns: n
                    } = e.editor;
                    if (t && n)
                        for (let e = 0; e < n.length; e++)
                            if (n[e].name === t) return n[e];
                    return null
                }

                function Cn(e) {
                    return e.editor.ignoredContent
                }

                function Sn(e, t) {
                    const {
                        patterns: n = []
                    } = e.editor;
                    let o = n.find((e => e.name === t));
                    return o || (o = n.find((e => e.name.replace("p2/", "") === t)), o || null)
                }

                function kn(e) {
                    return e.editor.isInserterOpened
                }
                const Tn = (0, k.createRegistrySelector)((e => () => {
                    const t = e(ie).getActiveComplementaryArea("isolated/editor");
                    return (0, A.includes)(["edit-post/document", "edit-post/block"], t)
                }));

                function xn(e) {
                    return e.editor.isEditing
                }

                function In(e) {
                    return e.editor.patterns
                }

                function On(e) {
                    return e.editor.isListViewOpened
                }

                function An(e) {
                    return e.editor.deviceType
                }

                function Fn(e) {
                    return e.editor.canvasStyles
                }

                function Ln(e) {
                    return e.editor.isIframePreview || ["Tablet", "Mobile"].includes(e.editor.deviceType)
                }

                function Bn(e) {
                    return e.blocks.present.blocks
                }

                function Mn(e) {
                    return e.blocks.present.selection
                }

                function Pn(e) {
                    var t;
                    return "visual" === vn(e) && (null !== (t = e.collab) && void 0 !== t && t.undoManager ? !!e.collab.undoManager.undoStack.length : e.blocks.past.length > 0)
                }

                function Rn(e) {
                    var t;
                    return "visual" === vn(e) && (null !== (t = e.collab) && void 0 !== t && t.undoManager ? !!e.collab.undoManager.redoStack.length : e.blocks.future.length > 0)
                }

                function Nn(e) {
                    return e.blocks.present.editCount
                }

                function Dn(e, t) {
                    return !!e.preferences[t] && e.preferences[t]
                }

                function Un(e, t) {
                    return !!e.options[t] && e.options[t]
                }

                function zn(e) {
                    return {
                        type: "SET_COLLAB_YJS_DOC",
                        doc: e
                    }
                }

                function Vn(e) {
                    return {
                        type: "SET_COLLAB_UNDO_MANAGER",
                        undoManager: e
                    }
                }

                function Hn(e) {
                    return e.collab.yDoc
                }

                function jn(e) {
                    return e.collab.undoManager
                }

                function Gn(e) {
                    return {
                        type: "SET_AVAILABLE_COLLAB_PEERS",
                        peers: e
                    }
                }

                function Wn(e, t) {
                    return {
                        type: "SET_COLLAB_PEER_SELECTION",
                        peerId: e,
                        selection: t
                    }
                }

                function Kn(e) {
                    return e.collabPeers
                }

                function Yn(e) {
                    return Object.keys(e.collabPeers).length > 0
                }
                const $n = n(227)("iso-editor:collab:undo"),
                    Jn = e => {
                        const {
                            clientId: t,
                            attributeKey: n
                        } = e.select("core/block-editor").getSelectionStart();
                        return "string" == typeof n ? {
                            clientId: t,
                            attributeKey: n
                        } : void 0
                    },
                    qn = (0, k.createRegistryControl)((e => t => {
                        const n = e.select("isolated/editor").getYDoc();
                        return n && !t.isTriggeredByYDoc && n.applyLocalChangesToYDoc({
                            blocks: t.blocks
                        }, {
                            isInitialContent: t.isInitialContent,
                            richTextHint: Jn(e)
                        }), t
                    }));
                var Xn = {
                        UPDATE_BLOCKS_WITH_UNDO: qn,
                        UPDATE_BLOCKS_WITHOUT_UNDO: qn,
                        [Nt.undo().type]: (0, k.createRegistryControl)((e => t => {
                            const n = e.select("isolated/editor").getUndoManager();
                            if (!n) return $n("Undoing from redux-undo state"), t;
                            $n("Undoing from yjs undoManager"), $n("undo"), n.undo()
                        })),
                        [Nt.redo().type]: (0, k.createRegistryControl)((e => t => {
                            if (!e.select("isolated/editor").getUndoManager()) return t;
                            $n("redo"), e.select("isolated/editor").getUndoManager().redo()
                        }))
                    },
                    Zn = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = arguments.length > 1 ? arguments[1] : void 0;
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
                    Qn = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = arguments.length > 1 ? arguments[1] : void 0;
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
                                return t.peers.reduce(((t, n) => {
                                    let {
                                        id: o,
                                        name: r,
                                        color: i,
                                        avatarUrl: s
                                    } = n;
                                    return t[o] = e[o] || {
                                        name: r,
                                        color: i,
                                        avatarUrl: s
                                    }, t
                                }), {})
                        }
                        return e
                    },
                    eo = {
                        CONVERT_BLOCK_TO_STATIC: (0, k.createRegistryControl)((e => t => {
                            let {
                                clientId: n
                            } = t;
                            const o = e.select("core/block-editor").getBlock(n),
                                r = e.select("core").getEditedEntityRecord("postType", "wp_block", o.attributes.ref),
                                i = (0, M.parse)(r.content);
                            e.dispatch("core/block-editor").replaceBlocks(o.clientId, i)
                        })),
                        CONVERT_BLOCKS_TO_REUSABLE: (0, k.createRegistryControl)((e => async function(t) {
                            let {
                                clientIds: n
                            } = t;
                            const o = {
                                    title: (0, N.__)("Untitled Reusable Block"),
                                    content: (0, M.serialize)(e.select("core/block-editor").getBlocksByClientId(n)),
                                    status: "publish"
                                },
                                r = await e.dispatch("core").saveEntityRecord("postType", "wp_block", o),
                                i = (0, M.createBlock)("core/block", {
                                    ref: r.id
                                });
                            e.dispatch("core/block-editor").replaceBlocks(n, i), e.dispatch(reusableBlocksStore).__experimentalSetEditingReusableBlock(i.clientId, !0)
                        })),
                        DELETE_REUSABLE_BLOCK: (0, k.createRegistryControl)((e => async function(t) {
                            let {
                                id: n
                            } = t;
                            if (!e.select("core").getEditedEntityRecord("postType", "wp_block", n)) return;
                            const o = e.select("core/block-editor").getBlocks().filter((e => (0, M.isReusableBlock)(e) && e.attributes.ref === n)).map((e => e.clientId));
                            o.length && e.dispatch("core/block-editor").removeBlocks(o), await e.dispatch("core").deleteEntityRecord("postType", "wp_block", n)
                        }))
                    };

                function* to(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCK_TO_STATIC",
                            clientId: e
                        }
                    }(e)
                }

                function* no(e) {
                    yield function(e) {
                        return {
                            type: "CONVERT_BLOCKS_TO_REUSABLE",
                            clientIds: e
                        }
                    }(e)
                }

                function* oo(e) {
                    yield function(e) {
                        return {
                            type: "DELETE_REUSABLE_BLOCK",
                            id: e
                        }
                    }(e)
                }

                function ro(e, t) {
                    return {
                        type: "SET_EDITING_REUSABLE_BLOCK",
                        clientId: e,
                        isEditing: t
                    }
                }
                var io = (0, k.combineReducers)({
                    isEditingReusableBlock: function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        return "SET_EDITING_REUSABLE_BLOCK" === (null == t ? void 0 : t.type) ? {
                            ...e,
                            [t.clientId]: t.isEditing
                        } : e
                    }
                });

                function so(e, t) {
                    return e.isEditingReusableBlock[t]
                }
                var lo = {
                    actions: m,
                    controls: eo,
                    reducer: io,
                    selectors: f
                };
                const ao = (e, t) => ({
                        type: "SET_DEFAULT_COMPLEMENTARY_AREA",
                        scope: e,
                        area: t
                    }),
                    co = (e, t) => n => {
                        let {
                            registry: o,
                            dispatch: r
                        } = n;
                        t && (o.select(K.store).get(e, "isComplementaryAreaVisible") || o.dispatch(K.store).set(e, "isComplementaryAreaVisible", !0), r({
                            type: "ENABLE_COMPLEMENTARY_AREA",
                            scope: e,
                            area: t
                        }))
                    },
                    uo = e => t => {
                        let {
                            registry: n
                        } = t;
                        n.select(K.store).get(e, "isComplementaryAreaVisible") && n.dispatch(K.store).set(e, "isComplementaryAreaVisible", !1)
                    },
                    po = (e, t) => n => {
                        let {
                            registry: o
                        } = n;
                        if (!t) return;
                        const r = o.select(K.store).get(e, "pinnedItems");
                        !0 !== (null == r ? void 0 : r[t]) && o.dispatch(K.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !0
                        })
                    },
                    mo = (e, t) => n => {
                        let {
                            registry: o
                        } = n;
                        if (!t) return;
                        const r = o.select(K.store).get(e, "pinnedItems");
                        o.dispatch(K.store).set(e, "pinnedItems", {
                            ...r,
                            [t]: !1
                        })
                    };

                function fo(e, t) {
                    return function(n) {
                        let {
                            registry: o
                        } = n;
                        W()("dispatch( 'core/interface' ).toggleFeature", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).toggle"
                        }), o.dispatch(K.store).toggle(e, t)
                    }
                }

                function go(e, t, n) {
                    return function(o) {
                        let {
                            registry: r
                        } = o;
                        W()("dispatch( 'core/interface' ).setFeatureValue", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).set"
                        }), r.dispatch(K.store).set(e, t, !!n)
                    }
                }

                function ho(e, t) {
                    return function(n) {
                        let {
                            registry: o
                        } = n;
                        W()("dispatch( 'core/interface' ).setFeatureDefaults", {
                            since: "6.0",
                            alternative: "dispatch( 'core/preferences' ).setDefaults"
                        }), o.dispatch(K.store).setDefaults(e, t)
                    }
                }
                const vo = (0, k.createRegistrySelector)((e => (t, n) => {
                        var o;
                        const r = e(K.store).get(n, "isComplementaryAreaVisible");
                        if (void 0 !== r) return r ? null == t || null === (o = t.complementaryAreas) || void 0 === o ? void 0 : o[n] : null
                    })),
                    Eo = (0, k.createRegistrySelector)((e => (t, n, o) => {
                        var r;
                        const i = e(K.store).get(n, "pinnedItems");
                        return null === (r = null == i ? void 0 : i[o]) || void 0 === r || r
                    })),
                    bo = (0, k.createRegistrySelector)((e => (t, n, o) => (W()("select( 'core/interface' ).isFeatureActive( scope, featureName )", {
                        since: "6.0",
                        alternative: "select( 'core/preferences' ).get( scope, featureName )"
                    }), !!e(K.store).get(n, o))));
                var yo = (0, k.combineReducers)({
                        complementaryAreas: function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = arguments.length > 1 ? arguments[1] : void 0;
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
                    _o = {
                        reducer: yo,
                        actions: g,
                        selectors: h
                    };
                let wo = [];
                const Co = (0, O.createHigherOrderComponent)((e => (0, k.withRegistry)((t => {
                    const {
                        registry: n,
                        settings: o,
                        ...r
                    } = t, m = function(e) {
                        var t, n, o, r, i, s, l, a, c, u, d, p, m, f, g, h, v, E, b, y, _, w;
                        const {
                            iso: C,
                            editor: S
                        } = e;
                        return {
                            iso: {
                                preferencesKey: null !== (t = null == C ? void 0 : C.preferencesKey) && void 0 !== t ? t : null,
                                persistenceKey: null !== (n = null == C ? void 0 : C.persistenceKey) && void 0 !== n ? n : null,
                                disallowEmbed: null !== (o = null == C ? void 0 : C.disallowEmbed) && void 0 !== o ? o : [],
                                customStores: null !== (r = null == C ? void 0 : C.customStores) && void 0 !== r ? r : [],
                                blocks: {
                                    allowBlocks: null !== (i = null == C || null === (s = C.blocks) || void 0 === s ? void 0 : s.allowBlocks) && void 0 !== i ? i : [],
                                    disallowBlocks: null !== (l = null == C || null === (a = C.blocks) || void 0 === a ? void 0 : a.disallowBlocks) && void 0 !== l ? l : []
                                },
                                toolbar: {
                                    inserter: !0,
                                    inspector: !1,
                                    navigation: !1,
                                    documentInspector: !1,
                                    toc: !1,
                                    undo: !0,
                                    selectorTool: !1,
                                    ...null !== (c = null == C ? void 0 : C.toolbar) && void 0 !== c ? c : {}
                                },
                                header: null === (u = null == C ? void 0 : C.header) || void 0 === u || u,
                                sidebar: {
                                    inserter: !1,
                                    inspector: !1,
                                    ...null !== (d = null == C ? void 0 : C.sidebar) && void 0 !== d ? d : {}
                                },
                                footer: null !== (p = null == C ? void 0 : C.footer) && void 0 !== p && p,
                                moreMenu: (k = null == C ? void 0 : C.moreMenu, T = {
                                    editor: !1,
                                    fullscreen: !1,
                                    preview: !1,
                                    topToolbar: !1,
                                    ...null !== (m = null == C ? void 0 : C.moreMenu) && void 0 !== m ? m : {}
                                }, !1 !== k && T),
                                linkMenu: null !== (f = null == C ? void 0 : C.linkMenu) && void 0 !== f ? f : [],
                                defaultPreferences: {
                                    ...null !== (g = null == C ? void 0 : C.defaultPreferences) && void 0 !== g ? g : {}
                                },
                                allowApi: null !== (h = null == C ? void 0 : C.allowApi) && void 0 !== h && h,
                                disableCanvasAnimations: null !== (v = null == C ? void 0 : C.disableCanvasAnimations) && void 0 !== v && v,
                                currentPattern: null !== (E = null == C ? void 0 : C.currentPattern) && void 0 !== E ? E : null,
                                patterns: null !== (b = null == C ? void 0 : C.patterns) && void 0 !== b ? b : []
                            },
                            editor: {
                                alignWide: !0,
                                disableCustomColors: !1,
                                disableCustomFontSizes: !1,
                                disablePostFormats: !0,
                                titlePlaceholder: (0, N.__)("Add title"),
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
                                ...S,
                                bodyPlaceholder: null !== (y = null == S ? void 0 : S.bodyPlaceholder) && void 0 !== y ? y : (0, N.__)("Start writing or type / to choose a block"),
                                availableLegacyWidgets: {},
                                hasPermissionsToManageWidgets: !1,
                                fetchLinkSuggestions: (null !== (_ = null == S ? void 0 : S.fetchLinkSuggestions) && void 0 !== _ ? _ : null == S ? void 0 : S.__experimentalFetchLinkSuggestions) ? null !== (w = null == S ? void 0 : S.fetchLinkSuggestions) && void 0 !== w ? w : null == S ? void 0 : S.__experimentalFetchLinkSuggestions : () => []
                            }
                        };
                        var k, T
                    }(o), {
                        persistenceKey: f,
                        preferencesKey: g,
                        defaultPreferences: h,
                        customStores: v = []
                    } = m.iso || {}, [b, _] = (0, E.useState)(null);
                    return (0, E.useEffect)((() => {
                        const e = (0, k.createRegistry)({
                            "core/reusable-blocks": lo,
                            "core/interface": _o
                        }, n);
                        f && e.use(k.plugins.persistence, {
                            persistenceKey: f
                        });
                        const t = e.registerStore("isolated/editor", function(e, t) {
                                return {
                                    reducer: (0, k.combineReducers)({
                                        blocks: on,
                                        editor: cn,
                                        preferences: pn,
                                        options: gn,
                                        collab: Zn,
                                        collabPeers: Qn
                                    }),
                                    actions: {
                                        ...sn,
                                        ...dn,
                                        ...hn,
                                        ...mn,
                                        ...c,
                                        ...d
                                    },
                                    selectors: {
                                        ...s,
                                        ...i,
                                        ...l,
                                        ...a,
                                        ...u,
                                        ...p
                                    },
                                    controls: {
                                        ...Xn
                                    },
                                    persist: ["preferences"],
                                    initialState: {
                                        preferences: {
                                            preferencesKey: e,
                                            ...e && localStorage.getItem(e) ? JSON.parse(localStorage.getItem(e)) : t
                                        }
                                    }
                                }
                            }(g, h)),
                            o = e.registerStore("core/block-editor", {
                                ...P.storeConfig,
                                persist: ["preferences"]
                            }),
                            r = e.registerStore("core/editor", {
                                ...y.storeConfig,
                                selectors: {
                                    ...y.storeConfig.selectors,
                                    ...(m = y.storeConfig.selectors, E = e.select, {
                                        getEditedPostAttribute: (e, t) => "content" === t ? (0, M.serialize)(E("core/block-editor").getBlocks()) : m.getEditedPostAttribute(e, t),
                                        getEditedPostContent: () => (0, M.serialize)(E("core/block-editor").getBlocks())
                                    })
                                },
                                persist: ["preferences"]
                            });
                        var m, E;
                        return v.map((t => {
                                wo.push(e.registerStore(t.name, t.config))
                            })), wo.push(t), wo.push(o), wo.push(r), _(e),
                            function() {
                                wo = wo.filter((e => e !== t))
                            }
                    }), [n]), b ? (0, E.createElement)(k.RegistryProvider, {
                        value: b
                    }, (0, E.createElement)(e, w({}, r, {
                        settings: m
                    }))) : null
                }))), "withRegistryProvider");
                var So = Co;

                function ko(e, t) {
                    return e && e.allowBlocks && e.allowBlocks.length > 0 ? e.allowBlocks : t.map((e => e.name))
                }

                function To(e, t, n, o) {
                    const r = (i = t.blocks) && i.disallowBlocks ? i.disallowBlocks : [];
                    var i;
                    return {
                        ...e,
                        hasFixedToolbar: o,
                        allowedBlockTypes: ko(t.blocks, n).filter((e => -1 === r.indexOf(e)))
                    }
                }
                var xo = (0, O.compose)([(0, k.withSelect)((e => {
                        const {
                            getCurrentPattern: t
                        } = e("isolated/editor");
                        return {
                            currentPattern: t()
                        }
                    })), (0, k.withDispatch)((e => {
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
                        } = e, o = (0, E.useRef)(null);
                        return (0, E.useEffect)((() => {
                            null !== t && o.current !== t ? (o.current = t.name, setTimeout((() => {
                                n((0, M.parse)(t.content))
                            }), 0)) : o.current = t
                        }), [t]), null
                    })),
                    Io = function(e) {
                        const {
                            onSaveBlocks: t,
                            onSaveContent: n
                        } = e, o = (0, E.useRef)(!0), {
                            setReady: r
                        } = (0, k.useDispatch)("isolated/editor"), {
                            blocks: i,
                            ignoredContent: s
                        } = (0, k.useSelect)((e => ({
                            blocks: e("isolated/editor").getBlocks(),
                            ignoredContent: e("isolated/editor").getIgnoredContent()
                        })), []);

                        function l() {
                            null == t || t(i, s), null == n || n((0, M.serialize)(i))
                        }
                        return (0, E.useEffect)((() => {
                            i ? o.current ? (o.current = !1, r(!0), i && i.length > 1 && l()) : l() : r(!0)
                        }), [i]), null
                    },
                    Oo = window.wp.apiFetch,
                    Ao = n.n(Oo);

                function Fo() {
                    let {
                        undoManager: e
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const {
                        setUndoManager: t
                    } = (0, k.useDispatch)("isolated/editor");
                    (0, E.useEffect)((() => {
                        t(e)
                    }), [e]), window.isoInitialisedBlocks || (window.isoInitialised || ((0, S.registerCoreBlocks)(), window.isoInitialised = !0), (0, k.use)(It, {}), Ao().use(Ao().createPreloadingMiddleware({
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
                        }
                    })), window.isoInitialisedBlocks = !0)
                }
                var Lo, Bo = So((function(e) {
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
                        Fo({
                            undoManager: r
                        });
                        const u = function(e) {
                                var t;
                                const {
                                    undo: n,
                                    setupEditor: o
                                } = (0, k.useDispatch)("isolated/editor"), {
                                    updateEditorSettings: r,
                                    setupEditorState: i
                                } = (0, k.useDispatch)("core/editor"), {
                                    updateSettings: s
                                } = (0, k.useDispatch)("core/block-editor"), {
                                    isEditing: l,
                                    topToolbar: a,
                                    currentSettings: c
                                } = (0, k.useSelect)((t => {
                                    var o, r, i, s;
                                    const {
                                        isEditing: l,
                                        isFeatureActive: a
                                    } = t("isolated/editor"), {
                                        getBlockTypes: c
                                    } = t(M.store), u = c(), d = a("fixedToolbar");
                                    return {
                                        isEditing: l(),
                                        topToolbar: d,
                                        currentSettings: {
                                            ...e,
                                            editor: {
                                                ...To(e.editor, e.iso, u, void 0 !== (null === (o = e.iso) || void 0 === o || null === (r = o.defaultPreferences) || void 0 === r ? void 0 : r.fixedToolbar) ? null === (i = e.iso) || void 0 === i || null === (s = i.defaultPreferences) || void 0 === s ? void 0 : s.fixedToolbar : d),
                                                __experimentalReusableBlocks: [],
                                                __experimentalFetchReusableBlocks: !1,
                                                __experimentalUndo: n
                                            }
                                        }
                                    }
                                }), [e]);
                                return (0, E.useEffect)((() => {
                                    var e;
                                    void 0 === window.__editorAssets && (window.__editorAssets = {
                                        styles: "",
                                        scripts: ""
                                    }), o(c), s((e = c).editor), r(e.editor), i({
                                        id: 0,
                                        type: "post"
                                    }, [])
                                }), []), (0, E.useEffect)((() => {
                                    l && s(c)
                                }), [l, a, null == c || null === (t = c.editor) || void 0 === t ? void 0 : t.reusableBlocks]), e
                            }(e.settings),
                            d = (0, k.useSelect)((e => ({
                                start: e("core/block-editor").getSelectionStart(),
                                end: e("core/block-editor").getSelectionEnd()
                            })), []);
                        return (0, E.useEffect)((() => {
                            null == a || a(d)
                        }), [d]), (0, E.createElement)(E.StrictMode, null, (0, E.createElement)(T.ShortcutProvider, null, (0, E.createElement)(Io, {
                            onSaveBlocks: o,
                            onSaveContent: n
                        }), (0, E.createElement)(xo, null), (0, E.createElement)(C.SlotFillProvider, null, (0, E.createElement)(At, w({}, c, {
                            onInput: i,
                            onChange: s,
                            blocks: l,
                            settings: u
                        }), t))))
                    })),
                    Mo = function(e) {
                        let {
                            onLoaded: t,
                            onLoading: n
                        } = e;
                        const {
                            isEditorReady: o
                        } = (0, k.useSelect)((e => ({
                            isEditorReady: e("isolated/editor").isEditorReady()
                        })), []);
                        return (0, E.useEffect)((() => {
                            o ? t && t() : n && n()
                        }), [o]), null
                    },
                    Po = window.wp.domReady;
                const Ro = (e, t) => {
                    if ("POST" === e.method && "/wp/v2/media" === e.path) {
                        const t = e.body;
                        t instanceof FormData && t.has("post") && "null" === t.get("post") && t.delete("post")
                    }
                    return t(e)
                };
                n.n(Po)()((() => {
                    Ao().use(Ro)
                }));
                const No = {
                    iso: {
                        moreMenu: !1
                    }
                };
                window.wp = {
                    ...null !== (Lo = window.wp) && void 0 !== Lo ? Lo : {},
                    attachEditor: function(e, t = {}) {
                        if ("textarea" !== e.type.toLowerCase()) return;
                        const n = document.createElement("div");
                        n.classList.add("editor"), e.parentNode.insertBefore(n, e.nextSibling), e.style.display = "none";
                        var o = {
                            ...No,
                            ...t
                        };
                        o?.iso?.noToolbar && n.classList.add("no-toolbar"), o?.editor?.enableUpload && (o.editor.mediaUpload = y.mediaUpload), o?.editor?.enableLibrary && (0, _.addFilter)("editor.MediaUpload", "acfe/media-upload", (() => b.MediaUpload)), (0, E.render)((0, v.createElement)(Bo, {
                            settings: o,
                            onLoad: (t, n) => function(e, t, n) {
                                return -1 !== e.indexOf("\x3c!--") ? t(e) : n({
                                    HTML: e
                                })
                            }(e.value, t, n),
                            onSaveContent: t => function(e, t) {
                                t.value = e
                            }(t, e),
                            onError: () => document.location.reload()
                        }, (0, v.createElement)(Mo, {
                            onLoaded: () => function(e) {
                                const t = e.closest(".iso-editor__loading");
                                t && t.classList.remove("iso-editor__loading")
                            }(e)
                        })), n)
                    },
                    detachEditor: function(e) {
                        const t = e.nextSibling;
                        t && t.classList.contains("editor") && ((0, E.unmountComponentAtNode)(t), e.style.display = null, t.parentNode.removeChild(t))
                    }
                }
            },
            184: function(e, t) {
                var n;
                ! function() {
                    "use strict";
                    var o = {}.hasOwnProperty;

                    function r() {
                        for (var e = [], t = 0; t < arguments.length; t++) {
                            var n = arguments[t];
                            if (n) {
                                var i = typeof n;
                                if ("string" === i || "number" === i) e.push(n);
                                else if (Array.isArray(n)) {
                                    if (n.length) {
                                        var s = r.apply(null, n);
                                        s && e.push(s)
                                    }
                                } else if ("object" === i) {
                                    if (n.toString !== Object.prototype.toString && !n.toString.toString().includes("[native code]")) {
                                        e.push(n.toString());
                                        continue
                                    }
                                    for (var l in n) o.call(n, l) && n[l] && e.push(l)
                                }
                            }
                        }
                        return e.join(" ")
                    }
                    e.exports ? (r.default = r, e.exports = r) : void 0 === (n = function() {
                        return r
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
                    let o = 0,
                        r = 0;
                    t[0].replace(/%[a-zA-Z%]/g, (e => {
                        "%%" !== e && (o++, "%c" === e && (r = o))
                    })), t.splice(r, 0, n)
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
                    formatters: o
                } = e.exports;
                o.j = function(e) {
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
                        let n, r, i, s = null;

                        function l(...e) {
                            if (!l.enabled) return;
                            const o = l,
                                r = Number(new Date),
                                i = r - (n || r);
                            o.diff = i, o.prev = n, o.curr = r, n = r, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                            let s = 0;
                            e[0] = e[0].replace(/%([a-zA-Z%])/g, ((n, r) => {
                                if ("%%" === n) return "%";
                                s++;
                                const i = t.formatters[r];
                                if ("function" == typeof i) {
                                    const t = e[s];
                                    n = i.call(o, t), e.splice(s, 1), s--
                                }
                                return n
                            })), t.formatArgs.call(o, e), (o.log || t.log).apply(o, e)
                        }
                        return l.namespace = e, l.useColors = t.useColors(), l.color = t.selectColor(e), l.extend = o, l.destroy = t.destroy, Object.defineProperty(l, "enabled", {
                            enumerable: !0,
                            configurable: !1,
                            get: () => null !== s ? s : (r !== t.namespaces && (r = t.namespaces, i = t.enabled(e)), i),
                            set: e => {
                                s = e
                            }
                        }), "function" == typeof t.init && t.init(l), l
                    }

                    function o(e, n) {
                        const o = t(this.namespace + (void 0 === n ? ":" : n) + e);
                        return o.log = this.log, o
                    }

                    function r(e) {
                        return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
                    }
                    return t.debug = t, t.default = t, t.coerce = function(e) {
                        return e instanceof Error ? e.stack || e.message : e
                    }, t.disable = function() {
                        const e = [...t.names.map(r), ...t.skips.map(r).map((e => "-" + e))].join(",");
                        return t.enable(""), e
                    }, t.enable = function(e) {
                        let n;
                        t.save(e), t.namespaces = e, t.names = [], t.skips = [];
                        const o = ("string" == typeof e ? e : "").split(/[\s,]+/),
                            r = o.length;
                        for (n = 0; n < r; n++) o[n] && ("-" === (e = o[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.slice(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
                    }, t.enabled = function(e) {
                        if ("*" === e[e.length - 1]) return !0;
                        let n, o;
                        for (n = 0, o = t.skips.length; n < o; n++)
                            if (t.skips[n].test(e)) return !1;
                        for (n = 0, o = t.names.length; n < o; n++)
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
            824: function(e) {
                var t = 1e3,
                    n = 60 * t,
                    o = 60 * n,
                    r = 24 * o;

                function i(e, t, n, o) {
                    var r = t >= 1.5 * n;
                    return Math.round(e / n) + " " + o + (r ? "s" : "")
                }
                e.exports = function(e, s) {
                    s = s || {};
                    var l, a, c = typeof e;
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
                                        return s * r;
                                    case "hours":
                                    case "hour":
                                    case "hrs":
                                    case "hr":
                                    case "h":
                                        return s * o;
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
                    if ("number" === c && isFinite(e)) return s.long ? (l = e, (a = Math.abs(l)) >= r ? i(l, a, r, "day") : a >= o ? i(l, a, o, "hour") : a >= n ? i(l, a, n, "minute") : a >= t ? i(l, a, t, "second") : l + " ms") : function(e) {
                        var i = Math.abs(e);
                        return i >= r ? Math.round(e / r) + "d" : i >= o ? Math.round(e / o) + "h" : i >= n ? Math.round(e / n) + "m" : i >= t ? Math.round(e / t) + "s" : e + "ms"
                    }(e);
                    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
                }
            },
            703: function(e, t, n) {
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
            697: function(e, t, n) {
                e.exports = n(703)()
            },
            414: function(e) {
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
                        return r(t, e), t.prototype.componentDidMount = function() {
                            var e = this,
                                t = this.props,
                                n = t.maxRows,
                                o = t.async;
                            "number" == typeof n && this.updateLineHeight(), "number" == typeof n || o ? setTimeout((function() {
                                return e.textarea && c(e.textarea)
                            })) : this.textarea && c(this.textarea), this.textarea && this.textarea.addEventListener(d, this.onResize)
                        }, t.prototype.componentWillUnmount = function() {
                            this.textarea && (this.textarea.removeEventListener(d, this.onResize), c.destroy(this.textarea))
                        }, t.prototype.render = function() {
                            var e = this,
                                t = this.props,
                                n = (t.onResize, t.maxRows),
                                o = (t.onChange, t.style),
                                r = (t.innerRef, t.children),
                                a = s(t, ["onResize", "maxRows", "onChange", "style", "innerRef", "children"]),
                                c = this.state.lineHeight,
                                u = n && c ? c * n : null;
                            return l.createElement("textarea", i({}, a, {
                                onChange: this.onChange,
                                style: u ? i({}, o, {
                                    maxHeight: u
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
            42: function(e, t, n) {
                "use strict";
                var o = n(857);
                t.Z = o.TextareaAutosize
            },
            196: function(e) {
                "use strict";
                e.exports = window.React
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
    o.m = t, e = [], o.O = function(t, n, r, i) {
            if (!n) {
                var s = 1 / 0;
                for (u = 0; u < e.length; u++) {
                    n = e[u][0], r = e[u][1], i = e[u][2];
                    for (var l = !0, a = 0; a < n.length; a++)(!1 & i || s >= i) && Object.keys(o.O).every((function(e) {
                        return o.O[e](n[a])
                    })) ? n.splice(a--, 1) : (l = !1, i < s && (s = i));
                    if (l) {
                        e.splice(u--, 1);
                        var c = r();
                        void 0 !== c && (t = c)
                    }
                }
                return t
            }
            i = i || 0;
            for (var u = e.length; u > 0 && e[u - 1][2] > i; u--) e[u] = e[u - 1];
            e[u] = [n, r, i]
        }, o.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return o.d(t, {
                a: t
            }), t
        }, o.d = function(e, t) {
            for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
        }, o.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, o.r = function(e) {
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
            o.O.j = function(t) {
                return 0 === e[t]
            };
            var t = function(t, n) {
                    var r, i, s = n[0],
                        l = n[1],
                        a = n[2],
                        c = 0;
                    if (s.some((function(t) {
                            return 0 !== e[t]
                        }))) {
                        for (r in l) o.o(l, r) && (o.m[r] = l[r]);
                        if (a) var u = a(o)
                    }
                    for (t && t(n); c < s.length; c++) i = s[c], o.o(e, i) && e[i] && e[i][0](), e[i] = 0;
                    return o.O(u)
                },
                n = self.webpackChunkbuild_iso = self.webpackChunkbuild_iso || [];
            n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
        }();
    var r = o.O(void 0, [431], (function() {
        return o(902)
    }));
    r = o.O(r)
}();