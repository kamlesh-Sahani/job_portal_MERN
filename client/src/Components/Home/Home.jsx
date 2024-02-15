import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./home.scss";
import JobCard from "../JobCard/JobCard";
import { useSelector, useDispatch } from "react-redux";
import CompanyLogo from "../CompanyLogo/CompanyLogo";
import { fetchAllJobs } from "../../Redux/Slices/Jobs/getAllJobs";
const Home = () => {
  const { isoading, data } = useSelector((state) => state.getAllJobs);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [filterObj, setFilterObj] = useState({});
  const [keyword, setKeyword] = useState("");
  const filterKey = [
    "company",
    "jobTitle",
    "jobType",
    "exp",
    "jobLocation",
    "salary",
    "postAt",
  ];
  const jobTitle = [
    "Software Engineer",
    "Developer",
    "MERN Stack",
    "Remote",
    "Internship",
    "Full Time",
    "Sale",
    "Bussiness anaylitics",
  ];
  const filters = {
    // heading:[filters.....]
    Company: [
      "All",
      "Microsoft",
      "Google",
      "Meta",
      "Amazon",
      "Filpkart",
      "cognizant",
    ],
    Role: [
      "All",
      "Software Engineer",
      "Web Developer",
      "Frontend",
      "Backend Developer",
      "Full Stack Developer",
    ],
    "Job-Type": ["All", "Full Time", "Part time", "Freelance", "Intern"],
    Experience: ["All", "Under 1 year", "1-2 Year", "2-6 Year", "Over 6 Year"],
    Location: ["All", "India", "Nepal", "America", "London", "Canada"],
    Salary: ["All", "Any", "50k", "100k", "200k", "500k", "1000k"],
    "Date of posting": ["All", "Last 24 hours", "Last 7 days", "Last month"],
  };
  const filtersRender = () => {
    const filterArr = Object.entries(filters);

    return filterArr.map(([key, value], i) => (
      <div className="filter" key={i}>
        <h3>{key}</h3>
        {value.map((value, index) => (
          <label className="filter_item" key={index}>
            <input
              type="checkbox"
              key={index}
              onChange={() => handleFilterChange(filterKey[i], value)}
            />
            {value}
          </label>
        ))}
      </div>
    ));
  };

  //handle the filter Change

  const handleFilterChange = (filterName, value) => {
    setFilterObj((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (!newFilters[filterName]) {
        newFilters[filterName] = [value];
      } else {
        if (newFilters[filterName].includes(value)) {
          // Remove value if already selected
          newFilters[filterName] = newFilters[filterName].filter(
            (v) => v !== value
          );
        } else {
          // Add value if not selected
          newFilters[filterName] = [...newFilters[filterName], value];
        }
      }
      return newFilters;
    });
  };
  useEffect(() => {
    dispatch(fetchAllJobs({ keyword: keyword, page: page, ...filterObj }));
  }, [page, dispatch, filterObj, keyword]);
  return (
    <>
      {isoading ? (
        "Loading"
      ) : (
        <div className="home">
          {/* home Header */}
          <div className="home_header">
            <h1>
              Find the <span>most</span> exciting <span>startup</span> jobs
            </h1>
            <div className="search">
              <IoSearch />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="sample">
              {jobTitle.map((jobTitle, index) => (
                <button key={index} onClick={() => setKeyword(jobTitle)}>
                  {jobTitle}
                </button>
              ))}
            </div>
          </div>

          {/* home  Main */}

          <div className="home_main">
            {/* filter  */}
            <div className="main_filter">
              <h3>Filter Search</h3>
              <div className="filters">{filtersRender()}</div>
            </div>
            {/* job card */}
            <div className="main_jobs">
              <div className="jobs_heading">
                <p>
                  Showing:{" "}
                  <span style={{ color: "#4070F4" }}>
                    {data && data.totalJobs}{" "}
                  </span>{" "}
                  Jobs Available
                </p>
              </div>
              <div className="jobs_box" id="scroll_job">
                {data && data.jobs && data.jobs.length > 0 ? (
                  <>
                    {data.jobs.map((job) => (
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
                    ))}
                  </>
                ) : (
                  <h1 className="null_jobs">Job Is Not Found</h1>
                )}
              </div>{" "}
              {/* pagination  */}
              <div className="pagination">
                <div></div>
                <div className="page_btn">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    {"<"}
                  </button>
                  {Array.from({ length: data?.totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPage(index + 1)} // Set the page directly here
                      value={index + 1}
                      className={page === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    disabled={page === data?.totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* companies logoss */}
          <CompanyLogo />
        </div>
      )}
    </>
  );
};

export default Home;
