import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { details } from "src/commons/routers";
import {
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  getPageInfo,
  getShortWallet,
  numberWithCommas
} from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import FormNowMessage from "src/components/commons/FormNowMessage";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailViewToken from "src/components/commons/DetailView/DetailViewToken";
import SelectedIcon from "src/components/commons/SelectedIcon";

import { AssetName, Logo, StyledContainer, TimeDuration } from "./styles";

const Tokens = () => {
  const [token, setToken] = useState<IToken | null>(null);
  const [sort, setSort] = useState<string>("txCount,DESC");
  const { onDetailView } = useSelector(({ user }: RootState) => user);

  const [selected, setSelected] = useState<number | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const mainRef = useRef(document.querySelector("#main"));
  const { data, lastUpdated, ...fetchData } = useFetchList<ITokenOverview>(
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
      render: (r) => (r?.metadata?.logo ? <Logo src={`data:/image/png;base64,${r.metadata?.logo}`} alt="icon" /> : "")
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "100px",
      render: (r) =>
        r.displayName && r.displayName.length > 20 ? (
          <CustomTooltip placement={"top"} title={r.displayName}>
            <AssetName to={details.token(r?.fingerprint ?? "")}>{getShortWallet(r.displayName || "")}</AssetName>
          </CustomTooltip>
        ) : (
          <AssetName to={details.token(r?.fingerprint ?? "")}>
            {r.displayName || getShortWallet(r.fingerprint || "")}
          </AssetName>
        )
    },
    {
      title: "Policy ID",
      key: "policy",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.policy}>
          <AssetName to={details.policyDetail(r.policy)}>{getShortWallet(r.policy)}</AssetName>
        </CustomTooltip>
      )
    },
    {
      title: "Total Transactions",
      key: "txCount",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.txCount),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Number of Holders",
      key: "numberOfHolders",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.numberOfHolders)
    },
    {
      title: "Total Volume",
      key: "TotalVolume",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.totalVolume)
    },
    {
      title: "Volume 24H",
      key: "volumeIn24h",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.volumeIn24h)
    },
    {
      title: "Total Supply",
      key: "supply",
      minWidth: "150px",
      render: (r) => {
        const decimalToken = r?.decimals || r?.metadata?.decimals || 0;
        return formatNumberDivByDecimals(r?.supply, decimalToken);
      },
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Created",
      key: "time",
      minWidth: "150px",
      render: (r) => (
        <>
          {formatDateTimeLocal(r.createdOn || "")} {JSON.stringify(token) === JSON.stringify(r) && <SelectedIcon />}
        </>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  const openDetail = (_: any, r: IToken, index: number) => {
    setOnDetailView(true);
    setToken(r || null);
    setSelected(index);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setToken(null);
    setSelected(null);
  };

  return (
    <StyledContainer>
      <Card title="Token List">
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <Table
          {...fetchData}
          data={data}
          columns={columns}
          total={{ title: "Total", count: fetchData.total }}
          defaultSort="txCount,DESC"
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              mainRef.current?.scrollTo(0, 0);
              history.replace({ search: stringify({ page, size }) });
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={openDetail}
          selected={selected}
          showTabView
        />
      </Card>
      {token && onDetailView && (
        <DetailViewToken tokenId={token.fingerprint || ""} token={token} handleClose={handleClose} />
      )}
    </StyledContainer>
  );
};

export default Tokens;
