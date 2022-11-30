import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";

import styles from "./index.module.scss";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  const { data: tokenDetail, loading } = useFetch<Token>(`TODO/${params.tokenId}`);

  return (
    <div className={styles.container}>
      <TokenOverview data={tokenDetail} loading={loading} />
      <TokenTableData />
    </div>
  );
};

export default TokenDetail;
