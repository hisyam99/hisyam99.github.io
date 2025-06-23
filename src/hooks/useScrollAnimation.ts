import { useVisibleTask$, useSignal } from "@builder.io/qwik";

export function useScrollAnimation(threshold = 0.1, once = true) {
  const ref = useSignal<Element>();
  const isVisible = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    // Immediate fallback - show content after a short delay
    const fallbackTimer = setTimeout(() => {
      if (ref.value && !isVisible.value) {
        ref.value.classList.add("animate-in");
        isVisible.value = true;
      }
    }, 500);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          isVisible.value = true;
          entry.target.classList.add("animate-in");

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          isVisible.value = false;
          entry.target.classList.remove("animate-in");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    observer.observe(ref.value);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  });

  return { ref, isVisible };
}

export function useStaggerAnimation(delay = 100) {
  const containerRef = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!containerRef.value) return;

    const animateChild = (child: Element, index: number) => {
      setTimeout(() => {
        child.classList.add("animate-fadeInUp");
      }, index * delay);
    };

    const handleStaggerEntry = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const children = Array.from(entry.target.children);
        children.forEach(animateChild);
        observer.unobserve(entry.target);
      }
    };

    const handleStaggerIntersection = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach(handleStaggerEntry);
    };

    const observer = new IntersectionObserver(handleStaggerIntersection, {
      threshold: 0.1,
    });

    observer.observe(containerRef.value);

    return () => observer.disconnect();
  });

  return containerRef;
}

export function useParallaxEffect(speed = 0.5) {
  const ref = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    const handleScroll = () => {
      if (!ref.value) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      (ref.value as HTMLElement).style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return ref;
}

export function useMagneticEffect(strength = 0.3) {
  const ref = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    const handleMouseMove = (e: Event) => {
      if (!ref.value) return;
      const mouseEvent = e as MouseEvent;

      const rect = ref.value.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      (ref.value as HTMLElement).style.transform =
        `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
      if (!ref.value) return;
      (ref.value as HTMLElement).style.transform = "translate(0px, 0px)";
    };

    const element = ref.value;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return ref;
}
