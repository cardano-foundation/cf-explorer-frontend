import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

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
  }, [openSyncBookmarkModal, JSON.stringify(bookmarks)]);

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
          toast.success("Add bookmark successfully!");
        } else {
          toast.error("Maximum bookmarks is 2000!");
        }
      } else {
        try {
          deleteBookmark(bookmark?.id || 0);
          setBookmarks((bookmarks || []).filter((b) => b.keyword !== `${keyword}`));
          toast.success("Delete bookmark successfully!");
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
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
        <CustomTooltip title="Please sign in to save your bookmark">
          <BookmarkIcon fill={theme.palette.text.hint} />
        </CustomTooltip>
      );
    }
    if (bookmark) {
      return <Bookmarked />;
    }
    return <BookmarkIcon fill={theme.palette.text.hint} />;
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
