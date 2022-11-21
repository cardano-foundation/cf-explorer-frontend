import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../commons/hooks/useFetch';
import AIcon from '../../commons/resources/images/AIcon.png';
import Card from '../../components/commons/Card';
import DetailCard from '../../components/commons/DetailCard';
import styles from './index.module.scss';
import TableBlock from './TableBlock';

interface IEpochDetail {
  blkCount: number;
  endTime: string;
  no: number;
  outSum: number;
  startTime: string;
  status: string;
  txCount: number;
}

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<any>();
  const { data, loading } = useFetch<IEpochDetail>(`epoch/${epochId}`);

  const dataMemo = useMemo(() => {
    if (!data) {
      return {
        blkCount: 1,
        endTime: '',
        no: 1,
        outSum: 1,
        startTime: '',
        status: '',
        txCount: 1,
      };
    }
    return data;
  }, [data]);

  const listDetails = [
    {
      title: 'Start time:',
      value: dataMemo.startTime,
    },

    {
      title: 'End time:',
      value: dataMemo.endTime,
    },
    {
      title: 'Blocks: ',
      value: dataMemo.blkCount,
    },
    {
      title: 'Total Output:',
      value: (
        <div className={styles.transaction}>
          <span>{dataMemo.outSum || 0}</span> <img className={styles.img} alt="ada icon" src={AIcon} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className={styles.wrapper} title={`Epoch Detail: ${dataMemo?.no}`}>
        <DetailCard
          listDetails={listDetails}
          loading={loading}
          progress={{
            block: dataMemo.blkCount,
            currentSlot: 325120,
            epoch: dataMemo.no,
          }}
        />
      </Card>
      <TableBlock />
    </>
  );
};

export default EpochDetail;
