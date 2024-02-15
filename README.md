# Job Portal Website

A comprehensive Job Portal website designed to connect employers with potential candidates. This platform facilitates job postings by employers and enables job seekers to explore, filter, and apply for available positions.

## Live Demo

Check out the live demo of our Job Portal Website: [https://work-buzz.netlify.app](https://work-buzz.netlify.app)

## Table of Contents

- [Overview](#overview)
- [Frontend](#frontend)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
  - [Live Demo](#live-demo)
- [Backend](#backend)
  - [Routes](#routes)
  - [Technologies Used](#backend-technologies-used)
  - [Installation](#backend-installation)
    - [Configuration](#backend-configuration)
  - [Contributing](#contributing)
- [API Documentation](#api-documentation)
  - [1. New Job Post](#1-new-job-post)
  - [2. Create New Job](#2-create-new-job)
  - [3. Get All Jobs](#3-get-all-jobs)
  - [4. Get Specific Job Details](#4-get-specific-job-details)
  - [5. User Registration](#5-user-registration)
  - [6. User Login](#6-user-login)
  - [7. Load User](#7-load-user)
  - [8. Get All Users](#8-get-all-users)
  - [9. Logout User](#9-logout-user)
  - [10. Get Specific User](#10-get-specific-user)
  - [11. Update User Profile](#11-update-user-profile)

## Overview

Welcome to our Job Portal Website! This platform serves as a bridge between employers looking to fill job openings and job seekers in search of exciting career opportunities. Our user-friendly interface ensures a seamless experience for both employers and job seekers.

## Frontend

### Features

Explore the key features that make our Job Portal Website stand out:

- **Job Posting by Employers**: Employers can easily post job openings, providing detailed information about the positions available.

- **Job Search and Filtering for Job Seekers**: Job seekers can efficiently search for jobs based on various criteria and apply filters to find the most relevant opportunities.

- **Application Submission for Job Seekers**: A straightforward application process for job seekers to apply for their desired positions directly through the platform.

- **User Authentication for Employers and Job Seekers**: Secure user authentication ensures a trustworthy environment for both employers and job seekers.

- **Responsive Design**: The website is designed to be accessible and user-friendly across various devices, ensuring a seamless experience for all users.

### Technologies Used

Our Job Portal Website is built using the following technologies and frameworks:

- **MongoDB**: NoSQL database for efficient data storage.
- **Express.js**: Backend framework for building robust APIs.
- **React**: Frontend library for creating dynamic user interfaces.
- **Node.js**: JavaScript runtime for server-side development.

- **Redux**: State management library for handling application state in a predictable way.

### Installation

Follow these simple steps to set up the Job Portal Website on your local machine:

1. Clone the repository: `git clone https://github.com/kamlesh-Sahani/job_portal_MERN.git`
2. Navigate to the project directory: `cd client`
3. Install client dependencies: `npm install`
4. Navigate back to the root directory: `cd ..`
5. Install server dependencies: `npm install`

## Backend

### Routes

- **Create New Job Route:**; router.post('/new', isAuth, newJob).
- **Apply Job Routes:**;router.post('/:id', isAuth, jobApply).
- **Get All Jobs Route:**;router.get('/all', getAllJob).
- **Get Specific Job Details Route:**;router.get('/:id', getJob).
- **User Registration Route:**; router.post('/register', upload.single("profileImg"), userRegister).
- **User Login Route:**; router.post('/login', userLogin).
- **Load User Route:**; router.get('/me', isAuth, myProfile).
- **Get All Users Route:**;router.get('/all', isAuth, getAllUser).
- **ogout User Route:**; router.get('/logout', logoutUser).
- **Get Specific User Route:**;router.get('/:id', getUser).
- **Update User Profile Route:**; router.put('/:id', updateUser).

### API Documentation

#### 1. New Job Post

- \*\*URL: /api/jobs/:id;
- \*\*Method: POST;
- \*\*Authentication: Required (via JWT);
- \*\*Description: This endpoint allows employers to post new job openings. The :id parameter represents the job ID.;

#### 2. Create New Job

- \*\* URL: /api/jobs/new

- \*\* Method: POST

- \*\* Authentication: Required (via JWT)

- \*\* Description: Employers can use this endpoint to create new job openings.

#### 4. Get Specific Job Details

- \*\* URL: /api/jobs/:id

- \*\* Method: GET

- \*\* Authentication: Not required

- \*\* Description: Fetches details for a specific job based on the provided :id parameter.

#### 5. User Registration

- \*\* URL: /api/users/register

- \*\* Method: POST

- \*\* Authentication: Not required

- \*\* Description: Allows users to register for the Job Portal Website.

#### 6. User Login

- \*\* URL: /api/users/login

- \*\* Method: POST

- \*\* Authentication: Not required

- \*\* Description: Allows users to log in and obtain a JWT token.

.- \*\* Load User

- \*\* URL: /api/users/me

- \*\* Method: GET

- \*\* Authentication: Required (via JWT)

- \*\* Description: Fetches the user profile.

#### 7. Load User

- \*\* URL: /api/users/me

- \*\* Method: GET

- \*\* Authentication: Required (via JWT)

- \*\* Description: Fetches the user profile.

- \*\* Example Request:

#### 8. Get All Users

- \*\* URL: /api/users/all

- \*\* Method: GET

- \*\* Authentication: Required (via JWT)

- \*\* Description: Fetches details for all users.

- \*\* Example Request:

#### 9. Logout User

- \*\* URL: /api/users/logout

- \*\* Method: GET

- \*\* Authentication: Required (via JWT)

- \*\* Description: Logs out the user and invalidates the JWT tok

#### 10. Get Specific User

- \*\* URL: /api/users/:id

- \*\* Method: GET

- \*\* Authentication: Required (via JWT)

- \*\* Description: Fetches details for a specific user based on the provided :id parameter.

#### 11. Update User Profile

- ** - ** URL: /api/users/:id

- \*\* Method: PUT

- \*\* Authentication: Required (via JWT)

- \*\* Description: Updates the user profile based on the provided :id parameter

#### Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```env
DB_URL=your_database_url
JWT_SECRET=your_jwt_secret




```
