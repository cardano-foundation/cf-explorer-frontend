import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import { Content, Header, Item, ItemBox, ItemContent, Title, Value, Wrapper } from "./style";

interface InstantaneousRewardsProps {
  data: Transaction["instantaneousRewards"] | null;
}

const InstantaneousRewards: React.FC<InstantaneousRewardsProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Box>Address Stake Key</Box>
        <Box>Rewards Paid</Box>
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
              <Link to={details.stake(item.stakeAddress)}>
                <CustomTooltip title={item.stakeAddress}>
                  <Title>{isTablet ? getShortWallet(item.stakeAddress) : item.stakeAddress}</Title>
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
