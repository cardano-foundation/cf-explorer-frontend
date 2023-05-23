import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useToast from "../../../commons/hooks/useToast";
import { ACCOUNT_ERROR, NETWORK, NETWORK_TYPES } from "../../../commons/utils/constants";
import { addPrivateNote, editPrivateNote } from "../../../commons/utils/userRequest";
import StyledModal from "../../commons/StyledModal";
import { StyledDarkLoadingButton, StyledHelperText, StyledInput, StyledLabelInput } from "../../share/styled";
import { Title, WrapFormInput } from "./styles";
import { useScreen } from "../../../commons/hooks/useScreen";

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
  const [txHash, setTxHash] = useState<TInput | undefined>();
  const [privateNote, setPrivateNote] = useState<TInput | undefined>();
  const [loading, setLoading] = useState(false);
  const { isTablet } = useScreen();
  const toast = useToast();

  useEffect(() => {
    setTxHash((prev) => ({ ...prev, value: currentNote?.hash }));
    setPrivateNote((prev) => ({ ...prev, value: currentNote?.note }));
  }, [currentNote]);

  const handleSubmitData = async () => {
    if (txHash?.value && txHash.value?.length > 70) {
      toast.error("Maximum reached!");
    } else
      try {
        setLoading(true);
        if (!currentNote) {
          const payload = {
            note: privateNote?.value || "",
            txHash: txHash?.value || "",
            network: NETWORK_TYPES[NETWORK]
          };
          await addPrivateNote(payload);
        } else {
          const payload = { note: privateNote?.value || "", noteId: currentNote.id };
          await editPrivateNote(payload);
        }
        toast.success(`${!currentNote ? "Add" : "Update"} transaction private note successfully!`);
        setTxHash(undefined);
        setPrivateNote(undefined);
        setLoading(false);
        handleCloseModal();
        refresh();
      } catch (error: any) {
        const errorData = error.response?.data;
        if (errorData?.errorCode === ACCOUNT_ERROR.PRIVATE_NOTE_IS_EXIST) {
          setPrivateNote((prev) => ({ ...prev, error: errorData.errorMessage }));
        }
        setLoading(false);
      }
  };

  const containsSpecialCharacters = (inputValue: string) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(inputValue);
  }

  const handleChangeTxHash = (e: any) => {
    const inputValue = e.target.value
    const isHasSpecialCharacters = containsSpecialCharacters(inputValue)
    const isLengthToLong = inputValue.length > 70
    const isLengthToShort =  inputValue.length === 1;
    let error = "";
    if (isHasSpecialCharacters || isLengthToShort) {
      error = "Address is invalid, please try again!"
    }
    if (isLengthToLong) {
      error = "Maximum reached!"
    }
    setTxHash({
      value: inputValue.slice(0, 70),
      error
    })
  }
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
            onChange={(e) => setPrivateNote((prev) => ({ ...prev, value: e.target.value }))}
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
          loadingPosition='end'
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
