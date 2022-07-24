import React, { useState, useEffect } from "react";
import { Space, Table } from "antd";
import { connect } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import MyImage from "./MyImage";
import { axiosInstance } from "../utils/axios-instance";
import {
  addProductToCart,
  removeProductToCart,
  updateCart,
} from "../state/action/cart-actions";

const Tabell = ({
  props,
  products,
  _addProductToCart,
  _removeProductToCart,
  _updateCart,
  cart,
}) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);

  useEffect(() => {
    setDataSource(
      cart.map((a) => {
        let product1;
        products.data.filter((product) => {
          a.product_id === product.id && (product1 = product);
        });
        return {
          ...product1,
          ...a,
        };
      })
    );
  }, [products.data, cart]);

  const columns = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "ITEM NAME",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "PRICE,AED FOR ITEM",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "QUANTITY",
      key: "quantity",
      dataIndex: "quantity",
      render: (value, record) => (
        <Space size="middle">
          <button
            className="btn"
            onClick={() => {
              _removeProductToCart(record.key);
            }}
          >
            <AiOutlineMinus size={20} />
          </button>
          <span>{record.quantity}</span>
          <button
            className="btn"
            onClick={() => {
              _addProductToCart(record.key);
            }}
          >
            <AiOutlinePlus size={20} />
          </button>
        </Space>
      ),
    },
    {
      title: "PRICE,AED",
      key: "total",
      dataIndex: "total",
    },
  ];

  const smallColumns = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "ITEM, PRICE AED",
      dataIndex: "itpri",
      key: "itpri",
    },
    {
      title: "QUANTITY",
      key: "quantity",
      dataIndex: "quantity",
      render: (value, record) => (
        <Space size="middle">
          <button
            className="btn"
            onClick={() => {
              _removeProductToCart(record.key);
            }}
          >
            <AiOutlineMinus size={20} />
          </button>
          <span>{record.quantity}</span>
          <button
            className="btn"
            onClick={() => {
              _addProductToCart(record.key);
            }}
          >
            <AiOutlinePlus size={20} />
          </button>
        </Space>
      ),
    },
    {
      title: "PRICE",
      key: "total",
      dataIndex: "total",
    },
  ];

  const data = dataSource.map((dat) => {
    // const imageType = typeof dat.image;
    // const image = imageType == "string" ? JSON.parse(dat.image)[0] : dat.image;
    return {
      key: dat.id,
      item: dat.name_en,
      image: (
        <div className={"myimage-main-container"}>
            <MyImage
                src={`${axiosInstance().defaults.baseURL}crownfiles/storage/app/public/${dat.image}`}
                alt={"imge"}
                height={50}
                width={50}
            />
        </div>
      ),
      quantity: dat.quantity,
      price: dat.discount_price ? dat.discount_price : dat.price,
      total:
        dat.quantity * (dat.discount_price ? dat.discount_price : dat.price),
      itpri: (
        <div className="par">
          <div>{dat.name_en}</div>
          <div>{dat.discount_price ? dat.discount_price : dat.price}</div>
        </div>
      ),
    };
  });

  return (
    <>
      <Table
        className="tabel"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
      <Table
        className="small tabel"
        columns={smallColumns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </>
  );
};
const mapStateToPorps = (state, props) => {
  return {
    products: state.products,
    props: props,
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

export default connect(mapStateToPorps, mapDispatchToProps)(Tabell);
