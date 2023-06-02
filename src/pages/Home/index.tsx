import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/material";
import { useAsync, useLocalStorage } from "react-use";

import LatestStories from "src/components/Home/LatestStories";
import LatestTransactions from "src/components/Home/LatestTransactions";
import HomeStatistic from "src/components/Home/Statistic";
import TopDelegationPools from "src/components/Home/TopDelegationPools";
import HomeTrending from "src/components/Home/Trending";
import { getAllBookmarks } from "src/commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import SyncBookmarkModal from "src/components/commons/Layout/Header/SyncBookmarkModal";
import useAuth from "src/commons/hooks/useAuth";

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
