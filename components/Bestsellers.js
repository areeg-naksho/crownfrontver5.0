import React from "react";
import ProductsFilter from "./Product_Filter";
import ProductFeturedType from "./../constants/product_fetured_type";
import ViewAll from "./ViewAll";

const Bestsellers = () => {
  const [view, setView] = React.useState(false);

  return (
    <div className="container-Bestsellers">
      <div className="view">
        <div className="Bestsellers-text">Bestsellers</div>
        <div className="viewAll">
          <ViewAll onClick={() => setView(!view)} />
        </div>
      </div>

      <div className="container_bestsellers">
        <ProductsFilter featured={ProductFeturedType.featured} view={view} />
      </div>
    </div>
  );
};

export default Bestsellers;
