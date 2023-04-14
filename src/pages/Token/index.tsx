import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useWindowSize } from "react-use";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { setOnDetailView } from "../../stores/user";
import { details } from "../../commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import DetailViewToken from "../../components/commons/DetailView/DetailViewToken";
import useFetchList from "../../commons/hooks/useFetchList";
import { AssetName, Logo, StyledContainer, LogoEmpty } from "./styles";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { useTheme } from "@mui/material";
import { API } from "../../commons/utils/api";
import SelectedIcon from "../../components/commons/SelectedIcon";
import { REFRESH_TIMES } from "../../commons/utils/constants";

interface ITokenList {}

const Tokens: React.FC<ITokenList> = () => {
  const [token, setToken] = useState<IToken | null>(null);
  const [sort, setSort] = useState<string>("txCount,DESC");
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const theme = useTheme();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const { data, ...fetchData } = useFetchList<ITokenOverview>(
    API.TOKEN.LIST,
    { ...pageInfo, sort },
    false,
    REFRESH_TIMES.TOKEN_LIST
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Tokens List | Cardano Explorer`;
  }, []);

  const columns: Column<IToken>[] = [
    {
      title: "Icon",
      key: "icon",
      minWidth: "50px",
      render: r =>
        r?.metadata?.logo ? (
          <Logo src={`data:/image/png;base64,${r.metadata?.logo}`} alt="icon" />
        ) : (
          <LogoEmpty
            name={r.displayName || r.fingerprint || ""}
            children={`${(r.displayName || r.fingerprint || "").toUpperCase().slice(0, 2)}`}
          />
        ),
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "100px",
      render: r =>
        r.displayName && r.displayName.length > 20 ? (
          <CustomTooltip placement={"top"} title={r.displayName}>
            <AssetName to={details.token(r?.fingerprint ?? "")}>{getShortWallet(r.displayName || "")}</AssetName>
          </CustomTooltip>
        ) : (
          <AssetName to={details.token(r?.fingerprint ?? "")}>
            {r.displayName || getShortWallet(r.fingerprint || "")}
          </AssetName>
        ),
    },
    {
      title: "Total Transactions",
      key: "txCount",
      minWidth: "150px",
      render: r => numberWithCommas(r?.txCount),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Volume 24H",
      key: "volumeIn24h",
      minWidth: "150px",
      render: r => numberWithCommas(r?.volumeIn24h),
    },
    {
      title: "Total Supply",
      key: "supply",
      minWidth: "150px",
      render: r => numberWithCommas(r?.supply),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Created",
      key: "time",
      minWidth: "150px",
      render: r => (
        <>
          {formatDateTimeLocal(r.createdOn || "")} {JSON.stringify(token) === JSON.stringify(r) && <SelectedIcon />}
        </>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
  ];

  const openDetail = (_: any, r: IToken, index: number) => {
    if (width >= theme.breakpoints.values.md) {
      setOnDetailView(true);
      setToken(r || null);
      setSelected(index);
    } else history.push(details.token(r?.fingerprint ?? ""));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setToken(null);
    setSelected(null);
  };

  return (
    <StyledContainer>
      <Card title="Token List">
        <Table
          {...fetchData}
          data={data}
          columns={columns}
          total={{ title: "Total", count: fetchData.total }}
          defaultSort="txCount,DESC"
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
            handleCloseDetailView: handleClose,
          }}
          onClickRow={openDetail}
          selected={selected}
        />
        {token && <DetailViewToken tokenId={token.fingerprint || ""} token={token} handleClose={handleClose} />}
      </Card>
    </StyledContainer>
  );
};

export default Tokens;
