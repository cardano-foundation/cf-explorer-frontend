import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = (string.charCodeAt(i) << 5) - hash;
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${
      name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : name.substring(0, 2)
    }`
  };
}

const DefaultImageWine = ({
  name = "",
  width,
  height,
  fontSize
}: {
  name: string;
  width?: string;
  height?: string;
  fontSize?: string;
}) => {
  const theme = useTheme();
  return (
    <Avatar
      {...stringAvatar(name)}
      sx={{
        width: width || 60,
        height: height || 60,
        fontSize: fontSize || 24,
        border: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`
      }}
    />
  );
};

export default DefaultImageWine;
