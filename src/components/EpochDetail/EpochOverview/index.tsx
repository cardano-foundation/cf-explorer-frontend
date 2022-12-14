import moment from "moment";
import React from "react";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import DetailHeader from "../../commons/DetailHeader";

interface EpochOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

const EpochOverview: React.FC<EpochOverviewProps> = ({ data, loading }) => {
  const slot =
    data?.status === "FINISHED"
      ? MAX_SLOT_EPOCH
      : (data?.endTime && data.startTime && moment(data.endTime).diff(data.startTime) / 1000) || 0;
  const progress = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(0);

  return (
    <DetailHeader
      loading={loading}
      data={
        data && {
          type: "epoch",
          header: {
            title: data.no,
            hash: "",
          },

          blockDetail: {
            epochNo: data.no,
            epochSlot: slot,
            blockNo: data.blkCount,
          },
          totalOutput: {
            totalOutput: data.outSum || 0,
            token: "ADA",
          },
          progress: {
            progress,
            status: data.status,
          },
        }
      }
    />
  );
};

export default EpochOverview;
