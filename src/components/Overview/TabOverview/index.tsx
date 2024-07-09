import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, ParsedQs, stringify } from "qs";
import { useTranslation } from "react-i18next";

import { Column } from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatDateLocal, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { ContainerTab, StyledLink, StyledTable } from "./styles";
interface Query {
  actionStatus: string | string[] | ParsedQs | ParsedQs[] | undefined;
  page: number;
  size: number;
}
export default function TabOverview() {
  const { pageInfo } = usePageInfo();
  const { search } = useLocation<{ fromPath?: SpecialPath }>();
  const { t } = useTranslation();
  const history = useHistory();

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) });
  };
  const query = parse(search.split("?")[1]);
  const [value, setValue] = useState(query.actionStatus ? query.actionStatus : "OPEN_BALLOT");
  useEffect(() => {
    setQuery({
      actionStatus: value,
      page: query.page ? Number(query.page) : 1,
      size: query.size ? Number(query.size) : 50
    });
  }, [value]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const fetchData = useFetchList<OverViewDelegationTab>(
    API.GOVERNANCE_OVERVIEW.TAB,
    {
      ...pageInfo
    },
    false
  );
  const columns: Column<OverViewDelegationTab>[] = [
    {
      title: <Box component={"span"}>Governance Name</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box>{r.name ?? t("N/A")}</Box>
    },
    {
      title: <Box component={"span"}>Governance ID</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <CustomTooltip title={r.txHash}>
            <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
          </CustomTooltip>
        </Box>
      )
    },
    {
      title: <Box component={"span"}>Governance Type</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{mappingType(r.type)}</Box>
    },
    {
      title: <Box component={"span"}>Status</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{mappingStatus(r.status)}</Box>
    },
    {
      title: <Box component={"span"}>Date</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <DatetimeTypeTooltip>{formatDateLocal(r.createdAt)}</DatetimeTypeTooltip>
    }
  ];
  const TabTable = [
    {
      label: "Active",
      value: "OPEN_BALLOT",
      component: (
        <StyledTable
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ actionStatus: value, page, size }) });
            }
          }}
        />
      )
    },
    {
      label: "Accepted",
      value: "RATIFIED",
      component: (
        <StyledTable
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ actionStatus: value, page, size }) });
            }
          }}
        />
      )
    },
    {
      label: "Expired",
      value: "EXPIRED",
      component: (
        <StyledTable
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ actionStatus: value, page, size }) });
            }
          }}
        />
      )
    },
    {
      label: "Enacted",
      value: "ENACTED",
      component: (
        <StyledTable
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total", isDataOverSize: fetchData.isDataOverSize }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
            }
          }}
        />
      )
    }
  ];

  return (
    <ContainerTab>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value as string}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList variant="scrollable" scrollButtons allowScrollButtonsMobile onChange={handleChange} aria-label="">
              {TabTable.map((el) => {
                return (
                  <Tab
                    style={{
                      textTransform: "none",
                      padding: "16.5px 47px",
                      fontSize: "16px"
                    }}
                    key={el.value}
                    label={el.label}
                    value={el.value}
                  />
                );
              })}
            </TabList>
          </Box>
          {TabTable.map((el) => {
            return (
              <TabPanel style={{ padding: "0 24px " }} key={el.value} value={el.value}>
                {el.component}
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </ContainerTab>
  );
}

const mappingType = (ENUM: string) => {
  let type = "";
  switch (ENUM) {
    case "NO_CONFIDENCE":
      return (type = "No Confidence");

    case "UPDATE_COMMITTEE":
      return (type = "New Committee");

    case "HARD_FORK_INITIATION_ACTION":
      return (type = "Hard Fork");

    case "NEW_CONSTITUTION":
      return (type = "Update to the Constitution");

    case "PARAMETER_CHANGE_ACTION":
      return (type = "Protocol Parameter Change");

    case "TREASURY_WITHDRAWALS_ACTION":
      return (type = "Treasury Withdrawals");

    case "INFO_ACTION":
      return (type = "Info Action");
  }
  return type;
};

const mappingStatus = (ENUM: string) => {
  let status = "";
  switch (ENUM) {
    case "OPEN_BALLOT":
      return (status = "No Confidence");

    case "RATIFIED":
      return (status = "Accepted");

    case "ENACTED":
      return (status = "Enacted");

    case "EXPIRED":
      return (status = "Expired");
  }
  return status;
};
