import React, { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

export type TNativeScriptProviderProps = {
  children: ReactNode;
};
export const NativeScriptContext = createContext<
  INativeScriptDetail & { loading: boolean; initialized: boolean; refresh?: () => void }
>({
  loading: false,
  initialized: false
});

export const useNativeScriptDetail = () => {
  const data = useContext(NativeScriptContext);
  return data;
};

const NativeScriptProvider: React.FC<TNativeScriptProviderProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, refresh, initialized } = useFetch<INativeScriptDetail>(API.TOKEN.NATIVE_SCRIPT(id ? id : ""));

  return (
    <NativeScriptContext.Provider value={{ ...data, loading, refresh, initialized }}>
      {children}
    </NativeScriptContext.Provider>
  );
};

export default NativeScriptProvider;
