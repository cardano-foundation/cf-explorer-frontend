/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useUpdateEffect } from "react-use";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import useFetchList from "../../../../../commons/hooks/useFetchList";
import { API } from "../../../../../commons/utils/api";
import CustomFilter, { FilterParams } from "../../../../commons/CustomFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "../../../../commons/Table";
import { GridBox, WrapFilterDescription, StyledList, StyledContainer } from "./styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";
import { details } from "../../../../../commons/routers";

interface Props {
  onSelect: (registration: SPORegistration | null) => void;
  setShowBackButton: (status: boolean) => void;
}

const RecentRegistrations: React.FC<Props> = ({ onSelect, setShowBackButton }) => {
  const { t } = useTranslation();
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [params, setParams] = useState<FilterParams>({});

  const { data, total, loading, initialized, error, query } = useFetchList<SPORegistration>(
    poolId ? API.SPO_LIFECYCLE.SPO_REGISTRATION(poolId) : "",
    { ...pageInfo, ...params, txHash: params.search }
  );

  useEffect(() => {
    if (initialized) setShowBackButton(data.length > 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, setShowBackButton]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, data]);

  const handleSelect = (registration: SPORegistration) => {
    history.push(details.spo(poolId, "timeline", "registration", registration.txHash));
  };

  const isOneItemOnly = data.length === 1 && Object.keys(query).length === 2;

  useUpdateEffect(() => {
    if (isOneItemOnly) history.replace(details.spo(poolId, "timeline", "registration", data[0].txHash));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (txHash || isOneItemOnly) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>{t("common.registrationList")}</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>{t("common.showXResults", { value: data.length })}</WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onChange={(params) => {
              setParams(params);
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel={t("common.searchTx")}
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

export default RecentRegistrations;
