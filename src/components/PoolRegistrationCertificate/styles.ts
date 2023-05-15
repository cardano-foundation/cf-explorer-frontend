import { Box, Grid, IconButton, Typography, styled } from '@mui/material';

export const Title = styled(Typography)`
  font-weight: 700;
  font-size: 24px;
  color: #13152f;
  flex: 1;
  margin-bottom: 20px;
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 80vh;
  overflow: auto;
`;

export const HeaderContainer = styled(Box)`
  display: flex;
`;

export const Content = styled(Grid)`
  display: flex;
`;

export const Card = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #98a2b31a;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  gap: 8px;
`;

export const CardTitle = styled(Typography)`
  font-size: 14px;
  color: #667085;
  font-weight: 700;
`;

export const CardSubTitle = styled(Typography)<{ color?: string }>(
  (props) => `
    font-size: 14px;
    font-weight: 500;
    color: ${props.color ? props.color : '#000'};
    `
);

export const ShowMoreButton = styled(IconButton)`
  width: 30px;
  height: 30px;
  background-color: #e3e5e9;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: #667085;
  width: 3.6px;
  height: 3.6px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    right: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: #667085;
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    left: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: #667085;
  }
`;
