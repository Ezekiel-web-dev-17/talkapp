import React from "react";
import NavBar from "../../components/navBar/NavBar";
import { Link } from "react-router-dom";

const Signed = () => {
  return (
    <div>
      <NavBar />

      <div className="d-flex flex-lg-row flex-column gap-5 align-items-center m-lg-5 p-lg-5 mt-3">
        <div className=" text-center pt-5 text-white ps-lg-5 ms-lg-5">
          <h3 className=" text-danger">401! -Unauthorized error</h3>
          <h5>ACCESS DENIED.</h5>
          <p className="text-white fs-6 mx-5">
            This error occurs when you try to access a page that requires
            authentication or authorization, but you are not signed in.
            <br />
            <br />
            Please{" "}
            <Link className="text-decoration-none" to="/login">
              login
            </Link>{" "}
            to your account to access this page.
            <br />
            If you don't have an account, please{" "}
            <Link className="text-decoration-none" to="/sign-up">
              sign up
            </Link>{" "}
            to create a new account.
            <br />
            If you believe this is an error, please contact support or try to{" "}
            <Link className="text-decoration-none" to="/">
              return to the home page
            </Link>
            .
            <br />
            <br />
            Sign in and try again.
          </p>
          <Link className=" pt text-decoration-none" to="/login">
            <button className=" btn btn-primary fw-bold fs-6 fw-semibold">
              <p className="mb-0 text-white bg-transparent">Login</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signed;
