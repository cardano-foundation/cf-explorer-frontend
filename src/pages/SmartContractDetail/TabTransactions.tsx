import { Box } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";

import { StyledLink } from "../BlockList/styles";

const TabTransactions = () => {
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const { t } = useTranslation();
  const history = useHistory();

  const fetchData = useFetchList<Transactions>(
    `${API.ADDRESS.DETAIL}/addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha/txs`,
    pageInfo
  );

  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: "150px",

      render: (r) => (
        <>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
        </>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "180px",
      render: (r) => formatDateTimeLocal(r.time || "")
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slot",
      minWidth: "100px"
    }
  ];

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        rowKey="hash"
        height={380}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
      />
    </Box>
  );
};

export default TabTransactions;
