import { component$, useSignal, $, useOnWindow } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export interface BottomNavbarProps {}

export const BottomNavbar = component$<BottomNavbarProps>(() => {
  const location = useLocation();
  const activeTab = useSignal(0);
  const isExpanded = useSignal(false);
  const currentHash = useSignal(location.url.hash);

  const findClosestSection = $((sections: string[], scrollPosition: number) => {
    let closestSection = "";
    let closestDistance = Infinity;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementCenter = elementTop + rect.height / 2;
      const viewportCenter = scrollPosition + window.innerHeight / 2;

      // Jika element dalam viewport atau dekat dengan center
      if (rect.top <= 200 && rect.bottom >= 100) {
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      }
    }

    return closestSection;
  });

  const updateHash = $((activeSection: string) => {
    const newHash = activeSection ? `#${activeSection}` : "";
    if (newHash === currentHash.value) return;

    currentHash.value = newHash;
  });

  const updateActiveSection = $(async () => {
    const sections = ["about", "skills", "projects", "contact"];
    const scrollPosition = window.scrollY + 120; // Offset for header height

    // Check jika di top of page (sebelum section pertama)
    if (scrollPosition < 400) {
      await updateHash("");
      return;
    }

    const activeSection = await findClosestSection(sections, scrollPosition);
    await updateHash(activeSection);
  });

  // Optimized scroll handler dengan throttling
  useOnWindow(
    "scroll",
    $(() => {
      // Use requestAnimationFrame untuk optimal performance
      requestAnimationFrame(() => {
        updateActiveSection();
      });
    }),
  );

  // Hash change listener
  useOnWindow(
    "hashchange",
    $(() => {
      currentHash.value = window.location.hash;
      // Delay untuk memastikan scroll selesai
      setTimeout(() => {
        updateActiveSection();
      }, 100);
    }),
  );

  const isActive = (href: string) => {
    if (href === "/") {
      // Home active jika di root dan tidak ada hash atau hash kosong
      return (
        (location.url.pathname === "/" || location.url.pathname === "/home") &&
        (!currentHash.value || currentHash.value === "")
      );
    }
    if (href.startsWith("/#")) {
      const hash = href.replace("/#", "");
      // Check current hash dari signal, bukan dari location
      return currentHash.value === `#${hash}`;
    }
    return location.url.pathname.startsWith(href);
  };

  const handleTabClick = $((index: number) => {
    activeTab.value = index;
    isExpanded.value = false; // Close drawer when navigating
  });

  const toggleExpanded = $(() => {
    isExpanded.value = !isExpanded.value;
  });

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      activeIcon: (
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      href: "/#projects",
      label: "Projects",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      activeIcon: (
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6H4c-1.11 0-2 .89-2 2v10c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 2v2H4V8h16Z" />
        </svg>
      ),
    },
    {
      href: "/blog",
      label: "Blog",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
      activeIcon: (
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      ),
    },
    {
      href: "/#contact",
      label: "Contact",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      activeIcon: (
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
        </svg>
      ),
    },
  ];

  const drawerMenuItems = [
    {
      href: "/",
      label: "Home",
      description: "Back to homepage",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: "/#about",
      label: "About",
      description: "Learn more about me",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      href: "/#skills",
      label: "Skills",
      description: "Technologies I work with",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      href: "/#projects",
      label: "Projects",
      description: "My work and portfolio",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      href: "/blog",
      label: "Blog",
      description: "Articles and insights",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      href: "/#contact",
      label: "Contact",
      description: "Get in touch with me",
      icon: (
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      href: "https://github.com/hisyam99",
      label: "GitHub",
      description: "Check out my code",
      icon: (
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      isExternal: true,
    },
  ];

  return (
    <div class="fixed right-0 bottom-0 left-0 z-50 lg:hidden">
      {/* Backdrop for expanded state */}
      {isExpanded.value && (
        <div
          class="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm"
          onClick$={toggleExpanded}
        ></div>
      )}

      {/* Expanded Drawer Menu - Better positioning below navbar */}
      <div
        class={`bg-base-100/95 border-base-content/10 fixed top-24 right-0 bottom-0 left-0 overflow-y-auto border-t backdrop-blur-xl transition-all duration-500 ease-out ${isExpanded.value ? "translate-y-0" : "translate-y-full"} `}
      >
        <div class="p-6 pb-32">
          {/* Header */}
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h3 class="text-gradient text-lg font-bold">Navigation Menu</h3>
              <p class="text-base-content/60 text-sm">Choose where to go</p>
            </div>
            <button
              onClick$={toggleExpanded}
              class="btn btn-circle btn-ghost hover:bg-error/10 hover:text-error"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Grid */}
          <div class="grid grid-cols-2 gap-4">
            {drawerMenuItems.map((item, index) => {
              const isCurrentlyActive = isActive(item.href);

              return (
                <Link
                  key={`drawer-${item.label.toLowerCase()}-${index}`}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  class={`group relative rounded-2xl p-4 transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isCurrentlyActive
                      ? "bg-primary/20 border-primary/30 scale-105 border"
                      : "bg-base-200/50 hover:bg-primary/10"
                  }`}
                  onClick$={() => handleTabClick(index)}
                >
                  {/* Active indicator */}
                  {isCurrentlyActive && (
                    <div class="absolute top-2 right-2">
                      <div class="bg-primary h-2 w-2 animate-ping rounded-full"></div>
                    </div>
                  )}

                  <div class="flex flex-col items-center space-y-2 text-center">
                    <div
                      class={`rounded-xl p-3 transition-colors ${
                        isCurrentlyActive
                          ? "bg-primary/30 scale-110"
                          : "bg-primary/10 group-hover:bg-primary/20"
                      }`}
                    >
                      <div
                        class={`transition-transform group-hover:scale-110 ${
                          isCurrentlyActive
                            ? "text-primary scale-110"
                            : "text-primary"
                        }`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4
                        class={`text-sm font-semibold ${
                          isCurrentlyActive ? "text-primary" : ""
                        }`}
                      >
                        {item.label}
                      </h4>
                      <p class="text-base-content/60 text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Ripple effect */}
                  <div class="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-active:opacity-100">
                    <div class="bg-primary/20 absolute inset-0 scale-0 transform rounded-2xl transition-all duration-300 group-active:scale-100"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer info */}
          <div class="border-base-content/10 mt-8 border-t pt-6">
            <div class="text-center">
              <p class="text-base-content/50 text-xs">
                Developed with ❤️ using Qwik & DaisyUI v5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bottom Navbar */}
      <div
        class={`bg-base-100/80 border-base-content/10 relative border-t backdrop-blur-xl transition-all duration-500 ease-out ${isExpanded.value ? "-translate-y-6" : "translate-y-0"} `}
      >
        {/* Floating indicator */}
        <div class="from-primary to-secondary absolute top-0 right-0 left-0 h-1 bg-gradient-to-r"></div>

        {/* Navigation container */}
        <div class="safe-area-bottom relative flex items-center justify-around px-2 py-3">
          {navItems.slice(0, 2).map((item, index) => {
            const isCurrentlyActive = isActive(item.href);

            return (
              <Link
                key={`nav-${item.label.toLowerCase()}-${index}`}
                href={item.href}
                class={`group relative flex min-w-[60px] flex-col items-center justify-center rounded-2xl p-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  isCurrentlyActive
                    ? "text-primary scale-105 transform"
                    : "text-base-content/70 hover:text-primary"
                } `}
                onClick$={() => handleTabClick(index)}
              >
                {/* Active background */}
                {isCurrentlyActive && (
                  <div class="bg-primary/10 absolute inset-0 animate-pulse rounded-2xl"></div>
                )}

                {/* Icon container with animation */}
                <div
                  class={`relative z-10 mb-1 transition-all duration-300 ${isCurrentlyActive ? "animate-bounce" : "group-hover:scale-110"} `}
                >
                  {isCurrentlyActive ? item.activeIcon : item.icon}

                  {/* Active dot indicator */}
                  {isCurrentlyActive && (
                    <div class="bg-primary absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full"></div>
                  )}
                </div>

                {/* Label with slide animation */}
                <span
                  class={`relative z-10 text-xs font-medium transition-all duration-300 ${
                    isCurrentlyActive
                      ? "text-primary scale-105 font-semibold"
                      : "text-base-content/60 group-hover:text-primary"
                  } `}
                >
                  {item.label}
                </span>

                {/* Ripple effect on tap */}
                <div class="absolute inset-0 overflow-hidden rounded-2xl">
                  <div class="bg-primary/20 absolute inset-0 scale-0 rounded-2xl transition-transform duration-150 group-active:scale-100"></div>
                </div>

                {/* Hover glow effect */}
                <div
                  class={`from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                ></div>
              </Link>
            );
          })}

          {/* Main Menu Button */}
          <button
            onClick$={toggleExpanded}
            class={`group relative flex min-w-[60px] flex-col items-center justify-center rounded-2xl p-2 transition-all duration-500 ease-out hover:scale-110 active:scale-95 ${
              isExpanded.value
                ? "text-primary bg-primary/10 scale-110 transform"
                : "text-base-content/70 hover:text-primary"
            } `}
          >
            {/* Main button background */}
            <div
              class={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isExpanded.value
                  ? "bg-primary/20 scale-110"
                  : "group-hover:bg-primary/5 bg-transparent"
              } `}
            ></div>

            {/* Icon container with rotation */}
            <div
              class={`relative z-10 mb-1 transition-all duration-500 ${isExpanded.value ? "scale-110 rotate-45" : "group-hover:scale-110"} `}
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>

              {/* Pulsing ring for expanded state */}
              {isExpanded.value && (
                <div class="border-primary absolute inset-0 animate-ping rounded-full border-2"></div>
              )}
            </div>

            {/* Label */}
            <span
              class={`relative z-10 text-xs font-medium transition-all duration-300 ${
                isExpanded.value
                  ? "text-primary scale-105 font-semibold"
                  : "text-base-content/60 group-hover:text-primary"
              } `}
            >
              Menu
            </span>

            {/* Ripple effect on tap */}
            <div class="absolute inset-0 overflow-hidden rounded-2xl">
              <div class="bg-primary/20 absolute inset-0 scale-0 rounded-2xl transition-transform duration-150 group-active:scale-100"></div>
            </div>
          </button>

          {navItems.slice(2, 4).map((item, index) => {
            const actualIndex = index + 2;
            const isCurrentlyActive = isActive(item.href);

            return (
              <Link
                key={`nav-${item.label.toLowerCase()}-${actualIndex}`}
                href={item.href}
                class={`group relative flex min-w-[60px] flex-col items-center justify-center rounded-2xl p-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  isCurrentlyActive
                    ? "text-primary scale-105 transform"
                    : "text-base-content/70 hover:text-primary"
                } `}
                onClick$={() => handleTabClick(actualIndex)}
              >
                {/* Active background */}
                {isCurrentlyActive && (
                  <div class="bg-primary/10 absolute inset-0 animate-pulse rounded-2xl"></div>
                )}

                {/* Icon container with animation */}
                <div
                  class={`relative z-10 mb-1 transition-all duration-300 ${isCurrentlyActive ? "animate-bounce" : "group-hover:scale-110"} `}
                >
                  {isCurrentlyActive ? item.activeIcon : item.icon}

                  {/* Active dot indicator */}
                  {isCurrentlyActive && (
                    <div class="bg-primary absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full"></div>
                  )}
                </div>

                {/* Label with slide animation */}
                <span
                  class={`relative z-10 text-xs font-medium transition-all duration-300 ${
                    isCurrentlyActive
                      ? "text-primary scale-105 font-semibold"
                      : "text-base-content/60 group-hover:text-primary"
                  } `}
                >
                  {item.label}
                </span>

                {/* Ripple effect on tap */}
                <div class="absolute inset-0 overflow-hidden rounded-2xl">
                  <div class="bg-primary/20 absolute inset-0 scale-0 rounded-2xl transition-transform duration-150 group-active:scale-100"></div>
                </div>

                {/* Hover glow effect */}
                <div
                  class={`from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                ></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom safe area */}
        <div class="h-safe-area-bottom bg-base-100/80 backdrop-blur-xl"></div>
      </div>
    </div>
  );
});
