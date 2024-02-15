import React, { useEffect, useState } from "react";
import "./profileedit.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUpadetUser } from "../../Redux/Slices/User/updateProfile";
import { fetchUserMe } from '../../Redux/Slices/User/loadUser';
const ProfileEdit = () => {
  const { id } = useParams();
  const { isLoading, data } = useSelector((state) => state.upadetUser);
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const valueHandler = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchUpadetUser({id,...updateData}));
  };

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        alert(data.message);
        setUpdateData({
          firstName: "",
          lastName: "",
          email: "",
        });
        dispatch(fetchUserMe())
      }
    }
  }, [dispatch, isLoading,data]);

  return (
    <div className="profileEdit">
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="edit_item">
          <label>First Name</label>
          <input
            type="text"
            placeholder="eg piyush"
            name="firstName"
            value={updateData.firstName}
            onChange={valueHandler}
          />
        </div>
        <div className="edit_item">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="eg agarwal"
            name="lastName"
            value={updateData.lastName}
            onChange={valueHandler}
          />
        </div>
        <div className="edit_item">
          <label>Email</label>
          <input
            type="email"
            placeholder="eg. piyush@gmail.com"
            name="email"
            value={updateData.email}
            onChange={valueHandler}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
