import { useEffect } from "react";
import { Button, Container, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import LatestStories from "src/components/Home/LatestStories";
import LatestTransactions from "src/components/Home/LatestTransactions";
import HomeStatistic from "src/components/Home/Statistic";
import TopDelegationPools from "src/components/Home/TopDelegationPools";
import HomeTrending from "src/components/Home/Trending";
import useToast from "src/commons/hooks/useToast";

const HomeContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;

const Home = () => {
  const { t } = useTranslation();
  const toast = useToast();
  useEffect(() => {
    document.title = t("head.page.dashboard");
  }, [t]);

  return (
    <HomeContainer data-testid="home-container">
      <Button
        onClick={() => {
          toast.success("hi");
        }}
      >
        click
      </Button>
      <HomeStatistic />
      <HomeTrending />
      <LatestTransactions />
      <TopDelegationPools />
      <LatestStories />
    </HomeContainer>
  );
};

export default Home;
