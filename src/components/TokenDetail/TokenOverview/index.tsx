import moment from "moment";
import React from "react";

import Card from "../../commons/Card";
import DetailCard from "../../commons/DetailCard";

import styles from "./index.module.scss";

interface ITokenOverview {
  data: Token | null;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const listDetails = [
    { title: "Token ID", value: data?.id },
    { title: "Asset Name", value: data?.assetName },
    { title: "Transactions", value: data?.totalTransactions },
    { title: "Created", value: data?.createdTime && moment(data?.createdTime).format("MM/DD/YYYY HH:mm:ss") },
  ];

  return (
    <Card title={"Token Detail"} className={styles.wrapper}>
      <DetailCard
        listDetails={listDetails}
        loading={loading}
        tokenDetail={{ decimal: 5, totalSupply: "135,268,258,891.35978" }}
      />
    </Card>
  );
};

export default TokenOverview;
