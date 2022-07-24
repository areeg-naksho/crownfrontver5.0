import Image from "next/image";
import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import DropDown from "./Drop_Down";
import headerOne from "./../assets/images/headerOne.png";
import headerTwo from "./../assets/images/headerTwo.png";
import { BsHeadset, BsHandbag } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import logo from "./../assets/images/logo.svg";
import InputSearch from "./InputSearch";
import SmallHeader from "./Header_Small";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { postLogout } from "./../api-services/logout-services";
import { updateCart } from "../state/action/cart-actions";

const Header = ({ props, cart, _updateCart }) => {
  const cookeis = React.useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    let token = cookeis.get("token");
    setLogin(token !== "" && token !== undefined);
  }, [cookeis]);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart !== null && _updateCart(cart);
  }, []);
  return (
    <header className={!props.images ? "header-none-image" : ""}>
      <div className={`nav ${props.images ? "" : "non-images"}`}>
        <nav className={`${props.images ? "" : "not-image"}`}>
          {!props.images ? (
            <div className="logo">
              <a href={"/"}>
                <Image
                    src={logo}
                    className="image-logo"
                    alt="Logo"
                    width={"199px"}
                />{" "}
              </a>
            </div>
          ) : null}
          <InputSearch />
          <ul>
            <li>
              <Link href={"/product"}>Product</Link>
            </li>
            <li className="info">
              <div>Support 24/7</div>
              <div className="info">
                <BsHeadset size={20} /> <span><a href={"tel:+971501234567"}>+ 971 50 123 45 67</a> </span>
              </div>
            </li>
            <li className="user">
              <button
                onClick={() => {
                  if (login) {
                    postLogout().then((res) => {
                      cookeis.remove("token");
                      setLogin(false);
                    });
                  } else {
                    router.push("/login");
                  }
                }}
              >
                <BiUser size={20} />
                <span>{login ? "Logout" : "Login"}</span>
              </button>
            </li>
            <li>
              <Link href={"/cart"} passHref>
                <button>
                  <BsHandbag size={20} />
                  <span className="bag">{cart.length}</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {props.images && (
        <div className="images">
          <div className="image-one">
            <Image src={headerOne} alt="aa" />
          </div>
          <div className="logo-descri">
            <div className="logo">
              <Image
                src={logo}
                className="image-logo"
                alt="Logo"
                width={"199px"}
              />
            </div>
            <p>
              ORGANIC
              <br />
              FRUITS & VEGETABLES FROM LOCAL FARMS
            </p>
          </div>
          <div className="image-two">
            <Image src={headerTwo} alt="5" />
          </div>
        </div>
      )}
      <SmallHeader
        sum={cart.length}
        images={props.images}
        className="small-header"
      />
    </header>
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
    _updateCart: (cart) => dispatch(updateCart(cart)),
  };
};
export default connect(mapStateToPorps, mapDispatchToProps)(Header);
