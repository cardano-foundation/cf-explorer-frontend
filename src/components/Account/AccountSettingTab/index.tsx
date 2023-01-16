import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../stores/types";
import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";
import { editInfo, transferWallet } from "../../../commons/utils/userRequest";
import { getConvertedNetwork, regexEmail } from "../../../commons/utils/helper";

type TRowItem = {
  label: string;
  value?: string;
  errorMsg?: string;
  action: () => void;
  onChangeValue: (event: any) => void;
  disabled?: boolean;
};

const RowItem: React.FC<TRowItem> = ({ label, value, errorMsg, onChangeValue, action, disabled = false }) => {
  return (
    <WrapRowItem>
      <StyledLabel>{label}</StyledLabel>
      <StyledRowItem>
        <StyledInput disabled={disabled} value={value} onChange={onChangeValue} placeholder={label} />
        <StyledButton onClick={action}>Change</StyledButton>
      </StyledRowItem>
      <StyledHelper>{errorMsg}</StyledHelper>
    </WrapRowItem>
  );
};

type TFieldInput = {
  value?: string;
  errorMsg?: string;
};

const AccountSettingTab: React.FC = () => {
  const { userData, wallet: walletAddress, network } = useSelector(({ user }: RootState) => user);
  const [username, setUsername] = useState<TFieldInput>({ value: userData?.username });
  const [email, setEmail] = useState<TFieldInput>({ value: userData?.email });
  const [wallet, setWallet] = useState<TFieldInput>({ value: userData?.wallet });

  const onEditInfo = async () => {
    try {
      const checkEmail = (email?.value && regexEmail.test(email.value)) || !email.value;
      if (!checkEmail) {
        setEmail(prev => ({ ...prev, errorMsg: "Please enter a valid email Address e.g: abcxyz@gmail.com" }));
        return;
      }
      const formData = new FormData();
      formData.append("email", email.value || "");
      editInfo(formData);
    } catch (error) {}
  };

  const onTransferWallet = async () => {
    try {
      const payload = {
        username: username.value,
        wallet: {
          address: wallet.value,
          walletName: walletAddress?.toUpperCase(),
          networkType: getConvertedNetwork(network),
          networkId: getConvertedNetwork(network),
        },
        refreshToken: localStorage.getItem("refreshToken"),
      };
      const { data } = await transferWallet(payload);
      localStorage.setItem("token", data?.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
    } catch (error) {}
  };

  return (
    <Box textAlign="left">
      <RowItem
        label="Your username"
        value={username.value}
        disabled={true}
        errorMsg={username.errorMsg}
        onChangeValue={event => setUsername({ value: event.target.value, errorMsg: "" })}
        action={onEditInfo}
      />
      <RowItem
        label="Your email address "
        value={email.value}
        errorMsg={email.errorMsg}
        onChangeValue={event => setEmail({ value: event.target.value, errorMsg: "" })}
        action={onEditInfo}
      />
      <RowItem
        label="Connected Wallet "
        value={wallet.value}
        errorMsg={wallet.errorMsg}
        onChangeValue={event => setWallet({ value: event.target.value, errorMsg: "" })}
        action={onTransferWallet}
      />
    </Box>
  );
};

export default AccountSettingTab;
