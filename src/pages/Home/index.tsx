import React from 'react';
import HomeStatistic from '../../components/Home/Statistic';
import HomeTrending from '../../components/Home/Trending';
import styles from './index.module.scss';

interface Props { }

const Home: React.FC<Props> = () => {

  return (
    <div className={styles.container}>
      <HomeStatistic />
      <HomeTrending />
    </div>
  )

}

export default Home;