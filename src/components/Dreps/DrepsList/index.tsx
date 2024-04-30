import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
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
import { ActionMetadataModalConfirm } from "src/components/GovernanceVotes";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { PoolName } from "./styles";

const DrepsList: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pageInfo } = usePageInfo();
  const [metadataUrl, setMetadataUrl] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<Drep>(API.DREPS_LIST.DREPS_LIST, { ...pageInfo }, false, blockKey);

  const columns: Column<Drep>[] = [
    {
      title: <div data-testid="drepList.drepIdTitle">{t("dreps.id")}</div>,
      key: "id",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.drepId ? r.drepId : undefined}>
          <PoolName data-testid="drepList.drepIdValue" to={{ pathname: details.drep(r.drepId) }}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {`${getShortHash(r.drepId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box data-testid="drepList.anchorLinkTitle" component={"span"}>
          {t("dreps.anchorLink")}
        </Box>
      ),
      key: "anchorLink",
      minWidth: "100px",
      render: (r) => (
        <CustomTooltip title={r.anchorUrl ? r.anchorUrl : undefined} sx={{ width: 150 }}>
          <Box
            data-testid="drepList.anchorLinkValue"
            component={Button}
            textTransform={"lowercase"}
            fontWeight={400}
            display={(r.anchorUrl || "").length > 20 ? "inline-block" : "inline"}
            width={"150px"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            color={(theme) => `${theme.palette.primary.main} !important`}
            onClick={() => setMetadataUrl(r.anchorUrl)}
            disableRipple={true}
            sx={{ ":hover": { background: "none" } }}
          >
            {`${r.anchorUrl || ""}`}
          </Box>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box data-testid="drepList.anchorHashTitle" component={"span"}>
          {t("dreps.anchorHash")}
        </Box>
      ),
      key: "pu.anchorHash",
      minWidth: "120px",
      render: (r) => (
        <CustomTooltip title={r.anchorHash ? r.anchorHash : undefined}>
          <Box
            data-testid="drepList.anchorHashValue"
            component={"span"}
            display={"inline-block"}
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
        <Box data-testid="drepList.activeStakeTitle" component={"span"}>
          {t("glossary.activeStake")} (<ADAicon />)
        </Box>
      ),
      key: "pu.activeStake",
      minWidth: "120px",
      render: (r) => (
        <Box data-testid="drepList.activeStakeValue" component={"span"}>
          {r.activeVoteStake != null ? formatADAFull(r.activeVoteStake) : t("common.N/A")}
        </Box>
      )
    },
    {
      title: <div data-testid="drepList.votingPowerTitle">{t("dreps.votingPower")}</div>,
      minWidth: "120px",
      key: "votingPower",
      render: (r) =>
        r.votingPower != null ? (
          <Box data-testid="drepList.votingPowerValue" component={"span"} mr={1}>
            {formatPercent(r.votingPower / 100) || `0%`}
          </Box>
        ) : (
          t("common.N/A")
        )
    },
    {
      title: <div data-testid="drepList.statusTitle">{t("common.status")}</div>,
      key: "status",
      minWidth: "120px",
      render: (r) => (
        <StakeKeyStatus
          data-testid="drepList.statusValue"
          status={r.status}
          sx={{ width: 65, display: "inline-block", textAlign: "center" }}
        >
          {r.status === "ACTIVE"
            ? t("status.active")
            : r.status === "INACTIVE"
            ? t("status.inActive")
            : t("status.retired")}
        </StakeKeyStatus>
      )
    },
    {
      title: <div data-testid="drepList.registrationDateTitle">{t("dreps.registrationDate")}</div>,
      minWidth: "100px",
      key: "registrationDate",
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box data-testid="drepList.registrationDateValue" component={"span"}>
            {formatDateTimeLocal(r.createdAt)}
          </Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <div data-testid="drepList.lastUpdatedTitle">{t("dreps.lastUpdated")}</div>,
      key: "lastUpdated",
      minWidth: "120px",
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box data-testid="drepList.lastUpdatedValue" component={"span"}>
            {formatDateTimeLocal(r.updatedAt)}
          </Box>
        </DatetimeTypeTooltip>
      )
    }
  ];
  return (
    <>
      <Table
        {...fetchData}
        data-testid="drepList.table"
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
      <ActionMetadataModalConfirm onClose={() => setMetadataUrl("")} open={!!metadataUrl} anchorUrl={metadataUrl} />
    </>
  );
};

export default DrepsList;
