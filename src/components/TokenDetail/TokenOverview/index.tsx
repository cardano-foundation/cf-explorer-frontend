import React, { useState } from "react";
import { alpha, Box, Skeleton } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { routers } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal, numberWithCommas } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import slotIcon from "../../../commons/resources/icons/slot.svg";
import exchageIcon from "../../../commons/resources/icons/Union.svg";
import decimalIcon from "../../../commons/resources/icons/decimal.svg";
import {
  BackButton,
  BackText,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  LogoEmpty,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  SlotLeaderTitle,
  TitleCard,
  ValueCard,
} from "./styles";
import ScriptModal from "../../ScriptModal";
import { useHistory } from "react-router";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [policyId, setPolicyId] = useState("");
  const history = useHistory();

  const listItem = [
    {
      title: "Total Supply",
      value: <Box component={"span"}>{numberWithCommas(data?.supply)}</Box>,
      icon: slotIcon,
    },
    { title: "Decimal", icon: decimalIcon, value: data?.metadata?.decimals || 0 },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            Transactions
          </Box>
        </Box>
      ),
      icon: exchageIcon,
      value: numberWithCommas(data?.txCount),
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            Volume in 24h
          </Box>
        </Box>
      ),
      icon: exchageIcon,
      value: numberWithCommas(data?.volumeIn24h),
    },
    {
      title: (
        <Box display={"flex"} alignItems="center">
          <Box component={"span"} mr={1}>
            Created at
          </Box>
        </Box>
      ),
      icon: timeIcon,
      value: formatDateTimeLocal(data?.createdOn || ""),
    },
  ];

  return (
    <Box textAlign={"left"}>
    <BackButton onClick={history.goBack}>
        <HiArrowLongLeft />
        <BackText>Back</BackText>
      </BackButton>
      <HeaderContainer>
        <HeaderTitle>
          {loading && <HeaderTitleSkeleton variant="rectangular" />}
          {!loading && <>{data?.displayName}</>}
        </HeaderTitle>
      </HeaderContainer>
      <SlotLeaderContainer>
        {loading ? (
          <SlotLeaderSkeleton variant="rectangular" />
        ) : (
          <>
            <SlotLeaderTitle>Token ID: </SlotLeaderTitle>
            <SlotLeader>
              <Box>{data?.fingerprint}</Box> <CopyButton text={data?.fingerprint} />
            </SlotLeader>
          </>
        )}
      </SlotLeaderContainer>
      {loading && (
        <Box height={150} width="100%" borderRadius={10} overflow="hidden">
          <Skeleton height={"100%"} width="100%" variant="rectangular" />
        </Box>
      )}
      {!loading && (
        <CardInfoOverview>
          <CardItem display={"flex"} gap={2} flex={3}>
            <Box>
              <img src={policyIcon} alt="" />
            </Box>
            <Box display={"flex"} flexDirection="column" height={"80%"} justifyContent="space-between">
              <Box
                color={theme => theme.palette.primary.main}
                fontWeight="bold"
                fontFamily={'"Roboto", sans-serif'}
                fontSize={"1.125rem"}
                component="button"
                border={"none"}
                bgcolor="transparent"
                padding={0}
                textAlign="left"
                onClick={() => {
                  setOpenModal(true);
                  setPolicyId(data?.policy || "");
                }}
                style={{ cursor: "pointer" }}
              >
                Policy Script
              </Box>
              <Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  fontWeight={"bold"}
                  mb={1}
                  color={({ palette }) => palette.common.black}
                >
                  {data?.displayName || ""}
                  {data?.metadata && data?.metadata?.logo ? (
                    <Box
                      component={"img"}
                      width={"auto"}
                      height={36}
                      src={`data:image/png;base64,${data.metadata.logo}`}
                      alt="logo icon"
                      ml={1}
                    />
                  ) : (
                    <LogoEmpty ml={1} />
                  )}
                </Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  fontSize={"0.75rem"}
                  color={theme => alpha(theme.palette.common.black, 0.5)}
                >
                  {data?.metadata?.description || ""}
                </Box>
              </Box>
            </Box>
          </CardItem>
          {listItem.map((item, idx) => (
            <CardItem key={idx} flex={1}>
              <Box>
                <img src={item.icon} alt="" />
              </Box>
              <Box display={"flex"} alignItems="center">
                <TitleCard my={1} mr={1}>
                  {item.title}
                </TitleCard>
              </Box>
              <ValueCard>{item.value}</ValueCard>
            </CardItem>
          ))}
        </CardInfoOverview>
      )}
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={policyId} />
    </Box>
  );
};

export default TokenOverview;
