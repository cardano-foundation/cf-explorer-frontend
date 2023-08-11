import { styled } from "@mui/material";

import { ADAsymbol } from "../../../commons/resources";

const ADAicon = ({ ...props }) => {
  return <ADAsymbol data-testid="ada-icon" width={10} {...props} />;
};

export const AdaLogoIcon = styled(ADAsymbol)(() => ({
  display: "inline-block",
  width: "auto",
  height: "1em",
  g: { fill: "currentColor" }
}));

export default ADAicon;
