import { Container, styled } from "@mui/material";
import React from "react";
import LatestStories from "../../components/Home/LatestStories";
import LatestTransactions from "../../components/Home/LatestTransactions";
import HomeStatistic from "../../components/Home/Statistic";
import TopDelegationPools from "../../components/Home/TopDelegationPools";
import HomeTrending from "../../components/Home/Trending";

const HomeContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <HomeContainer>
      <HomeStatistic />
      <HomeTrending />
      <LatestTransactions />
      <TopDelegationPools />
      <LatestStories />
    </HomeContainer>
  );
};

export default Home;
