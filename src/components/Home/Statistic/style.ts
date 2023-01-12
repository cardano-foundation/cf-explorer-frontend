import { Box, Grid, Skeleton, styled } from "@mui/material";
import { BoxRaised } from "../../commons/BoxRaised";

export const StatisticContainer = styled(Grid)`
  margin-bottom: 24px;
`;

export const Item = styled(BoxRaised)`
  font-family: var(--font-family-text);
  display: block;
  position: relative;
  padding-top: 30px;
  margin-bottom: 0px;
  text-align: left;
  &:hover {
    box-shadow: ${props => props.theme.shadowRaisedHover};
  }
`;

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
`;

export const Content = styled(Box)`
  min-height: 9.1425rem;
`;

export const Name = styled("h4")`
  width: calc(100% - 60px);
  margin-bottom: 0.75rem;
  color: #344054;
  font-family: var(--font-family-text);
  font-size: 14px;
`;

export const Title = styled("h3")`
  display: inline-block;
  font-family: var(--font-family-text);
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 20px;
`;

export const Small = styled("small")`
  color: ${props => props.theme.textColorPale};
  white-space: nowrap;
`;
export const XSmall = styled("span")`
  font-size: var(--font-size-text-x-small);
  color: ${props => props.theme.textColorPale};
  white-space: nowrap;
`;

export const Value = styled(Small)<{ down?: number }>`
  color: ${props => (props.down ? props.theme.colorRed : props.theme.colorGreen)};
`;
export const XValue = styled(XSmall)<{ down?: number }>`
  color: ${props => (props.down ? props.theme.colorRed : props.theme.colorGreen)};
`;

export const Progress = styled("div")`
  display: flex;
  width: 100%;
  height: 12px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  color: var(--text-color-reverse);
  color: ${props => props.theme.textColorReverse};
  margin-bottom: 0.5rem;
`;

export const ProcessActive = styled("div")<{ rate: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.rate}%;
  background-color: ${props => props.theme.colorGreenLight};
`;

export const ProgressPending = styled(ProcessActive)`
  width: ${props => props.rate}%;
  background-color: ${props => props.theme.colorYellow};
`;
