import { Box, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useHistory } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { API } from "src/commons/utils/api";
import { getShortHash } from "src/commons/utils/helper";
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
  const { data } = useFetch<Data>(API.OVERVIEW_GOV_ACTIONS.CREATE_BY(anchorUrl, anchorHash, page, size));

  const columns: Column<Data>[] = [
    {
      title: <Box component={"span"}>Name</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box sx={{ fontSize: "14px", color: theme.palette.primary.main }}>{r.name}</Box>
    },
    {
      title: <Box component={"span"}>WitnessAlgorithm</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box sx={{ fontSize: "14px", color: theme.palette.primary.main }}>{r.witnessAlgorithm}</Box>
    },
    {
      title: <Box component={"span"}>Public Key</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{getShortHash(r.publicKey)}</Box>
    },
    {
      title: <Box component={"span"}>Signature</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{r.signature}</Box>
    }
  ];
  return (
    <Box>
      <Table
        {...data}
        columns={columns}
        total={{ count: data?.totalPages ?? 0, title: "Total", isDataOverSize: data?.isDataOverSize }}
        pagination={{
          ...pageInfo,
          total: data?.totalPages,
          onChange: (page, size) => {
            history.replace({ search: stringify({ page, size }) });
          }
        }}
      />
    </Box>
  );
}
