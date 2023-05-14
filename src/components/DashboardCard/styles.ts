import { styled, Box } from '@mui/material';

export const CardContent = styled(Box)(`
    display: flex;
    align-items: center;
    gap: 15px;
`);

export const TitleGroup = styled(Box)(`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: flex-start;
`);

export const Title = styled('span')(`
    font-size: 16px;
    font-weight: 700;
    color: #344054;
    line-height: 19px;
    text-align: left;
`);

export const SubTitle = styled('span')`
  font-size: 14px;
  line-height: 16px;
  color: #667085;
  text-align: left;
`;
export const Card = styled(Box)`
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;

export const IconContainer = styled(Box)(
  () => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 11px 10px;
    width: 45px;
    height: 45px;
    background: #438F68;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 13px;
`
);
