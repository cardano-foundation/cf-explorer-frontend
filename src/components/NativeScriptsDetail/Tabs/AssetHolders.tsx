import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";

import { formatNumberDivByDecimals, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { Column } from "src/types/table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { LinkComponent } from "src/components/PolicyDetail/PolicyTable/styles";
import { details } from "src/commons/routers";
import Table from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";

import { useNativeScriptDetail } from ".";

const AssetHolders = () => {
  const { t } = useTranslation();
  const { scriptHash } = useNativeScriptDetail();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<TokenPolicys>(`${API.POLICY}/${scriptHash}/holders`, pageInfo);
  const columnsAssetHolders: Column<PolicyHolder>[] = [
    {
      title: t("common.address"),
      key: "address",
      minWidth: "50px",
      render: (r) => (
        <CustomTooltip title={r.address}>
          <LinkComponent to={details.address(r.address)}>{getShortHash(r.address || "")}</LinkComponent>
        </CustomTooltip>
      )
    },
    {
      title: t("common.tokenName"),
      key: "id",
      minWidth: "100px",
      render: (r) => <LinkComponent to={details.token(r.fingerprint)}>{r.displayName || ""}</LinkComponent>
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
      title: t("common.balance"),
      key: "Balance",
      minWidth: "150px",
      render: (r) => <Box component={"span"}>{formatNumberDivByDecimals(r.quantity, r?.metadata?.decimals || 0)}</Box>
    }
  ];

  return (
    <>
      <Table
        {...fetchData}
        columns={columnsAssetHolders}
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

export default AssetHolders;
