import { useState } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "../../../../../commons/utils/axios";
import { NETWORK, NETWORK_TYPES } from "../../../../../commons/utils/constants";
import { alphaNumeric } from "../../../../../commons/utils/helper";
import { RootState } from "../../../../../stores/types";
import { setModalRegister } from "../../../../../stores/user";
import StyledModal from "../../../StyledModal";
import { Label, Span, StyledButton, StyledInput, StyledTitle, TextError, TextNote } from "./styles";

interface IProps {
  address: string;
  open: boolean;
  onTriggerSignMessage: () => void;
}
const RegisterUsernameModal: React.FC<IProps> = ({ open, address, onTriggerSignMessage }) => {
  const { wallet } = useSelector(({ user }: RootState) => user);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");

  const onSubmit = async () => {
    try {
      if (errorMessage) return;
      const payload = {
        username: value,
        wallet: {
          address,
          networkType: NETWORK_TYPES[NETWORK],
          networkId: NETWORK_TYPES[NETWORK],
          walletName: wallet?.toUpperCase(),
        },
      };
      await authAxios.post("auth/sign-up", payload);
      onTriggerSignMessage();
    } catch (error) {}
  };

  return (
    <StyledModal open={open} handleCloseModal={() => setModalRegister(false)}>
      <>
        <StyledTitle>Enter your Username </StyledTitle>
        <TextNote>Please enter your Username to create a new unique one</TextNote>
        <Label required={true}>Username</Label>
        <StyledInput
          variant="outlined"
          helperText="Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed"
          placeholder="Username"
          value={value}
          onChange={e => {
            let val = e.target.value;
            if (alphaNumeric.test(val) || val.length < 5 || val.length > 30) {
              setErrorMessage("Please enter a valid username");
            } else {
              setErrorMessage("");
            }
            setValue(val);
          }}
        />
        <TextError>{errorMessage}</TextError>
        <StyledButton onClick={onSubmit}>
          <Span>Confirm</Span>
        </StyledButton>
      </>
    </StyledModal>
  );
};

export default RegisterUsernameModal;
