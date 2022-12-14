import React from "react";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";

import { getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import upIcon from "../../../../commons/resources/images/summary-up.png";
import { routers } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";

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
        <Box width={50}>
          <img className={styles.img} src={sendImg} alt="wallet icon" />
        </Box>
        <Box width={'100%'}>
          <div>
            From:{" "}
            <Link to={routers.ADDRESS_DETAIL.replace(":address", item?.address || "")} className={styles.address}>
              <Tooltip title={item?.address} placement="top">
                <span className={styles.address}> {getShortWallet(item?.address || "")} </span>
              </Tooltip>
            </Link>
            <CopyButton text={item?.poolId || ""} className={styles.icon} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.right}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ minWidth: "4rem" }}>Pool ID:</div>
                <Link
                  to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", item?.poolId || "")}
                  className={styles.address}
                >
                  <Tooltip title={item?.poolId || ""} placement="top">
                    <div>{getShortHash(item?.poolId || "")}</div>
                  </Tooltip>
                </Link>
                <CopyButton text={item?.poolId || ""} className={styles.icon} />
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
