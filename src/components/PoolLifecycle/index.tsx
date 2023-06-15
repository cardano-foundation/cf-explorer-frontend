import { useState } from "react";
import { Box, CircularProgress, IconButton, styled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { lowerCase, startCase } from "lodash";

import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { DownloadGreenIcon } from "src/commons/resources";
import { defaultAxiosDownload } from "src/commons/utils/axios";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledBox } from "src/components/StakekeySummary/styles";

export const EVENTS: { [key in keyof IPoolReportList]?: string } = {
  eventDeregistration: "deregistration",
  eventPoolUpdate: "pool_update",
  eventRegistration: "registration",
  eventReward: "reward",
  isPoolSize: "poolSize"
};

export function getPoolEventList(data: IPoolReportList) {
  return Object.entries(EVENTS)
    .map(([key, value]) => (data[key as keyof typeof data] ? value : null))
    .filter((item) => item);
}

export function getPoolEventType(data: any) {
  const events = {
    eventDeregistration: false,
    eventPoolUpdate: false,
    eventRegistration: false,
    eventReward: false
  };
  for (const key in events) {
    events[key as keyof typeof events] = data.includes(EVENTS[key as keyof typeof EVENTS]);
  }
  return events;
}

const PoolLifecycle = () => {
  const history = useHistory();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number }>({ page: 0, size: 50 });
  const [onDownload, setOnDownload] = useState<number | false>(false);

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "CSV") => {
    setOnDownload(reportId);
    defaultAxiosDownload
      .get(`${API.REPORT.DOWNLOAD_POOL_SUMMARY(reportId)}?exportType=${typeExport}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.${typeExport === "CSV" ? "csv" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => {
        //To do
      })
      .finally(() => {
        setOnDownload(false);
      });
  };

  const columns: Column<IPoolReportList>[] = [
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
          <StyledBox>
            <CustomTooltip title={`${data.reportName}`.replaceAll("-", " ")}>
              <span>{`${data.reportName}`.replaceAll("-", " ")}</span>
            </CustomTooltip>
          </StyledBox>
        );
      }
    },
    {
      key: "epoch",
      title: "Epoch Range",
      render(data) {
        return `Epoch ${data.epochRanges[0]} - Epoch ${data.epochRanges[1]}`;
      }
    },
    {
      key: "transfer",
      title: "Pool Size",
      render(data) {
        return data.isPoolSize ? "Yes" : "No";
      }
    },
    {
      key: "event",
      title: "Events",
      maxWidth: "200px",
      render(data) {
        return getPoolEventList(data)
          .map((event: string | null) => startCase(lowerCase(event?.replaceAll("_", " "))))
          .join(", ");
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
      maxWidth: "30px",
      minWidth: "30px",
      render(data) {
        return (
          <Box width="100%" textAlign="center">
            {onDownload === data.reportId ? (
              <CircularProgress size={22} color="primary" />
            ) : data.status === "GENERATED" ? (
              <Box
                component={IconButton}
                display={"block"}
                margin="auto"
                disabled={data.status !== "GENERATED"}
                textTransform={"capitalize"}
                onClick={() => downloadFn(data.reportId, data.reportName, "EXCEL")}
              >
                <CustomIcon icon={DownloadGreenIcon} width={24} />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        );
      }
    }
  ];

  const fetchData = useFetchList<IPoolReportList>(API.REPORT.POOL_REPORT_SUMMARY, {
    page,
    size
  });

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Pool life cycle summary", count: fetchData.total }}
        onClickRow={(e, row) => history.push(details.generated_pool_detail(row.reportId))}
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

export default PoolLifecycle;

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
