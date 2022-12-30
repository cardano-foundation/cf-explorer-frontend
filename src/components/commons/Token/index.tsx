import { Box, styled, StyledComponentProps } from "@mui/material";
import { TokenADA } from "../../../commons/resources";

interface TokenProps {
  size?: number | string;
  color?: "black" | "white";
}

const StyledADA = styled("img")<TokenProps>`
  filter: invert(${props => (props.color === "white" ? 1 : 0)});
  width: ${props => (typeof props.size === "number" ? `${props.size}px` : props.size || `1.5em`)};
  height: ${props => (typeof props.size === "number" ? `${props.size}px` : props.size || `1.5em`)};
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

export const ADAToken: React.FC<StyledComponentProps & TokenProps> = props => {
  return (
    <Box position={"relative"} component="span">
      <StyledADA src={TokenADA} {...props} />
    </Box>
  );
};
const Token = () => {
  return <div>hihi</div>;
};

export default Token;
