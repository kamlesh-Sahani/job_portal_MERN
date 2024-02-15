import React, { useEffect, useState } from "react";
import "./loginAndSignup.scss";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserRegister } from "../../Redux/Slices/User/registerSlice";
import { fetchLoginUser } from "../../Redux/Slices/User/loginSlice";
import { fetchUserMe } from "../../Redux/Slices/User/loadUser";
const LoginAndSignup = () => {
  let { id } = useParams();
  if (id !== "login" && id !== "Signup") {
    id = "Signup";
  }
  const [heading, setHeading] = useState(id);
  const [selectRole, setSelectRole] = useState("Employer");
  const [about, setAbout] = useState("");
  const [location, setLocaton] = useState("");
  const [profileImg,setProfileImg] = useState("");

  const dispatch = useDispatch();

  const { data: registerData, isLoading: rLoading } = useSelector(
    (state) => state.useRegister
  );
  const { data: loginData, isLoading: lLoading } = useSelector(
    (state) => state.userLogin
  );

  // Data for Register
  const [registerUserData, setRegisterUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    jobDes: "",
    companyLocation: "",
  });

  //Data for Login
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  // input tags
  const inputTag = {
    // name :[placeholder,type]
    email: ["Email", "email"],
    firstName: ["First Name", "text"],
    lastName: ["Last Name", "text"],
    password: ["password", "password"],
    confirmPassword: ["confirm password", "password"],
    "profileImg": ["image", "file"],
    "Create Account": ["", "submit"],
  };

  // set the user Data for register and Login
  const valueHandler = (e) => {
    const { name, value } = e.target;
    if (name === "profileImg" && e.target.files.length > 0) {
      setProfileImg(e.target.files[0]);
    } else {
      if (heading === "login") {
        setLoginUserData((pre) => ({
          ...pre,
          [name]: value,
        }));
      } else {
        setRegisterUserData((pre) => ({
          ...pre,
          [name]: value,
        }));
      }
    }
  };
  

  // useEffect for Company Location and its description
  useEffect(() => {
    setRegisterUserData((pre) => ({
      ...pre,
      role: selectRole,
      jobDes: about,
      companyLocation: location,
    }));
  }, [location, about, selectRole]);

  // render tag function

  const renderInputTag = () => {
    const inputTagArr = Object.entries(inputTag);

    // check login page or signup page and modify it
    let modifyInputArr = inputTagArr;
    if (heading === "login") {
      modifyInputArr = inputTagArr.filter(
        (input) =>
          input[0] === "email" ||
          input[0] === "password" ||
          input[0] === "Create Account"
      );
    }

    return modifyInputArr.map(([key, value]) => (
      <input
        type={value[1]}
        name={key}

        key={key}
        onChange={(e) => valueHandler(e)}
        required={key==="lastName"?true:false}
        placeholder={key ==="lastName"?`${value[0]} optional`:value[0]}
      />
    ));
  };

  // dispatch the redux api and submit the form
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName",registerUserData.firstName)
    formData.append("lastName",registerUserData.lastName)
    formData.append("role",registerUserData.role)
    formData.append("email",registerUserData.email)
    formData.append("password",registerUserData.password)
    formData.append("confirmPassword",registerUserData.confirmPassword)
    formData.append("profileImg",profileImg)
    formData.append("jobDes",registerUserData.jobDes)
    formData.append("companyLocation",registerUserData.companyLocation)
    if (heading === "login") {
      dispatch(fetchLoginUser(loginUserData));
    } else {
      dispatch(fetchUserRegister(formData));
    }

    dispatch(fetchUserMe());
  };
  useEffect(() => {
    if (!lLoading) {
      if (loginData && loginData.message) {
        alert(loginData.message);
        dispatch(fetchUserMe());
      }
    }
    if (!rLoading) {
      if (registerData && registerData.message) {
        alert(registerData.message);
        dispatch(fetchUserMe());
      }
    }
  }, [ lLoading, rLoading, loginData, registerData]);
  

  return (
    <>
      {(loginData?.success || registerData?.success) && (
        <Navigate to={"/"} replace={true}></Navigate>
      )}
      <div className="loginAndSignup">
        <div className="box">
          <h1 className="heading">{heading}</h1>

          {/* switch Button */}
          <div className="switchBtn">
            <button
              className={heading === "login" ? "active" : ""}
              onClick={() => setHeading("login")}
            >
              Login
            </button>
            <button
              className={heading === "Signup" ? "active" : ""}
              onClick={() => setHeading("Signup")}
            >
              Sign up
            </button>
          </div>
          <div className="inputs">
            {/* render the input tags */}
            <form
              onSubmit={(e) => submitHandler(e)}
              encType="multipart/form-data"
            >
              {/* Employee or Employer */}
              {heading === "login" ? (
                ""
              ) : (
                <select
                  className="selection"
                  value={selectRole}
                  onChange={(e) => setSelectRole(e.target.value)}
                >
                  <option value={"Employee"}>Employee</option>
                  <option value={"Employer"}>Employer</option>
                </select>
              )}

              {/*check wheather is Employer or Employee*/}

              {heading === "Signup" && selectRole === "Employer" ? (
                <>
                  <textarea
                    placeholder="Enter the introduction for the company.."
                    className="aboutCompany"
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                  ></textarea>
                  <input
                    type=""
                    placeholder="Company Location eg . India"
                    className="lctInput"
                    onChange={(e) => setLocaton(e.target.value)}
                    value={location}
                  />
                </>
              ) : (
                ""
              )}

              {renderInputTag()}
            </form>
          </div>

          {/* swicth button */}
          {heading === "Signup" ? (
            <p className="changeBtn">
              Already has an account?{" "}
              <button onClick={() => setHeading("login")}>Login</button>
            </p>
          ) : (
            <p className="changeBtn">
              Don't have an account?{" "}
              <button onClick={() => setHeading("Signup")}>Sign up</button>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginAndSignup;
