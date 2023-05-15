import React from "react";
import StyledModal from "../commons/StyledModal";
import { Card, CardTitle, Container, Title, CardSubTitle, DotsIcon, ShowMoreButton } from "./styles";
import { Grid } from "@mui/material";
import CopyButton from "../commons/CopyButton";

export interface PoolRegistrationCertificateProps {
  open?: boolean;
  onModalClosed?: () => void;
}
const PoolRegistrationCertificate: React.FC<PoolRegistrationCertificateProps> = ({ open, onModalClosed }) => {
  return (
    <StyledModal open={!!open} handleCloseModal={() => onModalClosed?.()}>
      <Container>
        <Title>Pool registration certificate</Title>
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Transaction ID</CardTitle>
              <CardSubTitle color='#108AEF'>
                66c41...b36ca <CopyButton text='66c41...b36ca' />
              </CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Pool ID</CardTitle>
              <CardSubTitle color='#108AEF'>
                66c41...b36ca <CopyButton text='66c41...b36ca' />
              </CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>VRF Key</CardTitle>
              <CardSubTitle color='#108AEF'>
                66c41...b36ca <CopyButton text='66c41...b36ca' />
              </CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Owners</CardTitle>
              <CardSubTitle color='#108AEF'>
                66c41...b36ca <CopyButton text='66c41...b36ca' />
              </CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Reward Account</CardTitle>
              <CardSubTitle color='#108AEF'>
                66c41...b36ca <CopyButton text='66c41...b36ca' />
              </CardSubTitle>
              <ShowMoreButton>
                <DotsIcon />
              </ShowMoreButton>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Margin</CardTitle>
              <CardSubTitle>2%</CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Pledge</CardTitle>
              <CardSubTitle>2.174433</CardSubTitle>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card>
              <CardTitle>Cost</CardTitle>
              <CardSubTitle>2.174433</CardSubTitle>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </StyledModal>
  );
};

export default PoolRegistrationCertificate;
