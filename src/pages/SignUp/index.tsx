import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

import useAuth from "src/commons/hooks/useAuth";
import { EmailIcon, HideIcon, LockIcon, ShowIcon, SuccessDarkIcon, SuccessIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { ACCOUNT_ERROR } from "src/commons/utils/constants";
import { signUp } from "src/commons/utils/userRequest";
import CustomIcon from "src/components/commons/CustomIcon";
import { useScreen } from "src/commons/hooks/useScreen";

interface IAction {
  name?: string;
  value?: string;
  touched?: boolean;
  error?: string;
}

import {
  BackButton,
  BackText,
  CloseButton,
  Container,
  FormHelperTextCustom,
  HighlightLink,
  InputCustom,
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
const formReducer = (state: IForm, event: IAction) => {
  if (!event.name) return state;
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
  const { t } = useTranslation();
  const history = useHistory();
  const { isMobile } = useScreen();
  const emailTextField = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState(false);
  const { isLoggedIn } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedAgree, setCheckedAgree] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme.mode === "light" ? theme.palette.primary[100] : theme.palette.secondary[100];
    document.body.style.height = isMobile ? "80vh" : "100vh";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    return () => {
      document.body.style.backgroundColor = "unset";
      document.body.style.height = "unset";
      document.body.style.display = "unset";
      document.body.style.alignItems = "unset";
    };
  }, []);
  useEffect(() => {
    document.title = `${t("page.signUp")} | ${t("head.page.dashboard")}`;
  }, [t]);

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
          error = t("validation.password");
        } else if (
          value.length < 8 ||
          value.length > 30 ||
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(value)
        ) {
          error = t("validation.password.length");
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
            error: t("validation.password.notMatch")
          });
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please enter your Confirm Password";
        } else if (value !== formData.password.value) {
          error = "Password does not match";
        }
        break;
      case "email":
        if (!value) {
          error = "Please enter your Email";
          // eslint-disable-next-line no-useless-escape
        } else if (!/^[\w-\.+!#$%&'*/=?^_`{|]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Please enter a valid email address";
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
            error: t("validation.email.notMatch")
          });
        }
        break;
      case "confirmEmail":
        if (!value) {
          error = "Please enter your Confirm Email";
        } else if (value !== formData.email.value) {
          error = t("validation.email.notMatch");
        }
        break;
      default:
    }
    return error;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  }, [enableButton, formData]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.errorCode === ACCOUNT_ERROR.EMAIL_IS_ALREADY_EXIST) {
          setFormData({
            name: "email",
            touched: true,
            error: t(ACCOUNT_ERROR.EMAIL_IS_ALREADY_EXIST),
            value: formData.email.value
          });
        } else {
          if (ACCOUNT_ERROR.EMAIL_IS_ALREADY_EXIST) {
            setFormData({
              name: "email",
              touched: true,
              error: t(ACCOUNT_ERROR.EMAIL_IS_ALREADY_EXIST),
              value: formData.email.value
            });
          }
        }
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
          <WrapTitle data-testid="signup-title">{t("page.signUp")}</WrapTitle>
          <WrapHintText>
            {t("account.haveAccount")}
            <WrapSignUp onClick={() => handleRedirect()}>{t("account.signInHere")}</WrapSignUp>
          </WrapHintText>
          <FormGroup>
            <WrapForm>
              <BackButton onClick={() => handleRedirect()}>
                <HiArrowLongLeft fontSize="16px" color={theme.palette.secondary.light} />
                <BackText>{t("common.back")}</BackText>
              </BackButton>
              <CloseButton saving={0} onClick={() => handleRedirect(true)}>
                <IoMdClose color={theme.palette.secondary.light} />
              </CloseButton>
              <WrapInput>
                <InputCustom
                  inputRef={emailTextField}
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <CustomIcon height={20} fill={theme.palette.secondary.light} icon={EmailIcon} />
                    </Box>
                  }
                  fullWidth
                  value={formData.email.value}
                  name="email"
                  onChange={handleChange}
                  error={Boolean(formData.email.error && formData.email.touched)}
                  placeholder={t("account.emailAddress")}
                  onKeyDown={(e) => handleKeyDown(e as unknown as KeyboardEvent)}
                />
                {formData.email.error && formData.email.touched ? (
                  <FormHelperTextCustom>{formData.email.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <CustomIcon height={20} fill={theme.palette.secondary.light} icon={EmailIcon} />
                    </Box>
                  }
                  fullWidth
                  value={formData.confirmEmail.value}
                  name="confirmEmail"
                  onChange={handleChange}
                  error={Boolean(formData.confirmEmail.error && formData.confirmEmail.touched)}
                  placeholder={t("account.confirmEmailAddress")}
                />
                {formData.confirmEmail.error && formData.confirmEmail.touched ? (
                  <FormHelperTextCustom>{formData.confirmEmail.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <CustomIcon height={25} fill={theme.palette.secondary.light} icon={LockIcon} />
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
                  placeholder={t("account.password")}
                />
                {formData.password.error && formData.password.touched ? (
                  <FormHelperTextCustom>{formData.password.error}</FormHelperTextCustom>
                ) : null}
              </WrapInput>
              <WrapInput>
                <InputCustom
                  startAdornment={
                    <Box paddingRight={"10px"} paddingTop={"5px"} paddingBottom={"2px"}>
                      <CustomIcon height={25} fill={theme.palette.secondary.light} icon={LockIcon} />
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
                  placeholder={t("account.confirmPassword")}
                />
                {formData.confirmPassword.error && formData.confirmPassword.touched ? (
                  <FormHelperTextCustom>{formData.confirmPassword.error}</FormHelperTextCustom>
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
                        },
                        color: ({ palette }) => palette.secondary.light
                      }}
                      size="medium"
                    />
                  }
                  label={
                    <Box
                      fontSize={"14px"}
                      color={({ palette }) => palette.secondary.main}
                      fontWeight={400}
                      display={"flex"}
                      flexWrap={"wrap"}
                      alignItems={"baseline"}
                      gap={"5px"}
                    >
                      {t("account.agreeToThe")}
                      <Link to={routers.TERMS_OF_SERVICE} target="_blank">
                        <HighlightLink>{t("account.termsAndConditions")}</HighlightLink>
                      </Link>
                      {t("common.and")}
                      <Link to={routers.POLICY} target="_blank">
                        <HighlightLink>{t("account.PrivacyPolicy")}</HighlightLink>
                      </Link>
                    </Box>
                  }
                />
              </Box>
              <WrapButton
                data-testid="signup-button"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={!enableButton}
              >
                {t("page.signUp")}
              </WrapButton>
            </WrapForm>
          </FormGroup>
        </WrapContent>
      ) : (
        <WrapContent>
          <WrapForm>
            <FormGroup>
              <Box textAlign={"center"}>
                {theme.isDark ? <SuccessDarkIcon /> : <SuccessIcon />}
                <Box paddingY={"15px"}>
                  <Title>{t("account.verifyYourEmail")}</Title>
                </Box>
                <Box paddingBottom={"30px"}>
                  <LabelInfo>
                    {t("account.clickForSentEmail")} <WrapEmail>{formData.email.value}</WrapEmail>{" "}
                    {t("account.finishAccSetup")}.
                  </LabelInfo>
                </Box>
              </Box>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                {t("common.signIn")}
              </WrapButton>
            </FormGroup>
          </WrapForm>
        </WrapContent>
      )}
    </Container>
  );
}
