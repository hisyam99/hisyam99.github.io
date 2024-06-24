import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { DrawerButton } from "~/components/DrawerButton/DrawerButton";
import ThemeSelector from "~/components/ThemeSelector/ThemeSelector";

export default component$(() => {
  const isScrolled = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isScrolled.value);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize the scroll position on mount
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      class={`fixed left-1/2 top-4 z-10 -translate-x-1/2 items-center justify-center rounded-lg transition-shadow duration-100 ${isScrolled.value ? "bg-base-300 bg-opacity-75 shadow-lg backdrop-blur" : "bg-base-100 shadow-none"}`}
    >
      <div class="navbar items-center justify-center rounded-lg bg-transparent">
        <div class="lg:hidden">
          <DrawerButton />
        </div>
        <div>
          <Link href="/" class="btn btn-ghost text-xl">
            hisyam99
          </Link>
        </div>
        <div class="hidden flex-none lg:flex">
          <ul class="menu menu-horizontal items-center space-x-4 px-1">
            <li>
              <Link href="blog">Blog</Link>
            </li>
            <li>
              <details>
                <summary>Portfolio</summary>
                <ul class="rounded-t-none bg-base-100 p-2">
                  <li>
                    <Link href="https://reparin.xyz">Reparin</Link>
                  </li>
                  <li>
                    <Link href="404">coming soon . . .</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <ThemeSelector />
      </div>
    </header>
  );
});
