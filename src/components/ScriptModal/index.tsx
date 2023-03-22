import { Box, Skeleton, useTheme } from "@mui/material";
import { Modal } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { ButtonClose, ButtonLink, ModalContainer, ViewJson } from "./styles";
import closeIcon from "../../commons/resources/icons/closeIcon.svg";
import CopyButton from "../commons/CopyButton";
import useFetch from "../../commons/hooks/useFetch";
import { details } from "../../commons/routers";
import { API } from "../../commons/utils/api";

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  policy: string;
}
const ScriptModal: React.FC<ScriptModalProps> = ({ policy, ...props }) => {
  const { data, loading } = useFetch<PolicyDetail>(policy && `${API.POLICY}/${policy && policy}`);
  const theme = useTheme();
  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt="icon close" />
        </ButtonClose>
        <Box
          textAlign={"left"}
          color={({ palette }) => palette.grey[700]}
          fontSize="1.5rem"
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif '}
        >
          Policy ID
        </Box>
        {loading && (
          <Box height={40} width="100%" borderRadius={10} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <Box mt={2}>
            <ButtonLink to={details.policyDetail(data?.policyId || "")}>{data?.policyId || ""}</ButtonLink>
            <CopyButton text={data?.policyId || ""} />
          </Box>
        )}
        {loading && (
          <Box height={20} my={1} width="100%" borderRadius={10} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <Box mt={2}>
            <Box component={"span"} color={({ palette }) => palette.grey[500]}>
              Total Token:
            </Box>
            <Box component={"span"} ml={2} fontWeight="bold" color={({ palette }) => palette.common.black}>
              {data?.totalToken || 0}
            </Box>
          </Box>
        )}

        {loading && (
          <Box height={150} width="100%" borderRadius={10} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <>
            <Box mt={2} mb={1} color={({ palette }) => palette.grey[500]}>
              Policy script:
            </Box>
            <ViewJson>
              {!loading && data?.policyScript && (
                <JsonViewer
                  value={JSON.parse(data.policyScript || "")}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  enableClipboard={false}
                  collapseStringsAfterLength={false}
                  style={{ padding: 0, background: "none", color: theme.palette.text.secondary }}
                  rootName={false}
                />
              )}
            </ViewJson>
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default ScriptModal;
