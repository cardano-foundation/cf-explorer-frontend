import styled from "@emotion/styled";

export const BoxRaised = styled.div`
  background: #ffffff;
  box-shadow: ${props => props.theme.shadowRaised};
  padding: 20px;
  border-radius: 12px;
`;
