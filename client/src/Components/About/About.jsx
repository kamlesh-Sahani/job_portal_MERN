import React from "react";
import "./about.scss";
const About = () => {
  return (
    <div className="about">
      <div className="about_box">
        <div className="about_head">
          <h1>
            Welcome to <span className="porta_name">WorkBuzz</span>
          </h1>
        </div>

        <div className="about_main">
          <h2>About Us</h2>
          <p>
            <span className="porta_name">WorkBuzz</span> is a dedicated platform
            that connects job seekers with their dream opportunities and helps
            employers find the perfect candidates for their vacancies. Our
            mission is to simplify the job search process and make recruitment
            efficient for both individuals and companies.
          </p>

          <p>
            At <span className="porta_name">WorkBuzz</span>, we understand the
            challenges of finding the right job or the perfect employee.
            Therefore, we've created a user-friendly and intuitive platform that
            caters to the unique needs of both job seekers and employers.
          </p>

          <h3>Our Vision</h3>
          <p>
            We envision a world where the job search process is seamless,
            transparent, and rewarding for everyone involved. Our team is
            committed to continually improving our platform to provide
            innovative solutions for the ever-evolving job market.
          </p>

          <h3>Why Choose Us?</h3>
          <p>
            - Extensive Job Listings: Access a wide range of job opportunities
            from various industries.
            <br />
            - User-Friendly Interface: Navigate our platform with ease, whether
            you're a job seeker or an employer.
            <br />
            - Reliable Matching: Our advanced algorithms ensure accurate job
            matches for both candidates and employers.
            <br />- Dedicated Support: Our support team is always ready to
            assist you with any queries or concerns.
          </p>
        </div>

        <div>
          <p>
            Thank you for choosing <span className="porta_name">WorkBuzz</span>.
            We are excited to be part of your journey in finding the right job
            or the perfect candidate for your team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
