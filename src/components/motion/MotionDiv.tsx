import {
  component$,
  useVisibleTask$,
  useSignal,
  type QRL,
} from "@builder.io/qwik";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface MotionDivProps {
  variants?: Variants;
  initial?: string | object;
  animate?: string | object;
  exit?: string | object;
  whileHover?: string | object;
  whileTap?: string | object;
  whileInView?: string | object;
  viewport?: { once?: boolean; amount?: number };
  transition?: object;
  delay?: number;
  class?: string;
  onClick$?: QRL<() => void>;
  children?: any;
}

export const MotionDiv = component$<MotionDivProps>((props) => {
  const ref = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (ref.value) {
      const MotionComponent = motion.div;

      // Apply Framer Motion to the element
      const motionProps = {
        variants: props.variants,
        initial: props.initial ?? "hidden",
        animate: props.animate ?? "visible",
        exit: props.exit,
        whileHover: props.whileHover,
        whileTap: props.whileTap,
        whileInView: props.whileInView,
        viewport: props.viewport ?? { once: true, amount: 0.1 },
        transition: props.transition ?? { delay: props.delay ?? 0 },
      };

      // Create motion element
      const motionElement = MotionComponent(motionProps);

      // Replace the static element with motion element
      if (ref.value.parentNode) {
        ref.value.parentNode.replaceChild(motionElement, ref.value);
      }
    }
  });

  return (
    <div ref={ref} class={props.class} onClick$={props.onClick$}>
      {props.children}
    </div>
  );
});

export default MotionDiv;
