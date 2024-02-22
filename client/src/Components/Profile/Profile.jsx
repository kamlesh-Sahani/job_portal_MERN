import React, { useEffect } from "react";
import JobCard from "../JobCard/JobCard";
import "./profile.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/Slices/User/getUser";
import { Link, Navigate } from "react-router-dom";
import { BASE_URL } from "../../Redux/Store";
import { fetchLogoutUser } from "../../Redux/Slices/User/logoutUser";
import { fetchUserMe } from "../../Redux/Slices/User/loadUser";
import Loader from "../Loader/Loader";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.fetchUser);
  const { data: meData } = useSelector((state) => state.userMe);
  const { data: logoutData, isLoading: logoutLoading } = useSelector(
    (state) => state.logoutUser
  );
  const logoutHandler = () => {
    dispatch(fetchLogoutUser());
  };
  useEffect(() => {
    dispatch(fetchUser(id));
    if (!logoutLoading) {
      if (logoutData) {
        alert(logoutData.message);
        dispatch(fetchUserMe());
      }
    }
  }, [id, logoutData, logoutLoading]);

  return (
  
        <div className="userProfile">
          {logoutData && logoutData.success && <Navigate to={"/"} />}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="userProfile_box">
              <div className="userProfile_btn">
                <button className="logout_user" onClick={logoutHandler}>
                  Logout
                </button>

                {meData?.user?._id === data?.user?._id ? (
                  <Link to={`/edit/${data?.user?._id}`}>
                    <div className="edit_box">
                      <button>Edit Profile</button>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>

              <div className="profile_head">
                <img
                  src={`${BASE_URL}/uploads/${data?.user?.profileImg}`}
                  alt=""
                />
                <div className="head_about">
                  <div>
                    <h4>User ID</h4>
                    <p>{data?.user?._id}</p>
                  </div>
                  <div>
                    <h4>Role</h4>
                    <p>{data?.user?.role}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{data?.user?.email}</p>
                  </div>
                  <div>
                    <h4>Name</h4>
                    <p>{data?.user?.firstName + data?.user?.lastName}</p>
                  </div>
                </div>
              </div>
              {data?.user?.role === "Employer" && (
                <div className="profile_mid">
                  <h3>
                    About{" "}
                    {meData?.user?._id === data?.user?._id
                      ? "Me"
                      : data?.user?.firstName + data?.user?.lastName}
                  </h3>
                  <p>{data?.user?.jobDes}</p>
                </div>
              )}
              {data?.user?.role === "Employer" && (
                <div className="profile_bottom">
                  <h2>
                    {meData?.user?._id === data?.user?._id
                      ? "My"
                      : data?.user?.firstName + data?.user?.lastName}{" "}
                    Jobs
                  </h2>
                  <div className="company_post">
                    {data &&
                      data.user &&
                      data.user?.jobPost.map((job) => (
                        <JobCard
                          key={job._id}
                          jobId={job._id}
                          jobTitle={job.jobTitle}
                          jobLocation={job.jobLocation}
                          jobDes={job.jobDes}
                          skill={job.skill}
                          salary={job.salary}
                          jobType={job.jobType}
                          noOfApplication={job.noOfApplication}
                          noOfVaccancies={job.noOfVaccancies}
                          owner={job.owner}
                          postAt={job.postAt}
                          profileImg={data?.user?.profileImg}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
  );
};

export default Profile;
