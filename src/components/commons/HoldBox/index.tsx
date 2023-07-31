import { forwardRef } from "react";
import { BoxProps, IconButton, styled, Box, Typography } from "@mui/material";

import { ButtonListIcon } from "src/commons/resources";
import { formatADAFull } from "src/commons/utils/helper";

import { AdaLogoIcon } from "../ADAIcon";
import PopupStaking from "../PopupStaking";
import PopperStyled from "../PopperStyled";

const HoldContainer = styled(Box)(({ theme }) => ({
  height: "35px",
  width: 184,
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
  gap: 5,
  margin: 0,
  "::after": {
    content: '"HOLD"',
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
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    lineHeight: "19px",
    padding: "16px 15px",
    gap: 10,
    width: 184
  },
  [theme.breakpoints.down("sm")]: {
    gap: 5,
    padding: "16px 8px",
    width: 135
  }
}));

const Value = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  gap: 10,
  [theme.breakpoints.down("sm")]: {
    gap: 5
  }
}));

const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: ".125rem",
  width: 11,
  minWidth: 11,
  [theme.breakpoints.down("md")]: {
    fontSize: 12
  }
}));

const Button = styled(IconButton)<{ over?: number }>(({ theme, over }) => ({
  background: theme.palette.primary[100],
  [theme.breakpoints.down(over ? "lg" : "sm")]: {
    padding: 3
  }
}));

interface Props extends BoxProps {
  value?: number | string;
  txHash: string;
  roundingNumber?: number;
}
const HolderValueLabel = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  wordBreak: "break-word",
  textAlign: "right",
  lineHeight: "20px",
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16
  }
}));

export const HoldBox = forwardRef<HTMLElement, Props>((props, feeRef) => {
  const { value, txHash, roundingNumber = 6, children, ...boxProps } = props;
  const isOverText =
    typeof feeRef !== "function" &&
    !!feeRef?.current &&
    feeRef?.current?.getBoundingClientRect?.()?.width < 200 &&
    formatADAFull(value || 0).length > 8;

  return (
    <PopperStyled
      render={({ handleClick }) => (
        <HoldContainer {...boxProps} ref={feeRef}>
          <Value>
            <HolderValueLabel>{formatADAFull(value || 0, roundingNumber)}</HolderValueLabel>
            <StyledAdaLogoIcon />
          </Value>
          {children}
          <Button
            onClick={() => typeof feeRef !== "function" && feeRef?.current && handleClick(feeRef?.current)}
            over={+isOverText}
          >
            <ButtonListIcon />
          </Button>
        </HoldContainer>
      )}
      content={<PopupStaking hash={txHash} />}
    />
  );
});

HoldBox.displayName = "HoldBox";

export default HoldBox;
