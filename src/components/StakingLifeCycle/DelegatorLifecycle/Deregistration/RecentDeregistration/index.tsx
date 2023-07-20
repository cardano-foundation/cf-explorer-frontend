/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import OverviewStaking from "src/components/commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { GridBox, StyledContainer, StyledList, WrapFilterDescription } from "./styles";
import { DescriptionText } from "../../styles";

interface Props {
  onSelect: (deregistration: DeregistrationItem | null) => void;
  setShowBackButton: (status: boolean) => void;
}

const RecentDeregistrations: React.FC<Props> = ({ onSelect, setShowBackButton }) => {
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [params, setParams] = useState<FilterParams>({});

  const { data, total, loading, initialized, error, query } = useFetchList<DeregistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DEREGISTRATION(stakeId) : "",
    { ...pageInfo, ...params, txHash: params.search }
  );

  useEffect(() => {
    if (initialized) setShowBackButton(data.length > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, setShowBackButton]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (deregistration: DeregistrationItem) => {
    history.push(details.staking(stakeId, "timeline", "deregistration", deregistration.txHash));
  };

  const isOneItemOnly = data.length === 1 && Object.keys(query).length === 2;

  useUpdateEffect(() => {
    if (isOneItemOnly) history.replace(details.staking(stakeId, "timeline", "deregistration", data[0].txHash));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (txHash || isOneItemOnly) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>Deregistration List</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {data.length} {data.length > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onChange={(params) => {
              setParams(params);
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel="Search transaction"
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

export default RecentDeregistrations;
