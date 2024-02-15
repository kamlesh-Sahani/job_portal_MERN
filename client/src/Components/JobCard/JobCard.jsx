import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./jobCard.scss";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Redux/Store";
const JobCard = ({
  jobTitle,
  jobLocation,
  jobDes,
  jobType,
  salary,
  postAt,
  profileImg,
  jobId,
}) => {
  const [difHours, setDifHours] = useState("");
  const [difMinutes, setDifMinutes] = useState("");
  const [difSecond, setDifSecond] = useState("");
  const [difDays, setDifDays] = useState("");

  const currentDateAndTime = new Date();

  useEffect(() => {
    if (postAt) {
      const jobDate = new Date(postAt);
      const timeDifference = currentDateAndTime - jobDate;
  
      // Convert the time difference to days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      setDifHours(hours);
      setDifMinutes(minutes);
      setDifSecond(seconds);
      setDifDays(days);
    }
  }, [postAt, currentDateAndTime]);


  return (
    <Link to={`/job/${jobId}`}>
      <div className="jobCard">
        <div className="card_head">
          <img src={`${BASE_URL}/uploads/${profileImg}`} alt="" />
          <div className="head_right">
            <h2>{jobTitle}</h2>
            <p>
              <FaLocationDot />
              <span>{jobLocation}</span>
            </p>
          </div>
        </div>

        <div className="card_mid">
          <p>{jobDes}</p>
        </div>

        <div className="card_bottom">
          <button>{jobType}</button>
          <p>
            $<span>{salary}</span>
          </p>
          <div className="date">
            <MdDateRange />
            <p id="jobs">
              { difDays?`${difDays} Days` : difHours
                ? `${difHours} Hours`
                : difMinutes
                ? `${difMinutes} Minutes`
                : `${difSecond} Second`}{" "}
              ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
