import { Box, AlertProps } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";

import { RootState } from "../../../stores/types";
import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";
import { editInfo, existEmail, existUserName, transferWallet } from "../../../commons/utils/userRequest";
import { regexEmail, removeAuthInfo, alphaNumeric } from "../../../commons/utils/helper";
import { getInfo } from "../../../commons/utils/userRequest";
import { setUserData } from "../../../stores/user";
import { NETWORK, NETWORK_TYPES } from "../../../commons/utils/constants";
import Toast from "../../commons/Toast";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { routers } from "../../../commons/routers";
import { useHistory } from "react-router-dom";

type TRowItem = {
  label: string;
  value?: string;
  errorMsg?: string;
  action: () => void;
  onChangeValue: (event: any) => void;
  disabled?: boolean;
  disabledButton?: boolean;
  field: "email" | "username" | "wallet";
};

const RowItem: React.FC<TRowItem> = ({
  label,
  value,
  errorMsg,
  onChangeValue,
  action,
  disabled = false,
  field,
  disabledButton = false,
}) => {
  return (
    <WrapRowItem>
      <StyledLabel>{label}</StyledLabel>
      <StyledRowItem>
        <StyledInput disabled={disabled} value={value} onChange={onChangeValue} placeholder={label} />
        <StyledButton onClick={action} disabled={(["email", "username"].includes(field) && !value) || disabledButton}>
          Change
        </StyledButton>
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
  const { userData } = useSelector(({ user }: RootState) => user);
  const { disconnect } = useCardano();
  const history = useHistory();
  const [username, setUsername] = useState<TFieldInput>({ value: userData?.username });
  const [email, setEmail] = useState<TFieldInput>({ value: userData?.email });
  const [wallet, setWallet] = useState<TFieldInput>({ value: userData?.wallet });
  const [message, setMessage] = useState<{ message: string; severity: AlertProps["severity"] }>({
    message: "",
    severity: "error",
  });

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({ message: "", severity: "error" });
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData(response.data);
    } catch (error) {}
  }, []);

  const onEditInfo = async (field: "email" | "username") => {
    try {
      let payload = {};
      if (field === "email") {
        const checkEmail = (email?.value && regexEmail.test(email.value)) || !email.value;
        if (!checkEmail) {
          setMessage({ message: "Please enter a valid email Address e.g: abcxyz@gmail.com", severity: "error" });
          return;
        }
        const checkExistEmail = await existEmail({ email: email.value || "" });
        if (checkExistEmail.data) {
          setMessage({ message: "Email existed, Please try another!", severity: "error" });
          return;
        }
        payload = { email: email.value };
      } else {
        const checkExistUsername = await existUserName({ username: username.value || "" });
        if (checkExistUsername.data) {
          setMessage({ message: "This username existed, please enter another!", severity: "error" });
          return;
        }
        payload = { username: username.value };
      }
      if (!message.message) {
        const { data } = await editInfo(payload);
        if (data.userName || data.id) {
          if (field === "username") {
            localStorage.setItem("token", data?.jwtToken);
            localStorage.setItem("username", data?.username);
            localStorage.setItem("email", data?.email);
          }
          await fetchUserInfo();
          setMessage({
            message: `Your ${field === "email" ? "email" : "Username"} has been changed.`,
            severity: "success",
          });
        }
      }
    } catch (error) {
      setMessage({
        message: (error as Error).message || "Something went wrong!",
        severity: "error",
      });
    }
  };

  const onTransferWallet = async () => {
    try {
      await disconnect();
      removeAuthInfo();
      history.push(routers.HOME);
    } catch (error) {}
  };

  return (
    <Box textAlign="left">
      <RowItem
        label="Your username"
        value={username.value}
        errorMsg={username.errorMsg}
        onChangeValue={event => {
          if (event.target.value) {
            setUsername({ value: event.target.value, errorMsg: "" });
          } else {
            setUsername({ value: event.target.value, errorMsg: "Username is required!" });
          }
        }}
        disabledButton={
          (username.value || "")?.length < 5 ||
          (username.value || "")?.length > 30 ||
          alphaNumeric.test(username.value || "")
        }
        field="username"
        action={() => onEditInfo("username")}
      />
      <RowItem
        label="Your email address "
        value={email.value}
        errorMsg={email.errorMsg}
        onChangeValue={event => {
          if (event.target.value) {
            setEmail({ value: event.target.value, errorMsg: "" });
          } else {
            setEmail({ value: event.target.value, errorMsg: "Email is required!" });
          }
        }}
        field="email"
        disabledButton={!email.value}
        action={() => onEditInfo("email")}
      />
      <RowItem
        label="Connected Wallet "
        value={wallet.value}
        errorMsg={wallet.errorMsg}
        onChangeValue={event => setWallet({ value: event.target.value, errorMsg: "" })}
        action={onTransferWallet}
        field="wallet"
      />
      <Toast
        open={!!message.message}
        onClose={handleCloseToast}
        messsage={message.message}
        severity={message.severity}
      />
    </Box>
  );
};

export default AccountSettingTab;
