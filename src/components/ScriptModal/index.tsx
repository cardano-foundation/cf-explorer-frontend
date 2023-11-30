import { Box, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import CopyButton from "src/components/commons/CopyButton";
import StyledModal from "src/components/commons/StyledModal";
import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";

import { CommonSkeleton } from "../commons/CustomSkeleton";
import { ButtonLink, ViewJson } from "./styles";

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  policy: string;
}

type TScriptHashDetail = {
  policyId: string;
  nativeScript: boolean;
  smartContract: boolean;
  totalToken: number;
  policyScript: string;
};
const ScriptModal: React.FC<ScriptModalProps> = ({ policy, ...props }) => {
  const { t } = useTranslation();
  const { data, loading } = useFetch<TScriptHashDetail>(API.TOKEN.POLICIES(policy ? policy : ""));
  const theme = useTheme();
  useEffect(() => trigger(), [props.open]);
  const { keyRenderer, trigger } = useDisableJsonKey(data);

  return (
    <StyledModal open={props.open} handleCloseModal={props.onClose} contentStyle={{ overflowY: "hidden" }}>
      <Box data-testid="modal-testid" height={"100%"}>
        <Box
          textAlign={"left"}
          color={({ palette }) => palette.secondary.main}
          fontSize="1.5rem"
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif '}
        >
          {t("common.scriptHash")}
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
          {loading ? (
            <>
              <Box data-testid="loading-element" height={40} width="100%" borderRadius={10} overflow="hidden">
                <CommonSkeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
              <Box height={20} width="100%" borderRadius={10} overflow="hidden">
                <CommonSkeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
              <Box height={150} width="100%" borderRadius={10} overflow="hidden">
                <CommonSkeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
            </>
          ) : (
            <>
              <Box>
                <ButtonLink
                  to={
                    data?.nativeScript
                      ? details.nativeScriptDetail(data?.policyId)
                      : details.smartContract(data?.policyId)
                  }
                >
                  {data?.policyId || ""}
                </ButtonLink>
                <CopyButton text={data?.policyId || ""} />
              </Box>
              <Box>
                <Box component={"span"} color={({ palette }) => palette.secondary.light}>
                  {t("common.totalToken")}:
                </Box>
                <Box
                  data-testid="total-token"
                  component={"span"}
                  ml={2}
                  fontWeight="bold"
                  color={({ palette }) => palette.secondary.main}
                >
                  {data?.totalToken || 0}
                </Box>
              </Box>
              <Box>
                <Box data-testid="policy-script" mb={1} color={({ palette }) => palette.secondary.light}>
                  {t("common.policyScript")}:
                </Box>
                <ViewJson>
                  {data?.policyScript ? (
                    <JsonViewer
                      data-testid="JsonViewer"
                      value={data.policyScript ? JSON.parse(data.policyScript) : {}}
                      displayObjectSize={false}
                      displayDataTypes={false}
                      enableClipboard={false}
                      collapseStringsAfterLength={false}
                      rootName={false}
                      theme={theme.isDark ? "dark" : "light"}
                      keyRenderer={keyRenderer}
                    />
                  ) : (
                    <Box textAlign={"center"} py={2} color={({ palette }) => palette.secondary.light}>
                      {t("script.notfound")}
                    </Box>
                  )}
                </ViewJson>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </StyledModal>
  );
};

export default ScriptModal;
