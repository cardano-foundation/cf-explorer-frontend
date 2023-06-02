import React, { createContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import NoRecord from "../../components/commons/NoRecord";
import AddressOverview from "../../components/ContractDetail/AddressOverview";
import ContractDetailContent from "../../components/ContractDetail/ContractDetailContent";
import { BackButton, BackText, StyledContainer, WrapHeader } from "./styles";
import { HiArrowLongLeft } from "react-icons/hi2";

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
  const { address } = useParams<{ address: string }>();
  const history = useHistory();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error, refresh } = useFetch<WalletAddress>(
    state?.data ? "" : `${API.ADDRESS.DETAIL}/${address}`,
    state?.data
  );
  const [stateContext, dispatch] = React.useReducer(reducer, {});

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Contract ${address} | Cardano Explorer`;
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
            <HiArrowLongLeft fontSize='16px' />
            <BackText>Back</BackText>
          </BackButton>
        </WrapHeader>
        <AddressOverview data={data} loading={loading} />
        <ContractDetailContent />
      </StyledContainer>
    </VerifyScriptContext.Provider>
  );
};

export default ContractDetail;
