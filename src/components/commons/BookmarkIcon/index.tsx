import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useLocalStorage } from "react-use";
import { ReactComponent as BookmarkIcon } from "../../../commons/resources/icons/Bookmark.svg";
import { ReactComponent as Bookmarked } from "../../../commons/resources/icons/Bookmarked.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { addBookmark, deleteBookmark } from "../../../commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "../../../commons/utils/constants";
import useToast from "../../../commons/hooks/useToast";

interface BookmarkButtonProps {
  keyword: string;
  type: Bookmark["type"];
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ keyword, type }) => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const isLogin = !!userData?.username;
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmark", []);
  const theme = useTheme();
  const toast = useToast();

  const bookmark = (bookmarks || []).find(r => r.keyword === `${keyword}`);
  const updateBookmark = async () => {
    if (!isLogin) {
      if (!bookmark) {
        setBookmarks([...(bookmarks || []), { keyword: `${keyword}`, type, network: NETWORK_TYPES[NETWORK] }]);
      } else {
        setBookmarks((bookmarks || []).filter(b => b.keyword !== `${keyword}`));
      }
      toast.success("Successfully!");
    }

    if (isLogin)
      try {
        if (!bookmark) {
          if ((bookmarks || [])?.length < 2000) {
            const { data } = await addBookmark({
              keyword,
              type,
              network: NETWORK_TYPES[NETWORK],
            });
            setBookmarks([...(bookmarks || []), data]);
            toast.success("Successfully!");
          } else {
            toast.error("Maximum bookmarks is 2000!");
          }
        } else {
          deleteBookmark(bookmark?.id || 0);
          setBookmarks((bookmarks || []).filter(b => b.keyword !== `${keyword}`));
          toast.success("Successfully!");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
  };

  return (
    <Box>
      <Box mx={1} component={IconButton} style={{ width: 45, height: 45 }} onClick={updateBookmark}>
        {!!bookmark ? <Bookmarked /> : <BookmarkIcon fill={theme.palette.text.hint} />}
      </Box>
    </Box>
  );
};

export default BookmarkButton;
