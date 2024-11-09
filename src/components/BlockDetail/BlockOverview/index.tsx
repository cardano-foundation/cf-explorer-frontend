import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  TimeIconComponent,
  ExchageIcon,
  ExchageAltIcon,
  OutputIcon,
  CubeIconComponent,
  SlotIcon,
  TooltipIcon,
  BlockProducerIcon
} from "src/commons/resources";
import { formatADAFull, formatNameBlockNo } from "src/commons/utils/helper";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import ADAicon from "src/components/commons/ADAIcon";
import DetailHeader from "src/components/commons/DetailHeader";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { TitleCard } from "./styles";

interface BlockOverviewProps {
  data: Block | null | undefined;
  loading: boolean;
  lastUpdated?: number;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  // eslint-disable-next-line no-console
  const listOverview = [
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.createAt">
            {t("createdAt")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <DatetimeTypeTooltip>
          <Box data-testid="block.detail.overview.value.createAt">{data?.time || ""}</Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: ExchageIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.transactions">
            {data?.txCount && data?.txCount > 1 ? t("glossary.transactions") : t("glossary.transaction")}
          </TitleCard>
        </Box>
      ),
      value: (
        <Box display={"inline"} data-testid="block.detail.overview.value.transactions">
          {data?.txCount || 0}
        </Box>
      )
    },
    {
      icon: ExchageAltIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.transactionFee">
            {t("glossary.transactionfees")}{" "}
          </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"} data-testid="block.detail.overview.value.transactionFee">
          {formatADAFull(data?.totalFees)} <ADAicon />
        </Box>
      )
    },
    {
      icon: OutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.output">
            {" "}
            {t("glossary.totalOutputInAda")}
          </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"} data-testid="block.detail.overview.value.output">
          {formatADAFull(data?.totalOutput)} <ADAicon />
        </Box>
      )
    },
    {
      icon: CubeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.block">
            {" "}
            {t("glossary.block")}
          </TitleCard>
        </Box>
      ),
      value: (() => {
        const { blockName, tooltip } = formatNameBlockNo(data?.blockNo, data?.epochNo);
        return (
          <CustomTooltip title={tooltip}>
            <span data-testid="block.detail.overview.value.block">{blockName}</span>
          </CustomTooltip>
        );
      })()
    },
    {
      icon: SlotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.slot">{`${t("common.slot")} - ${t(
            "glossary.absoluteSlot"
          )}`}</TitleCard>
          <CustomTooltip
            title={
              <Box sx={{ textAlign: "left" }}>
                <p>Slot: {t("common.explainSlot")}</p>
                <p>Absolute slot: {t("common.absoluteSlot")}</p>
              </Box>
            }
          >
            <span>
              <TooltipIcon />
            </span>
          </CustomTooltip>
        </Box>
      ),
      value: (
        <Box data-testid="block.detail.overview.value.slot">{`${data?.epochSlotNo || ""} - ${data?.slotNo || ""}`}</Box>
      )
    },
    {
      icon: BlockProducerIcon,
      title: (
        <Box display={"flex"} alignItems={"center"}>
          <Box display={"flex"} alignItems="center">
            <TitleCard mr={1} data-testid="block.detail.overview.title.producer">
              {t("glossary.blockproducer")}{" "}
            </TitleCard>
          </Box>
          <CustomTooltip title="Block minted by">
            <span>
              <TooltipIcon />
            </span>
          </CustomTooltip>
        </Box>
      ),
      value: <Box data-testid="block.detail.overview.value.slot">{data?.slotLeader}</Box>
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
        title={<Box data-testid="block.detail.header">{t("head.page.blockDetails")}</Box>}
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
