import { useState, useEffect } from "react";
import axios from "axios";

import { API } from "../utils/api";
import { API_ADA_HANDLE_API } from "../utils/constants";

const useADAHandle = (name: string) => {
  const [data, setData] = useState<{ stakeAddress: string; paymentAddress: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mution = async () => {
    setLoading(true);
    await axios
      .get(API_ADA_HANDLE_API + API.ADAHandle(name))
      .then((data) => setData(data.data))
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
        setInitialized(true);
      });
  };
  useEffect(() => {
    mution();
  }, [name]);
  return [{ data, loading, error, initialized }];
};

export default useADAHandle;
