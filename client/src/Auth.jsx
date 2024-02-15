import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Auth = ({ childern }) => {
  const {data } = useSelector((state) => state.userMe);
  if (!data) {
    return <Navigate to={"/account/login"} replace={true}></Navigate>;
  }
  
  return childern;
};

export default Auth;
