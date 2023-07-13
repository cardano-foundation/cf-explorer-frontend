import { alpha, TextField, styled, Box } from "@mui/material";
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
export const BackButton = styled(Box)`
  display: inline-flex;
  text-align: left;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-bold);
`;

export const StyledBoxCard = styled(Box)`
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
`;

export const TitleText = styled(Box)`
  color: ${(props) => props.theme.palette.grey[400]};
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 24px !important;
  }
`;

export const WrapHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  [theme.breakpoints.between("sm", "md")]: {
    paddingTop: "56px"
  }
}));

export const RedirectButton = styled(Box)(({ theme }) => ({
  textTransform: "capitalize",
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: `${theme.spacing(1)} ${theme.spacing(2)} `,
  ":hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.8)
  }
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[400],
  display: "block",
  textAlign: "left",
  flex: 1,
  paddingTop: "10px",
  paddingBottom: theme.spacing(2)
}));
