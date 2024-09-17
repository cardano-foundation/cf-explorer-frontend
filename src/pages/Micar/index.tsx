import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import { Lighning, Earch, Wash, Tree, TreeWhite, LighningWhite, EarchWhite, WasteWhite } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import { numberWithCommas } from "src/commons/utils/helper";

import { DescriptionText, HeadingPage, WrapHeading } from "./styles";
import { WorldMap } from "./MicarIndicator/MapMicar";
import MicarIndicator from "./MicarIndicator";
import EmissionsChart from "./MicarChart";
import EmissionsCalculator from "./MicarEmissions";

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

interface MicarIndicatorProps {
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

const Micar = () => {
  const { t } = useTranslation();
  const { isMobile, isLaptop } = useScreen();
  const theme = useTheme();
  useEffect(() => {
    document.title = `MiCAR | Cardano Blockchain Explorer`;
  }, []);
  const formatPercent = (percent?: number) => `${Math.round((percent || 0) * 100) / 100} %`;

  const { data } = useFetch<MicarIndicatorProps>(`${API.MICAR?.INDICATOR}`, undefined, false);
  return (
    <Box bgcolor={theme.isDark ? "#131316" : "#FFFFFF"} paddingX={isMobile ? 1 : isLaptop ? 2 : 6} pb={10}>
      <WrapHeading>
        <HeadingPage>{t("title.Cardanosustainability")}</HeadingPage>
        <DescriptionText>{t("subTitle.Cardanosustainability")}</DescriptionText>
      </WrapHeading>
      <WorldMap />
      <EmissionsCalculator />
      <EmissionsChart />
      <MicarIndicator
        bgColor={"#FBEBD7"}
        icon={theme.isDark ? <LighningWhite /> : <Lighning />}
        title={t("micar.indicators.enegy")}
        des1={data?.indicator_1?.title}
        des2={data?.indicator_2?.title}
        des3={data?.indicator_3?.title}
        value1={`${numberWithCommas(data?.indicator_1?.result?.value)} kWh`}
        value2={formatPercent(data?.indicator_2?.result?.value)}
        value3={`${numberWithCommas(data?.indicator_3?.result?.value)} kWh`}
        content={t("micar.indicators.enegy.des")}
      />
      <MicarIndicator
        bgColor={"#EFF7FF"}
        icon={theme.isDark ? <EarchWhite /> : <Earch />}
        title={t("micar.indicators.emissions")}
        des1={data?.indicator_4?.title}
        des2={data?.indicator_5?.title}
        des3={data?.indicator_6?.title}
        value1={`${numberWithCommas(data?.indicator_4?.result?.value)} tCO2e`}
        value2={`${numberWithCommas(data?.indicator_5?.result?.value)} tCO2e`}
        value3={`${numberWithCommas(data?.indicator_6?.result?.value)} kgCO2e`}
        content={t("micar.indicators.emissions.des")}
      />
      <MicarIndicator
        bgColor={"#FFE8E0"}
        icon={theme.isDark ? <WasteWhite /> : <Wash />}
        title={t("micar.indicators.waste")}
        des1={data?.indicator_7?.title}
        des2={data?.indicator_8?.title}
        des3={data?.indicator_9?.title}
        value1={`${numberWithCommas(data?.indicator_7?.result?.value)} kg`}
        value2={formatPercent(data?.indicator_8?.result?.value)}
        value3={`${numberWithCommas(data?.indicator_9?.result?.value)} t`}
        content={t("micar.indicators.waste.des")}
      />
      <MicarIndicator
        bgColor={"#D9FFE0"}
        icon={theme.isDark ? <TreeWhite /> : <Tree />}
        title={t("micar.indicators.natural")}
        des1={data?.indicator_10?.title}
        value1={`${numberWithCommas(data?.indicator_10?.result?.value)} kg`}
        content={t("micar.indicators.natural.des")}
      />
    </Box>
  );
};
export default Micar;
