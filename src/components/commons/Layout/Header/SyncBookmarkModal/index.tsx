import { useState } from "react";
import { Box } from "@mui/material";
import StyledModal from "../../../StyledModal";
import { Description, ModalTitle } from "./styles";
import { StyledDarkLoadingButton } from "../../../../share/styled";
import { StyledButton } from "./styles";
import { useLocalStorage } from "react-use";
import { addListBookmark, getAllBookmarks } from "../../../../../commons/utils/userRequest";
import { BookMark } from "../../../../../types/bookmark";
import { NETWORK, NETWORK_TYPES } from "../../../../../commons/utils/constants";

interface SyncBookmarkModalProps {
  open: boolean;
  loadingSubmit: boolean;
  handleCloseModal: () => void;
}
const SyncBookmarkModal: React.FC<SyncBookmarkModalProps> = ({ open, loadingSubmit, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BookMark[]>([]);
  const [message, setMessage] = useState("");
  const [bookmarks, setBookmark] = useLocalStorage<BookMark[]>("bookmark", []);

  const hanldeSyncBookmark = async () => {
    try {
      setLoading(true);
      const { data } = await addListBookmark(bookmarks || []);
      setMessage("Successfully!");
      setData(data);
      const { data: dataBookmarks } = await getAllBookmarks(NETWORK_TYPES[NETWORK]);
      if (data) {
        setBookmark(dataBookmarks);
      }
    } catch (error) {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box textAlign="center">
        <ModalTitle>Notify</ModalTitle>
        <Description>
          {data && !message && (
            <>
              {bookmarks?.filter(r => !r.id).length || 0} bookmarks detected in local storage, would you like to sync
              log with your account?
            </>
          )}
          {data && data.length === 0 && message && (
            <>{bookmarks?.filter(r => !r.id).length || 0} bookmarks successfully synced</>
          )}
          {data && data.length > 0 && message && (
            <>
              <Box>
                {bookmarks?.filter(r => !r.id).length ? bookmarks?.filter(r => !r.id).length - data.length : 0}{" "}
                bookmarks successfully synced
              </Box>
              <Box mt={1}>{data.length || 0} bookmarks failure synced</Box>
            </>
          )}
        </Description>
        <Box display={"flex"} justifyContent="center" gap={2}>
          <StyledButton onClick={handleCloseModal}>Close</StyledButton>
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
