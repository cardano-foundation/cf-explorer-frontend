import { forwardRef } from "react";
import { BoxProps } from "@mui/material";

import { OutlineEye } from "src/commons/resources";

import { CircleBoxOutline, PrimaryText, SquareBox } from "./styles";

export interface RedeemerProps extends BoxProps {
  onClick?: () => void;
}
const Redeemer: React.FC<RedeemerProps> = forwardRef(({ onClick, ...rest }, ref) => {
  return (
    <SquareBox {...rest} ref={ref}>
      <PrimaryText>Redeemer</PrimaryText>
      <CircleBoxOutline onClick={onClick}>
        <OutlineEye />
      </CircleBoxOutline>
    </SquareBox>
  );
});

Redeemer.displayName = "Redeemer";

export default Redeemer;
