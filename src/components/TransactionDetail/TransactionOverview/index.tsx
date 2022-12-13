import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import React from "react";

import Card from "../../commons/Card";
import DetailHeader from "../../commons/DetailHeader";
import { formatADA, getShortHash } from "../../../commons/utils/helper";

import styles from "./index.module.scss";
import { Tooltip } from "@mui/material";
import { AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import CopyButton from "../../commons/CopyButton";
import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  return (
    <DetailHeader
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
            status: CONFIRMATION_STATUS.MEDIUM,
          },
          transactionFees: {
            fee: data.tx.fee,
            token: "ADA",
          },
        }
      }
      loading={loading}
    />
  );
};

export default TransactionOverview;
