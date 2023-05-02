import { Box, Grid } from "@mui/material";
import CopyButton from "../../../commons/CopyButton";
import { TextLabel, TextNormal, TextRightValue, TextValue } from "./styles";
import { LinkIcon } from "../../../../commons/resources";
import Link from "../../../commons/Link";

const StakeKeyBox = () => {
  const leftRow = [
    {
      label: "Pool ID",
      value: "d043...42506dd307",
    },
    {
      label: "VRF Key",
      value: "d043...42506sdd307",
    },
    {
      label: "Reward Account",
      value: "d043...4250dd6307",
    },
    {
      label: "Pool Operator",
      value: "d043...4250ddd6307",
    },
    {
      label: "Metadata Hash",
      value: "d043...425ddddd06307",
    },
  ];

  const rightRow = [
    {
      label: "Margin",
      value: "10%",
    },
    {
      label: "Cost",
      value: "10%",
    },
    {
      label: "Pledge",
      value: "4851.36871 ADA",
    },
    {
      label: "Relay nNode",
      value: (
        <TextNormal>
          IPv4: <TextRightValue>82.15.218.244</TextRightValue> | Port:
          <TextRightValue>3000</TextRightValue> | Valency: <TextRightValue>5</TextRightValue>
        </TextNormal>
      ),
    },
    {
      label: "Metadata URL",
      value: (
        <Box display="flex">
          <TextValue>https://raw.githubusercontent.com</TextValue>&nbsp;
          <Link to="https://raw.githubusercontent.com">
            <LinkIcon />
          </Link>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {leftRow.map(({ label, value }) => {
            return (
              <Box key={label} sx={{ marginBottom: "15px" }}>
                <TextLabel>{label}: </TextLabel>
                <TextValue>
                  {value} <CopyButton text={value} />
                </TextValue>
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={12} md={6}>
          {rightRow.map(({ label, value }) => {
            return (
              <Box key={label} sx={{ marginBottom: "15px" }}>
                <TextLabel>{label}: </TextLabel>
                <TextRightValue>{value}</TextRightValue>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
