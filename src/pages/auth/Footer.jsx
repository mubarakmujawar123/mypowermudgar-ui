import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 ml-7 mr-7 mb-5">
      <div className="text-3xl hover:underline">
        <Link to={"/"}>MyPowerMudgar</Link>
      </div>
      <div>
        <HashLink smooth to={"/#about-us"} className="hover:underline">
          About Us
        </HashLink>
        <br />
        <HashLink smooth to={"/#contact-us"} className="hover:underline">
          Contact Us
        </HashLink>
        <div></div>
        {/* <div>
          Phone:&nbsp;<span className=" text-blue-700">+91 1234567890</span>
        </div>
        <div>
          WhatsApp:&nbsp;<span className=" text-blue-700">+91 1234567890</span>
        </div>
        <div>
          Email:&nbsp;
          <a
            href="mailto:demo@demo.com"
            className="cursor-pointer text-blue-700 text-ellipsis"
          >
            mypowerMudgar@gmail.com
          </a>
        </div> */}
      </div>
      <div>
        <div>Address:</div>
        <div>Pune, MH</div>
        <div>India</div>
      </div>
    </div>
  );
};

export default Footer;
