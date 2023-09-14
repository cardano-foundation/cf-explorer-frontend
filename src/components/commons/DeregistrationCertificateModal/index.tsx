import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

import CopyButton from "../CopyButton";
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
    <StyledModal {...props} width={550} title={t("common.deregistrationCert")}>
      <Box>
        {loading && <Skeleton variant="rectangular" width={500} height={90} />}
        {!loading && (
          <StyledContainerModal>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
              {t("common.stakeAddress")}
            </Box>
            {data && (
              <Box>
                <Box>
                  <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                  <CopyButton text={stake} />
                </Box>
              </Box>
            )}
          </StyledContainerModal>
        )}
      </Box>
    </StyledModal>
  );
};
