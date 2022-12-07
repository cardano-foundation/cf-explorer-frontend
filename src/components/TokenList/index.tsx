import { stringify } from "qs";
import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { routers } from "../../commons/routers";
import { numberWithCommas } from "../../commons/utils/helper";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";

import { AssetName, FontWeightBold } from "./styles";

interface ITokenList {
  tokens: IToken[];
  tokensLoading: boolean;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const columns: Column<IToken>[] = [
  {
    title: "Logo",
    key: "logo",
    minWidth: "100px",
    // render: r => <Logo src={`data:/image/png;base64,${""}`} alt="Logo" />,
    // render: r => <Skeleton style={{ height: "30px", width: "30px"}} />
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

const TokenList: React.FC<ITokenList> = ({ tokens, tokensLoading, initialized, total, totalPage, currentPage }) => {
  const history = useHistory();

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

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
