import { AccordionDetails, AccordionSummary, Box, Container, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { AssociatedIcon } from "src/commons/resources";

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
  ${({ theme }) => theme.breakpoints.down(350)} {
    margin: 0 15px;
  }
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
  alignSelf: "center"
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

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  padding: "8px 24px"
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "5px 25px 16px 25px",
  [theme.breakpoints.down(340)]: {
    paddingLeft: 15,
    paddingRight: 15
  }
}));

export const StyledSubNameTab = styled(AccordionDetails)(({ theme }) => ({
  padding: "0 0 8px 0",
  color: theme.palette.secondary.light,
  fontWeight: 600,
  fontSize: 16
}));

export const StyledTabName = styled(AccordionDetails)(() => ({
  padding: 0,
  fontSize: 18,
  fontWeight: 700
}));

export const StyledTabAssociated = styled(Box)(() => ({
  maxHeight: 400,
  overflowY: "scroll"
}));

export const TitleTab = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  marginLeft: "8px",
  fontWeight: "bold",
  textTransform: "capitalize",
  fontSize: "18px",
  color: active ? theme.palette.primary.main : theme.palette.secondary.light
}));

export const ButtonViewModal = styled(Box)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  cursor: pointer;
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

export const ContentModal = styled(Box)(({ theme }) => ({
  padding: "16px 20px",
  background: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  borderRadius: "8px",
  boxShadow: " 1px 2px 4px 0px rgba(67, 70, 86, 0.20)"
}));

export const StyledAddressModal = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.6
}));

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-weight: 700;
`;

export const StyledAssociatedIcon = styled(AssociatedIcon)`
  transform: translateY(5px);
`;
