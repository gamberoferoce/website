"use client";

import { useEffect, useState } from "react";
import styles from "./ComingSoonMarquee.module.css";

const LABEL = "Coming soon";
const SEGMENT_WIDTH_ESTIMATE = 300;

function MarqueeTrack({
  direction = "forwards",
  speed = "20s",
  itemCount,
}: {
  direction?: "forwards" | "reverse";
  speed?: string;
  itemCount: number;
}) {
  const items = Array.from({ length: itemCount }, (_, index) => index);

  return (
    <div
      className={styles.track}
      style={
        {
          "--direction": direction,
          "--speed": speed,
        } as React.CSSProperties
      }
    >
      <div className={styles.trackGroup}>
        {items.map((index) => (
          <span key={`a-${index}`}>{LABEL}</span>
        ))}
      </div>
      <div aria-hidden className={styles.trackGroup}>
        {items.map((index) => (
          <span key={`b-${index}`}>{LABEL}</span>
        ))}
      </div>
    </div>
  );
}

export function ComingSoonMarquee() {
  const [itemCount, setItemCount] = useState(10);

  useEffect(() => {
    function updateItemCount() {
      const needed = Math.ceil(window.innerWidth / SEGMENT_WIDTH_ESTIMATE) + 6;
      setItemCount(Math.max(needed, 8));
    }

    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  return (
    <div aria-hidden className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={`${styles.marquee} ${styles.rotateLeft} ${styles.tapeLime}`}>
          <MarqueeTrack itemCount={itemCount} />
        </div>
        <div className={`${styles.marquee} ${styles.rotateRight} ${styles.tapeNeutral}`}>
          <MarqueeTrack direction="reverse" speed="40s" itemCount={itemCount} />
        </div>
      </div>
    </div>
  );
}
