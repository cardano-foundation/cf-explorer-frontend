/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton } from "@mui/material";
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

interface Props {
  onSelect: (registration: SPORegistration | null) => void;
  params?: FilterParams;
  setParams?: (params: FilterParams) => void;
  setShowBackButton?: (status: boolean) => void;
}

const RecentRegistrations: React.FC<Props> = ({ onSelect, params, setParams, setShowBackButton }) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });

  const { data, total, loading, initialized, error } = useFetchList<SPORegistration>(
    poolId ? API.SPO_LIFECYCLE.SPO_REGISTRATION(poolId) : "",
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
    const isNoFilter = !params?.fromDate && !params?.toDate && !params?.txHash && !params?.sort;
    if (initialized && data.length === 1 && isNoFilter) {
      history.replace(details.staking(poolId, "timeline", "registration", data?.[0]?.txHash));
    }
  }, [params, poolId]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (registration: SPORegistration) => {
    history.replace(details.spo(poolId, "timeline", "registration", registration.txHash));
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
        <DescriptionText>Registration List</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {data.length} {data.length > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams &&
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
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant='rectangular' width={300} height={185} />
          ))}

        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.fee + item.poolHold || 0}
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

export default RecentRegistrations;
