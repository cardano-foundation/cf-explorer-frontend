import { BiLinkExternal } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import AIcon from '../../commons/resources/images/AIcon.png';
import { routers } from '../../commons/routers';
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
        <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.no}`)}>
          <span>{r.no}</span>
        </Link>
      );
    },
  },
  {
    title: 'Block',
    key: 'block',
    minWidth: '100px',
    render: r => {
      return (
        <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.no}`)}>
          <span>{r.status}</span>
        </Link>
      );
    },
  },
  {
    title: 'Slot',
    key: 'slot',
    minWidth: '100px',
    render: r => {
      return (
        <>
          <span>{`7903486369`}</span>/<span>{` 205687`}</span>
        </>
      );
    },
  },
  {
    title: 'Created by',
    key: 'createdBy',
    minWidth: '100px',
    render: r => {
      return (
        <div>
          Input: <span>fa173...b098</span>
          <BiLinkExternal fontSize={18} style={{ marginLeft: 8 }} />
        </div>
      );
    },
  },
  {
    title: 'Transactions',
    key: 'blkCount',
    minWidth: '100px',
    render: r => {
      return (
        <div>
          <span>{`25879`}</span>
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
          <span>{r.outSum || 0}</span>
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
