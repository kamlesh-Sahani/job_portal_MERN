import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import './app.scss';
import LoginAndSignup from './Components/LoginAndSignup/LoginAndSignup';
import Home from './Components/Home/Home';
import JobDetail from './Components/JobDetail/JobDetail';
import Companies from './Components/Companies/Companies';
import CreateJob from './Components/CreateJob/CreateJob';
import Footer from './Components/Footer/Footer';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUserMe } from './Redux/Slices/User/loadUser';
import { fetchAllUser } from './Redux/Slices/User/getAllUser';
import Profile from './Components/Profile/Profile';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';
import About from './Components/About/About';
import Loader from './Components/Loader/Loader';
const App = () => {
  const dispatch = useDispatch();
  const {data } = useSelector((state) => state.userMe);

  useEffect(() => {
    const fetchLoggendUser = async()=>{
      await dispatch(fetchUserMe());
      dispatch(fetchAllUser())
    }
    fetchLoggendUser();
  }, [dispatch]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/account/:id' element={<LoginAndSignup />} />
        <Route path='/job/:id' element={data && data.user ?<JobDetail />:<LoginAndSignup />} />
        <Route path='/' element={<Home />} />
        <Route path='/companies' element={ data && data.user ?<Companies />:<LoginAndSignup />} />
        <Route path='/post-job' element={data && data.user && data.user.role ==="Employer" ?<CreateJob />:<Home />} />

        <Route path='/profile/:id' element={data && data.user ?<Profile />:<LoginAndSignup />} />

        <Route path='/edit/:id' element={data && data.user ?<ProfileEdit />:<LoginAndSignup />} />
        <Route path='/about' element={<About />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
