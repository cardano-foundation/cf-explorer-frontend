import { Link } from "react-router-dom";

import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";
import { formatADA, getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import moment from "moment";
import { Tooltip } from "antd";
import { AIcon } from "../../commons/resources";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Block ID",
      value: data?.hash && (
        <Tooltip title={data?.hash || ""} placement="top">
          <Link to={`#`} className={styles.link}>
            {getShortWallet(data?.hash || "")}
          </Link>
        </Tooltip>
      ),
    },

    {
      title: "Created at",
      value: data?.time ? moment(data?.time).format("MM/DD/YYYY HH:mm:ss") : "",
    },
    {
      title: "Transaction",
      value: data?.txCount,
    },
    {
      title: "Transaction Fees",
      value: (
        <span className={styles.transaction}>
          {data?.totalFees && (
            <>
              <div>{formatADA(data?.totalFees)} ADA</div> <img className={styles.img} alt="ada icon" src={AIcon} />
            </>
          )}
        </span>
      ),
    },
    {
      title: "Total Output",
      value: (
        <span style={{ display: "flex", alignItems: "center" }}>
          {data?.totalOutput && (
            <>
              <div> {formatADA(data?.totalOutput)} ADA</div> <img className={styles.img} alt="ada icon" src={AIcon} />
            </>
          )}
        </span>
      ),
    },
    {
      title: "Slot leader",
      value: data?.slotLeader && (
        <Tooltip title={data?.slotLeader || ""} placement="top">
          <Link to={`#`} className={styles.link}>
            {getShortWallet(data?.slotLeader || "")}
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <Card className={styles.wrapper} title={`Block Detail: ${data?.blockNo || 0} `}>
      <DetailCard
        loading={loading}
        listDetails={listDetails}
        progress={{
          block: data?.blockNo || 0,
          currentSlot: data?.epochSlotNo || 0,
          epoch: data?.epochNo || 0,
        }}
      />
    </Card>
  );
};

export default BlockOverview;
