"use client";

/**
 * AvatarGroup — animate-ui
 * Source: https://animate-ui.com/docs/components/animate/avatar-group
 *
 * Staggered entrance: each avatar slides in from the left with a spring,
 * overlapping its neighbour, matching the animate-ui spec exactly.
 */

import * as React from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/* ── animation variants ─────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12, scale: 0.82 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

/* ── context ─────────────────────────────────────────────────────────── */
interface AvatarGroupContextValue {
  size: number;
  overlap: number;
}
const AvatarGroupContext = React.createContext<AvatarGroupContextValue>({
  size: 36,
  overlap: 10,
});

/* ── AvatarGroup ─────────────────────────────────────────────────────── */
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  overlap?: number;
}

function AvatarGroup({
  className,
  children,
  size = 36,
  overlap = 10,
  ...props
}: AvatarGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <AvatarGroupContext.Provider value={{ size, overlap }}>
      <motion.div
        ref={ref}
        className={cn("flex items-center", className)}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{ marginLeft: i === 0 ? 0 : -overlap, zIndex: i }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </AvatarGroupContext.Provider>
  );
}

/* ── AvatarGroupItem ─────────────────────────────────────────────────── */
interface AvatarGroupItemProps {
  src?: string;
  alt?: string;
  fallback?: string;
  gradient?: string;
  className?: string;
}

function AvatarGroupItem({
  src,
  alt = "",
  fallback,
  gradient,
  className,
}: AvatarGroupItemProps) {
  const { size } = React.useContext(AvatarGroupContext);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full border-[2.5px] border-white",
        !src && "bg-gradient-to-br from-[var(--blue-xl)] to-[var(--blue-l)]",
        className
      )}
      style={{
        width: size,
        height: size,
        background: !src ? gradient : undefined,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : fallback ? (
        <span
          className="select-none text-[var(--blue)] font-medium"
          style={{ fontSize: Math.round(size * 0.36) }}
        >
          {fallback}
        </span>
      ) : null}
    </div>
  );
}

export { AvatarGroup, AvatarGroupItem };
