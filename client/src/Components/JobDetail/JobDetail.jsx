import React, { useEffect, useState } from "react";
import "./jobDetail.scss";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import JobCard from "../JobCard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJob } from "../../Redux/Slices/Jobs/getJob";
import { useParams } from "react-router-dom";
import ApplyCard from "../ApplyCard/ApplyCard";
import { Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Redux/Store";
import Loader from "../Loader/Loader";
const JobDetail = () => {
  const [selectBtn, setSelectBtn] = useState("job");
  const { isLoading, data } = useSelector((state) => state.getJob);
  const { data: jobData } = useSelector((state) => state.getAllJobs);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [difHours, setDifHours] = useState("");
  const [difMinutes, setDifMinutes] = useState("");
  const [difSecond, setDifSecond] = useState("");

  const [applyBtn, setApplyBtn] = useState(false);

  useEffect(() => {
    dispatch(fetchJob(id));
  }, [id, dispatch]);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDateAndTime = new Date();
      if (data?.job?.postAt) {
        const jobDate = new Date(data.job.postAt);
        const timeDifference = currentDateAndTime - jobDate;

        // Convert the time difference to hours, minutes, and seconds
        setDifHours(Math.floor(timeDifference / (1000 * 60 * 60)));
        setDifMinutes(
          Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        );
        setDifSecond(Math.floor((timeDifference % (1000 * 60)) / 1000));
      }
    };

    calculateTimeDifference();
  }, [data?.job?.postAt]);

  return (
    <div className="jobDetail">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="detail_left">
            <div className="name_logo">
              <div className="img">
                <Link to={`/profile/${data?.job?.owner?._id}`}>
                  <img
                    src={`${BASE_URL}/uploads/${data?.job?.owner?.profileImg}`}
                    alt=""
                  />
                </Link>

                <div className="name">
                  <h2>{data?.job?.jobTitle}</h2>
                  <h3>{data?.job?.jobLocation}</h3>
                  <p className="name_company">
                    {data?.job?.owner?.firstName} <span></span>
                    {data?.job?.owner?.lastName}
                  </p>
                  <p>
                    {difHours
                      ? `${difHours} Hours`
                      : difMinutes
                      ? `${difMinutes} Minutes`
                      : `${difSecond} Second`}{" "}
                    ago
                  </p>
                </div>
              </div>
              <div className="id">
                <RiVerifiedBadgeLine />
                <p>
                  Job ID<span>{data?.job?._id}</span>
                </p>
              </div>
            </div>

            <div className="featureBtn">
              <div className="feature_btn">
                <p>Salary</p>
                <p>${data?.job?.salary}</p>
              </div>
              <div className="feature_btn">
                <p>Job type</p>
                <p>{data?.job?.jobType}</p>
              </div>
              <div className="feature_btn">
                <p>No of applicants</p>
                <p>{data?.job?.noOfApplicants.length}</p>
              </div>
              <div className="feature_btn">
                <p>No of vaccancies</p>
                <p>{data?.job?.noOfVaccancies}</p>
              </div>
            </div>

            <div className="selectBtn">
              <button
                onClick={() => setSelectBtn("job")}
                className={selectBtn === "job" ? "active" : ""}
              >
                Job Description
              </button>
              <button
                className={selectBtn === "company" ? "active" : ""}
                onClick={() => setSelectBtn("company")}
              >
                Company
              </button>
            </div>

            {selectBtn === "job" ? (
              <div className="info_box">
                <div className="description">
                  <h3>Job Description</h3>
                  <p>{data?.job?.jobDes}</p>
                </div>
                <div className="skill">
                  <h3>Skills</h3>
                  <div className="skill_btn">
                    {data &&
                      data.job &&
                      data.job.skill.map((s, i) => (
                        <button key={i}>{s}</button>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="company">
                <div className="company_head">
                  <h3>{`${data?.job?.owner.firstName} ${data?.job?.owner.firstName}`}</h3>
                  <p>{data?.job?.owner?.companyLoaction}</p>
                  <p>{data?.job?.owner?.email}</p>
                </div>
                <div className="company_about">
                  <h3>About Company</h3>
                  <p>{data?.job?.owner?.jobDes}</p>
                </div>
              </div>
            )}
            <button
              className="apply_btn"
              onClick={() => setApplyBtn(!applyBtn)}
            >
              Apply Now
            </button>
          </div>

          <div className="detail_right">
            <p>Similar Job Post</p>
            <div className="right_box">
              {jobData &&
                jobData.jobs.map((job) => {
                  return (
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
                      profileImg={job?.owner?.profileImg}
                    />
                  );
                })}
            </div>
          </div>

          <Dialog open={applyBtn} onClose={() => setApplyBtn(!applyBtn)}>
            <div className="dialogBox">
              <ApplyCard jobId={data && data.job && data.job._id} />
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default JobDetail;
