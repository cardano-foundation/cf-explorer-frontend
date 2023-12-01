import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import StakeKeyOverview from "src/components/StakeDetail/StakeOverview";
import StakeTab from "src/components/StakeDetail/StakeTab";
import StakeAnalytics from "src/components/StakeDetail/StakeAnalytics";
import { setSpecialPath } from "src/stores/system";
import { routers } from "src/commons/routers";
import useADAHandle from "src/commons/hooks/useADAHandle";
import { Spin } from "src/components/commons/Layout/Header/LoginButton/styles";

import { StyledContainer } from "./styles";

const StakeDetail: React.FC = () => {
  const mainRef = useRef(document.querySelector("#main"));
  const [stakeAddress, setStakeAddress] = useState("");
  const { stakeId } = useParams<{ stakeId: string }>();
  const { state } = useLocation<{ fromPath?: SpecialPath }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const status = useFetch<ListStakeKeyResponse>(API.STAKE_LIFECYCLE.TABS(stakeId), undefined, false, blockKey);
  const [{ data: adaHandle, loading: adaHandleLoading }] = useADAHandle(stakeId);

  const { data, loading, initialized, error, lastUpdated } = useFetch<IStakeKeyDetail>(
    stakeAddress ? `${API.STAKE.DETAIL}/${stakeAddress}` : "",
    undefined,
    false,
    blockKey
  );

  useEffect(() => {
    document.title = `Stake address ${stakeId} | Cardano Blockchain Explorer`;
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stakeId]);
  useEffect(() => {
    if (adaHandle?.stakeAddress) {
      setStakeAddress(adaHandle?.stakeAddress);
    } else {
      setStakeAddress(stakeId);
    }
  }, [JSON.stringify(adaHandle)]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);

    if (status.data?.hasDeRegistration) return setSpecialPath(routers.STAKE_ADDRESS_DEREGISTRATION);
    if (status.data?.hasDelegation) return setSpecialPath(routers.STAKE_ADDRESS_DELEGATIONS);
    if (status.data?.hasRegistration) return setSpecialPath(routers.STAKE_ADDRESS_REGISTRATION);
  }, [state, status]);
  if (adaHandleLoading) {
    return (
      <Box>
        <Spin color="success" />
      </Box>
    );
  }

  if ((initialized && !data && !adaHandle && !adaHandleLoading) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <StakeKeyOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <StakeAnalytics />
      <StakeTab />
    </StyledContainer>
  );
};

export default StakeDetail;
