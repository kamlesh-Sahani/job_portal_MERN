import React, { useEffect, useState } from "react";
import './applyCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplyJob } from "../../Redux/Slices/ApplyJob/apply";
import Loader from "../Loader/Loader";
import { Toaster, toast } from 'sonner';

const ApplyCard = ({ jobId }) => {
  const { isLoading, data } = useSelector((state) => state.applyJob);
  const dispatch = useDispatch();
  const [applyData, setApplyData] = useState({
    resume: '',
    portfolio: '',
    linkedin: '',
    expectedSalary: '',
    mobileNumber: ''
  });

  const valueHandler = (e) => {
    const { name, value } = e.target;
    setApplyData((prev) => ({
      ...prev,
      [name]: value
    }));
 
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(fetchApplyJob({id:jobId,...applyData}));
  };
  useEffect(()=>{
    if(!isLoading){
      if(data){
        if(data.success){
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
        setApplyData({
          resume: '',
          portfolio: '',
          linkedin: '',
          expectedSalary: '',
          mobileNumber: ''
        })
      }
    }
  },[data,isLoading])
  return (
    <div className="apply">
      <Toaster position="top-center"  richColors  />
      <h1>Apply Job</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="item">
          <label>Resume Link</label>
          <input
            type="text"
            required
            placeholder="Resume link"
            name="resume"
            onChange={(e) => valueHandler(e)}
            value={applyData.resume}
          />
        </div>

        <div className="item">
          <label>Portfolio Link</label>
          <input
            type="text"
            required
            placeholder="Portfolio link"
            name="portfolio"
            onChange={(e) => valueHandler(e)}
            value={applyData.portfolio}
          />
        </div>

        <div className="item">
          <label>Linkedin Profile Link</label>
          <input
            type="text"
            required
            placeholder=" Linkedin profile link"
            name="linkedin"
            onChange={(e) => valueHandler(e)}
            value={applyData.linkedin}
          />
        </div>

        <div className="item">
          <label>Expected salary</label>
          <input
            type="text"
            required
            placeholder="eg. 100k "
            name="expectedSalary"
            onChange={(e) => valueHandler(e)}
            value={applyData.expectedSalary}
          />
        </div>
        <div className="item">
          <label>Whatsapp Number</label>
          <input
            type="text"
            required
            placeholder="eg. +9196677XXXXX"
            name="mobileNumber"
            onChange={(e) => valueHandler(e)}
            value={applyData.mobileNumber}
          />
        </div>
        {
          isLoading?<div className="load_box">
          <Loader />
        </div>:""
        }
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplyCard;
