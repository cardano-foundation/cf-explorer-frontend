import React from "react";
import { IoMdCopy } from "react-icons/io";
import { useCopyToClipboard } from "react-use";

import { getShortWallet, formatADA } from "../../../commons/utils/helper";

import styles from "./index.module.scss";
import walletImg from "../../../commons/resources/images/Wallet.png";
import sendImg from "../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../commons/resources/images/summary-down.png";
import AIconImg from "../../../commons/resources/images/AIcon.png";
import feeImg from "../../../commons/resources/images/fee.png";
import { BiCheckCircle } from "react-icons/bi";

interface Props {
  data: Transaction["utxOs"] | null;
  fee: number;
}

const UTXO: React.FC<Props> = ({ data, fee }) => {
  return (
    <div>
      <Card type="down" item={data?.inputs} />
      <Card type="up" item={data?.outputs} fee={fee} />
    </div>
  );
};

export default UTXO;

const Card = ({
  type,
  item,
  fee,
}: {
  type: "up" | "down";
  item?: Required<Transaction>["utxOs"]["inputs"];
  fee?: number;
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const totalADA =
    item &&
    item.reduce((prv, i) => {
      return prv + i.value;
    }, fee || 0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.type}>{type === "down" ? "Input" : "Output"}</div>Wallet Addresses
        </div>
        <div>Amount</div>
      </div>
      {item &&
        item.map((i, ii) => (
          <>
            <div className={styles.item} key={ii}>
              <div className={styles.bottom}>
                <div className={styles.top}>
                  <img className={styles.img} src={walletImg} alt="wallet icon" />
                  <div>
                    {type === "down" ? "From" : "To"}:{" "}
                    <span className={styles.address}>{getShortWallet(i.address)}</span>{" "}
                    {state.value === i.address ? (
                      <BiCheckCircle size={20} className={styles.icon} />
                    ) : (
                      <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(i.address)} />
                    )}
                  </div>
                </div>
                <div>
                  <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
                    {type === "down" ? `- ${formatADA(i.value)}` : `+ ${formatADA(i.value)}`}
                  </span>
                  <img src={AIconImg} alt="ADA icon" />
                </div>
              </div>
              <div className={`${styles.paddingTop} ${styles.bottom}`}>
                {type === "down" && (
                  <>
                    <div>
                      <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
                      {i.txHash}
                      {state.value === i.txHash ? (
                        <BiCheckCircle size={20} className={styles.icon} />
                      ) : (
                        <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(i.txHash)} />
                      )}
                    </div>
                    <div>
                      <div className={styles.status}>GAME</div>
                      <div className={styles.status}>Montley moon234</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ))}
      {type === "up" && (
        <div className={styles.item}>
          <div className={styles.bottom}>
            <div className={styles.top}>
              <img className={styles.img} src={feeImg} alt="wallet icon" />
              <div>Fee</div>
            </div>
            <div>
              <span className={`${styles.address} ${styles.up}`}>{formatADA(fee)}</span>
              <img src={AIconImg} alt="ADA icon" />
            </div>
          </div>
          <div className={`${styles.paddingTop} ${styles.bottom}`}></div>
        </div>
      )}
      <div className={styles.footer}>
        <div>Total {type === "down" ? "Input" : "Output"}</div>
        <div>
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(totalADA)}` : `+ ${formatADA(totalADA)}`}
          </span>
          <img src={AIconImg} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
