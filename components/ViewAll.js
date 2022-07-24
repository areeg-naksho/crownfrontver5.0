import React from "react";
import { FiChevronDown } from "react-icons/fi";

export default function ViewAll(props) {
  return (
    <div className="viewAll-catalog" onClick={props.onClick}>
      VIEW ALL
      <FiChevronDown size={20} />
    </div>
  );
}
