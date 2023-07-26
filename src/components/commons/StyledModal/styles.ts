import { Box, IconButton, styled } from "@mui/material";

export const ModalContainer = styled(Box)<{ width?: number | string; viewwidth?: string | number; sidebar?: boolean }>(
  ({ theme, width, viewwidth }) => ({
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `min(${viewwidth || "70"}vw, ${typeof width === "string" ? width : `${width || 500}px`})`,
    backgroundColor: theme.palette.primary[100],
    borderRadius: 20,
    textAlign: "left",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px",
      "& > button": {
        right: "15px",
        zIndex: 10
      },
      width: "90vw",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column"
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
  border: 1px solid ${(props) => props.theme.palette.primary[200]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
`;

export const WrapTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 24,
  lineHeight: "28px",
  fontWeight: 700,
  marginBottom: 20,
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "calc(100% - 40px)",
    marginBottom: 0
  }
}));

export const ContentContainer = styled(Box)<{ wiithtitle?: number }>`
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;
