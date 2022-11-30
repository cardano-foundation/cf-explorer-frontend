import { parse } from "qs";
import React from "react";
import { useLocation } from "react-router-dom";

import TokenListTable from "../../components/TokenList";
import useFetchList from "../../commons/hooks/useFetchList";

import styles from "./index.module.scss";

interface ITokenList {}

const TokenList: React.FC<ITokenList> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data, loading, total, totalPage, currentPage } = useFetchList<Token>("/todo", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  return (
    <div className={styles.container}>
      <TokenListTable
        tokenList={[
          {
            id: "id",
            assetName: "CUBY",
            totalTransactions: "999,999,999,113",
            totalSupply: "100,123,123,141.12312",
            createdTime: "10/24/2022 14:09:02",
          },
        ]}
        loading={loading}
        total={total}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TokenList;
