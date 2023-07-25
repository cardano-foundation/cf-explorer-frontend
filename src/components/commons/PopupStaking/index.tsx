import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { AddressIcon } from "src/commons/resources";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import CopyButton from "../CopyButton";

const PopupStaking = ({ hash }: { hash: string }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <AddressIcon fill="#0052CC" />
      <Hash to={details.transaction(hash)}>{getShortHash(hash)}</Hash>
      <CopyButton text={hash} />
    </Box>
  );
};

export default PopupStaking;

const Hash = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.blue[800]} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`
}));
