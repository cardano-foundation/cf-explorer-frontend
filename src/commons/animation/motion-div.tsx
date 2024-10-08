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
  viewRate?: number;
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
  style,
  viewRate = 0.1
}: Props) => {
  const [ref, inView] = useInView(viewRate);
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
