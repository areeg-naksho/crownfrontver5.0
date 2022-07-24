import React from "react";
import { Pagination } from "antd";

const showTotal = () => `Total ${5} items`;
export default function Pagination1(props) {
  return (
    <Pagination
      onChange={props.onChange}
      defaultPageSize={8}
      defaultCurrent={1}
      total={props.total}
      size="small"
    />
  );
}
