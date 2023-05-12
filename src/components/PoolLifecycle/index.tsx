import { useState } from "react";
import Table, { Column } from "../commons/Table";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import { Box, Button, CircularProgress } from "@mui/material";
import { TextOverFlow } from "../StakingLifeCycle/DelegatorLifecycle/ReportComposerModal/styles";
import { DownloadGreenIcon } from "../../commons/resources";
import { lowerCase, startCase } from "lodash";
import { defaultAxiosDownload } from "../../commons/utils/axios";
import { useHistory } from "react-router-dom";
import { details } from "../../commons/routers";

// Registration, Deregistration, Protocol Update,...
export const EVENTS: { [key in keyof IPoolReportList]?: string } = {
  isDeregistration: "deregistration",
  isPoolUpdate: "pool_update",
  isRegistration: "registration",
  isReward: "reward",
  isPoolSize: "poolSize",
};

export function getPoolEventList(data: IPoolReportList) {
  return Object.entries(EVENTS)
    .map(([key, value]) => (data[key as keyof typeof data] ? value : null))
    .filter(item => item);
}

export function getPoolEventType(data: any) {
  let events = {
    isDeregistration: false,
    isPoolUpdate: false,
    isRegistration: false,
    isReward: false,
  };
  for (let key in events) {
    events[key as keyof typeof events] = data.includes(EVENTS[key as keyof typeof EVENTS]);
  }
  return events;
}

const PoolLifecycle = () => {
  const history = useHistory();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
  const [onDownload, setOnDownload] = useState<number | false>(false);

  const downloadFn = async (reportId: number, fileName: string, typeExport: "CSV" | "EXCEL" = "CSV") => {
    setOnDownload(reportId);
    defaultAxiosDownload
      .get(`${API.REPORT.DOWNLOAD_POOL_SUMMARY(reportId)}?exportType=${typeExport}`)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.${typeExport === "CSV" ? "csv" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => {
        setOnDownload(false);
      });
  };

  const columns: Column<IPoolReportList>[] = [
    {
      key: "name",
      title: "Report Name",
      maxWidth: "300px",
      render(data) {
        return <TextOverFlow>{data.reportName}</TextOverFlow>;
      },
    },
    {
      key: "epoch",
      title: "Epoch Range",
      render(data) {
        return `Epoch ${data.epochRanges[0]} - Epoch ${data.epochRanges[1]}`;
      },
    },
    {
      key: "transfer",
      title: "Pool Size",
      render(data) {
        return data.isPoolSize ? "Yes" : "No";
      },
    },
    {
      key: "feePaid",
      title: "Fees Paid",
      render(data) {
        return data.isFreePaid ? "Yes" : "No";
      },
    },
    {
      key: "event",
      title: "Events",
      maxWidth: "200px",
      render(data) {
        return getPoolEventList(data)
          .map((event: string | null) => startCase(lowerCase(event?.replaceAll("_", " "))))
          .join(", ");
      },
    },
    {
      key: "download",
      title: "",
      render(data, index) {
        return onDownload === data.reportId ? (
          <CircularProgress size={22} color="primary" />
        ) : (
          <Box textAlign={"right"} key={index} display={"flex"}>
            <Box
              component={Button}
              display={"block"}
              textTransform={"capitalize"}
              onClick={() => {
                downloadFn(data.reportId, data.reportName, "CSV");
              }}
            >
              Export CSV
            </Box>
            <Box
              ml={2}
              component={Button}
              display={"block"}
              textTransform={"capitalize"}
              onClick={() => downloadFn(data.reportId, data.reportName, "EXCEL")}
            >
              Export Excel
            </Box>
          </Box>
        );
      },
    },
  ];

  const fetchData = useFetchList<IPoolReportList>(API.REPORT.POOL_REPORT_SUMMARY, {
    page,
    size,
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
          onChange: (page, size) => setPagi({ page: page - 1, size }),
        }}
      />
    </Box>
  );
};

export default PoolLifecycle;
