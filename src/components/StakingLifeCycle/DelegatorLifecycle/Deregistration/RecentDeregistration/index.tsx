/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "../../../../commons/Table";
import { GridBox, StyledContainer, StyledList, WrapFilterDescription } from "./styles";
import { DescriptionText } from "../../styles";
import { details } from "../../../../../commons/routers";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";

interface Props {
  onSelect: (deregistration: DeregistrationItem | null) => void;
  params?: FilterParams;
  setParams?: (params: FilterParams) => void;
  setShowBackButton?: (status: boolean) => void;
}

const RecentDeregistrations: React.FC<Props> = ({ onSelect, params, setParams, setShowBackButton }) => {
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });

  const { data, total, loading, initialized, error } = useFetchList<DeregistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DEREGISTRATION(stakeId) : "",
    { ...pageInfo, ...params }
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

  const handleSelect = (deregistration: DeregistrationItem) => {
    history.push(details.staking(stakeId, "timeline", "deregistration", deregistration.txHash));
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
        <DescriptionText>Deregistration List</DescriptionText>
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
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}
        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                item={item}
                amount={Math.abs(item.deposit) - item.fee || 0}
                time={item.time}
                hash={item.txHash}
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
