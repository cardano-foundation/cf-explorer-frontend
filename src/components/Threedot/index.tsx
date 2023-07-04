import { Box, styled } from "@mui/material";

export const StyledThreeDot = styled(Box)`
  position: relative;
  left: -9999px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #3272a8;
  color: #3272a8;
  box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
  animation: dot-typing 1.5s infinite linear;

  @keyframes dot-typing {
    0% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
    16.667% {
      box-shadow: 9984px -10px 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
    33.333% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
    50% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px -10px 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
    66.667% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
    83.333% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px -10px 0 0 #3272a8;
    }
    100% {
      box-shadow: 9984px 0 0 0 #3272a8, 9999px 0 0 0 #3272a8, 10014px 0 0 0 #3272a8;
    }
  }
`;
