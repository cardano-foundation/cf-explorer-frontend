import React, { ReactNode } from "react";

import styles from "./index.module.scss";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};

export default Card;
