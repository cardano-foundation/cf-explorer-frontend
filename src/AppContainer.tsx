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
import { COINGECKO_URL } from "./commons/utils/constants";
interface Props {
  children: React.ReactNode;
}

const AppContainer: React.FC<Props> = props => {
  const history = useHistory();
  const lastPath = useRef(history.location.pathname);
  const { children } = props;
  const { theme } = useSelector(({ user }: RootState) => user);
  const currentEpoch = useFetch<EpochCurrentType>(`epoch/current`);
  const usdMarket = useFetch<CardanoMarket[]>(`${COINGECKO_URL}coins/markets?vs_currency=usd&ids=cardano`);

  useEffect(() => {
    if (usdMarket.data?.[0]) setUsdMarket(usdMarket.data[0]);
  }, [usdMarket.data]);

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
