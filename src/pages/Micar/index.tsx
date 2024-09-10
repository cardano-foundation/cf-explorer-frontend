import { Box } from "@mui/material";
import { useEffect } from "react";
import { t } from "i18next";

import { WorldMap } from "./MicarIndicator/MapMicar";
import { DescriptionText, HeadingPage, WrapHeading } from "./styles";

const Micar = () => {
  useEffect(() => {
    document.title = `Micar | Cardano Blockchain Explorer`;
  }, []);

  return (
    <Box>
      <WrapHeading>
        <HeadingPage>{t("title.Cardanosustainability")}</HeadingPage>
        <DescriptionText>{t("subTitle.Cardanosustainability")}</DescriptionText>
      </WrapHeading>
      <WorldMap />
    </Box>
  );
};

export default Micar;
