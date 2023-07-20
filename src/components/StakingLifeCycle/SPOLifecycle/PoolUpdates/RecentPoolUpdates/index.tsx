import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useUpdateEffect } from "react-use";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import StackingFilter, { FilterParams } from "src/components/StackingFilter";
import OverviewStaking from "src/components/commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { GridBox, WrapFilterDescription, StyledList, StyledContainer } from "./styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";

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
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });

  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const { data, total, loading, initialized, error } = useFetchList<PoolUpdateItem>(
    API.SPO_LIFECYCLE.POOL_UPDATE(poolId),
    { ...pageInfo, ...params }
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
    if (data?.length === 1 && !params?.txHash && !params?.fromDate && !params?.toDate) {
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
      {initialized && data?.length > 0 && !error && (
        <FooterTable
          pagination={{
            total,
            ...pageInfo,
            onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
          }}
          loading={loading}
        />
      )}
    </StyledContainer>
  );
};
export default PoollUpdatesList;
