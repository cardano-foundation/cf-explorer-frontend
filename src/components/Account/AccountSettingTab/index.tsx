import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";

import { RootState } from "../../../stores/types";
import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";
import { editInfo, existEmail, existUserName } from "../../../commons/utils/userRequest";
import { regexEmail, removeAuthInfo, alphaNumeric } from "../../../commons/utils/helper";
import { getInfo } from "../../../commons/utils/userRequest";
import { setUserData } from "../../../stores/user";
import { NETWORK, NETWORK_TYPES } from "../../../commons/utils/constants";
// @ts-ignore
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { routers } from "../../../commons/routers";
import { useHistory } from "react-router-dom";
import useToast from "../../../commons/hooks/useToast";

type TRowItem = {
  label: string;
  value?: string;
  errorMsg?: string;
  action: () => void;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  disabledButton?: boolean;
  field: "email" | "username" | "wallet";
  loading?: boolean;
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
  loading = false,
}) => {
  return (
    <WrapRowItem>
      <StyledLabel>{label}</StyledLabel>
      <StyledRowItem>
        <StyledInput disabled={disabled || loading} value={value} onChange={onChangeValue} placeholder={label} />
        <StyledButton
          loading={loading}
          onClick={action}
          disabled={(["email", "username"].includes(field) && !value) || disabledButton}
        >
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
  const [loading, setLoading] = useState<"email" | "username" | "">("");
  const toast = useToast();

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...response.data, loginType: userData?.loginType || ""});
    } catch (error) { }
  }, []);

  const onEditInfo = async (field: "email" | "username") => {
    try {
      let payload = {};
      if (field === "email") {
        const checkEmail = (email?.value && regexEmail.test(email.value)) || !email.value;
        if (!checkEmail) {
          return toast.error("Please enter a valid email Address e.g: abcxyz@gmail.com");
        }
        const checkExistEmail = await existEmail({ email: email.value || "" });
        if (checkExistEmail.data) {
          return toast.error("Email existed, Please try another!");
        }
        payload = { email: email.value };
      } else {
        if ((username.value?.length || 0) < 5 || (username?.value?.length || 0) > 30)
          return toast.error(
            "Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed"
          );
        const checkExistUsername = await existUserName({ username: username.value || "" });
        if (checkExistUsername.data) {
          return toast.error("This username existed, please enter another!");
        }
        payload = { username: username.value };
      }
      setLoading(field);
      const { data } = await editInfo(payload);
      if (data.userName || data.id) {
        if (field === "username") {
          localStorage.setItem("token", data?.jwtToken);
          localStorage.setItem("username", data?.username);
          localStorage.setItem("email", data?.email);
        }
        await fetchUserInfo();
        setLoading("");
        return toast.success(`Your ${field} has been changed.`);
      }
    } catch (error) {
      return toast.error((error as Error).message || "Something went wrong!");
    }
  };

  const onTransferWallet = async () => {
    try {
      disconnect();
      removeAuthInfo();
      history.push(routers.HOME);
    } catch (error) { }
  };

  return (
    <Box textAlign="left">
      <RowItem
        label="Your username"
        value={username.value}
        errorMsg={username.errorMsg}
        onChangeValue={event => {
          if (alphaNumeric.test(event.target.value || "")) return event.preventDefault();
          if (event.target.value) {
            setUsername({ value: event.target.value, errorMsg: "" });
          } else {
            setUsername({ value: event.target.value, errorMsg: "Username is required!" });
          }
        }}
        field="username"
        action={() => onEditInfo("username")}
        loading={loading === "username"}
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
        loading={loading === "email"}
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
    </Box>
  );
};

export default AccountSettingTab;
