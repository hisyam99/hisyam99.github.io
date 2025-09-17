import {
  component$,
  useVisibleTask$,
  useSignal,
  type QRL,
  type JSXNode,
} from "@builder.io/qwik";

interface AnimatedSectionProps {
  animation?:
    | "fadeIn"
    | "slideInLeft"
    | "slideInRight"
    | "slideInUp"
    | "slideInDown"
    | "scaleIn"
    | "staggerChildren";
  delay?: number;
  duration?: number;
  class?: string;
  children?: JSXNode;
  onClick$?: QRL<() => void>;
}

export const AnimatedSection = component$<AnimatedSectionProps>((props) => {
  const ref = useSignal<Element>();
  const isVisible = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!ref.value) return;

    const handleEntryIntersection = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        const delay = (props.delay ?? 0) * 1000;
        setTimeout(() => {
          entry.target.classList.add("animate-in");
        }, delay);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(handleEntryIntersection);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    observer.observe(ref.value);

    return () => observer.disconnect();
  });

  const getAnimationClass = () => {
    const base = "transition-all duration-700 ease-out";
    const animationType = props.animation ?? "fadeIn";

    const animations = {
      fadeIn: "opacity-0 animate-fadeIn",
      slideInLeft: "opacity-0 -translate-x-16 animate-slideInLeft",
      slideInRight: "opacity-0 translate-x-16 animate-slideInRight",
      slideInUp: "opacity-0 translate-y-16 animate-slideInUp",
      slideInDown: "opacity-0 -translate-y-16 animate-slideInDown",
      scaleIn: "opacity-0 scale-90 animate-scaleIn",
      staggerChildren: "opacity-0 animate-stagger",
    };

    return `${base} ${animations[animationType]}`;
  };

  return (
    <div
      ref={ref}
      class={`${getAnimationClass()} ${props.class ?? ""}`}
      style={{
        "--animation-duration": `${props.duration ?? 0.7}s`,
        "--animation-delay": `${props.delay ?? 0}s`,
      }}
      onClick$={props.onClick$}
    >
      {props.children}
    </div>
  );
});

export default AnimatedSection;
