import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 ml-7 mr-7 mb-5">
      <div className="">
        <Link to={"/"}>MyPowerMudgar</Link>
      </div>
      <div>
        <Link to={"/"}>About Us</Link>
        <div>Contact Us:</div>
        <div>Phone:</div>
        <div>Email:</div>
      </div>
      <div>
        <div>Address:</div>
        <div>Pune, MH, India</div>
        <div>India</div>
      </div>
    </div>
  );
};

export default Footer;
