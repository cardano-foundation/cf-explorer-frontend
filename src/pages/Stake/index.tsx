import { useEffect, useRef, useState } from "react";
import { stringify } from "qs";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DetailViewStakeKey from "src/components/commons/DetailView/DetailViewStakeKey";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import { API } from "src/commons/utils/api";
import SelectedIcon from "src/components/commons/SelectedIcon";
import { useScreen } from "src/commons/hooks/useScreen";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

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
  const [selected, setSelected] = useState<string | null>(null);
  const [stakeKey, setStakeKey] = useState<string | null>(null);
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { search } = useLocation();
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;

  const pageInfo = getPageInfo(search);
  const { isMobile } = useScreen();

  const fetchData = useFetchList<IStakeKey>(`${API.STAKE.DETAIL}/${stakeAddressType}`, pageInfo, false, blockKey);

  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  useEffect(() => {
    const title = stakeAddressType === STAKE_ADDRESS_TYPE.REGISTRATION ? "Registrations" : "Deregistrations";
    document.title = `${title} Stake Addresses | Cardano Blockchain Explorer`;
  }, [stakeAddressType]);

  const openDetail = (_: React.MouseEvent<Element, MouseEvent>, r: IStakeKey) => {
    setOnDetailView(true);
    setSelected(r.stakeKey);
    setStakeKey(r.stakeKey);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
    setStakeKey(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const columns: Column<IStakeKey>[] = [
    {
      title: <div data-testid="stake.txHashTitle">{t("glossary.txHash")}</div>,
      key: "txHash",
      minWidth: isMobile ? 245 : 80,
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink data-testid="stake.txHashValue" to={details.transaction(r.txHash)}>
            {getShortHash(r.txHash)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <div data-testid="stake.createdAtTitle">{t("glossary.createdAt")}</div>,
      key: "time",
      render: (r) => (
        <DatetimeTypeTooltip data-testid="stake.createdAtValue">
          {formatDateTimeLocal(r.txTime || "")}
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <div data-testid="stake.blockTitle">{t("glossary.block")}</div>,
      key: "block",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="stake.blockValue" to={details.block(r.block)}>
          {r.block}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="stake.epochTitle">{t("glossary.epoch")}</div>,
      key: "epoch",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="stake.epochValue" to={details.epoch(r.epoch)}>
          {r.epoch}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="stake.epochSlotNoTitle">{t("glossary.slot")}</div>,
      key: "epochSlotNo",
      minWidth: "50px",
      render: (r) => <div data-testid="stake.epochSlotNoValue">{r.epochSlotNo}</div>
    },
    {
      title: <div data-testid="stake.slotNoTitle">{t("glossary.absoluteSlot")}</div>,
      key: "slotNo",
      minWidth: "100px",
      render: (r) => <div data-testid="stake.slotNoValue">{r.epochSlotNo}</div>
    },
    {
      title: <div data-testid="stake.stakeAddressTitle">{t("glossary.stakeAddress")}</div>,
      key: "stakeAddress",
      render: (r) => (
        <>
          <CustomTooltip title={r.stakeKey}>
            <StyledLink
              data-testid="stake.stakeAddressValue"
              to={{ pathname: details.stake(r.stakeKey), state: { fromPath } }}
            >
              {getShortHash(r.stakeKey)}
            </StyledLink>
          </CustomTooltip>

          {selected === r.stakeKey && <SelectedIcon />}
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
            data-testid="stake.table"
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
            rowKey="stakeKey"
            selected={selected}
            showTabView
            tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
          />
        </Card>
      </Box>
      <DetailViewStakeKey stakeId={stakeKey || ""} open={onDetailView} handleClose={handleClose} />
    </StyledContainer>
  );
};

export default Stake;
