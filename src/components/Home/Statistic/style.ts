import { Box, Card, Grid, Skeleton, styled } from "@mui/material";

export const StatisticContainer = styled(Grid)`
  margin-bottom: 24px;
`;

export const Item = styled(Card)`
  height: 100%;
  font-family: var(--font-family-text);
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 20px;
  display: block;
  position: relative;
  padding-top: 30px;
  margin-bottom: 0px;
  border-radius: 12px;
  text-align: left;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.card};
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 15px;
  }
`;

export const EpochProgress = styled("h3")(({ theme }) => ({
  color: theme.palette.grey[400],
  margin: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: 14
  }
}));

export const ItemSkeleton = styled(Skeleton)`
  width: 100%;
  margin-top: 0.5rem;
`;

export const ItemIcon = styled("img")`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 40px;
  height: 40px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    right: 10px;
    top: 10px;
    width: 35px;
    height: 35px;
  }
`;

export const Content = styled(Box)`
  overflow: hidden;
`;

export const Name = styled("h4")`
  width: calc(100% - 60px);
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: var(--font-family-text);
  font-size: 14px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-top: 0.5rem;
    width: max-content;
  }
`;

export const Title = styled("h3")`
  display: inline-block;
  font-family: var(--font-family-text);
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 20px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 16px;
    max-width: 87px;
    word-break: break-all;
  }
`;

export const Small = styled("small")`
  color: ${(props) => props.theme.palette.grey[300]};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 11px;
  }
`;

export const SmallValue = styled("small")`
  white-space: nowrap;
`;

export const AdaPrice = styled("small")`
  color: ${(props) => props.theme.palette.grey[300]};
  white-space: nowrap;
  margin-left: 15px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-left: 0px;
  }
`;
export const TimeDuration = styled("small")<{ marginTop?: string }>`
  color: ${(props) => props.theme.palette.grey[300]};
  margin-top: ${(props) => props.marginTop || 0};
  white-space: nowrap;
  display: block;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    white-space: unset;
  }
`;
export const XSmall = styled("span")`
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.grey[300]};
`;

export const Value = styled(Small)<{ down?: number }>`
  color: ${(props) => (props.down ? props.theme.palette.error.main : props.theme.palette.success.main)};
`;
export const XValue = styled(XSmall)<{ down?: number }>`
  color: ${(props) => (props.down ? props.theme.palette.error.main : props.theme.palette.success.main)};
`;

export const Progress = styled("div")`
  display: flex;
  width: 100%;
  height: 12px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  color: ${({ theme }) => theme.palette.common.white};
  color: ${(props) => props.theme.palette.primary.contrastText};
  margin-bottom: 0.5rem;
`;

export const ProcessActive = styled("div")<{ rate: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.rate}%;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export const ProgressPending = styled(ProcessActive)<{ rate: number }>`
  width: ${(props) => props.rate}%;
  background-color: ${(props) => props.theme.palette.warning.main};
`;
