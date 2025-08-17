import type { SVGProps } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import {
  LuSunMoon as LucideLuSunMoon,
  LuSun as LucideLuSun,
  LuMoon as LucideLuMoon,
  LuPaintBucket as LucideLuPaintBucket,
  LuChevronDown as LucideLuChevronDown,
  LuPalette as LucideLuPalette,
} from "@qwikest/icons/lucide";

export const LuSunMoon = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuSunMoon {...props} />
));
export const LuSun = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuSun {...props} />
));
export const LuPaintBucket = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuPaintBucket {...props} />
));
export const LuMoon = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuMoon {...props} />
));
export const LuChevronDown = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuChevronDown {...props} />
));
export const LuPalette = component$((props: SVGProps<SVGSVGElement>) => (
  <LucideLuPalette {...props} />
));
