import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../stores/types";
import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";
import { editInfo, existEmail, existUserName, transferWallet } from "../../../commons/utils/userRequest";
import { regexEmail, removeAuthInfo } from "../../../commons/utils/helper";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { useHistory } from "react-router-dom";
import { routers } from "../../../commons/routers";
import { NETWORK, NETWORK_TYPES } from "../../../commons/utils/constants";

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
  const { userData, wallet: walletAddress } = useSelector(({ user }: RootState) => user);
  const { disconnect } = useCardano();
  const history = useHistory();
  const [username, setUsername] = useState<TFieldInput>({ value: userData?.username });
  const [email, setEmail] = useState<TFieldInput>({ value: userData?.email });
  const [wallet, setWallet] = useState<TFieldInput>({ value: userData?.wallet });

  const onEditInfo = async (field: "email" | "username") => {
    try {
      let payload = {};
      if (field === "email") {
        const checkEmail = (email?.value && regexEmail.test(email.value)) || !email.value;
        if (!checkEmail) {
          setEmail(prev => ({ ...prev, errorMsg: "Please enter a valid email Address e.g: abcxyz@gmail.com" }));
          return;
        }
        const checkExistEmail = await existEmail({ email: email.value || "" });
        if (checkExistEmail.data) {
          setEmail(prev => ({ ...prev, errorMsg: "Email exist. Try other email!" }));
          return;
        }
        payload = { email: email.value };
      } else {
        const checkExistUsername = await existUserName({ username: username.value || "" });
        if (checkExistUsername.data) {
          setUsername(prev => ({ ...prev, errorMsg: "Username exist. Try other!" }));
          return;
        }
        payload = { username: username.value };
      }
      await editInfo(payload);
      if (field === "username") {
        disconnect();
        removeAuthInfo();
        history.push(routers.HOME);
      }
    } catch (error) {}
  };

  const onTransferWallet = async () => {
    try {
      const payload = {
        username: username.value,
        wallet: {
          address: wallet.value,
          walletName: walletAddress?.toUpperCase(),
          networkType: NETWORK_TYPES[NETWORK],
          networkId: NETWORK_TYPES[NETWORK],
        },
        refreshToken: localStorage.getItem("refreshToken") || "",
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
        errorMsg={username.errorMsg}
        onChangeValue={event => setUsername({ value: event.target.value, errorMsg: "" })}
        action={() => onEditInfo("username")}
      />
      <RowItem
        label="Your email address "
        value={email.value}
        errorMsg={email.errorMsg}
        onChangeValue={event => setEmail({ value: event.target.value, errorMsg: "" })}
        action={() => onEditInfo("email")}
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
