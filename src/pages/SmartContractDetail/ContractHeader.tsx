import { Box } from "@mui/material";

import ButtonBack from "src/components/commons/ButtonBack";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import Card from "src/components/commons/Card";

import { DetailHeader, EllipsisContainer, SubHeaderLabel, SubHeaderValue } from "./styles";

const ContractHeader = () => {
  return (
    <DetailHeader>
      <ButtonBack sx={{ marginTop: "30px" }} />
      <Card title={"Smart Contract Details"} titleSx={{ marginTop: "18px" }} />
      <Box sx={{ width: "100%" }}>
        <Box display={"flex"}>
          <SubHeaderLabel minWidth={95}>Script Hash: &nbsp;</SubHeaderLabel>
          <EllipsisContainer>
            <DynamicEllipsisText value="af2e27f580f7f08e93190a81f72462f153026d06450924726645891b" isCopy isTooltip />
          </EllipsisContainer>
        </Box>
        <Box display={"flex"}>
          <SubHeaderLabel> Version: &nbsp;</SubHeaderLabel> <SubHeaderValue>Plutus v2</SubHeaderValue>
        </Box>
      </Box>
    </DetailHeader>
  );
};

export default ContractHeader;
