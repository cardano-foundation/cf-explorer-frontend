import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import BlockList from "../../components/BlockLists";
import EpochOverview from "../../components/EpochOverview";

import styles from "./index.module.scss";

const EpochDetail: React.FC = () => {
  const { epochId } = useParams<{ epochId: string }>();

  const { data: EpochDetail, loading: EpochDetailLoading } = useFetch<IDataEpoch>(`epoch/${epochId}`);

  // const dataMemo = useMemo(() => {
  //   if (!data) {
  //     return {
  //       blkCount: 1,
  //       endTime: "",
  //       no: 1,
  //       outSum: 1,
  //       startTime: "",
  //       status: "",
  //       txCount: 1,
  //     };
  //   }
  //   return data;
  // }, [data]);

  // const listDetails = [
  //   {
  //     title: "Start time:",
  //     value: dataMemo.startTime,
  //   },

  //   {
  //     title: "End time:",
  //     value: dataMemo.endTime,
  //   },
  //   {
  //     title: "Blocks: ",
  //     value: dataMemo.blkCount,
  //   },
  //   {
  //     title: "Total Output:",
  //     value: (
  //       <div className={styles.transaction}>
  //         <span>{dataMemo.outSum || 0}</span> <img className={styles.img} alt="ada icon" src={AIcon} />
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className={styles.container}>
      <EpochOverview data={EpochDetail} loading={EpochDetailLoading} />
      {/* <BlockList blockLists={}/> */}
    </div>
  );
};

export default EpochDetail;
