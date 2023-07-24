import { Box, Tab, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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

import { StyledContainer, TabsContainer, TitleTab } from "./styles";

const DelegationDetail: React.FC = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const tab = (query.tab as TabPoolDetail) || "epochs";
  const tableRef = useRef(null);
  const theme = useTheme();

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      (tableRef.current as any).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) });
  };

  const status = useFetch<ListTabResponseSPO>(API.SPO_LIFECYCLE.TABS(poolId));

  const { data, loading, initialized, error } = useFetch<DelegationOverview>(
    `${API.DELEGATION.POOL_DETAIL_HEADER}/${poolId}`
  );

  const {
    data: dataTable,
    loading: loadingTable,
    total,
    initialized: initalTable
  } = useFetchList<DelegationEpoch | StakingDelegators>(
    `${API.DELEGATION.POOL_DETAIL}-${tab}?poolView=${poolId}&page=${query.page ? +query.page - 1 : 0}&size=${
      query.size || 50
    }`
  );

  useEffect(() => {
    document.title = `Delegation Pool ${poolId} | Iris - Cardano Blockchain Explorer`;
    window.scrollTo(0, 0);
  }, [poolId]);

  useEffect(() => {
    if (state?.fromPath) return setSpecialPath(state.fromPath);
    if (status.data?.isDeRegistration) return setSpecialPath(routers.POOL_DEREGISTRATION);
    if (status.data?.isRegistration) return setSpecialPath(routers.POOL_CERTIFICATE);
    setSpecialPath(routers.DELEGATION_POOLS);
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
      label: "Epoch",
      key: "epochs",
      component: (
        <div ref={tableRef}>
          <DelegationEpochList
            data={dataTable as DelegationEpoch[]}
            loading={loadingTable}
            initialized={initalTable}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      )
    },
    {
      icon: StakingDelegators,
      label: "Staking Delegators",
      key: "delegators",
      component: (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList
            data={dataTable as StakingDelegators[]}
            loading={loadingTable}
            initialized={initalTable}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      )
    }
  ];

  return (
    <StyledContainer>
      <DelegationDetailInfo data={data} loading={loading} poolId={poolId} />
      <DelegationDetailOverview data={data} loading={loading} />
      <DelegationDetailChart poolId={poolId} />
      <Box sx={{ mt: 4, [theme.breakpoints.down("sm")]: { my: 2 } }}>
        <TabContext value={tab}>
          <TabsContainer>
            <TabList
              onChange={(e, value) => {
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
                      <Icon fill={key === tab ? theme.palette.primary.main : theme.palette.secondary[600]} />
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
              {item.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </StyledContainer>
  );
};

export default DelegationDetail;
