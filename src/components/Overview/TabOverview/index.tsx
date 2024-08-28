import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, ParsedQs, stringify } from "qs";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

import { Column } from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { formatDateLocal, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import { actionTypeListDrep } from "src/components/commons/CardGovernanceVotes";
import { STATUS_OVERVIEW } from "src/commons/utils/constants";

import { ContainerTab, StyledLink, StyledTable } from "./styles";
interface Query {
  actionStatus: string | string[] | ParsedQs | ParsedQs[] | undefined;
  page: number;
  size: number;
}
export const statusOverview = [
  { value: STATUS_OVERVIEW.OPEN_BALLOT, text: t("overview.status.active") },
  { value: STATUS_OVERVIEW.EXPIRED, text: t("overview.status.expired") },
  { value: STATUS_OVERVIEW.ENACTED, text: t("overview.status.enacted") },
  { value: STATUS_OVERVIEW.RATIFIED, text: t("overview.status.accepted") }
];

export default function TabOverview() {
  const { pageInfo } = usePageInfo();
  const { search } = useLocation<{ fromPath?: SpecialPath }>();
  const { t } = useTranslation();
  const history = useHistory();
  const theme = useTheme();

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
    setQuery({
      actionStatus: value,
      page: 1,
      size: 50
    });
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
      render: (r) => <Box>{r?.govActionName ?? t("N/A")}</Box>
    },
    {
      title: <Box component={"span"}>Governance ID</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => (
        <Box>
          <CustomTooltip title={r.txHash}>
            <StyledLink to={details.overviewGovernanceAction(r.txHash, r.index.toString())}>
              {getShortHash(r.txHash)}
            </StyledLink>
          </CustomTooltip>
        </Box>
      )
    },
    {
      title: <Box component={"span"}>Governance Type</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{actionTypeListDrep.find((el) => el.value === r.type)?.text}</Box>
    },
    {
      title: <Box component={"span"}>Status</Box>,
      key: "overview",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{statusOverview.find((el) => el.value === r.status)?.text}</Box>
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
              history.replace({ search: stringify({ actionStatus: value, page, size }) });
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
            <TabList
              sx={{ borderBottom: theme.mode === "light" ? "1px solid #d6e2ff" : "1px solid #6c6f89" }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              onChange={handleChange}
              aria-label=""
            >
              {TabTable.map((el) => {
                return (
                  <Tab
                    sx={{
                      color: theme.mode === "light" ? "#50596D" : "#D6E2FF",
                      textTransform: "none",
                      padding: "16.5px 47px",
                      fontSize: "16px",
                      "&.Mui-selected": {
                        color: theme.mode === "light" ? "#0033AD" : "#66BDFF"
                      }
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
