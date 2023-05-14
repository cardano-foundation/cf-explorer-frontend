import { useState } from 'react';
import Table, { Column } from '../commons/Table';
import useFetchList from '../../commons/hooks/useFetchList';
import { API } from '../../commons/utils/api';
import { Box, CircularProgress } from '@mui/material';
import { TextOverFlow } from '../StakingLifeCycle/DelegatorLifecycle/ReportComposerModal/styles';
import { DownloadGreenIcon } from '../../commons/resources';
import { lowerCase, startCase } from 'lodash';
import { defaultAxiosDownload } from '../../commons/utils/axios';

const PoolLifecycle = () => {
  const [{ page, size }, setPagi] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
  const [onDownload, setOnDownload] = useState<number | false>(false);

  const downloadFn = async (reportId: number, fileName: string) => {
    setOnDownload(reportId);
    defaultAxiosDownload
      .get(API.REPORT.DOWNLOAD_POOL_SUMMARY(reportId))
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => {
        setOnDownload(false);
      });
  };

  const columns: Column<IPoolReportList>[] = [
    {
      key: 'name',
      title: 'Report Name',
      maxWidth: '300px',
      render(data) {
        return <TextOverFlow>{data.reportName}</TextOverFlow>;
      }
    },
    {
      key: 'epoch',
      title: 'Epoch range',
      render(data) {
        return `Epoch${data.epochRanges[0]} - Epoch ${data.epochRanges[1]}`;
      }
    },
    {
      key: 'transfer',
      title: 'Pool size',
      render(data) {
        return data.isPoolSize ? 'Yes' : 'No';
      }
    },
    {
      key: 'feePaid',
      title: 'Fee paid',
      render(data) {
        return data.isFreePaid ? 'Yes' : 'No';
      }
    },
    {
      key: 'event',
      title: 'Events',
      maxWidth: '200px',
      render(data) {
        return data.event
          .split(',')
          .map((event: string) => startCase(lowerCase(event.replaceAll('_', ' '))))
          .join(', ');
      }
    },
    {
      key: 'download',
      title: '',
      maxWidth: '30px',
      render(data) {
        return onDownload === data.reportId ? (
          <CircularProgress size={22} color='primary' />
        ) : (
          <DownloadGreenIcon onClick={() => downloadFn(data.reportId, data.reportName)} />
        );
      }
    }
  ];

  const fetchData = useFetchList<IPoolReportList>(API.REPORT.POOL_REPORT_SUMMARY, {
    page,
    size
  });

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: 'Pool life cycle summary', count: fetchData.total }}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default PoolLifecycle;
