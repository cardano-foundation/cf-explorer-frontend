import { Container, styled } from "@mui/material";

export const HeaderContainer = styled("header")<{ isHome: boolean }>`
  background-image: ${props => (props.isHome ? props.theme.linearGradientGreen : `none`)};
  color: ${props => props.theme.textColorReverse};
  position: relative;
  @media (max-width: 1023px) {
    padding-top: 78px;
    background-image: ${props => props.theme.linearGradientGreen};
  }
`;

export const HeaderBox = styled(Container)<{ isHome: boolean }>`
  ${props =>
    props.isHome
      ? ``
      : ` 
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items:center;
      `}
`;
export const HeaderBackground = styled("div")<{ isHome: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => props.theme.headerBackgroundImage};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  mix-blend-mode: luminosity;
  display: ${props => (props.isHome ? "block" : "none")};
  @media screen and (max-width: 1023px) {
    display: block;
  }
`;

export const HeaderTop = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 30px 0px;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const HeaderMain = styled("div")<{ isHome: boolean }>`
  position: relative;
  text-align: center;
  padding: ${props => (props.isHome ? "80px 0px 170px" : "20px 0px")};
  & > div {
    padding-top: ${props => (props.isHome ? "0px" : "30px")};
    margin-bottom: ${props => (props.isHome ? "0px" : "calc(-25px - 1.5715rem)")};
  }
  @media screen and (max-width: 767px) {
    padding: 62px 0px 48px;
    padding: ${props => (props.isHome ? "62px 0px 48px" : "20px 0px")};
  }
`;

export const Title = styled("h1")<{ isHome: boolean }>`
  color: ${props => props.theme.textColorReverse};
  display: ${props => (props.isHome ? "block" : "none")};
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;
