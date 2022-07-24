import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import ViewAll from "./ViewAll";
import Link from "next/link";
import Product_Filter from "./Product_Filter";
import BtnCheckOut from "./BtnCheckOut";
const Wichlis = () => {
  const [view, setView] = React.useState(false);

  return (
    <div className="container-wichlist">
        <div className={'divider'} />
      <h1>You May Also Like</h1>
      <div className="views-wichlist">
        <div className="view-wichlist">
          <ViewAll onClick={() => setView(!view)} />
        </div>
      </div>

      <Product_Filter view={view} />
      <div className="container-btn">
        <div className="btn-back">
          <FiChevronLeft size={20} />
          <Link href={"/"}>
            <a className="link"> BACK TO CATALOG</a>
          </Link>
        </div>
        <BtnCheckOut href={"/cart"} />
        <div className="btn-viewAll">
          {" "}
          <ViewAll onClick={() => setView(!view)} />
        </div>
      </div>
    </div>
  );
};

export default Wichlis;
