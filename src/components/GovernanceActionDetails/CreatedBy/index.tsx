import { Box, useTheme } from "@mui/material";
import { t } from "i18next";
import { stringify } from "qs";
import { useHistory } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { API } from "src/commons/utils/api";
import { getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";

interface Props {
  anchorHash: string;
  anchorUrl: string;
}

interface Data {
  name: string;
  publicKey: string;
  signature: string;
  witnessAlgorithm: string;
  isDataOverSize: boolean | null | undefined;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
[];

export default function CreatedBy({ anchorHash, anchorUrl }: Props) {
  const theme = useTheme();
  const { pageInfo } = usePageInfo();
  const { page, size } = pageInfo;

  const history = useHistory();
  const { data, statusError, error } = useFetch<Data>(
    API.OVERVIEW_GOV_ACTIONS.CREATE_BY(anchorUrl, anchorHash, page, size)
  );

  const columns: Column<Data>[] = [
    {
      title: <Box component={"span"}>{t("glossary.name")}</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <Box
          sx={{
            fontSize: "14px",
            color: r.name ? theme.palette.primary.main : theme.palette.secondary.main
          }}
        >
          {r.name || t("N/A")}
        </Box>
      )
    },
    {
      title: <Box component={"span"}>{t("tab.witnessAlgorithm")}</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <Box
          sx={{
            fontSize: "14px"
          }}
        >
          {r.witnessAlgorithm || t("N/A")}
        </Box>
      )
    },
    {
      title: <Box component={"span"}>{t("tab.publicKey")}</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.publicKey} placement="top">
          <Box component={"span"}>{getShortHash(r.publicKey) || t("N/A")}</Box>
        </CustomTooltip>
      )
    },
    {
      title: <Box component={"span"}>{t("tab.signature")}</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.signature} placement="top">
          <Box component={"span"}>{getShortHash(r.signature) || t("N/A")}</Box>
        </CustomTooltip>
      )
    }
  ];
  return (
    <Box>
      <Table
        {...data}
        statusError={statusError}
        error={error}
        columns={columns}
        total={{ count: data?.totalItems ?? 0, title: "Total", isDataOverSize: data?.isDataOverSize }}
        pagination={{
          ...pageInfo,
          total: data?.totalItems,
          onChange: (page, size) => {
            history.replace({ search: stringify({ page, size }) });
          }
        }}
      />
    </Box>
  );
}
