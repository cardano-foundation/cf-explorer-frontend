import { useContext } from "react";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

import { details } from "src/commons/routers";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";

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
  const data = useContext(DelegatorDetailContext);

  return (
    <StyledModal {...props} width={550} title={t("common.deregistrationCert")}>
      <Box>
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
      </Box>
    </StyledModal>
  );
};
