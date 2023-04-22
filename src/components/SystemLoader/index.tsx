import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "react-use";
import useFetch from "../../commons/hooks/useFetch";
import { API, USER_API } from "../../commons/utils/api";
import { MAX_SLOT_EPOCH, NETWORK, NETWORK_TYPES, REFRESH_TIMES } from "../../commons/utils/constants";
import { getInfo } from "../../commons/utils/userRequest";
import { setCurrentEpoch, setUsdMarket } from "../../stores/system";
import { RootState } from "../../stores/types";
import { setUserData } from "../../stores/user";

export const SystemLoader = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const isLogin = !!userData?.username;
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const { data: currentEpoch } = useFetch<EpochCurrentType>(
    `${API.EPOCH.CURRENT_EPOCH}`,
    undefined,
    false,
    REFRESH_TIMES.CURRENT_EPOCH
  );
  const { data: usdMarket } = useFetch<CardanoMarket[]>(
    `${API.MARKETS}?currency=usd`,
    undefined,
    false,
    REFRESH_TIMES.CURRENT_PRICE_USD
  );

  const { data: dataBookmark } = useFetch<string[]>(isLogin ? USER_API.BOOKMARK : "", undefined, true);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (currentEpoch) {
      startTime.current = Date.now();
      const { no, slot, totalSlot, account } = currentEpoch;
      const interval = setInterval(() => {
        const newSlot = slot + Math.floor((Date.now() - startTime.current) / 1000);
        const newNo = newSlot >= MAX_SLOT_EPOCH ? no + 1 : no;
        setCurrentEpoch({ slot: newSlot % MAX_SLOT_EPOCH, no: newNo, totalSlot, account });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentEpoch]);

  useEffect(() => {
    if (usdMarket?.[0]) setUsdMarket(usdMarket[0]);
  }, [usdMarket]);

  useEffect(() => {
    if (dataBookmark) setBookmark(dataBookmark);
  }, [dataBookmark, setBookmark]);

  useEffect(() => {
    if (currentEpoch) setCurrentEpoch(currentEpoch);
  }, [currentEpoch]);

  return null;
};
