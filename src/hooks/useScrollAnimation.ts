import { useVisibleTask$, useSignal } from "@builder.io/qwik";

export function useScrollAnimation(threshold = 0.1, once = true) {
  const ref = useSignal<Element>();
  const isVisible = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    let observer: IntersectionObserver | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    try {
      // Immediate fallback - show content after a short delay
      fallbackTimer = setTimeout(() => {
        if (ref.value && !isVisible.value) {
          ref.value.classList.add("animate-in");
          isVisible.value = true;
        }
      }, 500);

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (fallbackTimer) {
              clearTimeout(fallbackTimer);
              fallbackTimer = null;
            }
            isVisible.value = true;
            entry.target.classList.add("animate-in");

            if (once && observer) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            isVisible.value = false;
            entry.target.classList.remove("animate-in");
          }
        });
      };

      observer = new IntersectionObserver(handleIntersection, {
        threshold,
        // Add root margin to trigger animation slightly before element enters viewport
        rootMargin: "50px 0px",
      });

      observer.observe(ref.value);
    } catch (error) {
      console.error("Error in useScrollAnimation:", error);
      // Fallback: show content immediately if observer fails
      if (ref.value) {
        ref.value.classList.add("animate-in");
        isVisible.value = true;
      }
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    };
  });

  return { ref, isVisible };
}

export function useStaggerAnimation(delay = 100) {
  const containerRef = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!containerRef.value) return;

    let observer: IntersectionObserver | null = null;
    const timers: NodeJS.Timeout[] = [];

    try {
      const animateChild = (child: Element, index: number) => {
        const timer = setTimeout(() => {
          child.classList.add("animate-fadeInUp");
        }, index * delay);
        timers.push(timer);
      };

      const handleStaggerEntry = (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const children = Array.from(entry.target.children);
          children.forEach(animateChild);
          if (observer) {
            observer.unobserve(entry.target);
          }
        }
      };

      const handleStaggerIntersection = (
        entries: IntersectionObserverEntry[],
      ) => {
        entries.forEach(handleStaggerEntry);
      };

      observer = new IntersectionObserver(handleStaggerIntersection, {
        threshold: 0.1,
        rootMargin: "50px 0px",
      });

      observer.observe(containerRef.value);
    } catch (error) {
      console.error("Error in useStaggerAnimation:", error);
      // Fallback: show all children immediately
      if (containerRef.value) {
        const children = Array.from(containerRef.value.children);
        children.forEach((child) => {
          child.classList.add("animate-fadeInUp");
        });
      }
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      timers.forEach((timer) => clearTimeout(timer));
      timers.length = 0;
    };
  });

  return containerRef;
}

export function useParallaxEffect(speed = 0.5) {
  const ref = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (!ref.value) return;

          const scrolled = window.pageYOffset;
          const rate = scrolled * -speed;

          (ref.value as HTMLElement).style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  });

  return ref;
}

export function useMagneticEffect(strength = 0.3) {
  const ref = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: Event) => {
      if (!ref.value) return;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!ref.value) return;
        const mouseEvent = e as MouseEvent;

        const rect = ref.value.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        (ref.value as HTMLElement).style.transform =
          `translate(${x * strength}px, ${y * strength}px)`;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      if (!ref.value) return;
      (ref.value as HTMLElement).style.transform = "translate(0px, 0px)";
    };

    const element = ref.value;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  });

  return ref;
}

/**
 * Custom hook for smooth scroll behavior with better control
 * Use this instead of CSS scroll-behavior: smooth
 */
export function useSmoothScroll() {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();

      // Smooth scroll with better control
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update URL without triggering navigation
      if (history.pushState) {
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  });
}
