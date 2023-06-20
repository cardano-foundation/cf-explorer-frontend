import { Box, FormGroup } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

import { EmailIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { forgotPassword } from "src/commons/utils/userRequest";

import {
  AlertCustom,
  BackButton,
  BackText,
  CloseButton,
  Container,
  FormHelperTextCustom,
  InputCustom,
  Label,
  WrapButton,
  WrapContent,
  WrapForm,
  WrapHintText,
  WrapInput,
  WrapSignUp,
  WrapTitle
} from "./styles";

interface IForm {
  email: {
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
export default function ForgotPassword() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useReducer(formReducer, {
    email: {
      value: ""
    }
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Please enter your Email";
          // eslint-disable-next-line no-useless-escape
        } else if (!/^[\w-\.+!#$%&'*/=?^_`{|]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid Email";
        }
        break;
      default:
    }
    return error;
  };
  const handleChange = (event: any) => {
    if (error) setError(false);
    setFormData({
      name: event.target.name,
      value: event.target.value.trim(),
      touched: event.target.value.trim() !== ""
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { data } = await forgotPassword({ email });
      if (data.code === "SS_0") {
        setSuccess(true);
      } else {
        setError(true);
        if (emailInputRef.current) emailInputRef.current.focus();
        setFormData({
          name: "email",
          value: formData.email.value,
          touched: true,
          error: true
        });
      }
    } catch (error) {
      setError(true);
      if (emailInputRef.current) emailInputRef.current.focus();
      setFormData({
        name: "email",
        value: formData.email.value,
        touched: true,
        error: true
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const error = checkError();
    if (error) return;
    handleForgotPassword(formData.email.value);
  };

  const checkError = () => {
    const error = getError("email", formData.email.value);
    if (error) {
      setFormData({
        name: "email",
        value: formData.email.value,
        touched: true,
        error
      });
      return error;
    }
    return;
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
      <WrapContent>
        <WrapTitle>Forgot Password</WrapTitle>
        <WrapHintText>
          <WrapSignUp onClick={() => history.push(routers.SIGN_IN)}>Sign-In</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          {!success ? (
            <WrapForm>
              {error ? (
                <Box pt={"24px"}>
                  <AlertCustom severity="error">Invalid email information.</AlertCustom>
                </Box>
              ) : null}
              <BackButton onClick={() => handleRedirect()}>
                <HiArrowLongLeft fontSize="16px" />
                <BackText>Back</BackText>
              </BackButton>
              <CloseButton saving={0} onClick={() => handleRedirect(true)}>
                <IoMdClose />
              </CloseButton>
              <WrapInput>
                <Label>Email</Label>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <EmailIcon />
                    </Box>
                  }
                  name="email"
                  inputRef={emailInputRef}
                  value={formData.email.value}
                  onChange={handleChange}
                  onBlur={checkError}
                  fullWidth
                  placeholder="Email"
                  error={Boolean(formData.email.error && formData.email.touched)}
                  onKeyDown={handleKeyDown}
                />
                {formData.email.error && formData.email.touched ? (
                  <FormHelperTextCustom error>{formData.email.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapButton
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading || !!formData.email.error}
              >
                Submit
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm>
              <Label>Submit successfully. Please check your email to reset password.</Label>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
