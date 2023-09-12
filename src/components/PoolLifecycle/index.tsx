import React, { useState } from "react";
import { Box, CircularProgress, IconButton, styled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { lowerCase, startCase } from "lodash";
import { useTranslation } from "react-i18next";

import Table, { Column } from "src/components/commons/Table";
import { FetchReturnType } from "src/commons/hooks/useFetchList";
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
export interface IPoolLifecycleProps {
  fetchData: FetchReturnType<IPoolReportList>;
  pagination: { page: number; size: number };
  onSort?: (sort?: string) => void;
  onPagination?: ({ page, size }: { page: number; size: number }) => void;
}
const PoolLifecycle: React.FC<IPoolLifecycleProps> = ({ onSort, fetchData, pagination, onPagination }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [onDownload, setOnDownload] = useState<number | false>(false);

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "EXCEL") => {
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
      title: t("createdAt"),
      key: "createdAt",
      render(data) {
        return formatDateTimeLocal(data.createdAt);
      },
      sort({ sortValue }) {
        onSort?.(sortValue ? `id,${sortValue}` : "");
      }
    },
    {
      key: "name",
      title: t("common.reportName"),
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
      key: "epoch",
      title: t("glossary.epochRnage"),
      render(data) {
        return `Epoch ${data.epochRanges[0]} - Epoch ${data.epochRanges[1]}`;
      }
    },
    {
      key: "transfer",
      title: t("common.poolSize"),
      render(data) {
        return data.isPoolSize ? t("common.yes") : t("common.no");
      }
    },
    {
      key: "event",
      title: t("report.events"),
      maxWidth: "200px",
      render(data) {
        return getPoolEventList(data)
          .map((event: string | null) => startCase(lowerCase(event?.replaceAll("_", " "))))
          .join(", ");
      }
    },
    {
      title: t("common.exportingReport"),
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
  const { page, size } = pagination;
  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: t("report.PoolSummary"), count: fetchData.total }}
        onClickRow={(e, row) => history.push(details.generated_pool_detail(row.reportId))}
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
