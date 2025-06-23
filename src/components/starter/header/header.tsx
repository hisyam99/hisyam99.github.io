import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ThemeSelector from "~/components/ThemeSelector/ThemeSelector";

export default component$(() => {
  const isScrolled = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isScrolled.value);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      class={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled.value
          ? "bg-base-100/95 shadow-lg backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div class="navbar container mx-auto px-4">
        {/* Logo/Brand */}
        <div class="navbar-start">
          <Link href="/" class="btn btn-ghost hover-scale text-xl normal-case">
            <span class="text-gradient animate-textReveal text-2xl font-bold">
              hisyam99
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal stagger-container gap-2 px-1">
            <li>
              <Link
                href="/"
                class="hover:text-primary hover-scale transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                class="hover:text-primary hover-scale transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#skills"
                class="hover:text-primary hover-scale transition-colors"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                href="/#projects"
                class="hover:text-primary hover-scale transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                class="hover:text-primary hover-scale transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                class="hover:text-primary hover-scale transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side items */}
        <div class="navbar-end gap-2">
          <Link
            href="https://github.com/hisyam99"
            target="_blank"
            class="btn btn-ghost btn-circle hover-scale animate-fadeInRight"
            style="animation-delay: 0.8s"
            aria-label="GitHub"
          >
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
});
