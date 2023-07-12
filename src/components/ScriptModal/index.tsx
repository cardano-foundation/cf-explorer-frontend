import { Box, Skeleton, useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";

import CopyButton from "src/components/commons/CopyButton";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import StyledModal from "src/components/commons/StyledModal";

import { ButtonLink, ViewJson } from "./styles";

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  policy: string;
}
const ScriptModal: React.FC<ScriptModalProps> = ({ policy, ...props }) => {
  const { data, loading } = useFetch<PolicyDetail>(policy && `${API.POLICY}/${policy && policy}`);
  const theme = useTheme();
  return (
    <StyledModal open={props.open} handleCloseModal={props.onClose} contentStyle={{ overflowY: "hidden" }}>
      <Box data-testid="modal-testid" height={"100%"}>
        <Box
          textAlign={"left"}
          color={({ palette }) => palette.grey[400]}
          fontSize="1.5rem"
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif '}
        >
          Policy ID
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
          {loading ? (
            <>
              <Box data-testid="loading-element" height={40} width="100%" borderRadius={10} overflow="hidden">
                <Skeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
              <Box height={20} width="100%" borderRadius={10} overflow="hidden">
                <Skeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
              <Box height={150} width="100%" borderRadius={10} overflow="hidden">
                <Skeleton height={"100%"} width="100%" variant="rectangular" />
              </Box>
            </>
          ) : (
            <>
              <Box>
                <ButtonLink to={details.policyDetail(data?.policyId || "")}>{data?.policyId || ""}</ButtonLink>
                <CopyButton text={data?.policyId || ""} />
              </Box>
              <Box>
                <Box component={"span"} color={({ palette }) => palette.grey[300]}>
                  Total Token:
                </Box>
                <Box
                  data-testid="total-token"
                  component={"span"}
                  ml={2}
                  fontWeight="bold"
                  color={({ palette }) => palette.text.primary}
                >
                  {data?.totalToken || 0}
                </Box>
              </Box>
              <Box>
                <Box data-testid="policy-script" mb={1} color={({ palette }) => palette.grey[300]}>
                  Policy script:
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
                      style={{ padding: 0, background: "none", color: theme.palette.text.secondary }}
                      rootName={false}
                    />
                  ) : (
                    <Box textAlign={"center"} py={2} color={({ palette }) => palette.grey[300]}>
                      Script not found
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
