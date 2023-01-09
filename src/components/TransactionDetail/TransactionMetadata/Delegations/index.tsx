import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import { getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";
import CustomTooltip from "../../../commons/CustomTooltip";

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
        <Box width={"100%"}>
          <div>
            From:{" "}
            <Link to={details.address(item?.address)} className={styles.address}>
              <CustomTooltip title={item?.address} placement="top">
                <span className={styles.address}> {getShortWallet(item?.address || "")} </span>
              </CustomTooltip>
            </Link>
            <CopyButton text={item?.poolId || ""} className={styles.icon} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.right}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ minWidth: "4rem" }}>Pool ID:</div>
                <Link to={details.delegation(item?.poolId)} className={styles.address}>
                  <CustomTooltip title={item?.poolId || ""} placement="top">
                    <div>{getShortHash(item?.poolId || "")}</div>
                  </CustomTooltip>
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
