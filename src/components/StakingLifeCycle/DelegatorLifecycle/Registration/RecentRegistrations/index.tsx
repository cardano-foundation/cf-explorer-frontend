import { Box, IconButton, Skeleton } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../../StackingFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord } from "../../../../commons/Table";
import { FilterDateLabel } from "../../Delegation/styles";
import { GridBox, StyledContainer, StyledList, WrapFilterDescription } from "./styles";
import { DATETIME_PARTTEN } from "../../../../StackingFilter/DateRangeModal";
import { DescriptionText } from "../../styles";
import { details } from "../../../../../commons/routers";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  onSelect: (registration: RegistrationItem | null) => void;
  params?: FilterParams;
  setParams?: (params: FilterParams) => void;
}

const RecentRegistrations: React.FC<Props> = ({ onSelect, params, setParams }) => {
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { data, total, loading, initialized, error } = useFetchList<RegistrationItem>(
    stakeId ? API.STAKE_LIFECYCLE.REGISTRATION(stakeId) : "",
    {
      page: 0,
      size: 1000,
      ...params
    }
  );
  const handleSelect = (registration: RegistrationItem) => {
    history.push(details.staking(stakeId, "timeline", "registration", registration.txHash));
  };
  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

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

  const filterLabel = useMemo(() => {
    const sortArr = params?.sort && params?.sort.split(",");
    if (params?.fromDate && params?.toDate)
      return ` Filter by: ${moment.utc(params?.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params?.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params?.sort && sortArr && params?.sort.length >= 2)
      return `${sortArr[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params?.txHash) return `Searching for : ${params?.txHash}`;
  }, [params]);

  if (txHash) return null;

  return (
    <StyledContainer data-testid='recent-registration'>
      <StyledList>
        <DescriptionText>Registration List</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) =>
              setParams &&
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
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant='rectangular' width={300} height={185} />
          ))}

        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.deposit + item.fee}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={handleSelect}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </StyledContainer>
  );
};

export default RecentRegistrations;
