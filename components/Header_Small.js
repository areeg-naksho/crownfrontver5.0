import React, { useEffect, useState } from "react";
import Image from "next/image";
import InputSearch from "./InputSearch";
import headerTwo from "./../assets/images/headerTwo.png";
import { BsHeadset, BsHandbag } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import logo from "./../assets/images/logo.svg";
import { IconName } from "react-icons/gi";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { postLogout } from "./../api-services/logout-services";

const SmallHeader = ({ images, sum }) => {
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const cookeis = React.useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    let token = cookeis.get("token");
    setLogin(token !== "" && token !== undefined);
  }, [cookeis]);

  const isSticky = (e) => {
    const header = document.querySelector(".head");
    const scrollTop = window.scrollY;
    scrollTop >= 20
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };
  return (
    <div>
      <div className="header">
        <div className="head">
          <ul className="nav-small">
            <li>
              <BsHeadset size={20} />
            </li>
            <li>
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
                  <span className="bag">{sum}</span>
                </button>
              </Link>
            </li>
          </ul>
          <div className="cont">
            <div className="logo">
              <Image src={logo} alt="Logo" width={"140px"} />
            </div>
            <div className="data">
              <p>
                {" "}
                ORGANIC
                <br />
                FRUITS & VEGETABLES FROM LOCAL FARMS
              </p>
              <InputSearch />
            </div>
          </div>
        </div>
        {images ? (
          <div className="image">
            <Image src={headerTwo} alt="5" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SmallHeader;
