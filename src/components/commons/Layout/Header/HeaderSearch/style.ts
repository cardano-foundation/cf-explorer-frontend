import { Box, Button, Input, MenuItem, Select, styled } from "@mui/material";

export const Form = styled("form")<{ home: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${props => (props.home ? 785 : 400)}px;
  min-width: 400px;
  height: ${props => (props.home ? 60 : 44)}px;
  margin: auto;
  border-radius: ${props => (props.home ? 30 : 8)}px;
  background-color: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.primary};
  padding: 0px 0px 0px ${props => (props.home ? 15 : 0)}px;
  box-sizing: border-box;
  margin-top: ${props => (props.home ? 30 : 0)}px;
  @media screen and (max-width: 1023px) {
    min-width: unset;
    max-width: unset;
  }
`;

export const StyledSelect = styled(Select)<{ home: number }>`
  font-size: ${props => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  width: ${props => (props.home ? 150 : 130)}px;
  min-width: max-content;
  position: relative;
  @media screen and (max-width: 539px) {
    width: ${props => (props.home ? 130 : 110)}px;
    min-width: max-content;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => (props.home ? 50 : 34)}px !important;
    padding: 5px 10px;
    font-weight: var(--font-weight-normal);
    border-radius: 0px !important;
    padding-right: 40px !important;
    min-width: 80px;
    color: ${props => props.theme.palette.text.primary};
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${props => props.theme.palette.grey[400]};
    font-size: 1.75rem;
  }
`;
export const SelectOption = styled(MenuItem)<{ home: number }>`
  font-size: ${props => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  color: ${props => props.theme.palette.grey[400]};
  font-weight: var(--font-weight-normal);
`;

export const StyledInput = styled(Input)<{ home: number }>`
  padding: 0px 0px 0px ${props => (props.home ? 20 : 10)}px;
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  font-size: ${props => (props.home ? `var(--font-size-text-large)` : `var(--font-size-text-small)`)};
  width: 100%;
  border-left: 2px solid ${props => props.theme.palette.border.main};
  @media screen and (max-width: 539px) {
    padding: 0px 0px 0px 10px;
  }
  & > input {
    padding: ${props => (props.home ? 5 : 0)}px;
  }
`;

export const SubmitButton = styled(Button)<{ home: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: ${props => (props.home ? 50 : 12.5)}%;
  min-width: ${props => (props.home ? 60 : 44)}px;
  width: ${props => (props.home ? 60 : 44)}px;
  height: ${props => (props.home ? 60 : 44)}px;
`;
export const Image = styled("img")<{ home: number }>`
  width: ${props => (props.home ? 24 : 20)}px;
  height: ${props => (props.home ? 24 : 20)}px;
`;

export const OptionsWrapper = styled(Box)<{ home: number }>(({ theme, home }) => ({
  position: "absolute",
  top: home ? "61px" : "44px",
  left: home ? "175px" : "0",
  width: home ? "calc(100% - 370px)" : "380px",
  backgroundColor: theme.palette.common.white,
  textAlign: "left",
  padding: "0 10px",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  zIndex: 10,
}));

export const Option = styled(Button)(({ theme }) => ({
  textTransform: "inherit",
  color: theme.palette.common.black,
  width: "100%",
  justifyContent: "space-between",
  margin: "4px 0",
}));

export const ValueOption = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "500",
}));
