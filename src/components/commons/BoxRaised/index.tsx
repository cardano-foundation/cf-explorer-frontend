import styled from "@emotion/styled";

export const BoxRaised = styled.div`
  background: ${(props) => props.theme.palette.secondary[0]};
  box-shadow: ${(props) => props.theme.shadow.card};
  padding: 20px;
  border-radius: 12px;
`;
