import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.secondary[0]};
  padding: 25px;
  border: 1px solid ${({ theme }) => (theme.isDark ? theme.palette.primary[200] : theme.palette.secondary[700])};
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

export const MetaDataValue = styled(ValueText)(({ theme }) => ({
  color: theme.palette.secondary.main,
  flex: 1,
  width: "unset"
}));

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

export const CIPHeader = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-row: 2/2;
    grid-column: 1 / spam;
  }
`;

export const CIPHeaderTitle = styled(Box)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.secondary[600]};
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
