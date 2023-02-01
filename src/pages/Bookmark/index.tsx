import { TabContext, TabList, TabPanel, LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tab,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useFetchList from "../../commons/hooks/useFetchList";
import { Column } from "../../types/table";
import { StyledTable, TitleTab } from "./Styles";
import { ReactComponent as DeleteBookmark } from "../../commons/resources/icons/deleteBookmark.svg";
import { authAxios } from "../../commons/utils/axios";
import { Link } from "react-router-dom";
import { details } from "../../commons/routers";
import Toast from "../../components/commons/Toast";
import { getShortHash, getShortWallet } from "../../commons/utils/helper";
import { useLocalStorage } from "react-use";

interface BookmarkIF {
  createdDate: string;
  id: number;
  keyword: string;
  type: "EPOCH";
}

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<BookMark[]>("bookmark", []);
  const [activeTab, setActiveTab] = useState("ADDRESS");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selected, setSelected] = useState<number | null>();

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage("");
  };
  const { data, loading, refesh, currentPage, error, total } = useFetchList<BookmarkIF>(
    "/bookmark/find-all",
    { type: activeTab, page: page - 1, size },
    true
  );

  const handleClose = () => {
    setSelected(null);
  };

  const deleteBookMark = async (id: number) => {
    try {
      setLoadingDelete(true);
      await authAxios.delete("/bookmark/delete/" + id);
      setSelected(null);
      setLoadingDelete(false);
      setBookmarks(bookmarks?.filter(r => r.id !== id));
      refesh();
      setMessage("Successfully!");
    } catch (error) {
      setSelected(null);
      setLoadingDelete(false);
      setMessage("Something went wrong!");
    }
  };
  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    document.title = `Bookmarks | Cardano Explorer`;
  }, []);

  const colDynamic: Record<string, Column<BookmarkIF>> = {
    ADDRESS: {
      title: "Address",
      key: "Address",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.address(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {getShortWallet(data.keyword)}
        </Box>
      ),
    },
    TRANSACTION: {
      title: "Tnx Hash",
      key: "Transaction",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.transaction(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {getShortHash(data.keyword)}
        </Box>
      ),
    },
    BLOCK: {
      title: "Block ID",
      key: "Block",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.block(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {data.keyword}
        </Box>
      ),
    },
    EPOCH: {
      title: "EPOCH #",
      key: "Epoch",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.epoch(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {data.keyword}
        </Box>
      ),
    },
    POOL: {
      title: "Pool ID",
      key: "Pool",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.delegation(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {data.keyword}
        </Box>
      ),
    },
    STAKE_KEY: {
      title: "Stake Key",
      key: "StakeKey",
      minWidth: 120,
      render: data => (
        <Box component={Link} to={details.stake(data.keyword)} color={props => `${props.colorBlue} !important`}>
          {getShortWallet(data.keyword)}
        </Box>
      ),
    },
  };
  const columns: Column<BookmarkIF>[] = [
    {
      ...colDynamic[activeTab as any],
    },
    {
      title: "Added On",
      key: "Added On",
      minWidth: 120,
      render: data => moment(data.createdDate).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      title: "Action",
      key: "Action",
      minWidth: 120,
      render: (data, index) => (
        <IconButton onClick={() => setSelected(data.id || 0)}>
          <DeleteBookmark fontSize={10} />
        </IconButton>
      ),
    },
  ];

  const tabs: {
    label: React.ReactNode;
    key: string;
    component: React.ReactNode;
  }[] = [
    {
      label: "Address",
      key: "ADDRESS",
      component: <StyledTable error={error} columns={columns} data={data || []} loading={loading} />,
    },
    {
      label: "Transaction",
      key: "TRANSACTION",
      component: <StyledTable error={error} columns={columns} data={data || []} loading={loading} />,
    },
    {
      label: "Block",
      key: "BLOCK",
      component: <StyledTable error={error} columns={columns} data={data || []} loading={loading} />,
    },
    {
      label: "Epoch",
      key: "EPOCH",
      component: (
        <Box overflow={"auto"} height={"600px"}>
          <StyledTable
            total={{ title: "Total", count: total }}
            pagination={{
              page: currentPage,
              size: 10,
              total: total,
              onChange: (page, size) => {
                setPage(page);
                setSize(size);
              },
            }}
            columns={columns}
            data={data || []}
            error={error}
            loading={loading}
          />
        </Box>
      ),
    },
    {
      label: "Pool",
      key: "POOL",
      component: <StyledTable error={error} columns={columns} data={data || []} loading={loading} />,
    },
    {
      label: "Stake Key",
      key: "STAKE_KEY",
      component: <StyledTable error={error} columns={columns} data={data || []} loading={loading} />,
    },
  ];

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs.map(({ key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <TitleTab pl={1} active={key === activeTab}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map(item => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>

      <Dialog open={!!selected}>
        <DialogTitle textAlign={"left"}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete {colDynamic[activeTab].title} {selected} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={loadingDelete}
            onClick={() => selected && deleteBookMark(selected)}
            variant="contained"
            color="error"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Toast
        open={!!message}
        onClose={handleCloseToast}
        messsage={message}
        severity={message.includes("successfully") ? "success" : "error"}
      />
    </Box>
  );
};

export default Bookmark;
