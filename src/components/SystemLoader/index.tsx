import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import useAuth from "src/commons/hooks/useAuth";
import useFetch from "src/commons/hooks/useFetch";
import { API, USER_API } from "src/commons/utils/api";
import {
  API_GECKO,
  BOLNISI_NAME_API,
  EVENT_TYPES,
  MAX_SLOT_EPOCH,
  NETWORK,
  NETWORK_TYPES,
  WS_URL
} from "src/commons/utils/constants";
import {
  setBlockKey,
  setBlockNo,
  setCurrentEpoch as setStoreCurrentEpoch,
  setWineryName,
  setWineryNameLoading
} from "src/stores/system";

export const SystemLoader = () => {
  const { isLoggedIn } = useAuth();
  const [, setBookmark] = useLocalStorage<string[]>("bookmark", []);
  const [currentEpoch, setCurrentEpoch] = useState<EpochCurrentType | null>(null);
  const { data: epochSummary } = useFetch<EpochCurrentType>(`${API.EPOCH.CURRENT_EPOCH}`);
  const socket = useRef<WebSocket | null>(null);
  const [, setBtcDataLocal] = useLocalStorage<dataFromCoinGecko[number] | null>("btcData", null);
  const [, setUsdDataLocal] = useLocalStorage<dataFromCoinGecko[number] | null>("usdData", null);

  const { data: dataBookmark } = useFetch<string[]>(
    isLoggedIn ? `${USER_API.BOOKMARK}?network=${NETWORK_TYPES[NETWORK]}` : "",
    undefined,
    true
  );

  const { data: btcData } = useFetch<dataFromCoinGecko>(`${API_GECKO}?ids=cardano&vs_currency=btc`);
  const { data: usdData } = useFetch<dataFromCoinGecko>(`${API_GECKO}?ids=cardano&vs_currency=usd`);

  useEffect(() => {
    if (btcData && btcData?.length > 0) {
      setBtcDataLocal(btcData?.[0] || null);
    }
  }, [btcData]);

  useEffect(() => {
    if (usdData && usdData?.length > 0) {
      setUsdDataLocal(usdData?.[0]);
    }
  }, [usdData]);

  const fetchWineName = () => {
    if (BOLNISI_NAME_API) {
      setWineryNameLoading(true);
      axios
        .get(BOLNISI_NAME_API)
        .then((response) => response.data)
        .then((data) => setWineryName(data))
        .finally(() => setWineryNameLoading(false));
    }
  };

  const currentTime = useRef(Date.now());

  useEffect(() => {
    fetchWineName();
  }, []);

  useEffect(() => {
    if (currentEpoch) {
      currentTime.current = Date.now();
      const {
        no,
        slot,
        totalSlot = MAX_SLOT_EPOCH,
        account,
        startTime,
        endTime,
        circulatingSupply,
        blkCount
      } = currentEpoch;
      const TIME_OUT_CRAWLER_STOP = 100;
      const interval = setInterval(() => {
        const newSlot = slot + Math.floor((Date.now() - currentTime.current) / 1000);
        const isCrawlerStop = newSlot - totalSlot > TIME_OUT_CRAWLER_STOP;
        const newNo = newSlot >= totalSlot && !isCrawlerStop ? no + 1 : no;
        setStoreCurrentEpoch({
          slot: newSlot % totalSlot,
          no: newNo,
          totalSlot,
          account,
          startTime,
          endTime,
          circulatingSupply,
          blkCount
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentEpoch]);

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
              if (data.payload.hasTx) setBlockKey(data.payload.blockHash);
              setCurrentEpoch(data.payload.epochSummary);
              break;
            default:
              break;
          }
        } catch (error) {
          return error;
        }
      };
      socket.current.onclose = (e) => {
        // eslint-disable-next-line no-console
        console.error("socket close reason: ", e, JSON.stringify(e));
        setTimeout(() => {
          if (socket.current?.readyState === socket.current?.CLOSED) {
            connect();
          }
        }, 1000);
      };

      // eslint-disable-next-line no-console
      socket.current.onerror = (e) => console.error("socket error: ", e);
    };

    connect();

    return () => {
      if (socket.current?.readyState === socket.current?.OPEN) socket.current?.close();
    };
  }, []);

  return null;
};
