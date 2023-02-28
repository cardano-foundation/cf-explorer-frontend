import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../../commons/Card";
import TokenTransaction from "./TokenTransaction";

import { StyledSelect } from "./styles";
import TokenTopHolder from "./TokenTopHolder";
import TokenMinting from "./TokenMinting";
import { MenuItem } from "@mui/material";
import { BiChevronDown } from "react-icons/bi";

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
      titleChilren={mappingValue[type].title}
      underline={true}
      extra={
        <StyledSelect
          value={type}
          onChange={(e: any) => setType(e.target.value)}
          IconComponent={() => <BiChevronDown size={30} style={{ paddingRight: 10 }} />}
        >
          {Object.keys(mappingValue).map(key => (
            <MenuItem value={key}>{mappingValue[key].title}</MenuItem>
          ))}
        </StyledSelect>
      }
    >
      {mappingValue[type].component}
    </Card>
  );
};

export default TokenTableData;
