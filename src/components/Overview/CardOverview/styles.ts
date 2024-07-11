import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

export const StyledSkeleton = styled(CommonSkeleton)`
  border-radius: var(--border-radius);
  min-height: 130px;
`;
export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow.card};
    position: relative;
    display: flex;
  `,

  Content: styled("div")`
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Title: styled("span")`
    font-size: var(--font-size-text-small);
    color: ${(props) => props.theme.palette.secondary.light};
    margin-bottom: 8px;
    white-space: nowrap;
  `,
  Value: styled("span")`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-text-large);
    margin-bottom: 8px;
    color: ${(props) => props.theme.palette.secondary.main};
  `,
  Link: styled(Link)`
    font-size: var(--font-size-text-x-small);
    margin-bottom: 8px;
    font-family: var(--font-family-text) !important;
    color: ${(props) => props.theme.palette.primary.main} !important;
  `
};

export const StyledImg = styled("img")`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
