import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Catalog from "../components/Catalog";
import BtnCheckOut from "../components/BtnCheckOut";
import ViewAll from "../components/ViewAll";
import Link from "next/link";

const Product = () => {
  return (
    <div className="container-product">
      <div className="name_product"></div>
      <Catalog />
      <div className="container-btn">
        <div className="btn-back">
          <FiChevronLeft size={20} />
          <Link href={"/"}>
            <button className="btn-back">BACK TO CATALOG</button>
          </Link>
        </div>
        <BtnCheckOut href={"/cart"} />
        <div className="view_product">
          {" "}
          <ViewAll />{" "}
        </div>
      </div>
    </div>
  );
};

export default Product;
