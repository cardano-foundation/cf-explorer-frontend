import React from "react";
import DashboardCard from "../../components/DashboardCard";
import {  DownloadButtonAll, GridContainer } from "./styles";
import Table, { Column } from "../../components/commons/Table";
import {
  FilterIC,
  PersionalSettingIC,
  ScanQRCodeIC,
  ListOfReportsIC,
  WatchlistIC,
  DownloadBlueIC,
  DownloadWhiteIC,
} from "../../commons/resources";
import { useDumyData } from "./dumy-data";
import { Container, Grid, IconButton, Link } from "@mui/material";

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
  },
  {
    icon: <WatchlistIC />,
    title: "Watchlist",
    subtitle: "Lifecycle events",
  },
];

const columns: Column<SavedReport>[] = [
  {
    title: "Timestamp",
    key: "timestamp",
    minWidth: "50px",
    render(data) {
      return data.timestamp.toString();
    },
  },
  {
    title: "Entity",
    key: "entity",
    minWidth: "150px",
    render(data) {
      return data.entity;
    },
  },
  {
    title: "Status",
    key: "status",
    minWidth: "100px",
    render(data) {
      return data.status ? "Generated" : "Generated";
    },
  },
  {
    key: "downloadUrl",
    render(data) {
      return (
        <Link href={data.downloadUrl}>
          <IconButton>
            <DownloadBlueIC />
          </IconButton>
        </Link>
      );
    },
  },
];

export const filterOtions = [
  {
    value: 1,
    icon: <FilterIC />,
    label: "Latest - First",
  },
  {
    value: 2,
    icon: <FilterIC />,
    label: "First - Latest",
  },
  {
    value: 3,
    icon: <FilterIC />,
    label: "Date range",
  },
  {
    value: 4,
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
  const { data, totalItems } = useDumyData();
  return (
    <Container>
      <GridContainer container spacing={2} columns={12}>
        {cardList.map(card => (
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard key={card.title} leftIcon={card.icon} title={card.title} subtitle={card.subtitle} />
          </Grid>
        ))}
      </GridContainer>
      <Table
        isShowingResult
        fliterOptions={filterOtions}
        onFilterChange={(value, option) => console.log({ value, option })}
        tableTitle="Saved reports"
        selectable={true}
        columns={columns}
        data={data}
        total={{ count: totalItems, title: "stacking lifecycle" }}
        pagination={{
          page: 1,
          size: 20,
          total: totalItems,
        }}
        renderAction={(items, clear) => (
          <DownloadButtonAll startIcon={<DownloadWhiteIC />} variant="contained" onClick={clear}>
            Download All
          </DownloadButtonAll>
        )}
      ></Table>
    </Container>
  );
};

export default Dashboard;
