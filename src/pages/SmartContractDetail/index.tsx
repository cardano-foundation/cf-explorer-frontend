import React, { useEffect, useRef, useState } from "react";

import { DetailContainer } from "./styles";
import ContractHeader from "./ContractHeader";
import ContractTabs from "./ContractTabs";

const SmartContractDetail = () => {
  const [version, setVersion] = useState<string | undefined>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef?.current?.scrollTo(0, 0);
  }, []);

  return (
    <DetailContainer ref={containerRef}>
      <ContractHeader version={version} />
      <ContractTabs setVersion={setVersion} />
    </DetailContainer>
  );
};

export default SmartContractDetail;
