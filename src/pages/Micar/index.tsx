import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import axios from "axios";

import { Lighning, Earch, Wash, Tree, TreeWhite, LighningWhite, EarchWhite, WasteWhite } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

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
  const [indicartor, setIndicator] = useState<MicarIndicatorProps>();
  const theme = useTheme();
  useEffect(() => {
    document.title = `Micar | Cardano Blockchain Explorer`;
  }, []);

  axios.get(`/mica/overview/ada?responseType=recent&key=zy5ZrBDZpv420Oi3WIPwXP`).then(({ data }) => {
    setIndicator(data);
  });

  return (
    <Box bgcolor={theme.isDark ? "#131316" : "#FFFFFF"} paddingX={isMobile ? 1 : isLaptop ? 2 : 6} pb={10}>
      <EmissionsCalculator />
      <EmissionsChart />
      <MicarIndicator
        bgColor={"#FBEBD7"}
        icon={theme.isDark ? <LighningWhite /> : <Lighning />}
        title={t("micar.indicators.enegy")}
        des1={indicartor?.indicator_1?.title}
        des2={indicartor?.indicator_2?.title}
        des3={indicartor?.indicator_3?.title}
        value1={`${indicartor?.indicator_1?.result?.value} ${indicartor?.indicator_1?.unit}`}
        value2={`${indicartor?.indicator_2?.result?.value} ${indicartor?.indicator_2?.unit}`}
        value3={`${indicartor?.indicator_3?.result?.value} ${indicartor?.indicator_3?.unit}`}
        content={t("micar.indicators.enegy.des")}
      />
      <MicarIndicator
        bgColor={"#EFF7FF"}
        icon={theme.isDark ? <EarchWhite /> : <Earch />}
        title={t("micar.indicators.emissions")}
        des1={indicartor?.indicator_4?.title}
        des2={indicartor?.indicator_5?.title}
        des3={indicartor?.indicator_6?.title}
        value1={`${indicartor?.indicator_4?.result?.value} ${indicartor?.indicator_4?.unit}`}
        value2={`${indicartor?.indicator_5?.result?.value} ${indicartor?.indicator_5?.unit}`}
        value3={`${indicartor?.indicator_6?.result?.value} ${indicartor?.indicator_6?.unit}`}
        content={t("micar.indicators.emissions.des")}
      />
      <MicarIndicator
        bgColor={"#FFE8E0"}
        icon={theme.isDark ? <WasteWhite /> : <Wash />}
        title={t("micar.indicators.waste")}
        des1={indicartor?.indicator_7?.title}
        des2={indicartor?.indicator_8?.title}
        des3={indicartor?.indicator_9?.title}
        value1={`${indicartor?.indicator_7?.result?.value} ${indicartor?.indicator_7?.unit}`}
        value2={`${indicartor?.indicator_8?.result?.value} ${indicartor?.indicator_8?.unit}`}
        value3={`${indicartor?.indicator_9?.result?.value} ${indicartor?.indicator_9?.unit}`}
        content={t("micar.indicators.waste.des")}
      />
      <MicarIndicator
        bgColor={"#D9FFE0"}
        icon={theme.isDark ? <TreeWhite /> : <Tree />}
        title={t("micar.indicators.natural")}
        des1={indicartor?.indicator_10?.title}
        value1={`${indicartor?.indicator_10?.result?.value} ${indicartor?.indicator_10?.unit}`}
        content={t("micar.indicators.natural.des")}
      />
    </Box>
  );
};
export default Micar;
