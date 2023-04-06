import DetailHeader from "../../commons/DetailHeader";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import exchageAltIcon from "../../../commons/resources/icons/exchangeArrow.svg";
import outputIcon from "../../../commons/resources/icons/outputIcon.svg";
import cubeIcon from "../../../commons/resources/icons/blockIcon.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import { Box } from "@mui/material";
import { TitleCard } from "./styles";
import { formatADAFull, formatDateTimeLocal } from "../../../commons/utils/helper";
import { ADAToken } from "../../commons/Token";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  const listOverview = [
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Created at </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.time || ""),
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
          {formatADAFull(data?.totalFees)} <ADAToken />
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
        <Box component={"span"}>
          {formatADAFull(data?.totalOutput)} <ADAToken />
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
