import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import { formatADAFull } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { Header, Item, ItemBox, ItemContent, Wrapper } from "./style";
import ADAicon from "../../../commons/ADAIcon";

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
                          {item.stakeAddress}
                          {/* {getShortWallet(item.stakeAddress)} */}
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
