import { component$, useSignal, $, useOnWindow } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { ThemeToggle } from "~/components/ThemeToggle/ThemeToggle";

export default component$(() => {
  const location = useLocation();
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

    // Update URL hash tanpa scroll
    if (newHash) {
      history.replaceState(null, "", newHash);
    } else if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
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

  return (
    <header class="fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-out">
      {/* Main Header Container */}
      <div class="relative container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          {/* Left Section - Logo */}
          <div class="flex-none lg:w-1/4">
            <div class="fluent-glass-card-left group inline-block">
              <Link
                href="/"
                class="flex items-center space-x-3 rounded-2xl p-4 transition-all duration-500 hover:scale-105"
              >
                <div class="relative">
                  <div class="from-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-r opacity-75 blur-md transition-all duration-500 group-hover:blur-lg"></div>
                  <div class="from-primary to-secondary relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r">
                    <span class="text-lg font-bold text-white">H</span>
                  </div>
                </div>
                <div class="block">
                  <span class="animate-textReveal text-primary text-xl font-bold tracking-tight">
                    hisyam99
                  </span>
                  <div class="text-base-content text-xs font-medium tracking-wider opacity-70">
                    Developer
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div class="hidden flex-1 justify-center lg:flex">
            <div class="fluent-glass-card-center">
              <nav class="flex items-center space-x-1 p-2">
                {[
                  {
                    href: "/",
                    label: "Home",
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                    href: "/schedule",
                    label: "Schedule",
                    icon: (
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    href: "/projects",
                    label: "Projects",
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                    icon: (
                      <svg
                        class="h-5 w-5"
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
                ].map((item, index) => {
                  const isCurrentlyActive = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      class={`nav-link-modern group ${
                        isCurrentlyActive
                          ? "active text-primary bg-primary/10 scale-105"
                          : "text-content-secondary hover:text-primary"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Active background glow */}
                      {isCurrentlyActive && (
                        <div class="bg-primary/5 absolute inset-0 animate-pulse rounded-2xl"></div>
                      )}

                      <span
                        class={`nav-icon relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                          isCurrentlyActive ? "text-primary scale-110" : ""
                        }`}
                      >
                        {item.icon}

                        {/* Active dot indicator */}
                        {isCurrentlyActive && (
                          <div class="bg-primary absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full"></div>
                        )}
                      </span>

                      <span
                        class={`nav-text relative z-10 ${
                          isCurrentlyActive
                            ? "text-primary scale-105 font-semibold"
                            : "group-hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </span>

                      <div
                        class={`nav-indicator ${
                          isCurrentlyActive
                            ? "from-primary to-secondary w-3/5 bg-gradient-to-r"
                            : ""
                        }`}
                      ></div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div class="flex flex-none justify-end lg:w-1/4">
            <div class="fluent-glass-card-right inline-block">
              <div class="flex items-center space-x-3 p-4">
                <Link
                  href="https://github.com/hisyam99"
                  target="_blank"
                  class="action-btn github-btn group"
                  aria-label="GitHub"
                >
                  <svg
                    class="h-5 w-5 fill-current transition-transform duration-300 group-hover:rotate-12"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="action-btn-glow"></div>
                </Link>

                <div class="relative">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
