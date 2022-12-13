import { Box, Skeleton, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { routers } from "../../../commons/routers";

import { formatADA, getShortHash, numberWithCommas } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import Eth from "../../../commons/resources/images/Eth.png";
import rocketToken from "../../../commons/resources/images/rocketToken.png";
import exchangeToken from "../../../commons/resources/images/exchangeToken.png";
import infoToken from "../../../commons/resources/images/infoToken.png";

import {
  BackButton,
  BackText,
  CardInfo,
  CardItem,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  SlotLeader,
  SlotLeaderSkeleton,
  TokenInfo,
} from "./styles";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
  tokenMetadataLoading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading, tokenMetadataLoading }) => {
  return (
    <Box>
      <HeaderDetailContainer>
        <BackButton to={routers.TOKEN_LIST}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            {loading && <HeaderTitleSkeleton variant="rectangular" />}
            {!loading && <>{data?.displayName}</>}
          </HeaderTitle>
        </HeaderContainer>
        <SlotLeader>
          {loading && <SlotLeaderSkeleton variant="rectangular" />}
          {!loading && (
            <>
              <Box>{data?.name}</Box> <CopyButton text={data?.name} />
            </>
          )}
        </SlotLeader>
      </HeaderDetailContainer>
      <CardInfo>
        <TokenInfo>
          <Box pr={3}>
            <img height={"100%"} src={Eth} alt="token icon " />
          </Box>
          <Box>
            <Box textAlign={"left"} fontWeight={"bold"} fontSize={"1.3rem"}>
              {data?.displayName}
            </Box>
            <Box textAlign={"left"} fontSize={"0.8rem"} pt={1} lineHeight={1.3}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ducimus itaque cumque hic explicabo
              consectetur,
            </Box>
          </Box>
        </TokenInfo>
        {infoItem.map((item, idx) => (
          <InfoItem
            key={idx}
            image={item.image}
            title={item.title}
            data={{ decimals: data?.decimals, txCount: data?.txCount, supply: data?.supply }}
          />
        ))}
      </CardInfo>
    </Box>
  );
};

export default TokenOverview;

const InfoItem = ({
  image,
  title,
  data,
}: {
  image: string;
  title: React.ReactNode;
  data: Pick<IToken, "decimals" | "supply" | "txCount"> | null;
}) => {
  return (
    <CardItem>
      <Box>
        <Box>
          <img src={image} alt="icon" />
        </Box>
        <Box padding={props => `${props.spacing(1)} 0`}>{title}</Box>
        <Box fontSize={"1.3rem"} fontWeight="bold">
          {title === "Total Supply" && formatADA(data?.supply)}
          {title === "Decimal" && data?.decimals}
          {title !== "Total Supply" && title !== "Decimal" && data?.txCount}
        </Box>
      </Box>
    </CardItem>
  );
};

const infoItem = [
  { image: rocketToken, title: "Total Supply" },
  { image: rocketToken, title: "Decimal" },
  {
    image: exchangeToken,
    title: (
      <Box display={"flex"} alignItems="center">
        <Box pr={1}>Transaction</Box> <img src={infoToken} alt="icon" />
      </Box>
    ),
  },
];
