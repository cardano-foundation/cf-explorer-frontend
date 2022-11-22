import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { Tab } from 'rc-tabs/lib/interface';
import { useUpdateEffect } from 'react-use';

import styles from './index.module.scss';
import './index.css';
import UTXO from './UTXOs';
import Summary from './Summary';
import Contracts from './Contracts';
import Collaterals from './Collaterals';

interface TransactionMetadataProps {
  data: Transaction | null;
  loading: boolean;
}

const TransactionMetadata: React.FC<TransactionMetadataProps> = ({ data, loading }) => {
  const tabs: { label: string; key: keyof Transaction; children: React.ReactNode }[] = [
    {
      label: 'Summary',
      key: 'summary',
      children: <Summary data={(data && data['summary']) || null} />,
    },
    {
      label: `Contracts (${data?.contracts?.length || 0})`,
      key: 'contracts',
      children: <Contracts data={(data && data['contracts']) || null}  />,
    },
    {
      label: `Collaterals (${data?.collaterals?.length || 0})`,
      key: 'collaterals',
      children: <Collaterals />,
    },
    {
      label: 'UTXOs',
      key: 'utxOs',
      children: <UTXO data={(data && data['utxOs']) || null} />,
    },
    {
      label: `Notes (${data?.notes?.length || 0})`,
      key: 'notes',
      children: '',
    },
  ];

  // To Do
  // useUpdateEffect(() => {
  const items = tabs.filter(item => data?.[item.key]);
  // }, [data]);
  return <Tabs items={items} style={{ fontSize: 24 }} className={styles.tab} defaultActiveKey="summary" />;
};

export default TransactionMetadata;
