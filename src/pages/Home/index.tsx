import { Container, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import LatestStories from "../../components/Home/LatestStories";
import LatestTransactions from "../../components/Home/LatestTransactions";
import HomeStatistic from "../../components/Home/Statistic";
import TopDelegationPools from "../../components/Home/TopDelegationPools";
import HomeTrending from "../../components/Home/Trending";
import { useAsync, useLocalStorage } from "react-use";
import { getAllBookmarks } from "~/commons/utils/userRequest";
import { async } from "q";
import { NETWORK, NETWORK_TYPES } from "~/commons/utils/constants";
import SyncBookmarkModal from "~/components/commons/Layout/Header/SyncBookmarkModal";
import useAuth from "~/commons/hooks/useAuth";

const HomeContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;

const Home = () => {
  const [, setBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);
  const [openSyncBookmark, setOpenSyncBookmark] = useState(false);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    document.title = `Cardano Explorer`;
  }, []);

  useAsync(async () => {
    if (isLoggedIn) {
      if (
        (((JSON.parse(localStorage.getItem("bookmark") || "") as Bookmark[]) || [])?.filter((r) => !r.id) || [])
          .length > 0
      ) {
        setOpenSyncBookmark(true);
      } else {
        const { data } = await getAllBookmarks(NETWORK_TYPES[NETWORK]);
        if (data) {
          setBookmark(data);
        }
      }
    }
  }, []);
  return (
    <HomeContainer>
      <HomeStatistic />
      <HomeTrending />
      <LatestTransactions />
      <TopDelegationPools />
      <LatestStories />
      <SyncBookmarkModal
        open={openSyncBookmark}
        handleCloseModal={() => {
          setOpenSyncBookmark(false);
        }}
      />
    </HomeContainer>
  );
};

export default Home;
