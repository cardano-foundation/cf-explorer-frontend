import { alpha, Box, styled } from "@mui/material";
import Table from "../../../commons/Table";

export const AssetName = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.palette.text.secondary};
`;

export const LogoEmpty = styled(Box)`
  width: 30px;
  height: 30px;
  background: ${props => alpha(props.theme.palette.common.white, 0.6)};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.palette.border.main};
`;

export const Amount = styled(Box)`
  font-size: var(--font-size-text-small);
  color: ${props => props.theme.palette.text.secondary};
`;

export const TableProtocol = styled(Table)({
  "& tr th:last-child": {
    width: "120px",
  },
});
