import React, { useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { FiTruck } from "react-icons/fi";
import { RiRoadMapLine } from "react-icons/ri";
import { FiChevronLeft } from "react-icons/fi";
import BtnCheckOut from "./BtnCheckOut";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import MyImage from "./MyImage";
import { axiosInstance } from "../utils/axios-instance";
import {
  addProductToCart,
  removeProductToCart,
  updateCart,
} from "../state/action/cart-actions";

const ProductDetails = ({
  products,
  _addProductToCart,
  _removeProductToCart,
  _updateCart,
  cart,
}) => {
  const router = useRouter();

  const { id } = router.query;
  const filteredProduct = products.filter((e) => e.id == id);
  const product = filteredProduct ? filteredProduct[0] : null;

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);

  const filteredCarts = cart.filter(
    (e) => product && e.product_id === product.id
  )[0];
  const quantity = filteredCarts ? filteredCarts.quantity : 0;

  return (
    product && (
      <div className={'con-container'}>
        <div className="con-product-details">
          <div className="product-details">
            <div className="name-product">{product.name_en}</div>
            <span className="text-NAWA"> NAWA FARMS UAE </span>
            <div className="doc-product">
              <br /> {product.description_en}
              <br /> from our farms. We
              <br />
              are picking the best fresh vegetables from our <br />
              farms We are picking the best fresh
            </div>
          </div>
          <div className="image-product">
            <MyImage
              src={`${
                axiosInstance().defaults.baseURL
              }crownfiles/storage/app/public/${product.image}`}
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="add">
            <div className="price">
              <span
                className={`${
                  product.discount_price ? "old-price" : "new-price"
                }`}
              >
                {product.price}
              </span>

              {product.discount_price && (
                <>
                  <br />
                  <span className="new-price">{product.discount_price}</span>
                </>
              )}
              <br />

              <div className="weight">KG</div>
            </div>
            <div className="con-btn">
              <div className="con-amount">
                <div
                  className={`remove `}
                  onClick={() => _removeProductToCart(product.id)}
                >
                  <IoIosRemove />
                </div>
                <span className="amount">{quantity}</span>
                <div
                  className="add"
                  onClick={() => _addProductToCart(product.id)}
                >
                  <IoIosAdd />
                </div>
              </div>
            </div>
            <div className="icons-details">
              <div className="icon-truck">
                <FiTruck size={20} />
                Free delivery 01.01.2022
              </div>
              <div className="icon-map">
                <RiRoadMapLine size={20} />
                Choose delivery location
              </div>
              <BtnCheckOut href={"/cart"} />
            </div>
          </div>
        </div>
        <div className="prodcut_mediaQery">
          <div className="right">
            <div className="name-product">{product.name_en}</div>
            <div className="image-product">
              <MyImage
                src={`${
                  axiosInstance().defaults.baseURL
                }crownfiles/storage/app/public/${product.image}`}
                alt=""
                width={200}
                height={200}
              />
            </div>{" "}
            <div className="Instock">Instock</div>
            <div className="icons-details">
              <div className="icon-truck">
                <FiTruck size={20} />
                Free delivery 01.01.2022
              </div>
              <div className="icon-map">
                <RiRoadMapLine size={20} />
                Choose delivery location
              </div>
              <div className="Free">Free delivery from 40 AED </div>
            </div>
            <div className="btn-back">
              <FiChevronLeft size={20} />
              BACK TO CATALOG
            </div>
          </div>
          <div className="left">
            <div className="add">
              <div className="price">
                <span className="old-price">{product.price}</span>
                <br />
                <span className="new-price">{product.discount_price}</span>
                <br />
                <div className="weight">KG</div>
              </div>
            </div>
            <span className="text-NAWA"> NAWA FARMS UAE </span>
            <div className="doc-product">
              <br /> We are picking the best fresh vegetables
              <br /> {product.description_en}
              <br />
            </div>
            <div className="con-btn">
              <div className="con-amount">
                <div
                  className={`remove `}
                  onClick={() => _removeProductToCart(product.id)}
                >
                  <IoIosRemove />
                </div>
                <span className="amount">{quantity}</span>
                <div
                  className="add"
                  onClick={() => _addProductToCart(product.id)}
                >
                  <IoIosAdd />
                </div>
              </div>
            </div>
            <BtnCheckOut href={"/cart"} />
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToPorps = (state) => {
  return {
    products: state.products.data,
    cart: state.cart.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addProductToCart: (id) => dispatch(addProductToCart(id)),
    _removeProductToCart: (id) => dispatch(removeProductToCart(id)),
    _updateCart: (cart) => dispatch(updateCart(cart)),
  };
};

export default connect(mapStateToPorps, mapDispatchToProps)(ProductDetails);
