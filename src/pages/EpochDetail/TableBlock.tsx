import { Link, useHistory } from 'react-router-dom';
import AIcon from '../../commons/resources/images/AIcon.png';
import Card from '../../components/commons/Card';
import Table, { Column } from '../../components/commons/Table';
import styles from './index.module.scss';

const columns: Column<IBlockEpochDetail>[] = [
  {
    title: '#',
    key: '#',
    minWidth: '100px',
    render: r => {
      return (
        <Link to={`/epoch/${r.no}`}>
          <span>{r.no}</span>
        </Link>
      );
    },
  },
  {
    title: 'Status',
    key: 'status',
    minWidth: '100px',
    render: r => {
      return (
        <Link to={`/epoch/${r.no}`}>
          <span>{r.status}</span>
        </Link>
      );
    },
  },
  {
    title: 'Start date',
    key: 'startTime',
    minWidth: '100px',
    render: r => {
      return <span>{r.startTime}</span>;
    },
  },
  {
    title: 'End date',
    key: 'endTime',
    minWidth: '100px',
    render: r => {
      return <span>{r.endTime}</span>;
    },
  },
  {
    title: 'Blocks',
    key: 'blkCount',
    minWidth: '100px',
    render: r => {
      return (
        <div>
          <img src={AIcon} alt="a icon" />
          <span>{r.blkCount}</span>
        </div>
      );
    },
  },
  {
    title: 'Output',
    key: 'outSum',
    minWidth: '100px',
    render: r => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ marginRight: '8px' }} src={AIcon} alt="a icon" />
          <span>{r.outSum}</span>
        </div>
      );
    },
  },
];
const TableBlock = () => {
  const history = useHistory();
  return (
    <Card title={'Block'}>
      <Table
        className={styles.table}
        columns={columns}
        data={[]}
        total={{ count: 1000, title: 'Total Transactions' }}
        pagination={{
          defaultCurrent: 10,
          total: 100,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          size: 'small',
          pageSizeOptions: [10, 20, 50],
          pageSize: 10,
          onChange(page, pageSize) {
            history.push(`?page=${page}`);
            // excuteScroll();
            // refesh();
          },
        }}
      />
    </Card>
  );
};

export default TableBlock;
