import { Box, Checkbox, FormControlLabel, FormGroup, FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useHistory } from 'react-router-dom';
import { HideIcon, LockIcon, ShowIcon } from "../../commons/resources";
import { routers } from "../../commons/routers";
import { NETWORK, NETWORK_TYPES } from "../../commons/utils/constants";
import { removeAuthInfo } from "../../commons/utils/helper";
import { getInfo, signIn } from "../../commons/utils/userRequest";
import ConnectWallet from "../../components/commons/Layout/Header/ConnectWallet";
import {
  setUserData
} from "../../stores/user";
import { AlertCustom, Container, ForgotPassword, FormHelperTextCustom, InputCustom, Label, UserCustomIcon, WrapButton, WrapButtonConnectWallet, WrapContent, WrapDivider, WrapForm, WrapHintText, WrapInput, WrapOr, WrapSignUp, WrapTitle } from "./styles";
import useToast from "../../commons/hooks/useToast";

interface IForm {
  username: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  password: {
    value: string;
    error?: string;
    touched?: boolean;
  }
}
const formReducer = (state: IForm, event: any) => {
  return {
    ...state,
    [event.name]: {
      value: event.value || '',
      error: event.error,
      touched: event.touched,
    }
  }
}


export default function SignIn() {
  const history = useHistory();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleLoginSuccess = () => {
    toast.success("Login success");
    history.push(routers.HOME);
  }
  const [invalidInfomation, setInvalidInfomation] = useState(false);
  const [error, setError] = useState(false);
  const getError = (name: string, value: string) => {
    let error = "";
    switch(name) {
      case 'username':
        if (!value) {
          error = "Please enter Username";
        }
        break;
      case 'password':
        if (!value) {
          error = "Please enter your Password";
        }
        break;
      default:
    }
    return error;
  }
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
      touched: true,
      error: getError(event.target.name, event.target.value),
    });
  }
  useEffect(() => {
    setError(Boolean(formData.username.error || formData.password.error));
  }, [formData])
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errorUsername = getError('username', formData.username.value);
    const errorPassword = getError('password', formData.password.value);
    if (errorUsername) {
      setFormData({
        name: 'username',
        touched: true,
        error: errorUsername,
      })
    }
    if (errorPassword) {
      setFormData({
        name: 'password',
        touched: true,
        error: errorPassword,
      })
    }
    if (error) return;
    handleSignIn(formData.username.value, formData.password.value);
  }
  const handleSignIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      const payload = {
        username,
        password,
        type: 0
      };
      const response = await signIn(payload);
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("walletId", data.walletId);
      localStorage.setItem("email", data.email);
      localStorage.setItem("loginType", "normal");
      const userInfo = await getInfo({ network: NETWORK_TYPES[NETWORK] });
      setUserData({...userInfo.data, loginType: "normal"});
      handleLoginSuccess();
    } catch (error) {
      setInvalidInfomation(true)
      removeAuthInfo();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <WrapContent>
        <WrapTitle>
          Sign in
        </WrapTitle>
        <WrapHintText>
          Don't have an account? <WrapSignUp onClick={() => history.push(routers.SIGN_UP)}>Sign up</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          <WrapForm>
            {invalidInfomation ? <AlertCustom severity="error">Incorrect Username or Password</AlertCustom> : null}
            <WrapInput>
              <Label>
                Username
              </Label>
              <InputCustom
                startAdornment={<Box paddingRight={"10px"} paddingTop={"3px"}>
                  <UserCustomIcon />
                </Box>}
                name="username"
                onChange={handleChange}
                fullWidth
                placeholder="Username"
                style={{
                  borderColor: (formData.username.error && formData.username.touched) ? "#DD4343" : ""
                }}
              />
              {(formData.username.error && formData.username.touched) ? <FormHelperTextCustom error>{formData.username.error}</FormHelperTextCustom> : null}
            </WrapInput>
            <WrapInput>
              <Label>
                Password
              </Label>
              <InputCustom
                startAdornment={<Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                  <LockIcon />
                </Box>}
                fullWidth
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <ShowIcon /> : <HideIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  borderColor: (formData.password.error && formData.password.touched) ? "#DD4343" : ""
                }}
              />
              {(formData.password.error && formData.password.touched) ? <FormHelperText error>{formData.password.error}</FormHelperText> : null}
            </WrapInput>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <FormControlLabel control={
                <Checkbox sx={{
                  opacity: "0.15",
                  "&.Mui-checked": {
                    opacity: "1",
                  }
                }}
                  size="medium"
                />
              }
                label={
                  <Box fontSize={"14px"} fontWeight={400}>
                    Remember & Auto Login
                  </Box>
                }
              />
              <ForgotPassword onClick={() => history.push(routers.FORGOT_PASSWORD)}>
                Forgot your password?
              </ForgotPassword>
            </Box>
            <WrapButton variant="contained" fullWidth onClick={handleSubmit} disabled={loading}>
              Log in
            </WrapButton>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <WrapDivider />
              <WrapOr>
                or
              </WrapOr>
              <WrapDivider />
            </Box>
            <ConnectWallet onSuccess={handleLoginSuccess} customButton={({ handleClick }) => (
              <WrapButtonConnectWallet variant="outlined" fullWidth onClick={handleClick}>
                Connect Wallet
              </WrapButtonConnectWallet>
            )}></ConnectWallet>
          </WrapForm>
        </FormGroup>
      </WrapContent>
    </Container >
  )
}
