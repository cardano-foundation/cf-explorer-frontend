import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

import Card from "../commons/Card";
import DetailCard from "../commons/DetailCard";
import { getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import aIcon from "../../commons/resources/images/AIcon.png";

const BlockListTable = () => {
  const listDetails = [
    {
      title: "Block ID",
      value: (
        <Link to={`#`} className={styles.link}>
          {getShortWallet("d0437081d2a1234b12342506307")}
          <BiLinkExternal className={styles.icon} />
        </Link>
      ),
    },

    {
      title: "Created at",
      value: dayjs("2022-11-15T08:52:40.188Z").format("MM/DD/YYYY HH:mm:ss"),
    },
    {
      title: "Transaction",
      value: 18,
    },
    {
      title: "Transaction Fees",
      value: (
        <span className={styles.transaction}>
          <div>331.38573 ADA</div>{" "}
          <img className={styles.img} alt="ada icon" src={aIcon} />
        </span>
      ),
    },
    {
      title: "Total Output",
      value: (
        <span style={{ display: "flex", alignItems: "center" }}>
          <div> 33124891829341.38573 ADA</div>{" "}
          <img className={styles.img} alt="ada icon" src={aIcon} />
        </span>
      ),
    },
    {
      title: "Slot leader",
      value: (
        <Link to={`#`} className={styles.link}>
          {getShortWallet("d0437081d2a1234b12342506307")}
          <BiLinkExternal className={styles.icon} />
        </Link>
      ),
    },
    
  ];

  return (
    <Card className={styles.wrapper} title={"Block Detail: 761236"}>
      <DetailCard
        listDetails={listDetails}
        progress={{
          block: 766582,
          currentSlot: 325120,
          epoch: 362,
          totalSlot: 432000,
        }}
      />
    </Card>
  );
};

export default BlockListTable;
