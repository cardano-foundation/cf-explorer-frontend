import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box, Container } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import { Lighning, Earch, LighningWhite, EarchWhite } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import { numberWithCommas } from "src/commons/utils/helper";

import SustainabilityIndicator from "./SustainabilityIndicator";
import EmissionsChart from "./SustainabilityChart";
import EmissionsCalculator from "./SustainabilityEmissions";
import { DescriptionText, HeadingPage, WrapHeading } from "./styles";
import { WorldMap } from "./SustainabilityIndicator/MapSustainability";

interface Indicator {
  indicator: number;
  title: string;
  description: string;
  unit: string;
  result: {
    value: number;
    year: number;
  };
}

interface SustainabilityIndicatorProps {
  indicator_1: Indicator;
  indicator_2: Indicator;
  indicator_3: Indicator;
  indicator_4: Indicator;
  indicator_5: Indicator;
  indicator_6: Indicator;
  indicator_7: Indicator;
  indicator_8: Indicator;
  indicator_9: Indicator;
  indicator_10: Indicator;
}

const Sustainability = () => {
  const { t } = useTranslation();
  const { isMobile, isLaptop } = useScreen();
  const theme = useTheme();
  useEffect(() => {
    document.title = `Sustainability Indicators | Cardano Blockchain Explorer`;
  }, []);
  const formatPercent = (percent?: number) => `${Math.round((percent || 0) * 100) / 100} %`;

  const { data } = useFetch<SustainabilityIndicatorProps>(`${API.SUSTAINABILITY?.INDICATOR}`, undefined, false);
  return (
    <Box bgcolor={theme.isDark ? "#131316" : "#FFFFFF"} paddingX={isMobile ? 1 : isLaptop ? 2 : 6} pb={10}>
      <Container sx={{ padding: "0px !important" }}>
        <WrapHeading>
          <HeadingPage>{t("title.Cardanosustainability")}</HeadingPage>
          <DescriptionText>{t("subTitle.Cardanosustainability")}</DescriptionText>
        </WrapHeading>
      </Container>
      <WorldMap />
      <EmissionsCalculator />
      <EmissionsChart />
      <SustainabilityIndicator
        bgColor={"#FBEBD7"}
        icon={theme.isDark ? <LighningWhite /> : <Lighning />}
        title={t("sustainability.indicators.enegy")}
        des1={data?.indicator_1?.title}
        des2={data?.indicator_2?.title}
        des3={data?.indicator_3?.title}
        value1={`${numberWithCommas(data?.indicator_1?.result?.value)} kWh`}
        value2={formatPercent(data?.indicator_2?.result?.value)}
        value3={`${numberWithCommas(data?.indicator_3?.result?.value)} kWh`}
        content={t("sustainability.indicators.enegy.des")}
      />
      <SustainabilityIndicator
        bgColor={"#EFF7FF"}
        icon={theme.isDark ? <EarchWhite /> : <Earch />}
        title={t("sustainability.indicators.emissions")}
        des1={data?.indicator_4?.title}
        des2={data?.indicator_5?.title}
        des3={data?.indicator_6?.title}
        value1={`${numberWithCommas(data?.indicator_4?.result?.value)} tCO2e`}
        value2={`${numberWithCommas(data?.indicator_5?.result?.value)} tCO2e`}
        value3={`${numberWithCommas(data?.indicator_6?.result?.value)} kgCO2e`}
        content={t("sustainability.indicators.emissions.des")}
      />
    </Box>
  );
};
export default Sustainability;
