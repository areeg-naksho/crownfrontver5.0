import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./../assets/images/logo.svg";
import Link from "next/link";
import { axiosInstance } from "../utils/axios-instance";
import { Button, Form, Input, message } from "antd";

const Footer = () => {
  const [social, setSocial] = React.useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    axiosInstance()
      .get("/api/link")
      .then((res) => setSocial(res.data.data));
  }, []);

  const onSubmit = (values) => {
    values !== "" &&
      axiosInstance()
        .post("/api/email", { ...values })
        .then(() => {
          message.success("the Email Is Sent ");
          form.resetFields();
        })
        .catch(() => {
          message.error("The Email Is Not Sent");
        });
  };

  const company = [
    {
      key: 1,
      name: "About",
      href: "/about",
    },
    {
      key: 2,
      name: "Story",
      href: "/story",
    },
    {
      key: 3,
      name: "FAQ",
      href: "/faq",
    },
  ];
  const service = [
    {
      key: 1,
      name: "Delivery",
      href: "/delivery",
    },
    {
      key: 2,
      name: "Payment",
      href: "/payment",
    },
    {
      key: 3,
      name: "Contacts",
      href: "/contacts",
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="assets">
          <div className="logo-footer">
            <Image src={logo} alt="logo" width="130px" height="130px" />
          </div>
          <div className="terms">Terms&Conditions</div>
        </div>
        <div className="links">
          <div className="company urls">
            <h2 className="title">COMPANY</h2>
            {company.map((comp) => {
              return (
                <Link href={comp.href} key={comp.key} className="link">
                  {comp.name}
                </Link>
              );
            })}
          </div>

          <div className="service urls">
            <h2 className="title">SERVICE</h2>
            {service.map((serv) => {
              return (
                <Link href={serv.href} key={serv.key} className="link">
                  {serv.name}
                </Link>
              );
            })}
          </div>
          <div className="follow urls">
            <h2 className="title">FOLLOW US</h2>
            {social.map((foll) => {
              return (
                <Link href={foll.email} key={foll.id} className="link">
                  {foll.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="email">
          <h2 className="title">GET NEWSLETTER</h2>
          <div className="form">
            <Form form={form} onFinish={onSubmit} layout={"vertical"}>
              <Form.Item
                name="email"
                placeholder="E-MAIL"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input className="input" placeholder="E-MAIL" />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="btnSend">
                SUBSCRIBE
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
