import React from "react";

import DetailHeader from "../../commons/DetailHeader";
import { getShortHash } from "../../../commons/utils/helper";

import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

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
