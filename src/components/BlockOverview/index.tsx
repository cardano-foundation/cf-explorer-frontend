import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";
import { formatADA, getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";
import moment from "moment";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Block ID",
      value: data?.hash && (
        <Link to={`#`} className={styles.link}>
          {getShortWallet(data?.hash || "")}
          <BiLinkExternal className={styles.icon} />
        </Link>
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
              <div>{formatADA(data?.totalFees)} ADA</div>{" "}
              <img className={styles.img} alt="ada icon" src={aIcon} />
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
              <div> {formatADA(data?.totalOutput)} ADA</div>{" "}
              <img className={styles.img} alt="ada icon" src={aIcon} />
            </>
          )}
        </span>
      ),
    },
    {
      title: "Slot leader",
      value: data?.slotLeader && (
        <Link to={`#`} className={styles.link}>
          {getShortWallet(data?.slotLeader || "")}
          <BiLinkExternal className={styles.icon} />
        </Link>
      ),
    },
  ];

  return (
    <Card
      className={styles.wrapper}
      title={`Block Detail: ${data?.blockNo || 0} `}
    >
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
