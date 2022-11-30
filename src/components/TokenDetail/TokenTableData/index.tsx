import { Select } from "antd";
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

  const getTitle = (value: string) => {
    switch (value) {
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

  return (
    <Card
      title={getTitle(selected)}
      titleItem={
        <Select
          className={styles.select}
          defaultValue="transactions"
          onChange={(value: string) => setSelect(value)}
          options={options}
        />
      }
    ></Card>
  );
};

export default TokenTableData;
