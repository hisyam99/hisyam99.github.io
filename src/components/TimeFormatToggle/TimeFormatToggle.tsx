import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import {
  getTimeFormat,
  toggleTimeFormat,
  type TimeFormat,
} from "~/utils/settings";

export const TimeFormatToggle = component$(() => {
  const timeFormat = useSignal<TimeFormat>("24");

  // Initialize time format from localStorage
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    timeFormat.value = getTimeFormat();
  });

  const handleToggle = $(() => {
    const newFormat = toggleTimeFormat();
    timeFormat.value = newFormat;

    // Trigger a custom event to notify other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("timeFormatChanged", {
          detail: { format: newFormat },
        }),
      );
    }
  });

  return (
    <div class="tooltip tooltip-bottom" data-tip="Switch Time Format">
      <button
        onClick$={handleToggle}
        class="btn btn-ghost btn-sm gap-2 transition-all duration-300 hover:scale-105"
        aria-label={`Switch to ${timeFormat.value === "12" ? "24-hour" : "12-hour"} format`}
      >
        <svg
          class="h-4 w-4 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="hidden sm:inline">
          {timeFormat.value === "12" ? "12H" : "24H"}
        </span>

        {/* Visual indicator for current format */}
        <div
          class={`h-2 w-2 rounded-full transition-colors duration-300 ${
            timeFormat.value === "12" ? "bg-secondary" : "bg-primary"
          }`}
        ></div>
      </button>
    </div>
  );
});
