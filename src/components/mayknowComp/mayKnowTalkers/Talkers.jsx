import React from "react";
import "./Talkers.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

const Talkers = ({ no, i }) => {
  return (
    <Link key={i} to={`/chat/:${no._id}`} className=" text-decoration-none">
      <div className="chat pt-1 pb-2 d-flex align-items-center  gap-3 position-relative px-3">
        <BsPerson
          className="border-1 p-1 border-white border rounded-circle text-white bg-white bg-opacity-50"
          style={{
            minHeight: "30px",
            minWidth: "30px",
          }}
          alt="person img"
        />
        <div className="div1 ps-0 me-3 text-white">
          <h6 className="mb-0">{`${no.name}`}</h6>
          <p
            className=" text-white-50"
            style={{ fontSize: "13px", marginBlockEnd: "3px" }}
          >
            Hi 👋 there! I am using Talk.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Talkers;
