import styles from "./index.module.scss";
import { BiCheckCircle } from "react-icons/bi";
import { IoMdCopy } from "react-icons/io";
import { useCopyToClipboard } from "react-use";

import contractImg from "../../../../commons/resources/images/trx-contract.png";
import { useEffect, useState } from "react";

interface ContractsProps {
  data: Transaction["contracts"] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
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
    <div className={styles.wrapper}>
      <div>
        <img className={styles.img} src={contractImg} alt="contract icon" />
        {data &&
          data.map((ct, key) => {
            return (
              <div key={key}>
                <div className={styles.address}>{ct.contract}</div>
                {selected === ct.contract ? (
                  <BiCheckCircle size={20} className={styles.icon} />
                ) : (
                  <IoMdCopy
                    size={20}
                    className={styles.icon}
                    onClick={() => {
                      setSelected(ct.contract);
                      copyToClipboard(ct.contract);
                    }}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contracts;
