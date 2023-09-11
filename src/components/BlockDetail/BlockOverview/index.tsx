import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import {
  timeIconUrl,
  exchageIconUrl,
  exchageAltIconUrl,
  outputIconUrl,
  cubeIconUrl,
  txConfirmUrl,
  slotIconUrl
} from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo } from "src/commons/utils/helper";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import ADAicon from "src/components/commons/ADAIcon";
import DetailHeader from "src/components/commons/DetailHeader";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { Subtext, TitleCard, WrapConfirmation } from "./styles";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
  lastUpdated?: number;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading, lastUpdated }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  const listOverview = [
    {
      icon: timeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Created At </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.time || "")
    },
    {
      icon: txConfirmUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>
            {data?.confirmation && data?.confirmation > 1 ? "Confirmations" : "Confirmation"}
          </TitleCard>
        </Box>
      ),
      value: <WrapConfirmation>{data?.confirmation || 0}</WrapConfirmation>
    },
    {
      icon: exchageIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{data?.txCount && data?.txCount > 1 ? "Transactions" : "Transaction"}</TitleCard>
        </Box>
      ),
      value: data?.txCount || 0
    },
    {
      icon: exchageAltIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction Fees </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {formatADAFull(data?.totalFees)} <ADAicon />
        </Box>
      )
    },
    {
      icon: outputIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Total Output in ADA</TitleCard>
        </Box>
      ),
      value: (
        <Box data-testid="block-details-total-output-in-ada" component={"span"}>
          {formatADAFull(data?.totalOutput)} <ADAicon />
        </Box>
      )
    },
    {
      icon: cubeIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Block</TitleCard>
        </Box>
      ),
      value: (() => {
        const { blockName, tooltip } = formatNameBlockNo(data?.blockNo, data?.epochNo);
        return (
          <CustomTooltip title={tooltip}>
            <span>{blockName}</span>
          </CustomTooltip>
        );
      })()
    },
    {
      icon: slotIconUrl,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.epochSlotNo || 0}
          <Subtext>/{MAX_SLOT_EPOCH}</Subtext>
        </>
      )
    }
  ];
  return (
    <Box mb={3}>
      <DetailHeader
        loading={loading}
        listItem={listOverview}
        type="BLOCK"
        hash={data?.hash}
        bookmarkData={`${data?.blockNo || data?.hash}`}
        title={"Block details"}
        lastUpdated={lastUpdated}
        epoch={
          data && {
            no: data.epochNo,
            slot: currentEpoch?.no === data.epochNo ? data.epochSlotNo : MAX_SLOT_EPOCH
          }
        }
      />
    </Box>
  );
};

export default BlockOverview;
