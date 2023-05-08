import React, { useCallback, useMemo, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import { Status, GridContainer, TextHeadline } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import {
  FilterIC,
  PersionalSettingIC,
  ScanQRCodeIC,
  ListOfReportsIC,
  WatchlistIC,
  DownloadBlueIC,
} from "../../commons/resources";
import { Box, CircularProgress, Container, Grid, IconButton } from "@mui/material";
import { details, routers } from "../../commons/routers";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import { defaultAxiosDownload } from "../../commons/utils/axios";
import moment from "moment";
import { WrapFilterDescription } from "../../components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import FilterReport from "../../components/FilterReport";
import { useHistory } from "react-router-dom";

const cardList = [
  {
    icon: <PersionalSettingIC />,
    title: "Personal settings",
    subtitle: "Your personal experience",
  },
  {
    icon: <ScanQRCodeIC />,
    title: "Scan QR code",
    subtitle: "Scan a QR code",
  },
  {
    icon: <ListOfReportsIC />,
    title: "List of reports",
    subtitle: "Reports you can view",
    to: routers.REPORT_GENERATED,
  },
  {
    icon: <WatchlistIC />,
    title: "Watchlist",
    subtitle: "Lifecycle events",
  },
];

export const filterOtions = [
  {
    value: "id,desc",
    icon: <FilterIC />,
    label: "Latest - First",
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "First - Latest",
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "Date range",
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "Search transaction",
  },
];

export interface SavedReport {
  timestamp: Date | string;
  entity: string;
  status: number;
  downloadUrl: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [onDownload, setOnDownload] = useState<number | false>(false);
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>({
    page: 0,
    size: 10,
  });
  const [params, setParams] = useState<any>({
    sort: undefined,
    toDate: undefined,
    fromDate: undefined,
    reportName: undefined,
  });

  const fetchData = useFetchList<IStakeKeySummary>(API.REPORT.DASHBOARD, {
    page,
    size,
    ...params,
  });

  const handleRowClick = (e: React.MouseEvent<Element, MouseEvent>, row: any) => {
    if(row.stakeKeyReportId) history.push(details.generated_staking_detail(row.stakeKeyReportId));
    else if(row.poolReportId) history.push(details.generated_pool_detail(row.poolReportId));
  }

  const downloadReportDashboard = useCallback(async (reportId: number, fileName: string) => {
    setOnDownload(reportId);
    defaultAxiosDownload
      .get(API.REPORT.DOWNLOAD_STAKE_KEY_SUMMARY(reportId))
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => {
        setOnDownload(false);
      });
  }, []);

  const columns: Column<IDashboardResponse>[] = [
    {
      title: "Timestamp",
      key: "createdAt",
      minWidth: "50px",
      render(data) {
        return data.createdAt;
      },
    },
    {
      title: "Report name",
      key: "entity",
      minWidth: "150px",
      render(data) {
        return data.reportName;
      },
    },
    {
      title: "Status",
      key: "status",
      minWidth: "100px",
      render(data) {
        return <Status status={data.status}>{data.status}</Status>;
      },
    },
    {
      key: "downloadUrl",
      render(data) {
        return onDownload === data.id ? (
          <CircularProgress size={22} color="primary" />
        ) : (
          <IconButton onClick={() => downloadReportDashboard(data.id, data.reportName)}>
            <DownloadBlueIC />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container>
      <GridContainer container spacing={2} columns={12}>
        {cardList.map(card => (
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard
              key={card.title}
              leftIcon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              to={card.to}
            />
          </Grid>
        ))}
      </GridContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextHeadline>Saved Reports</TextHeadline>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {fetchData.total} {fetchData.total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <FilterReport
            filterValue={params}
            onFilterValueChange={params => {
              const { sort, toDate, fromDate, txHash } = params;
              let body: any = {};
              if (sort) {
                body.sort = params?.sort?.replace("time", "id");
              }
              if (toDate) {
                body.toDate = moment(params?.toDate).format("yyyy/MM/DD");
              }
              if (fromDate) {
                body.fromDate = moment(params?.fromDate).format("yyyy/MM/DD");
              }
              if (txHash) {
                body.reportName = txHash;
              }
              setParams(body);
            }}
          />
        </Box>
      </Box>
      <Table
        isShowingResult={false}
        {...fetchData}
        columns={columns}
        total={{ title: "Dashboard summary", count: fetchData.total }}
        onClickRow={(e, row) => handleRowClick(e, row)}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size }),
        }}
      />
    </Container>
  );
};

export default Dashboard;
