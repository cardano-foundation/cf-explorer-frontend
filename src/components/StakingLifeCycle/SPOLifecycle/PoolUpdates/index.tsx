import { alpha, Box, Skeleton, styled, Tab } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link as LinkDom } from "react-router-dom";

import { PoolCert, CertUpdate, ChangeIcon, EmptyIcon } from "../../../../commons/resources";

import { CardBox, StyledContainer, ViewMoreButton, StyledList, GridBox, DotsIcon, MyGrid } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import { WrapFilterDescription } from "../../DelegatorLifecycle/Registration/RecentRegistrations/styles";
import OverviewStaking from "../../../commons/OverviewStaking";
import { useHistory, useParams } from "react-router";
import useFetch from "../../../../commons/hooks/useFetch";
import { details } from "../../../../commons/routers";
import { formatADA, getShortHash, getShortWallet, numberWithCommas } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import StyledModal from "../../../commons/StyledModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { TitleTab } from "../../../TransactionDetail/TransactionMetadata/styles";
import { DescriptionText } from "../../DelegatorLifecycle/styles";
import { useUpdateEffect } from "react-use";
import { useScreen } from "../../../../commons/hooks/useScreen";
import ViewMoreAddressModal from "~/components/ViewMoreAddressModal";
import { FilterDateLabel } from "../../DelegatorLifecycle/Delegation/styles";
import { useSelector } from "react-redux";
import { DATETIME_PARTTEN } from "~/components/StackingFilter/DateRangeModal";
import { EmptyRecord } from "~/components/commons/Table";
import { PoolUpdatesDraw } from "./PoolUpdatesDraw";
const PoollUpdates = () => {
  const [selected, setSelected] = useState<PoolUpdateItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data } = useFetch<PoolUpdateDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.POOL_UPDATE_DETAIL(selected.poolUpdateId) : ""
  );
  const handleSelect = (pool: PoolUpdateItem | null) => {
    setSelected(pool);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <PoolUpdateModal data={data} handleCloseModal={handleToggleModal} open={openModal} />
      <PoollUpdatesList onSelect={handleSelect} />
      {selected && <PoolUpdatesDraw poolUpdates={selected} data={data} toggleModal={handleToggleModal} />}
    </Box>
  );
};
export default PoollUpdates;

export const PoollUpdatesList = ({ onSelect }: { onSelect: (pool: PoolUpdateItem | null) => void }) => {
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
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
  }, [txHash, data]);

  const handleSelect = (poolUpdated: PoolUpdateItem) => {
    history.push(details.spo(poolId, "timeline", "pool-updates", poolUpdated.txHash));
  };

  useUpdateEffect(() => {
    if (data && data.length && data.length === 1 && params.txHash === undefined) {
      handleSelect(data[0]);
    }
  }, [JSON.stringify(data)]);

  const filterLabel = useMemo(() => {
    const sortArr = params.sort && params.sort.split(",");
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format("MM/DD/YYYY")} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format("MM/DD/YYYY")}`;
    if (params.sort && sortArr && params.sort.length >= 2)
      return `${sortArr[1] === "DESC" ? "Sort by: Latest - First" : "Sort by: First - Latest"}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);
  if (txHash) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>Recent Updates</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? "results" : "result"}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
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
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant='rectangular' width={300} height={185} />
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

