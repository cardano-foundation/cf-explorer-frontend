import { Box, Tooltip } from "@mui/material";

import styles from "./index.module.scss";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import receiveImg from "../../../../commons/resources/images/receiveImg.svg";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { AIcon } from "../../../../commons/resources";
import { routers } from "../../../../commons/routers";
import { Link } from "react-router-dom";
import CopyButton from "../../../commons/CopyButton";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
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

export default Collaterals;

const Items = ({ item, type }: { item?: Required<Transaction>["collaterals"][number]; type?: "up" | "down" }) => {
  return (
    <div className={styles.item}>
      <Box display={"flex"} alignItems="center">
        <Box width={50}>
          <img src={type === "down" ? receiveImg : sendImg} className={styles.img} alt="send icon" />
        </Box>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent="space-between" alignItems={"center"} className={styles.top}>
            <div>
              From:{" "}
              <Link to={routers.ADDRESS_DETAIL.replace(":address", item?.address || "")} className={styles.address}>
                <Tooltip title={item?.address} placement="top">
                  <span className={styles.address}> {getShortWallet(item?.address || "")} </span>
                </Tooltip>
              </Link>
              <CopyButton text={item?.address || ""} className={styles.icon} />
            </div>
            <Box display={"flex"} alignItems={"center"}>
              <Box mr={"8px"}>
                <span className={`${styles.address} ${type === "up" ? styles.up : styles.down}`}>
                  {type === "down" ? `- ${formatADA(item?.amount)}` : `+ ${formatADA(item?.amount)}`}
                </span>
              </Box>
              <Box>
                <img src={AIcon} alt="ADA icon" />
              </Box>
            </Box>
          </Box>
          <Box className={styles.bottom} display="flex" alignItems={"center"}>
            <Link to={routers.TRANSACTION_DETAIL.replace(":trxHash", item?.txHash || "")} className={styles.address}>
              <Tooltip title={item?.txHash || ""} placement="top">
                <div>{getShortHash(item?.txHash || "")}</div>
              </Tooltip>
            </Link>
            <CopyButton text={item?.txHash || ""} className={styles.icon} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
