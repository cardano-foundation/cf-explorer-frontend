import React, { createContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import AddressOverview from "src/components/ContractDetail/AddressOverview";
import ContractDetailContent from "src/components/ContractDetail/ContractDetailContent";

import { BackButton, BackText, StyledContainer, WrapHeader } from "./styles";

export const VerifyScriptContext = createContext({
  refreshScriptTab: () => null,
  refreshOverviewAddress: () => null
});

interface IAction {
  type: string;
  payload: any;
}

export enum CONTRACT_ADDRESS_TYPE {
  SET_REFRESH_SCRIPT_TAB = "SET_REFRESH_SCRIPT_TAB"
}

const reducer = (state: any, action: IAction) => {
  if (action.type === CONTRACT_ADDRESS_TYPE.SET_REFRESH_SCRIPT_TAB) {
    return {
      refreshScriptTab: action.payload,
      ...state
    };
  }

  return state;
};

const ContractDetail: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { address } = useParams<{ address: string }>();
  const history = useHistory();
  const { data, loading, initialized, error, refresh } = useFetch<WalletAddress>(`${API.ADDRESS.DETAIL}/${address}`);
  const [stateContext, dispatch] = React.useReducer(reducer, {});

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Contract ${address} | Cardano Blockchain Explorer`;
  }, [address]);

  if (!initialized) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <VerifyScriptContext.Provider
      value={{
        refreshOverviewAddress: refresh,
        ...stateContext,
        dispatch
      }}
    >
      <StyledContainer>
        <WrapHeader textAlign={"left"}>
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft color={theme.palette.secondary.main} fontSize="16px" />
            <BackText>{t("common.back")}</BackText>
          </BackButton>
        </WrapHeader>
        <Box pt={1} pb={3}>
          <AddressOverview data={data} loading={loading} />
        </Box>
        <ContractDetailContent />
      </StyledContainer>
    </VerifyScriptContext.Provider>
  );
};

export default ContractDetail;
