import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";

import { StyledLink } from "../styles";

const WithdrawalHistoryTab = () => {
  const { t } = useTranslation();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const columns: Column<WithdrawalHistory>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash || ""}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time || "")
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <Box marginTop="10px">
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{" "}
            <Box component={"span"} color={({ palette }) => palette.secondary.light}>
              {r.epochSlotNo}
            </Box>
          </Box>
        </Box>
      )
    },
    {
      title: t("glossary.amount"),
      key: "amount",
      minWidth: "120px",
      render: (r) => (
        <>
          <Box component={"span"}> {formatADAFull(r.amount)}</Box>&nbsp;
          <ADAicon />
        </>
      )
    }
  ];
  const fetchData = useFetchList<WithdrawalHistory>(`${API.STAKE.DETAIL}/${stakeId}/withdrawal-history`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) }, history.location.state)
      }}
    />
  );
};

export default WithdrawalHistoryTab;
