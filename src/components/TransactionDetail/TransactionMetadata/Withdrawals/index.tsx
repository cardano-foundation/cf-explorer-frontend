import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";

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
  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          From:{" "}
          <Link
            to={routers.ADDRESS_DETAIL.replace(":address", item?.stakeAddressFrom || "")}
            className={styles.address}
          >
            <Tooltip title={item?.stakeAddressFrom || ""} placement="top">
              {getShortWallet(item?.stakeAddressFrom || "")}
            </Tooltip>
          </Link>
          <CopyButton text={item?.stakeAddressFrom || ""} className={styles.icon} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <img className={styles.img} src={walletImg} alt="wallet icon" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ minWidth: "1.75rem" }}>To:</div>
            <div>
              {item?.addressTo.map((adr, idx) => {
                return (
                  <div key={adr}>
                    <Link to={routers.ADDRESS_DETAIL.replace(":address", adr)} className={styles.address}>
                      <Tooltip title={adr} placement="top">
                        {getShortWallet(adr)}
                      </Tooltip>
                    </Link>
                    <CopyButton text={adr} className={styles.icon} />
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
