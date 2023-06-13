import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import { Header, Item, ItemBox, ItemContent, Wrapper } from "./style";

interface InstantaneousRewardsProps {
  data: Transaction["instantaneousRewards"] | null;
}

const InstantaneousRewards: React.FC<InstantaneousRewardsProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Box>Address Stake Key</Box>
        <Box>Reward Paid</Box>
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
            <Box width={"100%"}>
              <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Box display={"flex"} justifyContent="space-between" flex={"1"} alignItems={"center"}>
                  <Box
                    display={"flex"}
                    justifyContent="flex-start"
                    alignItems={"center"}
                    flexWrap="nowrap"
                    width={"auto"}
                  >
                    <Link to={details.address(item.stakeAddress)}>
                      <CustomTooltip title={item.stakeAddress}>
                        <Box
                          color={(theme) => theme.palette.secondary.main}
                          fontWeight="bold"
                          fontFamily={"var(--font-family-text)"}
                        >
                          {isTablet ? getShortWallet(item.stakeAddress) : item.stakeAddress}
                        </Box>
                      </CustomTooltip>
                    </Link>{" "}
                    <CopyButton text={item.stakeAddress} />
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="flex-start"
                    alignItems={"center"}
                    flexWrap="nowrap"
                    width={"auto"}
                  >
                    <Box
                      component={"span"}
                      whiteSpace="nowrap"
                      color={(theme) => theme.palette.primary.main}
                      fontWeight="bold"
                      mr={1}
                    >
                      {formatADAFull(item.amount)}
                    </Box>
                    <ADAicon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </ItemContent>
        </Item>
      ))}
    </Box>
  );
};
