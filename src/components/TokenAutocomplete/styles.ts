import { alpha, Button, TextField, styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const TitleDetail = styled(Box)`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
`;

export const ItemDetail = styled(Box)`
  width: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemLeft = styled(Box)`
  display: flex;
  align-items: center;
`;

export const ItemLeftTitle = styled(Box)`
  margin-left: 10px;
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 14px;
`;

export const AddressGroup = styled(Box)`
  margin-top: 15px;
  margin-bottom: 24px;
  background: ${(props) => props.theme.palette.secondary.light};
  border-radius: 8px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddressLink = styled(Link)`
  max-width: 90%;
  word-wrap: break-word;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 14px;
`;

export const Value = styled(Box)`
  color: black;
  font-weight: var(--font-weight-bold);
  font-size: 14px;
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border: 1.5px solid ${(props) => props.theme.palette.border.main};
    border-radius: 8px;
  }
  .MuiFormControl-root {
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const Option = styled("li")<{ active: number }>(({ theme, active }) => ({
  background: active ? theme.palette.green[200_10] : theme.palette.background.paper
}));

export const Logo = styled("img")`
  width: 25px;
  height: 25px;
  object-fit: cover;
`;
export const LogoEmpty = styled(Box)`
  width: 25px;
  height: 25px;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.6)};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.palette.border.main};
`;

export const ModalContainer = styled(Box)(({ theme }) => ({
  maxHeight: "80vh",
  overflow: "hidden",
  position: "relative",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  transform: "translate(-50%, -50%)",
  width: "min(80vw, 650px)",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 20,
  textAlign: "left",
  "& table tbody tr": {
    height: "55px"
  },
  "& > div:last-child > div > div:nth-of-type(2)": {
    height: "unset"
  }
}));

export const ButtonClose = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 30,
  height: 30,
  borderRadius: "50%",
  padding: 0,
  minWidth: 0
}));

export const SearchContainer = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 250px;
  background: ${(props) => props.theme.palette.background.paper};
  padding: 0 12px;
  border-radius: 8px;
  height: 35px;
  border: 1px solid ${(props) => alpha(props.theme.palette.primary.main, 0.2)};
`;

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 12.5%;
  min-width: 35px;
  width: 35px;
  height: 35px;
`;

export const Image = styled("img")`
  width: 20px;
  height: 20px;
`;

export const AssetName = styled(Link)`
  color: ${(props) => props.theme.palette.secondary.main} !important;
  font-family: var(--font-family-text) !important;
`;
