import Cart from "./Cart";
import { connect } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import Pagination1 from "./Pagination1";
import { FETCH_PRODUCTS_REQUEST } from "../state/type/product-state";
import { Skeleton } from "antd";

const ProductsFilter = ({ products, props }) => {
  const route = useRouter();

  const [pagination, setPagination] = React.useState(1);
  const quantity = pagination * 8;

  const skeleton = (
    <Skeleton.Button
      className="Skeleton"
      active
      round
      shape="square"
      size="large"
      // style={{ width: 250, height: 350 }}
    />
  );

  const skeletonArr = [skeleton, skeleton, skeleton, skeleton];

  return products.currentState === FETCH_PRODUCTS_REQUEST ? (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      {skeletonArr.map((s, i) => (
        <div className="Skeleton" key={i}>
          {s}
        </div>
      ))}
    </div>
  ) : (
    <>
      <div className="container_filter">
        <div className="carts_filter">
          {props.filter
            ? products.data
                .filter((item) => item.category_id === props.filter)
                .map((product) => (
                  <Cart
                    height={150}
                    width={150}
                    key={product.id}
                    datasource={product}
                  />
                ))
            : props.featured
            ? products.data
                .filter((item) => item.featured === props.featured)
                .map((product, index) =>
                  !props.view ? (
                    index <= 3 && (
                      <Cart
                        height={150}
                        width={150}
                        key={product.id}
                        datasource={product}
                      />
                    )
                  ) : (
                    <Cart
                      height={150}
                      width={150}
                      key={product.id}
                      datasource={product}
                    />
                  )
                )
            : props.view
            ? products.data.map((product) => (
                <Cart
                  height={150}
                  width={150}
                  key={product.id}
                  datasource={product}
                />
              ))
            : quantity
            ? products.data
                .slice(quantity - 8, quantity)
                .map((product) => (
                  <Cart
                    height={150}
                    width={150}
                    key={product.id}
                    datasource={product}
                  />
                ))
            : (route.asPath === "/product" || route.asPath === "/details") &&
              products.data.map(
                (product, index) =>
                  index <= 3 && (
                    <Cart
                      height={150}
                      width={150}
                      key={product.id}
                      datasource={product}
                    />
                  )
              )}
        </div>
      </div>
      <div className="Pagination">
        {props.pagination && route.asPath === "/" && (
          <Pagination1 total={products.data.length} onChange={setPagination} />
        )}
      </div>
    </>
  );
};

const mapStateToPorps = (state, props) => {
  return {
    products: state.products,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToPorps, mapDispatchToProps)(ProductsFilter);
