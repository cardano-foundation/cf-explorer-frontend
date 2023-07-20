import { useEffect, useState } from "react";
import { Box } from "@mui/system";

import useToast from "src/commons/hooks/useToast";
import { ACCOUNT_ERROR, NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { addPrivateNote, checkTrxHash, editPrivateNote } from "src/commons/utils/userRequest";
import StyledModal from "src/components/commons/StyledModal";
import { StyledDarkLoadingButton, StyledHelperText, StyledInput, StyledLabelInput } from "src/components/share/styled";
import { useScreen } from "src/commons/hooks/useScreen";

import { Title, WrapFormInput } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  currentNote?: TCurrentNote;
  refresh: () => void;
}

type TInput = {
  value?: string;
  error?: string;
};
const AddPrivateNoteModal: React.FC<IProps> = ({ open, currentNote, handleCloseModal, refresh }) => {
  const [txHash, setTxHash] = useState<TInput>({ value: "" });
  const [privateNote, setPrivateNote] = useState<TInput>({ value: "" });
  const [loading, setLoading] = useState(false);
  const { isTablet } = useScreen();
  const toast = useToast();

  useEffect(() => {
    setTxHash((prev) => ({ ...prev, value: currentNote?.hash || "" }));
    setPrivateNote((prev) => ({ ...prev, value: currentNote?.note || "" }));
  }, [currentNote]);

  const handleSubmitData = async () => {
    if (txHash?.value && txHash.value?.length > 70) {
      toast.error("Maximum reached!");
    } else
      try {
        setLoading(true);
        try {
          await checkTrxHash(txHash?.value || "");
          if (!currentNote) {
            const payload = {
              note: privateNote?.value || "",
              txHash: txHash?.value || "",
              network: NETWORK_TYPES[NETWORK]
            };
            try {
              await addPrivateNote(payload);
            } catch (error) {
              toast.error("Private note is already exists");
            }
          } else {
            const payload = { note: privateNote?.value || "", noteId: currentNote.id };
            try {
              await editPrivateNote(payload);
            } catch (error) {
              toast.error("Something went wrong!");
            }
          }
          setTxHash({ value: "" });
          setPrivateNote({ value: "" });
          setLoading(false);
          handleCloseModal();
          refresh();
        } catch (error) {
          toast.error("Transaction hash not found!");
        } finally {
          setLoading(false);
        }
      } catch (error: any) {
        const errorData = error.response?.data;
        if (errorData?.errorCode === ACCOUNT_ERROR.PRIVATE_NOTE_IS_EXIST) {
          setPrivateNote((prev) => ({ ...prev, error: errorData.errorMessage }));
        }
        setLoading(false);
      }
  };

  const handleChangeTxHash = (e: any) => {
    const inputValue = e.target.value;
    setTxHash({
      value: inputValue.slice(0, 70)
    });
  };
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box>
        <Title>{currentNote ? "View/Update" : "Add"} My Transaction Private Note</Title>
        <WrapFormInput>
          <StyledLabelInput>Transaction Hash</StyledLabelInput>
          <br />
          <StyledInput
            disabled={!!currentNote}
            value={txHash?.value}
            onChange={handleChangeTxHash}
            fullWidth={true}
            error={!!txHash?.error}
          />
          <StyledHelperText>{txHash?.error}</StyledHelperText>
        </WrapFormInput>
        <WrapFormInput>
          <StyledLabelInput>{currentNote ? "View/ Update" : "Add"} Private Note</StyledLabelInput>
          <br />
          <StyledInput
            value={privateNote?.value}
            onChange={(e) => {
              if (e.target.value.length > 300) return;
              setPrivateNote((prev) => ({ ...prev, value: e.target.value }));
            }}
            fullWidth={true}
            multiline={true}
            rows={5}
            error={!!privateNote?.error}
          />
          <StyledHelperText>{privateNote?.error}</StyledHelperText>
        </WrapFormInput>
        <StyledDarkLoadingButton
          loading={loading}
          disabled={!privateNote?.value || !txHash?.value || !!txHash?.error}
          loadingPosition="end"
          endIcon={<></>}
          onClick={handleSubmitData}
          fullWidth={isTablet}
        >
          {currentNote ? "Update" : "Add"}
        </StyledDarkLoadingButton>
      </Box>
    </StyledModal>
  );
};

export default AddPrivateNoteModal;
