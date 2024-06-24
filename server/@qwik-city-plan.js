import { c as componentQrl, i as inlinedQrl, b as _jsxQ, u as useSignal, d as useVisibleTaskQrl, e as _noopQrl, f as useLexicalScope, g as _jsxC, h as _IMMUTABLE, L as Link, F as Fragment, r as routeLoaderQrl, S as Slot } from "./q-DE9SRNy1.js";
const s_EvJLNGvXt18 = () => {
  return /* @__PURE__ */ _jsxQ("label", null, {
    for: "my-drawer",
    class: "btn btn-square btn-ghost drawer-button"
  }, /* @__PURE__ */ _jsxQ("svg", null, {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    class: "inline-block h-5 w-5 stroke-current"
  }, /* @__PURE__ */ _jsxQ("path", null, {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M4 6h16M4 12h16M4 18h16"
  }, null, 3, null), 3, null), 3, "0L_0");
};
const DrawerButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_EvJLNGvXt18, "s_EvJLNGvXt18"));
const themeOptions = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset"
];
const s_2eKHV0tUzxE = (themeOption) => {
  const [theme] = useLexicalScope();
  theme.value = themeOption;
  document.documentElement.setAttribute("data-theme", themeOption);
};
const s_dakElEM0ZXA = () => {
  const theme = useSignal("default");
  useVisibleTaskQrl(/* @__PURE__ */ _noopQrl("s_WCYXMXaOdtE", [
    theme
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ _noopQrl("s_0pN0AMJa0Jg", [
    theme
  ]));
  const handleThemeChange = /* @__PURE__ */ inlinedQrl(s_2eKHV0tUzxE, "s_2eKHV0tUzxE", [
    theme
  ]);
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: "dropdown-end dropdown-bottom dropdown"
  }, [
    /* @__PURE__ */ _jsxQ("div", null, {
      tabIndex: 0,
      role: "button",
      class: "btn btn-ghost"
    }, /* @__PURE__ */ _jsxQ("div", null, {
      class: "flex items-center space-x-2"
    }, [
      /* @__PURE__ */ _jsxQ("p", null, null, "Theme", 3, null),
      /* @__PURE__ */ _jsxQ("svg", null, {
        width: "12px",
        height: "12px",
        class: "inline-block fill-current",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 2048 2048"
      }, /* @__PURE__ */ _jsxQ("path", null, {
        d: "M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
      }, null, 3, null), 3, null)
    ], 3, null), 3, null),
    /* @__PURE__ */ _jsxQ("ul", null, {
      tabIndex: 0,
      class: "dropdown-content z-[1] max-h-60 w-52 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl"
    }, [
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("input", null, {
        type: "radio",
        name: "theme-dropdown",
        class: "theme-controller btn btn-ghost btn-sm btn-block justify-start",
        "aria-label": "Default System",
        onChange$: /* @__PURE__ */ _noopQrl("s_03wl4B3PYe4", [
          handleThemeChange
        ])
      }, null, 3, null), 3, null),
      themeOptions.map((themeOption) => /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("input", {
        "aria-label": themeOption,
        value: themeOption,
        checked: theme.value === themeOption,
        onChange$: /* @__PURE__ */ _noopQrl("s_pMWFVDdDl3M", [
          handleThemeChange,
          themeOption
        ])
      }, {
        type: "radio",
        name: "theme-dropdown",
        class: "theme-controller btn btn-ghost btn-sm btn-block justify-start"
      }, null, 2, null), 1, themeOption))
    ], 1, null)
  ], 1, "0T_0");
};
const ThemeSelector = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_dakElEM0ZXA, "s_dakElEM0ZXA"));
const s_nZGrLeXTa6g = () => {
  const isScrolled = useSignal(false);
  useVisibleTaskQrl(/* @__PURE__ */ _noopQrl("s_UCQH23x9mzU", [
    isScrolled
  ]));
  return /* @__PURE__ */ _jsxQ("header", {
    class: `fixed left-1/2 top-4 z-10 -translate-x-1/2 items-center justify-center rounded-lg transition-shadow duration-100 ${isScrolled.value ? "bg-base-300 bg-opacity-75 shadow-lg backdrop-blur" : "bg-base-100 shadow-none"}`
  }, null, /* @__PURE__ */ _jsxQ("div", null, {
    class: "navbar items-center justify-center rounded-lg bg-transparent"
  }, [
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "lg:hidden"
    }, /* @__PURE__ */ _jsxC(DrawerButton, null, 3, "0G_0"), 1, null),
    /* @__PURE__ */ _jsxQ("div", null, null, /* @__PURE__ */ _jsxC(Link, {
      href: "/",
      class: "btn btn-ghost text-xl",
      children: "hisyam99",
      [_IMMUTABLE]: {
        href: _IMMUTABLE,
        class: _IMMUTABLE
      }
    }, 3, "0G_1"), 1, null),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "hidden flex-none lg:flex"
    }, /* @__PURE__ */ _jsxQ("ul", null, {
      class: "menu menu-horizontal items-center space-x-4 px-1"
    }, [
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
        href: "blog",
        children: "Blog",
        [_IMMUTABLE]: {
          href: _IMMUTABLE
        }
      }, 3, "0G_2"), 1, null),
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("details", null, null, [
        /* @__PURE__ */ _jsxQ("summary", null, null, "Portfolio", 3, null),
        /* @__PURE__ */ _jsxQ("ul", null, {
          class: "rounded-t-none bg-base-100 p-2"
        }, [
          /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
            href: "https://reparin.xyz",
            children: "Reparin",
            [_IMMUTABLE]: {
              href: _IMMUTABLE
            }
          }, 3, "0G_3"), 1, null),
          /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
            href: "/404",
            children: "coming soon . . .",
            [_IMMUTABLE]: {
              href: _IMMUTABLE
            }
          }, 3, "0G_4"), 1, null)
        ], 1, null)
      ], 1, null), 1, null)
    ], 1, null), 1, null),
    /* @__PURE__ */ _jsxC(ThemeSelector, null, 3, "0G_5")
  ], 1, null), 1, "0G_6");
};
const Header = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_nZGrLeXTa6g, "s_nZGrLeXTa6g"));
const s_bx6j0LaWyhg = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: /* @__PURE__ */ _jsxQ("footer", null, {
      class: "footer footer-center rounded-t-[64px] bg-base-300 p-10"
    }, [
      /* @__PURE__ */ _jsxQ("aside", null, null, [
        /* @__PURE__ */ _jsxC(Link, {
          href: "https://lotusdreams.my.id",
          children: /* @__PURE__ */ _jsxQ("svg", null, {
            version: "1.1",
            id: "Layer_1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            viewBox: "0 0 512 512",
            "xml:space": "preserve",
            class: "w-16"
          }, [
            /* @__PURE__ */ _jsxQ("g", null, null, [
              /* @__PURE__ */ _jsxQ("path", null, {
                style: "fill:#9DE687;",
                d: "M133.492,235.002c-6.922,25.471,1.884,56.311,25.048,78.729   c23.163,22.418,54.275,30.208,79.507,22.456c6.922-25.471-1.884-56.311-25.048-78.729   C189.835,235.041,158.723,227.25,133.492,235.002z"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                style: "fill:#9DE687;",
                d: "M378.508,235.002c6.922,25.471-1.884,56.311-25.048,78.729   c-23.163,22.418-54.275,30.208-79.507,22.456c-6.922-25.471,1.884-56.311,25.048-78.729   C322.165,235.041,353.277,227.25,378.508,235.002z"
              }, null, 3, null)
            ], 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "fill:#8CCC78;",
              d: "M237.263,512V180.379c0-10.348,8.388-18.736,18.736-18.736c10.349,0,18.737,8.388,18.737,18.736V512  L237.263,512L237.263,512z"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("circle", null, {
              style: "fill:#CC809A;",
              cx: "256.002",
              cy: "24.982",
              r: "24.982"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "fill:#D988A5;",
              d: "M208.265,15.569c40.161,0,72.718,32.557,72.718,72.718v67.11l0,0  c-40.161,0-72.718-32.557-72.718-72.718L208.265,15.569L208.265,15.569z"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "fill:#E690AF;",
              d: "M303.735,15.569c-40.161,0-72.718,32.557-72.718,72.718v67.11l0,0  c40.161,0,72.718-32.557,72.718-72.718V15.569L303.735,15.569z"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "opacity:0.1;enable-background:new    ;",
              d: "M256.001,212.29c6.394,0,12.656-0.579,18.737-1.684v-30.227  c0-10.348-8.388-18.737-18.737-18.737c-10.348,0-18.737,8.389-18.737,18.737v30.227C243.345,211.71,249.606,212.29,256.001,212.29z"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "fill:#F298B8;",
              d: "M255.999,113.268c0-40.161-32.557-72.718-72.718-72.718l0,0v67.11  c0,40.161,32.557,72.718,72.718,72.718l0,0l32.28-30.558v-36.552C288.28,113.268,255.999,113.268,255.999,113.268z"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("path", null, {
              style: "fill:#FFA0C1;",
              d: "M328.717,40.551c-40.161,0-72.718,32.557-72.718,72.718v67.11l0,0  c40.161,0,72.718-32.557,72.718-72.718V40.551L328.717,40.551z"
            }, null, 3, null)
          ], 3, null),
          [_IMMUTABLE]: {
            href: _IMMUTABLE
          }
        }, 3, "RQ_0"),
        /* @__PURE__ */ _jsxQ("p", null, {
          class: "font-bold"
        }, [
          "hisyam99 ",
          /* @__PURE__ */ _jsxQ("br", null, null, null, 3, null),
          "Muhammad Hisyam Kamil"
        ], 3, null),
        /* @__PURE__ */ _jsxQ("p", null, null, "Copyright © 2024 - All right reserved", 3, null)
      ], 1, null),
      /* @__PURE__ */ _jsxQ("nav", null, null, /* @__PURE__ */ _jsxQ("div", null, {
        class: "grid grid-flow-col gap-4"
      }, [
        /* @__PURE__ */ _jsxC(Link, {
          children: /* @__PURE__ */ _jsxQ("svg", null, {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            class: "fill-current"
          }, /* @__PURE__ */ _jsxQ("path", null, {
            d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          }, null, 3, null), 3, null)
        }, 3, "RQ_1"),
        /* @__PURE__ */ _jsxC(Link, {
          href: "https://github.com/hisyam99",
          children: /* @__PURE__ */ _jsxQ("svg", null, {
            width: "24",
            height: "24",
            viewBox: "0 0 98 96",
            xmlns: "http://www.w3.org/2000/svg",
            class: "fill-current"
          }, /* @__PURE__ */ _jsxQ("path", null, {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z",
            fill: "#24292f",
            class: "fill-current"
          }, null, 3, null), 3, null),
          [_IMMUTABLE]: {
            href: _IMMUTABLE
          }
        }, 3, "RQ_2"),
        /* @__PURE__ */ _jsxC(Link, {
          href: "https://www.facebook.com/mhisyam.kamil/",
          children: /* @__PURE__ */ _jsxQ("svg", null, {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            class: "fill-current"
          }, /* @__PURE__ */ _jsxQ("path", null, {
            d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
          }, null, 3, null), 3, null),
          [_IMMUTABLE]: {
            href: _IMMUTABLE
          }
        }, 3, "RQ_3")
      ], 1, null), 1, null)
    ], 1, null)
  }, 1, "RQ_4");
};
const Footer = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_bx6j0LaWyhg, "s_bx6j0LaWyhg"));
const s_1dXFoSbSWis = () => {
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: "lg:hidden"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "btm-nav sticky rounded-t-badge bg-base-300 bg-opacity-75 backdrop-blur"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "mx-auto grid h-full max-w-lg grid-cols-5"
  }, [
    /* @__PURE__ */ _jsxC(Link, {
      href: "/",
      children: /* @__PURE__ */ _jsxQ("button", null, {
        class: "btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center",
        "data-tip": "Home"
      }, [
        /* @__PURE__ */ _jsxQ("svg", null, {
          class: "h-6 w-6",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          viewBox: "0 0 20 20"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          d: "m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "Home", 3, null)
      ], 3, null),
      [_IMMUTABLE]: {
        href: _IMMUTABLE
      }
    }, 3, "vl_0"),
    /* @__PURE__ */ _jsxC(Link, {
      href: "blog",
      children: /* @__PURE__ */ _jsxQ("button", null, {
        class: "btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center",
        "data-tip": "Blogs"
      }, [
        /* @__PURE__ */ _jsxQ("svg", null, {
          xmlns: "http://www.w3.org/2000/svg",
          class: "h-8 w-8",
          "aria-hidden": "true",
          fill: "currentColor",
          viewBox: "0 0 24 24"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          d: "M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "Blogs", 3, null)
      ], 3, null),
      [_IMMUTABLE]: {
        href: _IMMUTABLE
      }
    }, 3, "vl_1"),
    /* @__PURE__ */ _jsxC(Link, {
      href: "/404",
      children: /* @__PURE__ */ _jsxQ("div", null, {
        class: "flex items-center justify-center"
      }, /* @__PURE__ */ _jsxQ("button", null, {
        class: "btn btn-circle btn-primary tooltip flex items-center justify-center",
        "data-tip": "New item"
      }, [
        /* @__PURE__ */ _jsxQ("svg", null, {
          class: "h-4 w-4",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 18 18"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M9 1v16M1 9h16"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "New item", 3, null)
      ], 3, null), 3, null),
      [_IMMUTABLE]: {
        href: _IMMUTABLE
      }
    }, 3, "vl_2"),
    /* @__PURE__ */ _jsxC(Link, {
      href: "/404",
      children: /* @__PURE__ */ _jsxQ("button", null, {
        class: "btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center",
        "data-tip": "Settings"
      }, [
        /* @__PURE__ */ _jsxQ("svg", null, {
          class: "h-6 w-6",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 20 20"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "Settings", 3, null)
      ], 3, null),
      [_IMMUTABLE]: {
        href: _IMMUTABLE
      }
    }, 3, "vl_3"),
    /* @__PURE__ */ _jsxC(Link, {
      href: "/404",
      children: /* @__PURE__ */ _jsxQ("button", null, {
        class: "btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center",
        "data-tip": "Profile"
      }, [
        /* @__PURE__ */ _jsxQ("svg", null, {
          class: "h-6 w-6",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "currentColor",
          viewBox: "0 0 20 20"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "Profile", 3, null)
      ], 3, null),
      [_IMMUTABLE]: {
        href: _IMMUTABLE
      }
    }, 3, "vl_4")
  ], 1, null), 1, null), 1, "vl_5");
};
const BottomNavbar = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_1dXFoSbSWis, "s_1dXFoSbSWis"));
const s_snwU0Di7E7A = () => {
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: "drawer"
  }, [
    /* @__PURE__ */ _jsxQ("input", null, {
      id: "my-drawer",
      type: "checkbox",
      class: "drawer-toggle"
    }, null, 3, null),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "drawer-content"
    }, null, 3, null),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "drawer-side z-10"
    }, [
      /* @__PURE__ */ _jsxQ("label", null, {
        for: "my-drawer",
        "aria-label": "close sidebar",
        class: "drawer-overlay"
      }, null, 3, null),
      /* @__PURE__ */ _jsxQ("ul", null, {
        class: "rounded-r-badge menu bg-base-200 text-base-content min-h-full w-80 space-y-2 p-4"
      }, [
        /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
          href: "blog",
          children: "Blog",
          [_IMMUTABLE]: {
            href: _IMMUTABLE
          }
        }, 3, "Zp_0"), 1, null),
        /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("details", null, null, [
          /* @__PURE__ */ _jsxQ("summary", null, null, "Portfolio", 3, null),
          /* @__PURE__ */ _jsxQ("ul", null, null, [
            /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
              href: "https://reparin.xyz",
              children: "Reparin",
              [_IMMUTABLE]: {
                href: _IMMUTABLE
              }
            }, 3, "Zp_1"), 1, null),
            /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxC(Link, {
              href: "/404",
              children: "coming soon . . .",
              [_IMMUTABLE]: {
                href: _IMMUTABLE
              }
            }, 3, "Zp_2"), 1, null)
          ], 1, null)
        ], 1, null), 1, null),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "ml-2 py-2"
        }, null, 3, null)
      ], 1, null)
    ], 1, null)
  ], 1, "Zp_3");
};
const Drawer = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_snwU0Di7E7A, "s_snwU0Di7E7A"));
const onGet = async ({ cacheControl }) => {
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 604800,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  });
};
const s_95g0CxJqbFc = () => {
  return {
    date: (/* @__PURE__ */ new Date()).toISOString()
  };
};
const useServerTimeLoader = routeLoaderQrl(/* @__PURE__ */ inlinedQrl(s_95g0CxJqbFc, "s_95g0CxJqbFc"));
const s_fNr1m43wcv8 = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxC(Header, null, 3, "nT_0"),
      /* @__PURE__ */ _jsxC(Drawer, null, 3, "nT_1"),
      /* @__PURE__ */ _jsxQ("main", null, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "nT_2"), 1, null),
      /* @__PURE__ */ _jsxC(Footer, null, 3, "nT_3"),
      /* @__PURE__ */ _jsxQ("div", null, {
        class: "sticky bottom-0"
      }, /* @__PURE__ */ _jsxC(BottomNavbar, null, 3, "nT_4"), 1, null)
    ]
  }, 1, "nT_5");
};
const layout = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_fNr1m43wcv8, "s_fNr1m43wcv8"));
const Layout_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout,
  onGet,
  useServerTimeLoader
}, Symbol.toStringTag, { value: "Module" }));
const srcSet$2 = "/build/q-i0crtY3_.webp 189w";
const width$2 = 189;
const height$2 = 252;
const PROPS$2 = { srcSet: srcSet$2, width: width$2, height: height$2 };
function ImgHisyam(props, key, _, dev) {
  return _jsxQ("img", { ...{ decoding: "async", loading: "lazy" }, ...props }, PROPS$2, void 0, 3, key);
}
const srcSet$1 = "/build/q-BWsMkrtn.webp 200w, /build/q-dPtVClJU.webp 400w, /build/q-C6E8fqJz.webp 600w, /build/q-3WSGVkqX.webp 800w, /build/q-CQw0NPCP.webp 1200w";
const width$1 = 1200;
const height$1 = 675;
const PROPS$1 = { srcSet: srcSet$1, width: width$1, height: height$1 };
function ImgReparin(props, key, _, dev) {
  return _jsxQ("img", { ...{ decoding: "async", loading: "lazy" }, ...props }, PROPS$1, void 0, 3, key);
}
const s_RI4ZVJ18hxE = () => {
  var _a;
  const [nextSectionRef] = useLexicalScope();
  (_a = nextSectionRef.value) == null ? void 0 : _a.scrollIntoView({
    behavior: "smooth"
  });
};
const s_zQysZhdKDPo = () => {
  const nextSectionRef = useSignal(void 0);
  const scrollToNextSection = /* @__PURE__ */ inlinedQrl(s_RI4ZVJ18hxE, "s_RI4ZVJ18hxE", [
    nextSectionRef
  ]);
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("section", null, {
        class: "hero rounded-bl-[64px] bg-base-300 pb-24 pt-24 lg:pt-48"
      }, /* @__PURE__ */ _jsxQ("div", null, {
        class: "hero-content flex-col items-center lg:flex-row-reverse"
      }, [
        /* @__PURE__ */ _jsxC(ImgHisyam, {
          class: "max-w-sm transform rounded-lg shadow-2xl transition-transform duration-300 hover:scale-110",
          [_IMMUTABLE]: {
            class: _IMMUTABLE
          }
        }, 3, "Ir_0"),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "text-center lg:mr-10 lg:text-left"
        }, [
          /* @__PURE__ */ _jsxQ("h1", null, {
            class: "text-6xl font-extrabold leading-tight drop-shadow-lg"
          }, "Muhammad Hisyam Kamil", 3, null),
          /* @__PURE__ */ _jsxQ("p", null, {
            class: "py-6 text-lg leading-relaxed drop-shadow-md"
          }, "Suka mencoba teknologi baru 💻", 3, null),
          /* @__PURE__ */ _jsxQ("button", null, {
            class: "btn btn-primary  shadow-lg",
            onClick$: scrollToNextSection
          }, "See More . . .", 3, null)
        ], 3, null)
      ], 1, null), 1, null),
      /* @__PURE__ */ _jsxQ("section", {
        ref: nextSectionRef
      }, null, /* @__PURE__ */ _jsxQ("section", null, {
        class: "container mx-auto px-6 py-10"
      }, [
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "container mx-auto flex flex-col space-y-6 px-6 py-4 lg:h-[32rem] lg:flex-row lg:items-center lg:py-16"
        }, [
          /* @__PURE__ */ _jsxQ("div", null, {
            class: "flex w-full flex-col items-center lg:w-1/2 lg:flex-row"
          }, [
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "order-2 mt-6 flex justify-center lg:mt-0 lg:flex-col lg:space-y-3"
            }, [
              /* @__PURE__ */ _jsxQ("button", null, {
                class: "mx-2 h-3 w-3 rounded-full bg-primary focus:outline-none lg:mx-0"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("button", null, {
                class: "mx-2 h-3 w-3 rounded-full bg-neutral-content hover:bg-primary focus:outline-none lg:mx-0"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("button", null, {
                class: "mx-2 h-3 w-3 rounded-full bg-neutral-content hover:bg-primary focus:outline-none lg:mx-0"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("button", null, {
                class: "mx-2 h-3 w-3 rounded-full bg-neutral-content hover:bg-primary focus:outline-none lg:mx-0"
              }, null, 3, null)
            ], 3, null),
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "max-w-lg lg:order-2 lg:mx-12"
            }, [
              /* @__PURE__ */ _jsxQ("h1", null, {
                class: "text-3xl font-semibold tracking-wide  lg:text-4xl"
              }, "Reparin", 3, null),
              /* @__PURE__ */ _jsxQ("p", null, {
                class: "mt-4 text-justify"
              }, "Reparin adalah sebuah situs web yang menyediakan layanan perbaikan gadget atau perangkat untuk pelanggan. Website ini dibuat menggunakan Next.js versi 14 dengan komponen UI dari shadcn/ui, dan menggunakan backend yang dibangun dengan Golang serta package manager Bun.", 3, null),
              /* @__PURE__ */ _jsxQ("div", null, {
                class: "mt-6"
              }, /* @__PURE__ */ _jsxC(Link, {
                href: "https://reparin.xyz",
                class: "btn btn-primary",
                children: "Get Started",
                [_IMMUTABLE]: {
                  href: _IMMUTABLE,
                  class: _IMMUTABLE
                }
              }, 3, "Ir_1"), 1, null)
            ], 1, null)
          ], 1, null),
          /* @__PURE__ */ _jsxQ("div", null, {
            class: "flex h-96 w-full items-center justify-center lg:w-1/2"
          }, /* @__PURE__ */ _jsxC(ImgReparin, {
            class: "h-full w-full max-w-2xl rounded-md object-cover",
            [_IMMUTABLE]: {
              class: _IMMUTABLE
            }
          }, 3, "Ir_2"), 1, null)
        ], 1, null),
        /* @__PURE__ */ _jsxQ("hr", null, {
          class: "my-12 border-neutral-content"
        }, null, 3, null),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4"
        }, [
          /* @__PURE__ */ _jsxC(Link, {
            href: "https://bun.sh/",
            rel: "noopener noreferrer",
            target: "_blank",
            class: "flex items-center justify-center",
            children: [
              /* @__PURE__ */ _jsxQ("svg", null, {
                id: "Bun",
                xmlns: "http://www.w3.org/2000/svg",
                width: "auto",
                height: "auto",
                viewBox: "0 0 80 70",
                class: "w-16"
              }, [
                /* @__PURE__ */ _jsxQ("title", null, null, "Bun", 3, null),
                /* @__PURE__ */ _jsxQ("path", null, {
                  id: "Shadow",
                  d: "M71.09,20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46,26.46,0,0,1,75.5,35.7c0,16.57-16.82,30.05-37.5,30.05-11.58,0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55,65.3,30.14,69.75,42,69.75c20.68,0,37.5-13.48,37.5-30C79.5,32.69,76.46,26,71.09,20.74Z"
                }, null, 3, null),
                /* @__PURE__ */ _jsxQ("g", null, {
                  id: "Body"
                }, [
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Background",
                    d: "M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z",
                    style: "fill:#fbf0df"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Bottom_Shadow",
                    "data-name": "Bottom Shadow",
                    d: "M73,35.7a21.67,21.67,0,0,0-.8-5.78c-2.73,33.3-43.35,34.9-59.32,24.94A40,40,0,0,0,38,63.24C57.3,63.24,73,50.89,73,35.7Z",
                    style: "fill:#f6dece"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Light_Shine",
                    "data-name": "Light Shine",
                    d: "M24.53,11.17C29,8.49,34.94,3.46,40.78,3.45A9.29,9.29,0,0,0,38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7c0,.4,0,.8,0,1.19C9.06,15.48,20.07,13.85,24.53,11.17Z",
                    style: "fill:#fffefc"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Top",
                    d: "M35.12,5.53A16.41,16.41,0,0,1,29.49,18c-.28.25-.06.73.3.59,3.37-1.31,7.92-5.23,6-13.14C35.71,5,35.12,5.12,35.12,5.53Zm2.27,0A16.24,16.24,0,0,1,39,19c-.12.35.31.65.55.36C41.74,16.56,43.65,11,37.93,5,37.64,4.74,37.19,5.14,37.39,5.49Zm2.76-.17A16.42,16.42,0,0,1,47,17.12a.33.33,0,0,0,.65.11c.92-3.49.4-9.44-7.17-12.53C40.08,4.54,39.82,5.08,40.15,5.32ZM21.69,15.76a16.94,16.94,0,0,0,10.47-9c.18-.36.75-.22.66.18-1.73,8-7.52,9.67-11.12,9.45C21.32,16.4,21.33,15.87,21.69,15.76Z",
                    style: "fill:#ccbea7;fill-rule:evenodd"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Outline",
                    d: "M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"
                  }, null, 3, null)
                ], 3, null),
                /* @__PURE__ */ _jsxQ("g", null, {
                  id: "Mouth"
                }, [
                  /* @__PURE__ */ _jsxQ("g", null, {
                    id: "Background-2",
                    "data-name": "Background"
                  }, /* @__PURE__ */ _jsxQ("path", null, {
                    d: "M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z",
                    style: "fill:#b71422"
                  }, null, 3, null), 3, null),
                  /* @__PURE__ */ _jsxQ("g", null, {
                    id: "Tongue"
                  }, [
                    /* @__PURE__ */ _jsxQ("path", null, {
                      id: "Background-3",
                      "data-name": "Background",
                      d: "M34,47.79a6.91,6.91,0,0,0,4.12,1.9,6.91,6.91,0,0,0,4.11-1.9,10.63,10.63,0,0,0,1-1.07,6.83,6.83,0,0,0-4.9-2.31,6.15,6.15,0,0,0-5,2.78C33.56,47.4,33.76,47.6,34,47.79Z",
                      style: "fill:#ff6164"
                    }, null, 3, null),
                    /* @__PURE__ */ _jsxQ("path", null, {
                      id: "Outline-2",
                      "data-name": "Outline",
                      d: "M34.16,47a5.36,5.36,0,0,1,4.19-2.08,6,6,0,0,1,4,1.69c.23-.25.45-.51.66-.77a7,7,0,0,0-4.71-1.93,6.36,6.36,0,0,0-4.89,2.36A9.53,9.53,0,0,0,34.16,47Z"
                    }, null, 3, null)
                  ], 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Outline-3",
                    "data-name": "Outline",
                    d: "M38.09,50.19a7.42,7.42,0,0,1-4.45-2,9.52,9.52,0,0,1-3.11-5.05,1.2,1.2,0,0,1,.26-1,1.41,1.41,0,0,1,1.13-.51H44.26a1.44,1.44,0,0,1,1.13.51,1.19,1.19,0,0,1,.25,1h0a9.52,9.52,0,0,1-3.11,5.05A7.42,7.42,0,0,1,38.09,50.19Zm-6.17-7.4c-.16,0-.2.07-.21.09a8.29,8.29,0,0,0,2.73,4.37A6.23,6.23,0,0,0,38.09,49a6.28,6.28,0,0,0,3.65-1.73,8.3,8.3,0,0,0,2.72-4.37.21.21,0,0,0-.2-.09Z"
                  }, null, 3, null)
                ], 3, null),
                /* @__PURE__ */ _jsxQ("g", null, {
                  id: "Face"
                }, [
                  /* @__PURE__ */ _jsxQ("ellipse", null, {
                    id: "Right_Blush",
                    "data-name": "Right Blush",
                    cx: "53.22",
                    cy: "40.18",
                    rx: "5.85",
                    ry: "3.44",
                    style: "fill:#febbd0"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("ellipse", null, {
                    id: "Left_Bluch",
                    "data-name": "Left Bluch",
                    cx: "22.95",
                    cy: "40.18",
                    rx: "5.85",
                    ry: "3.44",
                    style: "fill:#febbd0"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Eyes",
                    d: "M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z",
                    style: "fill-rule:evenodd"
                  }, null, 3, null),
                  /* @__PURE__ */ _jsxQ("path", null, {
                    id: "Iris",
                    d: "M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z",
                    style: "fill:#fff;fill-rule:evenodd"
                  }, null, 3, null)
                ], 3, null)
              ], 3, null),
              /* @__PURE__ */ _jsxQ("svg", null, {
                xmlns: "http://www.w3.org/2000/svg",
                width: "auto",
                height: "auto",
                viewBox: "0 0 287 107",
                class: "w-24 fill-current",
                fill: "currentColor"
              }, [
                /* @__PURE__ */ _jsxQ("g", null, {
                  "clip-path": "url(#a)"
                }, /* @__PURE__ */ _jsxQ("path", null, {
                  d: "M68.014 97.942c-26.4 0-40.947-3.678-41.6-4.495a1050.447 1050.447 0 0 1 0-68.081c.653-.735 15.12-3.433 41.6-3.433 24.6 0 33.999 9.072 33.999 19.943 0 7.028-4.25 13.403-12.75 17.081v1.226c10.217.736 15.202 7.437 15.202 15.038 0 11.688-11.85 22.721-36.451 22.721ZM51.259 55.606l15.937.082c5.231-.817 8.746-3.678 8.746-8.091 0-5.558-4.169-8.582-11.606-8.582-6.375 0-11.197 1.062-12.995 2.452-.082 4.659-.082 9.48-.082 14.14Zm13.159 23.457c7.437 0 11.932-3.351 11.932-9.072 0-4.659-3.678-7.438-9.154-7.601l-15.937-.082c0 4.74 0 9.48.082 14.14 1.716 1.47 6.62 2.615 13.077 2.615Zm116.861-42.909c.654 19.86.654 38.74 0 58.192-7.519 1.226-15.528 1.226-23.047 0l-2.289-13.812h-1.471c-2.942 12.014-9.317 15.774-19.207 15.774-20.023 0-23.701-16.346-23.701-36.452 0-5.067.163-12.014.163-23.702a90.967 90.967 0 0 1 26.644 0V65.25c0 8.337 4.25 11.442 9.317 11.442 3.596 0 7.356-1.798 9.236-4.822V36.154a76.09 76.09 0 0 1 24.355 0Zm10.109 58.192c-.654-19.86-.654-38.74 0-58.192 7.519-1.226 15.528-1.226 23.048 0l2.288 13.813h1.471c2.942-12.014 9.317-15.774 19.207-15.774 20.024 0 23.701 16.346 23.701 36.451 0 5.068-.163 12.015-.163 23.702a90.974 90.974 0 0 1-26.644 0V65.25c0-8.336-4.25-11.442-9.317-11.442-3.596 0-7.356 1.798-9.236 4.822v35.716a76.095 76.095 0 0 1-24.355 0Z"
                }, null, 3, null), 3, null),
                /* @__PURE__ */ _jsxQ("defs", null, null, /* @__PURE__ */ _jsxQ("clipPath", null, {
                  id: "a"
                }, /* @__PURE__ */ _jsxQ("path", null, {
                  d: "M0 0h287v107H0z"
                }, null, 3, null), 3, null), 3, null)
              ], 3, null)
            ],
            [_IMMUTABLE]: {
              href: _IMMUTABLE,
              rel: _IMMUTABLE,
              target: _IMMUTABLE,
              class: _IMMUTABLE
            }
          }, 3, "Ir_3"),
          /* @__PURE__ */ _jsxC(Link, {
            href: "https://qwik.dev/",
            rel: "noopener noreferrer",
            target: "_blank",
            class: "flex items-center justify-center",
            children: /* @__PURE__ */ _jsxQ("svg", null, {
              width: "auto",
              height: "auto",
              viewBox: "0 0 167 53",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-label": "Qwik",
              class: "w-36"
            }, [
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M81.9545 46.5859H75.5513V35.4045C73.4363 36.8579 71.0496 37.5749 68.4884 37.5749C65.0151 37.5749 62.4344 36.6253 60.8239 34.6487C59.2134 32.6915 58.3984 29.2034 58.3984 24.2231C58.3984 19.1266 59.3492 15.5997 61.2702 13.5456C63.23 11.4721 66.3734 10.4644 70.7004 10.4644C74.7946 10.4644 78.5201 11.0264 81.9545 12.131V46.5859ZM75.5513 16.278C74.096 15.8323 72.4661 15.6191 70.7004 15.6191C68.5272 15.6191 66.9749 16.1811 66.1017 17.3244C65.2479 18.4871 64.7823 20.6962 64.7823 23.9712C64.7823 27.0524 65.1897 29.1065 66.0435 30.2304C66.8973 31.335 68.3719 31.897 70.5452 31.897C73.3781 31.897 75.5513 30.7343 75.5513 29.2809V16.278Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M91.133 11.1426C93.4033 17.4406 95.3242 23.7386 96.993 30.0948C99.205 23.5836 101.087 17.2856 102.542 11.1426H108.15C110.265 17.4406 112.031 23.7386 113.447 30.0948C115.97 23.196 117.949 16.8787 119.404 11.1426H125.71C123.033 20.173 120.064 28.777 116.785 36.8966H109.256C108.402 32.3039 107.044 26.7617 105.22 20.1536C104.056 25.2889 102.445 30.8893 100.33 36.8966H92.8018C90.2793 27.5174 87.5434 18.9522 84.6328 11.1426H91.133Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M132.832 7.55758C129.999 7.55758 129.203 6.85996 129.203 3.97257C129.203 1.39523 130.018 0.794495 132.832 0.794495C135.665 0.794495 136.46 1.39523 136.46 3.97257C136.46 6.85996 135.665 7.55758 132.832 7.55758ZM129.649 11.1426H136.053V36.8966H129.649V11.1426Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M166.303 11.1426C161.763 17.5956 158.581 21.5295 156.815 22.9441C158.27 23.8937 162.17 28.8933 167.002 36.916H159.628C153.613 27.7887 150.742 23.8549 149.325 23.2542V36.916H142.922V0H149.325V23.2348C150.78 22.169 153.963 18.1382 158.872 11.1426H166.303Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M40.973 52.5351L32.0861 43.6985L31.9503 43.7179V43.621L13.0511 24.9595L17.708 20.4637L14.9721 4.76715L1.99103 20.8513C-0.220992 23.0798 -0.628467 26.7036 0.962635 29.3778L9.07337 42.8265C10.3152 44.9 12.566 46.1402 14.9915 46.1208L19.0081 46.082L40.973 52.5351Z",
                fill: "#18B6F6"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M45.8232 20.5411L44.038 17.2468L43.1066 15.5609L42.738 14.902L42.6992 14.9408L37.8094 6.47238C36.587 4.34075 34.2974 3.02301 31.8137 3.04239L27.5255 3.15865L14.7384 3.19741C12.313 3.21679 10.101 4.49577 8.87853 6.56927L1.09766 21.9945L15.0101 4.72831L33.2496 24.7656L30.0091 28.0406L31.9495 43.7178L31.9689 43.679V43.7178H31.9301L31.9689 43.7565L33.4824 45.2293L40.8364 52.4187C41.1469 52.7094 41.6514 52.3606 41.4379 51.9924L36.8975 43.0589L44.8142 28.4282L45.0664 28.1375C45.1634 28.0212 45.2604 27.905 45.3381 27.7887C46.8904 25.6764 47.1038 22.8472 45.8232 20.5411Z",
                fill: "#AC7EF4"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M33.3076 24.6882L15.0099 4.74774L17.61 20.3668L12.9531 24.882L31.9105 43.6985L30.203 28.0794L33.3076 24.6882Z",
                fill: "white"
              }, null, 3, null)
            ], 3, null),
            [_IMMUTABLE]: {
              href: _IMMUTABLE,
              rel: _IMMUTABLE,
              target: _IMMUTABLE,
              class: _IMMUTABLE
            }
          }, 3, "Ir_4"),
          /* @__PURE__ */ _jsxC(Link, {
            href: "https://daisyui.com",
            rel: "noopener noreferrer",
            target: "_blank",
            class: "flex items-center justify-center",
            children: /* @__PURE__ */ _jsxQ("svg", null, {
              viewBox: "0 0 3600 1024",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              width: "auto",
              height: "auto",
              class: "w-56"
            }, [
              /* @__PURE__ */ _jsxQ("rect", null, {
                x: "256",
                y: "670.72",
                width: "512",
                height: "256",
                rx: "128",
                fill: "#1AD1A5"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("circle", null, {
                cx: "512",
                cy: "353.28",
                r: "256",
                fill: "white"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("circle", null, {
                cx: "512",
                cy: "353.28",
                r: "261",
                stroke: "currentColor",
                "stroke-opacity": "0.2",
                "stroke-width": "10"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("circle", null, {
                cx: "512",
                cy: "353.28",
                r: "114.688",
                fill: "#FF9903"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M2788.44 729.2C2751.24 729.2 2719.24 722.4 2692.44 708.8C2665.64 695.2 2645.04 675.8 2630.64 650.6C2616.64 625 2609.64 594.6 2609.64 559.4H2720.64C2720.64 573.4 2723.44 585.4 2729.04 595.4C2734.64 605.4 2742.44 613 2752.44 618.2C2762.84 623.4 2775.24 626 2789.64 626C2804.04 626 2816.44 623.4 2826.84 618.2C2837.24 613 2845.04 605.4 2850.24 595.4C2855.84 585.4 2858.64 573.4 2858.64 559.4H2969.64C2969.64 594.6 2962.44 625 2948.04 650.6C2933.64 675.8 2912.84 695.2 2885.64 708.8C2858.84 722.4 2826.44 729.2 2788.44 729.2ZM2609.64 559.4V302H2720.64V559.4H2609.64ZM2858.64 559.4V302H2969.64V559.4H2858.64Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M3035.76 722V302H3146.76V722H3035.76Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M1280.8 722L1275.4 666.2V302H1383.4V722H1280.8ZM1195.6 729.2C1167.2 729.2 1142.8 723 1122.4 710.6C1102.4 698.2 1087 680.2 1076.2 656.6C1065.4 633 1060 604.8 1060 572C1060 538.8 1065.4 510.6 1076.2 487.4C1087 463.8 1102.4 445.8 1122.4 433.4C1142.8 421 1167.2 414.8 1195.6 414.8C1220.4 414.8 1240.8 421 1256.8 433.4C1273.2 445.8 1285.2 463.8 1292.8 487.4C1300.8 510.6 1304.8 538.8 1304.8 572C1304.8 604.8 1300.8 633 1292.8 656.6C1285.2 680.2 1273.2 698.2 1256.8 710.6C1240.8 723 1220.4 729.2 1195.6 729.2ZM1224.4 629.6C1234.4 629.6 1243.2 627.2 1250.8 622.4C1258.8 617.2 1265 610.4 1269.4 602C1273.8 593.2 1276 583.2 1276 572C1276 560.8 1273.8 551 1269.4 542.6C1265 533.8 1258.8 527 1250.8 522.2C1243.2 517.4 1234.2 515 1223.8 515C1214.2 515 1205.6 517.4 1198 522.2C1190.4 527 1184.4 533.8 1180 542.6C1175.6 551 1173.2 560.8 1172.8 572C1173.2 583.2 1175.6 593.2 1180 602C1184.4 610.4 1190.4 617.2 1198 622.4C1206 627.2 1214.8 629.6 1224.4 629.6Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M1612.31 722L1609.31 653V575C1609.31 561 1608.51 548.4 1606.91 537.2C1605.31 526 1601.31 517.2 1594.91 510.8C1588.51 504.4 1578.11 501.2 1563.71 501.2C1553.71 501.2 1545.51 503.6 1539.11 508.4C1532.71 513.2 1527.31 518.8 1522.91 525.2L1428.71 495.2C1437.11 478.8 1447.51 464.6 1459.91 452.6C1472.71 440.6 1487.51 431.4 1504.31 425C1521.51 418.2 1540.51 414.8 1561.31 414.8C1593.31 414.8 1620.71 420.6 1643.51 432.2C1666.31 443.8 1683.71 460 1695.71 480.8C1707.71 501.6 1713.71 525.8 1713.71 553.4V722H1612.31ZM1532.51 729.2C1497.71 729.2 1470.51 721.4 1450.91 705.8C1431.71 689.8 1422.11 667 1422.11 637.4C1422.11 606.2 1431.71 583.2 1450.91 568.4C1470.51 553.2 1497.71 545.6 1532.51 545.6H1620.71V607.4H1575.11C1561.11 607.4 1550.31 609.8 1542.71 614.6C1535.11 619.4 1531.31 626.2 1531.31 635C1531.31 641 1533.91 645.6 1539.11 648.8C1544.31 652 1551.51 653.6 1560.71 653.6C1570.71 653.6 1579.31 651.8 1586.51 648.2C1593.71 644.2 1599.31 638.8 1603.31 632C1607.31 624.8 1609.31 616.6 1609.31 607.4H1637.51C1637.51 646.2 1628.31 676.2 1609.91 697.4C1591.51 718.6 1565.71 729.2 1532.51 729.2Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M1770.65 722V422H1878.65V722H1770.65ZM1824.65 393.2C1808.65 393.2 1794.65 387.2 1782.65 375.2C1770.65 363.2 1764.65 349.2 1764.65 333.2C1764.65 316.8 1770.65 302.8 1782.65 291.2C1794.65 279.2 1808.65 273.2 1824.65 273.2C1841.05 273.2 1855.05 279.2 1866.65 291.2C1878.65 302.8 1884.65 316.8 1884.65 333.2C1884.65 349.2 1878.65 363.2 1866.65 375.2C1855.05 387.2 1841.05 393.2 1824.65 393.2Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M2052.07 729.2C2032.07 729.2 2013.47 726.4 1996.27 720.8C1979.07 715.2 1964.27 707.4 1951.87 697.4C1939.87 687 1931.47 674.6 1926.67 660.2L2012.47 626.6C2016.87 637.4 2023.07 644.4 2031.07 647.6C2039.07 650.4 2046.07 651.8 2052.07 651.8C2058.47 651.8 2063.67 650.4 2067.67 647.6C2071.67 644.8 2073.67 640.8 2073.67 635.6C2073.67 630 2070.87 625.4 2065.27 621.8C2059.67 617.8 2051.07 614.4 2039.47 611.6L2014.87 605.6C1988.07 598.8 1967.87 587 1954.27 570.2C1940.67 553.4 1933.87 533.8 1933.87 511.4C1933.87 480.6 1945.07 456.8 1967.47 440C1990.27 423.2 2021.07 414.8 2059.87 414.8C2083.47 414.8 2103.27 417.8 2119.27 423.8C2135.67 429.4 2149.07 437.4 2159.47 447.8C2169.87 458.2 2177.87 470.2 2183.47 483.8L2100.07 515.6C2097.27 507.6 2092.47 501.8 2085.67 498.2C2079.27 494.6 2071.27 492.8 2061.67 492.8C2054.87 492.8 2049.47 494.4 2045.47 497.6C2041.87 500.8 2040.07 504.6 2040.07 509C2040.07 513.8 2042.87 518 2048.47 521.6C2054.47 524.8 2063.47 528 2075.47 531.2L2100.07 537.2C2118.47 541.6 2134.47 548.4 2148.07 557.6C2161.67 566.4 2172.27 577.4 2179.87 590.6C2187.47 603.8 2191.27 619 2191.27 636.2C2191.27 655.8 2185.47 672.6 2173.87 686.6C2162.27 700.2 2146.07 710.8 2125.27 718.4C2104.47 725.6 2080.07 729.2 2052.07 729.2Z",
                fill: "currentColor"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                d: "M2324 849.2C2310 849.2 2295.2 846.4 2279.6 840.8C2264 835.6 2251.6 830 2242.4 824L2282.6 737C2287 740.6 2291.6 743.4 2296.4 745.4C2301.6 747.8 2306.4 749 2310.8 749C2317.2 749 2323.2 747.4 2328.8 744.2C2334.8 741 2339.4 735.6 2342.6 728L2378.6 644L2459.6 422H2579.6L2450.6 732.8C2441.4 755.2 2431.8 775.2 2421.8 792.8C2411.8 810.4 2399.2 824.2 2384 834.2C2369.2 844.2 2349.2 849.2 2324 849.2ZM2350.4 722L2206.4 422H2326.4L2415.8 644L2452.4 722H2350.4Z",
                fill: "currentColor"
              }, null, 3, null)
            ], 3, null),
            [_IMMUTABLE]: {
              href: _IMMUTABLE,
              rel: _IMMUTABLE,
              target: _IMMUTABLE,
              class: _IMMUTABLE
            }
          }, 3, "Ir_5"),
          /* @__PURE__ */ _jsxC(Link, {
            href: "https://tailwindcss.com/",
            rel: "noopener noreferrer",
            target: "_blank",
            class: "flex items-center justify-center",
            children: /* @__PURE__ */ _jsxQ("svg", null, {
              viewBox: "0 0 248 31",
              class: "w-64 fill-current",
              width: "auto",
              height: "auto"
            }, [
              /* @__PURE__ */ _jsxQ("path", null, {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z",
                fill: "#38bdf8"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("path", null, {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z",
                fill: "currentColor"
              }, null, 3, null)
            ], 3, null),
            [_IMMUTABLE]: {
              href: _IMMUTABLE,
              rel: _IMMUTABLE,
              target: _IMMUTABLE,
              class: _IMMUTABLE
            }
          }, 3, "Ir_6")
        ], 1, null)
      ], 1, null), 1, null)
    ]
  }, 1, "Ir_7");
};
const Hero = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_zQysZhdKDPo, "s_zQysZhdKDPo"));
const s_P4LpiWRSrIU = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: /* @__PURE__ */ _jsxC(Hero, null, 3, "kR_0")
  }, 1, "kR_1");
};
const index$1 = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_P4LpiWRSrIU, "s_P4LpiWRSrIU"));
const head$2 = {
  title: "hisyam99",
  meta: [
    {
      name: "hisyam99",
      content: "hisyam99's Website"
    }
  ]
};
const IndexRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  head: head$2
}, Symbol.toStringTag, { value: "Module" }));
const s_tNYG1Iu571w = () => {
  return /* @__PURE__ */ _jsxQ("section", null, {
    class: "flex h-screen items-center p-16"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "container mx-auto my-8 flex flex-col items-center justify-center px-5"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "max-w-md text-center"
  }, [
    /* @__PURE__ */ _jsxQ("h2", null, {
      class: "mb-8 text-9xl font-bold text-primary"
    }, [
      /* @__PURE__ */ _jsxQ("span", null, {
        class: "sr-only"
      }, "Error", 3, null),
      /* @__PURE__ */ _jsxQ("span", null, null, "404", 3, null)
    ], 3, null),
    /* @__PURE__ */ _jsxQ("p", null, {
      class: "text-3xl font-medium md:text-3xl"
    }, "Hehe belum ada.", 3, null),
    /* @__PURE__ */ _jsxQ("p", null, {
      class: "text-muted mb-8 mt-4 text-lg"
    }, "balik ke homepage yokk.", 3, null),
    /* @__PURE__ */ _jsxQ("a", null, {
      rel: "noopener noreferrer",
      href: "/",
      class: "btn"
    }, "Balik", 3, null)
  ], 3, null), 3, null), 3, "sF_0");
};
const _404 = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_tNYG1Iu571w, "s_tNYG1Iu571w"));
const head$1 = {
  title: "Tidak ada cuy"
};
const Q404Route = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _404,
  head: head$1
}, Symbol.toStringTag, { value: "Module" }));
const srcSet = "/build/q-CvVJlvt9.webp 200w, /build/q-Yt_wDd4U.webp 400w, /build/q-CyS5YQcC.webp 600w, /build/q-CtL4ZZnW.webp 800w, /build/q-DItZXVp8.webp 1200w";
const width = 1200;
const height = 725;
const PROPS = { srcSet, width, height };
function ImgXZ(props, key, _, dev) {
  return _jsxQ("img", { ...{ decoding: "async", loading: "lazy" }, ...props }, PROPS, void 0, 3, key);
}
const s_Ipfp442DRLg = () => {
  return /* @__PURE__ */ _jsxQ("section", null, {
    class: "mt-16 min-h-screen"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "container mx-auto px-6 py-10"
  }, [
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "flex items-center justify-between"
    }, [
      /* @__PURE__ */ _jsxQ("h1", null, {
        class: "text-2xl font-semibold  capitalize lg:text-3xl "
      }, [
        "postingan terbaru",
        " "
      ], 3, null),
      /* @__PURE__ */ _jsxQ("button", null, {
        class: "focus:outline-none"
      }, /* @__PURE__ */ _jsxQ("svg", null, {
        xmlns: "http://www.w3.org/2000/svg",
        class: "h-6 w-6  transform transition-colors duration-300  hover:text-primary",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
      }, /* @__PURE__ */ _jsxQ("path", null, {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2",
        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      }, null, 3, null), 3, null), 3, null)
    ], 3, null),
    /* @__PURE__ */ _jsxQ("hr", null, {
      class: "my-8 border-gray-200 dark:border-gray-700"
    }, null, 3, null),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
    }, [
      /* @__PURE__ */ _jsxQ("div", null, null, [
        /* @__PURE__ */ _jsxC(ImgReparin, {
          class: "h-64 w-full rounded-lg object-cover object-center lg:h-80",
          [_IMMUTABLE]: {
            class: _IMMUTABLE
          }
        }, 3, "KF_0"),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "mt-8"
        }, [
          /* @__PURE__ */ _jsxQ("span", null, {
            class: "uppercase text-primary"
          }, "startup", 3, null),
          /* @__PURE__ */ _jsxQ("h1", null, {
            class: "mt-4 text-xl font-semibold"
          }, "Reparin : #MauService? Reparin aja !", 3, null),
          /* @__PURE__ */ _jsxQ("p", null, {
            class: "mt-2"
          }, "Reparin bertujuan untuk memberikan kemudahan bagi pengguna dalam menemukan teknisi perbaikan yang terpercaya, berkualitas, dan tepat waktu.", 3, null),
          /* @__PURE__ */ _jsxQ("div", null, {
            class: "mt-4 flex items-center justify-between"
          }, [
            /* @__PURE__ */ _jsxQ("div", null, null, [
              /* @__PURE__ */ _jsxC(Link, {
                href: "#",
                class: "text-lg font-medium hover:underline",
                children: "Muhammad Hisyam Kamil",
                [_IMMUTABLE]: {
                  href: _IMMUTABLE,
                  class: _IMMUTABLE
                }
              }, 3, "KF_1"),
              /* @__PURE__ */ _jsxQ("p", null, {
                class: "text-sm"
              }, "Juni 11, 2024", 3, null)
            ], 1, null),
            /* @__PURE__ */ _jsxC(Link, {
              href: "https://reparin.xyz/about",
              class: "inline-block text-primary underline hover:text-blue-400",
              children: "Read more",
              [_IMMUTABLE]: {
                href: _IMMUTABLE,
                class: _IMMUTABLE
              }
            }, 3, "KF_2")
          ], 1, null)
        ], 1, null)
      ], 1, null),
      /* @__PURE__ */ _jsxQ("div", null, null, [
        /* @__PURE__ */ _jsxC(ImgXZ, {
          class: "h-64 w-full rounded-lg object-cover object-center lg:h-80",
          [_IMMUTABLE]: {
            class: _IMMUTABLE
          }
        }, 3, "KF_3"),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: "mt-8"
        }, [
          /* @__PURE__ */ _jsxQ("span", null, {
            class: "uppercase text-primary"
          }, "linux", 3, null),
          /* @__PURE__ */ _jsxQ("h1", null, {
            class: "mt-4 text-xl font-semibold"
          }, "Arch Linux: Paket xz telah di-backdoor", 3, null),
          /* @__PURE__ */ _jsxQ("p", null, {
            class: "mt-2"
          }, "As many of you may have already read (one), the upstream release tarballs for xz in version 5.6.0 and 5.6.1 contain malicious code which adds a backdoor.", 3, null),
          /* @__PURE__ */ _jsxQ("div", null, {
            class: "mt-4 flex items-center justify-between"
          }, [
            /* @__PURE__ */ _jsxQ("div", null, null, [
              /* @__PURE__ */ _jsxC(Link, {
                href: "#",
                class: "text-lg font-medium hover:underline",
                children: "David Runge",
                [_IMMUTABLE]: {
                  href: _IMMUTABLE,
                  class: _IMMUTABLE
                }
              }, 3, "KF_4"),
              /* @__PURE__ */ _jsxQ("p", null, {
                class: "text-sm"
              }, "Maret 29, 2024", 3, null)
            ], 1, null),
            /* @__PURE__ */ _jsxC(Link, {
              href: "https://archlinux.org/news/the-xz-package-has-been-backdoored",
              class: "inline-block text-primary underline hover:text-blue-400",
              children: "Read more",
              [_IMMUTABLE]: {
                href: _IMMUTABLE,
                class: _IMMUTABLE
              }
            }, 3, "KF_5")
          ], 1, null)
        ], 1, null)
      ], 1, null),
      /* @__PURE__ */ _jsxQ("div", null, {
        class: "flex w-full flex-col space-y-8"
      }, [
        /* @__PURE__ */ _jsxQ("div", null, null, /* @__PURE__ */ _jsxQ("div", null, {
          class: "skeleton h-80 w-full rounded-lg"
        }, null, 3, null), 3, null),
        /* @__PURE__ */ _jsxQ("div", null, {
          class: " flex  flex-col justify-between space-y-16"
        }, [
          /* @__PURE__ */ _jsxQ("div", null, null, [
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "skeleton h-4 w-1/4"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "skeleton mt-2 h-6 w-full"
            }, null, 3, null),
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "skeleton mt-2 h-4 w-full"
            }, null, 3, null)
          ], 3, null),
          /* @__PURE__ */ _jsxQ("div", null, {
            class: "mt-4"
          }, /* @__PURE__ */ _jsxQ("div", null, {
            class: "flex items-center justify-between"
          }, [
            /* @__PURE__ */ _jsxQ("div", null, null, [
              /* @__PURE__ */ _jsxQ("div", null, {
                class: "skeleton h-4 w-20"
              }, null, 3, null),
              /* @__PURE__ */ _jsxQ("div", null, {
                class: "skeleton mt-1 h-3 w-16"
              }, null, 3, null)
            ], 3, null),
            /* @__PURE__ */ _jsxQ("div", null, {
              class: "skeleton h-4 w-12"
            }, null, 3, null)
          ], 3, null), 3, null)
        ], 3, null)
      ], 3, null)
    ], 1, null)
  ], 1, null), 1, "KF_6");
};
const index = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_Ipfp442DRLg, "s_Ipfp442DRLg"));
const head = {
  title: "Hisyam99 | Blogs"
};
const BlogRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  head
}, Symbol.toStringTag, { value: "Module" }));
const serverPlugins = [];
const Layout = () => Layout_;
const routes = [
  ["/", [Layout, () => IndexRoute], "/", ["q-D6cBV_wf.js", "q-D8TebJPg.js"]],
  ["404.html", [Layout, () => Q404Route], "/404.html", ["q-D6cBV_wf.js", "q-DuCJUo8d.js"]],
  ["blog/", [Layout, () => BlogRoute], "/blog/", ["q-D6cBV_wf.js", "q-MNErTmVU.js"]]
];
const menus = [];
const trailingSlash = true;
const basePathname = "/";
const cacheModules = true;
const qwikCityPlan = { routes, serverPlugins, menus, trailingSlash, basePathname, cacheModules };
export {
  basePathname,
  cacheModules,
  qwikCityPlan as default,
  menus,
  routes,
  serverPlugins,
  trailingSlash
};
