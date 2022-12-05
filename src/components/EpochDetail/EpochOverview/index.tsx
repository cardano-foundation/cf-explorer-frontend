import moment from "moment";
import React, { useMemo } from "react";

import Card from "../../commons/Card";
import DetailCard from "../../commons/DetailCard";
import { AIcon } from "../../../commons/resources";
import { formatADA } from "../../../commons/utils/helper";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";

import {
  HorizonDiv,
  ProcessDiv,
  ProgressInfoDiv,
  ProgressPercent,
  ProgressStatus,
  StyledLinearProgress,
  StyledSpan,
} from "./styles";

interface EpochkOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

const EpochOverview: React.FC<EpochkOverviewProps> = ({ data, loading }) => {
  const { slot, percentage } = useMemo(() => {
    if (data?.startTime && data?.endTime) {
      const slot = moment(data?.endTime).diff(data?.startTime) / 1000;
      const percentage = +Math.min((slot / MAX_SLOT_EPOCH) * 100, 100).toFixed(2);
      return { slot, percentage };
    }
    return { slot: 0, percentage: 0 };
  }, [data?.startTime, data?.endTime]);

  const listDetails = [
    {
      title: "Start time",
      value: data?.startTime ? moment(data?.startTime).format("MM/DD/YYYY HH:mm:ss") : "",
    },
    {
      title: "End time",
      value: data?.endTime ? moment(data?.endTime).format("MM/DD/YYYY HH:mm:ss") : "",
    },
    {
      title: "Block",
      value: data?.blkCount,
    },
    {
      title: "Total Output",
      value: (
        <StyledSpan>
          {data?.outSum && (
            <>
              <div>{formatADA(data?.outSum)} ADA</div>
              <img src={AIcon} alt={"Ada Icon"} />
            </>
          )}
        </StyledSpan>
      ),
    },
    {
      value: <HorizonDiv />,
    },
    {
      value: (
        <ProcessDiv>
          <StyledLinearProgress variant="determinate" value={percentage} />
          <ProgressInfoDiv>
            <ProgressStatus>{data?.status ? EPOCH_STATUS[data?.status] : ""}</ProgressStatus>
            <ProgressPercent>{percentage}%</ProgressPercent>
          </ProgressInfoDiv>
        </ProcessDiv>
      ),
    },
  ];

  return (
    <Card title={`Epoch Detail: ${data?.no || 0}`}>
      <DetailCard
        loading={loading}
        listDetails={listDetails}
        progress={{
          block: data?.blkCount || 0,
          currentSlot: slot,
          epoch: data?.no || 0,
        }}
      />
    </Card>
  );
};

export default EpochOverview;
