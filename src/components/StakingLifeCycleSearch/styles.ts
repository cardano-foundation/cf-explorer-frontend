import { Box, styled, Button, Typography } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingBottom: "50px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "37px 5px"
  }
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  maxWidth: "min(800px, 80vw)",
  background: theme.palette.secondary[0],
  paddingLeft: 30,
  borderRadius: 100,
  marginBottom: 15,
  height: 58,
  border: `1.5px solid ${theme.palette.primary[200]}`,
  "&:focus-within": {
    borderColor: theme.palette.secondary.light
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => theme.palette.secondary[0]};
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  min-width: 60px;
  width: 60px;
  height: 60px;
`;

export const Image = styled("img")`
  width: 20px;
  height: 20px;
`;

export const Title = styled("h1")`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 30px;
  }
`;

export const SearchTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  margin: "30px 0px 20px 0px",
  color: theme.palette.secondary.light,
  textWrap: "balance",
  [theme.breakpoints.down("md")]: {
    margin: "60px 0px 20px 0px",
    padding: "0px 60px"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 0px 20px 0px",
    padding: "0px 5px",
    flexDirection: "column"
  }
}));

export const InfoLink = styled("span")`
  color: ${(props) => props.theme.palette.primary.main};
  text-decoration: underline;
  margin-left: 6px;
  cursor: pointer;
`;

export const ExampleBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    flex-direction: row;
    gap: 24px;
  }
`;

export const SearchButton = styled(Button)`
  height: 51px;
  display: flex;
  gap: 8px;
  color: ${(props) => (props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.secondary[0])};
  background: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  border-radius: 8px;
  padding: 12px 20px 12px 12px;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 117px;
  }
  &:hover {
    background: ${(props) => props.theme.palette.primary.main};
    opacity: 0.8;
  }
`;

export const TextOR = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const StyledIconQuestion = styled(AiOutlineQuestionCircle)`
  margin-left: 8px;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: block;
    margin: 8px auto;
  }
`;
