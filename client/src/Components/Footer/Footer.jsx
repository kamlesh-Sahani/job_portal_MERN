import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./footer.scss";
const Footer = () => {
    const [year,setYear]=useState("");
  const { data } = useSelector((state) => state.userMe);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []); 
  return (
    <div className="footer">
      <div className="footer_head">
        <div className="icon">
          <FaFacebook />
        </div>

        <div className="icon">
          <IoLogoInstagram />
        </div>
        <div className="icon">
          <FaTwitter />
        </div>
        <div className="icon">
          <FaYoutube />
        </div>
        <div className="icon">
          <FaYoutube />
        </div>
        <div className="icon">
          <MdEmail />
        </div>
      </div>

      <div className="footer_mid">
        <Link to={"/"}>Home</Link>
        <Link to={"/#jobs"}>Find Jobs</Link>
        <Link to={"/companies"}>Companies</Link>
        {data && data.user && data.user.role === "Employer" ? (
          <Link to={"/post-job"}>Upload job</Link>
        ) : (
          ""
        )}

        <Link to={"/about"}>About us</Link>
      </div>
      <p>&copy; {year} Your  <span>WorkBuzz</span>. All rights reserved.</p>
    </div>
  );
};

export default Footer;
