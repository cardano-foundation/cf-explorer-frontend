import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import moment from "moment";
import React from "react";

import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";
import { formatADA, getShortHash, getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";
import { Tooltip } from "antd";

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Transaction hash",
      value: data?.tx.hash && (
        <Tooltip title={data?.tx.hash || ""} placement='bottom'>
          <Link to={`#`} className={`${styles.alignCenter} ${styles.link}`}>
            {getShortHash(data?.tx.hash || "")}
          </Link>
        </Tooltip>
      ),
    },

    {
      title: "Time",
      value: data?.tx.time && moment(data?.tx.time).format("MM/DD/YYYY HH:mm:ss"),
    },
    {
      title: "Status",
      value: <h4 className={`${styles.status} ${styles.green}`}>{data?.tx.status}</h4>,
    },
    {
      title: "Confirmation",
      value: (
        <div className={styles.alignCenter}>
          {data?.tx.confirmation}
          {/* TO DO: check before BA answer */}
          {/* <h4 className={`${styles.status} ${styles.yellow} ${styles.ml10}`}>MEDIUM</h4> */}
        </div>
      ),
    },
    {
      title: "Transaction Fees",
      value: data?.tx.fee && (
        <div className={styles.alignCenter}>
          <span>{formatADA(data?.tx.fee || 0)} ADA </span>
          <img className={styles.img} alt="ada icon" src={aIcon} />
        </div>
      ),
    },
    {
      title: "Total Output",
      value: data?.tx.totalOutput && (
        <div className={styles.alignCenter}>
          <span>{formatADA(data?.tx.totalOutput || 0)} ADA </span>
          <img className={styles.img} alt="ada icon" src={aIcon} />
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.wrapper} title={"Transactions Detail"}>
      <DetailCard
        listDetails={listDetails}
        progress={{
          block: data?.tx.blockNo || 0,
          currentSlot: data?.tx.epochSlot || 0,
          epoch: data?.tx.epochNo || 0,
        }}
        loading={loading}
      />
    </Card>
  );
};

export default TransactionOverview;
