"use client";

/**
 * FeaturedPricingWrapper
 *
 * Wraps a featured pricing card with:
 *  - MUI Card: owns shadow + border + hover transition (sits OUTSIDE Shine's overflow:hidden)
 *  - MUI Chip: badge positioned at top edge, outside overflow clipping
 *  - Shine (animate-ui): shimmer effect contained inside the Card
 *
 * This pattern fixes two bugs caused by Shine's `overflow: hidden`:
 *  1. Badge clipped — badge is now on the MUI Card, not inside Shine
 *  2. Rectangular hover shadow — shadow is on MUI Card, which has overflow:visible
 */

import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";

interface FeaturedPricingWrapperProps {
  /** Badge label shown above the card. Defaults to "Most popular". */
  badge?: string;
  /** Position of the badge along the top edge. */
  badgeAlign?: "left" | "center";
  /** Shine overlay colour (hex). Defaults to OneNet blue. */
  shineColor?: string;
  children: React.ReactNode;
}

export function FeaturedPricingWrapper({
  badge = "Most popular",
  badgeAlign = "left",
  shineColor = "#4343F0",
  children,
}: FeaturedPricingWrapperProps) {
  const badgePosition =
    badgeAlign === "center"
      ? { left: "50%", transform: "translate(-50%, -50%)" }
      : { left: "24px", transform: "translateY(-50%)" };

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: "16px",
        border: "1px solid rgba(67, 67, 240, 0.25)",
        background: "linear-gradient(160deg, var(--blue-xl) 0%, #fff 60%)",
        boxShadow: "0 4px 6px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 6%)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 16px rgb(67 67 240 / 8%), 0 2px 6px rgb(0 0 0 / 4%)",
          transform: "translateY(-2px)",
        },
        height: "100%",
        overflow: "visible",
      }}
    >
      {/* Chip badge sits outside Shine — never clipped by overflow:hidden */}
      <Chip
        label={badge}
        size="small"
        sx={{
          position: "absolute",
          top: 0,
          ...badgePosition,
          zIndex: 2,
          bgcolor: "var(--blue)",
          color: "#fff",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderRadius: "99px",
          height: "24px",
          "& .MuiChip-label": { px: "12px" },
        }}
      />
      {/* Shine contained inside Card — overflow:hidden only clips the shimmer */}
      <Shine
        enableOnHover
        color={shineColor}
        opacity={0.12}
        style={{ borderRadius: "16px", height: "100%" }}
      >
        {children}
      </Shine>
    </Card>
  );
}
