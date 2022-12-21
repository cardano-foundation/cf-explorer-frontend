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
  flex-direction: column;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

export const Item = styled(Box)<{ row: "top" | "bottom" }>`
  display: flex;
  flex-direction: column;
  width: calc((100% - 132px) / 4);

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  &:nth-child(1) {
    border-left: none;
    border-bottom: ${props => props.row === "bottom" && "none"};

    margin: ${props => (props.row === "top" ? "34px 0 0 27px" : "0 0 22px 27px")};
    padding: ${props => (props.row === "top" ? "0 0 22px 0" : "23px 0 0 0")};
  }

  &:nth-child(2) {
    border-bottom: ${props => props.row === "bottom" && "none"};

    margin: ${props => (props.row === "top" ? "34px 0 0 0" : "0 0 27px 0")};
    padding: ${props => (props.row === "top" ? "0 0 0 22px" : "23px 0 0 22px")};
  }

  &:nth-child(3) {
    border-bottom: ${props => props.row === "bottom" && "none"};

    margin: ${props => (props.row === "top" ? "34px 0 0 0" : "0 0 27px 0")};
    padding: ${props => (props.row === "top" ? "0 0 0 22px" : "23px 0 0 22px")};
  }

  &:nth-child(4) {
    border-bottom: ${props => props.row === "bottom" && "none"};

    margin: ${props => (props.row === "top" ? "34px 0 0 0" : "0 0 27px 0")};
    padding: ${props => (props.row === "top" ? "0 0 0 22px" : "23px 0 0 22px")};
  }

  @media (max-width: 1023px) {
    width: calc((100% - 80px) / 2);

    &:nth-child(1) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      margin: ${props => (props.row === "top" ? "34px 0 0 27px" : "0 0 0 27px")};
      padding: ${props => (props.row === "top" ? "0 0 22px 0" : "23px 0 22px 0")};
    }

    &:nth-child(2) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      margin: ${props => (props.row === "top" ? "34px 0 0 0" : "0 0 0 0")};
      padding: ${props => (props.row === "top" ? "0 0 22px 23px" : "23px 0 22px 23px")};
    }

    &:nth-child(3) {
      border-left: none;
      margin: ${props => (props.row === "top" ? "0 0 0 27px" : "0 0 33px 27px")};
      padding: ${props => (props.row === "top" ? "23px 0 22px 0" : "23px 0 0 0")};
    }

    &:nth-child(4) {
      margin: ${props => (props.row === "top" ? "0 0 0 0" : "0 0 33px 0")};
      padding: ${props => (props.row === "top" ? "23px 0 22px 23px" : "23px 0 22px 23px")};
    }
  }
`;

export const StyledImg = styled("img")`
  margin-right: 8px;
  display: block;
  width: 24px;
  height: 24px;
`;

export const InfoTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  opacity: 0.5;
  margin-top: 14px;
  margin-bottom: 5px;
`;

export const InfoValue = styled(Box)`
  font-weight: var(--font-weight-bold);
  font-size: 18x;
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

export const StyledGrid = styled("div")`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
