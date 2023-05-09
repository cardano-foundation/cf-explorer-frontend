import { styled, Box, IconButton } from "@mui/material";

export const ModalContainer = styled(Box)<{ width?: number | string, vw?: string | number }>(({ theme, width, paddingX, paddingY, vw }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: `min(${vw}vw, ${typeof width === "string" ? width : `${width || 500}px`})`,
  backgroundColor: theme.palette.background.paper,
  padding: `${paddingY}px ${paddingX}px`,
  borderRadius: 20,
  textAlign: "left",
}));

export const CloseButton = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${props => props.theme.palette.grey["A100"]};
  cursor: ${props => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${props => (props.saving ? `background: none;` : ``)}
  }
`;

export const WrapTitle = styled(Box)`
  color: ${props => props.theme.palette.text.primary};
  font-size: 24px;
  font-height: 28px;
  font-weight: 700;
  margin-bototm: 20;
`;
