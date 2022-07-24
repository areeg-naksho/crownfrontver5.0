import React, { useState } from "react";
import { useRouter } from "next/router";
import InputSearch from "./InputSearch";
import ProductsFilter from "./Product_Filter";
import ViewAll from "./ViewAll";
import Tree from "./Tree";
import { connect } from "react-redux";

const Catalog = ({ categories, props }) => {
  const [view, setView] = useState(false);
  const [category, setCategory] = useState();
  const route = useRouter();
  const handleOnChange = (e) => {
    setCategory(e.index);
  };
  const handleOnClick = (e) => {
    setCategory(e);
  };

  return (
    <div className="container-catalog">
      <h1 className="catalog">
        {/* {props.name} <span className="doc">{props.doc}</span> */}
      </h1>
      <div className="continer-search">
        {route.asPath === "/" && <InputSearch />}
        <ViewAll onClick={() => setView(!view)} />
      </div>
      {route.asPath === "/" && (
        <div className="filters">
          {categories.data.map((category) => (
            <div
              onClick={() => handleOnClick(category.id)}
              className="filter"
              key={category.id}
            >
              {category.name_en}
            </div>
          ))}
        </div>
      )}
      <div className="container-tree-carts">
        <Tree onClick={handleOnChange} />
        <div className="con-carts">
          <ProductsFilter filter={category} view={view} pagination={true} />
        </div>
      </div>
    </div>
  );
};

const mapStateToPorps = (state, props) => {
  return {
    categories: state.categories,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToPorps, mapDispatchToProps)(Catalog);
