import React from 'react'; 
import { ComingSoonIcon } from '../../../../commons/resources';
import styles from './index.module.scss';

interface Props { }
 
const ComingSoon: React.FC<Props> = () => {

  return (
    <div className={styles.transactionChart}>
      <img src={ComingSoonIcon} alt="Coming soon"/>
      <h3>Coming Soon</h3>
    </div>
  )

}

export default ComingSoon;