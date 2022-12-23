import React from "react";
import moment from "moment";

import DetailHeader from "../../commons/DetailHeader";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";

import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";
import { Box } from "@mui/material";
import { ConfirmStatus, TitleCard } from "./component";
import { ADAToken } from "../../commons/Token";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import exchageAltIcon from "../../../commons/resources/icons/exchangeArrow.svg";
import txConfirm from "../../../commons/resources/icons/txConfirm.svg";
import cubeIcon from "../../../commons/resources/icons/blockIcon.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import txInputIcon from "../../../commons/resources/icons/txInput.svg";
import txOutputIcon from "../../../commons/resources/icons/txOutput.svg";
import CopyButton from "../../commons/CopyButton";

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  const renderConfirmationTag = () => {
    if (data && data.tx && data.tx.confirmation) {
      if (data.tx.confirmation <= 2) {
        return CONFIRMATION_STATUS.LOW;
      }
      if (data.tx.confirmation <= 8) {
        return CONFIRMATION_STATUS.MEDIUM;
      }
      return CONFIRMATION_STATUS.HIGH;
    }
  };
  const listOverview = [
    {
      icon: txInputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Input </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: data?.summary && data?.summary?.stakeAddressTxInputs.length > 0 && (
        <Box color={props => props.colorBlue}>
          {getShortWallet(data?.summary?.stakeAddressTxInputs[0]?.address || "")}
          <CopyButton text={data?.summary?.stakeAddressTxInputs[0]?.address || ""} />
        </Box>
      ),
    },
    {
      icon: txOutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Output </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: data?.summary && data?.summary?.stakeAddressTxOutputs.length > 0 && (
        <Box color={props => props.colorBlue}>
          {getShortWallet(data?.summary?.stakeAddressTxOutputs[0]?.address || "")}
          <CopyButton text={data?.summary?.stakeAddressTxOutputs[0]?.address || ""} />
        </Box>
      ),
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Time </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: moment(data?.tx?.time).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      icon: txConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Confirmation</TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          {data?.tx?.confirmation || 0}
          <ConfirmStatus status={renderConfirmationTag() || "LOW"}>{renderConfirmationTag() || "LOW"}</ConfirmStatus>
        </>
      ),
    },
    {
      icon: exchageAltIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Transaction Fees </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          {" "}
          {formatADA(data?.tx?.fee || 0)} <ADAToken />{" "}
        </>
      ),
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Block</TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: data?.tx?.blockNo || 0,
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Slot</TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <>
          ${data?.tx?.epochSlot || 0}/
          <Box component={"span"} fontWeight="400">
            432000
          </Box>
        </>
      ),
    },
  ];
  return (
    <DetailHeader
      listItem={listOverview}
      data={
        data && {
          type: "transaction",
          header: {
            title: getShortHash(data.tx.hash),
            hash: data.tx.hash,
            status: data.tx.status,
          },

          blockDetail: {
            epochNo: data.tx.epochNo,
            epochSlot: data.tx.epochSlot,
            maxEpochSlot: data.tx.maxEpochSlot,
            blockNo: data.tx.blockNo,
          },
          confirmation: {
            confirmation: data.tx.confirmation,
            status: renderConfirmationTag(),
          },
          transactionFees: {
            fee: data.tx.fee,
          },
        }
      }
      loading={loading}
    />
  );
};

export default TransactionOverview;
