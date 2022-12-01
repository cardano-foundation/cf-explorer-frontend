import React, { ReactNode } from "react";

import styles from "./index.module.scss";

interface CardProps {
  title?: React.ReactNode | string;
  children?: ReactNode;
  className?: string;
  extra?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = "", extra }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.groupTitle}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {extra && <div>{extra}</div>}
      </div>
      {children}
    </div>
  );
};

export default Card;
