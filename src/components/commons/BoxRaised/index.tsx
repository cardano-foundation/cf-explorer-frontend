import styled from "@emotion/styled";

export const BoxRaised = styled.div`
  background: ${props => props.theme.boxBackgroundColor};
  box-shadow: ${props => props.theme.shadow_0};
  padding: 20px;
  border-radius: 12px;
`;
