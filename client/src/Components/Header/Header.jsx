import React, { useState } from "react";
import "./header.scss";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../Redux/Store";
const Header = () => {
  const { data } = useSelector((state) => state.userMe);
  const [responsiveBar, setResponsiveBar] = useState(false);
  return (
    <div className="header">
      <Link to={'/'}>
      <div className="logo">
        <h1>
          Work<span>Buzz</span>
        </h1>
      </div>
      </Link>

      {/* // only if the show links when the user is logged/  */}
      {data && data.user ? (
        <>
          {" "}
          <div className="links">
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
          <Link to={`/profile/${data?.user?._id}`}>
            <div className="profile">
              <img src={ `${BASE_URL}/uploads/${data?.user?.profileImg}`} alt="" />
              <div className="text">
                <h4>{data?.user?.firstName} <span></span> {data?.user?.lastName}</h4>
                <p>{data?.user?.email}</p>
              </div>
            </div>
          </Link>
          {/* side bar for mobile version */}
          <FaBars
            onClick={() => setResponsiveBar((pre) => !pre)}
            className="sideBarIcon"
          />
          {responsiveBar ? (
            <div className="sideBox">
              <FaBars onClick={() => setResponsiveBar((pre) => !pre)} />
              <div className="bar_sideBar">
                <div className="bar_links">
                  <Link
                    to={"/"}
                    onClick={() => setResponsiveBar((pre) => !pre)}
                  >
                    Home
                  </Link>
                  <a
                    href="#scroll_job"
                    onClick={() => setResponsiveBar((pre) => !pre)}
                  >
                    Find Jobs
                  </a>
                  <Link
                    to={"/companies"}
                    onClick={() => setResponsiveBar((pre) => !pre)}
                  >
                    Companies
                  </Link>
                  {data && data.user && data.user.role === "Employer" ? (
                    <Link
                      to={"/post-job"}
                      onClick={() => setResponsiveBar((pre) => !pre)}
                    >
                      Upload job
                    </Link>
                  ) : (
                    ""
                  )}

                  <Link
                    to={"/about"}
                    onClick={() => setResponsiveBar((pre) => !pre)}
                  >
                    About us
                  </Link>
                </div>
                <Link to={`/profile/${data?.user?._id}`}>
                  <div className="bar_profile">
                    <img  src={ `${BASE_URL}/uploads/${data?.user?.profileImg}`}  alt="" />
                    <div className="text">
                      <h4>{data?.user?.firstName + data?.user?.lastName}</h4>
                      <p>{data?.user?.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className="btn">
            <Link to={"/account/login"}>
              <button>Login</button>
            </Link>
            <Link to={"/account/Signup"}>
              <button className="active">sign up</button>
            </Link>
          </div>
          <FaBars
            className="bar"
            onClick={() => setResponsiveBar((pre) => !pre)}
          />

          {/* responsive time */}
          <div className="sideBar">
            {responsiveBar ? (
              <div className="sideBar_btn">
                <Link to={"/account/login"}>
                  <button onClick={() => setResponsiveBar((pre) => !pre)}>
                    Login
                  </button>
                </Link>
                <Link to={"/account/Signup"}>
                  <button
                    className="active"
                    onClick={() => setResponsiveBar((pre) => !pre)}
                  >
                    sign up
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
