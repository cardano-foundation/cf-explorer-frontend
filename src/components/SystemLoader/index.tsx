import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";

import useAuth from "src/commons/hooks/useAuth";

import useFetch from "../../commons/hooks/useFetch";
import { API, USER_API } from "../../commons/utils/api";
import { MAX_SLOT_EPOCH, NETWORK, NETWORK_TYPES, REFRESH_TIMES } from "../../commons/utils/constants";
import { setCurrentEpoch, setUsdMarket } from "../../stores/system";

export const SystemLoader = () => {
  const { isLoggedIn } = useAuth();
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

  const { data: dataBookmark } = useFetch<string[]>(
    isLoggedIn ? `${USER_API.BOOKMARK}?network=${NETWORK_TYPES[NETWORK]}` : "",
    undefined,
    true,
    REFRESH_TIMES.EPOCH_DETAIL_VIEW
  );
  const currentTime = useRef(Date.now());

  useEffect(() => {
    if (currentEpoch) {
      currentTime.current = Date.now();
      const { no, slot, totalSlot, account, startTime, endTime, circulatingSupply } = currentEpoch;
      const interval = setInterval(() => {
        const newSlot = slot + Math.floor((Date.now() - currentTime.current) / 1000);
        const isCrawlerStop = newSlot - MAX_SLOT_EPOCH > REFRESH_TIMES.CURRENT_EPOCH;
        const newNo = newSlot >= MAX_SLOT_EPOCH && !isCrawlerStop ? no + 1 : no;
        setCurrentEpoch({
          slot: newSlot % MAX_SLOT_EPOCH,
          no: newNo,
          totalSlot,
          account,
          startTime,
          endTime,
          circulatingSupply
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentEpoch]);

  useEffect(() => {
    if (usdMarket?.[0]) setUsdMarket(usdMarket[0]);
  }, [usdMarket]);

  useEffect(() => {
    if (dataBookmark) setBookmark(dataBookmark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataBookmark)]);

  useEffect(() => {
    if (currentEpoch) setCurrentEpoch(currentEpoch);
  }, [currentEpoch]);

  return null;
};
