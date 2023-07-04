import React, { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { addBookmark, deleteBookmark } from "src/commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import useToast from "src/commons/hooks/useToast";
import useAuth from "src/commons/hooks/useAuth";
import { BookmarkIcon, Bookmarked } from "src/commons/resources";

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
      (JSON.parse(localStorage.getItem("bookmark") || "") || []).find((r: Bookmark) => r.keyword === `${keyword}`)
    );
  }, [openSyncBookmarkModal, bookmarks, keyword]);

  const updateBookmark = async () => {
    if (!isLoggedIn) {
      if (!bookmark) {
        setBookmarks([...(bookmarks || []), { keyword: `${keyword}`, type, network: NETWORK_TYPES[NETWORK] }]);
        toast.success("Add bookmark successfully!");
      } else {
        setBookmarks((bookmarks || []).filter((b) => b.keyword !== `${keyword}`));
        toast.success("Delete bookmark successfully!");
      }
    }

    if (isLoggedIn)
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

  return (
    <Box>
      <IconButton style={{ width: 45, height: 45 }} onClick={updateBookmark}>
        {loading ? (
          <CircularProgress size={"30px"} />
        ) : bookmark ? (
          <Bookmarked />
        ) : (
          <BookmarkIcon fill={theme.palette.text.hint} />
        )}
      </IconButton>
    </Box>
  );
};

export default BookmarkButton;
