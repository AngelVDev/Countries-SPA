import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Landing = () => {
  return (
    <DIV>
      <h2>Welcome to THE WORLD</h2>
      <Link to="/home">
        <STYLO_BUTT>Start</STYLO_BUTT>
      </Link>
    </DIV>
  );
};
export const DIV = styled.div`
  /* align: center; */
  font-family: "Garamond", serif;
  font-smooth: subpixel-antialiased;
  text-align: center;
  color: white;
  background: radial-gradient(#fed36d 0%, #e2b349 65%, #c38822 100%);
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
const STYLO_BUTT = styled.button`
  color: white;
  position: absolute;
  outline: none;
  top: 80%;
  left: 50%;
  background: #64b534;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 1px 35px 10px #fed36d;
  }
  &:active {
    filter: hue-rotate(77deg);
  }
  &:focus {
    animation: back 1350ms ease 0s 1 normal backwards;
  }
  @keyframes back {
    0% {
      opacity: 1;
      transform: rotateX(0deg);
      transform-origin: left;
    }

    100% {
      opacity: 0;
      transform: rotateX(-100deg);
      transform-origin: left;
    }
  }
`;
export default Landing;
