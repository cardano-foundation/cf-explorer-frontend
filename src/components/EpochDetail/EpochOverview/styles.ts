import { LinearProgress, styled } from "@mui/material";

export const StyledSpan = styled("span")`
  display: flex;
  align-items: center;

  img {
    display: block;
    margin-left: 10px;
  }
`;

export const HorizonDiv = styled("div")`
  width: 100%;
  border: 1px solid ${props => props.theme.black};
  opacity: 0.1;
`;

export const ProcessDiv = styled("div")`
  width: 100%;
`;

export const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 10px;
  width: 100%;
  height: 12px;
  border-radius: 34px;
  background: ${props => props.theme.black_10};

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.gradient_0};
  }
`;

export const ProgressInfoDiv = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const ProgressStatus = styled("h4")`
  font-weight: var(--font-weight-normal);
`;

export const ProgressPercent = styled("h4")`
  color: ${props => props.theme.green_2};
`;
