import { Easing, motion, Target } from "framer-motion";

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
  return (
    <motion.img
      whileInView={enabled ? animate : undefined}
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
