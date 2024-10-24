import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";

import CustomIcon from "src/components/commons/CustomIcon";
import { SearchMicarIcon } from "src/commons/resources";
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
  const [isInput, setIsInput] = useState(true);
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const { data, loading } = useFetch<CarbonEmissionData>(
    address ? `${API.MICAR?.CARBON_EMISSION}/${address}` : "",
    undefined,
    false
  );

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setAddress("");
      setIsSearched(false);
      return;
    }
    setIsSearched(false);
    setAddress(value.trim());
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsSearched(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      handleSearch(value);
      setIsSearched(true);
    }
    if (target.value === "") {
      setIsSearched(false);
    }
  };

  return (
    <Box mt={10}>
      <Container maxWidth="lg" sx={{ height: "100%", mt: 8 }}>
        <StyledCard elevation={2}>
          <StyledTitle>{t("micar.indicators.calculator")}</StyledTitle>
          <Typography sx={{ color: theme.isDark ? "#F7F9FF" : "#000000" }} textAlign={"left"}>
            {t("micar.emission.caculator.des")}
          </Typography>
          <SearchContainer>
            <StyledInput
              style={{
                color:
                  !loading && !data?.address && !data?.stakeAddress && isSearched
                    ? "#c20024"
                    : theme.palette.secondary.light
              }}
              placeholder="Search Stake ID or Address"
              onChange={(e) => {
                setValue(e.target.value);
                setIsInput(e.target.value.trim() === "");
                if (!e.target.value) {
                  setIsSearched(false);
                }
              }}
              value={value}
              onKeyUp={handleKeyUp}
            />
            <SubmitButton
              disabled={isInput}
              onClick={() => {
                handleSearch(value);
                setIsSearched(true);
              }}
            >
              <CustomIcon
                bgcolor={theme.isDark ? "#24262E" : "#FFFFFF"}
                icon={SearchMicarIcon}
                fill={theme.isDark ? "#666666" : "#434656"}
                height={22}
                padding={1.2}
                borderRadius={2}
              />
            </SubmitButton>
          </SearchContainer>
          {!loading && !isSearched && <></>}
          {!loading && !data?.address && !data?.stakeAddress && isSearched && (
            <Box color={"#c20024"} sx={{ marginBottom: "20px" }} textAlign={"left"} ml={4}>
              {t("message.addressNotFound")}
            </Box>
          )}
          {loading && <></>}
          {!loading && isSearched && (data?.address || data?.stakeAddress) && (
            <Box>
              <StyledTypography>
                {data?.stakeAddress
                  ? t("micar.indicators.caculator.stakeAddress")
                  : t("micar.indicators.caculator.address")}
              </StyledTypography>
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
              <StyledValue>{data?.txCount ? data?.txCount : "N/A"}</StyledValue>
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
