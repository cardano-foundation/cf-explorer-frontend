import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router-dom";

import useAuth from "src/commons/hooks/useAuth";
import { EmailIcon, HideIcon, LockIcon, ShowIcon, SuccessIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { signUp } from "src/commons/utils/userRequest";

import {
  BackButton,
  BackText,
  CloseButton,
  Container,
  ForgotPassword,
  FormHelperTextCustom,
  InputCustom,
  Label,
  LabelInfo,
  Title,
  WrapButton,
  WrapContent,
  WrapEmail,
  WrapForm,
  WrapHintText,
  WrapInput,
  WrapSignUp,
  WrapTitle
} from "./styles";

interface IForm {
  password: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  email: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  confirmPassword: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  confirmEmail: {
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
      error: event.error || !event.value,
      touched: event.touched
    }
  };
};
export default function SignUp() {
  const history = useHistory();
  const emailTextField = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(false);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedAgree, setCheckedAgree] = useState(false);

  useEffect(() => {
    document.title = "Sign Up | Iris - Cardano Blockchain Explorer";
  }, []);

  const handleChangeAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAgree(event.target.checked);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  const [formData, setFormData] = useReducer(formReducer, {
    password: {
      value: ""
    },
    email: {
      value: ""
    },
    confirmPassword: {
      value: ""
    },
    confirmEmail: {
      value: ""
    }
  });

  const enableButton = Object.values(formData).every((value) => value.touched) && !error && checkedAgree && !loading;

  useEffect(() => {
    if (isLoggedIn) {
      history.push(routers.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    setError(
      Boolean(
        formData.password.error || formData.email.error || formData.confirmPassword.error || formData.confirmEmail.error
      )
    );
  }, [formData]);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "password":
        if (!value) {
          error = "Please enter your Password";
        } else if (
          value.length < 8 ||
          value.length > 30 ||
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(value)
        ) {
          error =
            "Password has to be from 8 to 30 characters and must contain at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter";
        } else if (value === formData.confirmPassword.value) {
          setFormData({
            name: "confirmPassword",
            value: formData.confirmPassword.value,
            touched: true,
            error: ""
          });
        } else if (formData.confirmPassword.value && value !== formData.confirmPassword.value) {
          setFormData({
            name: "confirmPassword",
            value: formData.confirmPassword.value,
            touched: true,
            error: "Confirm Password does not match"
          });
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please enter your Confirm Password";
        } else if (value !== formData.password.value) {
          error = "Confirm Password does not match";
        }
        break;
      case "email":
        if (!value) {
          error = "Please enter your Email";
          // eslint-disable-next-line no-useless-escape
        } else if (!/^[\w-\.+!#$%&'*/=?^_`{|]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid Email";
        } else if (value === formData.confirmEmail.value) {
          setFormData({
            name: "confirmEmail",
            value: formData.confirmEmail.value,
            touched: true,
            error: ""
          });
        } else if (formData.confirmEmail.value && value !== formData.confirmEmail.value) {
          setFormData({
            name: "confirmEmail",
            value: formData.confirmEmail.value,
            touched: true,
            error: "Confirm Email does not match"
          });
        }
        break;
      case "confirmEmail":
        if (!value) {
          error = "Please enter your Confirm Email";
        } else if (value !== formData.email.value) {
          error = "Confirm Email does not match";
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
      error: getError(event.target.name, event.target.value)
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableButton, formData]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!enableButton) return;
    let hasError = false;
    const errorPassword = getError("password", formData.password.value);
    const errorEmail = getError("email", formData.email.value);
    const errorConfirmPassword = getError("confirmPassword", formData.confirmPassword.value);
    const errorConfirmEmail = getError("confirmEmail", formData.confirmEmail.value);
    if (errorPassword) {
      hasError = true;
      setFormData({
        name: "password",
        touched: true,
        error: errorPassword
      });
    }
    if (errorEmail) {
      hasError = true;
      setFormData({
        name: "email",
        touched: true,
        error: errorEmail
      });
    }
    if (errorConfirmPassword) {
      hasError = true;
      setFormData({
        name: "confirmPassword",
        touched: true,
        error: errorConfirmPassword
      });
    }
    if (errorConfirmEmail) {
      hasError = true;
      setFormData({
        name: "confirmEmail",
        touched: true,
        error: errorConfirmEmail
      });
    }
    if (hasError) return;
    handleSignUp(formData.email.value, formData.password.value);
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const payload = {
        password,
        email,
        role: "ROLE_USER"
      };
      const response = await signUp(payload);
      if (response.status === 200) {
        setSuccess(true);
        return;
      }
    } catch (error: any) {
      if (error?.response?.data?.errorCode === "CC_23") {
        setFormData({
          name: "email",
          touched: true,
          error: error.response.data.errorMessage,
          value: formData.email.value
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (forceGoHome?: boolean) => {
    if (forceGoHome) {
      history.replace(routers.HOME);
    } else {
      history.replace(routers.SIGN_IN);
    }
  };

  return (
    <Container>
      {!success ? (
        <WrapContent>
          <WrapTitle>Sign Up</WrapTitle>
          <WrapHintText>
            Already have an account? <WrapSignUp onClick={() => handleRedirect()}>Sign In</WrapSignUp>
          </WrapHintText>
          <FormGroup>
            <WrapForm>
              <BackButton onClick={() => handleRedirect()}>
                <HiArrowLongLeft fontSize="16px" />
                <BackText>Back</BackText>
              </BackButton>
              <CloseButton saving={0} onClick={() => handleRedirect(true)}>
                <IoMdClose />
              </CloseButton>
              <WrapInput>
                <Label>Email Address</Label>
                <InputCustom
                  inputRef={emailTextField}
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <EmailIcon />
                    </Box>
                  }
                  fullWidth
                  value={formData.email.value}
                  name="email"
                  onChange={handleChange}
                  error={Boolean(formData.email.error && formData.email.touched)}
                  placeholder="A confirmation code will be sent to this address"
                  onKeyDown={handleKeyDown}
                />
                {formData.email.error && formData.email.touched ? (
                  <FormHelperTextCustom error>{formData.email.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <Label>Confirm Email Address</Label>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <EmailIcon />
                    </Box>
                  }
                  fullWidth
                  value={formData.confirmEmail.value}
                  name="confirmEmail"
                  onChange={handleChange}
                  error={Boolean(formData.confirmEmail.error && formData.confirmEmail.touched)}
                  placeholder="Re-enter Your email address"
                />
                {formData.confirmEmail.error && formData.confirmEmail.touched ? (
                  <FormHelperTextCustom error>{formData.confirmEmail.error}</FormHelperTextCustom>
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
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword}>
                        {showPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  onChange={handleChange}
                  error={Boolean(formData.password.error && formData.password.touched)}
                  placeholder="Password"
                />
                {formData.password.error && formData.password.touched ? (
                  <FormHelperTextCustom error>{formData.password.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <Label>Confirm Password</Label>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <LockIcon />
                    </Box>
                  }
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleToggleConfirmPassword}>
                        {showConfirmPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="confirmPassword"
                  onChange={handleChange}
                  error={Boolean(formData.confirmPassword.error && formData.confirmPassword.touched)}
                  placeholder="Confirm Password"
                />
                {formData.confirmPassword.error && formData.confirmPassword.touched ? (
                  <FormHelperTextCustom error>{formData.confirmPassword.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <Box display={"flex"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedAgree}
                      onChange={handleChangeAgree}
                      sx={{
                        opacity: "0.15",
                        "&.Mui-checked": {
                          opacity: "1"
                        }
                      }}
                      size="medium"
                    />
                  }
                  label={
                    <Box fontSize={"14px"} fontWeight={400} display={"flex"} alignItems={"baseline"} gap={"5px"}>
                      I agree to the <ForgotPassword>Terms of Service</ForgotPassword>
                    </Box>
                  }
                />
              </Box>
              <WrapButton variant="contained" fullWidth onClick={handleSubmit} disabled={!enableButton}>
                Create an Account
              </WrapButton>
            </WrapForm>
          </FormGroup>
        </WrapContent>
      ) : (
        <WrapContent>
          <WrapForm>
            <FormGroup>
              <Box textAlign={"center"}>
                <SuccessIcon />
                <Box paddingY={"15px"}>
                  <Title>Verify Your Account</Title>
                </Box>
                <Box paddingBottom={"30px"}>
                  <LabelInfo>
                    Click on the link we sent to <WrapEmail>{formData.email.value}</WrapEmail> to finish your account
                    setup.
                  </LabelInfo>
                </Box>
              </Box>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                Sign In
              </WrapButton>
            </FormGroup>
          </WrapForm>
        </WrapContent>
      )}
    </Container>
  );
}
