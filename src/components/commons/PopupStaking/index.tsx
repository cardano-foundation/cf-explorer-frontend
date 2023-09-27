import { Box, styled, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { AddressIcon, AddressIconDark } from "src/commons/resources";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import CopyButton from "../CopyButton";
import CustomIcon from "../CustomIcon";

const PopupStaking = ({ hash }: { hash: string }) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"}>
      <CustomIcon icon={theme.isDark ? AddressIconDark : AddressIcon} height={30} fill={theme.palette.primary.main} />
      <Hash to={details.transaction(hash)}>{getShortHash(hash)}</Hash>
      <CopyButton text={hash} />
    </Box>
  );
};

export default PopupStaking;

const Hash = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.primary.main} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`
}));
