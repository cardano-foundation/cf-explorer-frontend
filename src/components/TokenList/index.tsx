import { stringify } from "qs";
import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Skeleton } from "@mui/material";

import { routers } from "../../commons/routers";
import { numberWithCommas } from "../../commons/utils/helper";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";

import { AssetName, FontWeightBold, Logo } from "./styles";

interface ITokenList {
  tokens: IToken[];
  tokensLoading: boolean;
  tokensMetadataLoading: boolean;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const TokenList: React.FC<ITokenList> = ({
  tokens,
  tokensLoading,
  tokensMetadataLoading,
  initialized,
  total,
  totalPage,
  currentPage,
}) => {
  const history = useHistory();

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<IToken>[] = [
    {
      title: "Logo",
      key: "logo",
      minWidth: "100px",
      render: r =>
        tokensMetadataLoading ? (
          <Skeleton style={{ width: 30, height: 30 }} />
        ) : r.logo ? (
          <Logo src={`data:/image/png;base64,${r.logo}`} alt="Logo" />
        ) : null,
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "150px",
      render: r => <AssetName>{r.displayName}</AssetName>,
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => <FontWeightBold>{numberWithCommas(r?.txCount ?? "")}</FontWeightBold>,
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <FontWeightBold>{numberWithCommas(r?.supply ?? "")}</FontWeightBold>,
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => <>{moment(r.createdOn).format("MM/DD/YYYY HH:mm:ss")}</>,
    },
  ];

  return (
    <Card title="Token List">
      <Table
        columns={columns}
        data={tokens}
        loading={tokensLoading}
        initialized={initialized}
        total={{ count: total, title: "Total Transactions" }}
        onClickRow={(_, r: IToken) => history.push(routers.TOKEN_DETAIL.replace(":tokenId", r?.fingerprint ?? ""))}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: totalPage,
        }}
      />
    </Card>
  );
};

export default TokenList;
