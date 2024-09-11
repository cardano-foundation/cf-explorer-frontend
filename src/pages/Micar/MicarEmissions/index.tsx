import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Container, useTheme } from "@mui/material";

import CustomIcon from "src/components/commons/CustomIcon";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import { SearchContainer, StyledCard, StyledInput, StyledTitle, SubmitButton } from "./styles";

const EmissionsCalculator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile, isLaptop } = useScreen();
  const [value, setValue] = useState<string>("");

  const hanldeSearch = async () => {
    if (!value) {
      return;
    }
  };

  return (
    <Box mt={10}>
      <Container maxWidth="lg" sx={{ height: "100%", mt: 8 }}>
        <StyledCard elevation={2} sx={{ backgroundColor: theme.isDark ? "#24262E" : "#FFFFFF" }}>
          <StyledTitle
            sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }}
            fontSize={isMobile ? "20px" : isLaptop ? "40px" : "48px"}
          >
            {t("micar.indicators.calculator")}
          </StyledTitle>
          <Typography sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }} textAlign={"left"}>
            Geonera galoska nögon, dol danera, i vamätt tiras trirtad, att äl, det vill säga kromäsamma. Lara par
            autoponing bikroligen ode prelapp bevis bjudkaffe. Prodiv rode lalig. Spesade däbesk för att viprement
            eulagen, däck så kavän det stadsutglesning.
          </Typography>
          <SearchContainer>
            <StyledInput
              type="search"
              placeholder="Search Stake ID or Address"
              onChange={(e) => {
                setValue(e.target.value.trim());
              }}
              value={value}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  hanldeSearch();
                }
              }}
            />
            <SubmitButton onClick={hanldeSearch}>
              <CustomIcon
                icon={HeaderSearchIconComponent}
                stroke={theme.palette.secondary.light}
                fill={theme.palette.secondary[0]}
                height={22}
              />
            </SubmitButton>
          </SearchContainer>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default EmissionsCalculator;
