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
import moment from "moment";
import { formatADA } from "../../../commons/utils/helper";
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
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: moment(data?.time).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      icon: exchageIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction</TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: data?.txCount || 0,
    },
    {
      icon: exchageAltIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction Fees </TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: (
        <>
          {formatADA(data?.totalFees || 0)} <ADAToken />
        </>
      ),
    },
    {
      icon: outputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Total Output</TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: (
        <>
          {formatADA(data?.totalOutput || 0)} <ADAToken />
        </>
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
          {data?.slotNo || 0}
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
      data={
        data && {
          type: "block",
          header: {
            title: "Block detail",
            hash: data.slotLeader,
            slotLeader: true,
          },

          blockDetail: {
            epochNo: data.epochNo,
            epochSlot: data.epochSlotNo,
            maxEpochSlot: data.totalSlot,
            blockNo: data.blockNo,
          },
          transactionFees: {
            fee: data.totalFees,
            token: "ADA",
          },
          totalOutput: {
            totalOutput: data.totalOutput,
            token: "ADA",
          },
        }
      }
    />
  );
};

export default BlockOverview;
