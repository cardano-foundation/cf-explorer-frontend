import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../commons/resources/images/Wallet.png";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import AIcon from "../../../commons/resources/images/AIcon.png";
import { Tooltip } from "antd";

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
          From:{" "}
          <Tooltip title={item?.stakeAddressFrom || ""} placement="bottom">
            <span className={styles.address}>{getShortWallet(item?.stakeAddressFrom || "")}</span>
          </Tooltip>{" "}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <img className={styles.img} src={walletImg} alt="wallet icon" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ minWidth: 45 }}>To:</div>
            <div>
              {item?.addressTo.map((adr, idx) => {
                return (
                  <div className={styles.address}>
                    <Tooltip title={adr || ""} placement="bottom">
                      {getShortWallet(adr)}
                    </Tooltip>

                    {selected === adr ? (
                      <BiCheckCircle size={20} className={styles.icon} />
                    ) : (
                      <IoMdCopy
                        size={20}
                        className={styles.icon}
                        onClick={() => {
                          setSelected(adr);
                          copyToClipboard(adr);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* To Do: check lại icon khi copy cái khác thì hoàn trả icon cũ */}
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
