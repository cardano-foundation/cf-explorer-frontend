import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatADAFull } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import ADAicon from "src/components/commons/ADAIcon";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

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
  return (
    <Box>
      {data?.map((item) => (
        <Item key={item.stakeAddress} overflow={"auto"}>
          <ItemContent>
            <Content sx={{ width: "60vw" }}>
              <Link
                data-testid={`stake-item-${item.stakeAddress}`}
                to={details.stake(item.stakeAddress)}
                style={{ width: "100%" }}
              >
                <Title>
                  <DynamicEllipsisText value={item.stakeAddress} isCopy isTooltip />
                </Title>
              </Link>
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
