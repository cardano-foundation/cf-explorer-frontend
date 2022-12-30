import React, { useState } from "react";
import moment from "moment";

import DetailHeader from "../../commons/DetailHeader";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";

import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";
import { Box, Button, IconButton } from "@mui/material";
import { ConfirmStatus, StyledLink, TitleCard } from "./component";
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
import { details } from "../../../commons/routers";
import DropdownDetail from "../../commons/DropdownDetail";
import { BiShowAlt } from "react-icons/bi";
import { Tooltip } from "@mui/material";

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  const [openListInput, setOpenListInput] = useState(false);
  const [openListOutput, setOpenListOutput] = useState(false);
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
          <TitleCard mr={1} height={24}>
            Input{" "}
            {data?.utxOs && data?.utxOs?.inputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(false);
                  setOpenListInput(!openListInput);
                }}
              >
                <BiShowAlt color={openListInput ? "#000" : "#98a2b3"} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.inputs?.length > 0 && (
        <Box position={"relative"}>
          <Tooltip title={data?.utxOs?.inputs[0]?.address || ""} placement="top">
            <StyledLink to={details.address(data?.utxOs?.inputs[0]?.address || "")}>
              {getShortWallet(data?.utxOs?.inputs[0]?.address || "")}
            </StyledLink>
          </Tooltip>
          <CopyButton text={data?.utxOs?.inputs[0]?.address || ""} />
          {openListInput && (
            <DropdownDetail
              minWidth={200}
              title="Address list"
              value={data?.utxOs?.inputs.map(i => i.address) || []}
              close={() => setOpenListInput(false)}
            />
          )}
        </Box>
      ),
    },
    {
      icon: txOutputIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1} height={24}>
            Output{" "}
            {data?.utxOs && data?.utxOs?.outputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(!openListOutput);
                  setOpenListInput(false);
                }}
              >
                <BiShowAlt color={openListOutput ? "#000" : "#98a2b3"} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.outputs?.length > 0 && (
        <Box position={"relative"}>
          <Tooltip title={data?.utxOs?.outputs[0]?.address || ""} placement="top">
            <StyledLink to={details.address(data?.utxOs?.outputs[0]?.address || "")}>
              {getShortWallet(data?.utxOs?.outputs[0]?.address || "")}
            </StyledLink>
          </Tooltip>
          <CopyButton text={data?.utxOs?.outputs[0]?.address || ""} />
          {openListOutput && (
            <DropdownDetail
              minWidth={200}
              title="Address list"
              value={data?.utxOs?.outputs.map(i => i.address) || []}
              close={() => setOpenListOutput(false)}
            />
          )}
        </Box>
      ),
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Time </TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
        </Box>
      ),
      value: moment(data?.tx?.time).format("MM/DD/YYYY hh:mm:ss"),
    },
    {
      icon: txConfirm,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Confirmation</TitleCard>
          <img src={infoIcon} alt="info icon" width={18} />
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
          <img src={infoIcon} alt="info icon" width={18} />
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
          <TitleCard height={24} mr={1}>
            {" "}
            Block
          </TitleCard>
        </Box>
      ),
      value: data?.tx?.blockNo || 0,
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard height={24} mr={1}>
            {" "}
            Slot
          </TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.tx?.epochSlot || 0}/
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
