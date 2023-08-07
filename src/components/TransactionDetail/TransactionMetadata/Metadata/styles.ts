import { alpha, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Box)`
  background: ${(props) => props.theme.palette.common.white};
  padding: 25px;
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
  marginBottom: theme.spacing(1)
}));
export const Title = styled(Box)(({ theme }) => ({
  width: "200px",
  textAlign: "left",
  color: theme.palette.secondary.light
}));
export const TitleValue = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "left",
  color: theme.palette.secondary.main
}));
export const Value = styled(Box)(({ theme }) => ({
  wordBreak: "break-all",
  width: "100%",
  textAlign: "left",
  background: theme.palette.primary[100],
  padding: `${theme.spacing(2)} 50px ${theme.spacing(2)} ${theme.spacing(1)}`,
  minHeight: 40,
  position: "relative",
  display: "flex",
  alignItems: "center"
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
  color: theme.palette.secondary.main
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
  top: ${({ theme }) => theme.spacing(2)};
  background: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  &:hover {
    background: ${(props) => alpha(props.theme.palette.primary.main, 0.3)};
  }
`;
