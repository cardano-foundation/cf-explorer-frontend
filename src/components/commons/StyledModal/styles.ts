import { styled, Box, IconButton } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 500px)",
  backgroundColor: theme.palette.background.paper,
  padding: "50px 40px",
  borderRadius: 20,
  textAlign: "left",
}));

export const CloseButton = styled(IconButton)<{ saving: boolean }>`
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

export const WrapTitle = styled("span")`
  color: ${props => props.theme.palette.text.primary};
  font-size: 24px;
  font-height: 28px;
  font-weight: 700;
`
