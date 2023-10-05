import { Skeleton, alpha, styled } from "@mui/material";

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.isDark ? alpha(theme.palette.common.white, 0.11) : ""
}));
