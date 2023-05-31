import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "../../../../commons/Table";
import { GridBox, WrapFilterDescription, StyledList, StyledContainer } from "./styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";
import { details } from "../../../../../commons/routers";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";

const PoollUpdatesList = ({ onSelect }: { onSelect: (pool: PoolUpdateItem | null) => void }) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { data, total, loading, initialized, error } = useFetchList<PoolUpdateItem>(
    API.SPO_LIFECYCLE.POOL_UPDATE(poolId),
    {
      ...pageInfo,
      ...params
    }
  );
  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (poolUpdated: PoolUpdateItem) => {
    history.push(details.spo(poolId, "timeline", "pool-updates", poolUpdated.txHash));
  };

  useUpdateEffect(() => {
    if (data && data.length && data.length === 1) {
      handleSelect(data[0]);
    }
  }, [JSON.stringify(data)]);

  if (txHash) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>Recent Updates</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription data-testid="showing">
            Showing {data.length} {data.length > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              params &&
                setParams({
                  fromDate: undefined,
                  sort: undefined,
                  toDate: undefined,
                  txHash: undefined,
                  ...params
                });
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
          />
        </Box>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {data.map((item, ii) => {
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
          total={{
            count: total,
            title: ""
          }}
          pagination={{
            total,
            ...pageInfo,
            onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
          }}
          loading={loading || false}
        />
      )}
    </StyledContainer>
  );
};
export default PoollUpdatesList;
