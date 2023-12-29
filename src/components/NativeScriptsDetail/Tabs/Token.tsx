import { Box } from "@mui/material";
import { stringify } from "qs";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import {
  formatAmount,
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  getPageInfo,
  getShortHash
} from "src/commons/utils/helper";
import { LinkComponent } from "src/components/PolicyDetail/PolicyTable/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

const Token = () => {
  const { t } = useTranslation();
  const { id, tabActive } = useParams<{ id: string; tabActive?: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<TokenPolicys>(tabActive === "token" ? API.TOKEN.TOKENS_SCRIPTED(id) : "", pageInfo);
  const columnsToken: Column<TokenPolicys>[] = [
    {
      title: t("common.tokenName"),
      key: "tokenname",
      minWidth: "50px",
      render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || r.name}</LinkComponent>
    },
    {
      title: t("common.tokenID"),
      key: "id",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.fingerprint}>
          <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint || "")}</LinkComponent>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "date",
      minWidth: "150px",
      render: (r) => formatDateTimeLocal(r.createdOn || "")
    },
    {
      title: t("common.totalSupply"),
      key: "totalSupply",
      minWidth: "150px",
      render: (r) => {
        const decimalToken = r?.metadata?.decimals || 0;
        return <Box component={"span"}>{formatNumberDivByDecimals(r?.supply, decimalToken)}</Box>;
      }
    },
    {
      title: t("common.totalTxs"),
      key: "trxtotal",
      minWidth: "150px",
      render: (r) => <>{formatAmount(r?.txCount || "")}</>
    }
  ];
  return (
    <>
      <Table
        {...fetchData}
        columns={columnsToken}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
        onClickRow={(_, r: PolicyHolder | TokenPolicys) => history.push(details.token(r.fingerprint))}
      />
    </>
  );
};

export default Token;
