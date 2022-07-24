import React, { useEffect } from "react";
import Tabell from "./Tabell";
import { IoChevronBackSharp } from "react-icons/io5";
import { useState } from "react";
import BtnCheckOut from "./BtnCheckOut";
import { Col, Modal, Row } from "antd";
import "antd/dist/antd.css";
import { Form, Input, InputNumber } from "antd";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import Link from "next/link";
import { updateCart } from "../state/action/cart-actions";
const { TextArea } = Input;

const YourCart = ({ products, props, settings, _updateCart, cart }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);

  let subTotal = 0;
  let quantities = 0;
  cart.map((e) => {
    quantities += e.quantity;
    let filterRes = products.data.filter((p) => p.id === e.product_id)[0];
    subTotal += filterRes
      ? (filterRes.discount_price
          ? filterRes.discount_price
          : filterRes.price) * e.quantity
      : 0;
  });

  let total = subTotal;
  let tax = (total / 100) * parseFloat(settings[0] ? settings[0].value : 0);
  let shipping = state !== null ? parseFloat(state.default_shipping) : 0;
  if (quantities > parseFloat(settings[1] ? settings[1].value : 0)) {
    shipping += state
      ? (quantities - parseFloat(settings[1] ? settings[1].value : 0)) *
        parseFloat(state.extra_shipping)
      : 0;
  }
  total += tax;
  total += shipping;

  return (
    <div className="your-cart">
      <div className="container">
        <h2>Your Cart</h2>
        <Tabell />
        <div className="footer-tabel">
          <div className="total">
            <div className="info">
              <h3>SUBTOTAL</h3>
              <h5>TAX</h5>
              <h5>SHIPPING</h5>
              <h3>TOTAL</h3>
              <p>{cart ? cart.length : 0} items</p>
            </div>
            <Link href={"/"} passHref>
              <a>
                <IoChevronBackSharp />
                CONTINUE SHOPPING
              </a>
            </Link>
          </div>
          <div className="detalis">
            <div className="info-right">
              <h3>AED {subTotal}</h3>
              <h5>AED {tax}</h5>
              <h5>AED {shipping}</h5>
              <h3>AED {total}</h3>
              <p>(VAT INCLUDED)</p>
              <p className="note">Free delivery from 40 AED</p>
            </div>

            <div className="Check_Out">
              <Checkout onStateChange={setState} />
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
    settings: state.settings.data,
    products: state.products,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { _updateCart: (cart) => dispatch(updateCart(cart)) };
};

export default connect(mapStateToPorps, mapDispatchToProps)(YourCart);
