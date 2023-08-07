import { alpha, Box, Button, Grid, LinearProgress, Skeleton, styled } from "@mui/material";

export const HeaderDetailContainer = styled(Box)(({ theme }) => ({
  textAlign: "left",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    paddingTop: 32
  }
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
`;

export const HeaderTitle = styled("h2")`
  color: ${(props) => props.theme.palette.secondary.main};
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
  color: ${(props) => props.theme.palette.secondary.light};
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

export const DataContainer = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
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
  borderLeft: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
  borderBottom: top ? `1px solid ${alpha(theme.palette.common.black, 0.1)}` : "none",

  "&:first-of-type, &:nth-of-type(5)": {
    borderLeft: 0,
    paddingLeft: 0
  },
  [theme.breakpoints.down("md")]: {
    borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
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
  color: theme.palette.secondary.main
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
    background: theme.palette.primary.main
  }
}));
