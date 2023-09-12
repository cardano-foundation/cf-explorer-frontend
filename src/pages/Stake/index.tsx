import { useEffect, useRef, useState } from "react";
import { stringify } from "qs";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash, getShortWallet } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailViewStakeKey from "src/components/commons/DetailView/DetailViewStakeKey";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import { API } from "src/commons/utils/api";
import SelectedIcon from "src/components/commons/SelectedIcon";
import { useScreen } from "src/commons/hooks/useScreen";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { StyledContainer, StyledLink, TimeDuration } from "./styles";

export enum STAKE_ADDRESS_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration"
}

interface Props {
  stakeAddressType: STAKE_ADDRESS_TYPE;
}

const Stake: React.FC<Props> = ({ stakeAddressType }) => {
  const mainRef = useRef(document.querySelector("#main"));
  const { t } = useTranslation();
  const [stake, setStake] = useState<string | null>(null);
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const [selected, setSelected] = useState<number | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const pageInfo = getPageInfo(search);
  const { isMobile } = useScreen();

  const fetchData = useFetchList<IStakeKey>(`${API.STAKE.DETAIL}/${stakeAddressType}`, pageInfo, false, blockNo);

  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  useEffect(() => {
    const title = stakeAddressType === STAKE_ADDRESS_TYPE.REGISTRATION ? "Registrations" : "Deregistrations";
    document.title = `${title} Stake Addresses | Cardano Blockchain Explorer`;
  }, [stakeAddressType]);

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

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const columns: Column<IStakeKey>[] = [
    {
      title: t("glossary.txHash"),
      key: "trxHash",
      minWidth: isMobile ? 245 : 80,
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.createdAt"),
      key: "time",
      render: (r) => formatDateTimeLocal(r.txTime || "")
    },
    {
      title: t("glossary.block"),
      key: "block",
      render: (r) => (
        <>
          <StyledLink to={details.block(r.block)}>{r.block}</StyledLink>
          <div style={{ display: "flex", marginTop: "6px" }}>
            <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>/
            <Box component={"span"} color={({ palette }) => palette.secondary.light}>
              {r.epochSlotNo}
            </Box>
          </div>
        </>
      )
    },
    {
      title: t("glossary.stakeAddress"),
      key: "stakeAddress",
      render: (r, idx) => (
        <>
          <CustomTooltip title={r.stakeKey}>
            <StyledLink to={{ pathname: details.stake(r.stakeKey), state: { fromPath } }}>
              {getShortWallet(r.stakeKey)}
            </StyledLink>
          </CustomTooltip>

          {selected === idx && <SelectedIcon />}
        </>
      )
    }
  ];

  return (
    <StyledContainer>
      <Box className="stake-list">
        <Card
          title={
            stakeAddressType === STAKE_ADDRESS_TYPE.REGISTRATION
              ? t("head.page.stakeAddressRegistration")
              : t("head.page.stakeAddressDeregistration")
          }
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
                history.push({ search: stringify({ page, size, stakeAddressType }) });
              },
              handleCloseDetailView: handleClose
            }}
            onClickRow={openDetail}
            selected={selected}
            showTabView
            tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
          />
        </Card>
      </Box>
      {stake && onDetailView && <DetailViewStakeKey stakeId={stake} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Stake;
