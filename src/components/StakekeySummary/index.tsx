import { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress, IconButton, styled } from "@mui/material";

import { FetchReturnType } from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { defaultAxiosDownload } from "src/commons/utils/axios";
import { details } from "src/commons/routers";
import { DownloadGreenIcon } from "src/commons/resources";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import Table, { Column } from "../commons/Table";
import CustomIcon from "../commons/CustomIcon";
import CustomTooltip from "../commons/CustomTooltip";
import { StyledBox } from "./styles";

export const EVENTS: { [key in keyof IReportStaking]?: string } = {
  eventDelegation: "Delegation",
  eventDeregistration: "Deregistration",
  eventRegistration: "Registration",
  eventRewards: "Rewards",
  eventWithdrawal: "Withdrawal"
};

export function getEventList(data: IReportStaking) {
  return Object.entries(EVENTS)
    .map(([key, value]) => (data[key as keyof typeof data] ? value : null))
    .filter((item) => item);
}

export function getEventType(data: any) {
  const events = {
    eventDelegation: false,
    eventDeregistration: false,
    eventRegistration: false,
    eventRewards: false,
    eventWithdrawal: false
  };
  for (const key in events) {
    events[key as keyof typeof events] = data.includes(EVENTS[key as keyof typeof EVENTS]?.toUpperCase());
  }
  return events;
}

interface IStakekeySummaryProps {
  fetchData: FetchReturnType<IStakeKeySummary>;
  pagination: { page: number; size: number };
  onSort?: (sort?: string) => void;
  onPagination?: ({ page, size }: { page: number; size: number }) => void;
}

const StakekeySummary: React.FC<IStakekeySummaryProps> = ({ fetchData, onSort, pagination, onPagination }) => {
  const history = useHistory();

  const [downloadingReport, setDownloadingReport] = useState<number>();

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "EXCEL") => {
    setDownloadingReport(reportId);
    defaultAxiosDownload
      .get(`${API.REPORT.DOWNLOAD_STAKE_KEY_SUMMARY(reportId)}?exportType=${typeExport}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.${typeExport === "CSV" ? "csv" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => {
        // Todo: handle error
      })
      .finally(() => setDownloadingReport(undefined));
  };

  const columns: Column<IReportStaking>[] = [
    {
      title: "Created At",
      key: "createdAt",
      sort({ sortValue }) {
        onSort?.(sortValue ? `id,${sortValue}` : "");
      },
      render(data) {
        return formatDateTimeLocal(data.createdAt);
      }
    },
    {
      key: "name",
      title: "Report Name",
      maxWidth: "300px",
      render(data) {
        return (
          <CustomTooltip title={`${data.reportName}`.replaceAll("-", " ")}>
            <StyledBox>{`${data.reportName}`.replaceAll("-", " ")}</StyledBox>
          </CustomTooltip>
        );
      }
    },
    {
      key: "date",
      title: "Date Range",
      render(data) {
        return `${moment(data.fromDate).format("MM/DD/yyyy")} - ${moment(data.toDate).format("MM/DD/yyyy")}`;
      }
    },
    {
      key: "transfer",
      title: "ADA Transfers",
      render(data) {
        return data.isADATransfer ? "Yes" : "No";
      }
    },
    {
      key: "event",
      title: "Events",
      maxWidth: "200px",
      render(data) {
        return getEventList(data).join(", ");
      }
    },
    {
      title: "Exporting Report",
      key: "status",
      minWidth: "100px",
      render(data) {
        return <Status status={data.status}>{data?.status.replace("_", " ")}</Status>;
      }
    },
    {
      key: "download",
      title: "",
      maxWidth: "50px",
      minWidth: "50px",
      render(data) {
        return (
          <Box width="100%" textAlign="right">
            {downloadingReport === data.id ? (
              <CircularProgress size={22} color="primary" />
            ) : data.status === "GENERATED" ? (
              <Box
                component={IconButton}
                textTransform={"capitalize"}
                onClick={() => downloadFn(data.id, data.reportName)}
              >
                <Box>
                  <CustomIcon icon={DownloadGreenIcon} width={24} />
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        );
      }
    }
  ];
  const { page, size } = pagination;
  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Stake address summary", count: fetchData.total }}
        onClickRow={(e, row) => history.push(details.generated_staking_detail(row.id))}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => onPagination?.({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default StakekeySummary;

const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error[100];
      case "GENERATED":
        return theme.palette.success[100];
      case "IN_PROGRESS":
        return theme.palette.warning[100];
      default:
        return theme.palette.success[100];
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error[700];
      case "GENERATED":
        return theme.palette.success[800];
      case "IN_PROGRESS":
        return theme.palette.warning[800];
      default:
        return theme.palette.success[800];
    }
  }};
`;
