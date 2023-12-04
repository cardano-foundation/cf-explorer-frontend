import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useTheme } from "@emotion/react";
import { SxProps } from "@mui/material";

import { BackButton, BackText } from "../../AddressDetail/AddressHeader/styles";

const ButtonBack = ({ sx }: { sx?: SxProps }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <BackButton onClick={history.goBack} sx={sx} data-testid="back-button">
      <HiArrowLongLeft color={theme.palette.secondary.light} />
      <BackText>{t("common.back")}</BackText>
    </BackButton>
  );
};

export default ButtonBack;
