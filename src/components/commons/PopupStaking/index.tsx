import { Box, styled } from "@mui/material";
import { AddressIcon } from "../../../commons/resources";
import { getShortHash } from "../../../commons/utils/helper";
import CopyButton from "../CopyButton";

import { Link } from "react-router-dom";
import { details } from "../../../commons/routers";

const PopupStaking = ({ hash }: { hash: string }) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <AddressIcon fill="#108AEF" />
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
  margin: `0 ${theme.spacing(1)}`,
}));
