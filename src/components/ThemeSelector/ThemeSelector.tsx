import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

const themeOptions: string[] = [
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
  "sunset",
];

const ThemeSelector = component$(() => {
  // Use a signal for theme selection
  const theme = useSignal<string>("default");

  // Initialize theme from localStorage on component mount
  useVisibleTask$(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && themeOptions.includes(storedTheme)) {
      theme.value = storedTheme;
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  });

  // Update localStorage whenever theme changes
  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    localStorage.setItem("theme", theme.value);
  });

  // Serialized function for Qwik
  const handleThemeChange = $((themeOption: string) => {
    theme.value = themeOption;
    document.documentElement.setAttribute("data-theme", themeOption);
  });

  return (
    <div class="dropdown-end dropdown-bottom dropdown">
      <div tabIndex={0} role="button" class="btn btn-ghost">
        <div class="flex items-center space-x-2">
          <p>Theme</p>
          <svg
            width="12px"
            height="12px"
            class="inline-block fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
      </div>
      <ul
        tabIndex={0}
        class="dropdown-content z-[1] max-h-60 w-52 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Default System"
            onChange$={() => handleThemeChange("auto")}
          />
        </li>
        {themeOptions.map((themeOption) => (
          <li key={themeOption}>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label={themeOption}
              value={themeOption}
              onChange$={() => handleThemeChange(themeOption)}
              checked={theme.value === themeOption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ThemeSelector;
