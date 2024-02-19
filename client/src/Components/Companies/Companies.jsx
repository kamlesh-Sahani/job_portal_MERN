import React from "react";
import "./companies.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Redux/Store";
import Loader from "../Loader/Loader";
const CompanyCard = ({
  profileImg,
  name,
  email,
  companyLocation,
  jobPost = [],
  userId,
}) => (
  <Link to={`/profile/${userId}`}>
    <div className="company_card">
      <div className="card_left">
        <img src={`${BASE_URL}/uploads/${profileImg}`} alt="" />
        <div className="name">
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>

      <h3>{companyLocation}</h3>

      <div className="jobs">
        <h3>{jobPost.length}</h3>
        <p>Jobs Posted</p>
      </div>
    </div>
  </Link>
);
const Companies = () => {
  const { data,isLoading } = useSelector((state) => state.allUser);
  return (
    <div className="company">
      {isLoading?<Loader/>:
      data &&
        data.users &&
        data.users.map((user) => {
          if (user.role === "Employer") {
            return (
              <CompanyCard
                key={user._id}
                profileImg={user.profileImg}
                name={user.firstName + user.lastName}
                email={user.email}
                companyLocation={user.companyLocation}
                jobPost={user.jobPost}
                userId={user._id}
              />
            );
          }
        })}
    </div>
  );
};

export default Companies;
