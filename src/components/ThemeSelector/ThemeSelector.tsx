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
        {themeOptions.map((themeOption) => (
          <li key={themeOption.value}>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-ghost btn-sm btn-block justify-start"
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
