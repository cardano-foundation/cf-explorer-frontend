import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import StackingFilter, { FilterParams } from "src/components/StackingFilter";
import OverviewStaking from "src/components/commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { GridBox, WrapFilterDescription, StyledContainer, StyledList } from "./styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";

interface Props {
  onSelect: (registration: SPODeregistration | null) => void;
  setShowBackButton?: (status: boolean) => void;
}

const RecentDeregistrations: React.FC<Props> = ({ onSelect, setShowBackButton }) => {
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
  const { data, total, loading, initialized, error } = useFetchList<SPODeregistration>(
    poolId ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : "",
    {
      ...pageInfo,
      ...params
    }
  );

  useEffect(() => {
    if (initialized) {
      setShowBackButton?.(data.length > 1);
    }
  }, [initialized]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (deregistration: SPODeregistration) => {
    history.push(details.spo(poolId, "timeline", "deregistration", deregistration.txHash));
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
        <DescriptionText>Recent Deregistration</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <WrapFilterDescription>
            Showing {data.length} {data.length > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams(() => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              }));
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
          />
        </Box>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}

        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.poolHold ? item.poolHold - item.fee : item.fee}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={handleSelect}
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

export default RecentDeregistrations;
