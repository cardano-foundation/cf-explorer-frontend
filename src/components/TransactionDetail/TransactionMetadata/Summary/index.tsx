import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import sendImg from "../../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../../commons/resources/images/summary-down.png";
import messageImg from "../../../../commons/resources/images/summary-message.png";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import { Tooltip } from "antd";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";

const SummaryItems = ({
  item,
  type,
}: {
  item: Transaction["summary"]["stakeAddressTxInputs"][number];
  type?: "up" | "down";
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <div className={styles.transfer}>
          <div className={styles.wallet}>
            <img className={styles.img} src={walletImg} alt="wallet icon" />
            {type === "down" ? "From" : "To"}:{" "}
          </div>
          <div className={styles.transferInfo}>
            <div className={styles.transferAddress}>
              <Link to={routers.ADDRESS_DETAIL.replace(":address", item.address)} className={styles.address}>
                <Tooltip title={item.address} placement="top">
                  {getShortWallet(item.address)}
                </Tooltip>
              </Link>
              <CopyButton text={item.address} className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.transfer} ${styles.nowrap}`}>
        <div className={styles.wallet}>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
          ADA sent:{" "}
        </div>
        <div className={styles.transferInfo}>
          <div className={styles.transferAddress}>
            <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
              {type === "down" ? `-${formatADA(item.value)}` : `+${formatADA(item.value)}`}
            </span>
            <img src={AIcon} alt="ADA icon" />
          </div>
          <div className={styles.transferValue}>
            <h4 className={`${styles.status} ${styles.yellow} ${styles.ml10}`}>Native Token</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SummaryProps {
  data: Transaction["summary"] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <div>
      {data?.stakeAddressTxInputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="down" />
      ))}
      {data?.stakeAddressTxOutputs.map((tx, key) => (
        <SummaryItems key={key} item={tx} type="up" />
      ))}

      <div className={styles.item}>
        <div className={styles.top}>
          <img className={styles.img} src={messageImg} alt="wallet icon" />
          <div>Message</div>
        </div>
        <div className={`${styles.bottom} ${styles.textMessage}`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi magni neque esse libero commodi. Facere
          quis deserunt et nihil itaque quisquam in mollitia.
        </div>
      </div>
    </div>
  );
};

export default Summary;
