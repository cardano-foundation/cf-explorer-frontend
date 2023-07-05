import { Box, styled } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { CONTRACT_ADDRESS_TYPE, VerifyScriptContext } from "src/pages/ContractDetail";

const Result = styled(Box)`
  padding: 9px 25px;
  background: rgba(152, 162, 179, 0.1);
  border-radius: 10px;
  text-align: left;
  color: ${(props) => props.theme.palette.grey[700]};
  line-height: 19px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
  over-flow: scroll;
`;

const StyledBox = styled(Box)`
  text-align: left;
  margin-top: 20px;
`;

const ScriptType = styled(Box)`
  margin: 12px 0px;
  color: ${(props) => props.theme.palette.grey[700]};
  span {
    color: ${({ theme }) => theme.palette.blue[800]};
  }
`;

const ScriptTab = () => {
  const { address } = useParams<{ address: string }>();
  const { data, refresh } = useFetch(API.CONTRACTS.SCRIPT(address));
  const { dispatch }: any = useContext(VerifyScriptContext);

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
      <Box color={({ palette }) => palette.grey[700]}>Contract</Box>
      {data ? (
        <ScriptType>
          Script Type: <span>Native Script</span>
        </ScriptType>
      ) : null}
      <Result>{data ? <pre>{JSON.stringify(data, null, " ")}</pre> : "No script found"}</Result>
    </StyledBox>
  );
};

export default ScriptTab;
