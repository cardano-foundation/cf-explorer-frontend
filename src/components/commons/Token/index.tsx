import { styled, StyledComponentProps } from "@mui/material";
import { ADAIcon } from "../../../commons/resources";

interface TokenProps {
  size?: number | string;
  color?: "black" | "white";
}

const StyledADA = styled("img")<TokenProps>`
  filter: invert(${props => (props.color === "white" ? 0 : 1)});
  width: ${props => (typeof props.size === "number" ? `${props.size}px` : props.size || `1em`)};
  height: ${props => (typeof props.size === "number" ? `${props.size}px` : props.size || `1em`)};
`;

export const ADAToken: React.FC<StyledComponentProps & TokenProps> = props => {
  return <StyledADA src={ADAIcon} {...props} />;
};
const Token = () => {
  return <div>hihi</div>;
};

export default Token;
