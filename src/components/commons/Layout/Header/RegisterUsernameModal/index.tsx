import { useState } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "../../../../../commons/utils/axios";
import { NETWORK, NETWORK_TYPES } from "../../../../../commons/utils/constants";
import { alphaNumeric } from "../../../../../commons/utils/helper";
import { RootState } from "../../../../../stores/types";
import { setModalRegister } from "../../../../../stores/user";
import StyledModal from "../../../StyledModal";
import { Label, StyledTitle, TextError, TextNote, WrapButton } from "./styles";
import { StyledInput, StyledDarkLoadingButton } from "../../../../share/styled";
import { FormHelperText } from "@mui/material";
interface IProps {
  address: string;
  open: boolean;
  onTriggerSignMessage: () => void;
}
const RegisterUsernameModal: React.FC<IProps> = ({ open, address, onTriggerSignMessage }) => {
  const { wallet } = useSelector(({ user }: RootState) => user);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
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
    } catch (error: any) {
      setErrorMessage(error.response?.data.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal open={open} handleCloseModal={() => setModalRegister(false)}>
      <>
        <StyledTitle>Enter your Username </StyledTitle>
        <TextNote>Please enter your Username to create a new unique one</TextNote>
        <Label required={true}>Username</Label>
        <br />
        <StyledInput
          placeholder="Username"
          value={value}
          style={{ width: "100%" }}
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
        <FormHelperText>
          Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed
        </FormHelperText>
        <TextError>{errorMessage}</TextError>
        <WrapButton>
          <StyledDarkLoadingButton loading={loading} onClick={onSubmit}>
            Confirm
          </StyledDarkLoadingButton>
        </WrapButton>
      </>
    </StyledModal>
  );
};

export default RegisterUsernameModal;
