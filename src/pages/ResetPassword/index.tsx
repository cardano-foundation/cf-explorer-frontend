import { Box, FormGroup, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { FailIcon, HideIcon, LockIcon, ShowIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { resetPassword, verifyCodeResetPassword } from "src/commons/utils/userRequest";

import {
  Container,
  FormHelperTextCustom,
  InputCustom,
  Label,
  Title,
  WrapButton,
  WrapContent,
  WrapForm,
  WrapInput,
  WrapTitle
} from "./styles";

interface IForm {
  password: {
    value: string;
    error?: string;
    touched?: boolean;
  };
  confirmPassword: {
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
export default function ResetPassword({ codeVerify = "" }: { codeVerify?: string }) {
  const history = useHistory();
  const path = useLocation();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasErrorForm, setHasErrorForm] = useState(false);
  const [initing, setIniting] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    confirmPassword: {
      value: ""
    },
    password: {
      value: ""
    }
  });

  useEffect(() => {
    document.title = `${t("account.resetPassword")} | ${t("head.page.dashboard")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  useEffect(() => {
    setHasErrorForm(Boolean(formData.password.error || formData.confirmPassword.error));
  }, [formData]);

  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "password":
        if (!value) {
          error = t("validation.password");
        } else if (
          value.length < 8 ||
          value.length > 30 ||
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(value)
        ) {
          error = t("validation.password.length");
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = t("validation.passwordConfirm");
        } else if (value !== formData.password.value) {
          error = t("validation.password.notMatch");
        }
        break;
      default:
    }
    return error;
  };
  useEffect(() => {
    const params = new URLSearchParams(path.search);
    const code = params.get("code");
    if (code || codeVerify) {
      setCode(code || codeVerify);
    } else {
      history.push(routers.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path.search]);

  useEffect(() => {
    if (!code) return;
    verifyCode();
  }, [code]);

  async function verifyCode() {
    setIniting(true);
    const { data } = await verifyCodeResetPassword({ code });
    if (!data) {
      setError(true);
    }
    setIniting(false);
  }

  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
      touched: event.target.value.trim() !== "",
      error: getError(event.target.name, event.target.value)
    });
  };
  const handleResetPassword = async (password: string) => {
    try {
      setLoading(true);
      const { data } = await resetPassword({ code, password });
      if (data.code === "SS_0") {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const enableButton = Object.values(formData).every((value) => value.touched) && !hasErrorForm && !loading;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableButton, formData, success, error]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !success && !error) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!enableButton) return;
    let hasErrorField = false;
    const errorPassword = getError("password", formData.password.value);
    const errorConfirmPassword = getError("confirmPassword", formData.confirmPassword.value);
    if (errorConfirmPassword) {
      hasErrorField = true;
      setFormData({
        name: "confirmPassword",
        touched: true,
        error: errorConfirmPassword
      });
    }
    if (errorPassword) {
      hasErrorField = true;
      setFormData({
        name: "password",
        touched: true,
        error: errorPassword
      });
    }
    if (!hasErrorField) {
      handleResetPassword(formData.password.value);
    }
  };

  if (initing) return null;

  return (
    <Container>
      <WrapContent>
        <WrapTitle>{t("account.resetPassword")}</WrapTitle>
        <FormGroup>
          {!success && !error ? (
            <WrapForm>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <LockIcon />
                    </Box>
                  }
                  value={formData.password.value}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword}>
                        {showPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({
                      name: "confirmPassword",
                      value: "",
                      touched: false,
                      error: ""
                    });
                  }}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder={t("account.newPassword")}
                  error={Boolean(formData.password.error && formData.password.touched)}
                />
                {formData.password.error && formData.password.touched ? (
                  <FormHelperTextCustom>{formData.password.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <LockIcon />
                    </Box>
                  }
                  fullWidth
                  value={formData.confirmPassword.value}
                  name="confirmPassword"
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleToggleConfirmPassword}>
                        {showConfirmPassword ? <ShowIcon /> : <HideIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder={t("account.confirmPassword")}
                  error={Boolean(formData.confirmPassword.error && formData.confirmPassword.touched)}
                />
                {formData.confirmPassword.error && formData.confirmPassword.touched ? (
                  <FormHelperTextCustom>{formData.confirmPassword.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapButton variant="contained" fullWidth onClick={handleSubmit} disabled={!enableButton}>
                {t("common.submit")}
              </WrapButton>
            </WrapForm>
          ) : !error ? (
            <WrapForm>
              <Label>{t("message.resetPassword.success")}</Label>
              <WrapButton variant="contained" fullWidth onClick={() => history.replace(routers.SIGN_IN)}>
                {t("common.signIn")}
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm alignItems={"center"}>
              <FailIcon />
              <Title>{t("account.resetPasswordFail")}</Title>
              <Box>
                <Label mb={1}>{t("account.error.verify")}</Label>
                <Label>{t("account.expired.link")}</Label>
              </Box>
              <WrapButton variant="contained" fullWidth onClick={() => history.replace(routers.HOME)}>
                {t("account.goToDashboard")}
              </WrapButton>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
