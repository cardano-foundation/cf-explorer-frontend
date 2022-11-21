import React from "react";
import LatestStories from "../../components/Home/LatestStories";
import LatestTransactions from "../../components/Home/LatestTransactions";
import HomeStatistic from "../../components/Home/Statistic";
import TopDelegationPools from "../../components/Home/TopDelegationPools";
import HomeTrending from "../../components/Home/Trending";
import styles from "./index.module.scss";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <HomeStatistic />
      <HomeTrending />
      <LatestTransactions />
      <TopDelegationPools />
      <LatestStories />
    </div>
  );
};

export default Home;
