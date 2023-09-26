import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailViewToken from "src/components/commons/DetailView/DetailViewToken";
import SelectedIcon from "src/components/commons/SelectedIcon";

import { AssetName, Logo, StyledContainer, TimeDuration } from "./styles";

const Tokens = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState<string>();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const [selected, setSelected] = useState<IToken | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const queries = new URLSearchParams(search);

  const mainRef = useRef(document.querySelector("#main"));
  const { data, lastUpdated, ...fetchData } = useFetchList<ITokenOverview>(
    API.TOKEN.LIST,
    { ...pageInfo, sort, query: queries.get("tokenName") || "" },
    false,
    blockKey
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Native Tokens | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<IToken>[] = [
    {
      title: t("glossary.icon"),
      key: "icon",
      minWidth: "50px",
      render: (r) => (r?.metadata?.logo ? <Logo src={`${r.metadata?.logo}`} alt="icon" /> : "")
    },
    {
      title: t("glossary.assetName"),
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
      title: t("glossary.policyId"),
      key: "policy",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.policy}>
          <AssetName to={details.policyDetail(r.policy)}>{getShortWallet(r.policy)}</AssetName>
        </CustomTooltip>
      )
    },
    {
      title: t("common.totalTxs"),
      key: "txCount",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.txCount),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.numberOfHolders"),
      key: "numberOfHolders",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.numberOfHolders)
    },
    {
      title: t("glossary.totalVolumn"),
      key: "TotalVolume",
      minWidth: "150px",
      render: (r) => formatNumberDivByDecimals(r?.totalVolume, r.metadata?.decimals || 0)
    },
    {
      title: t("glossary.volume24h"),
      key: "volumeIn24h",
      minWidth: "150px",
      render: (r) => formatNumberDivByDecimals(r?.volumeIn24h, r.metadata?.decimals || 0)
    },
    {
      title: t("common.totalSupply"),
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
      title: t("createdAt"),
      key: "time",
      minWidth: "150px",
      render: (r) => (
        <>
          {formatDateTimeLocal(r.createdOn || "")} {JSON.stringify(selected) === JSON.stringify(r) && <SelectedIcon />}
        </>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  const openDetail = (_: any, r: IToken) => {
    setOnDetailView(true);
    setSelected(r || null);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  return (
    <StyledContainer>
      <Card title={t("glossary.nativeTokens")}>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <Table
          {...fetchData}
          data={data}
          columns={columns}
          total={{ title: "Total", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              history.replace({ search: stringify({ page, size, tokenName: queries.get("tokenName") || "" }) });
            },
            handleCloseDetailView: handleClose,
            hideLastPage: true
          }}
          onClickRow={openDetail}
          rowKey="fingerprint"
          selected={selected?.fingerprint}
          showTabView
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Card>
      <DetailViewToken
        open={onDetailView}
        tokenId={selected?.fingerprint || ""}
        token={selected}
        handleClose={handleClose}
      />
    </StyledContainer>
  );
};

export default Tokens;
