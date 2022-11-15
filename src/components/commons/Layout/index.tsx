import React from 'react';
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode
}

const CustomLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  )

}

export default CustomLayout;