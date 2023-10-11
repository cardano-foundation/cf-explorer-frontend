import { styled, useTheme } from "@mui/material";

import { ADAsymbol } from "../../../commons/resources";

const ADAicon = ({ ...props }) => {
  const theme = useTheme();
  return <ADAsymbol fill={theme.palette.secondary.main} data-testid="ada-icon" width={10} height={11} {...props} />;
};

export const AdaLogoIcon = styled(ADAsymbol)(() => ({
  display: "inline-block",
  width: "auto",
  height: "1em",
  g: { fill: "currentColor" }
}));

export default ADAicon;
