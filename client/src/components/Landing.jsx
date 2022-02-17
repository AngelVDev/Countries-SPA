import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./BUTT.css";

export const Landing = () => {
  return (
    <DIV>
      <h1>Welcome to THE WORLD</h1>
      <Link to="/countries">
        <STYLO_BUTT>ENTER</STYLO_BUTT>
      </Link>
    </DIV>
  );
};
export const DIV = styled.div`
  font-family: "Alegreya Sans SC";
  font-size: 2.4rem;
  font-smooth: subpixel-antialiased;
  font-weight: bold;
  text-align: center;
  text-shadow: 0px 2px 3px rgba(123, 255, 207, 0.9), -5px -1px 10px #03071e,
    -3px 14px 27px #201616;
  color: #ae2012;
  /* box-shadow: 3px 1px 73px 1px #161612; */
  padding-bottom: 3%;
  animation: hojita 1370ms ease-in 0s 1 normal backwards;
  @keyframes hojita {
    0% {
      opacity: 0;
      transform: translateX(-250px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
const STYLO_BUTT = styled.button`
  ${"BUTT.css"}
`;

export default Landing;
