import "./Error.css";
import { Link } from "react-router-dom";
import spaceman from "../../assets/shared/image.png";
import NavBar from "../../components/navBar/NavBar.jsx";

const Error = () => {
  return (
    <div className="err">
      <NavBar />

      <div className="error-con d-flex flex-lg-row flex-column gap-5 align-items-center m-lg-5 p-lg-5 mt-3">
        <div className=" text-center pt-5 text-white ps-lg-5 ms-lg-5">
          <h1>404! - error</h1>
          <h5>PAGE NOT FOUND</h5>
          <Link className=" pt text-decoration-none" to="/">
            <button className=" rounded-pill mt-3 px-4 border-0 bg-white text-white fs-6 fw-semibold">
              <p className="mb-0 text-black bg-transparent">Back To Home</p>
            </button>
          </Link>
        </div>
        <div className="mb-5">
          <img src={spaceman} width="150px" height="150px" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Error;
