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
        <Select
          className={styles.select}
          defaultValue="transactions"
          onChange={(value: string) => setSelect(value)}
          options={options}
        />
      }
    >
      {renderTable()}
    </Card>
  );
};

export default TokenTableData;
