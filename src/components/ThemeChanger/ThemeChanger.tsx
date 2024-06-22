import { component$, useTask$, useSignal, $ } from "@builder.io/qwik";

export const ThemeChanger = component$(() => {
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
    "sunset",
  ];

  const getInitialTheme = () =>
    (typeof window !== "undefined" && localStorage.getItem("theme")) || "auto";
  const theme = useSignal<string>(getInitialTheme());

  const handleChangeTheme = $(async (event: Event) => {
    const newTheme = (event.target as HTMLSelectElement).value;
    theme.value = newTheme;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  });

  useTask$(({ track }) => {
    track(() => theme.value);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme.value);
    }
  });

  return (
    <div>
      <select
        class="select select-primary select-sm"
        value={theme.value}
        onChange$={handleChangeTheme}
        data-choose-theme
      >
        <option disabled>Pilih tema</option>
        <option value="auto" class="text-primary">
          Sistem
        </option>
        {themeOptions.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
});
