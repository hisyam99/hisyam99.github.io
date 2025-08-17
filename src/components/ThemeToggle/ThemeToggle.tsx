import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  LuSunMoon,
  LuSun,
  LuMoon,
  LuPaintBucket,
  LuChevronDown,
  LuPalette,
} from "../icons/LucideIconsOptimized";

const themes = [
  { name: "System Theme", value: "auto" },
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Cupcake", value: "cupcake" },
  { name: "Bumblebee", value: "bumblebee" },
  { name: "Emerald", value: "emerald" },
  { name: "Corporate", value: "corporate" },
  { name: "Synthwave", value: "synthwave" },
  { name: "Retro", value: "retro" },
  { name: "Cyberpunk", value: "cyberpunk" },
  { name: "Valentine", value: "valentine" },
  { name: "Halloween", value: "halloween" },
  { name: "Garden", value: "garden" },
  { name: "Forest", value: "forest" },
  { name: "Aqua", value: "aqua" },
  { name: "Lofi", value: "lofi" },
  { name: "Pastel", value: "pastel" },
  { name: "Fantasy", value: "fantasy" },
  { name: "Wireframe", value: "wireframe" },
  { name: "Black", value: "black" },
  { name: "Luxury", value: "luxury" },
  { name: "Dracula", value: "dracula" },
  { name: "CMYK", value: "cmyk" },
  { name: "Autumn", value: "autumn" },
  { name: "Business", value: "business" },
  { name: "Acid", value: "acid" },
  { name: "Lemonade", value: "lemonade" },
  { name: "Night", value: "night" },
  { name: "Coffee", value: "coffee" },
  { name: "Winter", value: "winter" },
  { name: "Dim", value: "dim" },
  { name: "Nord", value: "nord" },
  { name: "Sunset", value: "sunset" },
];

export const ThemeToggle = component$(() => {
  // Read the current theme from the DOM or localStorage, fallback to "auto"
  let initialTheme = "auto";
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr) {
      // Check if the current theme exists in our themes list
      const foundTheme = themes.find((theme) => theme.value === attr);
      if (foundTheme) {
        initialTheme = attr;
      }
    }
    const saved = localStorage.getItem("theme");
    if (saved) {
      // Check if the saved theme exists in our themes list
      const foundTheme = themes.find((theme) => theme.value === saved);
      if (foundTheme) {
        initialTheme = saved;
      }
    }
  }
  const theme = useSignal(initialTheme);

  const setTheme = $((value: string) => {
    if (value === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", value);
    }
    localStorage.setItem("theme", value);
    theme.value = value;
  });

  // Function to get appropriate icon for theme
  const getThemeIcon = (themeValue: string) => {
    switch (themeValue) {
      case "light":
        return <LuSun class="h-4 w-4" />;
      case "dark":
        return <LuMoon class="h-4 w-4" />;
      case "auto":
        return <LuSunMoon class="h-4 w-4" />;
      default:
        return <LuPaintBucket class="h-4 w-4" />;
    }
  };

  // Function to get the main button icon (current theme icon)
  const getMainButtonIcon = () => {
    switch (theme.value) {
      case "light":
        return <LuSun class="h-4 w-4" />;
      case "dark":
        return <LuMoon class="h-4 w-4" />;
      case "auto":
        return <LuSunMoon class="h-4 w-4" />;
      default:
        return <LuPalette class="h-4 w-4" />;
    }
  };

  return (
    <div class="dropdown-end dropdown-bottom dropdown relative z-[100]">
      <button
        tabIndex={0}
        type="button"
        class="action-btn theme-btn group"
        aria-label="Select theme"
      >
        <div class="flex items-center gap-2">
          {getMainButtonIcon()}
          <span class="hidden text-sm font-medium lg:block">Theme</span>
          <LuChevronDown class="h-3 w-3" />
        </div>
        <div class="action-btn-glow"></div>
      </button>
      <ul class="dropdown-content rounded-box bg-base-200/95 border-base-content/10 z-[100] max-h-60 w-52 overflow-y-auto border p-2 shadow-2xl backdrop-blur-xl">
        {themes.map(({ name, value }) => (
          <li key={value}>
            <button
              class={`theme-controller btn btn-ghost btn-sm btn-block hover:bg-primary/10 justify-start transition-colors duration-200 ${
                theme.value === value ? "bg-primary/20" : ""
              }`}
              onClick$={async () => {
                await setTheme(value);
              }}
            >
              <span class="flex items-center gap-2">
                {getThemeIcon(value)}
                {name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
