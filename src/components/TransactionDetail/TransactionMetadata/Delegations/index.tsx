import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import { getShortWallet } from "../../../../commons/utils/helper";
import upIcon from "../../../../commons/resources/images/summary-up.png";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Wallet Addresses</div>
        {/* <div>Amount</div> */}
      </div>
      {data && data.map((item, key) => <Items item={item} key={key} type="down" />)}
    </div>
  );
};

export default Delegations;

const Items = ({ item, type }: { item?: Required<Transaction>["delegations"][number]; type?: "up" | "down" }) => {
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
          <Tooltip title={item?.address} placement="bottom">
            <span className={styles.address}> {getShortWallet(item?.address || "")} </span>{" "}
          </Tooltip>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <img className={styles.img} src={upIcon} alt="wallet icon" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ minWidth: 45 }}>Pool ID:</div>
            <Link to={"#"} className={`${styles.link} ${styles.address}`}>
              {item?.poolId}
            </Link>
            {selected === item?.poolId ? (
              <BiCheckCircle size={20} className={styles.icon} />
            ) : (
              <IoMdCopy
                size={20}
                className={styles.icon}
                onClick={() => {
                  setSelected(item?.poolId);
                  copyToClipboard(item?.poolId || "");
                }}
              />
            )}
          </div>
        </div>
        <div>
          {/* <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
            {type === "down" ? `- ${formatADA(item?.)}` : `+ ${formatADA(item?.amount)}`}
          </span>
          <img src={AIcon} alt="ADA icon" /> */}
        </div>
      </div>
    </div>
  );
};
