import { Box, styled } from "@mui/material";

export const NoRecordContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
`;

export const Message = styled(Box)`
  text-align: center;
  color: ${(props) => props.theme.palette.secondary.light};
  font-size: 16px;
  margin-top: 20px;
`;

export const Image = styled("img")`
  width: auto;
  height: 96px;
`;
