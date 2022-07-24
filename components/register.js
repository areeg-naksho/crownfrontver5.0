import { Button, Form, Input, message, Space } from "antd";
import "antd/dist/antd.css";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postRegister } from "../api-services/register-services";
import { useRouter } from "next/router";
import Image from "next/image";

import logo from "./../assets/images/logo.svg";
import { axiosInstance } from "../utils/axios-instance";

const Register = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies("");

  const onSubmit = (values) => {
    postRegister({ ...values })
      .then((res) => {
        setCookie("token", res.data.token, { path: "/" });
        router.push("/");
        message.success("Successfully Registered");
      })
      .catch((err) => {
        message.error("The Account Is Exist");
      });
  };

  return (
    <div className="container-register">
      <Image src={logo} className="image-logo" alt="Logo" width={150} />{" "}
      <div className="cir"></div>
      <div className="register">
        Register
        <Form onFinish={onSubmit} layout={"vertical"}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                type: "string",
                required: true,
              },
            ]}
          >
            <Input className="input" placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input className="input" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="password"
            rules={[
              {
                min: 8,
                max: 20,
                required: true,
              },
            ]}
          >
            <Input.Password
              className="input"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="black" />
                ) : (
                  <EyeInvisibleOutlined twoToneColor="black" />
                )
              }
            />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
            rules={[
              {
                min: 8,
                max: 20,
                required: true,
              },
            ]}
          >
            <Input.Password className="input" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <div className="btnSend">
              <Button type="primary" htmlType="submit" className="btnRegister">
                Create Account
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
