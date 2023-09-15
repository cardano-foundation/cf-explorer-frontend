import { Box, Container, Tab, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import useFetch from "src/commons/hooks/useFetch";
import DelegationDetailInfo from "src/components/DelegationDetail/DelegationDetailInfo";
import DelegationDetailOverview from "src/components/DelegationDetail/DelegationDetailOverview";
import DelegationDetailChart from "src/components/DelegationDetail/DelegationDetailChart";
import {
  DelegationEpochList,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import useFetchList from "src/commons/hooks/useFetchList";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import { StakingDelegators, StakeKeyHistoryIcon } from "src/commons/resources";
import { setSpecialPath } from "src/stores/system";
import { routers } from "src/commons/routers";
import { getPageInfo } from "src/commons/utils/helper";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { TabsContainer, TimeDuration, TitleTab } from "./styles";

const TABS: TabPoolDetail[] = ["epochs", "delegators"];

const DelegationDetail: React.FC = () => {
  const { t } = useTranslation();
  const { poolId } = useParams<{ poolId: string }>();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const tab: TabPoolDetail = TABS.includes(query.tab as TabPoolDetail) ? (query.tab as TabPoolDetail) : "epochs";
  const pageInfo = getPageInfo(search);
  const tableRef = useRef(null);
  const theme = useTheme();
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      (tableRef.current as any).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, state);
  };

  const status = useFetch<ListTabResponseSPO>(API.SPO_LIFECYCLE.TABS(poolId));

  const { data, loading, initialized, error, lastUpdated } = useFetch<DelegationOverview>(
    `${API.DELEGATION.POOL_DETAIL_HEADER}/${poolId}`,
    undefined,
    false,
    blockNo
  );

  const fetchDataEpochs = useFetchList<DelegationEpoch>(
    API.DELEGATION.POOL_DETAIL("epochs"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "epochs" ? blockNo : undefined
  );

  const fetchDataDelegators = useFetchList<StakingDelegators>(
    API.DELEGATION.POOL_DETAIL("delegators"),
    { poolView: poolId, ...pageInfo },
    false,
    tab === "delegators" ? blockNo : undefined
  );

  useEffect(() => {
    document.title = `Delegation Pool ${poolId} | Cardano Blockchain Explorer`;
    window.scrollTo(0, 0);
  }, [poolId]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);
    if (status.data?.isDeRegistration) return setSpecialPath(routers.POOL_DEREGISTRATION);
    if (status.data?.isRegistration) return setSpecialPath(routers.POOL_CERTIFICATE);
    if (status.data) setSpecialPath(routers.DELEGATION_POOLS);
  }, [state, status]);

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
    }
  ];

  return (
    <Container>
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} lastUpdated={lastUpdated} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart poolId={poolId} />
      <Box sx={{ mt: 4, [theme.breakpoints.down("sm")]: { my: 2 } }}>
        <TabContext value={tab}>
          <TabsContainer>
            <TabList
              onChange={(e: any, value: any) => {
                setQuery({ tab: value, page: 1, size: 50 });
                scrollEffect();
              }}
              TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
            >
              {tabs.map(({ icon: Icon, key, label }) => (
                <Tab
                  key={key}
                  value={key}
                  style={{ padding: "12px 0px", marginRight: 40 }}
                  label={
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={key === tab ? theme.palette.primary.main : theme.palette.secondary.light} />
                      <TitleTab pl={1} active={+(key === tab)}>
                        {label}
                      </TitleTab>
                    </Box>
                  }
                />
              ))}
            </TabList>
          </TabsContainer>
          {tabs.map((item) => (
            <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
              <TimeDuration>
                <FormNowMessage time={(tab === "epochs" ? fetchDataEpochs : fetchDataDelegators).lastUpdated} />
              </TimeDuration>
              {item.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Container>
  );
};

export default DelegationDetail;
