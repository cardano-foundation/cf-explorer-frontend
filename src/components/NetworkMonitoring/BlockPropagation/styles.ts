import { styled } from "@mui/material";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

export const StyledSkeleton = styled(CommonSkeleton)`
  border-radius: var(--border-radius);
  min-height: 130px;
`;
export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow.card};
    padding: 6px 32px 32px 26px;
  `,
  Title: styled("p")`
    font-size: 20px;
    font-weight: 500;
    text-align: start;
    color: ${(props) => props.theme.palette.secondary.main};
  `
};
