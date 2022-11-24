import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../commons/resources/images/Wallet.png";
import sendImg from "../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../commons/resources/images/summary-down.png";
import AIconImg from "../../../commons/resources/images/AIcon.png";
import messageImg from "../../../commons/resources/images/summary-message.png";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";

interface SummaryProps {
  data: Transaction["summary"] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <div>
      {data && data.stakeAddressTxInputs.map((tx, key) => <SummaryItems key={key} item={tx} type="down" />)}
      {data && data.stakeAddressTxOutputs.map((tx, key) => <SummaryItems key={key} item={tx} type="up" />)}

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

const SummaryItems = ({
  item,
  type,
}: {
  item: Transaction["summary"]["stakeAddressTxInputs"][number];
  type?: "up" | "down";
}) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setSelected("");
      }, 3000);
    }
  }, [selected]);

  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          {type === "down" ? "From" : "To"}: <span className={styles.address}>{getShortWallet(item.address)}</span>{" "}
          {selected === item.address ? (
            <BiCheckCircle size={20} className={styles.icon} />
          ) : (
            <IoMdCopy
              size={20}
              className={styles.icon}
              onClick={() => {
                copyToClipboard(item.address);
                setSelected(item.address);
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
          ADA sent:{" "}
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `-${formatADA(item.value)}` : `+${formatADA(item.value)}`}
          </span>
          <img src={AIconImg} alt="ADA icon" />
        </div>
        <h4 className={`${styles.status} ${styles.yellow} ${styles.ml10}`}>Native Token</h4>
      </div>
    </div>
  );
};
