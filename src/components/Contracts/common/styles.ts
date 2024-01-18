import { Accordion, AccordionDetails, AccordionSummary, Box, Switch, Typography, styled, alpha } from "@mui/material";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

export const UnderlineText = styled(Typography)`
  text-decoration-line: underline;
  color: ${({ theme }) => theme.palette.secondary.light};
  font-weight: 500;
  cursor: pointer;
`;

export const ArrowIconContainer = styled(Box)<{ open?: number }>`
  rotate: ${({ open }) => (open ? 0 : 180)}deg;
`;

export const DataCardBox = styled(Box)`
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 1px 2px 4px 0px rgba(67, 70, 86, 0.2);
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white)};
  gap: 5px;
`;

export const DataTitle = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const SwitchLabel = styled(Typography)`
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light)};
  font-weight: 400;
`;

export const DataValue = styled(Typography)`
  font-weight: 400;
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light)};
  font-feature-settings: "clig" off, "liga" off;
  line-height: normal;
  line-break: anywhere;
  max-height: 40vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    border-radius: 8px 0px 0px 8px;
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const TagNumber = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const CLCardContaienr = styled(Box)`
  border-radius: 8px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 100%;
  box-shadow: 2px 2px 10px 0px rgba(67, 70, 86, 0.2);
  align-items: flex-start;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white)};
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px;
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light)};
  & > div {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: flex-start;
  }
`;

export const CLButton = styled("button")`
  width: 100%;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 1rem;
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100])};
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Roboto", monospace;
  transition: 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const ContractAddressLabel = styled(Typography)`
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const WrapLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.secondary.light,
  textAlign: "left"
}));

export const DataReferenceValue = styled(Typography)`
  font-weight: 400;
  color: ${({ theme }) => (theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light)};
  font-feature-settings: "clig" off, "liga" off;
  line-height: normal;
  line-break: anywhere;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    border-radius: 8px 0px 0px 8px;
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.palette.primary[100]};
    }
  }
`;

export const StyledAccordion = styled(Accordion)`
  background: transparent;
  box-shadow: none;

  &.muiaccordion-root:last-of-type: {
    box-shadow: none;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  padding-left: 0;
  padding-right: 0;
  min-height: unset;

  & > div:first-child {
    margin: 0;
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding-left: 0;
  padding-right: 0;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

const SWITCHER_HEIGHT = 32;
const SWITCHER_WIDTH = 56;
const SWITCHER_THUMB = 24;
const SWITCHER_THUMB_MARGIN = 4;
export const ViewSwitcher = styled(Switch)(({ theme }) => ({
  width: SWITCHER_WIDTH,
  height: SWITCHER_HEIGHT,
  boxSizing: "border-box",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: SWITCHER_THUMB_MARGIN,
    transitionDuration: "300ms",
    color: theme.palette.secondary[600],
    "&.Mui-checked": {
      transform: `translateX(${SWITCHER_WIDTH - SWITCHER_THUMB - 2 * SWITCHER_THUMB_MARGIN}px)`,
      color: theme.isDark ? theme.palette.secondary["main"] : theme.palette.primary[100],
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary["main"],
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.isDark ? theme.palette.grey[600] : theme.palette.grey[500]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.isDark ? 0.3 : 0.7
    }
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.isDark ? theme.palette.secondary[100] : theme.palette.common.white,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    }),
    borderRadius: SWITCHER_HEIGHT / 2,
    border: `1px solid ${theme.palette.grey["A100"]}`,
    boxSizing: "border-box"
  }
}));

export const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));
