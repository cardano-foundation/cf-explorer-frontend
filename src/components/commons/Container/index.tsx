import { Container, ContainerProps } from "@mui/material";

export default (props: ContainerProps) => {
  return <Container {...props} maxWidth={false} sx={{ maxWidth: 1340 }} />;
};
