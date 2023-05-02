import { Box, Button, Container, Grid, styled } from "@mui/material";


export const DashboardCardList = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 45px;
`

export const DashboardContainer = styled(Container)`
    box-sizing: border-box;
`

export const DownloadButtonAll = styled(Button)`
    text-transform: capitalize;
    font-weight: 700;
    font-size: 14px;
`

export const GridContainer = styled(Grid)`
    margin-bottom: 35px;
`