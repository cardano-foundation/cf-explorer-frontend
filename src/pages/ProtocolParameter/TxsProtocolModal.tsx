import { styled, Box } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { details } from "src/commons/routers";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import CustomModal from "src/components/commons/CustomModal";

interface TxsProtocolModalProps {
  open: boolean;
  onClose: () => void;
  txs?: string[] | null;
}

const TxsProtocolModal: React.FC<TxsProtocolModalProps> = ({ txs, ...props }) => {
  return (
    <CustomModal width={550} {...props} title={t("glossary.transactions")}>
      <ContentModal>
        <Box fontWeight={600} color={({ palette }) => palette.secondary.light} mb={2}>
          {t("protocol.trxModalSubTitle")}
        </Box>
        <Box>
          {txs?.map((tx, idx) => (
            <Box
              mb={1}
              fontWeight={"bold"}
              color={({ palette }) => `${palette.primary.main} !important`}
              display={"block"}
              key={idx}
              component={Link}
              to={details.transaction(tx, "protocols")}
            >
              <DynamicEllipsisText value={tx} isTooltip />
            </Box>
          ))}
        </Box>
      </ContentModal>
    </CustomModal>
  );
};

export default TxsProtocolModal;

const ContentModal = styled(Box)(({ theme }) => ({
  padding: "16px 20px",
  background: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  borderRadius: "8px",
  boxShadow: theme.shadow.card
}));
