import { Box, Button, Input, MenuItem, Select, styled } from "@mui/material";

export const Form = styled("form")<{ home: number; sidebar?: number }>(({ theme, home, sidebar }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: home ? 785 : 400,
  minWidth: 400,
  height: home ? 60 : 44,
  margin: "auto",
  borderRadius: home ? 30 : 8,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: `0px 0px 0px ${home ? 15 : 0}px`,
  boxSizing: "border-box",
  marginTop: home ? 30 : 0,
  border: `1.5px solid ${theme.palette.primary[200]}`,
  [theme.breakpoints.down("lg")]: {
    minWidth: sidebar ? "unset" : home ? 785 : 400
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "unset",
    maxWidth: "unset"
  }
}));

export const StyledSelect = styled(Select)<{ home: number }>`
  font-size: ${(props) => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  width: ${(props) => (props.home ? 150 : 130)}px;
  min-width: max-content;
  position: relative;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: ${(props) => (props.home ? 130 : 110)}px;
    min-width: max-content;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.home ? 50 : 34)}px !important;
    padding: 5px 10px;
    font-weight: var(--font-weight-normal);
    border-radius: 0px !important;
    padding-right: 40px !important;
    min-width: 80px;
    color: ${(props) => props.theme.palette.secondary.light};
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${(props) => props.theme.palette.secondary.light};
    font-size: 1.75rem;
  }
`;
export const SelectOption = styled(MenuItem)<{ home: number }>`
  font-size: ${(props) => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-normal);
`;

export const StyledInput = styled(Input)<{ home: number }>`
  padding: 0px 0px 0px ${(props) => (props.home ? 20 : 10)}px;
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  font-size: ${(props) => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  width: 100%;
  border-left: 2px solid ${(props) => props.theme.palette.border.main};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0px 0px 0px 10px;
  }
  & > input {
    padding: ${(props) => (props.home ? 5 : 0)}px;
  }
`;

export const SubmitButton = styled(Button)<{ home: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: ${(props) => (props.home ? 50 : 12.5)}%;
  min-width: ${(props) => (props.home ? 60 : 44)}px;
  width: ${(props) => (props.home ? 60 : 44)}px;
  height: ${(props) => (props.home ? 60 : 44)}px;
`;
export const Image = styled("img")<{ home: number }>`
  width: ${(props) => (props.home ? 24 : 20)}px;
  height: ${(props) => (props.home ? 24 : 20)}px;
`;

export const OptionsWrapper = styled(Box)<{ home: number }>(({ theme, home }) => ({
  position: "absolute",
  top: home ? 61 : 45,
  left: home ? 145 : 0,
  width: home ? "calc(100% - 280px)" : "100%",
  boxSizing: "border-box",
  backgroundColor: theme.palette.common.white,
  textAlign: "left",
  padding: "0 10px",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  zIndex: 1000,
  boxShadow: theme.shadow.card,
  [theme.breakpoints.down("md")]: {
    top: home ? 61 : 45
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    left: 0
  }
}));

export const Option = styled(Button)(({ theme }) => ({
  textTransform: "inherit",
  color: theme.palette.common.black,
  width: "100%",
  justifyContent: "space-between",
  margin: "4px 0"
}));

export const ValueOption = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "500"
}));

export const WrapInput = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));
