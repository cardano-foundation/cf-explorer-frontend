import { stringify } from "qs";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Skeleton } from "@mui/material";
import { routers } from "../../commons/routers";
import { formatADA, numberWithCommas } from "../../commons/utils/helper";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { AssetName, Logo } from "./styles";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";
import DetailViewToken from "../commons/DetailView/DetailViewToken";

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
  const [detailView, setDetailView] = useState<string | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<IToken>[] = [
    {
      title: "Icon",
      key: "icon",
      minWidth: "50px",
      render: r =>
        tokensMetadataLoading ? (
          <Skeleton style={{ width: 30, height: 30 }} />
        ) : r.logo ? (
          <Logo src={`data:/image/png;base64,${r.logo}`} alt="icon" />
        ) : null,
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "100px",
      render: r => (
        <AssetName to={routers.TOKEN_DETAIL.replace(":tokenId", r.fingerprint || "")}>{r.displayName}</AssetName>
      ),
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => <>{numberWithCommas(r?.txCount ?? "")}</>,
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <>{formatADA(r?.supply ?? "")}</>,
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => <>{moment(r.createdOn).format("MM/DD/YYYY HH:mm:ss")}</>,
    },
  ];

  const openDetail = (_: any, r: IToken) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r?.fingerprint || null);
    } else history.push(routers.TOKEN_DETAIL.replace(":tokenId", r?.fingerprint ?? ""));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };
  const selected = tokens?.findIndex(item => item.fingerprint === detailView);

  return (
    <Card title="Token List">
      <Table
        columns={columns}
        data={tokens}
        loading={tokensLoading}
        initialized={initialized}
        total={{ count: total, title: "Total Token List" }}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
        onClickRow={openDetail}
        selected={selected}
        selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
      />
      {detailView && <DetailViewToken tokenId={detailView} handleClose={handleClose} />}
    </Card>
  );
};

export default TokenList;
