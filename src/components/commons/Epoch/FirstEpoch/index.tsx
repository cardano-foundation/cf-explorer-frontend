import { Box, useTheme } from "@mui/material";
import { ExchangeIcon } from "~/commons/resources";
import cubeIcon from "~/commons/resources/icons/blockIcon.svg";
import slotIcon from "~/commons/resources/icons/slot.svg";
import timeIcon from "~/commons/resources/icons/time.svg";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "~/commons/utils/constants";
import { formatDateTimeLocal, getEpochSlotNo } from "~/commons/utils/helper";
import { Status } from "~/pages/Epoch/styles";
import DetailHeader from "../../DetailHeader";
import ProgressCircle from "../../ProgressCircle";
import { Container, EpochNumber, EpochProgress, TitleCard } from "./styles";
import { useEffect, useState } from "react";

interface IProps {
  data: IDataEpoch[];
}

export default function FirstEpoch({ data }: IProps) {
  const theme = useTheme();
  const currentEpoch = data[0];
  const [timerSlot, setTimerSlot] = useState<number>(0);

  useEffect(() => {
    let id: any;
    if (currentEpoch) {
      id = setInterval(() => {
        const currentSlot = getEpochSlotNo(currentEpoch);
        setTimerSlot(currentSlot);
        if (currentSlot >= MAX_SLOT_EPOCH) {
          clearInterval(id);
          setTimerSlot(MAX_SLOT_EPOCH);
        }
      }, 1000);
    }
    return () => clearInterval(id);
  }, [currentEpoch]);

  if (!currentEpoch) return null;
  const progress = ((getEpochSlotNo(currentEpoch) / MAX_SLOT_EPOCH) * 100).toFixed(0);
  const listOverview = [
    {
      icon: ExchangeIcon,
      hideHeader: true,
      title: (
        <EpochNumber sx={{ [theme.breakpoints.down("sm")]: { marginTop: "-8px" } }}>
          Epoch Number {currentEpoch?.no}
        </EpochNumber>
      ),
      value: (
        <Box display={"flex"} alignItems='center'>
          <ProgressCircle
            size={100}
            pathLineCap='butt'
            pathWidth={6}
            trailWidth={6}
            percent={Number(progress)}
            trailOpacity={1}
          >
            <EpochProgress>{`${progress}%`}</EpochProgress>
            <Status status={currentEpoch?.status?.toLowerCase()}>{EPOCH_STATUS[currentEpoch?.status]}</Status>
          </ProgressCircle>
        </Box>
      )
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}>Block </TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{currentEpoch?.blkCount}</Box>
    },
    {
      icon: slotIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <Box component={"span"}>
          {timerSlot}/{MAX_SLOT_EPOCH}
        </Box>
      )
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> End Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpoch?.endTime || "")}</Box>
    },
    {
      icon: timeIcon,
      title: (
        <Box display={"flex"} alignItems='center'>
          <TitleCard mr={1}> Start Time</TitleCard>
        </Box>
      ),
      value: <Box component={"span"}>{formatDateTimeLocal(currentEpoch?.startTime || "")}</Box>
    }
  ];
  return (
    <Container>
      <DetailHeader isHideButtonBack={true} loading={false} listItem={listOverview} type='EPOCH' title={" "} />
    </Container>
  );
}
