import { styled } from "@mui/material";
import { useState } from "react";

import Card from "../../commons/Card";

import styles from "./index.module.scss";

interface ITokenTableData {}

const TokenTableData: React.FC<ITokenTableData> = () => {
  const [selected, setSelect] = useState<string>("transactions");

  const options = [
    { value: "transactions", label: <span className={styles.selectOption}>Transactions</span> },
    { value: "topHolders", label: <span className={styles.selectOption}>Top Holders</span> },
    { value: "minting", label: <span className={styles.selectOption}>Minting</span> },
  ];

  const getTitle = () => {
    switch (selected) {
      case "transactions":
        return "Transactions";
      case "topHolders":
        return "Top Holders";
      case "minting":
        return "Minting";
      default:
        return "";
    }
  };

  const renderTable = () => {
    switch (selected) {
      case "transactions":
        return <>Transaction Table</>;
      case "topHolders":
        return <>Top Holders Table</>;
      case "minting":
        return <>Minting Table</>;
      default:
        return null;
    }
  };

  return (
    <Card
      title={getTitle()}
      extra={
        <SelectComponent
          value={selected || "transactions"}
          onChange={e => {
            setSelect(e.target.value);
          }}
        >
          {options.map((o, i) => (
            <OptionSelect key={i} value={o.value}>
              {o.label}
            </OptionSelect>
          ))}
        </SelectComponent>
      }
    >
      {renderTable()}
    </Card>
  );
};

export default TokenTableData;

const SelectComponent = styled("select")(({ theme }) => ({
  height: "40px",
  minWidth: 250,
  borderRadius: theme.borderRadius,
  border: "1px solid #0000001a",
  padding: "0 10px",
  color: theme.textColor,
  textAlignLast: "left",
  ":focus-visible": {
    outline: "none",
  },
}));

const OptionSelect = styled("option")(({ theme }) => ({
  padding: "6px 0",
  textAlign: "center",
  height: "40px",
}));
