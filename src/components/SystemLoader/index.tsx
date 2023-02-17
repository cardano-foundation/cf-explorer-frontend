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
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const isLogin = !!userData?.username;
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const epochResponse = useFetch<EpochCurrentType>(`${API.EPOCH.CURRENT_EPOCH}`);
  const usdMarket = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=usd`);
  const { data: dataBookmark } = useFetch<string[]>(isLogin ? USER_API.BOOKMARK : "", undefined, true);

  useEffect(() => {
    const interval = setInterval(() => {
      epochResponse.refesh();
      usdMarket.refesh();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
