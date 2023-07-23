import { Box, styled } from "@mui/material";

import { AddressIcon } from "src/commons/resources";

export const AddressIconCustom = styled(AddressIcon)`
  path {
    fill: ${(props) => props.theme.palette.secondary.main};
  }
  rect {
    fill: ${(props) => props.theme.palette.common.white};
  }
`;

export const HashText = styled(Box)`
  color: ${(props) => props.theme.palette.secondary.main};
  text-decoration: underline;
  margin: 0px 5px;
  font-size: 18px;
  font-weight: 500;
`;

export const CopyContainer = styled(Box)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${(props) => props.theme.palette.primary[100]};
  display: flex;
  align-items: center;
  justify-content: center;
`;
