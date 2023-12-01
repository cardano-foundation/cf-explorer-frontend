import { useState, useEffect } from "react";
import axios from "axios";

import { API } from "../utils/api";

const useADAHandle = (name: string) => {
  const [data, setData] = useState<{ stakeAddress: string; paymentAddress: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mution = async () => {
    setLoading(true);
    await axios
      .get(API.ADAHandle(name))
      .then((data) => setData(data.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    mution();
  }, [name]);
  return [{ data, loading, error }];
};

export default useADAHandle;
