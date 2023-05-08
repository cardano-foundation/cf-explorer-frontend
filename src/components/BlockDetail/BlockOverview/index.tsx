import DetailHeader from "../../commons/DetailHeader";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import exchageAltIcon from "../../../commons/resources/icons/exchangeArrow.svg";
import outputIcon from "../../../commons/resources/icons/outputIcon.svg";
import cubeIcon from "../../../commons/resources/icons/blockIcon.svg";
import txConfirm from "../../../commons/resources/icons/txConfirm.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import { Box } from "@mui/material";
import { ConfirmStatus, TitleCard } from "./styles";
import { formatADAFull, formatDateTimeLocal } from "../../../commons/utils/helper";
import { CONFIRMATION_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import ADAicon from "../../commons/ADAIcon";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  const renderConfirmationTag = () => {
    if (data && data.confirmation) {
      if (data.confirmation <= 2) {
        return CONFIRMATION_STATUS.LOW;
      }
      if (data.confirmation <= 8) {
        return CONFIRMATION_STATUS.MEDIUM;
      }
      return CONFIRMATION_STATUS.HIGH;
    }
  };

  const listOverview = [
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Created At </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.time || ""),
    },
    {
      icon: txConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Confirmation</TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.confirmation || 0}
          <ConfirmStatus status={renderConfirmationTag() || "LOW"}>{renderConfirmationTag() || "LOW"}</ConfirmStatus>
        </>
      ),
    },
    {
      icon: exchageIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction</TitleCard>
        </Box>
      ),
      value: data?.txCount || 0,
    },
    {
      icon: exchageAltIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction Fees </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {formatADAFull(data?.totalFees)} <ADAicon />
        </Box>
      ),
    },
    {
      icon: outputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Total Output in ADA</TitleCard>
        </Box>
      ),
      value: (
        <Box data-testid="block-details-total-output-in-ada" component={"span"}>
          {formatADAFull(data?.totalOutput)} <ADAicon />
        </Box>
      ),
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Block</TitleCard>
        </Box>
      ),
      value: data?.blockNo || 0,
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.epochSlotNo || 0}
          <Box component={"span"} fontWeight="400">
            /{MAX_SLOT_EPOCH}
          </Box>
        </>
      ),
    },
  ];
  return (
    <DetailHeader
      loading={loading}
      listItem={listOverview}
      type="BLOCK"
      hash={data?.hash}
      bookmarkData={`${data?.blockNo || ""}`}
      title={"Block detail"}
      epoch={
        data && {
          no: data.epochNo,
          slot: data.epochSlotNo,
        }
      }
    />
  );
};

export default BlockOverview;
