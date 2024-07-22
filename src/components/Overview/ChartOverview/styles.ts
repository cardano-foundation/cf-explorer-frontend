import { styled } from "@mui/material";
import { Legend } from "recharts";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

export const StyledSkeleton = styled(CommonSkeleton)`
  border-radius: var(--border-radius);
  min-height: 250px;
`;
export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow.card};
  `,
  Title: styled("p")`
    font-size: 20px;
    font-weight: 500;
    text-align: start;
    padding: 24px 24px 16px 24px;
    color: ${(props) => props.theme.palette.secondary.main};
  `
};

export const LegendChart = styled("li")`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 14px;
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const StyledLegend = styled(Legend)`
  width: 10px !important;
  height: 10px !important;
`;
