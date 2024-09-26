import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
} from "framer-motion";

export default function Reveal({children}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      animControls.start("visible");
    }
  }, [isInView]);

  return ( 
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -55},
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={animControls}
        transition={{ duration: 0.75, delay: 0.45 }}
        ref={ref}
      >
        {children}
      </motion.div>
  );
}
