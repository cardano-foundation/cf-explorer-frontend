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
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import PoolCertificateIcon from "../../../../commons/resources/icons/Staking/PoolCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { API } from "../../../../commons/utils/api";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import { WrapFilterDescription } from "../../DelegatorLifecycle/Registration/RecentRegistrations/styles";
import { GridBox } from "../../DelegatorLifecycle/Withdraw/RecentWithdraws/styles";
import OverviewStaking from "../../../commons/OverviewStaking";
import PopoverStyled from "../../../commons/PopoverStyled";
import { useParams } from "react-router";
import useFetch from "../../../../commons/hooks/useFetch";
import { details } from "../../../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { ButtonSPO, PoolName, PoolNamePopup } from "../Registration/styles";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import moment from "moment";
import PopupStaking from "../../../commons/PopupStaking";
import StyledModal from "../../../commons/StyledModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { TitleTab } from "../../../TransactionDetail/TransactionMetadata/styles";

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
  // To do: chonj default là list sau đó clickdetail nhấn sang timelne. Đổi trong tương lai
  const [selected, setSelected] = useState<PoolUpdateItem | null>(null);
  return (
    <Box>
      <Box>{selected === null && <PoollUpdatesList setSelected={setSelected} />}</Box>
      <Box>
        {!!selected && (
          <PoollUpdatesTimeline
            handleResize={handleResize}
            selected={selected}
            setSelected={setSelected}
            containerPosition={containerPosition}
          />
        )}
      </Box>
    </Box>
  );
};
export default PoollUpdates;

const PoollUpdatesList = ({ setSelected }: { setSelected: (pool: PoolUpdateItem | null) => void }) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [params, setParams] = useState<FilterParams>();
  const { data, total } = useFetchList<PoolUpdateItem>(API.SPO_LIFECYCLE.POOL_UPDATE(poolId), {
    page: 0,
    size: 1000,
    ...params,
  });
  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Withdrawals</span>
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
            <OverviewStaking
              item={item}
              onClick={pool => setSelected(pool)}
              hash={item.txHash}
              amount={item.fee}
              time={item.time}
            />
          );
        })}
      </GridBox>
    </Box>
  );
};

const PoollUpdatesTimeline = ({
  containerPosition,
  setSelected,
  selected,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setSelected: (pool: PoolUpdateItem | null) => void;
  handleResize: () => void;
  selected: PoolUpdateItem;
}) => {
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

  if (loading) {
    return (
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
          <IconButtonBack onClick={() => setSelected(null)}>
            <BackIcon />
          </IconButtonBack>
          <Box display={"flex"}>
            <Info>
              <AddressIcon fill="#438F68" />
              <Box component={Skeleton} ml={1} variant="rectangular" width={145} height={18} />
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
        <IconButtonBack onClick={() => setSelected(null)}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68" />
            <InfoText>{getShortHash(data?.txHash || "")}</InfoText>
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
            <PopoverStyled
              render={({ handleClick }) => (
                <ButtonSPO
                  ref={SPOInfoRef}
                  component={IconButton}
                  left={"33%"}
                  onClick={() => SPOInfoRef?.current && handleClick(SPOInfoRef.current)}
                >
                  <SPOInfo />
                </ButtonSPO>
              )}
              content={
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
            />
            <PopoverStyled
              render={({ handleClick }) => (
                <ButtonSPO
                  ref={SPOKeyRef}
                  component={IconButton}
                  left={"52%"}
                  onClick={() => SPOKeyRef?.current && handleClick(SPOKeyRef.current)}
                >
                  <SPOKey fill="#438F68" />
                </ButtonSPO>
              )}
              content={
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
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ref={feeRef}>
                  <Box>
                    <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                      {formatADA(data?.fee || 0)}
                    </Box>
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
            <img style={{ marginLeft: "5px" }} src={PoolCertificateIcon} alt="RegistrationCertificateIcon" />
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
    <Grid container spacing={1}>
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
              <Box>
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
              <Box>
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
              <Box>
                <Box display={"inline"} fontSize="0.875rem" color={({ palette }) => palette.blue[800]}>
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
                {(data.stakeKeys || []).map(item => (
                  <>
                    <Box key={item}>
                      <Link to={details.stake(item || "")}>{getShortWallet(item)}</Link>{" "}
                      <CopyButton text={item || ""} />
                    </Box>
                  </>
                ))}
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
              <Box>
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
              <Box display={"inline"} fontSize="0.875rem">
                {data?.margin}%
                {data?.previousMargin && (
                  <Box fontSize={12} color={theme => theme.palette.grey[400]}>
                    Previous: {data.previousMargin} %{" "}
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {data?.previousMargin && (
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
                <Box display={"inline"} fontSize="0.875rem">
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              )}
              {data?.previousPledge && (
                <Box fontSize={12} color={theme => theme.palette.grey[400]}>
                  Previous: {formatADA(data.previousPledge)} <ADAicon />
                </Box>
              )}
            </Box>
            {data?.previousPledge && (
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
              <Box display={"inline"} fontSize="0.875rem">
                {formatADA(data?.cost)} <ADAicon />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderCertificateUpdates = () => {
    return (
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {data?.previousMargin && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={theme => theme.palette.grey[400]} fontWeight={"bold"}>
              Margin
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <Box flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  OLD
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.previousMargin} %
                </Box>
              </Box>
              <Box flex={1} textAlign={"center"}>
                <ChangeIcon />
              </Box>
              <Box flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  NEW
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {data?.margin} %
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {data?.previousPledge && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box color={theme => theme.palette.grey[400]} fontWeight={"bold"}>
              Pledge
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <Box flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  OLD
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {formatADA(data?.previousPledge)} <ADAicon />
                </Box>
              </Box>
              <Box flex={1} textAlign={"center"}>
                <ChangeIcon />
              </Box>
              <Box flex={1}>
                <Box color={theme => theme.palette.grey[400]} fontSize={12}>
                  NEW
                </Box>
                <Box fontWeight={500} fontSize={14}>
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              </Box>
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
