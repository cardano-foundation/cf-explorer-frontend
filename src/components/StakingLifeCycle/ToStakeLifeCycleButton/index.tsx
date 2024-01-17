import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";

import { StakingLifecycleComponent } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";

import { LinkButtonStaking } from "./style";

type Props = {
  address?: string;
  from?: "stakingDetail" | "poolDetail";
};

const ToStakeLifCycleButton = ({ address, from = "stakingDetail" }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();

  const onClick = () => {
    if (!address) return;
    if (from === "stakingDetail") {
      history.push(details.staking(address, "timeline"));
    } else {
      history.push(details.spo(address, "timeline"));
    }
  };

  return (
    <CustomTooltip placement={"top-end"} title={t("ViewStakingLifecycle")}>
      <LinkButtonStaking onClick={onClick}>
        <CustomIcon icon={StakingLifecycleComponent} height={24} width={24} fill={theme.palette.secondary[0]} />
      </LinkButtonStaking>
    </CustomTooltip>
  );
};

export default ToStakeLifCycleButton;
