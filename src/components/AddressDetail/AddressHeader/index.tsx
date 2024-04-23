import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Grid, Box, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import { exchangeADAToUSD, formatADAFull, getShortHash } from "src/commons/utils/helper";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";
import Card from "src/components/commons/Card";
import useFetch from "src/commons/hooks/useFetch";
import CardAddress from "src/components/share/CardAddress";
import { details } from "src/commons/routers";
import { RootState } from "src/stores/types";
import { API } from "src/commons/utils/api";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import TokenAutocomplete from "src/components/TokenAutocomplete";
import ADAicon from "src/components/commons/ADAIcon";
import { useScreen } from "src/commons/hooks/useScreen";
import FormNowMessage from "src/components/commons/FormNowMessage";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";

import { BackButton, BackText, RedirectButton, StyledBoxCard, TimeDuration, TitleText, WrapHeader } from "./styles";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
  adaHanldeData?: {
    stakeAddress: string;
    paymentAddress: string;
  } | null;
}
const AddressHeader: React.FC<Props> = ({ data, loading, adaHanldeData }) => {
  const [usdDataLocal] = useLocalStorage<dataFromCoinGecko[number] | null>("usdData", null);
  const { t } = useTranslation();
  const [stakeKey, setStakeKey] = useState("");
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const adaRate = usdDataLocal ? usdDataLocal.current_price : 0;
  const { address } = useParams<{ address: string }>();

  const {
    data: dataStake,
    loading: loadingStake,
    lastUpdated
  } = useFetch<WalletStake>(stakeKey ? `${API.STAKE.DETAIL}/${stakeKey}` : "", undefined, false, blockKey);
  const theme = useTheme();
  const { isMobile } = useScreen();
  const history = useHistory();
  useEffect(() => {
    setStakeKey(data?.stakeAddress || "");
  }, [data]);

  const itemLeft = [
    {
      title: <div data-testid="addressDetail.transactionTitle">{t("drawer.transactions")}</div>,
      value: <div data-testid="addressDetail.transactionValue">{data?.txCount || 0}</div>
    },
    {
      title: <div data-testid="addressDetail.adaBalanceTitle">{t("glossary.adaBalance")}</div>,
      value: (
        <Box data-testid="addressDetail.adaBalanceValue" display="flex" alignItems="center">
          {formatADAFull(data?.balance)}&nbsp;
          <ADAicon />
        </Box>
      )
    },
    {
      title: <div data-testid="addressDetail.usdTitle">{t("glossary.usdValue")}</div>,
      value: <Box data-testid="addressDetail.usdValue">$ {exchangeADAToUSD(data?.balance || 0, adaRate, true)}</Box>
    },
    {
      value: <TokenAutocomplete data-testid="addressDetail.address" address={data?.address || ""} />
    }
  ];
  const itemRight = [
    {
      title: <div data-testid="addressDetail.totalStakeTitle">{t("drawer.totalStake")}</div>,
      value: (
        <Box data-testid="addressDetail.totalStakeValue" display={"flex"} alignItems={"center"} gap={"5px"}>
          {formatADAFull(dataStake?.totalStake)}
          <ADAicon />
          {NETWORK === NETWORKS.sanchonet && (
            <CustomTooltip placement="top-start" title={t("sanchonet.toltipTotalStake")}>
              <Box display={"inline-block"}>
                <InfoSolidIcon />
              </Box>
            </CustomTooltip>
          )}
        </Box>
      )
    },
    {
      title: <div data-testid="addressDetail.poolNameTitle">{t("glossary.poolName")}</div>,
      value: dataStake?.pool?.poolId ? (
        <Link
          data-testid="addressDetail.poolNameValue"
          to={dataStake?.pool?.poolId ? details.delegation(dataStake.pool.poolId) : "#"}
          style={{ fontFamily: "var(--font-family-text)", color: theme.palette.primary.main }}
        >
          {dataStake?.pool?.poolName ? (
            dataStake?.pool?.poolName
          ) : (
            <CustomTooltip title={dataStake?.pool?.poolId || ""} arrow>
              <span>{getShortHash(dataStake?.pool?.poolId || "")}</span>
            </CustomTooltip>
          )}
        </Link>
      ) : (
        <span>{t("drawer.notDelegatedToAnyPool")}</span>
      )
    },
    {
      title: <div data-testid="addressDetail.rewardBalanceTitle">{t("glossary.rewardBalance")}</div>,
      value:
        dataStake?.rewardAvailable != null ? (
          <Box data-testid="addressDetail.rewardBalanceValue">
            {formatADAFull(dataStake?.rewardAvailable)}&nbsp;
            <ADAicon />
          </Box>
        ) : (
          t("common.notAvailable")
        )
    }
  ];

  return (
    <Card>
      <WrapHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} fontSize="16px" />
          <BackText data-testid="addressDetail.back">{t("common.back")}</BackText>
        </BackButton>
        <Box width={"100%"} display={"flex"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            textAlign={"left"}
            component={"h2"}
            lineHeight={1}
            mt={2}
            display={"flex"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <TitleText>
              {adaHanldeData ? (
                <Box sx={{ wordBreak: "break-all" }} textTransform={"lowercase"}>
                  <CustomTooltip title={t("address.title.ADAHanlde")}>
                    <Box display={"inline-block"}>{address.startsWith("$") ? address : `$${address}`} </Box>
                  </CustomTooltip>
                  <Box data-testid="addressDetail.adaHanldeData" display={"inline-block"}>
                    <BookmarkButton keyword={data?.address || ""} type="ADDRESS" />
                  </Box>
                </Box>
              ) : (
                <Box data-testid="address-detail-title">
                  {t("address.title.addressDetail")}
                  <Box display={"inline-block"}>
                    <BookmarkButton keyword={data?.address || ""} type="ADDRESS" />
                  </Box>
                </Box>
              )}
            </TitleText>
          </Box>
          {(data?.associatedSmartContract || data?.associatedNativeScript) && (
            <RedirectButton
              data-testid="addressDetail.view"
              width={isMobile ? "100%" : "auto"}
              component={Button}
              onClick={() =>
                history.push(
                  data.associatedSmartContract
                    ? details.smartContract(data?.scriptHash || "")
                    : details.nativeScriptDetail(data?.scriptHash || "")
                )
              }
            >
              {data.associatedSmartContract ? t("address.viewContractDetail") : t("address.viewNativeScriptDetail")}
            </RedirectButton>
          )}
        </Box>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
      </WrapHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledBoxCard>
            <CardAddress
              title={t("common.address")}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </StyledBoxCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBoxCard>
            <CardAddress
              title={t("common.stakeAddress")}
              type="right"
              address={data?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(data?.stakeAddress)}
            />
          </StyledBoxCard>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressHeader;
