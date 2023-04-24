import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from 'react';
import { AIcon, CopySquareIcon, OptionIcon, ReloadIcon } from "../../commons/resources";
import { getShortHash } from "../../commons/utils/helper";
import StyledModal from "../commons/StyledModal";
import { HashText, ItemTitle, PoolUpdateIconDeselectIcon, PoolUpdateIconSelectedIcon, PreviousIcon, PreviousText, RewardsDistributionDeselectIcon, RewardsDistributionSelectedIcon, TextTab, WrapperGrid, WrapperGridItem, WrapperItemUpdates } from "./styles";

export default function PoolCertificate() {
  const [tabNumber, setTabNumber] = useState("1");
  const data = {
    txnId: "15edcfcbda5fde3544539e02b5b74ceb6f440a262e86436f46c85442f5c6d12a"
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabNumber(newValue);
  };
  const Tab1 = () => (
    <WrapperGrid>
      <WrapperGridItem>
        <ItemTitle>Transaction Id</ItemTitle>
        <Box marginTop={"8px"} gap={1} display={"flex"}>
          <HashText>
            {getShortHash(data.txnId)}
          </HashText>
          <Box sx={{ transform: "scale(1.2)" }}>
            <CopySquareIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <ItemTitle>Pool ID</ItemTitle>
        <Box marginTop={"8px"} gap={1} display={"flex"}>
          <HashText>
            {getShortHash(data.txnId)}
          </HashText>
          <Box sx={{ transform: "scale(1.2)" }}>
            <CopySquareIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <ItemTitle>VRF Key</ItemTitle>
        <Box marginTop={"8px"} gap={1} display={"flex"}>
          <HashText>
            {getShortHash(data.txnId)}
          </HashText>
          <Box sx={{ transform: "scale(1.2)" }}>
            <CopySquareIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <ItemTitle>Owners</ItemTitle>
        <Box marginTop={"8px"} gap={1} display={"flex"}>
          <HashText>
            {getShortHash(data.txnId)}
          </HashText>
          <Box sx={{ transform: "scale(1.2)" }}>
            <CopySquareIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <ItemTitle>Reward Account</ItemTitle>
            <Box marginTop={"8px"} gap={1} display={"flex"}>
              <HashText>
                {getShortHash(data.txnId)}
              </HashText>
              <Box sx={{ transform: "scale(1.2)" }}>
                <CopySquareIcon />
              </Box>
            </Box>
          </Box>
          <Box>
            <OptionIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <ItemTitle>Margin</ItemTitle>
        <Box marginTop={"8px"} fontWeight={500}  >
          2%
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <ItemTitle>Pledge</ItemTitle>
            <Box marginTop={"8px"} gap={1} display={"flex"} flexDirection={"column"}>
              <Box display={"flex"} alignItems={"center"} gap={1} fontWeight={500}>
                2.174433
                <AIcon />
              </Box>
              <PreviousText>
                Previous: 1,0000.0
                <Box sx={{ transform: 'scale(0.8)' }}>
                  <PreviousIcon />
                </Box>
              </PreviousText>
            </Box>
          </Box>
          <Box>
            <ReloadIcon />
          </Box>
        </Box>
      </WrapperGridItem>
      <WrapperGridItem>
        <ItemTitle>Cost</ItemTitle>
        <Box display={"flex"} alignItems={"center"} gap={1} fontWeight={500} mt={"8px"}>
          2.174433
          <AIcon />
        </Box>
      </WrapperGridItem>
    </WrapperGrid>
  );
  const Tab2 = () => (
    <WrapperGridItem>
      <ItemTitle>Pledge</ItemTitle>
      <WrapperItemUpdates>
        <Box>
          <PreviousText>
            OLD
          </PreviousText>
          <Box display={"flex"} alignItems={"center"} gap={1} fontWeight={500} mt={"8px"}>
            2.174433
            <AIcon />
          </Box>
        </Box>
        <Box>
          <ReloadIcon />
        </Box>
        <Box paddingRight={"50px"}>
          <PreviousText>
            New
          </PreviousText>
          <Box display={"flex"} alignItems={"center"} gap={1} fontWeight={500} mt={"8px"}>
            2.174433
            <AIcon />
          </Box>
        </Box>
      </WrapperItemUpdates>
    </WrapperGridItem>
  );
  return (
    <StyledModal handleCloseModal={() => { }} open title="Pool Certificate">
      <TabContext value={tabNumber}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label={(
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tabNumber === "1" ? <PoolUpdateIconSelectedIcon /> : <PoolUpdateIconDeselectIcon />}
                <TextTab sx={
                  tabNumber === "1" ? { color: (theme) => theme.palette.primary.main } : { color: (theme) => theme.palette.grey[400] }
                }>
                  Pool Certificate
                </TextTab>
              </Box>
            )} value="1" />
            <Tab label={(
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tabNumber === "2" ? <RewardsDistributionSelectedIcon /> : <RewardsDistributionDeselectIcon />}
                <TextTab sx={
                  tabNumber === "2" ? { color: (theme) => theme.palette.primary.main } : { color: (theme) => theme.palette.grey[400] }
                }>
                  Certificate Updates
                </TextTab>
              </Box>
            )} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{
          padding: "10px 0 0 0",
        }}>
          {Tab1()}
        </TabPanel>
        <TabPanel value="2" sx={{
          padding: "10px 0 0 0",
        }}>
          {Tab2()}
        </TabPanel>
      </TabContext >
    </StyledModal >
  )
}
