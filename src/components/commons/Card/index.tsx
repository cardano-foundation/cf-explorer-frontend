import React, { ReactNode } from "react";

import styles from "./index.module.scss";

interface CardProps {
  title?: React.ReactNode | string;
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
