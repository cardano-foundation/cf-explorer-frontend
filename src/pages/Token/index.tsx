import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import { details } from "src/commons/routers";
import {
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  formatNumberTotalSupply,
  getShortHash,
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
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { AssetName, Logo, StyledContainer, TimeDuration } from "./styles";

const Tokens = () => {
  const { t } = useTranslation();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const [selected, setSelected] = useState<IToken | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const queries = new URLSearchParams(search);

  const mainRef = useRef(document.querySelector("#main"));
  const { data, lastUpdated, error, statusError, ...fetchData } = useFetchList<ITokenOverview>(
    API.TOKEN.LIST,
    { ...pageInfo, query: queries.get("tokenName") || "" },
    false,
    blockKey
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Native Tokens | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<IToken>[] = [
    {
      title: <Box data-testid="tokens.table.title.icon">{t("glossary.icon")}</Box>,
      key: "icon",
      minWidth: "50px",
      render: (r) => (r?.metadata?.logo ? <Logo src={`${r.metadata?.logo}`} alt="icon" /> : "")
    },
    {
      title: <Box data-testid="tokens.table.title.assetName">{t("glossary.assetName")}</Box>,
      key: "assetName",
      minWidth: "100px",
      render: (r, idx) =>
        r.displayName && r.displayName.length > 20 ? (
          <CustomTooltip placement={"top"} title={r.displayName}>
            <AssetName data-testid={`token.assetName#${idx}`} to={details.token(r?.fingerprint ?? "")}>
              {getShortHash(r.displayName || "")}
            </AssetName>
          </CustomTooltip>
        ) : (
          <AssetName
            data-testid={`token.assetName#${idx}`}
            to={details.token(r?.fingerprint ?? "")}
            data-policy={`${r?.policy}${r?.name}`}
          >
            {r.displayName || getShortHash(r.fingerprint || "")}
          </AssetName>
        )
    },
    {
      title: <Box data-testid="tokens.table.title.scriptHash">{t("glossary.scriptHash")}</Box>,
      key: "policy",
      minWidth: "100px",
      render: (r, idx) => (
        <CustomTooltip title={r.policy}>
          <AssetName
            to={r.policyIsNativeScript ? details.nativeScriptDetail(r.policy) : details.smartContract(r.policy)}
            data-testid={`token.scriptHash#${idx}`}
          >
            {getShortHash(r.policy)}
          </AssetName>
        </CustomTooltip>
      )
    },
    {
      title: <Box data-testid="tokens.table.title.totalTxs">{t("common.totalTxs")}</Box>,
      key: "txCount",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.txCount),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Box data-testid="tokens.table.title.numberOfHolders">{t("glossary.numberOfHolders")}</Box>,
      key: "numberOfHolders",
      minWidth: "150px",
      render: (r) => numberWithCommas(r?.numberOfHolders)
    },
    {
      title: <Box data-testid="tokens.table.title.totalVolumn">{t("glossary.totalVolumn")}</Box>,
      key: "TotalVolume",
      minWidth: "150px",
      render: (r) => formatNumberDivByDecimals(r?.totalVolume, r.metadata?.decimals || 0)
    },
    {
      title: <Box data-testid="tokens.table.title.volume24h">{t("glossary.volume24h")}</Box>,
      key: "volumeIn24h",
      minWidth: "150px",
      render: (r, index) => (
        <Box data-testid={`tokens.table.value.volume24h#${index}`}>
          {formatNumberDivByDecimals(r?.volumeIn24h, r.metadata?.decimals || 0)}
        </Box>
      )
    },
    {
      title: <Box data-testid="tokens.table.title.totalSupply">{t("common.totalSupply")}</Box>,
      key: "supply",
      minWidth: "150px",
      render: (r) => {
        const decimalToken = r?.decimals || r?.metadata?.decimals || 0;
        return formatNumberTotalSupply(r?.supply, decimalToken);
      },
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Box data-testid="tokens.table.title.createdAt">{t("createdAt")}</Box>,
      key: "time",
      minWidth: "150px",
      render: (r) => (
        <DatetimeTypeTooltip>
          {formatDateTimeLocal(r.createdOn || "")} {JSON.stringify(selected) === JSON.stringify(r) && <SelectedIcon />}
        </DatetimeTypeTooltip>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  const openDetail = (_: React.MouseEvent<Element, MouseEvent>, r: IToken) => {
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
        {!error && (
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
        )}
        <Table
          {...fetchData}
          statusError={statusError}
          error={error}
          data={data}
          columns={columns}
          total={{ title: "Total", count: fetchData.total, isDataOverSize: fetchData.isDataOverSize }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              history.replace({
                search: stringify({ ...pageInfo, page, size, tokenName: queries.get("tokenName") || "" })
              });
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
