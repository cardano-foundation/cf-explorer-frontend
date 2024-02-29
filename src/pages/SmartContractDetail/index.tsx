import React, { useState } from "react";

import { DetailContainer } from "./styles";
import ContractHeader from "./ContractHeader";
import ContractTabs from "./ContractTabs";

const SmartContractDetail = () => {
  const [version, setVersion] = useState<string | undefined>();

  return (
    <DetailContainer>
      <ContractHeader version={version} />
      <ContractTabs setVersion={setVersion} />
    </DetailContainer>
  );
};

export default SmartContractDetail;
