import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, formatPercent, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { StakeKeyStatus } from "src/components/commons/DetailHeader/styles";
import ADAicon from "src/components/commons/ADAIcon";

import { PoolName } from "./styles";

const DrepsList: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pageInfo } = usePageInfo();

  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<Drep>(API.DREPS_LIST.DREPS_LIST, { ...pageInfo }, false, blockKey);

  const columns: Column<Drep>[] = [
    {
      title: t("dreps.id"),
      key: "id",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.drepId ? r.drepId : undefined}>
          <PoolName to={{ pathname: details.drep(r.drepId) }}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {`${getShortHash(r.drepId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: <Box component={"span"}>{t("dreps.anchorLink")}</Box>,
      key: "anchorLink",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.anchorUrl ? r.anchorUrl : undefined}>
          <Box
            component={"a"}
            display={"block"}
            width={"150px"}
            href={r.anchorUrl}
            target="_blank"
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            color={(theme) => `${theme.palette.primary.main} !important`}
          >
            {`${r.anchorUrl || ""}`}
          </Box>
        </CustomTooltip>
      )
    },
    {
      title: <Box component={"span"}>{t("dreps.anchorHash")}</Box>,
      key: "pu.anchorHash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.anchorHash ? r.anchorHash : undefined}>
          <Box
            component={"span"}
            display={"block"}
            width={"150px"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {r.anchorHash}
          </Box>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box component={"span"}>
          {t("glossary.activeStake")} (<ADAicon />)
        </Box>
      ),
      key: "pu.activeStake",
      minWidth: "120px",
      render: (r) => (
        <Box component={"span"}>{r.activeVoteStake != null ? formatADAFull(r.activeVoteStake) : t("common.N/A")}</Box>
      )
    },
    {
      title: t("dreps.votingPower"),
      minWidth: "120px",
      key: "votingPower",
      render: (r) =>
        r.votingPower != null ? (
          <Box component={"span"} mr={1}>
            {formatPercent(r.votingPower / 100) || `0%`}
          </Box>
        ) : (
          t("common.N/A")
        )
    },
    {
      title: t("common.status"),
      key: "status",
      minWidth: "120px",
      render: (r) => (
        <StakeKeyStatus status={r.status}>
          {r.status === "ACTIVE"
            ? t("status.active")
            : r.status === "INACTIVE"
            ? t("status.inActive")
            : t("status.retired")}
        </StakeKeyStatus>
      )
    },
    {
      title: t("dreps.registrationDate"),
      minWidth: "100px",
      key: "registrationDate",
      render: (r) => <Box component={"span"}>{formatDateTimeLocal(r.createdAt)}</Box>
    },
    {
      title: t("dreps.lastUpdated"),
      key: "lastUpdated",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatDateTimeLocal(r.updatedAt)}</Box>
    }
  ];
  return (
    <>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
        onClickRow={(_, r: Drep) => history.push(details.drep(r.drepId))}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
            tableRef.current?.scrollIntoView();
          }
        }}
      />
    </>
  );
};

export default DrepsList;
