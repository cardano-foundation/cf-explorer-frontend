import { Box, FormGroup } from "@mui/material";
import { useReducer, useState } from "react";
import { useHistory } from 'react-router-dom';
import { EmailIcon } from "../../commons/resources";
import { routers } from "../../commons/routers";
import { forgotPassword } from "../../commons/utils/userRequest";
import { AlertCustom, Container, FormHelperTextCustom, InputCustom, Label, WrapButton, WrapContent, WrapForm, WrapHintText, WrapInput, WrapSignUp, WrapTitle } from "./styles";

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
      value: event.value || '',
      error: event.error,
      touched: event.touched,
    }
  }
}
export default function ForgotPassword() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    email: {
      value: '',
    }
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const getError = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case 'email':
        if (!value) {
          error = "Please enter your Email";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Invalid Email";
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
  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { data } = await forgotPassword({email});
      if (data.code === 'SS_0'){
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const error = getError(formData.email.value, formData.email.value);
    if (error) {
      setFormData({
        name: 'email',
        touched: true,
        error,
      })
      return;
    }
    handleForgotPassword(formData.email.value);
  }
  return (
    <Container>
      <WrapContent>
        <WrapTitle>
          Forgot Password
        </WrapTitle>
        <WrapHintText>
          <WrapSignUp onClick={() => history.push(routers.SIGN_IN)}>Sign in</WrapSignUp>
        </WrapHintText>
        <FormGroup>
          {
            !success ?
              (<WrapForm>
                {error ? <AlertCustom severity="error">Invalid email information.</AlertCustom> : null}
                <WrapInput>
                  <Label>
                    Email
                  </Label>
                  <InputCustom
                    startAdornment={<Box paddingRight={"10px"} paddingTop={"7px"} paddingBottom={"2px"}>
                      <EmailIcon />
                    </Box>}
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    placeholder="Email"
                    error={Boolean(formData.email.error && formData.email.touched)}
                  />
                  {(formData.email.error && formData.email.touched) ? <FormHelperTextCustom error>{formData.email.error}</FormHelperTextCustom> : null}
                </WrapInput>
                <WrapButton variant="contained" fullWidth onClick={handleSubmit} disabled={loading}>
                  Submit
                </WrapButton>
              </WrapForm>)
              : (
                <WrapForm>
                  <Label>
                    Submit successfully. Please check your email to reset password.
                  </Label>
                </WrapForm>
              )}
        </FormGroup>
      </WrapContent>
    </Container >
  )
}
