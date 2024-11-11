import { Box, styled } from "@mui/material";

import Table from "src/components/commons/Table";

export const Container = styled(Box)``;

export const Title = styled("h3")`
  font-family: var(--font-family-title);
  margin-top: 0;
`;

export const StyledTable = styled(Table)`
  max-height: 300px;
  overflow: scroll;
  thead th {
    font-size: 12px;
  }
  tbody tr {
    height: 55px;
  }
  tbody tr td {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
