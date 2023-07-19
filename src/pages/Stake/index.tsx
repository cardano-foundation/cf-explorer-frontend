import { useEffect, useRef, useState } from "react";
import { stringify } from "qs";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailViewStakeKey from "src/components/commons/DetailView/DetailViewStakeKey";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import SelectedIcon from "src/components/commons/SelectedIcon";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import { useScreen } from "src/commons/hooks/useScreen";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { StyledContainer, StyledLink, TimeDuration } from "./styles";

export enum POOL_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration"
}

const Stake = () => {
  const mainRef = useRef(document.querySelector("#main"));
  const [stake, setStake] = useState<string | null>(null);
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const [selected, setSelected] = useState<number | null>(null);
  const { poolType = POOL_TYPE.REGISTRATION } = useParams<{ poolType: POOL_TYPE }>();
  const { search } = useLocation();
  const history = useHistory();

  const pageInfo = getPageInfo(search);
  const { isMobile } = useScreen();

  const fetchData = useFetchList<IStakeKey>(
    `${API.STAKE.DETAIL}/${poolType}`,
    pageInfo,
    false,
    REFRESH_TIMES.STAKE_REGISTRATION
  );

  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  useEffect(() => {
    const title = poolType === POOL_TYPE.REGISTRATION ? "Registrations" : "Deregistrations";
    document.title = `${title} Stake Addresses | Cardano Explorer`;
  }, [poolType]);

  const openDetail = (_: any, r: IStakeKey, index: number) => {
    setOnDetailView(true);
    setStake(r.stakeKey);
    setSelected(index);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setStake(null);
    setSelected(null);
  };

  const columns: Column<IStakeKey>[] = [
    {
      title: "Tx Hash",
      key: "trxHash",
      minWidth: isMobile ? 245 : 80,
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Created At",
      key: "time",
      render: (r) => formatDateTimeLocal(r.txTime || "")
    },
    {
      title: "Block",
      key: "block",
      render: (r) => (
        <>
          <StyledLink to={details.block(r.block)}>{r.block}</StyledLink>
          <div style={{ display: "flex", marginTop: "6px" }}>
            <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>/{r.epochSlotNo}
          </div>
        </>
      )
    },
    {
      title: "Stake Address",
      key: "stakeAddress",
      render: (r, idx) => (
        <>
          <CustomTooltip title={r.stakeKey}>
            <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>
          </CustomTooltip>

          {selected === idx && <SelectedIcon />}
        </>
      )
    }
  ];

  if (!Object.values(POOL_TYPE).includes(poolType)) return <NoRecord />;

  return (
    <StyledContainer>
      <Box className="stake-list">
        <Card
          title={poolType === POOL_TYPE.REGISTRATION ? "Stake Address Registration" : "Stake Address Deregistration"}
        >
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
          <Table
            {...fetchData}
            columns={columns}
            total={{ title: "Total Token List", count: fetchData.total }}
            pagination={{
              ...pageInfo,
              total: fetchData.total,
              onChange: (page, size) => {
                mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                history.push({ search: stringify({ page, size, poolType }) });
              },
              handleCloseDetailView: handleClose
            }}
            onClickRow={openDetail}
            selected={selected}
            showTabView
          />
        </Card>
      </Box>
      {stake && onDetailView && <DetailViewStakeKey stakeId={stake} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Stake;
