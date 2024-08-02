import { Box } from "@mui/material";
import { t } from "i18next";

import { StyledDescription } from "./styles";

type Field = {
  title: string;
  value: string;
};

interface Props {
  data: OverviewGovActions | null;
}

export default function Description({ data }: Props) {
  const fields: Field[] = [
    { title: "Abstract", value: data?.abstract ?? t("N/A") },
    { title: "Motivation", value: data?.motivation ?? t("N/A") },
    { title: "Rationale", value: data?.rationale ?? t("N/A") }
  ];
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
