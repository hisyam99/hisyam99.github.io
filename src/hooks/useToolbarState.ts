import { useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export interface ToolbarState {
  isVisible: boolean;
  isExpanded: boolean;
}

export function useToolbarState(storageKey = "toolbar-expanded") {
  const isVisible = useSignal(false);
  const isExpanded = useSignal(true);

  // Load state from localStorage
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const savedExpanded = localStorage.getItem(storageKey);
    if (savedExpanded !== null) {
      isExpanded.value = JSON.parse(savedExpanded);
    }

    // Animate in with delay
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  });

  // Toggle function with localStorage persistence
  const toggle = $(() => {
    isExpanded.value = !isExpanded.value;
    localStorage.setItem(storageKey, JSON.stringify(isExpanded.value));
  });

  // Get CSS classes for animations
  const getVisibilityClasses = $(() => {
    return isVisible.value
      ? "translate-y-0 opacity-100"
      : "-translate-y-full opacity-0";
  });

  const getExpandedClasses = $(() => {
    return isExpanded.value
      ? "translate-y-0 opacity-100"
      : "-translate-y-8 opacity-0 pointer-events-none";
  });

  const getToggleButtonClasses = $(() => {
    return isExpanded.value
      ? "btn-primary hover:btn-primary-focus"
      : "btn-secondary hover:btn-secondary-focus";
  });

  const getToggleIconClasses = $(() => {
    return isExpanded.value ? "rotate-180" : "rotate-0";
  });

  return {
    isVisible,
    isExpanded,
    toggle,
    getVisibilityClasses,
    getExpandedClasses,
    getToggleButtonClasses,
    getToggleIconClasses,
  };
}
