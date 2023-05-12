import { alpha, Box, Grid, Skeleton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as LinkDom } from "react-router-dom";

import {
  SPOStalking,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  SPOKey,
  SPOInfo,
  PoolCert,
  CertUpdate,
  ChangeIcon,
  EmptyIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import PoolCertificateIcon from "../../../../commons/resources/icons/Staking/PoolCertificateIcon.svg";

import Line from "../../../Line";
import { CardBox, FeeBox, FeeBoxText, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import { WrapFilterDescription } from "../../DelegatorLifecycle/Registration/RecentRegistrations/styles";
import { GridBox } from "../../DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import OverviewStaking from "../../../commons/OverviewStaking";
import PopoverStyled from "../../../commons/PopoverStyled";
import { useHistory, useParams } from "react-router";
import useFetch from "../../../../commons/hooks/useFetch";
import { details } from "../../../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { ButtonSPO, PoolName, PoolNamePopup, StyledCopyButton } from "../Registration/styles";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import PopupStaking from "../../../commons/PopupStaking";
import StyledModal from "../../../commons/StyledModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { TitleTab } from "../../../TransactionDetail/TransactionMetadata/styles";
import { DescriptionText } from "../../DelegatorLifecycle/styles";
import { StyledLink } from "../styles";
import { useUpdateEffect } from "react-use";

const PoollUpdates = ({
  containerPosition,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<PoolUpdateItem | null>(null);

  const handleSelect = (pool: PoolUpdateItem | null) => {
    setSelected(pool);
  };
  return (
    <Box>
      <Box>
        <PoollUpdatesList onSelect={handleSelect} />
      </Box>
      <Box>
        {!!selected && (
          <PoollUpdatesTimeline handleResize={handleResize} selected={selected} containerPosition={containerPosition} />
        )}
      </Box>
    </Box>
  );
};
export default PoollUpdates;

const PoollUpdatesList = ({ onSelect }: { onSelect: (pool: PoolUpdateItem | null) => void }) => {
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const [params, setParams] = useState<FilterParams>();
  const { data, total } = useFetchList<PoolUpdateItem>(API.SPO_LIFECYCLE.POOL_UPDATE(poolId), {
    page: 0,
    size: 1000,
    ...params,
  });
  useEffect(() => {
    const currentItem = data.find(item => item.txHash === txHash);
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
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <DescriptionText>Recent Updates</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>Showing {total} results</WrapFilterDescription>
          <StackingFilter
            filterValue={params}
            onFilterValueChange={params => setParams(pre => ({ ...pre, ...params }))}
          />
        </Box>
      </Box>
      <GridBox>
        {data.map(item => {
          return (
            <OverviewStaking item={item} onClick={handleSelect} hash={item.txHash} amount={item.fee} time={item.time} />
          );
        })}
      </GridBox>
    </Box>
  );
};

const PoollUpdatesTimeline = ({
  containerPosition,
  selected,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: PoolUpdateItem;
}) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const history = useHistory();
  const { data, loading } = useFetch<PoolUpdateDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.POOL_UPDATE_DETAIL(selected.poolUpdateId) : ""
  );
  const [openModal, setOpenModal] = useState(false);
  const adaHolderRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [loading]);

  const handleBack = () => {
    history.push(details.spo(poolId, "timeline", "pool-updates"));
  };

  if (loading) {
    return (
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
          <Box display={"flex"}>
            <Info>
              <AddressIcon fill="#438F68" />
              <Box component={Skeleton} ml={1} variant="rectangular" width={145} height={18} />
              <StyledCopyButton />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant="rectangular" width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant="rectangular" width={130} height={18} />
            </Info>
          </Box>
        </Box>
        <Box component={Skeleton} width={"100%"} height={400} variant="rectangular" borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68" />
            <CustomTooltip title={data?.txHash}>
              <InfoText>
                <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(data?.txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={data?.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(data?.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(data?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={245} position={"relative"}>
            <SPOStalking />
            <CustomTooltip title={data?.poolName}>
              <PoolName> {data?.poolName}</PoolName>
            </CustomTooltip>
            <CustomTooltip
              wOpacity={false}
              componentsProps={{
                transition: {
                  style: {
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                    padding: "10px",
                  },
                },
                arrow: {
                  style: {
                    color: "white",
                  },
                },
              }}
              title={
                <Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
                      Pool ID:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>
                      {getShortHash(data?.poolView || "")}
                    </PoolNamePopup>
                    <CopyButton text={data?.poolView} />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
                      Pool name:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>{data?.poolName}</PoolNamePopup>
                  </Box>
                </Box>
              }
            >
              <ButtonSPO ref={SPOInfoRef} component={IconButton} left={"33%"}>
                <SPOInfo />
              </ButtonSPO>
            </CustomTooltip>
            <Link to={details.stake(data?.stakeKeys[0] || "")}>
              <CustomTooltip
                wOpacity={false}
                componentsProps={{
                  transition: {
                    style: {
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                      padding: "10px",
                    },
                  },
                  arrow: {
                    style: {
                      color: "white",
                    },
                  },
                }}
                title={
                  <Box display={"flex"} alignItems={"center"}>
                    {data?.stakeKeys && data.stakeKeys.length > 0 && (
                      <>
                        <SPOKey fill="#108AEF" />
                        <PoolNamePopup to={details.stake(data?.stakeKeys[0] || "")}>
                          {getShortWallet(data?.stakeKeys[0] || "")}
                        </PoolNamePopup>
                        <CopyButton text={data?.stakeKeys[0]} />
                      </>
                    )}
                  </Box>
                }
              >
                <ButtonSPO ref={SPOKeyRef} component={IconButton} left={"52%"}>
                  <SPOKey fill="#438F68" />
                </ButtonSPO>
              </CustomTooltip>
            </Link>
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ref={feeRef}>
                  <Box>
                    <FeeBoxText component={"span"} mr={1}>
                      {formatADA(data?.fee || 0)}
                    </FeeBoxText>
                    <ADAicon fontSize="18px" />
                  </Box>
                  <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </FeeBox>
              )}
              content={<PopupStaking hash={data?.txHash || ""} />}
            />
          </Box>
          <Box ref={cadarnoSystemRef} width={190} height={215}>
            {/* <CadarnoSystemIcon /> */}
            <img src={cadarnoSystem} alt="carrdano" />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1",
            }}
          >
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={feeRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />

            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient="horizontal"
              pointFrom="border"
              pointTo="center"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={registrationRef}
              pointTo="border"
              pointFrom="center"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={registrationRef}
              toRef={fake2Ref}
              orient="vertical"
              pointFrom="border"
              pointTo="center"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={cadarnoSystemRef}
              orient="horizontal"
              pointFrom="center"
              pointTo="border"
            />
          </svg>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} position={"relative"} top={"-60px"}>
          <Box ref={fake1Ref} width={"190px"} height={220}></Box>
          <Box
            ref={registrationRef}
            width={220}
            height={220}
            component={IconButton}
            p={0}
            onClick={() => setOpenModal(true)}
          >
            <Box
              component={"img"}
              style={{ marginLeft: "5px" }}
              src={PoolCertificateIcon}
              alt="RegistrationCertificateIcon"
            />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
      <PoolUpdateModal data={data} handleCloseModal={() => setOpenModal(false)} open={openModal} />
    </Box>
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
  const [tabActive, setTabActive] = useState("poolCertificate");
  const renderPoolCert = () => (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Transaction ID
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={600}>
                <Link to={details.transaction(data?.txHash || "")}>{getShortHash(data?.txHash || "")}</Link>{" "}
                <CopyButton text={data?.txHash || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={600}>
                <Link to={details.delegation(data?.poolView || "")}>{getShortHash(data?.poolView || "")}</Link>{" "}
                <CopyButton text={data?.poolView || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              VRF Key
            </Box>
            {data && (
              <Box pt={"7px"}>
                <Box display={"inline"} fontWeight={600} fontSize="0.875rem" color={({ palette }) => palette.blue[800]}>
                  {getShortHash(data?.vrfKey || "")}
                </Box>{" "}
                <CopyButton text={data?.vrfKey || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Owners
            </Box>
            {data && (
              <>
                {data.stakeKeys && data.stakeKeys.length && (
                  <>
                    <Box key={data.stakeKeys[0]} pt={"7px"} fontWeight={600} display={"flex"}>
                      <Box>
                        <Link to={details.stake(data.stakeKeys[0] || "")}>{getShortWallet(data.stakeKeys[0])}</Link>{" "}
                        <CopyButton text={data.stakeKeys[0] || ""} />
                      </Box>
                      {data.stakeKeys.length > 1 ? <Box marginLeft={2}>...</Box> : null}
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          p={3}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Reward Account
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={600}>
                <Link to={details.stake(data?.rewardAccount || "")}>{getShortWallet(data?.rewardAccount || "")}</Link>{" "}
                <CopyButton text={data?.rewardAccount || ""} />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          minHeight={50}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Margin
            </Box>
            {data && (
              <Box fontSize="0.875rem" pt={"7px"} fontWeight={600}>
                {data?.margin}%
                {data?.previousMargin !== null && (
                  <Box fontSize={12} pt={"7px"} color={theme => theme.palette.grey[400]}>
                    Previous: {data?.previousMargin} %{" "}
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {data?.previousMargin !== null && (
            <Box>
              <ChangeIcon />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Pledge
              </Box>
              {data && (
                <Box fontSize="0.875rem" pt={"7px"} fontWeight={600}>
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              )}
              {data?.previousPledge !== null && (
                <Box fontSize={12} pt={"7px"} color={theme => theme.palette.grey[400]}>
                  Previous: {formatADA(data?.previousPledge || 0)} <ADAicon />
                </Box>
              )}
            </Box>
            {data?.previousPledge !== null && (
              <Box>
                <ChangeIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          minHeight={50}
          bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}
          p={3}
          display={"flex"}
          alignItems={"center"}
        >
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Cost
            </Box>
            {data && (
              <Box pt={"7px"} fontWeight={600} fontSize="0.875rem">
                {formatADA(data?.cost)} <ADAicon />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderCertificateUpdates = () => {
    if (data?.previousMargin === null && data?.previousPledge === null) {
      return (
        <Box textAlign={"center"}>
          <Box component={"img"} height={215} src={EmptyIcon} alt="no data" />
        </Box>
      );
    }
    return (
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {data?.previousMargin !== null && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={theme => theme.palette.grey[400]} fontWeight={"bold"}>
              Margin
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <CardBox flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  OLD
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.previousMargin} %
                </Box>
              </CardBox>
              <Box flex={1} textAlign={"center"}>
                <ChangeIcon />
              </Box>
              <CardBox flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  NEW
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.margin} %
                </Box>
              </CardBox>
            </Box>
          </Box>
        )}
        {data?.previousPledge !== null && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={theme => theme.palette.grey[400]} fontWeight={"bold"}>
              Pledge
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <CardBox flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
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
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
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
      children: <>{renderPoolCert()}</>,
    },
    {
      key: "certificateUpdates",
      icon: CertUpdate,
      label: "Certificate updates",
      children: <Box>{renderCertificateUpdates()}</Box>,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, tab: "poolCertificate" | "certificateUpdates") => {
    setTabActive(tab);
  };
  return (
    <StyledModal {...props} title="Pool certificate">
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: theme => `1px solid ${theme.palette.border.secondary}` }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { background: theme => theme.palette.primary.main, color: theme => theme.palette.primary.main },
            }}
          >
            {tabs?.map(({ key, icon: Icon, label }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <Box display={"flex"} alignItems="center">
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
        {tabs.map(item => (
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
  color: `${theme.palette.blue[800]} !important`,
}));
