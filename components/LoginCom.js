import { Button, Form, Input, Space } from "antd";
import "antd/dist/antd.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postLogin } from "../api-services/login-services";
import React from "react";
import logo from "./../assets/images/logo.svg";

import { Cookies, useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const LoginCom = () => {
  const cookeis = new Cookies();
  const router = useRouter();

  const onSubmit = (values) => {
    postLogin({ ...values })
      .then((res) => {
        cookeis.set("token", res.data.token, { path: "/" });
        router.push("/");
        message.success("Successfully Login");
      })
      .catch(message.error("The Account Is Not Exist"));
  };

  return (
    <div className="con2">
      <div className="con_img">
        <Image src={logo} className="image-logo" alt="Logo" width={150} />{" "}
      </div>
      <div className="login">
        login
        <Form onFinish={onSubmit} layout={"vertical"}>
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
          <div className="button">
            <Button type="primary" htmlType="submit" className="btnSend">
              submit
            </Button>
            <Link href="/register" passHref>
              <Button className="btnSend">Register</Button>
            </Link>
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};
export default LoginCom;
