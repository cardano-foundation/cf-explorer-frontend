import { useState } from "react";
import { Box } from "@mui/material";
import { useLocalStorage } from "react-use";

import { StyledDarkLoadingButton } from "src/components/share/styled";
import { addListBookmark, getAllBookmarks } from "src/commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import StyledModal from "src/components/commons/StyledModal";

import { Description, ModalTitle, StyledButton } from "./styles";

interface SyncBookmarkModalProps {
  open: boolean;
  handleCloseModal: () => void;
}
const SyncBookmarkModal: React.FC<SyncBookmarkModalProps> = ({ open, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ passNumber: number; failNumber: number }>();
  const [message, setMessage] = useState("");
  const [bookmarks, setBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);
  const bookmark = bookmarks?.filter((r) => !r.id).length;
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
          {!data && !message && (
            <>{bookmark} bookmarks detected in local storage, would you like to sync log with your account?</>
          )}
          {data?.passNumber && message && <>{data?.passNumber} bookmarks successfully synced</>}
          {data?.failNumber && data?.failNumber > 0 && message ? (
            <>
              <Box>{data?.passNumber} bookmarks successfully synced</Box>
              <Box mt={1}>{data?.failNumber} bookmarks failure synced</Box>
            </>
          ) : (
            <></>
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
