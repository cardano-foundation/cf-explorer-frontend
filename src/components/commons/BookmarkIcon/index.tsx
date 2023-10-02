import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { addBookmark, deleteBookmark } from "src/commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import useToast from "src/commons/hooks/useToast";
import useAuth from "src/commons/hooks/useAuth";
import { BookmarkIcon, Bookmarked } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
interface BookmarkButtonProps {
  keyword: string;
  type: Bookmark["type"];
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ keyword, type }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const { openSyncBookmarkModal = false } = useSelector(({ user }: RootState) => user);

  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmark", []);
  const [bookmark, setBookmark] = useState((bookmarks || []).find((r) => r.keyword === `${keyword}`));
  const theme = useTheme();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookmark(
      (JSON.parse(localStorage.getItem("bookmark") || "[]") || []).find((r: Bookmark) => r.keyword === `${keyword}`)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSyncBookmarkModal, bookmarks, keyword]);

  const updateBookmark = async () => {
    if (!isLoggedIn) return;
    try {
      setLoading(true);
      if (!bookmark) {
        if ((bookmarks || [])?.length < 2000) {
          const { data } = await addBookmark({
            keyword,
            type,
            network: NETWORK_TYPES[NETWORK]
          });
          setBookmarks([...(bookmarks || []), data]);
          toast.success(t("common.bookmarkHasBeenAdded"));
        } else {
          toast.error(t("message.bookmark.maximum", { value: 2000 }));
        }
      } else {
        try {
          deleteBookmark(bookmark?.id || 0);
          setBookmarks((bookmarks || []).filter((b) => b.keyword !== `${keyword}`));
          toast.success(t("common.bookmarkHasBeenRemoved"));
        } catch (error: any) {
          toast.error(t(error?.response?.data?.errorCode));
        }
      }
    } catch (error: any) {
      toast.error(t(error?.response?.data?.errorCode));
    } finally {
      setLoading(false);
    }
  };

  const renderBookmark = () => {
    if (loading) {
      return <CircularProgress size={"30px"} />;
    }
    if (!isLoggedIn) {
      return (
        <CustomTooltip title={t("common.pleaseSignInToSaveYourBookmark")}>
          <BookmarkIcon fill={theme.palette.secondary.main} />
        </CustomTooltip>
      );
    }
    if (bookmark) {
      return <Bookmarked fill={theme.palette.success[700]} />;
    }
    return <BookmarkIcon fill={theme.palette.secondary.main} />;
  };

  return (
    <Box>
      <IconButton
        style={{ width: 45, height: 45, cursor: isLoggedIn ? "pointer" : "default" }}
        onClick={updateBookmark}
      >
        {renderBookmark()}
      </IconButton>
    </Box>
  );
};

export default BookmarkButton;
