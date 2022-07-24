import React from "react";
import Image from "next/image";
import how from "./../assets/images/how1.png";
import howS from "./../assets/images/howS.png";
import ViewAll from "./ViewAll";

const HowWeWork = () => {
  return (
    <div className="how-we-work">
        <div className="how-text">How Do We Work</div>
      <div className="image_large">
        <Image src={how} alt="" />
      </div>

      <div className="small_screen">
          <div className="how-text">How Do We Work</div>
        <div className="image_small">
          <Image src={howS} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
