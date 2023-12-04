import { Box, useTheme } from "@mui/material";

import { CustomBadge } from "./styles";

interface Props {
  value: number | null | undefined;
}

export const CustomNumberBadge: React.FC<Props> = ({ value }: Props) => {
  const theme = useTheme();
  if (!value) return null;
  return (
    <Box display={"inline-block"} marginLeft={0.5} data-testid="badge-number">
      <CustomBadge
        bgColor={theme.isDark ? theme.palette.primary.main : ""}
        color={theme.isDark ? theme.palette.secondary[100] : ""}
      >
        {value}
      </CustomBadge>
    </Box>
  );
};
