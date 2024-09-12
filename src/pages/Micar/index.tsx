import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
// import axios from "axios";

import { Lighning, Earch, Wash, Tree, TreeWhite, LighningWhite, EarchWhite, WasteWhite } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

import MicarIndicator from "./MicarIndicator";
import EmissionsChart from "./MicarChart";
import EmissionsCalculator from "./MicarEmissions";

const Micar = () => {
  const { t } = useTranslation();
  const { isMobile, isLaptop } = useScreen();
  const theme = useTheme();
  useEffect(() => {
    document.title = `Micar | Cardano Blockchain Explorer`;
  }, []);

  // axios.get(`/mica/overview/ada?responseType=recent&key=zy5ZrBDZpv420Oi3WIPwXP`).then(() => {

  // });

  return (
    <Box bgcolor={theme.isDark ? "#131316" : "#FFFFFF"} paddingX={isMobile ? 1 : isLaptop ? 2 : 6} pb={10}>
      <EmissionsCalculator />
      <EmissionsChart />
      <MicarIndicator
        bgColor={"#FBEBD7"}
        icon={theme.isDark ? <LighningWhite /> : <Lighning />}
        title={t("micar.indicators.enegy")}
        des1={t("micar.indicators.enegy.des1")}
        des2={t("micar.indicators.enegy.des2")}
        des3={t("micar.indicators.enegy.des3")}
        value1={"123,144 kWh"}
        value2={"123,144 kWh"}
        value3={"123,144 kWh"}
        content={t("micar.indicators.enegy.des")}
      />
      <MicarIndicator
        bgColor={"#EFF7FF"}
        icon={theme.isDark ? <EarchWhite /> : <Earch />}
        title={t("micar.indicators.emissions")}
        des1={t("micar.indicators.enegy.des1")}
        des2={t("micar.indicators.enegy.des2")}
        des3={t("micar.indicators.enegy.des3")}
        value1={"123,144 kWh"}
        value2={"123,144 kWh"}
        value3={"123,144 kWh"}
        content={t("micar.indicators.emissions.des")}
      />
      <MicarIndicator
        bgColor={"#FFE8E0"}
        icon={theme.isDark ? <WasteWhite /> : <Wash />}
        title={t("micar.indicators.waste")}
        des1={t("micar.indicators.waste.des1")}
        des2={t("micar.indicators.waste.des2")}
        des3={t("micar.indicators.waste.des3")}
        value1={"123,144 kWh"}
        value2={"123,144 kWh"}
        value3={"123,144 kWh"}
        content={t("micar.indicators.waste.des")}
      />
      <MicarIndicator
        bgColor={"#D9FFE0"}
        icon={theme.isDark ? <TreeWhite /> : <Tree />}
        title={t("micar.indicators.natural")}
        des1={t("micar.indicators.natural.des1")}
        value1={"123,144 kWh"}
        content={t("micar.indicators.natural.des")}
      />
    </Box>
  );
};
export default Micar;
