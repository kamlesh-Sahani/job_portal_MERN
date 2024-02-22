import React, { useEffect, useState } from "react";
import "./createjob.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewJob } from "../../Redux/Slices/Jobs/newJob";
import Loader from "../Loader/Loader";
const CreateJob = () => {
  const { isLoading, data } = useSelector((state) => state.newJob);
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDes: "",
    skill: "",
    salary: "",
    jobType: "",
    noOfVaccancies: "",
  });
  const valueHandler = (e) => {
    const { name, value } = e.target;
    setJobData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchNewJob(jobData));
  };

  useEffect(() => {
    if (!isLoading && data) {
      alert(data?.message);
      setJobData({
        jobTitle: "",
        jobLocation: "",
        jobDes: "",
        skill: "",
        salary: "",
        jobType: "",
        noOfVaccancies: "",
      });
    }
  }, [isLoading, data]);
  return (
    <div className="createJob">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="box">
          <label>Job Title</label>
          <input
            type="text"
            placeholder="Web Developer"
            className="int-5"
            name="jobTitle"
            onChange={(e) => valueHandler(e)}
            value={jobData.jobTitle}
            required
          />
        </div>
        <div className="box">
          <label>Salary</label>
          <input
            type="text"
            placeholder="eg. 50k (in dollar)"
            className="int-5"
            name="salary"
            onChange={(e) => valueHandler(e)}
            value={jobData.salary}
            required
          />
        </div>
        <div className="box">
          <label>Job Type</label>
          <input
            type="text"
            placeholder="eg Full Time  Internship .."
            onChange={(e) => valueHandler(e)}
            name="jobType"
            value={jobData.jobType}
            required
          />
        </div>
       
        <div className="box">
          <label>No of Vaccancies</label>
          <input
            type="text"
            placeholder="16"
            onChange={(e) => valueHandler(e)}
            name="noOfVaccancies"
            value={jobData.noOfVaccancies}
            required
          />
        </div>
        <div className="box">
          <label>Location</label>
          <input
            type="text"
            placeholder="eg . India 
  "
            name="jobLocation"
            onChange={(e) => valueHandler(e)}
            value={jobData.jobLocation}
            required
          />
        </div>

        <div className="box">
          <label>Skills Required</label>
          <input
            type="text"
            placeholder="eg. HTML CSS  Javascript ..."
            className="int-full"
            onChange={(e) => valueHandler(e)}
            name="skill"
            value={jobData.skill}
            required
          />
        </div>
        <div className="box">
          <label>Job Description</label>
          <textarea
            placeholder="Frontend Developer ..... "
            className="job_dec"
            name="jobDes"
            onChange={(e) => valueHandler(e)}
            value={jobData.jobDes}
            required
          ></textarea>
        </div>
        {isLoading ? (
          <div className="l_box">
            <Loader />
          </div>
        ) : (
          ""
        )}

        <button type="submit">{isLoading ? "Upload.... " : "Post Job"}</button>
      </form>
    </div>
  );
};

export default CreateJob;
