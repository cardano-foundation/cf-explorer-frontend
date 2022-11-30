import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import sendImg from "../../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../../commons/resources/images/summary-down.png";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { useEffect, useState } from "react";
import { AIcon } from "../../../../commons/resources";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import CopyButton from "../../../commons/CopyButton";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Wallet Addresses</div>
        <div>Amount</div>
      </div>
      {data && data.map((item, key) => <Items item={item} key={key} type="down" />)}
    </div>
  );
};

export default Collaterals;

const Items = ({ item, type }: { item?: Required<Transaction>["collaterals"][number]; type?: "up" | "down" }) => {
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          From:{" "}
          <Link to={routers.ADDRESS_DETAIL.replace(":address", item?.address || "")} className={styles.address}>
            <Tooltip title={item?.address} placement="top">
              <span className={styles.address}> {getShortWallet(item?.address || "")} </span>{" "}
            </Tooltip>
          </Link>
          <CopyButton text={item?.address || ""} className={styles.icon} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
          <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", item?.txHash || "")} className={styles.address}>
            <Tooltip title={item?.txHash || ""} placement="top">
              {getShortHash(item?.txHash || "")}
            </Tooltip>
          </Link>
          <CopyButton text={item?.txHash || ""} className={styles.icon} />
        </div>
        <div>
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`}
          </span>
          <img src={AIcon} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
