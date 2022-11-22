import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import useFetchList from "../../commons/hooks/useFetchList";
import EpochBlockList from "../../components/EpochBlockList";
import EpochOverview from "../../components/EpochOverview";

import styles from "./index.module.scss";

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<{ epochId: string }>();

  const { data: EpochDetail, loading: EpochDetailLoading } = useFetch<IDataEpoch>(`epoch/${epochId}`);
  const {
    data: BlockList,
    loading,
    total,
    totalPage,
    currentPage,
  } = useFetchList<BlockDetail>("block/list", { epochNo: epochId });

  return (
    <div className={styles.container}>
      <EpochOverview data={EpochDetail} loading={EpochDetailLoading} />
      <EpochBlockList
        data={BlockList}
        loading={loading}
        currentPage={currentPage}
        total={total}
        totalPage={totalPage}
      />
    </div>
  );
};

export default EpochDetail;
