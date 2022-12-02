import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { getShortHash, numberWithCommas } from "../../../commons/utils/helper";

import Card from "../../commons/Card";
import CopyButton from "../../commons/CopyButton";
import DetailCard from "../../commons/DetailCard";
import TokenLogo from "../../commons/TokenLogo";

import styles from "./index.module.scss";

interface ITokenOverview {
  data: IToken;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Token ID",
      value: (
        <div className={styles.tokenId}>
          <Tooltip title={data.tokenId} placement="top">
            <span>{getShortHash(data.tokenId)}</span>
          </Tooltip>
          <CopyButton text={data.tokenId} />
        </div>
      ),
    },
    {
      title: "Asset Name",
      value: (
        <>
          <TokenLogo tokenId={data.tokenId} className={styles.logo} />
          {data.assetName}
        </>
      ),
    },

    { title: "Transactions", value: numberWithCommas(data.totalTransactions) },
    { title: "Created", value: data.dateCreated && moment(data.dateCreated).format("MM/DD/YYYY HH:mm:ss") },
  ];

  return (
    <Card title={"Token Detail"} className={styles.wrapper}>
      <DetailCard
        listDetails={listDetails}
        loading={loading}
        tokenDetail={{ decimal: 5, totalSupply: 135268258891.35978 }}
      />
    </Card>
  );
};

export default TokenOverview;
