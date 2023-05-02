import { TabPanel } from "@mui/lab";
import { Box, Typography, styled } from "@mui/material";

export const TabLabel = styled(Typography)<{active: boolean}>((props) => `
 font-size: 24px;
    font-weight: 700;
    text-transform: capitalize;
    color: ${props.active ? '#000': '#98A2B3'};
`);

export const TabContent = styled(TabPanel)`
    padding: 0px;
`;

export const TabHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;