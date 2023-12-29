import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

import CopyButton from "../CopyButton";
import { CommonSkeleton } from "../CustomSkeleton";
import StyledModal from "../StyledModal";
import { StakeLink, StyledContainerModal } from "./styles";

export const DeregistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const { t } = useTranslation();
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);

  return (
    <StyledModal {...props} width={"fit-content"} title={t("common.deregistrationCert")}>
      <Box
        sx={{
          wordBreak: "break-word",
          maxWidth: "min(90vw, 1200px)"
        }}
      >
        {loading && <CommonSkeleton variant="rectangular" width={500} height={90} />}
        {!loading && (
          <StyledContainerModal>
            <Box
              marginBottom={1}
              fontWeight={"bold"}
              fontSize={"0.875rem"}
              color={({ palette }) => palette.secondary.light}
            >
              {t("common.stakeAddress")}
            </Box>
            {data && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                <CopyButton text={stake} />
              </Box>
            )}
          </StyledContainerModal>
        )}
      </Box>
    </StyledModal>
  );
};
