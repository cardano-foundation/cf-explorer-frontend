import { Box, Grid, LinearProgress, Skeleton, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderDetailContainer = styled(Box)`
  text-align: left;
  position: relative;
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
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  margin-bottom: 20px;
`;

export const PoolIdSkeleton = styled(Skeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;

export const PoolIdLabel = styled("small")`
  font-family: var(--font-family-text);
  color: #344054;
`;

export const PoolIdValue = styled("small")`
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.colorBlue};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
  margin-right: 5px;
`;

export const DataContainer = styled("div")`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 30px 25px;
`;

export const Item = styled(Grid)<{ top?: number }>`
  position: relative;
  padding: ${({ top }) => (top ? 0 : 20)}px 25px ${({ top }) => (top ? 20 : 0)}px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: ${({ top }) => (top ? "1px solid rgba(0, 0, 0, 0.1)" : "none")};

  &:first-of-type {
    border-left: 0;
    padding-left: 0;
  }

  &:last-child {
    border-right: 0;
    padding-right: 0;
  }

  @media (max-width: 1023px) {
    padding: 20px 25px !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
`;

export const StyledImg = styled("img")`
  margin-right: 8px;
  display: block;
  width: 24px;
  height: 24px;
`;

export const InfoImg = styled("img")`
  width: 14px;
`;

export const InfoTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  opacity: 0.5;
  margin-top: 14px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const StyledTitle = styled("span")`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const InfoValue = styled(Box)`
  font-weight: var(--font-weight-bold);
  font-size: 18px;
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

export const StyledGrid = styled(Grid)``;

export const FlexGap10 = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SavingImg = styled("img")`
  position: absolute;
  top: 0;
  right: 0;
`;
