import React from "react";

import DetailHeader from "../../commons/DetailHeader";
import { getShortHash } from "../../../commons/utils/helper";

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
          },
        }
      }
      loading={loading}
    />
  );
};

export default TransactionOverview;
