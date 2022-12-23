import React from "react";
import { Link } from "react-router-dom";
import CopyButton from "../../commons/CopyButton";
import styles from "./index.module.scss";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import { styled, Box, Skeleton } from "@mui/material";
import { EmptyIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
  loading: boolean;
}
const CardAddress: React.FC<DetailCardProps> = ({ title, address, item, type, loading }) => {
  if (loading) {
    return (
      <CardItem padding={0}>
        <Skeleton variant="rectangular" height={"100%"} width="100%" />
      </CardItem>
    );
  }
  if (type === "right" && !address) {
    return (
      <CardItem>
        <Box height={"100%"} display="flex" alignItems="center" justifyContent="center">
          <img alt="icon" src={EmptyIcon} />
        </Box>
      </CardItem>
    );
  }
  return (
    <CardItem padding={props => props.spacing(4)}>
      <Box className={styles.titleDetail}>{title}</Box>
      <Box className={styles.addressGroup}>
        <Link className={styles.address} to={routers.ADDRESS_DETAIL.replace(":address", address)}>
          {address}
        </Link>
        <CopyButton text={address} />
      </Box>
      <Box>
        {item.map((i, ii) => {
          return (
            <Box key={ii} className={styles.itemDetail}>
              {i.title && (
                <Box className={styles.left}>
                  <img src={infoIcon} alt="info icon" />
                  <Box className={styles.title}>{i.title}</Box>
                </Box>
              )}
              <Box className={styles.value} style={{ width: `${i.title ? "auto" : "100%"}` }}>
                {i.value}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CardItem>
  );
};

export default CardAddress

const CardItem = styled(Box)(({ theme }) => ({
  background: "#fff",
  minHeight: 200,
  height: "100%",
  borderRadius: theme.borderRadius,
  overflow: "hidden",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
}));