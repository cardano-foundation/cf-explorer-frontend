import React from "react";
import { Box  } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";

import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import CopyButton from "../../../commons/CopyButton";
import { routers } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";

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
      <Box display={"flex"} alignItems="center">
        <Box width={50}>
          <img className={styles.img} src={sendImg} alt="wallet icon" />
        </Box>
        <Box width={"100%"}>
          <div className={styles.top}>
            <div>
              From:{" "}
              <Link
                to={routers.ADDRESS_DETAIL.replace(":address", item?.stakeAddressFrom || "")}
                className={styles.address}
              >
                <CustomTooltip title={item?.stakeAddressFrom || ""} placement="top">
                  <span>{getShortWallet(item?.stakeAddressFrom || "")}</span>
                </CustomTooltip>
              </Link>
              <CopyButton text={item?.stakeAddressFrom || ""} className={styles.icon} />
            </div>
            <div>
              <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
                {item &&
                  item?.amount > 0 &&
                  (type === "down" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`)}
                {type === "down" && item && item?.amount === 0 && `${formatADA(item?.amount)}`}
              </span>
              <img src={AIcon} alt="ADA icon" />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.right}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ minWidth: "1.75rem" }}>To:</div>
                <div>
                  {item?.addressTo.map((adr, idx) => {
                    return (
                      <div key={adr}>
                        <Link to={routers.ADDRESS_DETAIL.replace(":address", adr)} className={styles.address}>
                          <CustomTooltip title={adr} placement="top">
                            <span> {getShortWallet(adr)}</span>
                          </CustomTooltip>
                        </Link>
                        <CopyButton text={adr} className={styles.icon} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};
