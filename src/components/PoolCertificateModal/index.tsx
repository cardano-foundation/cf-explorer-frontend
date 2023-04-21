import { ReactNode } from "react";
import { BoxTitle, TextNote, TitleModal } from "./styles";

import React from "react";
import { Container } from "../Account/ActivityLogModal/styles";
import { Box, Grid } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import CopyButton from "../commons/CopyButton";
import { StyledLink } from "../share/styled";
import ADAIcon from "../commons/ADAIcon";
import { IconRefresh, IconThreeDot } from "../../commons/resources";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const PoolCertificateModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box>
        <TitleModal>Pool certificate</TitleModal>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Transaction ID">
              <ItemCopy text="66c41...b36ca" />
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Pool ID">
              <ItemCopy text="66c41...b36ca" />
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Pool ID">
              <ItemCopy text="66c41...b36ca" />
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Owners">
              <ItemCopy text="66c41...b36ca" />
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Reward Account" iconRight={<IconThreeDot />}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    2.174433 <ADAIcon fontSize={16} />
                  </Box>
                </Box>
              </Box>
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Margin">2%</BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Pledge" iconRight={<IconRefresh />}>
              <Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  2.174433 <ADAIcon fontSize={16} />
                </Box>
                <TextNote>Previous: 1,000.0 <ADAIcon fontSize={12} /></TextNote>
              </Box>
            </BoxCertificate>
          </Grid>
          <Grid item xs={12} md={6}>
            <BoxCertificate name="Cost">
              <Box display={"flex"} alignItems={"center"} gap={1}>
                2.174433 <ADAIcon fontSize={16} />
              </Box>
            </BoxCertificate>
          </Grid>
        </Grid>
      </Box>
    </StyledModal>
  );
};

interface IBoxCertificate {
  name: string;
  children?: ReactNode;
  iconRight?: ReactNode;
}

const BoxCertificate = (props: IBoxCertificate) => {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(152, 162, 179, 0.1)",
        height: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        width="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ padding: "0px 20px" }}
      >
        <Box>
          <BoxTitle>{props.name}</BoxTitle>
          <Box sx={{ paddingTop: 1 }}>{props.children}</Box>
        </Box>
        {props.iconRight}
      </Box>
    </Container>
  );
};

const ItemCopy = ({ text }: { text: string }) => {
  return (
    <>
      <StyledLink to="#">{text}</StyledLink>&nbsp;
      <CopyButton />
    </>
  );
};

export default PoolCertificateModal;
