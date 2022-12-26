import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import axios from "axios";
import moment from "moment";
import { useWindowSize } from "react-use";
import { Skeleton } from "@mui/material";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { setOnDetailView } from "../../stores/user";
import { details } from "../../commons/routers";
import { formatADA, numberWithCommas } from "../../commons/utils/helper";
import DetailViewToken from "../../components/commons/DetailView/DetailViewToken";
import useFetchList from "../../commons/hooks/useFetchList";
import { AssetName, Logo, StyledContainer } from "./styles";

interface ITokenList {}

const Tokens: React.FC<ITokenList> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const [detailView, setDetailView] = useState<string | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();
  const [metaLoading, setMetaLoading] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<ITokenMetadata[]>([]);
  const { data, loading, initialized, total, currentPage } = useFetchList<ITokenOverview>("/tokens", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  useEffect(() => {
    async function loadMetadata() {
      if (data?.length) {
        setMetaLoading(true);
        const query: string[] = data.map(token => `${token?.policy}${token?.name}`);
        try {
          const {
            data: { subjects },
          } = await axios.post("/metadata/query", {
            subjects: query,
            properties: ["policy", "logo"],
          });

          setMetaData(
            subjects.map((item: any) => ({
              policy: item.policy,
              logo: item.logo.value,
            }))
          );
        } catch (err) {}
        setMetaLoading(false);
      }
    }
    loadMetadata();
  }, [data]);

  const tokens: IToken[] = useMemo(() => {
    return data.map(token => {
      const meta = metaData.find(_ => token.policy === _.policy);
      return { ...token, logo: meta?.logo, decimals: meta?.decimals };
    });
  }, [data, metaData]);

  const columns: Column<IToken>[] = [
    {
      title: "Icon",
      key: "icon",
      minWidth: "50px",
      render: r =>
        metaLoading ? (
          <Skeleton style={{ width: 30, height: 30 }} />
        ) : r.logo ? (
          <Logo src={`data:/image/png;base64,${r.logo}`} alt="icon" />
        ) : null,
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "100px",
      render: r => <AssetName to={details.token(r?.fingerprint ?? "")}>{r.displayName}</AssetName>,
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => numberWithCommas(r?.txCount ?? ""),
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => formatADA(r?.supply ?? ""),
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => moment(r.createdOn).format("MM/DD/YYYY HH:mm:ss"),
    },
  ];

  const openDetail = (_: any, r: IToken) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r?.fingerprint || null);
    } else history.push(details.token(r?.fingerprint ?? ""));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };
  const selected = tokens?.findIndex(item => item.fingerprint === detailView);

  return (
    <StyledContainer>
      <Card title="Token List">
        <Table
          columns={columns}
          data={tokens}
          loading={loading}
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
    </StyledContainer>
  );
};

export default Tokens;
