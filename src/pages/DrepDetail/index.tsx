import { useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccordionDetails, AccordionSummary, Box, useTheme } from "@mui/material";
import QueryString, { parse, stringify } from "qs";
import { t } from "i18next";

import DetailHeader from "src/components/commons/DetailHeader";
import {
  DescriptonDrepIcon,
  CreateDrepIcon,
  ActiveVoteIcon,
  LiveStakeDrepIcon,
  DelegatorsDrepIcon,
  LifetimeVoteDrepIcon,
  StakingDelegators,
  TimelineIconComponent,
  governanceVotesIcon
} from "src/commons/resources";
import {
  DelegationCertificatesHistory,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import FormNowMessage from "src/components/commons/FormNowMessage";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { getPageInfo } from "src/commons/utils/helper";

import { StyledContainer, TimeDuration, TitleCard, TitleTab, ValueCard } from "./styles";

const DrepDetail = () => {
  const listOverview = [
    {
      icon: DescriptonDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.des")}
        </TitleCard>
      ),
      value: <ValueCard>Whatever the anchor text string is for this action</ValueCard>
    },
    {
      icon: CreateDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("createdAt")}
        </TitleCard>
      ),
      value: <ValueCard>08/25/2024 13:39:41</ValueCard>
    },
    {
      icon: ActiveVoteIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.activeVoteStake")}
        </TitleCard>
      ),
      value: <ValueCard>893,565.321 ADA</ValueCard>
    },
    {
      icon: LiveStakeDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.liveStake")}
        </TitleCard>
      ),
      value: <ValueCard>893,565.321 ADA</ValueCard>
    },
    {
      icon: DelegatorsDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("glossary.delegators")}
        </TitleCard>
      ),
      value: <ValueCard>50</ValueCard>
    },
    {
      icon: CreateDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.votingParticipation")}
        </TitleCard>
      ),
      value: <ValueCard>70%</ValueCard>
    },
    {
      icon: LifetimeVoteDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.lifetimeVotes")}
        </TitleCard>
      ),
      value: `1`
    }
  ];

  return (
    <StyledContainer>
      <DetailHeader
        type="DREP"
        title="Drep ID"
        loading={false}
        listItem={listOverview}
        bookmarkData={"1"}
        subTitle="Type: Pre-Defined Drep"
        stakeKeyStatus="ACTIVE"
      />
      <DrepAccordion />
    </StyledContainer>
  );
};

export default DrepDetail;

const TABS: TabDrepDetail[] = ["delegators", "certificatesHistory", "governanceVotes"];

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
}
const DrepAccordion = () => {
  const theme = useTheme();
  const { drepId } = useParams<{ drepId: string }>();
  const history = useHistory();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const pageInfo = getPageInfo(search);
  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const query = parse(search.split("?")[1]);
  const tab: TabDrepDetail = TABS.includes(query.tab as TabDrepDetail) ? (query.tab as TabDrepDetail) : "";

  useEffect(() => {
    if (Object.keys(query).length === 0) {
      setQuery({ tab: "governanceVotes", page: 1, size: 50 });
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

  const fetchDataCertificatesHistory = useFetchList<CertificateHistory>(
    API.DREP_CERTIFICATES_HISTORY.replace(":drepId", drepId),
    { ...pageInfo },
    false,
    tab === "certificatesHistory" ? blockKey : undefined
  );

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabDrepDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: governanceVotesIcon,
      label: t("drep.governanceVotes"),
      key: "governanceVotes",
      component: <div ref={tableRef}>Governance Votes</div>
    },
    {
      icon: StakingDelegators,
      label: t("stakingDelegators"),
      key: "delegators",
      component: (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList
            data={[]}
            loading={false}
            total={0}
            initialized={false}
            scrollEffect={scrollEffect}
          />
        </div>
      )
    },
    {
      icon: TimelineIconComponent,
      label: <Box data-testid="certificatesHistory">{t("drep.certificatesHistory")}</Box>,
      key: "certificatesHistory",
      component: (
        <div ref={tableRef}>
          <DelegationCertificatesHistory {...fetchDataCertificatesHistory} scrollEffect={scrollEffect} />
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

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, state);
  };

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tableRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
        // Remove the event listener after the scroll
        tableRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };

    // Attach the transitionend event listener to wait for the expansion animation
    tableRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    setQuery({ tab: newExpanded ? panel : "", page: 1, size: 50 });
  };

  return (
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
            <TimeDuration>
              <FormNowMessage time={fetchDataCertificatesHistory.lastUpdated} />
            </TimeDuration>
            {component}
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};
