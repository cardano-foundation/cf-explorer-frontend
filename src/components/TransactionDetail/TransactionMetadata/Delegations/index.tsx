import React, { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

import styles from "./index.module.scss";
import walletImg from "../../../../commons/resources/images/Wallet.png";
import { getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import upIcon from "../../../../commons/resources/images/summary-up.png";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { routers } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Wallet Addresses</div>
      </div>
      {data && data.map((item, key) => <Items item={item} key={key} type="down" />)}
    </div>
  );
};

export default Delegations;

const Items = ({ item, type }: { item?: Required<Transaction>["delegations"][number]; type?: "up" | "down" }) => {
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
          <CopyButton text={item?.poolId || ""} className={styles.icon} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <img className={styles.img} src={upIcon} alt="wallet icon" />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ minWidth: "4rem" }}>Pool ID:</div>
            <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", item?.poolId || "")} className={styles.address}>
              <Tooltip title={item?.poolId || ""} placement="top">
                {getShortHash(item?.poolId || "")}
              </Tooltip>
            </Link>
            <CopyButton text={item?.poolId || ""} className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
