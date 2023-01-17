import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { addPrivateNote, editPrivateNote } from "../../../commons/utils/userRequest";
import StyledModal from "../../commons/StyledModal";
import { StyledDarkLoadingButton, StyledHelperText, StyledInput, StyledLabelInput } from "../../share/styled";
import { Title, WrapFormInput } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  currentNote?: TCurrentNote;
  refesh: () => void;
}

type TInput = {
  value?: string;
  error?: string;
};
const AddPrivateNoteModal: React.FC<IProps> = ({ open, currentNote, handleCloseModal, refesh }) => {
  const [txHash, setTxHash] = useState<TInput | undefined>();
  const [privateNote, setPrivateNote] = useState<TInput | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTxHash(prev => ({ ...prev, value: currentNote?.hash }));
    setPrivateNote(prev => ({ ...prev, value: currentNote?.note }));
  }, [currentNote]);

  const handleSubmitData = async () => {
    try {
      setLoading(true);
      if (!currentNote) {
        const payload = { note: privateNote?.value || "", txHash: txHash?.value || "" };
        await addPrivateNote(payload);
      } else {
        const payload = { note: privateNote?.value || "", noteId: currentNote.id };
        await editPrivateNote(payload);
      }
      setTxHash(undefined);
      setPrivateNote(undefined);
      setLoading(false);
      handleCloseModal();
      refesh();
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.errorCode === "CC_17") {
        setPrivateNote(prev => ({ ...prev, error: errorData?.errorMessage }));
      }
      setLoading(false);
    }
  };
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box>
        <Title>
          {currentNote ? "View/Update" : "Add"} <br />
          My Transasaction Private Note
        </Title>
        <WrapFormInput>
          <StyledLabelInput>Transaction Hash</StyledLabelInput>
          <br />
          <StyledInput
            disabled={!!currentNote}
            value={txHash?.value}
            onChange={e => setTxHash(prev => ({ ...prev, value: e.target.value }))}
            fullWidth={true}
          />
        </WrapFormInput>

        <WrapFormInput>
          <StyledLabelInput>{currentNote ? "View/Update" : "Add"} Private Note</StyledLabelInput>
          <br />
          <StyledInput
            value={privateNote?.value}
            onChange={e => setPrivateNote(prev => ({ ...prev, value: e.target.value }))}
            fullWidth={true}
            multiline={true}
            rows={5}
          />
          <StyledHelperText>{privateNote?.error}</StyledHelperText>
        </WrapFormInput>
        <StyledDarkLoadingButton loading={loading} loadingPosition="end" onClick={handleSubmitData}>
          {currentNote ? "Update" : "Add"}
        </StyledDarkLoadingButton>
      </Box>
    </StyledModal>
  );
};

export default AddPrivateNoteModal;
