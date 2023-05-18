import { Box, IconButton, styled } from "@mui/material";

export const ModalContainer = styled(Box)<{ width?: number | string; viewwidth?: string | number }>(
  ({ theme, width, viewwidth }) => ({
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `min(${viewwidth || "70"}vw, ${typeof width === "string" ? width : `${width || 500}px`})`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px",
      "& > button": {
        right: "15px",
        zIndex: 10
      },
      width: "90vw"
    }
  })
);

export const CloseButton = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
`;

export const WrapTitle = styled(Box)`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

export const ContentContainer = styled(Box)<{ wiithtitle?: number }>`
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;
