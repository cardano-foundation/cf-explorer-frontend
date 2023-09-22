import { Box, FormGroup } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    document.title = t("account.forgotPassword");
  }, [t]);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = t("validation.email.required");
          // eslint-disable-next-line no-useless-escape
        } else if (!/^[\w-\.+!#$%&'*/=?^_`{|]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = t("validation.emailAddress");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

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
        <WrapTitle>{t("account.forgotPassword")}</WrapTitle>
        <WrapHintText>
          <WrapSignUp onClick={() => history.replace(routers.SIGN_IN)}>{t("common.signIn")}</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          {!success ? (
            <WrapForm>
              {error ? (
                <Box pt={"24px"}>
                  <AlertCustom severity="error">{t("validation.email.invalid")}.</AlertCustom>
                </Box>
              ) : null}
              <BackButton onClick={() => handleRedirect()}>
                <HiArrowLongLeft fontSize="16px" />
                <BackText>{t("common.back")}</BackText>
              </BackButton>
              <CloseButton saving={0} onClick={() => handleRedirect(true)}>
                <IoMdClose />
              </CloseButton>
              <WrapInput>
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
                  placeholder={t("account.emailAddress")}
                  error={Boolean(formData.email.error && formData.email.touched)}
                />
                {formData.email.error && formData.email.touched ? (
                  <FormHelperTextCustom>{formData.email.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapButton
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading || !!formData.email.error}
              >
                {t("common.submit")}
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm>
              <Label>{t("message.submitResetPassword")}.</Label>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
