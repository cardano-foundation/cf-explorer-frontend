import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";

import Card from "../../commons/Card";
import DetailCard from "../../commons/DetailCard";
import { formatADA, getShortHash } from "../../../commons/utils/helper";

import styles from "./index.module.scss";
import { Tooltip } from "@mui/material";
import { AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import CopyButton from "../../commons/CopyButton";

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Transaction hash",
      value: data?.tx.hash && (
        <div className={styles.alignCenter}>
          <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", data?.tx.hash || "")} className={styles.link}>
            <Tooltip title={data?.tx.hash || ""} placement="top">
              <span>{getShortHash(data?.tx.hash || "")}</span>
            </Tooltip>
          </Link>
          <CopyButton text={data?.tx.hash || ""} className={styles.icon} />
        </div>
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
          <img className={styles.img} alt="ada icon" src={AIcon} />
        </div>
      ),
    },
    {
      title: "Total Output",
      value: data?.tx.totalOutput && (
        <div className={styles.alignCenter}>
          <span>{formatADA(data?.tx.totalOutput || 0)} ADA </span>
          <img className={styles.img} alt="ada icon" src={AIcon} />
        </div>
      ),
    },
  ];

  return (
    <Card title={"Transactions Detail"}>
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
