import { AccordionDetails, AccordionSummary, Box, Container, styled } from "@mui/material";

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
  padding: "25px 25px 0 25px"
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: "5px 25px 16px 25px"
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
