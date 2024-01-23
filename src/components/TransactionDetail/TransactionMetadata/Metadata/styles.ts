import { alpha, Box, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "src/components/commons/Card";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.secondary[0]};
  padding: 25px;
  border-radius: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down(355)} {
    padding: 8px;
  }
`;
export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary.light};
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[200]};
  padding-bottom: 8px;
`;

export const StyledItem = styled(Box)`
  background-color: white;
  text-align: left;
  padding: 10px 0;
  font-size: var(--font-size-text);
  border-bottom: 1px solid ${(props) => alpha(props.theme.palette.common.black, 0.1)};
`;

export const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const StatusIcon = styled("img")`
  padding-right: 10px;
  width: 35px;
`;

export const AddressLink = styled(Link)`
  font-weight: var(--font-weight-bold);
  font-family: var(--font-size-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  margin-right: 8px;
`;

export const RowMetadata = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    display: "grid",
    gridTemplateColumns: `50px 86px 60px auto`,
    gridRowGap: 6
  }
}));
export const Title = styled(Box)(({ theme }) => ({
  width: "150px",
  textAlign: "left",
  color: theme.palette.secondary.light,
  [theme.breakpoints.down("sm")]: {
    gridColumn: "1/3",
    gridRow: "1/2",
    width: "unset"
  }
}));

export const JSONTitle = styled(Title)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-column: 1/1;
  }
`;

export const TitleValue = styled(Box)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    gridColumn: "3/3",
    gridRow: "1/2"
  }
}));
export const Value = styled(Box)(({ theme }) => ({
  wordBreak: "break-word",
  flex: 1,
  textAlign: "left",
  background: theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100],
  padding: `${theme.spacing(2)} 50px ${theme.spacing(2)} ${theme.spacing(1)}`,
  minHeight: 40,
  position: "relative",
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box"
}));
export const ValueText = styled(Box)(({ theme }) => ({
  maxHeight: "4em",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  color: theme.palette.secondary.light,
  paddingRight: theme.spacing(1)
}));

// export const MetaDataValue = styled(ValueText)(({ theme }) => ({
//   color: theme.palette.secondary.main,
//   flex: 1,
//   width: "unset"
// }));

export const ViewAllImage = styled("img")`
  width: 16px;
  height: 16px;
`;

export const StyledButton = styled(Box)`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: 50%;
  transform: translateY(-50%);
  background: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  &:hover {
    background: ${(props) => alpha(props.theme.palette.primary.main, 0.3)};
  }
`;

export const CIPHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
  flex: 1,
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
}));

export const CIPChips = styled(Box)`
  display: flex;
  gap: 8px;
`;

export const CIPHeaderTitle = styled(Box)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary.light};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const JSONValue = styled(Value)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-column: 2 / spam;
    width: unset;
  }
`;

export const MetadataWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "0 25px",
  margin: "25px 0px",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    padding: `0 ${theme.spacing(1)}`
  }
}));

export const MetadataHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
    alignItems: "flex-start"
  }
}));

export const MetadataContent = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
  ":last-child": { marginBottom: 0 }
}));

export const MetadataTitle = styled(Box)`
  width: 180px;
  color: ${({ theme }) => theme.palette.secondary.light};
`;

export const MetadataJSONTitle = styled(MetadataTitle)`
  ${({ theme }) => theme.breakpoints.down(430)} {
    min-width: unset;
    margin-right: 14px;
  }
`;

export const MetaDataValue = styled(Box)`
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const MetaDataJSONValue = styled(MetaDataValue)`
  flex: 1;
  display: inline-block;
  overflow-wrap: anywhere;
  padding: 16px 8px;
  box-sizing: border-box;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100])};
  border-radius: 6px;
  position: relative;
`;

export const MetaDataJSONValueText = styled(MetaDataValue)`
  position: relative;
  max-height: 4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const DecryptButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.secondary[0],
  fontWeight: "bold",
  fontSize: 14,
  padding: theme.spacing(1, 2),
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  ":hover": {
    background: theme.palette.primary.dark
  },
  ":disabled": {
    background: theme.palette.secondary[600],
    color: theme.palette.secondary[0]
  }
}));

export const BadgeContainer = styled(Box)`
  border-radius: 13px;
  background-color: ${({ theme }) => theme.palette.warning[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  border: 1px solid ${({ theme }) => theme.palette.warning[700]};
  gap: 6px;
  padding-right: 8px;
  box-sizing: border-box;
  min-width: 78px;
  cursor: pointer;
`;

export const CIPLabel = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.secondary.light};
`;
export const BadgeContainerVerify = styled(Box)<{ type: "Verified" | "Invalid" | "Warning" }>`
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 31px;
  width: min-content;
  gap: 6px;
  padding-left: 3px;
  padding-right: 8px;
  font-size: 12px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.palette.secondary.light};
  cursor: pointer;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "Verified":
        return theme.palette.success[100];
      case "Warning":
        return theme.palette.warning[100];
      default:
        return theme.palette.error[100];
    }
  }};
  border: 1px solid
    ${({ theme, type }) => {
      switch (type) {
        case "Verified":
          return theme.palette.success[800];
        case "Warning":
          return theme.palette.warning[700];
        default:
          return theme.palette.error[800];
      }
    }};
`;

export const ItemBolnisi = styled(Card)`
  padding: ${({ theme }) => theme.spacing(2)};
  position: relative;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 2px 2px 10px 0px #43465633;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;

export const ViewWineButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: 16,
  color: theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100],
  background: theme.palette.primary.main,
  ":hover": {
    background: theme.palette.primary.dark
  },
  ":disabled": {
    background: theme.palette.secondary[600],
    color: theme.palette.secondary[100]
  }
}));

export const ContentIdentifiers = styled(Box)`
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
