import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

import breakpoints from "src/themes/breakpoints";

export const TitleDetail = styled(Box)`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${(props) => props.theme.palette.secondary.main};
`;

export const TokenAddress = styled("small")`
  max-width: 90%;
  word-wrap: break-word;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  line-height: 1.5;
`;
export const AddressLink = styled(Link)`
  max-width: 90%;
  word-wrap: break-word;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-size: 14px;
`;

export const AddressGroup = styled(Box)(({ theme }) => ({
  marginTop: "15px",
  marginBottom: "24px",
  background: theme.palette.primary[200],
  borderRadius: "8px",
  padding: "12px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

export const ItemDetail = styled(Box)`
  width: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LabelItem = styled(Box)`
  margin-left: 10px;
  color: ${(props) => props.theme.palette.secondary.light};
  font-size: 14px;
`;

export const ValueItem = styled(Box)`
  color: black;
  font-weight: var(--font-weight-bold);
  font-size: 14px;
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const RowItem = styled(Box)`
  display: flex;
  align-items: center;
`;

export const CardItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: "200px",
  height: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  textAlign: "left",
  boxShadow: theme.shadow.card,
  padding: theme.spacing(4),
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    padding: theme.spacing(2)
  }
}));

export const CardItemStyled = styled(CardItem)`
  padding: 32px;
  @media screen and (max-width: ${breakpoints.values.sm}px) {
    padding: 20px 15px;
  }
`;
