import React from "react";
import Image from "next/image";
import honey from "../assets/images/honey.png";
import fruit from "../assets/images/fruit.png";
// import ViewAll from './View_All';

const SpecialOffer = () => {
  return (
    <div className="special-offer">
      <div className="container">
        <div className="title-special">
          Special Offer
          {/* <ViewAll /> */}
        </div>
        <br />
        <div className="offers">
          <div className="honey">
            <div className="info">
              <h3 className="name">Sidr Honey 500 g</h3>
              <div className="time-valid">Valid till 01.01.2022</div>
            </div>
            <div className="image">
              <Image src={honey} alt="Honey" />
            </div>
          </div>
          <div className="fruits">
            <div className="info">
              <h3 className="name">
                50% Season fruits
              </h3>
              <div className="time-valid">Valid till 01.01.2022</div>
            </div>
            <div className="image">
              <Image src={fruit} alt="fruit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
