import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { exchangeADAToUSD, formatADAFull, getShortWallet } from "src/commons/utils/helper";
import TokenAutocomplete from "src/components/TokenAutocomplete";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import CardAddress from "src/components/share/CardAddress";
import { RootState } from "src/stores/types";
import VerifyScript from "src/components/VerifyScript";
import { Uppercase } from "src/components/commons/CustomText/styles";

import {
  BannerSuccess,
  CardContainer,
  GridContainer,
  GridItem,
  Pool,
  RedirectButton,
  StyledAAmount,
  StyledVerifyButton,
  TimeDuration,
  VerifyScriptContainer,
  WrapButtonExtra
} from "./styles";

interface Props {
  data: WalletAddress | null;
  loading: boolean;
  lastUpdated?: number;
}

const AddressOverview: React.FC<Props> = ({ data, loading, lastUpdated }) => {
  const { t } = useTranslation();
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const { data: dataStake, loading: loadingStake } = useFetch<WalletStake>(
    data?.stakeAddress ? `${API.STAKE.DETAIL}/${data?.stakeAddress}` : "",
    undefined,
    false,
    blockNo
  );
  const history = useHistory();
  const { adaRate } = useSelector(({ system }: RootState) => system);
  const { isMobile } = useScreen();
  const [showBanner, setShowBanner] = useState<boolean>(false);

  const itemLeft = [
    { title: t("glossary.transactions"), value: data?.txCount },
    {
      title: t("glossary.adaBalance"),
      value: (
        <StyledAAmount>
          <Box>{formatADAFull(data?.balance)}</Box>&nbsp;
          <ADAicon />
        </StyledAAmount>
      )
    },
    { title: t("glossary.adaValue"), value: exchangeADAToUSD(data?.balance || 0, adaRate, true) },
    {
      value: <TokenAutocomplete address={data?.address || ""} />
    }
  ];
  const itemRight = [
    {
      title: t("glossary.controlledTotalStake"),
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.totalStake)}&nbsp;
          <ADAicon />
        </StyledAAmount>
      )
    },
    {
      title: t("drawer.rewardAvailable"),
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardAvailable)}&nbsp;
          <ADAicon />
        </StyledAAmount>
      )
    },
    {
      title: t("drawer.withDrawn"),
      value: (
        <StyledAAmount>
          {formatADAFull(dataStake?.rewardWithdrawn)}&nbsp;
          <ADAicon />
        </StyledAAmount>
      )
    },
    {
      title: t("drawer.delegatedTo"),
      value:
        dataStake?.pool?.poolName || dataStake?.pool?.poolId ? (
          <Pool to={details.delegation(dataStake?.pool ? dataStake?.pool?.poolId : "")}>
            {dataStake?.pool?.poolName ? (
              dataStake?.pool?.poolName
            ) : (
              <CustomTooltip title={dataStake?.pool?.poolId || ""} arrow>
                <span>{getShortWallet(dataStake?.pool?.poolId || "")}</span>
              </CustomTooltip>
            )}
          </Pool>
        ) : (
          <span>{t("drawer.notDelegatedToAnyPool")}</span>
        )
    }
  ];

  return (
    <CardContainer
      title={
        <VerifyScriptContainer id="VerifyScriptContainer">
          <Box>{t("head.page.constactDetails")}</Box>
          {data?.verifiedContract ? (
            <StyledVerifyButton>
              <Uppercase> {t("common.verifiedScript") + " "}</Uppercase>
            </StyledVerifyButton>
          ) : null}
        </VerifyScriptContainer>
      }
      extra={
        <WrapButtonExtra>
          {!data?.verifiedContract ? <VerifyScript setShowBanner={setShowBanner} /> : null}
          <RedirectButton
            width={isMobile ? "100%" : "auto"}
            component={Button}
            onClick={() => history.push(details.address(data?.address))}
          >
            {t("common.viewAddressDetail")}
          </RedirectButton>
        </WrapButtonExtra>
      }
    >
      {showBanner && <BannerSuccess>{t("message.contracctVarified")}</BannerSuccess>}
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <GridContainer container spacing={2} mt={2}>
        <GridItem item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={3} height={"100%"}>
            <CardAddress
              title={t("common.address")}
              type="left"
              address={data?.address || ""}
              item={itemLeft}
              loading={loading}
            />
          </Box>
        </GridItem>
        <GridItem item xs={12} md={6}>
          <Box overflow="hidden" borderRadius={3} height={"100%"}>
            <CardAddress
              title={t("common.stakeAddress")}
              type="right"
              address={dataStake?.stakeAddress || ""}
              item={itemRight}
              loading={loading || loadingStake}
              addressDestination={details.stake(dataStake?.stakeAddress)}
            />
          </Box>
        </GridItem>
      </GridContainer>
    </CardContainer>
  );
};

export default AddressOverview;
