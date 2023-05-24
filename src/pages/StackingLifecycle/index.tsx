import { Box, CircularProgress, Container, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { useScreen } from "../../commons/hooks/useScreen";
import {
  DownloadGreenIcon,
  FilterIC,
  ListOfReportsIC,
  PersionalSettingIC,
  ScanQRCodeIC,
  WatchlistIC
} from "../../commons/resources";
import { details, routers } from "../../commons/routers";
import { API } from "../../commons/utils/api";
import { defaultAxiosDownload } from "../../commons/utils/axios";
import { formatDateTimeLocal } from "../../commons/utils/helper";
import DashboardCard from "../../components/DashboardCard";
import FilterReport from "../../components/FilterReport";
import { WrapFilterDescription } from "../../components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import { Column } from "../../components/commons/Table";
import {
  FilterHead,
  GridContainer,
  StackingLifecycleTable,
  Status,
  TextHeadline,
  TitleHead,
  WrapReportName
} from "./styles";
import CustomIcon from "~/components/commons/CustomIcon";
import CustomTooltip from "~/components/commons/CustomTooltip";

const cardList = [
  // {
  //   icon: <PersionalSettingIC />,
  //   title: "Personal settings",
  //   subtitle: "Your personal experience"
  // },
  // {
  //   icon: <ScanQRCodeIC />,
  //   title: "Scan QR code",
  //   subtitle: "Scan a QR code"
  // },
  {
    icon: <ListOfReportsIC />,
    title: "List of reports",
    subtitle: "Reports you can view",
    to: details.generated_report("stake-key")
  },
  {
    icon: <WatchlistIC />,
    title: "Watchlist",
    subtitle: "Lifecycle events",
    to: routers.STAKING_LIFECYCLE_SEARCH
  }
];

export const filterOtions = [
  {
    value: "id,desc",
    icon: <FilterIC />,
    label: "Latest - First"
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "First - Latest"
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "Date range"
  },
  {
    value: "id,asc",
    icon: <FilterIC />,
    label: "Search transaction"
  }
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
  const [sort, setSort] = useState<string>("");
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>({
    page: 0,
    size: 10
  });
  const [params, setParams] = useState<any>({
    sort: undefined,
    toDate: undefined,
    fromDate: undefined,
    reportName: undefined
  });
  const { data, ...fetchData } = useFetchList<IStakeKeySummary>(API.REPORT.DASHBOARD, {
    page,
    size,
    ...params,
    sort: sort || params.sort
  });

  useEffect(() => {
    document.title = "Saved Reports | Cardano Explorer";
  }, []);

  const { isMobile } = useScreen();
  const handleRowClick = (e: React.MouseEvent<Element, MouseEvent>, row: any) => {
    if (row.stakeKeyReportId) history.push(details.generated_staking_detail(row.stakeKeyReportId));
    else if (row.poolReportId) history.push(details.generated_pool_detail(row.poolReportId));
  };

  const downloadReportDashboard = async (
    reportId: number,
    fileName: string,
    type: "POOL_ID" | "STAKE_KEY",
    typeExport: "CSV" | "EXCEL" = "CSV"
  ) => {
    setOnDownload(reportId);

    defaultAxiosDownload
      .get(
        type === "STAKE_KEY"
          ? `${API.REPORT.DOWNLOAD_STAKE_KEY_SUMMARY(reportId)}?exportType=${typeExport}`
          : `${API.REPORT.DOWNLOAD_POOL_SUMMARY(reportId)}?exportType=${typeExport}`
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.${typeExport === "CSV" ? "csv" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        // To do
        console.log(e.message || "");
      })
      .finally(() => {
        setOnDownload(false);
      });
  };

  const columns: Column<IDashboardResponse>[] = [
    {
      title: "Timestamp",
      key: "createdAt",
      minWidth: isMobile ? "200px" : "50px",
      render(data) {
        return formatDateTimeLocal(data.createdAt);
      },
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Report name",
      key: "entity",
      minWidth: "150px",
      render(data) {
        if (data.reportName.length <= 20) {
          return <WrapReportName>{data.reportName}</WrapReportName>;
        }
        return (
          <CustomTooltip title={data.reportName}>
            <WrapReportName>{data.reportName}</WrapReportName>
          </CustomTooltip>
        );
      }
    },
    {
      title: "Status",
      key: "status",
      minWidth: "100px",
      render(data) {
        return <Status status={data.status}>{data.status}</Status>;
      }
    },
    {
      key: "downloadUrl",
      maxWidth: "30px",
      minWidth: "30px",
      render(data) {
        return (
          <Box width='100%' textAlign='right'>
            {onDownload === data.id ? (
              <CircularProgress size={22} color='primary' />
            ) : (
              <Box
                component={IconButton}
                textTransform={"capitalize"}
                onClick={() =>
                  downloadReportDashboard(
                    data.stakeKeyReportId ? data.stakeKeyReportId : data.poolReportId,
                    data.reportName,
                    data.type,
                    "EXCEL"
                  )
                }
              >
                <CustomIcon icon={DownloadGreenIcon} width={24} />
              </Box>
            )}
          </Box>
        );
      }
    }
  ];

  return (
    <Container>
      <GridContainer container spacing={2} columns={12}>
        {cardList.map((card, idx) => (
          <Grid item xs={6} md={6} lg={6} xl={6} key={idx}>
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
      <TitleHead>
        <TextHeadline>Saved Reports</TextHeadline>
        <FilterHead>
          <WrapFilterDescription>
            Showing {fetchData.total} {fetchData.total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <FilterReport
            filterValue={params}
            onFilterValueChange={(params) => {
              const { sort, toDate, fromDate, txHash } = params;
              const body: any = {};
              if (sort) {
                body.sort = params?.sort?.replace("time", "id");
              }
              if (toDate) {
                body.toDate = params?.toDate;
              }
              if (fromDate) {
                body.fromDate = params?.fromDate;
              }
              if (txHash) {
                body.reportName = txHash;
              }
              setParams(body);
            }}
          />
        </FilterHead>
      </TitleHead>
      <StackingLifecycleTable
        isShowingResult={false}
        {...fetchData}
        data={data || []}
        columns={columns}
        total={{ title: "Dashboard summary", count: fetchData.total }}
        onClickRow={(e, row) => handleRowClick(e, row)}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size })
        }}
      />
    </Container>
  );
};

export default Dashboard;
