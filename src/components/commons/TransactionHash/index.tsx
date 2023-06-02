import { Box } from "@mui/material";

import { getShortHash } from "src/commons/utils/helper";
import { CopyIcon } from "src/commons/resources";

import { AddressIconCustom, CopyContainer, HashText } from "./styles";

interface TransactionHashProps {
  hash: string;
}
export default function TransactionHash({ hash }: TransactionHashProps) {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Box sx={{ transform: "scale(1.2) translateY(10%)" }}>
        <AddressIconCustom />
      </Box>
      <HashText>{getShortHash(hash)}</HashText>
      <CopyContainer>
        <Box sx={{ transform: "scale(1.4) translateY(10%)" }}>
          <CopyIcon />
        </Box>
      </CopyContainer>
    </Box>
  );
}
