import { Box, Skeleton } from "@mui/material";
import { Modal } from "@mui/material";
import ReactJson from "react-json-view";
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
  const { data, loading } = useFetch<PolicyDetail>(`${API.POLICY}/${policy && policy}`);

  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"left"} fontSize="1.5rem" fontWeight="bold" fontFamily={'"Roboto", sans-serif '}>
          Policy ID
        </Box>
        {loading && (
          <Box height={40} width="100%" borderRadius={props => props.borderRadius} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <Box>
            <ButtonLink to={details.policyDetail(data?.policyId || "")}>{data?.policyId || ""}</ButtonLink>
            <CopyButton text={data?.policyId || ""} />
          </Box>
        )}
        {loading && (
          <Box height={20} my={1} width="100%" borderRadius={props => props.borderRadius} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <Box mt={2}>
            <Box component={"span"}>Total Token:</Box>
            <Box component={"span"} ml={2} fontWeight="bold">
              {data?.totalToken || 0}
            </Box>
          </Box>
        )}

        {loading && (
          <Box height={150} width="100%" borderRadius={props => props.borderRadius} overflow="hidden">
            <Skeleton height={"100%"} width="100%" variant="rectangular" />
          </Box>
        )}
        {!loading && (
          <>
            <Box mt={2} mb={1}>
              Policy script:
            </Box>
            <ViewJson>
              {data?.policyScript && (
                <ReactJson
                  name={false}
                  src={JSON.parse(data?.policyScript || "")}
                  enableClipboard={false}
                  displayDataTypes={false}
                  style={{ padding: 0, background: "none", color: "#344054" }}
                  displayObjectSize={false}
                  collapsed={false}
                  shouldCollapse={() => false}
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
