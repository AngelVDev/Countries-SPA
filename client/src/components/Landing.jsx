import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Landing = () => {
  return (
    <div>
      <h1>Welcome to ZA WARUDO</h1>
      <Link to="/home">
        <STYLO_BUTT>Start</STYLO_BUTT>
      </Link>
    </div>
  );
};
const STYLO_BUTT = styled.button`
  color: whitesmoke;
  background: #cb8282;
  &:active {
    filter: hue-rotate(77deg);
  }
  &:focus {
    animation: jello 700ms ease 0s 1 normal forwards;
  }
  @keyframes jello {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
`;

export default Landing;
