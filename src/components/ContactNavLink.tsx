"use client";

import Link from "next/link";
import styles from "./ContactNavLink.module.css";

type ContactNavLinkProps = {
  isActive: boolean;
};

export function ContactNavLink({ isActive }: ContactNavLinkProps) {
  return (
    <Link
      className={`${styles.contactLink} ${isActive ? styles.active : ""}`}
      href="/contact"
    >
      <span className={styles.inner}>
        <span className={styles.label}>Contact</span>
      </span>
    </Link>
  );
}
