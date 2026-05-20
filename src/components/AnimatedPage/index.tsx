import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type AnimatedPageProps = {
  children: ReactNode;
};

const transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const location = useLocation();
  const isBack = (location.state as { direction?: string } | null)?.direction === "back";
  const offset = isBack ? -28 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -offset }}
      transition={transition}
      style={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "inherit",
        overflowX: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
