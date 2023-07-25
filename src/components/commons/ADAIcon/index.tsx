import { Box, styled } from "@mui/material";

import { OfficialAdaIcon } from "../../../commons/resources";

const ADAicon = ({ ...props }) => {
  return (
    <Box
      component={"span"}
      fontSize={"14px"}
      {...props}
      lineHeight={1}
      fontWeight={"regular"}
      color={({ palette }) => palette.secondary.main}
    >
      ₳
    </Box>
  );
};

export const AdaLogoIcon = styled(OfficialAdaIcon)(() => ({
  display: "inline-block",
  width: "auto",
  height: "1em",
  g: { fill: "currentColor" }
}));

export default ADAicon;
