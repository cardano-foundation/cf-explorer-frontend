import { Container, styled } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { NotFoundIcon } from "src/commons/resources";
import { routers } from "src/commons/routers";

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const Image = styled("img")`
  width: 100%;
  max-width: 250px;
  margin-bottom: 2rem;
`;

const Title = styled("h3")`
  color: ${(props) => props.theme.palette.grey[300]};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-normal);
`;

const BackToHome = styled(Link)`
  display: block;
  width: max-content;
  margin: auto;
  padding: 6.5px 20px;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: var(--font-weight-bold);
  &:link,
  &:visited {
    color: ${(props) => props.theme.palette.primary.main};
  }
  &:hover {
    border: 2px solid ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.primary.dark};
  }
`;

const NotFound = () => {
  useEffect(() => {
    document.title = `Page Not Found | Iris - Cardano Blockchain Explorer`;
  }, []);

  return (
    <NotFoundContainer>
      <Image src={NotFoundIcon} alt="404" />
      <Title>Sorry! The page you’re looking for cannot be found.</Title>
      <BackToHome to={routers.HOME}>Back to home</BackToHome>
    </NotFoundContainer>
  );
};
export default NotFound;
