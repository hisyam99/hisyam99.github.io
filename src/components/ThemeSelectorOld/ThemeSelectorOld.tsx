import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { themeChange } from "theme-change";

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

const ThemeSelectorOld = component$(() => {
  const theme = useSignal<string>("");

  useVisibleTask$(() => {
    themeChange(false);
  });

  return (
    <select
      class="select select-primary select-sm"
      value={theme.value}
      data-choose-theme
    >
      <option disabled selected>
        Pilih tema
      </option>
      <option value="auto" class="text-primary">
        Sistem
      </option>
      {themeOptions.map((themeOption) => (
        <option key={themeOption} value={themeOption}>
          {themeOption}
        </option>
      ))}
    </select>
  );
});

export default ThemeSelectorOld;
