import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

const StyleScript = styled("pre")``;

const Result = styled(Box)`
  padding: 9px 25px;
  background: rgba(152, 162, 179, 0.1);
  border-radius: 10px;
  text-align: left;
  color: #344054;
  line-height: 19px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
  over-flow: scroll;
`;

const Wapper = styled(Box)`
  text-align: left;
  margin-top: 20px;
`;

const ScriptType = styled(Box)`
  margin: 12px 0px;
  span {
    color: #108aef;
  }
`;

const ScriptTab = () => {
  const { address } = useParams<{ address: string }>();
  const { data } = useFetch(API.CONTRACTS.SCRIPT(address));

  return (
    <Wapper>
      <Box>Contract</Box>
      {data ? (
        <ScriptType>
          Script Type: <span>Native Script</span>
        </ScriptType>
      ) : null}
      <Result>{data ? <StyleScript>{JSON.stringify(data, null, " ")}</StyleScript> : "No script found"}</Result>
    </Wapper>
  );
};

export default ScriptTab;
