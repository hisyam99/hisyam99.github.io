/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import StackIcon from "tech-stack-icons";

// Define the props interface for StackIcon
interface StackIconProps {
  name: string;
  className?: string;
  [key: string]: any;
}

// Qwikify the StackIcon component with proper typing
export const QStackIcon = qwikify$<StackIconProps>(StackIcon);
