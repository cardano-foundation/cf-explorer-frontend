import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

import { LabelStatus, StyledLink } from "../styles";

const StakeHistoryTab = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<StakeHistory>(`${API.STAKE.DETAIL}/${stakeId}/stake-history`, pageInfo);

  const columns: Column<StakeHistory>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: isMobile ? "245px" : "120px",
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
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/
            <Box component={"span"} color={({ palette }) => palette.secondary.light}>
              {r.epochSlotNo}
            </Box>
          </Box>
        </Box>
      )
    },
    {
      title: t("glossary.action"),
      key: "action",
      minWidth: "120px",
      render: (r) => {
        const label = r.action ? r.action.split(" ").join("") : "";
        return (
          <LabelStatus
            color={(theme) => (r.action === "Registered" ? theme.palette.error[700] : theme.palette.secondary.light)}
            sx={{
              background: (theme) => (r.action === "Registered" ? theme.palette.error[100] : theme.palette.primary[200])
            }}
          >
            {label === "Registered" ? t("glossary.registered") : t("glossary.deregistered")}
          </LabelStatus>
        );
      }
    }
  ];

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

export default StakeHistoryTab;
