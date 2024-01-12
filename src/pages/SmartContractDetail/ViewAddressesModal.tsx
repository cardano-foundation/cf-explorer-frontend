import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import CustomModal from "src/components/commons/CustomModal";
import { API } from "src/commons/utils/api";
import { details } from "src/commons/routers";

import { ContentModal, StyledAddressModal, StyledLink, SubTitleModal, TitleModal } from "./styles";

export type TViewAddressesModalProps = {
  open: boolean;
  onClose?: () => void;
  txHash?: string;
  scriptHash?: string;
};

const ViewAddressesModal: React.FC<TViewAddressesModalProps> = ({ open, onClose, txHash = "", scriptHash = "" }) => {
  const { t } = useTranslation();
  const { data = [], loading } = useFetch<string[]>(txHash ? API.ADDRESS.VIEW_ADRRESSES(txHash, scriptHash) : "");
  return (
    <CustomModal open={open} onClose={() => onClose?.()} width={600}>
      <TitleModal>{t("glossary.address")}</TitleModal>
      {loading && (
        <Box py={3} textAlign={"center"}>
          <CircularProgress />
        </Box>
      )}
      {!loading && data?.length && (
        <ContentModal>
          <SubTitleModal>{t("glossary.address")}:</SubTitleModal>
          <StyledAddressModal>
            {data &&
              data.map((add: string) => (
                <StyledLink to={add.startsWith("stake") ? details.stake(add) : details.address(add)} key={add}>
                  <DynamicEllipsisText value={add} isTooltip sxFirstPart={{ maxWidth: "calc(100% - 80px)" }} />
                </StyledLink>
              ))}
          </StyledAddressModal>
        </ContentModal>
      )}
    </CustomModal>
  );
};

export default ViewAddressesModal;
