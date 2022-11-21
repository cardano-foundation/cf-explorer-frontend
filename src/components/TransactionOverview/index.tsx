import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import moment from "moment";
import React from "react";

import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";
import { getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";

interface Props {}

const TransactionOverview: React.FC<Props> = () => {
  const listDetails = [
    {
      title: "Transaction hash",
      value: (
        <Link to={`#`} className={`${styles.alignCenter} ${styles.link}`}>
          {getShortWallet("d0437081d2a1234b12342506307")}
          <BiLinkExternal className={styles.icon} />
        </Link>
      ),
    },

    {
      title: "Time",
      value: moment("2022-11-15T08:52:40.188Z").format("MM/DD/YYYY HH:mm:ss"),
    },
    {
      title: "More",
      value: <h4 className={`${styles.status} ${styles.green}`}>SUCCESS</h4>,
    },
    {
      title: "Confirmation",
      value: (
        <div className={styles.alignCenter}>
          10
          <h4 className={`${styles.status} ${styles.yellow} ${styles.ml10}`}>MEDIUM</h4>
        </div>
      ),
    },
    {
      title: "Transaction Fees",
      value: (
        <div className={styles.alignCenter}>
          <span>331.36871 ADA</span>
          <img className={styles.img} alt="ada icon" src={aIcon} />
        </div>
      ),
    },
    {
      title: "Total Output",
      value: (
        <div className={styles.alignCenter}>
          <span>33359648234154851.36871 ADA</span>
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
          block: 766582,
          currentSlot: 325120,
          epoch: 362,
        }}
        //TO DO
        loading={false}
      />
    </Card>
  );
};

export default TransactionOverview;
