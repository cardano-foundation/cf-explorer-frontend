import { IoMdCopy } from 'react-icons/io';
import { BiCheckCircle } from 'react-icons/bi';
import { useCopyToClipboard } from 'react-use';

import styles from './index.module.scss';
import walletImg from '../../../commons/resources/images/Wallet.png';
import sendImg from '../../../commons/resources/images/summary-up.png';
import receiveImg from '../../../commons/resources/images/summary-down.png';
import AIconImg from '../../../commons/resources/images/AIcon.png';

const Collaterals = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Wallet Addresses</div>
        <div>Amount</div>
      </div>
      <Items type="up" />
      <Items type="up" />
      <Items type="down" />
    </div>
  );
};

export default Collaterals;

const Items = ({ item, type }: { item?: Transaction['summary']['stakeAddressTxInputs']; type?: 'up' | 'down' }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <img className={styles.img} src={walletImg} alt="wallet icon" />
        <div>
          From: <span className={styles.address}>d0437081d2...42506307</span>{' '}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <img src={type === 'down' ? receiveImg : sendImg} className={styles.img} alt="send icon" />
          c9a17c34be01c7aa6339735f94e13a938811d6987b95ad225a3af3734bc7a3a1{' '}
          {/* To Do: check lại icon khi copy cái khác thì hoàn trả icon cũ */}
          {state.value ? (
            <BiCheckCircle size={20} className={styles.icon} />
          ) : (
            <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard('d0437081d2...42506307')} />
          )}
        </div>
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
