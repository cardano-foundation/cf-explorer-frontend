import React, { ReactNode } from "react";

import styles from "./index.module.scss";

interface CardProps {
  title?: string;
  titleItem?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, titleItem, children, className = "" }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {titleItem}
      </div>
      {children}
    </div>
  );
};

export default Card;
