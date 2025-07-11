import React from "react";
import "./EachTalker.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

const dateFunction = (dateStr) => {
  let convertedDate = new Date(dateStr);
  return convertedDate;
};

function dater(dateToCheck) {
  const currentDate = new Date();
  const transformDate = new Date(dateToCheck);

  if (transformDate.getDate() === currentDate.getDate() - 1) {
    return "Yesterday";
  } else {
    return "IDK";
  }
}

const EachTalker = ({ searched }) => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      {searched.map((req, i) => (
        <Link
          to={`/chat/:${req.participants.find((id) => id !== userId)}`}
          key={i}
          className=" text-decoration-none"
        >
          <div className="chat pt-1 pb-2 d-flex align-items-center   border-2 border-white border-bottom gap-3 position-relative">
            <BsPerson
              className="border-1 p-1 border-white border rounded-circle text-white bg-white bg-opacity-50"
              style={{
                minHeight: "30px",
                minWidth: "30px",
              }}
              alt="person img"
            />
            <div className="div1 ps-0 me-3 text-white">
              <h6 className="mb-0">{req.name}</h6>
              <p
                className=" text-white-50"
                style={{ fontSize: "13px", marginBlockEnd: "3px" }}
              >
                {req.text.length < 40
                  ? req.text
                  : `${req.text.slice(0, 40)}...`}
              </p>
            </div>
            <div className="div2 mt-0 text-white-50 position-absolute end-0">
              {dateFunction(req.createdAt).toString() === Date()
                ? "Now"
                : dater(req.createdAt) === "Yesterday"
                ? "Yesterday"
                : dateFunction(req.createdAt).getTime() <
                    dateFunction(Date()).getTime() &&
                  dateFunction(req.createdAt).toDateString().slice(4) ===
                    dateFunction(Date()).toDateString().slice(4)
                ? dateFunction(req.createdAt).toISOString().slice(11, 16)
                : dateFunction(req.createdAt).getTime() <
                    dateFunction(Date()).getTime() &&
                  dateFunction(req.createdAt).toDateString().slice(4) !==
                    dateFunction(Date()).toDateString().slice(4)
                ? dateFunction(req.createdAt).toISOString().slice(0, 10)
                : req.createdAt.slice(0, 10).replaceAll(" ", "/")}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default EachTalker;
