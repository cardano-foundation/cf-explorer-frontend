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
  KingIcon,
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
          <TitleCard mr={1}>{t("createdAt")} </TitleCard>
        </Box>
      ),
      value: <DatetimeTypeTooltip>{formatDateTimeLocal(data?.time || "")}</DatetimeTypeTooltip>
    },
    {
      icon: TxConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>
            {data?.confirmation && data?.confirmation > 1 ? t("glossary.comfirmations") : t("glossary.comfirmation")}
          </TitleCard>
        </Box>
      ),
      value: <WrapConfirmation>{data?.confirmation || 0}</WrapConfirmation>
    },
    {
      icon: ExchageIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>
            {data?.txCount && data?.txCount > 1 ? t("glossary.transactions") : t("glossary.transaction")}
          </TitleCard>
        </Box>
      ),
      value: data?.txCount || 0
    },
    {
      icon: ExchageAltIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.transactionfees")} </TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {formatADAFull(data?.totalFees)} <ADAicon />
        </Box>
      )
    },
    {
      icon: OutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.totalOutputInAda")}</TitleCard>
        </Box>
      ),
      value: (
        <Box data-testid="block-details-total-output-in-ada" component={"span"}>
          {formatADAFull(data?.totalOutput)} <ADAicon />
        </Box>
      )
    },
    {
      icon: CubeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> {t("glossary.block")}</TitleCard>
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
      icon: SlotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{`${t("common.slot")} - ${t("glossary.absoluteSlot")}`}</TitleCard>
        </Box>
      ),
      value: `${data?.epochSlotNo || ""} - ${data?.slotNo || ""}`
    },
    {
      icon: KingIcon,
      title: (
        <Box display={"flex"} alignItems={"center"}>
          <Box display={"flex"} alignItems="center">
            <TitleCard mr={1}>{t("glossary.blockproducer")} </TitleCard>
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
          color={({ palette }) => `${palette.primary.main}!important`}
          to={details.delegation(data?.poolView)}
        >
          {data?.poolName ? (
            data.poolName
          ) : (
            <DynamicEllipsisText
              value={data?.poolView ? data.poolView : data?.description || ""}
              isTooltip={!!data?.poolView}
            />
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
        title={t("head.page.blockDetails")}
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
