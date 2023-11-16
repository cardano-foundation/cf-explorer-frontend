import { Grid, Icon, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DelegatingIcon,
  PaymentWalletUrl,
  PaymentWalletDarkUrl,
  RewardAccountIconDarkUrl,
  RewardAccountIconUrl,
  RewardWithdrawnIconUrl,
  TransactionIcon,
  DelegatingToDarkIcon,
  RewardsWithdrawDarkIcon
} from "src/commons/resources/index";
import { details } from "src/commons/routers";
import { formatADAFull } from "src/commons/utils/helper";
import ADATransferModal from "src/components/StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import {
  BoxStyled,
  BoxValue,
  CardContent,
  CardInfo,
  CardItem,
  CardTitle,
  CardValue,
  CardValueDelegating,
  ItemIcon,
  NoDelegatedStakePool,
  StyledAdaLogoIcon,
  StyledBoxDelegating,
  TransferButton
} from "./styles";

type TCardAmount = {
  amount?: number;
};

const CardAmount = ({ amount }: TCardAmount) => {
  return (
    <CardValue>
      <CustomTooltip title={formatADAFull(amount)}>
        <BoxValue>{formatADAFull(amount)}</BoxValue>
      </CustomTooltip>
      <StyledAdaLogoIcon />
    </CardValue>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  iconUrl: string;
  iconSize?: { width?: string | number; height?: string | number };
};

const GridItem = ({ title, action, value, iconUrl, iconSize }: TGridItem) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);

  return (
    <CardItem sidebar={+sidebar}>
      <ItemIcon src={iconUrl} alt="title" style={{ ...iconSize }} />
      <CardContent>
        <CardInfo>
          <CardTitle>{title}</CardTitle>
          {value}
        </CardInfo>
        {action}
      </CardContent>
    </CardItem>
  );
};

const TabularOverview: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useScreen();
  const data = useContext(DelegatorDetailContext);
  const { totalStake, rewardAvailable, rewardWithdrawn, pool } = data ?? {};
  const { tickerName, poolName, poolId, iconUrl } = pool ?? {};
  const delegatingToValue =
    tickerName || poolName ? `${tickerName && tickerName + " -"}  ${poolName && poolName}` : poolId || "";

  const delegatingTovalueTooltip =
    tickerName || poolName ? `${tickerName && tickerName + " -"}  ${poolName && poolName}` : poolId;
  const [open, setOpen] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("common.paymentWallet")}
          iconUrl={theme.isDark ? PaymentWalletDarkUrl : PaymentWalletUrl}
          value={<CardAmount amount={Math.max(totalStake || 0, 0)} />}
          action={
            <TransferButton
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={
                <Icon
                  fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0]}
                  component={TransactionIcon}
                />
              }
            >
              {t("common.adaTransfers")}
            </TransferButton>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("rewardAccount")}
          iconUrl={theme.isDark ? RewardAccountIconDarkUrl : RewardAccountIconUrl}
          value={<CardAmount amount={Math.max(rewardAvailable || 0, 0)} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("slc.rewardsWithdrawn")}
          iconUrl={theme.isDark ? RewardsWithdrawDarkIcon : RewardWithdrawnIconUrl}
          value={<CardAmount amount={rewardWithdrawn} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title={t("slc.delegatingTo")}
          iconUrl={theme.isDark ? iconUrl || DelegatingToDarkIcon : iconUrl || DelegatingIcon}
          value={
            pool?.poolId ? (
              <StyledBoxDelegating to={details.delegation(pool?.poolId)}>
                <CardValueDelegating>
                  <CustomTooltip title={delegatingTovalueTooltip}>
                    <BoxStyled>
                      <DynamicEllipsisText
                        value={delegatingToValue}
                        postfix={5}
                        isNoLimitPixel={true}
                        sxFirstPart={{ maxWidth: isMobile ? "calc(100% - 37px)" : "calc(100% - 63.4px)" }}
                      />
                    </BoxStyled>
                  </CustomTooltip>
                </CardValueDelegating>
              </StyledBoxDelegating>
            ) : (
              <NoDelegatedStakePool>{t("drawer.notDelegatedToAnyPool")}</NoDelegatedStakePool>
            )
          }
        />
      </Grid>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
