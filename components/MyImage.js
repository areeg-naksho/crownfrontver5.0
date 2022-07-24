import Image from "next/image";
import React from "react";

export default function MyImage(props) {
  const myLoader = ({ src }) => props.src;

  return (
      <div className={props.width === 50 ? "myimage-container-thumb": "myimage-container"}>
        <img alt="" src={props.src}  />
      </div>

  );
}
