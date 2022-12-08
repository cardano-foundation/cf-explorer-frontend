import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../commons/Card";
import TokenTransaction from "./TokenTransaction";

import { OptionSelect, SelectComponent } from "./styles";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";

interface ITokenTableData {
  totalSupply?: number;
}

interface IMappingvalue {
  [key: string]: {
    title: string;
    component: React.ReactNode;
  };
}

const TokenTableData: React.FC<ITokenTableData> = ({ totalSupply }) => {
  const [type, setType] = useState<string>("transactions");
  const params = useParams<{ tokenId: string }>();

  const mappingValue: IMappingvalue = {
    transactions: {
      title: "Transactions",
      component: <TokenTransaction tokenId={params.tokenId} active={type === "transactions"} />,
    },
    topHolders: {
      title: "Top Holders",
      component: <TokenTopHolder tokenId={params.tokenId} active={type === "topHolders"} totalSupply={totalSupply} />,
    },
    minting: {
      title: "Minting",
      component: <TokenMinting tokenId={params.tokenId} active={type === "minting"} />,
    },
  };

  return (
    <Card
      title={mappingValue[type].title}
      extra={
        <SelectComponent value={type} onChange={(e: any) => setType(e.target.value)}>
          {Object.keys(mappingValue).map(key => (
            <OptionSelect value={key}>{mappingValue[key].title}</OptionSelect>
          ))}
        </SelectComponent>
      }
    >
      {mappingValue[type].component}
    </Card>
  );
};

export default TokenTableData;
