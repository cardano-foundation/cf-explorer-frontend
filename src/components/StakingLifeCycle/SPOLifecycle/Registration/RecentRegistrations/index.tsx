/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useUpdateEffect } from "react-use";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

import useFetchList from "../../../../../commons/hooks/useFetchList";
import { details } from "../../../../../commons/routers";
import { API } from "../../../../../commons/utils/api";
import CustomFilter, { FilterParams } from "../../../../commons/CustomFilter";
import OverviewStaking from "../../../../commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "../../../../commons/Table";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";
import { FilterContainer, StyledList } from "../../styles";
import { GridBox, StyledContainer, WrapFilterDescription } from "./styles";

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

  const handleSelect = (registration?: SPORegistration) => {
    history.push(details.spo(poolId, "timeline", "registration", registration?.txHash));
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
        <FilterContainer>
          <WrapFilterDescription>{t("common.showXResults", { value: data.length })}</WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onSubmit={(params) => {
              if (params) {
                setParams(params);
              } else {
                setParams({});
              }
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel={t("common.searchTx")}
          />
        </FilterContainer>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <CommonSkeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
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
