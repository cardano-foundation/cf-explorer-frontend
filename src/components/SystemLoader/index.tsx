import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import useAuth from "src/commons/hooks/useAuth";
import useFetch from "src/commons/hooks/useFetch";
import { API, USER_API } from "src/commons/utils/api";
import { EVENT_TYPES, MAX_SLOT_EPOCH, NETWORK, NETWORK_TYPES, WS_URL } from "src/commons/utils/constants";
import { setBlockNo, setBtcMarket, setCurrentEpoch as setStoreCurrentEpoch, setUsdMarket } from "src/stores/system";

export const SystemLoader = () => {
  const { isLoggedIn } = useAuth();
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [currentEpoch, setCurrentEpoch] = useState<EpochCurrentType | null>(null);
  const { data: epochSummary, refresh: refreshEpoch } = useFetch<EpochCurrentType>(`${API.EPOCH.CURRENT_EPOCH}`);
  const { data: usdMarket, refresh: refreshUSD } = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=usd`);
  const { data: btcMarket, refresh: refreshBTC } = useFetch<CardanoMarket[]>(`${API.MARKETS}?currency=btc`);
  const socket = useRef<WebSocket | null>(null);

  const { data: dataBookmark } = useFetch<string[]>(
    isLoggedIn ? `${USER_API.BOOKMARK}?network=${NETWORK_TYPES[NETWORK]}` : "",
    undefined,
    true
  );
  const currentTime = useRef(Date.now());

  useEffect(() => {
    if (currentEpoch) {
      currentTime.current = Date.now();
      const { no, slot, totalSlot = MAX_SLOT_EPOCH, account, startTime, endTime, circulatingSupply } = currentEpoch;
      const interval = setInterval(() => {
        const newSlot = slot + Math.floor((Date.now() - currentTime.current) / 1000);
        const isCrawlerStop = newSlot - MAX_SLOT_EPOCH > 1000;
        const newNo = newSlot >= MAX_SLOT_EPOCH && !isCrawlerStop ? no + 1 : no;
        setStoreCurrentEpoch({
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
    if (btcMarket?.[0]) setBtcMarket(btcMarket[0]);
  }, [btcMarket]);

  useEffect(() => {
    if (dataBookmark) setBookmark(dataBookmark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataBookmark)]);

  useEffect(() => {
    if (currentEpoch) setStoreCurrentEpoch(currentEpoch);
  }, [currentEpoch]);

  useEffect(() => {
    if (epochSummary) setCurrentEpoch(epochSummary);
  }, [epochSummary, setCurrentEpoch]);

  useEffect(() => {
    const connect = () => {
      if (!WS_URL) return;
      socket.current = new WebSocket(WS_URL);

      socket.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as EventData;
          switch (data.eventType) {
            case EVENT_TYPES.BLOCK:
              setBlockNo(data.payload.blockNo);
              setCurrentEpoch(data.payload.epochSummary);
              break;
            case EVENT_TYPES.CURRENT_PRICE_USD:
              if (data.payload[0]) setUsdMarket(data.payload[0]);
              break;
            case EVENT_TYPES.CURRENT_PRICE_BTC:
              if (data.payload[0]) setBtcMarket(data.payload[0]);
              break;
            default:
              break;
          }
        } catch (error) {
          return error;
        }
      };
      socket.current.onclose = (e) => {
        setTimeout(() => {
          if (socket.current?.readyState === 3) {
            // eslint-disable-next-line no-console
            console.error("socket close reason: ", e.reason);
            connect();
            refreshEpoch();
            refreshUSD();
            refreshBTC();
          }
        }, 1000);
      };

      // eslint-disable-next-line no-console
      socket.current.onerror = (e) => console.error("socket error: ", e);
    };

    connect();

    return () => {
      socket.current?.close();
    };
  }, []);

  return null;
};
