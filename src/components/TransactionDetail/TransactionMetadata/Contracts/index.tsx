import { Tooltip } from "@mui/material";

import styles from "./index.module.scss";
import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { getShortWallet } from "../../../../commons/utils/helper";
import { Link } from "react-router-dom";
import { routers } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";

interface ContractsProps {
  data: Transaction["contracts"] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.img} src={contractImg} alt="contract icon" />
        {data &&
          data.map((ct, key) => {
            return (
              <div key={key} className={styles.item}>
                <Link to={"#"} className={styles.address}>
                  <Tooltip title={ct.contract} placement="top">
                    <div>{getShortWallet(ct.contract)}</div>
                  </Tooltip>
                </Link>
                <CopyButton text={ct.contract} className={styles.icon} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contracts;
