import { alpha, LinearProgress, styled } from "@mui/material";

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
  border: 1px solid ${(props) => props.theme.palette.common.black};
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
  background: ${(props) => alpha(props.theme.palette.common.black, 0.1)};

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${(props) => props.theme.palette.gradient[0]};
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
  color: ${(props) => props.theme.palette.primary.main};
`;

export const Output = styled("span")`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const Subtext = styled("span")`
  font-weight: 400;
  color: ${(props) => props.theme.palette.grey[300]};
  font-weight: normal;
`;
