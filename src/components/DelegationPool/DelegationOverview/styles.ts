import { LinearProgress, Skeleton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledSkeleton = styled(Skeleton)`
  border-radius: var(--border-radius);
  min-height: 150px;
`;

export const StyledLinearProgress = styled(LinearProgress)`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  border-radius: 34px;
  background: ${props => props.theme.black_10};

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.gradient_0};
  }
`;

export const StyledImg = styled("img")`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    background: ${props => props.theme.boxBackgroundColor};
    border-radius: 12px;
    box-shadow: ${props => props.theme.shadow_0};
    position: relative;
    display: flex;
  `,
  Content: styled("div")`
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Title: styled("span")`
    color: ${props => props.theme.gray_3};
    font-weight: var(--font-weight-bold);
    margin-bottom: 15px;
  `,
  Value: styled("span")`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-title);
    margin-bottom: 8px;
  `,
  Link: styled(Link)`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-title);
    margin-bottom: 8px;
    font-family: var(--font-family-text) !important;
  `,
  Comment: styled("span")`
    font-weight: var(--font-weight-bold);
    color: ${props => props.theme.green_2};
  `,
};
