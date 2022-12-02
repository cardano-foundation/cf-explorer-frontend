import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";

import styles from "./index.module.scss";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  // const { data: tokenDetail, loading } = useFetch<IToken>(`TODO/${params.tokenId}`);

  // TODO: Remove later
  const tokenDetail: IToken = {
    tokenId: "14696a4676909f4e3cb1f2e60e2e08e5abed70caf5c02699be97113943554259",
    assetName: "CUBY",
    totalTransactions: 999999999113,
    totalSupply: 100123123141.12312,
    dateCreated: "10/24/2022 14:09:02 ",
  };

  return (
    <div className={styles.container}>
      <TokenOverview data={tokenDetail} loading={false} />
      <TokenTableData />
    </div>
  );
};

export default TokenDetail;
