import { Grid, Box, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import ExplanDropdown from "../common/ExplanDropdown";
import CompiledCodeDataCard from "../common/CompiledCodeDataCard";
import { ModalContent } from "./styles";

type Data = { title: string; value?: string };
export interface CompiledCodeModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
}
const CompiledCodeModal: React.FC<CompiledCodeModalProps> = ({ open = false, onClose, data }) => {
  const { t } = useTranslation();
  const handleCloseModal = () => onClose?.();
  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={t("contract.compiledCode")}
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <ExplanDropdown title={t("explain.compiledCode")}>
          <Stack direction={"column"} gap={2}>
            <Box>{t("explain.compiledCode.desc")}</Box>
            <Box>{t("explain.compiledCode.desc2")}</Box>
          </Stack>
        </ExplanDropdown>
        <Box flex={1}>
          <Grid container spacing={2}>
            {data &&
              data.length > 0 &&
              data.map((item) => (
                <Grid item xs={12} key={item.title}>
                  <CompiledCodeDataCard title={item.title} value={item.value} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </ModalContent>
    </CustomModal>
  );
};

export default CompiledCodeModal;
