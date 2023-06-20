import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import StackingFilter, { FilterParams } from "src/components/StackingFilter";
import OverviewStaking from "src/components/commons/OverviewStaking";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { EmptyRecord } from "src/components/commons/Table";

import { WrapFilterDescription } from "../../DelegatorLifecycle/Registration/RecentRegistrations/styles";
import { DescriptionText } from "../../DelegatorLifecycle/styles";
import { StyledContainer, StyledList, GridBox } from "./styles";
import { PoolUpdatesDraw } from "./PoolUpdatesDraw";
import PoolUpdateModal from "./PoolUpdateModal";

const PoollUpdates = () => {
  const [selected, setSelected] = useState<PoolUpdateItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data } = useFetch<PoolUpdateDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.POOL_UPDATE_DETAIL(selected.poolUpdateId) : ""
  );

  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const handleSelect = (pool: PoolUpdateItem | null) => {
    setSelected(pool);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <PoolUpdateModal data={data} onClose={handleToggleModal} open={openModal} />
      <PoollUpdatesList onSelect={handleSelect} setShowBackButton={setShowBackButton} />
      {selected && (
        <PoolUpdatesDraw
          poolUpdates={selected}
          data={data}
          toggleModal={handleToggleModal}
          showBackButton={showBackButton}
        />
      )}
    </Box>
  );
};
export default PoollUpdates;

export const PoollUpdatesList = ({
  onSelect,
  setShowBackButton
}: {
  onSelect: (pool: PoolUpdateItem | null) => void;
  setShowBackButton: (status: boolean) => void;
}) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const { data, total, loading, initialized, error } = useFetchList<PoolUpdateItem>(
    API.SPO_LIFECYCLE.POOL_UPDATE(poolId),
    {
      page: 0,
      size: 1000,
      ...params
    }
  );

  useEffect(() => {
    if (initialized) {
      setShowBackButton?.(data.length > 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, data]);

  const handleSelect = (poolUpdated: PoolUpdateItem) => {
    history.push(details.spo(poolId, "timeline", "pool-updates", poolUpdated.txHash));
  };

  useUpdateEffect(() => {
    if (
      data &&
      data.length &&
      data.length === 1 &&
      params?.txHash === undefined &&
      params?.fromDate === undefined &&
      params?.toDate === undefined
    ) {
      handleSelect(data[0]);
    }
  }, [JSON.stringify(data)]);

  if (txHash) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>Recent Updates</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) =>
              setParams({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              })
            }
          />
        </Box>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}
        {!loading &&
          data.map((item, ii) => {
            return (
              <OverviewStaking
                key={ii}
                item={item}
                onClick={handleSelect}
                hash={item.txHash}
                amount={item.fee}
                time={item.time}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </StyledContainer>
  );
};
