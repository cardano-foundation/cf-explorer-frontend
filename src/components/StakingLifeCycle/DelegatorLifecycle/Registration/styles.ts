import { Box, IconButton as IconButtonMui, styled } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import CertificateShape from "src/components/commons/CertificateShape";
import CustomModal from "src/components/commons/CustomModal";

export const MiddleGroup = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-around",
  marginTop: 40,
  gap: 10
}));

export const BoxGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  width: "max-content",
  margin: "auto",

  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    maxWidth: "calc(100% - 4px)"
  }
}));

export const WrapContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0]
}));

export const HoldBox = styled(Box)(({ theme }) => ({
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.error[700]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(2.5),
  marginLeft: theme.spacing(2.5),
  position: "relative",
  background: theme.palette.common.white,
  fontSize: "18px",
  lineHeight: "21px",
  fontWeight: 700,
  minWidth: "max-content",
  "::after": {
    content: `"${t("common.hold").toUpperCase()}"`,
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.error[700],
    transform: " translate(0, 60%)"
  }
}));

export const FeeBox = styled(HoldBox)(() => ({
  "::after": {
    content: `"${t("common.fees").toUpperCase()}"`
  }
}));

export const HoldBoxMobile = styled(HoldBox)(({ theme }) => ({
  margin: 0,
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    lineHeight: "19px",
    padding: "16px 8px",
    gap: 10,
    width: "calc(100% - 16px)"
  },
  [theme.breakpoints.down("sm")]: {
    gap: 5,
    padding: "16px 4px",
    width: "calc(100% - 8px)"
  }
}));

export const FeeBoxMobile = styled(HoldBoxMobile)(() => ({
  "::after": {
    content: `"${t("common.fees").toUpperCase()}"`
  }
}));

export const Value = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  [theme.breakpoints.down("sm")]: {
    gap: 5
  }
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: ".125rem",
  [theme.breakpoints.down("md")]: {
    fontSize: 12
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.primary[100]
}));

export const IconButtonBack = styled(IconButtonMui)(() => ({
  padding: 0
}));

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2)
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px"
}));
export const StakeLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.primary.main} !important;
  margin-right: 6px;
  ${({ theme }) => theme.breakpoints.down(theme.breakpoints.values.sm)} {
    overflow-wrap: break-word;
  }
`;

export const StepInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 36,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: 30
  }
}));

export const InfoGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  }
}));

export const CertificateShapeMobile = styled(CertificateShape)(() => ({
  width: 140,
  height: 220,
  margin: "auto"
}));

export const StyledCustomModal = styled(CustomModal)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[0],
  wordBreak: "break-all"
}));

export const StyledLink = styled(Link)`
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;
