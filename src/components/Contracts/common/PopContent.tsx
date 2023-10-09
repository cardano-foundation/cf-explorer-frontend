import { Box, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { formatLongText } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { TagNumber } from "./styles";

export interface PopContentProps {
  hash: string;
  num?: number;
  detail?: (href: string) => string;
}

const PopContent: React.FC<PopContentProps> = ({ hash, num, detail }) => {
  return (
    <Box display="flex" padding="4px" gap="2px">
      <CustomTooltip title={hash}>
        <Hash to={detail?.(hash) || "/"}>{formatLongText(hash)}</Hash>
      </CustomTooltip>{" "}
      {typeof num === "number" && <TagNumber>#{num}</TagNumber>}
      <CopyButton text={hash} />
    </Box>
  );
};

const Hash = styled(Link)(({ theme }) => ({
  fontSize: "1.125rem",
  color: `${theme.palette.primary.main} !important`,
  textDecoration: "underline !important",
  fontWeight: 500,
  margin: `0 ${theme.spacing(1)}`
}));

export default PopContent;
