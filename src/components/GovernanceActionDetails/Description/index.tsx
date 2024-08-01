import { Box } from "@mui/material";

import { StyledDescription } from "./styles";
type Field = {
  title: string;
  value: string;
};

const fields: Field[] = [
  { title: "Abstract", value: "Abstract" },
  { title: "Motivation", value: "Motivation" },
  { title: "Rationale", value: "Rationale" }
];
export default function Description() {
  return (
    <Box sx={{ display: "flex", gap: "24px", flexDirection: "column" }}>
      {fields.map((el, i) => (
        <StyledDescription.Container key={i}>
          <StyledDescription.Title>{el.title}</StyledDescription.Title>
          <StyledDescription.Value>{el.value}</StyledDescription.Value>
        </StyledDescription.Container>
      ))}
    </Box>
  );
}
