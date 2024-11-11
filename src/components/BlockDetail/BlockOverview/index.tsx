import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  TimeIconComponent,
  TxConfirm,
  ExchageIcon,
  ExchageAltIcon,
  OutputIcon,
  CubeIconComponent,
  SlotIcon,
  BlockProducerIcon,
  TooltipIcon
} from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo } from "src/commons/utils/helper";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import ADAicon from "src/components/commons/ADAIcon";
import DetailHeader from "src/components/commons/DetailHeader";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";

import { TitleCard, WrapConfirmation } from "./styles";

interface BlockOverviewProps {
  data: BlockDetail | null;
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
          <Box data-testid="block.detail.overview.value.createAt">{formatDateTimeLocal(data?.time || "")}</Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: TxConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} data-testid="block.detail.overview.title.confirmation">
            {data?.confirmation && data?.confirmation > 1 ? t("glossary.comfirmations") : t("glossary.comfirmation")}
          </TitleCard>
        </Box>
      ),
      value: (
        <WrapConfirmation data-testid="block.detail.overview.value.confirmation">
          {data?.confirmation || 0}
        </WrapConfirmation>
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
      value: (
        <Box
          component={data?.poolView ? Link : Box}
          color={({ palette }) => `${data?.poolView ? palette.primary.main : palette.secondary.main}!important`}
          to={details.delegation(data?.poolView)}
          data-testid="block.detail.overview.value.producer"
        >
          {data?.poolName ? (
            data.poolName
          ) : (
            <DynamicEllipsisText value={data?.poolView ? data.poolView : data?.description || ""} isTooltip />
          )}{" "}
          {data?.poolTicker && `- ${data.poolTicker}`}
        </Box>
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
