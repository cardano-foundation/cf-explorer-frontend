import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton, useTheme } from "@mui/material";
import { BiShowAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";

import {
  TxInputIcon,
  TxOutputIcon,
  TimeIconComponent,
  TxConfirm,
  TotalOutput,
  ExchageAltIcon,
  CubeIconComponent,
  SlotIcon
} from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortWallet } from "src/commons/utils/helper";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { details } from "src/commons/routers";
import { RootState } from "src/stores/types";
import { useScreen } from "src/commons/hooks/useScreen";
import DetailHeader from "src/components/commons/DetailHeader";
import CopyButton from "src/components/commons/CopyButton";
import DropdownDetail from "src/components/commons/DropdownDetail";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import { MaxSlot, StyledLink, TitleCard } from "./styles";

interface Props {
  data: Transaction | null;
  loading: boolean;
  lastUpdated: number;
}

const TransactionOverview: React.FC<Props> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const [openListInput, setOpenListInput] = useState(false);
  const [openListOutput, setOpenListOutput] = useState(false);
  const theme = useTheme();
  const { isMobile } = useScreen();

  const inputTransaction = useMemo(() => {
    const result = [];
    if (data?.utxOs && data?.utxOs?.inputs?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const item of data?.utxOs.inputs) {
        if (item.tokens.length) {
          result.push(...item.tokens);
        }
      }
    }
    return result;
  }, [data?.utxOs]);

  const outputTransaction = useMemo(() => {
    const result = [];
    if (data?.utxOs && data?.utxOs?.outputs?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const item of data?.utxOs.outputs) {
        if (item.tokens.length) {
          result.push(...item.tokens);
        }
      }
    }
    return result;
  }, [data?.utxOs]);

  const listOverview = [
    {
      icon: TxInputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} height={24}>
            {t("glossary.input")}{" "}
            {data?.utxOs && data?.utxOs?.inputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(false);
                  setOpenListInput(!openListInput);
                }}
              >
                <BiShowAlt color={openListInput ? theme.palette.common.black : theme.palette.text.hint} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.inputs?.length > 0 && (
        <Box position={"relative"}>
          <CustomTooltip title={data?.utxOs?.inputs[0]?.address || ""}>
            <StyledLink to={details.address(data?.utxOs?.inputs[0]?.address || "")}>
              {getShortWallet(data?.utxOs?.inputs[0]?.address || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.utxOs?.inputs[0]?.address || ""} />
          {openListInput && (
            <DropdownDetail
              minWidth={isMobile ? 160 : 200}
              title={t("glossary.addressList")}
              value={data?.utxOs?.inputs.map((i) => i.address) || []}
              close={() => setOpenListInput(false)}
            />
          )}
        </Box>
      ),
      allowSearch: inputTransaction.length === 0 ? false : true,
      isSent: true,
      dataSearch: inputTransaction,
      key: "input"
    },
    {
      icon: TxOutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} height={24}>
            {t("glossary.output")}{" "}
            {data?.utxOs && data?.utxOs?.outputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(!openListOutput);
                  setOpenListInput(false);
                }}
              >
                <BiShowAlt color={openListOutput ? theme.palette.common.black : theme.palette.text.hint} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.outputs?.length > 0 && (
        <Box position={"relative"}>
          <CustomTooltip title={data?.utxOs?.outputs[0]?.address || ""}>
            <StyledLink to={details.address(data?.utxOs?.outputs[0]?.address || "")}>
              {getShortWallet(data?.utxOs?.outputs[0]?.address || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.utxOs?.outputs[0]?.address || ""} />
          {openListOutput && (
            <DropdownDetail
              minWidth={isMobile ? 160 : 200}
              title={t("glossary.addressList")}
              value={data?.utxOs?.outputs.map((i) => i.address) || []}
              close={() => setOpenListOutput(false)}
            />
          )}
        </Box>
      ),
      allowSearch: outputTransaction.length === 0 ? false : true,
      dataSearch: outputTransaction,
      key: "output"
    },
    {
      icon: TimeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("createdAt")}</TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.tx?.time || "")
    },
    {
      icon: TxConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>
            {data?.tx?.confirmation && data?.tx?.confirmation > 1
              ? t("glossary.comfirmations")
              : t("glossary.comfirmation")}
          </TitleCard>
        </Box>
      ),
      value: <>{data?.tx?.confirmation || 0}</>
    },
    {
      icon: TotalOutput,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("glossary.totalOutput")}</TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {formatADAFull(data?.tx?.totalOutput)} <ADAicon />
        </Box>
      )
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
          {formatADAFull(data?.tx?.fee)} <ADAicon />
        </Box>
      )
    },
    {
      icon: CubeIconComponent,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard height={24} mr={1}>
            {t("glossary.block")}
          </TitleCard>
        </Box>
      ),
      value: (() => {
        const { blockName, tooltip } = formatNameBlockNo(data?.tx?.blockNo, data?.tx?.epochNo);
        return (
          <StyledLink to={details.block(data?.tx?.blockNo || 0)}>
            <CustomTooltip title={tooltip}>
              <span>{blockName}</span>
            </CustomTooltip>
          </StyledLink>
        );
      })()
    },
    {
      icon: SlotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard height={24} mr={1}>
            {t("common.slot")}
          </TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.tx?.epochSlot || 0}/<MaxSlot>{MAX_SLOT_EPOCH}</MaxSlot>
        </>
      )
    }
  ];
  return (
    <DetailHeader
      type="TRANSACTION"
      bookmarkData={data?.tx.hash || ""}
      title={t("glossary.transactionDetailTitle")}
      hash={data?.tx.hash}
      transactionStatus={data?.tx.status}
      epoch={
        data && {
          no: data.tx.epochNo,
          slot: currentEpoch?.no === data.tx.epochNo ? data.tx.epochSlot : MAX_SLOT_EPOCH
        }
      }
      listItem={listOverview}
      loading={loading}
      lastUpdated={lastUpdated}
    />
  );
};

export default TransactionOverview;
