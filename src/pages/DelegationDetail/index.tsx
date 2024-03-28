import { Box, Container, useTheme } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import QueryString, { parse, stringify } from "qs";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import useFetchList from "src/commons/hooks/useFetchList";
import { StakeKeyHistoryIcon, StakingDelegators, TimelineIconComponent, VotesIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { VOTE_TYPE, POOL_STATUS, STATUS_VOTE } from "src/commons/utils/constants";
import { getPageInfo } from "src/commons/utils/helper";
import DelegationDetailChart from "src/components/DelegationDetail/DelegationDetailChart";
import DelegationDetailInfo from "src/components/DelegationDetail/DelegationDetailInfo";
import {
  DelegationCertificatesHistory,
  DelegationEpochList,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import DelegationDetailOverview from "src/components/DelegationDetail/DelegationDetailOverview";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import FormNowMessage from "src/components/commons/FormNowMessage";
import NoRecord from "src/components/commons/NoRecord";
import { setSpecialPath } from "src/stores/system";
import DelegationGovernanceVotes from "src/components/GovernanceVotes";

import { TitleTab } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: string | number;
  id?: string | number;
  anchorText?: string | number;
  actionType?: string;
  currentStatus?: string;
  vote?: string;
  openDateRange?: boolean;
  actionStatus?: string;
  voteType?: string;
  voterType?: string;
  isRepeatVote?: boolean;
  fromDate?: string;
  toDate?: string;
}

const TABS: TabPoolDetail[] = ["epochs", "delegators", "certificatesHistory", "governanceVotes"];

const DelegationDetail: React.FC = () => {
  const { t } = useTranslation();
  const { poolId } = useParams<{ poolId: string }>();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const tab: TabPoolDetail | "" = TABS.includes(query.tab as TabPoolDetail) ? (query.tab as TabPoolDetail) : "";
  const pageInfo = getPageInfo(search);
  const tableRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  useEffect(() => {
    if (Object.keys(query).length === 0) {
      setQuery({ tab: "epochs", page: 1, size: 50 });
    }
  }, [Object.keys(query).length]);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, state);
  };

  const status = useFetch<ListTabResponseSPO>(API.SPO_LIFECYCLE.TABS(poolId));

  const { data, loading, initialized, error, lastUpdated } = useFetch<DelegationOverview>(
    `${API.DELEGATION.POOL_DETAIL_HEADER}/${poolId}`,
    undefined,
    false,
    blockKey
  );

  const fetchDataEpochs = useFetchList<DelegationEpoch>(
    API.DELEGATION.POOL_DETAIL("epochs"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "epochs" ? blockKey : undefined
  );

  const fetchDataDelegators = useFetchList<StakingDelegators>(
    API.DELEGATION.POOL_DETAIL("delegators"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "delegators" ? blockKey : undefined
  );

  const fetchDataCertificatesHistory = useFetchList<CertificateHistory>(
    `${API.POOL_CERTIFICATES_HISTORY}/${poolId}`,
    { ...pageInfo },
    false,
    tab === "certificatesHistory" ? blockKey : undefined
  );

  useEffect(() => {
    document.title = `Delegation Pool ${poolId} | Cardano Blockchain Explorer`;
    window.scrollTo(0, 0);
  }, [poolId]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);
    if (status.data?.isDeRegistration) {
      if (data?.poolStatus === POOL_STATUS.RETIRED) {
        return setSpecialPath(routers.POOL_DEREGISTRATION);
      } else {
        return setSpecialPath(routers.POOL_CERTIFICATE);
      }
    }
    if (status.data?.isRegistration) return setSpecialPath(routers.POOL_CERTIFICATE);

    if (status.data) setSpecialPath(routers.DELEGATION_POOLS);
  }, [state, status, data?.poolStatus]);

  if ((initialized && !data) || error) return <NoRecord />;

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabPoolDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: StakeKeyHistoryIcon,
      label: t("epoch"),
      key: "epochs",
      component: (
        <div ref={tableRef}>
          <DelegationEpochList {...fetchDataEpochs} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: StakingDelegators,
      label: t("stakingDelegators"),
      key: "delegators",
      component: (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList {...fetchDataDelegators} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: TimelineIconComponent,
      label: <Box data-testid="certificatesHistory">{t("certificatesHistory")}</Box>,
      key: "certificatesHistory",
      component: (
        <div ref={tableRef}>
          <DelegationCertificatesHistory {...fetchDataCertificatesHistory} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: VotesIcon,
      label: t("governanceVotes"),
      key: "governanceVotes",
      component: (
        <div ref={tableRef}>
          <DelegationGovernanceVotes hash={poolId || ""} type={VOTE_TYPE.STAKING_POOL_KEY_HASH} />
        </div>
      )
    }
  ];

  const indexExpand = tabs.findIndex((item) => item.key === tab);
  const needBorderRadius = (currentKey: string) => {
    if (!tab) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tableRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 150);
        // Remove the event listener after the scroll
        tableRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };

    // Attach the transitionend event listener to wait for the expansion animation
    tableRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    setQuery({
      tab: newExpanded ? panel : "",
      page: 0,
      size: panel === "governanceVotes" ? 6 : 50,
      actionType: STATUS_VOTE.ALL,
      actionStatus: STATUS_VOTE.ANY,
      voteType: STATUS_VOTE.ANY,
      voterType: VOTE_TYPE.STAKING_POOL_KEY_HASH,
      isRepeatVote: false
    });
  };

  const getLastUpdatedTime = () => {
    switch (tab) {
      case "epochs":
        return fetchDataEpochs.lastUpdated;
      case "delegators":
        return fetchDataDelegators.lastUpdated;
      case "certificatesHistory":
        return fetchDataCertificatesHistory.lastUpdated;
      default:
        return null;
    }
  };

  return (
    <Container>
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} lastUpdated={lastUpdated} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart poolId={poolId} />
      <Box ref={tableRef} mt={"30px"}>
        {tabs.map(({ key, icon: Icon, label, component }, index) => (
          <StyledAccordion
            key={key}
            expanded={tab === key}
            customBorderRadius={needBorderRadius(key)}
            isDisplayBorderTop={tab !== key && key !== tabs[0].key && index !== indexExpand + 1}
            onChange={handleChangeTab(key)}
          >
            <AccordionSummary
              expandIcon={
                <IoIosArrowDown
                  style={{
                    width: "21px",
                    height: "21px"
                  }}
                  color={key === tab ? theme.palette.primary.main : theme.palette.secondary.light}
                />
              }
              sx={{
                paddingX: theme.spacing(3),
                paddingY: theme.spacing(1)
              }}
            >
              <Icon fill={key === tab ? theme.palette.primary.main : theme.palette.secondary.light} />
              <TitleTab pl={1} active={+(key === tab)}>
                {label}
              </TitleTab>
            </AccordionSummary>
            <AccordionDetails>
              {tab != "governanceVotes" && <FormNowMessage time={getLastUpdatedTime()} />}
              {component}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>
    </Container>
  );
};

export default DelegationDetail;
