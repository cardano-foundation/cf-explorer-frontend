import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import { Content, Header, Item, ItemBox, ItemContent, Title, Value, Wrapper } from "./style";

interface InstantaneousRewardsProps {
  data: Transaction["instantaneousRewards"] | null;
}

const InstantaneousRewards: React.FC<InstantaneousRewardsProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Header>
        <Box>{t("common.stakeAddress")}</Box>
        <Box>{t("common.rewardsPaid")}</Box>
      </Header>
      <ItemBox>
        <ItemInstantaneousRewards data={data || []} />
      </ItemBox>
    </Wrapper>
  );
};

export default InstantaneousRewards;

const ItemInstantaneousRewards = ({ data }: { data: Transaction["instantaneousRewards"] }) => {
  const { isTablet } = useScreen();
  return (
    <Box>
      {data?.map((item) => (
        <Item key={item.stakeAddress}>
          <ItemContent>
            <Content>
              <Link data-testid={`stake-item-${item.stakeAddress}`} to={details.stake(item.stakeAddress)}>
                <CustomTooltip title={item.stakeAddress}>
                  <Title>{isTablet ? getShortHash(item.stakeAddress) : item.stakeAddress}</Title>
                </CustomTooltip>
              </Link>
              <CopyButton text={item.stakeAddress} />
            </Content>
            <Content>
              <Value component={"span"}>{formatADAFull(item.amount)}</Value>
              <ADAicon />
            </Content>
          </ItemContent>
        </Item>
      ))}
    </Box>
  );
};
