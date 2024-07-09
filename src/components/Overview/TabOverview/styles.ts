import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import Table from "src/components/commons/Table";

export const ContainerTab = styled("div")`
  height: 100%;
  background: ${(props) => props.theme.palette.secondary[0]};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadow.card};
  position: relative;
  display: flex;
  margin-top: 62px;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;

export const StyledTable = styled(Table)`
  th {
    padding: 0 16px 16px 16px;
  }
  td {
    padding: 16px;
  }
  tr {
    position: relative;
  }
  th {
    border-bottom:${(props) => (props.theme.isDark ? "0.5px solid #ffffff1f" : "0.5px solid #0000001f")}
  }

  tr::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: ${(props) => (props.theme.isDark ? "#ffffff1f" : "#0000001f")}
`;
