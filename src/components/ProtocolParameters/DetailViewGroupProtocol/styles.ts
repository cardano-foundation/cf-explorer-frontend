import { styled, Box, IconButton, Drawer, Divider } from "@mui/material";

export const ViewDetailDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 1302,
  "& .MuiDrawer-paper": {
    width: "fit-content",
    background: `${theme.palette.secondary[0]}`,
    border: "none",
    height: "100%",
    boxShadow: theme.shadow.rightDraw,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      height: "calc(100% - 76px)",
      top: "76px"
    },
    [theme.breakpoints.down("sm")]: {
      right: "auto",
      width: "100%",
      overflowY: "hidden"
    }
  },
  "& .MuiModal-backdrop": {
    background: theme.palette.background
  }
}));

export const ViewDetailContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "510px",
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  marginLeft: "25px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    width: "100%",
    marginLeft: "0px"
  },
  "&::-webkit-scrollbar": {
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  "&:hover": {
    borderRadius: "8px 0px 0px 8px",
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.secondary.light
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.primary[100]
    }
  }
}));

export const ViewDetailScroll = styled(Box)(({ theme }) => ({
  width: "100%",
  marginRight: "16px",
  overflowX: "hidden",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    marginRight: "0px",
    overflowY: "auto",
    width: "100%",
    padding: "15px 16px",
    maxWidth: "unset",
    "&::-webkit-scrollbar": {
      width: "2px"
    }
  }
}));

export const CloseButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.primary[100]};
  padding: 5.5px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  position: absolute;
  top: 16px;
  right: 16px;
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const ContainerContent = styled(Box)`
  margin-top: 65px;
  margin-right: 25px;
`;

export const ContainerTitle = styled(Box)`
  text-align: left;
`;

export const ContainerDetail = styled(Box)`
  margin-top: 49px;
`;

export const TitleDetail = styled(Box)(({ theme }) => ({
  textAlign: "left",
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.secondary.main
}));

export const SubTitleDetailChildren = styled("li")`
  font-size: var(--font-size-text-small);
  color: ${(props) => props.theme.palette.secondary.light};
  text-align: left;
  white-space: "pre-wrap";
`;
export const Header = styled(Box)(({ theme }) => ({ textAlign: "left", color: theme.palette.secondary.main }));

export const Description = styled(Box)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.secondary.light
}));

export const Line = styled(Divider)(({ theme }) => ({
  marginBottom: "32px",
  borderColor: theme.palette.secondary.background,
  marginTop: "32px"
}));
