import { keyframes } from "@emotion/react";

export const slideDownUpFade = keyframes`
  0% {
    top: -100px;
    opacity: 0;
  }
  10% {
    top: 40px;
    opacity: 1;
  }
  90% {
    top: 40px;
    opacity: 1;
  }
  100% {
    top: -100px;
    opacity: 0;
  }
`;
