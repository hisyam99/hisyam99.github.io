import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { themeChange } from "theme-change";

const ThemeSelectorOld = component$(() => {
  useVisibleTask$(() => {
    themeChange(false);
  });

  return (
    <select data-choose-theme>
      <option value="">Default</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="pink">Pink</option>
    </select>
  );
});

export default ThemeSelectorOld;
