import { useState } from "react";
import Table, { Column } from "../commons/Table";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import { Box } from "@mui/material";
import moment from "moment";
import { TextOverFlow } from "../StakingLifeCycle/DelegatorLifecycle/ReportComposerModal/styles";
import { DownloadGreenIcon } from "../../commons/resources";
import { lowerCase, startCase } from "lodash";
import { defaultAxiosDownload } from "../../commons/utils/axios";
import { useHistory } from "react-router-dom";
import { details } from "../../commons/routers";


const EVENTS:{[key in keyof IReportStaking]?: string} = {
  eventDelegation: "Delegation",
  eventDeregistration: "Deregistration",
  eventRegistration: "Registration",
  eventRewards: "Rewards",
  eventWithdrawal: "Withdrawal",
};

export function getEventList(data: any) {
  return Object.entries(EVENTS)
    .map(([key, value]) => (data[key] ? value : null))
    .filter(item => item);
}

const StakekeySummary = () => {
  const history = useHistory();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>({
    page: 0,
    size: 10,
    sort: "id,desc",
  });
  const [sort, setSort] = useState<string>("id,desc");

  const downloadFn = async (reportId: number, fileName: string) => {
    defaultAxiosDownload.get(API.REPORT.DOWNLOAD_STAKE_KEY_SUMMARY(reportId)).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const columns: Column<IStakeKeySummary>[] = [
    {
      key: "name",
      title: "Report Name",
      maxWidth: "300px",
      render(data, index) {
        return <TextOverFlow>{data.reportName}</TextOverFlow>;
      },
    },
    {
      key: "date",
      title: "Date range",
      render(data, index) {
        return `${moment(data.fromDate).format("MM/DD/yyyy")} - ${moment(data.toDate).format("MM/DD/yyyy")}`;
      },
    },
    {
      key: "transfer",
      title: "ADA Transfer",
      render(data, index) {
        return data.isADATransfer ? "Yes" : "No";
      },
    },
    {
      key: "feePaid",
      title: "Fee paid",
      render(data, index) {
        return data.isFeesPaid ? "Yes" : "No";
      },
    },
    {
      key: "event",
      title: "Events",
      maxWidth: "200px",
      render(data, index) {
        return getEventList(data).join(", ");
      },
    },
    {
      key: "download",
      title: "",
      maxWidth: "30px",
      render(data, index) {
        return <DownloadGreenIcon onClick={() => downloadFn(data.id, data.reportName)} />;
      },
    },
  ];

  const fetchData = useFetchList<IStakeKeySummary>(API.REPORT.STAKE_KEY_SUMMARY, {
    page,
    size,
    sort,
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
          onChange: (page, size) => setPagi({ page: page - 1, size }),
        }}
      />
    </Box>
  );
};

export default StakekeySummary;
