import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "react-use";
import useFetch from "../../commons/hooks/useFetch";
import { API, USER_API } from "../../commons/utils/api";
import { MAX_SLOT_EPOCH } from "../../commons/utils/constants";
import { setCurrentEpoch, setUsdMarket } from "../../stores/system";
import { RootState } from "../../stores/types";

export const SystemLoader = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const isLogin = !!userData?.username;
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const { data: currentEpoch } = useFetch<EpochCurrentType>(`${API.EPOCH.CURRENT_EPOCH}`);
  const { data: usdMarket, refesh } = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=usd`);
  const { data: dataBookmark } = useFetch<string[]>(isLogin ? USER_API.BOOKMARK : "", undefined, true);

  useEffect(() => {
    const interval = setInterval(() => refesh(), 5000);
    return () => clearInterval(interval);
  }, [refesh]);

  useEffect(() => {
    if (currentEpoch) {
      let { no, slot, totalSlot } = currentEpoch;
      const interval = setInterval(() => {
        const isIncreaseEpoch = slot === (totalSlot || MAX_SLOT_EPOCH);
        slot = isIncreaseEpoch ? 0 : slot + 1;
        no = isIncreaseEpoch ? no + 1 : no;
        setCurrentEpoch({ slot, no, totalSlot });
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
