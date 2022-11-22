import styles from './index.module.scss';
import { BiCheckCircle } from 'react-icons/bi';
import { IoMdCopy } from 'react-icons/io';
import { useCopyToClipboard } from 'react-use';

import contractImg from '../../../commons/resources/images/trx-contract.png';

interface ContractsProps {
  data: Transaction['contracts'] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
  console.log('🚀 ~ file: index.tsx ~ line 13 ~ data', data);
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.img} src={contractImg} alt="contract icon" />
        {data &&
          data.map((ct, key) => {
            return (
              <div key={key}>
                <div className={styles.address}>{ct.contract}</div>
                {state.value === ct.contract ? (
                  <BiCheckCircle size={20} className={styles.icon} />
                ) : (
                  <IoMdCopy size={20} className={styles.icon} onClick={() => copyToClipboard(ct.contract)} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contracts;
