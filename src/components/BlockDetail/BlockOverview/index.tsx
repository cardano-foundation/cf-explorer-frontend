import DetailHeader from "../../commons/DetailHeader";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  return (
    <DetailHeader
      loading={loading}
      data={
        data && {
          type: "block",
          header: {
            title: data.blockNo,
            hash: data.hash,
            slotLeader: true,
          },

          blockDetail: {
            epochNo: data.epochNo,
            epochSlot: data.epochSlotNo,
            maxEpochSlot: data.totalSlot,
            blockNo: data.blockNo,
          },
          transactionFees: {
            fee: data.totalFees,
            token: "ADA",
          },
          totalOutput: {
            totalOutput: data.totalOutput,
            token: "ADA",
          },
        }
      }
    />
  );
};

export default BlockOverview;
