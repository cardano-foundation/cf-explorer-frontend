import { parse } from "qs";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import useFetchList from "../../commons/hooks/useFetchList";
import EpochBlockList from "../../components/EpochDetail/EpochBlockList";
import EpochOverview from "../../components/EpochDetail/EpochOverview";

import styles from "./index.module.scss";

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<{ epochId: string }>();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data: EpochDetail, loading: EpochDetailLoading } = useFetch<IDataEpoch>(`epoch/${epochId}`);
  const {
    data: BlockList,
    loading,
    total,
    totalPage,
    currentPage,
  } = useFetchList<BlockDetail>("block/list", {
    epochNo: epochId,
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

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
