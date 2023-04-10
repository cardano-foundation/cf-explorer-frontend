import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Dialog, DialogActions, DialogContentText, IconButton, Tab } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useFetchList from "../../commons/hooks/useFetchList";
import { Column } from "../../types/table";
import { CancelButton, DeleteButton, StyledTable, TitleTab } from "./Styles";
import { ReactComponent as DeleteBookmark } from "../../commons/resources/icons/deleteBookmark.svg";
import { ReactComponent as QuestionConfirm } from "../../commons/resources/icons/questionConfirm.svg";
import { Link } from "react-router-dom";
import { details } from "../../commons/routers";
import { getShortHash, getShortWallet } from "../../commons/utils/helper";
import { useLocalStorage } from "react-use";
import { deleteBookmark } from "../../commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "../../commons/utils/constants";
import useToast from "../../commons/hooks/useToast";
import { ButtonClose } from "../../components/ScriptModal/styles";
import { CloseIcon } from "../../commons/resources";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmark", []);
  const [activeTab, setActiveTab] = useState("ADDRESS");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [selected, setSelected] = useState<string | null>();
  const toast = useToast();

  const { data, loading, refresh, error, total } = useFetchList<Bookmark>(
    "/bookmark/find-all",
    {
      type: activeTab,
      page: page,
      size,
      network: NETWORK_TYPES[NETWORK],
    },
    true
  );

  const handleClose = () => {
    setSelected(null);
  };

  const deleteBookMark = async (keyword: string) => {
    try {
      setLoadingDelete(true);
      const selectedBookmark = data?.find(d => d.keyword === keyword);
      if (selectedBookmark?.id) {
        await deleteBookmark(selectedBookmark?.id);
        setSelected(null);
        setLoadingDelete(false);
        setBookmarks(bookmarks?.filter(r => r.keyword !== keyword));
        refresh();
        toast.success("Successfully!");
      }
    } catch (error) {
      setSelected(null);
      setLoadingDelete(false);
      toast.error("Something went wrong!");
    }
  };
  const handleChange = (event: React.SyntheticEvent, tab: Bookmark["type"]) => {
    setActiveTab(tab);
    setPage(0);
    setSize(10);
  };

  useEffect(() => {
    document.title = `Bookmarks | Cardano Explorer`;
  }, []);

  const colDynamic: Record<string, Column<Bookmark>> = {
    ADDRESS: {
      title: "Address",
      key: "Address",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.address(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {getShortWallet(data.keyword)}
        </Box>
      ),
    },
    TRANSACTION: {
      title: "Tnx Hash",
      key: "Transaction",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.transaction(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {getShortHash(data.keyword)}
        </Box>
      ),
    },
    BLOCK: {
      title: "Block ID",
      key: "Block",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.block(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {data.keyword}
        </Box>
      ),
    },
    EPOCH: {
      title: "EPOCH #",
      key: "Epoch",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.epoch(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {data.keyword}
        </Box>
      ),
    },
    POOL: {
      title: "Pool ID",
      key: "Pool",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.delegation(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {data.keyword}
        </Box>
      ),
    },
    STAKE_KEY: {
      title: "Stake Key",
      key: "StakeKey",
      minWidth: 120,
      render: data => (
        <Box
          component={Link}
          to={details.stake(data.keyword)}
          color={theme => `${theme.palette.secondary.main} !important`}
        >
          {getShortWallet(data.keyword)}
        </Box>
      ),
    },
  };
  const columns: Column<Bookmark>[] = [
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
      title: <Box textAlign={"right"}>Action</Box>,
      key: "Action",
      minWidth: 120,
      render: (data, index) => (
        <Box display="flex" justifyContent={"flex-end"}>
          <IconButton onClick={() => setSelected(data.keyword || "")}>
            <DeleteBookmark fontSize={10} />
          </IconButton>
        </Box>
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
      component: (
        <StyledTable
          error={error}
          total={{ title: "Total", count: total }}
          columns={columns}
          data={data || []}
          loading={loading}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      ),
    },
    {
      label: "Transaction",
      key: "TRANSACTION",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          total={{ title: "Total", count: total }}
          data={data || []}
          loading={loading}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      ),
    },
    {
      label: "Block",
      key: "BLOCK",
      component: (
        <StyledTable
          error={error}
          total={{ title: "Total", count: total }}
          columns={columns}
          data={data || []}
          loading={loading}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      ),
    },
    {
      label: "Epoch",
      key: "EPOCH",
      component: (
        <StyledTable
          total={{ title: "Total", count: total }}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
          columns={columns}
          data={data || []}
          error={error}
          loading={loading}
        />
      ),
    },
    {
      label: "Pool",
      key: "POOL",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          data={data || []}
          loading={loading}
          total={{ title: "Total", count: total }}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      ),
    },
    {
      label: "Stake Key",
      key: "STAKE_KEY",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          data={data || []}
          loading={loading}
          total={{ title: "Total", count: total }}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      ),
    },
  ];

  const renderIdSelected = (keyword: string) => {
    switch (activeTab) {
      case "TRANSACTION":
        return getShortHash(keyword);
      case "ADDRESS":
      case "STAKE_KEY":
        return getShortWallet(keyword);

      default:
        return keyword;
    }
  };

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: theme => `1px solid ${theme.palette.border.secondary}` }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{ sx: { style: { background: theme => theme.palette.primary.main } } }}
          >
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

      <Dialog
        open={!!selected}
        PaperProps={{
          style: { borderRadius: 20, width: 550 },
        }}
      >
        <ButtonClose disabled={loadingDelete} onClick={() => setSelected(null)}>
          <img src={CloseIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"center"} pt={5} pb={2}>
          <QuestionConfirm />
        </Box>
        <Box component={"h2"} textAlign={"center"} fontWeight={"bold"} fontSize={"1.125rem"} paddingBottom={"0px"}>
          Confirmation Required
        </Box>
        <Box px={2}>
          <DialogContentText fontSize={"1.125rem"}>
            Are you sure to remove {colDynamic[activeTab].title} {renderIdSelected(selected || "")} ?
          </DialogContentText>
        </Box>
        <DialogActions>
          <Box flex={1} pt={2} pb={3}>
            <CancelButton disabled={loadingDelete} autoFocus onClick={handleClose} variant="outlined">
              Cancel
            </CancelButton>
            <DeleteButton
              loading={loadingDelete}
              onClick={() => selected && deleteBookMark(selected)}
              variant="contained"
            >
              Continue
            </DeleteButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bookmark;
