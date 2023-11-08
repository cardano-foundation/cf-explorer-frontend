import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";
import { API } from "src/commons/utils/api";
import useMutation from "src/commons/hooks/useMutation";

import { TextareaAutosize } from "./styles";
import { VerifyScriptButton } from "../Tabs/styles";

export type TVerifyFormModalProps = {
  open: boolean;
  onClose?: () => void;
  onReload?: () => void;
};

export type TScript = string;

const VerifyFormModal: React.FC<TVerifyFormModalProps> = ({ open, onClose, onReload }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const { id = "" } = useParams<{ id: string }>();
  const theme = useTheme();
  const { mutate, loading, error, reset } = useMutation(
    {
      url: API.TOKEN.VERIFY_SCRIPT(id),
      data: text
    },
    () => onReload?.()
  );

  return (
    <CustomModal
      width={500}
      title={t("common.verifyScript")}
      open={open}
      onClose={() => {
        reset();
        onClose?.();
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextareaAutosize
          error={+!!error}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.inputNativeScript")}
        />
        {!!error && (
          <Typography
            fontSize={14}
            display="inline-block"
            width="100%"
            textAlign="left"
            color={theme.palette.error[700]}
          >
            {error as string}!
          </Typography>
        )}
        <VerifyScriptButton loading={+loading} onClick={() => mutate()}>
          {t("common.verifyScript")}
        </VerifyScriptButton>
      </Box>
    </CustomModal>
  );
};

export default VerifyFormModal;
