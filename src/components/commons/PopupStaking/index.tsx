import { Box, styled, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { AddressIcon } from "src/commons/resources";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import CopyButton from "../CopyButton";

const PopupStaking = ({ hash }: { hash: string }) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"}>
      <AddressIcon fill={theme.palette.blue[100]} />
      <Hash to={details.transaction(hash)}>{getShortHash(hash)}</Hash>
      <CopyButton text={hash} />
    </Box>
  );
};

export default PopupStaking;

const Hash = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.blue[100]} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`
}));
