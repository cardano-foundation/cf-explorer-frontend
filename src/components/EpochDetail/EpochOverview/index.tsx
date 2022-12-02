import moment from "moment";
import React, { useMemo } from "react";
import { Progress } from "antd";

import { formatADA } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import DetailCard from "../../commons/DetailCard";

import styles from "./index.module.scss";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { AIcon } from "../../../commons/resources";

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
    { title: "Start time", value: data?.startTime ? moment(data?.startTime).format("MM/DD/YYYY HH:mm:ss") : "" },
    { title: "End time", value: data?.endTime ? moment(data?.endTime).format("MM/DD/YYYY HH:mm:ss") : "" },
    { title: "Block", value: data?.blkCount },
    {
      title: "Total Output",
      value: (
        <span style={{ display: "flex", alignItems: "center" }}>
          {data?.outSum && (
            <>
              <div>{formatADA(data?.outSum)} ADA</div>
              <img className={styles.img} alt="ada icon" src={AIcon} />
            </>
          )}
        </span>
      ),
    },
    {
      value: (
        <div className={styles.progressWrapper}>
          <div className={styles.horizon} />
          <div className={styles.progress}>
            <Progress
              className={styles.progressBar}
              percent={percentage}
              status="active"
              strokeColor={"var(--linear-gradient-green)"}
              trailColor={"var(--border-color)"}
              showInfo={false}
            />
            <div className={styles.progressDetail}>
              <h4 className={styles.status}>{data?.status ? EPOCH_STATUS[data?.status] : ""}</h4>
              <h4 className={styles.percentage}>{percentage}%</h4>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.wrapper} title={`Epoch Detail: ${data?.no || 0}`}>
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
