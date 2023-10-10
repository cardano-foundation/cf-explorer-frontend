import { Box, styled } from "@mui/material";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { CONTRACT_ADDRESS_TYPE, VerifyScriptContext } from "src/pages/ContractDetail";

const Result = styled(Box)`
  padding: 9px 25px;
  background: ${(props) => props.theme.palette.secondary[0]};
  border-radius: 10px;
  text-align: left;
  color: ${(props) => props.theme.palette.secondary.light};
  line-height: 19px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
  box-shadow: ${(props) => props.theme.shadow.card};
`;

const StyledBox = styled(Box)`
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ScriptType = styled(Box)`
  margin: 12px 0px;
  color: ${(props) => props.theme.palette.secondary.main};
  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const ScriptTab = () => {
  const { t } = useTranslation();
  const { address } = useParams<{ address: string }>();
  const { data, refresh } = useFetch<IScript>(API.CONTRACTS.SCRIPT(address));
  const { dispatch } = useContext(VerifyScriptContext);
  useEffect(() => {
    if (refresh && dispatch) {
      dispatch({
        type: CONTRACT_ADDRESS_TYPE.SET_REFRESH_SCRIPT_TAB,
        payload: refresh
      });
    }
  }, [refresh, dispatch]);

  return (
    <StyledBox>
      <Box color={({ palette }) => palette.secondary.main}>{t("glossary.contract")}</Box>
      {data?.isVerified ? (
        <ScriptType>
          {t("common.scriptType")}: <span>{t("common.nativeScript")}</span>
        </ScriptType>
      ) : null}
      <Result>
        {data?.isVerified ? (
          <pre>{JSON.stringify(JSON.parse(data?.data), null, " ")}</pre>
        ) : (
          t("drawer.scriptNotVerified")
        )}
      </Result>
    </StyledBox>
  );
};

export default ScriptTab;
