import React, { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { connect } from "react-redux";
import MyImage from "./MyImage";
import { axiosInstance } from "../utils/axios-instance";
import {
  addProductToCart,
  removeProductToCart,
  updateCart,
} from "../state/action/cart-actions";
import { useRouter } from "next/router";

const Cart = ({
  _addProductToCart,
  _removeProductToCart,
  props,
  cart,
  _updateCart,
}) => {
  const router = useRouter();

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);

  const filteredCarts =
    cart && cart.filter((e) => e.product_id === props.datasource.id)[0];
  const quantity = filteredCarts ? filteredCarts.quantity : 0;

  let flag = true;
  // // const imageType = typeof props.datasource.image;
  // // const image =
  // //   imageType == "string"
  // //     ? JSON.parse(props.datasource.image)
  // //     : JSON.pa;
  return (
    <div
      className=" con-cart"
      onClick={() => {
        if (flag) router.push(`/details/${props.datasource.id}`);
        flag = true;
      }}
    >
      <div className="cart-top">
        <div className="cart-items-top">
          <div className="con-image">
            <MyImage
              src={`${
                axiosInstance().defaults.baseURL
              }crownfiles/storage/app/public/${props.datasource.image}`}
              alt={"image"}
              height={150}
              width={150}
            />
          </div>
          <div className="name">
            <span
              className={`${
                props.datasource.discount_price ? "discount" : "price"
              }`}
            >
              AED {props.datasource.price}
            </span>
            {props.datasource.discount_price && (
              <span
                className={`${
                  props.datasource.discount_price ? "price" : "discount"
                }`}
              >
                AED {props.datasource.discount_price}
              </span>
            )}
            <div className="Name-proudct">{props.datasource.name_en}</div>
            <div className="weight">KG</div>
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 2 }}></div>
      <div className="cart-bottom">
        <div className="con-btn">
          <div className="con-amount">
            <div
              className={`remove ${quantity && 0} r`}
              onClick={(e) => {
                flag = false;
                _removeProductToCart(props.datasource.id);
              }}
            >
              <IoIosRemove />
            </div>
            <span className="amount">{quantity}</span>
            <div
              className="add"
              onClick={() => {
                flag = false;
                _addProductToCart(props.datasource.id);
              }}
            >
              <IoIosAdd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToPorps = (state, props) => {
  return {
    cart: state.cart.data,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addProductToCart: (id) => dispatch(addProductToCart(id)),
    _removeProductToCart: (id) => dispatch(removeProductToCart(id)),
    _updateCart: (cart) => dispatch(updateCart(cart)),
  };
};

export default connect(mapStateToPorps, mapDispatchToProps)(Cart);