export const PoolUpdateModal = ({
  data,
  ...props
}: {
  open: boolean;
  data: PoolUpdateDetail | null;
  handleCloseModal: () => void;
}) => {
  const { isMobile } = useScreen();
  const history = useHistory();
  const [tabActive, setTabActive] = useState("poolCertificate");
  const [selectedOwner, setSelectedOwner] = useState<string[]>([]);
  const renderPoolCert = () => (
    <MyGrid>
      <ViewMoreAddressModal
        showFullHash={true}
        maxWidth={680}
        title='Pool Owner'
        open={!!selectedOwner.length}
        onClose={() => setSelectedOwner([])}
        items={selectedOwner}
        onItemClick={(item) => history.push(details.stake(item))}
      />
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Transaction ID
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={500}>
                <CustomTooltip title={data?.txHash || ""}>
                  <Link to={details.transaction(data?.txHash || "")}>{getShortHash(data?.txHash || "")}</Link>
                </CustomTooltip>
                <CopyButton text={data?.txHash || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={500}>
                <CustomTooltip title={data?.poolView || ""}>
                  <Link to={details.delegation(data?.poolView || "")}>
                    <>{getShortWallet(data?.poolView || "")} </>
                  </Link>
                </CustomTooltip>
                <CopyButton text={data?.poolView || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box display={"flex"} p={3} alignItems={"center"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              VRF Key
            </Box>
            {data && (
              <Box display={"flex"} gap={"3px"}>
                <CustomTooltip title={data?.vrfKey}>
                  <Box pt={"7px"}>
                    <>
                      <Box
                        display={"inline"}
                        fontWeight={500}
                        fontSize='0.875rem'
                        color={({ palette }) => palette.blue[800]}
                      >
                        {getShortHash(data?.vrfKey || "")}
                      </Box>{" "}
                    </>
                  </Box>
                </CustomTooltip>
                <Box pt={"7px"}>
                  <CopyButton text={data?.vrfKey || ""} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"} alignItems={"center"}>
          <Box display='flex' alignItems='center'>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Owners
              </Box>
              {data && (
                <>
                  {data.stakeKeys && data.stakeKeys.length && (
                    <>
                      <Box key={data.stakeKeys[0]} pt={"7px"} fontWeight={500} display={"flex"} gap={"3px"}>
                        <CustomTooltip title={data.stakeKeys[0] || ""}>
                          <Box>
                            <Link to={details.stake(data.stakeKeys[0] || "")}>{getShortWallet(data.stakeKeys[0])}</Link>{" "}
                          </Box>
                        </CustomTooltip>
                        <CopyButton text={data.stakeKeys[0] || ""} />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Box>
            {data && data.stakeKeys.length > 1 ? (
              <ViewMoreButton onClick={() => setSelectedOwner(data.stakeKeys)}>
                <DotsIcon />
              </ViewMoreButton>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Reward Account
            </Box>
            {data && (
              <Box display={"flex"} gap={"3px"}>
                <CustomTooltip title={data?.rewardAccount || ""}>
                  <Box pt={"7px"} fontWeight={500}>
                    <>
                      <Link to={details.stake(data?.rewardAccount || "")}>
                        {getShortWallet(data?.rewardAccount || "")}
                      </Link>{" "}
                    </>
                  </Box>
                </CustomTooltip>
                <Box pt={"7px"}>
                  <CopyButton text={data?.rewardAccount || ""} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Margin
            </Box>
            {data && (
              <Box fontSize='0.875rem' pt={"7px"} fontWeight={500}>
                {data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%
                {data?.previousMargin !== null && (
                  <Box fontSize={12} pt={"7px"} color={(theme) => theme.palette.grey[400]}>
                    Previous: {data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0} %{" "}
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {data?.previousMargin !== null && data?.previousMargin !== data?.margin && (
            <Box>
              <ChangeIcon />
            </Box>
          )}
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"} alignItems={"center"}>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Pledge
              </Box>
              {data && (
                <Box fontSize='0.875rem' pt={"7px"} fontWeight={500}>
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              )}
              {data?.previousPledge !== null && (
                <Box fontSize={12} pt={"7px"} color={(theme) => theme.palette.grey[400]}>
                  Previous: {formatADA(data?.previousPledge || 0)} <ADAicon />
                </Box>
              )}
            </Box>
            {data?.previousPledge !== null && data?.previousPledge !== data?.pledge && (
              <Box>
                <ChangeIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
        <Box p={3} display={"flex"}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Cost
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={500} fontSize='0.875rem'>
                {formatADA(data?.cost)} <ADAicon />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </MyGrid>
  );

  const renderCertificateUpdates = () => {
    const isOldEqualNew = data?.previousMargin === data?.margin && data?.previousPledge === data?.pledge;
    if ((data?.previousMargin === null && data?.previousPledge === null) || isOldEqualNew) {
      return (
        <Box textAlign={"center"}>
          <Box component={"img"} height={215} src={EmptyIcon} alt='no data' />
        </Box>
      );
    }
    return (
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {data?.previousMargin !== null && data?.previousMargin !== data?.margin && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={(theme) => theme.palette.grey[400]} fontWeight={"bold"}>
              Margin
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <CardBox flex={1}>
                <Box color={(theme) => theme.palette.grey[400]} fontSize={12}>
                  OLD
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0}%
                </Box>
              </CardBox>
              <Box flex={1} textAlign={"center"}>
                <ChangeIcon />
              </Box>
              <CardBox flex={1}>
                <Box color={(theme) => theme.palette.grey[400]} fontSize={12}>
                  NEW
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%
                </Box>
              </CardBox>
            </Box>
          </Box>
        )}
        {data?.previousPledge !== null && data?.previousPledge !== data?.pledge && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={(theme) => theme.palette.grey[400]} fontWeight={"bold"}>
              Pledge
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <CardBox flex={1}>
                <Box color={(theme) => theme.palette.grey[400]} fontSize={12}>
                  OLD
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {formatADA(data?.previousPledge)} <ADAicon />
                </Box>
              </CardBox>
              <Box flex={1} textAlign={"center"}>
                <ChangeIcon />
              </Box>
              <CardBox flex={1}>
                <Box color={(theme) => theme.palette.grey[400]} fontSize={12}>
                  NEW
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              </CardBox>
            </Box>
          </Box>
        )}
      </Box>
    );
  };
  const tabs: {
    key: "poolCertificate" | "certificateUpdates";
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    children: React.ReactNode;
  }[] = [
    {
      key: "poolCertificate",
      icon: PoolCert,
      label: "Pool certificate",
      children: <>{renderPoolCert()}</>
    },
    {
      key: "certificateUpdates",
      icon: CertUpdate,
      label: "Certificate updates",
      children: <Box>{renderCertificateUpdates()}</Box>
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: "poolCertificate" | "certificateUpdates") => {
    setTabActive(tab);
  };
  return (
    <StyledModal {...props} title='Pool certificate'>
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.border.secondary}` }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: {
                background: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.main,
                height: "4px"
              }
            }}
          >
            {tabs?.map(({ key, icon: Icon, label }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <Box display={"flex"} alignItems='center'>
                    <Icon fill={key === tabActive ? "#438F68" : "#98A2B3"} />
                    <TitleTab pl={1} active={+(key === tabActive)}>
                      {label}
                    </TitleTab>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((item) => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0, paddingTop: 12 }}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
