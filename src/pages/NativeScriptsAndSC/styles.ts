import {
  Accordion,
  AccordionDetails,
  AccordionSummary as AccordionSummaryMUI,
  Box,
  Container,
  IconButton,
  styled,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  marginLeft: "8px",
  fontWeight: "bold",
  textTransform: "capitalize",
  fontSize: "18px",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const TitleModal = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 24,
  fontWeight: 700,
  paddingBottom: "20px"
}));

export const SubTitleModal = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: 16,
  fontWeight: 600,
  paddingBottom: "16px"
}));

export const StyledAddressModal = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.6
}));

export const ContentModal = styled(Box)(({ theme }) => ({
  padding: "16px 20px",
  background: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  borderRadius: "8px",
  boxShadow: " 1px 2px 4px 0px rgba(67, 70, 86, 0.20)"
}));

export const ButtonViewModal = styled(Box)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  cursor: pointer;
`;

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 16px 0px",
  [theme.breakpoints.down("md")]: {
    paddingTop: 0
  }
}));

export const WrapHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: "30px"
  }
}));

export const BackButton = styled(Box)`
  display: inline-flex;
  text-align: left;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const DetailHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 21px;
`;

export const DetailContainer = styled(Box)<{ isMobile?: number }>`
  margin: 0 25px;
`;

export const DetailContent = styled(Box)`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
`;

export const ContractSideViewContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ContractSideViewContent = styled(Box)`
  margin-top: 16px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;
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

export const EllipsisContainer = styled(Box)`
  font-weight: bold;
  flex: 1;
  color: ${(props) => props.theme.palette.primary.main};
  max-width: 58vw;
  ${({ theme }) => theme.breakpoints.up(420)} {
    max-width: 59vw;
  }
  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 57vw;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 47vw;
  }
  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 55vw;
  }
`;

export const SubHeaderLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "16px",
  fontWeight: 400,
  margin: "5px 0"
}));

export const SubHeaderValue = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "16px",
  fontWeight: "700"
}));

export const StyledAddress = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "16px",
  fontWeight: "700",
  padding: "8px 0"
}));

export const StyledContractTabs = styled(Box)(() => ({
  width: "100%"
}));

export const StyledAccordionSummary = styled(AccordionSummaryMUI)<{ active: number }>(({ active }) => ({
  padding: `18px 25px ${active ? 0 : "18px"} 25px`
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "5px 25px 16px 25px",
  [theme.breakpoints.down(340)]: {
    paddingLeft: 15,
    paddingRight: 15
  },
  [theme.breakpoints.down(400)]: {
    padding: "5px 10px 16px 10px"
  }
}));

export const StyledSubNameTab = styled(AccordionDetails)(({ theme }) => ({
  padding: "0 0 8px 0",
  color: theme.palette.secondary.light,
  fontWeight: 600,
  fontSize: 16
}));

export const StyledTabName = styled(AccordionDetails)(({ theme }) => ({
  padding: "0 0 8px 0",
  paddingLeft: "5px",
  color: theme.palette.primary.main,
  fontSize: 18,
  fontWeight: 700
}));

export const StyledTabAssociated = styled(Box)(() => ({
  maxHeight: 400,
  overflowY: "scroll"
}));

export const FilterWrapper = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary[0]};
  position: relative;
  display: inline-flex;
  border-radius: 5px;
`;

export const FilterContainer = styled(Box)(({ theme }) => ({
  width: "300px",
  backgroundColor: theme.palette.secondary[0],
  zIndex: 15,
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  borderRadius: theme.spacing(1),
  boxShadow: "rgba(189, 197, 209, 0.2) 0px 0.5rem 1.2rem",
  [theme.breakpoints.down("sm")]: {
    width: 230,
    left: "21"
  },

  "& .MuiAccordion-root::before": {
    position: "unset !important"
  },

  ":hover": {
    backgroundColor: theme.palette.secondary[0]
  },

  ":after": {
    content: "''",
    display: "block",
    background: theme.palette.secondary[0],
    zIndex: 9,
    position: "absolute",
    top: "-6px",
    right: "36px",
    width: "14px",
    height: "16px",
    transform: "rotate(45deg)"
  }
}));

export const CloseButton = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
`;

export const AccordionContainer = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  width: "100%",
  margin: 0,
  backgroundColor: theme.palette.secondary[0]
}));

export const AccordionSummary = styled(AccordionSummaryMUI)(() => ({
  padding: "0 8px !important",
  textAlign: "left",
  height: "40px !important",
  minHeight: "40px !important"
}));

export const AccordionDetailsFilter = styled(AccordionDetails)(({ theme }) => ({
  padding: `0 ${theme.spacing(1)} !important`,
  backgroundColor: theme.palette.primary[100],
  borderRadius: theme.spacing(1),
  color: theme.palette.secondary.light
}));

export const ApplyFilterButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: 16,
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100],
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.dark
  },
  ":disabled": {
    background: theme.palette.secondary[600],
    color: theme.palette.secondary[100]
  }
}));

export const ButtonSort = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));
