import React from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../commons/resources/images/Wallet.png";
import sendImg from "../../../commons/resources/images/summary-up.png";
import receiveImg from "../../../commons/resources/images/summary-down.png";
import AIconImg from "../../../commons/resources/images/AIcon.png";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";

interface WithdrawalsProps {
  data: Transaction["withdrawals"] | null;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ data }) => {
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

export default Withdrawals;

const Items = ({ item, type }: { item?: Required<Transaction>["withdrawals"][number]; type?: "up" | "down" }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          From: <span className={styles.address}>{getShortWallet(item?.stakeAddressFrom || "")}</span>{" "}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <img className={styles.img} src={walletImg} alt="wallet icon" />
          <div>
            To:
            {item?.addressTo.map((adr, idx) => {
              return (
                <>
                  <span className={styles.address}>{getShortWallet(adr)}</span>
                  {state.value === adr ? (
                    <BiCheckCircle size={20} className={styles.icon} />
                  ) : (
                    <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(adr)} />
                  )}
                  <br />
                </>
              );
            })}
          </div>
          {/* To Do: check lại icon khi copy cái khác thì hoàn trả icon cũ */}
        </div>
        <div>
          <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`}
          </span>
          <img src={AIconImg} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
