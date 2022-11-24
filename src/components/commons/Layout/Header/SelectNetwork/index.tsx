import { Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NETWORKS } from "../../../../../commons/utils/constants";
import { RootState } from "../../../../../stores/types";
import { setNetwork } from "../../../../../stores/user";
import styles from "./index.module.scss";

const SelectNetwork: React.FC = () => {
  const { network, theme } = useSelector(({ user }: RootState) => user);

  return (
    <Select
      data-theme={theme}
      value={network}
      onChange={value => setNetwork(value)}
      className={styles.select}
      popupClassName={styles.dropdown}
      options={Object.entries(NETWORKS).map(([value, name]) => ({
        value,
        label: <span className={styles.value}>{value === "testnet" ? "Testnet" : name}</span>,
      }))}
    />
  );
};

export default SelectNetwork;
