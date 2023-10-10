import { Box, Card, Grid, styled } from "@mui/material";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { ThemeType } from "src/types/theme";

export const StatisticContainer = styled(Grid)`
  margin-bottom: 24px;
`;

export const WrapGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

export const Item = styled(Card)<{ smallItem?: boolean; themeMode?: ThemeType }>`
  background: ${({ theme, themeMode }) =>
    themeMode === "light" ? theme.palette.secondary[700] : theme.palette.secondary[0]};
  height: 100%;
  min-height: 164px;
  font-family: var(--font-family-text);
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 20px;
  display: block;
  position: relative;
  margin-bottom: 0px;
  border-radius: 12px;
  text-align: left;
  &:hover {
    box-shadow: ${(props) => props.theme.shadow.cardHover};
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 15px;
    ${({ smallItem }) => smallItem && "height: max-content; min-height: 120px;"}
  }
  cursor: pointer;
`;

export const EpochProgress = styled("h3")(({ theme }) => ({
  color: theme.palette.secondary.main,
  margin: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: 14
  }
}));

export const ItemSkeleton = styled(CommonSkeleton)`
  width: 100%;
  margin-top: 0.5rem;
`;

export const ItemIcon = styled("img")`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const VerticalContent = styled(Content)`
  flex-direction: column;
  align-items: unset;
  height: 100%;
`;

export const Name = styled("h4")`
  width: calc(100% - 60px);
  margin-bottom: 0.75rem;
  margin-left: ${({ theme }) => theme.spacing(2)};
  color: ${(props) => props.theme.palette.secondary.light};
  font-family: var(--font-family-text);
  font-size: 14px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 16px;
    margin-top: 16px;
  }
  white-space: nowrap;
  text-transform: capitalize;
`;

export const Title = styled("h3")`
  display: inline-block;
  font-family: var(--font-family-text);
  margin-top: 0;
  margin-bottom: 0;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 28px !important;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 16px;
    word-break: break-word;
  }
`;

export const Small = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 11px;
  }
`;

export const SmallValue = styled("small")`
  white-space: nowrap;
`;

export const AdaPrice = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const TimeDuration = styled("small")<{ marginTop?: string }>`
  color: ${(props) => props.theme.palette.secondary.light};
  margin-top: ${(props) => props.marginTop || 0};
  display: block;
`;

export const XSmall = styled("span")`
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const Value = styled(Small)<{ down?: number }>`
  color: ${(props) => (props.down ? props.theme.palette.error.main : props.theme.palette.success[800])};
`;
export const XValue = styled(XSmall)<{ down?: number }>`
  color: ${(props) => (props.down ? props.theme.palette.error[700] : props.theme.palette.success[800])};
`;

export const Progress = styled("div")`
  display: flex;
  width: 100%;
  height: 13px;
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
  color: ${({ theme }) => (theme.mode === "light" ? "inherit" : theme.palette.secondary[100])};
`;

export const ProgressPending = styled(ProcessActive)<{ rate: number }>`
  width: ${(props) => props.rate}%;
  background-color: ${(props) => props.theme.palette.primary[200]};
`;

export const TextPending = styled("span")`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const Link = styled("a")`
  display: contents;
`;

export const WrapCardContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.secondary.main
}));
