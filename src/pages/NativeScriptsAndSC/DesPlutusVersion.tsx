import { Box, List, useTheme } from "@mui/material";
import { t } from "i18next";

import CustomModal from "src/components/commons/CustomModal";

interface DesPlutusVersionProps {
  open: boolean;
  onClose: () => void;
}

const DesPlutusVersion: React.FC<DesPlutusVersionProps> = (props) => {
  const theme = useTheme();

  return (
    <CustomModal {...props} title={t("smartContract.plutusDes.title")} maxWidth={550}>
      <Box color={theme.palette.secondary.light} maxWidth={550}>
        <Box>{t("smartContract.plutusDes.desc1")}</Box>
        <List
          sx={{
            padding: "16px 0 16px 30px"
          }}
        >
          <li
            style={{
              listStyle: "disc"
            }}
          >
            <Box component={"span"} fontWeight={"bold"}>
              Plutus V1{" "}
            </Box>
            {t("smartContract.plutusDes.desc2")}
          </li>
          <Box
            component={"li"}
            mt={1}
            style={{
              listStyle: "disc"
            }}
          >
            <Box component={"span"} fontWeight={"bold"}>
              Plutus V2{" "}
            </Box>
            {t("smartContract.plutusDes.desc3")}
          </Box>
        </List>
      </Box>
    </CustomModal>
  );
};

export default DesPlutusVersion;
