import styles from "./index.module.scss";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";
import { useCopyToClipboard } from "react-use";

import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { useEffect, useState } from "react";
import { getShortWallet } from "../../../../commons/utils/helper";
import { Tooltip } from "antd";
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
                <Link to={routers.ADDRESS_DETAIL.replace(":address", ct.contract)} className={styles.address}>
                  <Tooltip title={ct.contract} placement="top">
                    {getShortWallet(ct.contract)}
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
