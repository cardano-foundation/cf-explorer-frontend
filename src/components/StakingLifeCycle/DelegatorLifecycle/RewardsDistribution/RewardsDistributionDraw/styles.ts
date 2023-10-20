import { Box, Typography, alpha, styled } from "@mui/material";

import { ADAOrangeIcon } from "src/commons/resources";
import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";

export const DrawContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "max-content",
  position: "relative",
  marginTop: 35,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: 55
  }
}));

export const StyledCardanoBlockchain = styled(CardanoBlockchain)(() => ({
  width: 270,
  height: 270,
  margin: "0px -15px"
}));

export const RectBox = styled(Box)<{ disabled?: number }>(({ disabled, theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.03)",
  borderRadius: 12,
  gap: 12,
  padding: "15px 20px",
  backgroundColor: disabled ? theme.palette.secondary[600] : theme.palette.secondary[0],
  boxSizing: "border-box",
  position: "relative",
  "& > image": {
    opacity: disabled ? 0.5 : 1
  },
  cursor: disabled ? "not-allowed" : "pointer"
}));

export const DisableAbleLabel = styled(Typography)<{ disabled?: number }>(({ theme, disabled }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: disabled
    ? theme.palette.secondary[0]
    : theme.mode === "light"
    ? theme.palette.secondary[600]
    : theme.palette.secondary.main,
  textAlign: "left",
  flex: 1
}));

export const RewardAccountCcontainer = styled(RectBox)(({ theme }) => ({
  borderRadius: 50,
  width: "100%",
  maxWidth: 225,
  height: 266,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 12,
  cursor: "pointer",
  [theme.breakpoints.between("lg", "xl")]: {
    maxWidth: 200
  }
}));

export const HolderWrapper = styled(Box)(({ theme }) => ({
  padding: "20px 35px",
  border: `1.5px solid ${theme.palette.primary[200]}`,
  background: alpha(theme.palette.secondary.light, 0.03),
  borderRadius: 25,
  width: "100%",
  maxWidth: 340,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 25,
  cursor: "pointer",
  [theme.breakpoints.down("xl")]: {
    maxWidth: 340,
    padding: "20px 35px"
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 340,
    padding: "20px"
  }
}));

export const AdaAmountWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 55,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row-reverse"
  }
}));

export const RewardValueLabel = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  fontSize: 14
}));

export const ClickAbleButton = styled(Box)(() => ({
  display: "inline-block",
  cursor: "pointer",
  marginRight: 4,
  height: 30
}));

export const FacingImg = styled("img")(() => ({
  width: 70,
  height: 70
}));

export const RewardBoxImg = styled("img")(() => ({
  width: 100,
  height: 100
}));

export const RewardValue = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 5,
  color: theme.palette.secondary.main
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 11,
  fill: theme.palette.secondary.main,
  marginBottom: ".125em"
}));

export const AdaBox = styled(Box)(() => ({
  width: 70,
  height: 70,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  cursor: "pointer"
}));

export const StyledADAOrangeIcon = styled(ADAOrangeIcon)(() => ({
  "&:hover": {
    opacity: 0.8
  }
}));

export const IconWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.border.primary};
  border-radius: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -14px;
  right: -14px;
  cursor: pointer;
`;

export const OperatorRewardWrapper = styled(Box)<{ isRewardPool?: number }>`
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    width: 44px;
    height: 44px;
    display: ${({ isRewardPool }) => (isRewardPool ? "block" : "none")};
    position: absolute;
    top: -16px;
    right: -16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.secondary[900]};
  }
`;

export const OperatorRewardContainer = styled(Box)`
  position: relative;
`;

export const RewardsModalContent = styled(Box)`
  width: 100%;
  max-width: 550px;
  color: ${({ theme }) => theme.palette.secondary.light};
  max-height: 78vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const RewardAccountTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
