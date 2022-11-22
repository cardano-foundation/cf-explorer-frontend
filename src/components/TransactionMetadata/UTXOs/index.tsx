import React, { useMemo } from 'react';
import { IoMdCopy } from 'react-icons/io';
import { useCopyToClipboard } from 'react-use';

import { getShortWallet } from '../../../commons/utils/helper';
import WalletIcon from '../../../commons/resources/images/Wallet.png';

import styles from './index.module.scss';
import aIcon from '../../../commons/resources/images/AIcon.png';
import walletImg from '../../../commons/resources/images/Wallet.png';
import sendImg from '../../../commons/resources/images/summary-up.png';
import receiveImg from '../../../commons/resources/images/summary-down.png';
import AIconImg from '../../../commons/resources/images/AIcon.png';
import { BiCheckCircle } from 'react-icons/bi';

interface Props {
  data: Transaction['utxOs'] | null;
}

const UTXO: React.FC<Props> = ({ data }) => {
  // const inputTotal = useMemo(() => {
  //   return data.input?.reduce((pre, cur) => pre + cur.value, 0);
  // }, [data.input]);

  // const outputTotal = useMemo(() => {
  //   return data.output?.reduce((pre, cur) => pre + cur.value, 0);
  // }, [data.output]);

  return <div>{data && data.inputs.map((otx, key) => <Card type="down" item={otx} key={key} />)}</div>;
};

export default UTXO;

const Card = ({ type, item }: { type: 'up' | 'down'; item: Required<Transaction>['utxOs']['inputs'][number] }) => {
  console.log('🚀 ~ file: index.tsx ~ line 35 ~ Card ~ item', item);
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.type}>Input</div>Wallet Addresses
        </div>
        <div>Amount</div>
      </div>
      <div className={styles.item}>
        <div className={styles.bottom}>
          <div className={styles.top}>
            <img className={styles.img} src={walletImg} alt="wallet icon" />
            <div>
              From: <span className={styles.address}>{getShortWallet(item.address)}</span>{' '}
              {state.value === item.address ? (
                <BiCheckCircle size={20} className={styles.icon} />
              ) : (
                <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(item.address)} />
              )}
            </div>
          </div>
          <div>
            <span className={`${styles.address} ${type === 'up' ? styles.up : styles.down}`}>
              {type === 'down' ? '-22.24%' : '+16.41%'}
            </span>
            <img src={AIconImg} alt="ADA icon" />
          </div>
        </div>
        <div className={`${styles.paddingTop} ${styles.bottom}`}>
          <div>
            <img src={type === 'down' ? receiveImg : sendImg} className={styles.img} alt="send icon" />
            {/* TO DO */}
            c9a17c34be01c7aa6339735f94e13a938811d6987b95ad225a3af3734bc7a3a1{' '}
            {/* To Do: check lại icon khi copy cái khác thì hoàn trả icon cũ */}
            {state.value ? (
              <BiCheckCircle size={20} className={styles.icon} />
            ) : (
              <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard('d0437081d2...42506307')} />
            )}
          </div>
          <div>
            <div className={styles.status}>GAME</div>
            <div className={styles.status}>Montley moon234</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>Total Input</div>
        <div>
          <span className={`${styles.address} ${type === 'up' ? styles.up : styles.down}`}>
            {type === 'down' ? '-22.24%' : '+16.41%'}
          </span>
          <img src={AIconImg} alt="ADA icon" />
        </div>
      </div>
    </div>
  );
};
