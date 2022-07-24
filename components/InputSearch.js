import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Se = ({ products }) => {
  const router = useRouter();
  const onChange = (e) => {
    const resultSearch = products.map((item) => item.name_en);
    return resultSearch;
  };

  return (
    <div className="continer-search">
      <div className="search">
        <Select
          dropdownStyle={{ color: "red " }}
          className="input"
          placeholder=" I AM LOOKING FOR"
          onChange={onChange}
          showSearch
          onSelect={(e) => {
            products.filter(
              (s) => s.name_en === e && router.push(`/details/${s.id}`)
            );
          }}
        >
          {products.map((item) => (
            <Select.Option key={item.id} value={item.name_en}>
              {item.name_en}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
const mapStateToPorps = (state, props) => {
  return {
    products: state.products.data,
    props: props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToPorps, mapDispatchToProps)(Se);
