import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Container, useTheme, Divider } from "@mui/material";

import CustomIcon from "src/components/commons/CustomIcon";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";

import {
  SearchContainer,
  StyledCard,
  StyledInput,
  StyledLink,
  StyledTitle,
  StyledTypography,
  StyledValue,
  SubmitButton
} from "./styles";

interface CarbonEmissionData {
  address: string | null;
  stakeAddress: string | null;
  txCount: number | null;
  carbonEmissionPerTx: string | null;
}

const EmissionsCalculator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile, isLaptop } = useScreen();
  const [address, setAddress] = useState<string>();
  const [value, setValue] = useState<string>("");

  const { data } = useFetch<CarbonEmissionData>(`${API.MICAR?.CARBON_EMISSION}/${address}`, undefined, false);
  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    setAddress(value.trim());
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(value);
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
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onKeyUp={handleKeyUp}
            />
            <SubmitButton onClick={() => handleSearch(value)}>
              <CustomIcon
                icon={HeaderSearchIconComponent}
                stroke={theme.palette.secondary.light}
                fill={theme.palette.secondary[0]}
                height={22}
              />
            </SubmitButton>
          </SearchContainer>
          {address && (
            <Box>
              <StyledTypography>{t("micar.indicators.caculator.address")}</StyledTypography>
              <Box display={"flex"} alignItems={"flex-start"} fontSize={isMobile ? "14px" : "20px"}>
                <StyledLink to={details.addressMicar(data?.stakeAddress || (data?.address as string))}>
                  {isMobile
                    ? getShortHash(data?.stakeAddress || (data?.address as string))
                    : data?.stakeAddress || data?.address}
                </StyledLink>
              </Box>
              <Divider sx={{ marginY: 2 }} />

              <StyledTypography>{t("micar.indicators.caculator.noTransaction")}</StyledTypography>
              <StyledValue>{data?.txCount}</StyledValue>
              <Divider sx={{ marginY: 2 }} />

              <StyledTypography>{t("micar.indicators.caculator.emissions")}</StyledTypography>
              <StyledValue>{data?.carbonEmissionPerTx ? `${data?.carbonEmissionPerTx} kWh` : ""}</StyledValue>
            </Box>
          )}
        </StyledCard>
      </Container>
    </Box>
  );
};

export default EmissionsCalculator;
