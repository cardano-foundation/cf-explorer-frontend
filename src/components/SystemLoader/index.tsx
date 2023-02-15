import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "react-use";
import useFetch from "../../commons/hooks/useFetch";
import { API, USER_API } from "../../commons/utils/api";
import { MAX_SLOT_EPOCH } from "../../commons/utils/constants";
import { setCurrentEpoch, setUsdMarket } from "../../stores/system";
import { RootState } from "../../stores/types";

export const SystemLoader = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const isLogin = !!userData?.username;
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [timestamp, setTimestamp] = useState(0);
  const epochResponse = useFetch<EpochCurrentType>(`${API.EPOCH.CURRENT_EPOCH}?timestamp=${timestamp}`);
  const usdMarket = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=usd&timestamp=${timestamp}`);
  const { data: dataBookmark } = useFetch<string[]>(isLogin ? USER_API.BOOKMARK : "", undefined, true);

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(Date.now()), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentEpoch) {
      const interval = setInterval(() => {
        const { no, slot, totalSlot } = currentEpoch;
        setCurrentEpoch({
          slot: (slot + 1) % (totalSlot || MAX_SLOT_EPOCH),
          no: slot + 1 > (totalSlot || MAX_SLOT_EPOCH) ? no + 1 : no,
          totalSlot,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentEpoch]);

  useEffect(() => {
    if (usdMarket.data?.[0]) setUsdMarket(usdMarket.data[0]);
  }, [usdMarket.data]);

  useEffect(() => {
    if (dataBookmark) setBookmark(dataBookmark);
  }, [dataBookmark, setBookmark]);

  useEffect(() => {
    if (epochResponse.data) setCurrentEpoch(epochResponse.data);
  }, [epochResponse.data]);

  return null;
};
