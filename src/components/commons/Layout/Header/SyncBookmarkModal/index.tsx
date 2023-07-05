import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useLocalStorage } from "react-use";
import { useSelector } from "react-redux";

import { StyledDarkLoadingButton } from "src/components/share/styled";
import { addListBookmark, getAllBookmarks } from "src/commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import StyledModal from "src/components/commons/StyledModal";
import { setOpenSyncBookmarkModal } from "src/stores/user";

import { Description, ModalTitle, StyledButton } from "./styles";

const SyncBookmarkModal = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ passNumber: number; failNumber: number }>();
  const [message, setMessage] = useState("");
  const [, setBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);
  const bookmarks = ((JSON.parse(localStorage.getItem("bookmark") || "[]") as Bookmark[]) || [])?.filter((r) => !r.id);
  const bookmarkLengthRef = useRef(0);
  const { openSyncBookmarkModal = false } = useSelector(({ user }: RootState) => user);
  useEffect(() => {
    if (bookmarks.length > 0) {
      bookmarkLengthRef.current = bookmarks.length;
    }
  }, [bookmarks]);

  const hanldeSyncBookmark = async () => {
    try {
      setLoading(true);
      const { data } = await addListBookmark(bookmarks || []);
      const { data: dataBookmarks } = await getAllBookmarks(NETWORK_TYPES[NETWORK]);
      setMessage("Successfully!");
      setData(data);
      if (dataBookmarks) {
        setBookmark(dataBookmarks);
      }
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const renderMessage = () => {
    if (data?.passNumber !== undefined && data?.failNumber === 0 && message) {
      return (
        <>
          {data?.passNumber} {`bookmark${(data?.passNumber || 0) > 1 ? "s" : ""}`} successfully synced{" "}
          {`${
            bookmarkLengthRef.current - (data?.passNumber || 0) > 0
              ? `(${bookmarkLengthRef.current - (data?.passNumber || 0)} duplicated)`
              : ""
          }`}
        </>
      );
    }
    if (data?.failNumber && data?.failNumber > 0 && message) {
      return (
        <>
          <Box>
            {data?.passNumber} {`bookmark${data?.passNumber > 1 ? "s" : ""}`} successfully synced{" "}
            {`${
              bookmarkLengthRef.current - (data?.passNumber || 0) - data?.failNumber > 0
                ? `(${bookmarkLengthRef.current - (data?.passNumber || 0) - data?.failNumber} duplicated)`
                : ""
            }`}
          </Box>
          <Box mt={1}>
            {data?.failNumber} {`bookmark${data?.failNumber > 1 ? "s" : ""}`} failure synced
          </Box>
        </>
      );
    }
    return <></>;
  };
  return (
    <StyledModal open={openSyncBookmarkModal} handleCloseModal={() => setOpenSyncBookmarkModal(false)}>
      <Box textAlign="center">
        <ModalTitle>Notify</ModalTitle>
        <Description>
          {!data && !message && (
            <>
              {bookmarkLengthRef.current || 0} {`bookmark${bookmarkLengthRef.current > 1 ? "s" : ""}`} detected in local
              storage, would you like to sync log with your account?
            </>
          )}
          {renderMessage()}
        </Description>
        <Box display={"flex"} justifyContent="center" gap={2}>
          <StyledButton onClick={() => setOpenSyncBookmarkModal(false)}>Close</StyledButton>
          {!message && (
            <StyledDarkLoadingButton loading={loading} loadingPosition="end" onClick={hanldeSyncBookmark}>
              Sync
            </StyledDarkLoadingButton>
          )}
        </Box>
      </Box>
    </StyledModal>
  );
};

export default SyncBookmarkModal;
