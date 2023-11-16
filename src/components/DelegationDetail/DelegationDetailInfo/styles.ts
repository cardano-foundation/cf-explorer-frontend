import { Box, Button, Grid, LinearProgress, styled } from "@mui/material";

import { POOL_STATUS } from "src/commons/utils/constants";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { TruncateSubTitleContainer } from "src/components/share/styled";

export const HeaderDetailContainer = styled(Box)(() => ({
  textAlign: "left",
  position: "relative",
  paddingTop: 30
}));

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderTitle = styled("h2")`
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 2.25rem;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 600px) {
    width: 100%;
    & > div > div {
      overflow: unset;
    }
  }
`;

export const HeaderTitleSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
`;

export const PoolId = styled("p")`
  margin-top: 0px;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;
export const PoolDescriptionWrapper = styled("p")`
  margin-top: 0px;
  display: flex;
  align-items: baseline;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const PoolIdSkeleton = styled(CommonSkeleton)`
  height: 1em;
  width: 50%;
  border-radius: 4px;
`;

export const PoolIdLabel = styled("small")`
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.secondary.light};
  min-width: 85px;
`;

export const PoolIdValue = styled("small")`
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.primary.main};
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
  margin-right: 5px;
`;
export const PoolHomepage = styled("a")`
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.primary.main} !important;
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
  margin-left: 2px;
`;
export const PoolDescription = styled("small")`
  white-space: pre-wrap;
  display: inline-block;
  word-break: break-word;
  line-height: 1.5;
  color: ${(props) => props.theme.palette.secondary.main};
  margin-left: 2px;
`;

export const HeaderStatus = styled("small")<{ status?: PoolStatus }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case POOL_STATUS.RETIRED:
        return theme.palette.error[800];
      case POOL_STATUS.RETIRING:
        return theme.palette.warning[800];
      case POOL_STATUS.ACTIVE:
        return theme.palette.success[800];
      default:
        return theme.palette.success[800];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case POOL_STATUS.RETIRED:
        return theme.palette.error[100];
      case POOL_STATUS.RETIRING:
        return theme.palette.warning[100];
      case POOL_STATUS.ACTIVE:
        return theme.palette.success[100];
      default:
        return theme.palette.success[100];
    }
  }};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 7px;
  border-radius: 2px;
  font-size: 0.8125rem;
  line-height: 1;
  width: min-content;
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 3px 3px;
    font-size: 0.75rem;
  }
`;

export const DataContainer = styled("div")(({ theme }) => ({
  background: theme.palette.secondary[0],
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadow.detailHeader,
  borderRadius: 12,
  padding: "30px 25px",
  [theme.breakpoints.down("sm")]: {
    padding: "24px 15px"
  }
}));

export const Item = styled(Grid)<{ top?: number }>(({ top, theme }) => ({
  position: "relative",
  padding: top ? "0 25px 20px" : "20px 25px 0",
  borderLeft: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
  borderBottom: top ? `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}` : "none",

  "&:first-of-type, &:nth-of-type(5)": {
    borderLeft: 0,
    paddingLeft: 0
  },
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`,
    padding: 15,
    paddingRight: 0,
    "&:nth-of-type(2n + 1)": {
      borderLeft: "0 !important",
      paddingLeft: "0 !important"
    },
    "&:nth-of-type(1),&:nth-of-type(2)": {
      paddingTop: "0 !important"
    },
    "&:nth-of-type(7),&:nth-of-type(8)": {
      borderBottom: "0 !important",
      paddingBottom: "0 !important"
    }
  }
}));

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
  align-items: flex-start;
  justify-content: space-between;
  font-size: 14px;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const StyledTitle = styled("span")`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const InfoValue = styled(Box)(({ theme }) => ({
  fontWeight: "var(--font-weight-bold)",
  fontSize: 18,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16
  },
  color: theme.palette.secondary.main,
  maxWidth: "100%"
}));

export const StyledLinearProgress = styled(LinearProgress)<{ saturation: number }>`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  border-radius: 34px;
  background: ${(props) => props.theme.palette.primary[200]};

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${({ theme, saturation }) =>
      saturation > 100 ? theme.palette.error[700] : theme.palette.primary.main};
  }
`;

export const StyledGrid = styled(Grid)``;

export const FlexGap10 = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  overflowWrap: "anywhere",
  [theme.breakpoints.down("sm")]: {
    fontSize: 11
  }
}));

export const SavingImg = styled("img")`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ButtonViewAll = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.border.primary,
  border: `1px solid ${theme.palette.common.black}`,
  padding: `0 ${theme.spacing(1)}`,
  textTransform: "capitalize",
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    top: 15,
    left: 50
  },
  "&:hover": {
    background: theme.palette.primary.dark,
    borderColor: theme.palette.primary[200]
  }
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.secondary.light,
  display: "block",
  margin: `${theme.spacing(2)} 0px 25px`
}));

export const PoolIdTitle = styled(TruncateSubTitleContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {}
}));
