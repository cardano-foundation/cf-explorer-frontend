import moment from "moment";
import React, { useMemo } from "react";
import { Progress } from "antd";

import { formatADA } from "../../commons/utils/helper";
import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";

interface EpochkOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

const EpochOverview: React.FC<EpochkOverviewProps> = ({ data, loading }) => {
  const percentage = useMemo(() => {
    if (data?.startTime && data?.endTime) {
      const start = new Date(data?.startTime);
      const end = new Date(data.endTime);
      start.setDate(start.getDate() + 5);

      return end.getTime() / start.getTime() * 100;
    }
    return 0;
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
            <h4 style={{fontWeight: "var(--font-weight-normal)"}}>{data?.status}</h4>
            <h4 style={{color: "var(--color-green-light)"}}>{percentage}%</h4>
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
          currentSlot: data?.no || 0,
          epoch: data?.epochSlotNo || 0,
        }}
      />
    </Card>
  );
};

export default EpochOverview;
