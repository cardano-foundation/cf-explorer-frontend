import { Box } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { HashText, ItemTitle, WrapperGrid, WrapperGridItem, PreviousText, PreviousIcon } from "./styles";
import { getShortHash } from "../../commons/utils/helper";
import { AIcon, CopySquareIcon, OptionIcon, ReloadIcon } from "../../commons/resources";

export default function PoolCertificate() {
  const data = {
    txnId: "15edcfcbda5fde3544539e02b5b74ceb6f440a262e86436f46c85442f5c6d12a"
  }
  return (
    <StyledModal handleCloseModal={() => { }} open title="Pool Certificate">
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
    </StyledModal>
  )
}
