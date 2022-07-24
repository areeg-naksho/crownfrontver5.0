import { Button, Col, message, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Select, InputNumber } from "antd";
import { axiosInstance } from "../utils/axios-instance";
import { connect } from "react-redux";
import { updateCart } from "../state/action/cart-actions";
const { TextArea } = Input;

const Checkout = ({ props, cart, _updateCart }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState({
    data: [],
    loading: false,
    selected: null,
  });
  const [states, setStates] = useState({
    data: [],
    displaiedData: [],
    loading: false,
    selected: null,
  });
  const [cities, setCities] = useState({
    data: [],
    displaiedData: [],
    loading: false,
    selected: null,
  });

  useEffect(() => {
    setCountries((prev) => {
      return { ...prev, data: [], loading: true };
    });
    axiosInstance()
      .get("/api/country")
      .then((res) => {
        setCountries((prev) => {
          return { ...prev, data: res.data.data, loading: false };
        });
      });

    setCities((prev) => {
      return { ...prev, data: [], loading: true };
    });
    axiosInstance()
      .get("/api/city")
      .then((res) => {
        setCities((prev) => {
          return { ...prev, data: res.data.data, loading: false };
        });
      });

    setStates((prev) => {
      return { ...prev, data: [], loading: true };
    });
    axiosInstance()
      .get("/api/state")
      .then((res) => {
        setStates((prev) => {
          return { ...prev, data: res.data.data, loading: false };
        });
      });
  }, []);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);

  useEffect(() => {
    setStates((prev) => {
      return {
        ...prev,
        displaiedData: countries.selected
          ? prev.data.filter((s) => s.country_id === countries.selected)
          : [],
      };
    });
  }, [countries.selected]);

  useEffect(() => {
    setCities((prev) => {
      return {
        ...prev,
        displaiedData: states.selected
          ? prev.data.filter((c) => c.state_id === states.selected)
          : [],
      };
    });
  }, [states.selected]);

  const [visible, setVisible] = React.useState(props.bool);

  const sharedRules = [
    {
      required: true,
      message: "This Field Is Required",
    },
  ];

  const mediaColmns = {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 6 },
  };

  const onSubmit = (values) => {
    setLoading(true);
    axiosInstance()
      .post("/api/order", {
        checkout: values,
        items: cart.data,
      })
      .then((res) => {
        setLoading(false);
        setVisible(false);
        form.resetFields();
        localStorage.removeItem("cart");
        _updateCart([]);
        message.success("the order is done");
      })
      .catch((err) => {
        setLoading(false);
        message.error("the quantity is not enough");
      });
  };

  return (
    <div className="Check_Out">
      {cart.data.length > 0 && (
        <Button type="primary" onClick={() => setVisible(true)}>
          CHECKOUT
        </Button>
      )}
      <Modal
        title="CheckOut"
        centered
        visible={visible}
        onOk={() => {
          form.submit();
        }}
        confirmLoading={loading}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        width={"100%"}
      >
        <Form
          wrapperCol={true}
          labelCol={true}
          layout={"vertical"}
          onFinish={onSubmit}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col {...mediaColmns}>
              <Form.Item
                label="First name:"
                name="first_name"
                rules={sharedRules}
              >
                <Input maxLength={15} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item
                label="Last name: "
                name="last_name"
                rules={sharedRules}
              >
                <Input maxLength={15} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item label="Email: " name="email" rules={sharedRules}>
                <Input type={"email"} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item label="Phone: " name="phone" rules={sharedRules}>
                <InputNumber type={"number"} maxLength={10} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item
                rules={sharedRules}
                name="country_id"
                label="Country: "
              >
                <Select
                  loading={countries.loading}
                  placeholder="Select country"
                  value={countries.selected}
                  disabled={loading}
                  onChange={(value) => {
                    setCountries((prev) => {
                      return {
                        ...prev,
                        selected: value,
                      };
                    });
                    setStates((prev) => {
                      return {
                        ...prev,
                        selected: null,
                      };
                    });
                    setCities((prev) => {
                      return {
                        ...prev,
                        selected: null,
                      };
                    });
                  }}
                >
                  {countries.data.map((country) => (
                    <Select.Option key={country.id} value={country.id}>
                      {country.name_en}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item label="State: " name="state_id" rules={sharedRules}>
                <Select
                  loading={states.loading}
                  placeholder="Select state"
                  disabled={countries.selected === null || loading}
                  value={states.selected}
                  onChange={(value) => {
                    setStates((prev) => {
                      return {
                        ...prev,
                        selected: value,
                      };
                    });
                    setCities((prev) => {
                      return {
                        ...prev,
                        selected: null,
                      };
                    });
                    props.onStateChange(
                      value
                        ? states.data.filter((s) => s.id === value)[0]
                        : null
                    );
                  }}
                >
                  {states.displaiedData.map((state) => (
                    <Select.Option key={state.id} value={state.id}>
                      {state.name_en}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item rules={sharedRules} name="city_id" label="City: ">
                <Select
                  loading={cities.loading}
                  disabled={states.selected === null || loading}
                  value={cities.selected}
                  style={{ width: "100% !important", background: "red" }}
                  placeholder="Select City"
                  onChange={(value) =>
                    setCities((prev) => {
                      return {
                        ...prev,
                        selected: value,
                      };
                    })
                  }
                >
                  {cities.displaiedData.map((city) => (
                    <Select.Option key={city.id} value={city.id}>
                      {city.name_en}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item
                label="Address one: "
                name="address"
                rules={sharedRules}
              >
                <Input maxLength={50} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item
                label="Address two: "
                name="address2"
                rules={sharedRules}
              >
                <Input maxLength={50} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item label="Zip code: " name="zip_code" rules={sharedRules}>
                <InputNumber type={"number"} maxLength={10} disabled={loading} />
              </Form.Item>
            </Col>
            <Col {...mediaColmns}>
              <Form.Item label="Po Box: " name="po_box" rules={sharedRules}>
                <InputNumber type={"number"} maxLength={10} disabled={loading} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToPorps = (state, props) => {
  return {
    cart: state.cart,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { _updateCart: (cart) => dispatch(updateCart(cart)) };
};

export default connect(mapStateToPorps, mapDispatchToProps)(Checkout);
