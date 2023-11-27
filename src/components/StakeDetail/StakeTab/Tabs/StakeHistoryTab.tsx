import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

import {
  DeregistrationDarkIcon,
  DeregistrationLightIcon,
  RegistrationDarkIcon,
  RegistrationLightIcon
} from "src/commons/resources";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";

import { StyledLink } from "../styles";

const StakeHistoryTab = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const theme = useTheme();

  const fetchData = useFetchList<StakeHistory>(`${API.STAKE.DETAIL}/${stakeId}/stake-history`, pageInfo);

  const columns: Column<StakeHistory>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: isMobile ? "245px" : "120px",
      render: (r) => (
        <CustomTooltip title={r.txHash || ""}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.createdAt"),
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time || "")
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slotNo",
      minWidth: "100px"
    },
    {
      title: t("glossary.action"),
      key: "action",
      minWidth: "120px",
      render: (r) => {
        const label = r.action ? r.action.split(" ").join("") : "";
        return (
          <CustomTooltip title={label === "Registered" ? t("tab.Registration") : t("tab.Deregistration")}>
            {label === "Registered" ? (
              <img src={theme.isDark ? RegistrationDarkIcon : RegistrationLightIcon} alt="registered" />
            ) : (
              <img src={theme.isDark ? DeregistrationDarkIcon : DeregistrationLightIcon} alt="deregistered" />
            )}
          </CustomTooltip>
        );
      }
    }
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) }, history.location.state)
      }}
    />
  );
};

export default StakeHistoryTab;
