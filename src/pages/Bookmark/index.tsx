import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Dialog, DialogActions, DialogContentText, IconButton, useTheme } from "@mui/material";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { IoMdClose } from "react-icons/io";

import useAuth from "src/commons/hooks/useAuth";
import useFetchList from "src/commons/hooks/useFetchList";
import useToast from "src/commons/hooks/useToast";
import DeleteBookmark from "src/commons/resources/icons/deleteBookmark.svg?react";
import QuestionConfirm from "src/commons/resources/icons/questionConfirm.svg?react";
import { details, routers } from "src/commons/routers";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { formatBlockHashById, getShortHash } from "src/commons/utils/helper";
import { deleteBookmark } from "src/commons/utils/userRequest";
import { ButtonClose } from "src/components/ScriptModal/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { Column } from "src/types/table";

import { CancelButton, DeleteButton, StyledTable, TitleTab, WrapTab } from "./Styles";

const Bookmark = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmark", []);
  const [activeTab, setActiveTab] = useState("ADDRESS");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [selected, setSelected] = useState<string | null>();
  const toast = useToast();

  const {
    data: dataTab,
    loading,
    refresh,
    error,
    total
  } = useFetchList<Bookmark>(
    "/bookmark/find-all",
    {
      type: activeTab,
      page: page,
      size,
      network: NETWORK_TYPES[NETWORK]
    },
    true
  );

  const [data, setData] = useState<Bookmark[]>([]);

  useEffect(() => {
    setData(dataTab);
  }, [dataTab]);

  useEffect(() => {
    setData([]);
  }, [activeTab]);

  const handleClose = () => {
    setSelected(null);
  };

  const deleteBookMark = async (keyword: string) => {
    try {
      setLoadingDelete(true);
      const selectedBookmark = data?.find((d) => d.keyword === keyword);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await deleteBookmark({ keyword, type: selectedBookmark?.type });
      if (res?.data) {
        setSelected(null);
        setLoadingDelete(false);
        setBookmarks(bookmarks?.filter((r) => r.keyword !== keyword));
        refresh();
        toast.success(t("message.bookmark.deleted"));
      } else {
        toast.error(t(res?.response?.data?.errorCode));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSelected(null);
      setLoadingDelete(false);
      if (error?.response?.data?.errorCode) {
        toast.error(t(error?.response?.data?.errorCode));
      }
    }
  };
  const handleChange = (event: React.SyntheticEvent, tab: Bookmark["type"]) => {
    setActiveTab(tab);
    setPage(0);
    setSize(50);
  };

  useEffect(() => {
    document.title = `${t("account.bookmark")} | ${t("head.page.dashboard")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace(routers.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  const heightTable = useMemo(() => {
    if (data) {
      if (data.length >= 10) return 650;
      if (data.length >= 6) return data.length * 68;
      return "unset";
    } else {
      return "unset";
    }
  }, [JSON.stringify(data)]);
  const colDynamic: Record<string, Column<Bookmark>> = {
    ADDRESS: {
      title: t("common.address"),
      key: "Address",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.address(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          <CustomTooltip title={data.keyword}>
            <Box component={"span"}>{getShortHash(data.keyword)}</Box>
          </CustomTooltip>
        </Box>
      )
    },
    TRANSACTION: {
      title: t("common.tnxHash"),
      key: "Transaction",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.transaction(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          <CustomTooltip title={data.keyword}>
            <Box component={"span"}>{getShortHash(data.keyword)}</Box>
          </CustomTooltip>
        </Box>
      )
    },
    BLOCK: {
      title: t("glossary.blockID"),
      key: "Block",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.block(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          {formatBlockHashById(data.keyword)}
        </Box>
      )
    },
    EPOCH: {
      title: `${t("epoch")} #`,
      key: "Epoch",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.epoch(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          {data.keyword}
        </Box>
      )
    },
    POOL: {
      title: t("glossary.poolId"),
      key: "Pool",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.delegation(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          <CustomTooltip title={data.keyword}>
            <Box component={"span"}>{getShortHash(data.keyword)}</Box>
          </CustomTooltip>
        </Box>
      )
    },
    STAKE_KEY: {
      title: t("common.stakeAddress"),
      key: "StakeKey",
      minWidth: 120,
      render: (data) => (
        <Box
          component={Link}
          to={details.stake(data.keyword)}
          color={(theme) => `${theme.palette.primary.main} !important`}
        >
          <CustomTooltip title={data.keyword}>
            <Box component={"span"}>{getShortHash(data.keyword)}</Box>
          </CustomTooltip>
        </Box>
      )
    }
  };
  const columns: Column<Bookmark>[] = [
    {
      ...colDynamic[activeTab]
    },
    {
      title: t("glossary.addedOn"),
      key: "Added On",
      minWidth: 120,
      render: (data) => {
        return moment(data.createdDate).local().format("MM/DD/YYYY HH:mm:ss");
      }
    },
    {
      title: <Box textAlign={"right"}>{t("glossary.action")}</Box>,
      key: "Action",
      minWidth: 120,
      render: (data) => (
        <Box display="flex" justifyContent={"flex-end"}>
          <IconButton data-testid="action-button" onClick={() => deleteBookMark(data.keyword)}>
            <DeleteBookmark fontSize={10} />
          </IconButton>
        </Box>
      )
    }
  ];

  const tabs: {
    label: React.ReactNode;
    key: string;
    component: React.ReactNode;
  }[] = [
    {
      label: t("common.address"),
      key: "ADDRESS",
      component: (
        <StyledTable
          error={error}
          total={{ title: "Total", count: total }}
          columns={columns}
          data={data || []}
          height={heightTable}
          loading={loading}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      )
    },
    {
      label: t("glossary.transaction"),
      key: "TRANSACTION",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          total={{ title: "Total", count: total }}
          data={data || []}
          height={heightTable}
          loading={loading}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      )
    },
    {
      label: t("glossary.block"),
      key: "BLOCK",
      component: (
        <StyledTable
          error={error}
          total={{ title: "Total", count: total }}
          columns={columns}
          data={data || []}
          loading={loading}
          height={heightTable}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      )
    },
    {
      label: t("epoch"),
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
            }
          }}
          columns={columns}
          data={data || []}
          height={heightTable}
          error={error}
          loading={loading}
        />
      )
    },
    {
      label: t("glossary.pool"),
      key: "POOL",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          data={data || []}
          height={heightTable}
          loading={loading}
          total={{ title: "Total", count: total }}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      )
    },
    {
      label: t("common.stakeAddress"),
      key: "STAKE_KEY",
      component: (
        <StyledTable
          error={error}
          columns={columns}
          data={data || []}
          loading={loading}
          height={heightTable}
          total={{ title: "Total", count: total }}
          pagination={{
            total: total,
            page,
            size,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      )
    }
  ];

  const renderIdSelected = (keyword: string) => {
    switch (activeTab) {
      case "TRANSACTION":
        return getShortHash(keyword);
      case "ADDRESS":
      case "STAKE_KEY":
        return getShortHash(keyword);

      default:
        return keyword;
    }
  };

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary[200]}` }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{ sx: { display: "none" } }}
            variant="scrollable"
            scrollButtons={false}
          >
            {tabs.map(({ key, label }) => (
              <WrapTab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <TitleTab pl={1} active={+(key === activeTab)}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((item) => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>

      <Dialog
        open={!!selected}
        PaperProps={{
          style: { borderRadius: 20, width: 550 }
        }}
      >
        <ButtonClose disabled={loadingDelete} onClick={() => setSelected(null)}>
          <IoMdClose color={theme.palette.secondary.light} />
        </ButtonClose>
        <Box textAlign={"center"} pt={5} pb={2}>
          <QuestionConfirm />
        </Box>
        <Box component={"h2"} textAlign={"center"} fontWeight={"bold"} fontSize={"1.125rem"} paddingBottom={"0px"}>
          {t("glossary.confirmationRequired")}
        </Box>
        <Box px={2}>
          <DialogContentText fontSize={"1.125rem"}>
            {t("glossary.confirmRemove")} {colDynamic[activeTab].title} {renderIdSelected(selected || "")} ?
          </DialogContentText>
        </Box>
        <DialogActions>
          <Box width={"100%"} display={"flex"} pt={2} pb={3} flexDirection={"row"} justifyContent={"center"}>
            <CancelButton disabled={loadingDelete} onClick={handleClose} variant="outlined">
              {t("common.cancel")}
            </CancelButton>
            <DeleteButton
              loading={loadingDelete}
              onClick={() => selected && deleteBookMark(selected)}
              variant="contained"
            >
              {t("common.continue")}
            </DeleteButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bookmark;
