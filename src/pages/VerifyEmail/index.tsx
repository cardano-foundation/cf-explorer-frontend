import { Box, CircularProgress, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { routers } from "src/commons/routers";
import { verifyActive } from "src/commons/utils/userRequest";
import { FailIcon, SuccessIcon } from "src/commons/resources";

import { Container, Label, Title, WrapButton, WrapContent, WrapForm } from "./styles";

export default function VerifyEmail() {
  const history = useHistory();
  const path = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Verify Email | Iris - Cardano Blockchain Explorer";
  }, []);

  const handleVerify = async (code: string) => {
    try {
      const response = await verifyActive({ code });
      setLoading(false);
      setSuccess(response.data.code === "SS_0");
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(path.search);
    const code = params.get("code");
    if (code) {
      handleVerify(code);
    } else {
      history.push(routers.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path.search]);
  return (
    <Container>
      <WrapContent>
        <FormGroup>
          {loading ? (
            <WrapForm>
              <Box textAlign={"center"}>
                <CircularProgress
                  sx={{
                    color: "grey"
                  }}
                />
              </Box>
            </WrapForm>
          ) : success ? (
            <WrapForm alignItems={"center"}>
              <SuccessIcon />
              <Title mb={3}>You have successfully verified the account.</Title>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                Sign In
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm alignItems={"center"}>
              <FailIcon />
              <Title>Verify Failed</Title>
              <Box>
                <Label mb={1}>There's been an error in the verify process</Label>
                <Label>This URL is either incorrect or has expired.</Label>
              </Box>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.HOME)}>
                Go to Dashboard
              </WrapButton>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
