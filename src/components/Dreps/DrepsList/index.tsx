import { Box, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";
import { pickBy } from "lodash";
import moment from "moment";

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
import { DATETIME_PARTTEN } from "src/components/commons/CustomFilter/DateRangeModal";

import { PoolName, TopSearchContainer } from "./styles";
import DrepFilter from "../DrepFilter";

const DrepsList: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const theme = useTheme();
  const { pageInfo, setSort } = usePageInfo();
  const [metadataUrl, setMetadataUrl] = useState("");
  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const handleBlankSort = () => {
    history.replace({ search: stringify({ ...pageInfo, page: 1, sort: undefined }) });
  };
  const timeZone = localStorage.getItem("userTimezone")
    ? `${localStorage.getItem("userTimezone")}` === "utc"
      ? "UTC"
      : localStorage.getItem("userTimezone") || "UTC"
    : sessionStorage.getItem("timezone")?.replace(/"/g, "") || "UTC";

  const fetchData = useFetchList<Drep>(
    API.DREPS_LIST.DREPS_LIST,
    {
      ...pickBy(
        {
          ...pageInfo,
          fromDate: pageInfo?.fromDate
            ? moment
                .utc(pageInfo?.fromDate)
                .subtract(timeZone == "UTC" ? 0 : moment().utcOffset(), "minutes")
                .format(DATETIME_PARTTEN)
            : "",
          toDate: pageInfo?.toDate
            ? moment
                .utc(pageInfo?.toDate)
                .subtract(timeZone == "UTC" ? 0 : moment().utcOffset(), "minutes")
                .format(DATETIME_PARTTEN)
            : ""
        },
        (value) => value !== "" && value !== undefined
      )
    },
    false,
    blockKey
  );

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
      key: "activeVoteStake",
      minWidth: "120px",
      render: (r) => (
        <Box data-testid="drepList.activeStakeValue" component={"span"}>
          {r.activeVoteStake != null ? formatADAFull(r.activeVoteStake) : t("common.N/A")}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box data-testid="drepList.votingPowerTitle" component={"span"}>
          {t("dreps.votingPower")}
        </Box>
      ),
      minWidth: "120px",
      key: "votingPower",
      render: (r) =>
        r.votingPower != null ? (
          <Box data-testid="drepList.votingPowerValue" component={"span"} mr={1}>
            {formatPercent(r.votingPower / 100) || `0%`}
          </Box>
        ) : (
          t("common.N/A")
        ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
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
      title: (
        <Box data-testid="drepList.registrationDateTitle" component={"span"}>
          {t("dreps.registrationDate")}
        </Box>
      ),
      minWidth: "100px",
      key: "createdAt",
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box data-testid="drepList.registrationDateValue" component={"span"}>
            {formatDateTimeLocal(r.createdAt)}
          </Box>
        </DatetimeTypeTooltip>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    },
    {
      title: (
        <Box data-testid="drepList.lastUpdatedTitle" component={"span"}>
          {t("dreps.lastUpdated")}
        </Box>
      ),
      key: "updatedAt",
      minWidth: "120px",
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box data-testid="drepList.lastUpdatedValue" component={"span"}>
            {formatDateTimeLocal(r.updatedAt)}
          </Box>
        </DatetimeTypeTooltip>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : handleBlankSort();
      }
    }
  ];
  return (
    <>
      <TopSearchContainer
        sx={{
          justifyContent: "end",
          [theme.breakpoints.down("sm")]: {
            alignItems: "flex-end"
          }
        }}
      >
        <Box display="flex" gap="10px">
          <DrepFilter />
        </Box>
      </TopSearchContainer>
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
