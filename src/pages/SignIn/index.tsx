import { Box, Checkbox, FormControlLabel, FormGroup, FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router-dom";

import useAuth from "src/commons/hooks/useAuth";
import useToast from "src/commons/hooks/useToast";
import { HideIcon, LockIcon, ShowIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { removeAuthInfo } from "src/commons/utils/helper";
import { getInfo, signIn } from "src/commons/utils/userRequest";
import ConnectWallet from "src/components/commons/Layout/Header/ConnectWallet";
import { setUserData } from "src/stores/user";

import {
  AlertCustom,
  CloseButton,
  Container,
  ForgotPassword,
  FormHelperTextCustom,
  InputCustom,
  Label,
  UserCustomIcon,
  WrapButton,
  WrapButtonConnectWallet,
  WrapContent,
  WrapDivider,
  WrapForm,
  WrapHintText,
  WrapInput,
  WrapOr,
  WrapSignUp,
  WrapTitle
} from "./styles";
interface IForm {
  email: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  password: {
    value: string;
    error?: string;
    touched?: boolean;
  };
}
const formReducer = (state: IForm, event: any) => {
  return {
    ...state,
    [event.name]: {
      value: event.value || "",
      error: event.error,
      touched: event.touched
    }
  };
};

export default function SignIn() {
  const history = useHistory();
  const toast = useToast();
  const AUTHENTICATE_ROUTES = [
    routers.SIGN_IN as string,
    routers.SIGN_UP as string,
    routers.FORGOT_PASSWORD as string,
    routers.RESET_PASSWORD as string,
    routers.VERIFY_EMAIL as string
  ];
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoggedIn } = useAuth();
  const [invalidInfomation, setInvalidInfomation] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    email: {
      value: ""
    },
    password: {
      value: ""
    }
  });

  useEffect(() => {
    document.title = "Sign In | Cardano Explorer";
  }, []);

  const enableButton = Object.values(formData).every((value) => value.touched) && !error && !loading;

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  function handleRememberMeChange(event: any) {
    setRememberMe(event.target.checked);
  }

  const handleRedirectBack = () => {
    if (history.length > 1 && !AUTHENTICATE_ROUTES.includes(history.location.pathname)) {
      history.goBack();
    } else {
      history.replace(routers.HOME);
    }
  };

  const handleLoginSuccess = () => {
    toast.success("Login success");
    handleRedirectBack();
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleRedirectBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableButton, formData]);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value) {
          error = "Please enter Email Address";
        }
        break;
      case "password":
        if (!value) {
          error = "Please enter your Password";
        }
        break;
      default:
    }
    return error;
  };
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value.trim(),
      touched: event.target.value.trim() !== "",
      error: getError(event.target.name, event.target.value.trim())
    });
    setInvalidInfomation(false);
  };

  useEffect(() => {
    setError(Boolean(formData.email.error || formData.password.error));
  }, [formData]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!enableButton) return;
    const errorUsername = getError("email", formData.email.value);
    const errorPassword = getError("password", formData.password.value);
    if (errorUsername) {
      setFormData({
        name: "email",
        touched: true,
        error: errorUsername
      });
    }
    if (errorPassword) {
      setFormData({
        name: "password",
        touched: true,
        error: errorPassword
      });
    }
    if (errorUsername || errorPassword) return;
    handleSignIn(formData.email.value, formData.password.value);
  };
  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const payload = {
        email,
        password,
        type: 0
      };
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      const response = await signIn(payload);
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.email);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("walletId", data.address);
      localStorage.setItem("email", data.email);
      localStorage.setItem("loginType", "normal");
      const userInfo = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({ ...userInfo.data, loginType: "normal" });
      handleLoginSuccess();
    } catch (error) {
      setInvalidInfomation(true);
      removeAuthInfo();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <WrapContent>
        <WrapTitle data-testid="signin-title">Sign-In</WrapTitle>
        <WrapHintText>
          Don't have an account? <WrapSignUp onClick={() => history.push(routers.SIGN_UP)}>Sign-Up</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          <WrapForm>
            <CloseButton saving={0} onClick={() => handleRedirectBack()}>
              <IoMdClose />
            </CloseButton>
            {invalidInfomation ? (
              <Box pt={"24px"}>
                <AlertCustom severity="error">Incorrect email address or password</AlertCustom>
              </Box>
            ) : null}
            <WrapInput>
              <Label>Email Address</Label>
              <InputCustom
                error={Boolean(formData.email.error && formData.email.touched)}
                startAdornment={
                  <Box paddingRight={"10px"} paddingTop={"3px"}>
                    <UserCustomIcon />
                  </Box>
                }
                name="email"
                value={formData.email.value}
                onChange={handleChange}
                fullWidth
                placeholder="Email Address"
              />
              {formData.email.error && formData.email.touched ? (
                <FormHelperTextCustom error>{formData.email.error}</FormHelperTextCustom>
              ) : null}
            </WrapInput>
            <WrapInput>
              <Label>Password</Label>
              <InputCustom
                startAdornment={
                  <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                    <LockIcon />
                  </Box>
                }
                fullWidth
                name="password"
                value={formData.password.value}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword}>
                      {showPassword ? <ShowIcon /> : <HideIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                error={Boolean(formData.password.error && formData.password.touched)}
              />
              {formData.password.error && formData.password.touched ? (
                <FormHelperText error>{formData.password.error}</FormHelperText>
              ) : null}
            </WrapInput>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      opacity: "0.15",
                      "&.Mui-checked": {
                        opacity: "1"
                      }
                    }}
                    size="medium"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label={
                  <Box fontSize={"14px"} fontWeight={400} textAlign={"left"}>
                    Remember & Auto Login
                  </Box>
                }
              />
              <ForgotPassword onClick={() => history.push(routers.FORGOT_PASSWORD)} data-testid="forgot-password-link">
                Forgot your password?
              </ForgotPassword>
            </Box>
            <WrapButton
              data-testid="login-btn"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!enableButton}
            >
              Log in
            </WrapButton>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <WrapDivider />
              <WrapOr>or</WrapOr>
              <WrapDivider />
            </Box>
            <ConnectWallet
              onSuccess={handleLoginSuccess}
              customButton={({ handleClick }) => (
                <WrapButtonConnectWallet
                  data-testid="connect-wallet"
                  variant="outlined"
                  fullWidth
                  onClick={handleClick}
                >
                  Connect Wallet
                </WrapButtonConnectWallet>
              )}
            ></ConnectWallet>
          </WrapForm>
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
