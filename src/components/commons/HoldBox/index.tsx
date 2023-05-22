import { BoxProps, IconButton, styled } from "@mui/material";
import { forwardRef } from "react";
import { ButtonListIcon } from "~/commons/resources";
import PopoverStyled from "../PopoverStyled";
import { useSelector } from "react-redux";
import { formatADAFull } from "~/commons/utils/helper";
import { Box } from "@mui/material";
import { AdaLogoIcon } from "../ADAIcon";
import PopupStaking from "../PopupStaking";

const HoldContainer = styled(Box)<{ sidebar?: number }>(({ theme, sidebar }) => ({
  height: "35px",
  width: 184,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
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
    background: theme.palette.red[600],
    transform: " translate(0, 60%)"
  },
  [theme.breakpoints.down(sidebar ? "lg" : "md")]: {
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
  gap: 10,
  [theme.breakpoints.down("sm")]: {
    gap: 5
  }
}));

const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: ".125rem",
  [theme.breakpoints.down("md")]: {
    fontSize: 12
  }
}));

const Button = styled(IconButton)<{ over?: number; sidebar?: number }>(({ theme, over, sidebar }) => ({
  background: theme.palette.grey[100],
  [theme.breakpoints.down(over ? (sidebar ? "xl" : "lg") : "sm")]: {
    padding: 3
  }
}));

interface Props extends BoxProps {
  value?: number | string;
  txHash: string;
}

export const HoldBox = forwardRef<HTMLElement, Props>(({ value, txHash, ...props }, feeRef) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);

  return (
    <PopoverStyled
      render={({ handleClick }) => (
        <HoldContainer {...props} ref={feeRef} sidebar={+sidebar}>
          <Value>
            {formatADAFull(value || 0)}
            <StyledAdaLogoIcon />
          </Value>
          <Button
            onClick={() => typeof feeRef !== "function" && feeRef?.current && handleClick(feeRef?.current)}
            over={+(formatADAFull(value || 0).length > 9)}
            sidebar={+sidebar}
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
