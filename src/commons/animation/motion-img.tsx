import { LegacyRef } from "react";
import { Easing, motion, Target } from "framer-motion";

import useInView from "../hooks/useInView";

interface Props {
  className?: string;
  enabled?: boolean;
  initial: Target;
  animate: Target;
  duration?: number;
  ease?: Easing | Easing[];
  once?: boolean;
  delay?: number;
  src: string;
}

export const MotionImg = ({
  initial,
  animate,
  className,
  enabled = true,
  duration = 1,
  ease,
  once = true,
  delay = 0,
  src
}: Props) => {
  const [ref, inView] = useInView(0.5);

  return (
    <motion.img
      ref={ref as LegacyRef<HTMLImageElement> | undefined}
      whileInView={enabled ? (inView ? animate : {}) : undefined}
      transition={{ duration, ease, delay }}
      initial={enabled ? initial : undefined}
      className={className}
      viewport={{
        once
      }}
      src={src}
    />
  );
};
