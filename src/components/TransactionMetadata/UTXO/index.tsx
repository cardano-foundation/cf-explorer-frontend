import React, { useMemo } from "react";
import { IoMdCopy } from "react-icons/io";

import { getShortWallet } from "../../../commons/utils/helper";
import WalletIcon from "../../../commons/resources/images/Wallet.png";

import styles from "./index.module.scss";
import aIcon from "../../../commons/resources/images/AIcon.png";



export interface IData {
  address: string;
  value: number;
}

interface HeaderProps {
  title: string;
}

interface BodyProps extends IData {
  isInput?: boolean;
}

interface FooterProps {
  total?: number;
  isInput?: boolean;
}

interface Props {
  input?: IData[];
  output?: IData[];
}

const TabHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.title}>
      {title && <h3>{title}</h3>}
      <div className={styles.subtitle}>
        <span>Wallet Addresses</span>
        <span>Amount</span>
      </div>
    </div>
  );
};

const TabBody: React.FC<BodyProps> = ({ address, value, isInput = true }) => {
  return (
    <>
      <div className={styles.horizon} />
      <div className={styles.content}>
        <div className={styles.alignCenter}>
          <img src={WalletIcon} alt="wallet" className={styles.wallet} />
          <span>
            From: <span className={`${styles.fwBold}`}>{address}</span>
          </span>
          <IoMdCopy className={styles.copyIcon}/>
        </div>
        {isInput ? (
          <span className={`${styles.fwBold} ${styles.colorGreen}`}>
            +{value}
            <img src={aIcon} alt="A Icon" className={styles.img} />
          </span>
        ) : (
          <span className={`${styles.fwBold} ${styles.colorRed}`}>
            -{value}
            <img src={aIcon} alt="A Icon" className={styles.img} />
          </span>
        )}
      </div>
    </>
  );
};

const TabFooter: React.FC<FooterProps> = ({ total, isInput = true }) => {
  if (isInput) {
    return (
      <div className={styles.footer}>
        <span>Total Input</span>
        <span className={styles.fwBold}>
          +{total}
          <img src={aIcon} alt="A Icon" className={styles.img} />
        </span> 
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      <span>Total Output</span>
      <span className={styles.fwBold}>
        -{total}
        <img src={aIcon} alt="A Icon" className={styles.img} />
      </span>
    </div>
  );
};

const UTXO: React.FC<Props> = ({ input, output }) => {
  const data: Props = {
    input: [
      {
        address: getShortWallet(
          "DdzFFzCqrhstiKUrJjoH3STzjJiwmHo2C8Cng7EyyD2XyrLt8Uvttv5W4NWHX1jeEAMGugPppxMfo2CnqgDFAtgRYSrN1KwuPj5MyihD"
        ),
        value: 632575935502,
      },
    ],
    output: [
      {
        address: getShortWallet(
          "DdzFFzCqrht8xCKFNUYDD9MCN7H4RgeGneZ1k52yACQcJw8XEHYddfMR9Wko2Mf1QTXg6arqw5qfVwm9ubXHBceTUBsjaCi5uzcth5jN"
        ),
        value: 632575000000,
      },
      {
        address: getShortWallet(
          "DdzFFzCqrhsqK2dMEw2atpexFVAow6sthXipCTXCou55rsraa1n1T8F3usemjT6eK9Rjf6qB9q2neQBx2iwhbRAtRXRrat91PRcHVpVv"
        ),
        value: 763245,
      },
    ],
  };

  const inputTotal = useMemo(() => {
    return data.input?.reduce((pre, cur) => pre + cur.value, 0);
  }, [data.input]);

  const outputTotal = useMemo(() => {
    return data.output?.reduce((pre, cur) => pre + cur.value, 0);
  }, [data.output]);

  return (
    <>
      <div className={styles.card}>
        <TabHeader title="Input" />
        {data.input?.map((item, index) => (
          <TabBody {...item} key={index} />
        ))}
      </div>
      <TabFooter total={inputTotal} />
      <div className={`${styles.card} ${styles.space}`}>
        <TabHeader title="Output" />
        {data.output?.map((item, index) => (
          <TabBody {...item} isInput={false} key={index} />
        ))}
      </div>
      <TabFooter total={outputTotal} isInput={false} />
    </>
  );
};

export default UTXO;
