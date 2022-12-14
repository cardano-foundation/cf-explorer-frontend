import { Box, Container, LinearProgress, Skeleton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderDetailContainer = styled(Container)`
  text-align: left;
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const BackText = styled("small")`
  color: #344054;
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled("h2")`
  color: ${props => props.theme.colorBlack};
  font-size: 2.25rem;
  margin: 0.5rem 0;
`;

export const HeaderTitleSkeleton = styled(Skeleton)`
  height: 1em;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
`;

export const PoolId = styled("p")`
  margin-top: 0px;
  display: flex;
  align-items: center;
`;

export const PoolIdSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;

export const PoolIdValue = styled("span")`
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
`;

export const DataContainer = styled("div")`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  padding: 24px 70px 24px 24px;
`;

export const Item = styled(Box)`
  font-size: var(--font-size-text);
  display: flex;
  align-items: center;
  line-height: 30px;
`;

export const StyledImg = styled("img")`
  margin-right: 8px;
  display: block;
  width: 24px;
  height: 24px;
`;

export const InfoTitle = styled(Box)`
  min-width: 250px;
`;

export const InfoValue = styled(Box)`
  margin-left: 0.5rem;
  font-weight: var(--font-weight-bold);
`;

export const StyledLinearProgress = styled(LinearProgress)`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  border-radius: 34px;
  background: rgba(0, 0, 0, 0.1);

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.linearGradientGreen};
  }
`;
