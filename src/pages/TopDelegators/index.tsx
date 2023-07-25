import { useEffect } from "react";
import { Card } from "@mui/material";

import TopAddressesByAmountStaked from "src/components/TopAddresses/ByAmountStaked";

import { StyledContainer } from "./styles";

const TopDelegators = () => {
  useEffect(() => {
    document.title = `Top Delegators | Iris - Cardano Blockchain Explorer`;
  }, []);

  return (
    <StyledContainer>
      <Card title="Top delegators">
        <TopAddressesByAmountStaked />
      </Card>
    </StyledContainer>
  );
};
export default TopDelegators;
