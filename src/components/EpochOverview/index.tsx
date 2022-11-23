import moment from "moment";
import React, { useMemo } from "react";
import { Progress } from "antd";

import { formatADA } from "../../commons/utils/helper";
import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";
import { EPOCH_STATUS } from "../../commons/utils/constants";

interface EpochkOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

// console.log(EPOCH_STATUS["IN_PROGRESS"]);


// const getStatus = (status: string | undefined) => {
//   switch (status) {
//     case EPOCH_STATUS.FINISH:
//       return "Finished";
//     case EPOCH_STATUS.INPROGRESS:
//       return "In Progress";
//     case EPOCH_STATUS.REWARD:
//       return "Rewarding";
//     default:
//       return "";
//   }
// };

const EpochOverview: React.FC<EpochkOverviewProps> = ({ data, loading }) => {
  const { slot, percentage } = useMemo(() => {
    if (data?.startTime && data?.endTime) {
      const slot = moment.min(moment(), moment(data?.endTime)).diff(data?.startTime) / 1000;
      const percentage = +(slot / 4320).toFixed(2);
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
              <img className={styles.img} alt="ada icon" src={aIcon} />
            </>
          )}
        </span>
      ),
    },
    {
      value: <div className={styles.horizon} />,
    },
    {
      value: (
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
