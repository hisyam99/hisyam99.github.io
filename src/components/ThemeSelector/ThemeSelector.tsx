import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

const themeOptions: { label: string; value: string }[] = [
  { label: "System Theme", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Cupcake", value: "cupcake" },
  { label: "Bumblebee", value: "bumblebee" },
  { label: "Emerald", value: "emerald" },
  { label: "Corporate", value: "corporate" },
  { label: "Synthwave", value: "synthwave" },
  { label: "Retro", value: "retro" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Valentine", value: "valentine" },
  { label: "Halloween", value: "halloween" },
  { label: "Garden", value: "garden" },
  { label: "Forest", value: "forest" },
  { label: "Aqua", value: "aqua" },
  { label: "Lofi", value: "lofi" },
  { label: "Pastel", value: "pastel" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Wireframe", value: "wireframe" },
  { label: "Black", value: "black" },
  { label: "Luxury", value: "luxury" },
  { label: "Dracula", value: "dracula" },
  { label: "CMYK", value: "cmyk" },
  { label: "Autumn", value: "autumn" },
  { label: "Business", value: "business" },
  { label: "Acid", value: "acid" },
  { label: "Lemonade", value: "lemonade" },
  { label: "Night", value: "night" },
  { label: "Coffee", value: "coffee" },
  { label: "Winter", value: "winter" },
  { label: "Dim", value: "dim" },
  { label: "Nord", value: "nord" },
  { label: "Sunset", value: "sunset" },
];

const ThemeSelector = component$(() => {
  // Use a signal for theme selection
  const theme = useSignal<string>("default");

  // Initialize theme from localStorage on component mount
  useVisibleTask$(() => {
    const storedTheme = localStorage.getItem("theme");
    if (
      storedTheme &&
      themeOptions.map((option) => option.value).includes(storedTheme)
    ) {
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
    <div class="dropdown-end dropdown-bottom dropdown relative z-[100]">
      <button
        tabIndex={0}
        type="button"
        class="action-btn theme-btn group"
        aria-label="Select theme"
      >
        <div class="flex items-center gap-2">
          <svg
            width="16px"
            height="16px"
            class="fill-current transition-transform duration-300 group-hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          <span class="hidden text-sm font-medium lg:block">Theme</span>
          <svg
            width="10px"
            height="10px"
            class="fill-current transition-transform duration-300 group-hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <div class="action-btn-glow"></div>
      </button>
      <ul class="dropdown-content rounded-box bg-base-200/95 border-base-content/10 z-[100] max-h-60 w-52 overflow-y-auto border p-2 shadow-2xl backdrop-blur-xl">
        {themeOptions.map((themeOption) => (
          <li key={themeOption.value}>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-ghost btn-sm btn-block hover:bg-primary/10 justify-start transition-colors duration-200"
              aria-label={themeOption.label}
              value={themeOption.value}
              onChange$={() => handleThemeChange(themeOption.value)}
              checked={theme.value === themeOption.value}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ThemeSelector;
