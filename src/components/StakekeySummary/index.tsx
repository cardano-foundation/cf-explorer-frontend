import { useState } from "react";
import Table, { Column } from "../commons/Table";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import { Box, IconButton, styled } from "@mui/material";
import moment from "moment";
import { defaultAxiosDownload } from "../../commons/utils/axios";
import { useHistory } from "react-router-dom";
import { details } from "../../commons/routers";
import CustomIcon from "../commons/CustomIcon";
import { DownloadGreenIcon } from "~/commons/resources";
import { formatDateTimeLocal } from "~/commons/utils/helper";
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

const StakekeySummary = () => {
  const history = useHistory();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>({
    page: 0,
    size: 50,
    sort: "id,desc"
  });
  const [sort, setSort] = useState<string>("id,desc");

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "CSV") => {
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
      .catch((e) => {
        //To Do
        console.log(e);
      });
  };

  const columns: Column<IReportStaking>[] = [
    {
      title: "Timestamp",
      key: "createdAt",
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
          <CustomTooltip title={`${data.reportName}.replaceAll("-", " ")`}>
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
      title: "ADA Transfer",
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
      title: "Status",
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
        return data.status === "GENERATED" ? (
          <Box width='100%' textAlign='center'>
            <Box
              component={IconButton}
              display={"block"}
              disabled={data.status !== "GENERATED"}
              margin='auto'
              textTransform={"capitalize"}
              onClick={() => downloadFn(data.id, data.reportName, "EXCEL")}
            >
              <CustomIcon icon={DownloadGreenIcon} width={24} />
            </Box>
          </Box>
        ) : (
          <></>
        );
      }
    }
  ];

  const fetchData = useFetchList<IStakeKeySummary>(API.REPORT.STAKE_KEY_SUMMARY, {
    page,
    size,
    sort
  });

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Stake key summary", count: fetchData.total }}
        onClickRow={(e, row) => history.push(details.generated_staking_detail(row.id))}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size })
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
        return theme.palette.error.light;
      case "GENERATED":
        return theme.palette.success.light;
      case "IN_PROGRESS":
        return theme.palette.warning.light;
      default:
        return theme.palette.success.light;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error.main;
      case "GENERATED":
        return theme.palette.success.main;
      case "IN_PROGRESS":
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  }};
`;
