import { Easing, motion, MotionStyle, Target } from "framer-motion";
import { LegacyRef, ReactNode } from "react";

import useInView from "../hooks/useInView";

interface Props {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
  initial: Target;
  animate: Target;
  duration?: number;
  ease?: Easing | Easing[];
  once?: boolean;
  delay?: number;
  style?: MotionStyle;
}

export const MotionDiv = ({
  initial,
  animate,
  children,
  className,
  enabled = true,
  duration = 1,
  ease,
  once = true,
  delay = 0,
  style
}: Props) => {
  const [ref, inView] = useInView(0.5);
  return (
    <motion.div
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
      style={style}
      whileInView={enabled ? (inView ? animate : {}) : undefined}
      transition={{ duration, ease, delay }}
      initial={enabled ? initial : undefined}
      className={className}
      viewport={{
        once
      }}
    >
      {children}
    </motion.div>
  );
};
