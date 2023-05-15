import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment } from "@mui/material";
import { EmailIcon, HideIcon, LockIcon, ShowIcon } from "../../commons/resources";
import {
  CloseButton,
  Container,
  ForgotPassword,
  FormHelperTextCustom,
  InputCustom,
  Label,
  UserCustomIcon,
  WrapButton,
  WrapContent,
  WrapForm,
  WrapHintText,
  WrapInput,
  WrapSignUp,
  WrapTitle
} from "./styles";
import { useHistory } from "react-router-dom";
import { routers } from "../../commons/routers";
import { useEffect, useReducer, useState } from "react";
import { signUp } from "../../commons/utils/userRequest";
import { IoMdClose } from "react-icons/io";

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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedAgree, setCheckedAgree] = useState(false);
  const [checkedSubcribe, setCheckedSubcribe] = useState(false);
  const handleChangeAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAgree(event.target.checked);
  };
  const handleChangeSubcribe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSubcribe(event.target.checked);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  const [formData, setFormData] = useReducer(formReducer, {
    username: {
      value: ""
    },
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
  useEffect(() => {
    setError(
      Boolean(
        formData.username.error ||
          formData.password.error ||
          formData.email.error ||
          formData.confirmPassword.error ||
          formData.confirmEmail.error
      )
    );
  }, [formData]);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value) {
          error = "Please enter Username";
        } else if (value.length < 5 || value.length > 30 || !/^[a-zA-Z0-9]+$/.test(value)) {
          error = "Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed";
        }
        break;
      case "password":
        if (!value) {
          error = "Please enter your Password";
        } else if (
          value.length < 8 ||
          value.length > 30 ||
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(value)
        ) {
          error = "Password must contain at least 8 characters, including upper lowercase number and special character";
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
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid Email";
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
      value: event.target.value,
      touched: true,
      error: getError(event.target.name, event.target.value)
    });
  };

  function handleClose() {
    history.push(routers.HOME);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errorUsername = getError("username", formData.username.value);
    const errorPassword = getError("password", formData.password.value);
    const errorEmail = getError("email", formData.email.value);
    const errorConfirmPassword = getError("confirmPassword", formData.confirmPassword.value);
    const errorConfirmEmail = getError("confirmEmail", formData.confirmEmail.value);
    if (errorUsername) {
      setFormData({
        name: "username",
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
    if (errorEmail) {
      setFormData({
        name: "email",
        touched: true,
        error: errorEmail
      });
    }
    if (errorConfirmPassword) {
      setFormData({
        name: "confirmPassword",
        touched: true,
        error: errorConfirmPassword
      });
    }
    if (errorConfirmEmail) {
      setFormData({
        name: "confirmEmail",
        touched: true,
        error: errorConfirmEmail
      });
    }
    if (error) return;
    handleSignUp(formData.email.value, formData.password.value, formData.username.value);
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const payload = {
        username,
        password,
        email,
        role: "ROLE_USER"
      };
      const response = await signUp(payload);
      if (response.status === 200) {
        setSuccess(true);
        return;
      }
    } catch (error) {
      //To do
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <WrapContent>
        <WrapTitle>Sign up</WrapTitle>
        <WrapHintText>
          Already have an account? <WrapSignUp onClick={() => history.push(routers.SIGN_IN)}>Sign In Here</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          {!success ? (
            <WrapForm>
              <CloseButton saving={0} onClick={() => handleClose()}>
                <IoMdClose />
              </CloseButton>
              <WrapInput>
                <Label>Username</Label>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"}>
                      <UserCustomIcon />
                    </Box>
                  }
                  fullWidth
                  name='username'
                  onChange={handleChange}
                  error={Boolean(formData.username.error && formData.username.touched)}
                  placeholder='Username'
                />
                {formData.username.error && formData.username.touched ? (
                  <FormHelperTextCustom error>{formData.username.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <Label>Email Address</Label>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <EmailIcon />
                    </Box>
                  }
                  fullWidth
                  name='email'
                  onChange={handleChange}
                  error={Boolean(formData.email.error && formData.email.touched)}
                  placeholder='A confirmation code will be sent to this address'
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
                  name='confirmEmail'
                  onChange={handleChange}
                  error={Boolean(formData.confirmEmail.error && formData.confirmEmail.touched)}
                  placeholder='Re-enter Your email address'
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
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={handleTogglePassword}>
                        {showPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name='password'
                  onChange={handleChange}
                  error={Boolean(formData.password.error && formData.password.touched)}
                  placeholder='Password'
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
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={handleToggleConfirmPassword}>
                        {showConfirmPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name='confirmPassword'
                  onChange={handleChange}
                  error={Boolean(formData.confirmPassword.error && formData.confirmPassword.touched)}
                  placeholder='Confirm Password'
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
                      size='medium'
                    />
                  }
                  label={
                    <Box fontSize={"14px"} fontWeight={400} display={"flex"} alignItems={"baseline"} gap={"5px"}>
                      I agree to the <ForgotPassword>Terms of Service</ForgotPassword>
                    </Box>
                  }
                />
              </Box>
              <Box display={"flex"} marginBottom={"10px"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedSubcribe}
                      onChange={handleChangeSubcribe}
                      sx={{
                        opacity: "0.15",
                        "&.Mui-checked": {
                          opacity: "1"
                        }
                      }}
                      size='medium'
                    />
                  }
                  label={
                    <Box fontSize={"14px"} fontWeight={400} textAlign={"left"}>
                      I would like to receive the Cardano Explorer newsletter and understand that I can{" "}
                      <ForgotPassword>unsubcribe</ForgotPassword> at any time
                    </Box>
                  }
                />
              </Box>
              <WrapButton variant='contained' fullWidth onClick={handleSubmit} disabled={loading || !checkedAgree}>
                Create an Account
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm>
              <CloseButton saving={0} onClick={() => handleClose()}>
                <IoMdClose />
              </CloseButton>
              <Label>Please check your email to confirm your account</Label>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
