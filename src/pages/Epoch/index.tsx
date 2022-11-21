import { useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFetch from '../../commons/hooks/useFetch';
import AIcon from '../../commons/resources/images/AIcon.png';
import { checkStatus } from '../../commons/utils/helper';
import Card from '../../components/commons/Card';
import Table, { Column } from '../../components/commons/Table';
import styles from './index.module.scss';

interface IDataEpoch {
  no: number;
  status: string;
  blkCount: number;
  endTime: string;
  startTime: string;
  outSum: number;
  txCount: number;
}

interface IEpoch {
  data: IDataEpoch[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

const styleFont700 = {
  fontSize: '17px',
  fontWeight: 700,
  color: '#273253',
};

const styleFont400 = {
  fontSize: '17px',
  fontWeight: 400,
  color: '#273253',
};
const columns: Column<IDataEpoch>[] = [
  {
    title: '#',
    key: '#',
    minWidth: '100px',
    render: r => {
      return <span style={styleFont400}>{r.no}</span>;
    },
  },
  {
    title: 'Status',
    key: 'status',
    minWidth: '100px',
    render: r => {
      return <span style={checkStatus(r.status)}>{r.status}</span>;
    },
  },
  {
    title: 'Start date',
    key: 'startTime',
    minWidth: '100px',
    render: r => {
      return <span style={styleFont400}>{r.startTime}</span>;
    },
  },
  {
    title: 'End date',
    key: 'endTime',
    minWidth: '100px',
    render: r => {
      return <span style={styleFont400}>{r.endTime}</span>;
    },
  },
  {
    title: 'Blocks',
    key: 'blkCount',
    minWidth: '100px',
    render: r => {
      return (
        <div>
          <img style={{ marginRight: '8px' }} src={AIcon} alt="a icon" />
          <span style={styleFont700}>{r.blkCount}</span>
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
        <div>
          <img style={{ marginRight: '8px' }} src={AIcon} alt="a icon" />
          <span style={styleFont700}>{r.outSum}</span>
        </div>
      );
    },
  },
];

const Epoch: React.FC = () => {
  const [limit] = useState(10);
  const { search } = useLocation();
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const page = useMemo(() => {
    const page = new URLSearchParams(search).get('page') || 1;
    return Number(page);
  }, [search]);

  const { data, refesh } = useFetch<IEpoch>(`epoch/list?page=${page}&size=${limit}`);

  if (!data?.data) return null;

  const excuteScroll = () => ref.current?.scrollIntoView();

  return (
    <div className={styles.container} id="epoch" ref={ref}>
      <Card title={'Epoch'}>
        <Table
          className={styles.table}
          columns={columns}
          data={data?.data}
          total={{ count: 1000, title: 'Total Transactions' }}
          pagination={{
            defaultCurrent: page,
            total: data.totalItems,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            size: 'small',
            pageSizeOptions: [10, 20, 50],
            pageSize: limit,
            onChange(page, pageSize) {
              history.push(`?page=${page}`);
              excuteScroll();
              refesh();
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Epoch;
