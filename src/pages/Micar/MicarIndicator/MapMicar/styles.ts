import { Box, IconButton, alpha, styled } from "@mui/material";

export const WorldMapContainer = styled(Box)<{ fullscreen?: number }>(({ fullscreen }) => ({
  position: "relative",
  boxSizing: "border-box",
  width: fullscreen ? "100vw" : "100%",
  height: fullscreen ? "100vh" : 628,
  minHeight: fullscreen ? "100vh" : 408,
  maxWidth: "100%",
  maxHeight: fullscreen ? "fil-available" : "unset",
  overflow: "hidden",
  fontSize: 12,
  lineHeight: "14px",
  fontWeight: 400,
  color: "#434656",
  padding: " 0 24px",
  backgroundColor: "white",

  ">div:first-of-type": {
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },

  ".highcharts-cluster-point": {
    filter: `drop-shadow(0px 0px 6px ${alpha("#434656", 0.5)})`
  }
}));

export const IndentifyTitle = styled(Box)({
  fontWeight: 700
});

export const IndentifyLabel = styled("span")({
  fontWeight: 400
});

export const IndentifyValue = styled("span")({
  fontWeight: 600
});

export const MapNavigation = styled(Box)`
  position: absolute;
  bottom: 0px;
  left: 24px;
  display: flex;
  align-items: center;
  border: 1px solid #bdbfcb;
  border-radius: 12px;
`;

export const MapNavigationMinusButton = styled(IconButton)`
  width: 56px;
  height: 56px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
  background-color: ${({ theme }) => (theme.isDark ? "#000" : "#fff")};
  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? "#333" : "#f0f0f0")};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 48px;
    height: 48px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 40px;
    height: 40px;
  }
`;

export const MapNavigationPlusButton = styled(IconButton)`
  width: 56px;
  height: 56px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  background-color: ${({ theme }) => (theme.isDark ? "#000" : "#fff")};
  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? "#333" : "#f0f0f0")};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 48px;
    height: 48px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 40px;
    height: 40px;
  }
`;

export const MapOptionButton = styled(IconButton)`
  width: 58px;
  height: 58px;
  cursor: pointer;
  background-color: ${({ theme }) => (theme.isDark ? "#000" : "#fff")};
  border-radius: 12px;
  border: 1px solid #bdbfcb;
  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? "#333" : "#f0f0f0")};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 50px;
    height: 50px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 42px;
    height: 42px;
  }
`;

export const MapNavigationDivider = styled(Box)(({ theme }) => ({
  width: 1,
  height: "56px",
  backgroundColor: "#bdbfcb",

  [theme.breakpoints.down("md")]: {
    height: "48px"
  },

  [theme.breakpoints.down("sm")]: {
    height: "40px"
  }
}));

export const MapOption = styled(Box)`
  position: absolute;
  bottom: 0px;
  left: 160px;
`;
