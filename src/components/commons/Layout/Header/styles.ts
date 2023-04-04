import { Container, styled } from "@mui/material";

export const HeaderContainer = styled("header")`
  color: ${props => props.theme.palette.text.primary};
  position: relative;
  @media (max-width: 1023px) {
    padding-top: 78px;
  }
`;

export const HeaderBox = styled(Container)<{ home: number }>`
  display: flex;
  gap: 10px;
  ${props =>
    props.home
      ? `flex-direction: column-reverse;`
      : `
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
      `}
  @media (max-width: 1023px) {
    ${props => (props.home ? `` : `justify-content: flex-end;`)}
  }
`;

export const HeaderTop = styled("div")<{ fixed: number }>`
  position: ${props => (props.fixed ? "fixed" : "")};
  top: ${props => (props.fixed ? "0px" : "unset")};
  right: ${props => (props.fixed ? "30px" : "unset")};
  z-index: 1300;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 30px 0px;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const HeaderMain = styled("div")<{ home: number }>`
  position: relative;
  text-align: center;
  padding: ${props => (props.home ? "0px 0px 50px" : "27px 0px")};
  & > div {
    padding-top: ${props => (props.home ? "0px" : "30px")};
    margin-bottom: ${props => (props.home ? "0px" : "calc(-25px - 1.5715rem)")};
  }
  @media screen and (max-width: 767px) {
    padding: 62px 0px 48px;
    padding: ${props => (props.home ? "62px 0px 48px" : "20px 0px")};
  }
`;

export const Title = styled("h1")<{ home: number }>`
  display: ${props => (props.home ? "block" : "none")};
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;
