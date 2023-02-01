import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CustomLayout from "./components/commons/Layout";
import { RootState } from "./stores/types";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./themes";
import { setOnDetailView } from "./stores/user";
import { setUsdMarket, setCurrentEpoch } from "./stores/system";
import useFetch from "./commons/hooks/useFetch";
import { API, EXTEN_API } from "./commons/utils/api";
import { useLocalStorage } from "react-use";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const { userData, theme } = useSelector(({ user }: RootState) => user);
  const isLogin = !!userData?.username;
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const history = useHistory();
  const lastPath = useRef(history.location.pathname);
  const { children } = props;
  const currentEpoch = useFetch<EpochCurrentType>(API.EPOCH.CURRENT_EPOCH);
  const usdMarket = useFetch<CardanoMarket[]>(`${EXTEN_API.COINGECKO.PRICE}?vs_currency=usd&ids=cardano`);
  const { data: dataBookmark } = useFetch<string[]>(isLogin ? `/bookmark/find-all-key` : "", undefined, true);

  useEffect(() => {
    if (usdMarket.data?.[0]) setUsdMarket(usdMarket.data[0]);
  }, [usdMarket.data]);

  useEffect(() => {
    if (dataBookmark) setBookmark(dataBookmark);
  }, [dataBookmark]);

  useEffect(() => {
    if (currentEpoch.data) setCurrentEpoch(currentEpoch.data);
  }, [currentEpoch.data]);

  useEffect(() => {
    setOnDetailView(false);
  }, []);

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      if (lastPath.current !== history.location.pathname) {
        setOnDetailView(false);
        lastPath.current = history.location.pathname;
      }
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <div data-theme={theme}>
        <CustomLayout>{children}</CustomLayout>
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
