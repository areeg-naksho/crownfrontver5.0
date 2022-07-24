import Link from "next/link";
import React from "react";

export default function BtnCheckOut(props) {
  return (
    <div className="btn-checkout" onClick={props.onClick}>
      <Link href={props.href}>
        <a className="link">CHECKOUT</a>
      </Link>
    </div>
  );
}
