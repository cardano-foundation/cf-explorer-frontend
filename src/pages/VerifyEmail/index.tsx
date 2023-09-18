import { Box, CircularProgress, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { FailIcon, SuccessIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { verifyActive } from "src/commons/utils/userRequest";

import { Container, Label, Title, WrapButton, WrapContent, WrapForm } from "./styles";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const history = useHistory();
  const path = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = `${t("account.verifyEmail")} | ${t("head.page.dashboard")}`;
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
              <Title mb={3}>{t("account.verifySuccess")}</Title>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.SIGN_IN)}>
                {t("common.signIn")}
              </WrapButton>
            </WrapForm>
          ) : (
            <WrapForm alignItems={"center"}>
              <FailIcon />
              <Title>{t("account.verifyFailed")}</Title>
              <Box>
                <Label mb={1}>{t("account.error.verify")}</Label>
                <Label>{t("account.expired.link")}</Label>
              </Box>
              <WrapButton variant="contained" fullWidth onClick={() => history.push(routers.HOME)}>
                {t("account.goToDashboard")}
              </WrapButton>
            </WrapForm>
          )}
        </FormGroup>
      </WrapContent>
    </Container>
  );
}
