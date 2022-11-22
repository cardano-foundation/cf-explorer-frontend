import { Link, useHistory } from 'react-router-dom';
import { stringify } from 'qs';

import Card from '../commons/Card';
import Table, { Column } from '../commons/Table';
import { BiLinkExternal } from 'react-icons/bi';
import { formatADA, getShortHash, getShortWallet } from '../../commons/utils/helper';
import styles from './index.module.scss';

import AIcon from '../../commons/resources/images/AIcon.png';
import moment from 'moment';

interface TransactionListProps {
  transactions: Transactions[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ currentPage, loading, total, totalPage, transactions }) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<Transactions>[] = [
    {
      title: '#',
      key: 'id',
      minWidth: '40px',
      render: (data, index) => {
        return <div className={styles.fwBold}>{index + 1}</div>;
      },
    },
    {
      title: 'Trx Hash',
      key: 'trxhash',
      minWidth: '200px',

      render: r => (
        <div>
          <Link to={`transactions/${r.hash}`} className={`${styles.fwBold} ${styles.link}`} style={{ margin: 0 }}>
            {getShortHash(r.hash)}
          </Link>
          <div>{moment('2022-11-15T08:52:40.188Z').format('MM/DD/YYYY HH:mm:ss')}</div>
        </div>
      ),
    },
    {
      title: 'Block',
      key: 'block',
      minWidth: '200px',
      render: r => (
        <>
          <Link to={`/block-list/${r.blockNo}`} className={`${styles.fwBold} ${styles.link}`}>
            {r.blockNo}
          </Link>
          / {r.slot}
        </>
      ),
    },
    {
      title: 'Address',
      key: 'address',
      minWidth: '200px',
      render(r, index) {
        return (
          <div>
            <div className={styles.input}>
              <div className={styles.title}> Input: </div>
              <div>
                {r.addressesInput.slice(0, 2).map((tx, key) => {
                  return (
                    <Link to={`#`} className={`${styles.fwBold} ${styles.link}`} key={key}>
                      {getShortWallet(tx)}
                      <BiLinkExternal style={{ marginLeft: 8 }} />
                    </Link>
                  );
                })}
                {r.addressesInput.length > 2 && (
                  <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                    ...
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.output}>
              <div className={styles.title}>Output: </div>
              <div>
                {r.addressesOutput.slice(0, 2).map((tx, key) => {
                  return (
                    <Link to={`#`} className={`${styles.fwBold} ${styles.link}`} key={key}>
                      {getShortWallet(tx)}
                      <BiLinkExternal style={{ marginLeft: 8 }} />
                    </Link>
                  );
                })}
                {r.addressesOutput.length > 2 && (
                  <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                    ...
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Fees',
      key: 'fee',
      minWidth: '120px',
      render: r => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.fee) || 0}
        </div>
      ),
    },
    {
      title: 'Output',
      minWidth: '120px',
      key: 'ouput',
      render: r => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.totalOutput) || 0}
        </div>
      ),
    },
  ];

  return (
    <Card title={'Transactions'}>
      <Table
        className={styles.table}
        columns={columns}
        data={transactions}
        total={{ count: total, title: 'Total Transactions' }}
        loading={loading}
        pagination={{
          current: currentPage + 1 || 1,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          size: 'small',
          pageSizeOptions: [10, 20, 50],
          onChange(page, pageSize) {
            setQuery({ page, size: pageSize });
          },
        }}
      />
    </Card>
  );
};

export default TransactionList;
