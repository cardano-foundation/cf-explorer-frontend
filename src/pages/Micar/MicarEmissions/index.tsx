import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";

import CustomIcon from "src/components/commons/CustomIcon";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import {
  Line,
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
  const { isMobile } = useScreen();
  const [address, setAddress] = useState<string>();
  const [value, setValue] = useState<string>("");
  const [isSearched, setIsSearched] = useState(false);
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const { data } = useFetch<CarbonEmissionData>(
    address ? `${API.MICAR?.CARBON_EMISSION}/${address}` : "",
    undefined,
    false
  );

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setAddress("");
      return;
    } else {
      setAddress(value.trim());
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(value);
      setIsSearched(true);
    }
  };

  return (
    <Box mt={10}>
      <Container maxWidth="lg" sx={{ height: "100%", mt: 8 }}>
        <StyledCard elevation={2}>
          <StyledTitle>{t("micar.indicators.calculator")}</StyledTitle>
          <Typography sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }} textAlign={"left"}>
            Geonera galoska nögon, dol danera, i vamätt tiras trirtad, att äl, det vill säga kromäsamma. Lara par
            autoponing bikroligen ode prelapp bevis bjudkaffe. Prodiv rode lalig. Spesade däbesk för att viprement
            eulagen, däck så kavän det stadsutglesning.
          </Typography>
          <SearchContainer>
            <StyledInput
              placeholder="Search Stake ID or Address"
              onChange={(e) => {
                setValue(e.target.value);
                if (!e.target.value) {
                  setIsSearched(false);
                }
              }}
              value={value}
              onKeyUp={handleKeyUp}
            />
            <SubmitButton
              onClick={() => {
                handleSearch(value);
                setIsSearched(true);
              }}
            >
              <CustomIcon
                icon={HeaderSearchIconComponent}
                stroke={theme.palette.secondary.light}
                fill={theme.palette.secondary[0]}
                height={22}
              />
            </SubmitButton>
          </SearchContainer>
          {!data?.address && !data?.stakeAddress && isSearched && (
            <Box color={({ palette }) => palette.error[700]} sx={{ marginBottom: "20px" }}>
              {t("message.noRecordsFound")}
            </Box>
          )}
          {isSearched && (data?.address || data?.stakeAddress) && (
            <Box>
              <StyledTypography>{t("micar.indicators.caculator.address")}</StyledTypography>
              <Box display={"flex"} alignItems={"flex-start"} fontSize={isMobile ? "14px" : "20px"}>
                <StyledLink
                  to={{
                    pathname: data?.address
                      ? details?.address(data.address as string)
                      : details?.stake(data.stakeAddress as string),
                    state: { fromPath }
                  }}
                >
                  {isMobile
                    ? getShortHash(data?.stakeAddress || (data?.address as string))
                    : data?.stakeAddress || data?.address}
                </StyledLink>
              </Box>
              <Line />

              <StyledTypography>{t("micar.indicators.caculator.noTransaction")}</StyledTypography>
              <StyledValue>{data?.txCount}</StyledValue>
              <Line />

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
