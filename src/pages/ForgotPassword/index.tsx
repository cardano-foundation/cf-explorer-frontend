import { Box, FormGroup, useTheme } from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEvent, MouseEvent, useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router-dom";

import { EmailIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { ACCOUNT_ERROR } from "src/commons/utils/constants";
import { forgotPassword } from "src/commons/utils/userRequest";
import CustomIcon from "src/components/commons/CustomIcon";

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

interface IEvent {
  name: string;
  value?: string;
  error?: boolean | string;
  touched?: boolean;
}
const formReducer = (state: IForm, event: IEvent) => {
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
  const theme = useTheme();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useReducer(formReducer, {
    email: {
      value: ""
    }
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const updateHeight = () => {
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    document.body.style.overflow = "hidden";
    updateHeight();

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
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
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) setError(false);
    if (serverError) setServerError("");
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
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
      const err = error as AxiosError;
      if (emailInputRef.current) emailInputRef.current.focus();
      if (err.response?.status === 500) {
        setServerError(t(ACCOUNT_ERROR.SERVER_UNKNOWN_ERROR));
      } else {
        setError(true);
        setServerError("");
      }
      //todo: handle others errors
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
  const handleSubmit = (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event?.preventDefault();
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
    <Container sx={{ height: `${viewportHeight}px` }}>
      <WrapContent>
        <WrapTitle>{t("account.forgotPassword")}</WrapTitle>
        <WrapHintText>
          <WrapSignUp onClick={() => history.replace(routers.SIGN_IN)}>{t("common.signIn")}</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          {!success ? (
            <WrapForm>
              {serverError ? (
                <Box textAlign="left" pt={"24px"}>
                  <AlertCustom variant={theme.isDark ? "filled" : "standard"} severity="error">
                    {serverError}
                  </AlertCustom>
                </Box>
              ) : (
                error && (
                  <Box textAlign="left" pt={"24px"}>
                    <AlertCustom variant={theme.isDark ? "filled" : "standard"} severity="error">
                      {t("validation.email.invalid")}
                    </AlertCustom>
                  </Box>
                )
              )}
              <BackButton onClick={() => handleRedirect()}>
                <HiArrowLongLeft fontSize="16px" color={theme.palette.secondary.light} />
                <BackText>{t("common.back")}</BackText>
              </BackButton>
              <CloseButton saving={0} onClick={() => handleRedirect(true)}>
                <IoMdClose color={theme.palette.secondary.light} />
              </CloseButton>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <CustomIcon height={20} fill={theme.palette.secondary.light} icon={EmailIcon} />
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
                disabled={loading || !!formData.email.error || !formData.email.value}
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
