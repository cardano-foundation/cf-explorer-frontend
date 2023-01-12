import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";

type TRowItem = {
  label: string;
  value: string;
  errorMsg: string;
  action: () => void;
  onChangeValue: (event: any) => void;
};

const RowItem: React.FC<TRowItem> = ({ label, value, errorMsg, onChangeValue, action }) => {
  return (
    <WrapRowItem>
      <StyledLabel>{label}</StyledLabel>
      <StyledRowItem>
        <StyledInput value={value} onChange={onChangeValue} placeholder={label} />
        <IconButton>
          <StyledButton onClick={action}>Change</StyledButton>
        </IconButton>
      </StyledRowItem>
      <StyledHelper>{errorMsg}</StyledHelper>
    </WrapRowItem>
  );
};

const AccountSettingTab: React.FC = () => {
  const [username, setUsername] = useState({ value: "", errorMsg: "" });
  const [email, setEmail] = useState({ value: "", errorMsg: "" });
  const [wallet, setWallet] = useState({ value: "", errorMsg: "" });
  return (
    <Box textAlign="left">
      <RowItem
        label="Your username"
        value={username.value}
        errorMsg={username.errorMsg}
        onChangeValue={event => setUsername({ value: event.target.value, errorMsg: "" })}
        action={() => {}}
      />
      <RowItem
        label="Your email address "
        value={email.value}
        errorMsg={email.errorMsg}
        onChangeValue={event => setEmail({ value: event.target.value, errorMsg: "" })}
        action={() => {}}
      />
      <RowItem
        label="Connected Wallet "
        value={wallet.value}
        errorMsg={wallet.errorMsg}
        onChangeValue={event => setWallet({ value: event.target.value, errorMsg: "" })}
        action={() => {}}
      />
    </Box>
  );
};

export default AccountSettingTab;
