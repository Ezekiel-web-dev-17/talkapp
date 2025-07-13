import React, { useState } from "react";
import "./HomeChat.css";
import { Link } from "react-router-dom";
import { BsSendPlusFill } from "react-icons/bs";
import NavBar from "../../components/navBar/NavBar.jsx";
import DisplayChats from "../../components/homedisplaychats/DisplayChats.jsx";

const HomeChat = () => {
  // to see search input
  const [searchMode, setSearchMode] = useState(false);
  // default search content
  const [filter, setFilter] = useState("");
  const user = localStorage.getItem("userId");

  return (
    <div className="home-div position-relative">
      <NavBar
        filter={filter}
        setFilter={setFilter}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />

      {user ? (
        <DisplayChats
          searched={filter}
          setSearched={setFilter}
          searchMode={searchMode}
          filter={filter}
        />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
          <h3 className="text-white">Welcome to TalkApp</h3>
          <p className="text-white text-center">
            Please Sign In to view Messages and talk to someone.
          </p>
          <div className=" d-flex gap-3">
            <Link to="/sign-up" className="btn fs-6 btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn fs-6 btn-secondary">
              Login
            </Link>
          </div>
        </div>
      )}

      <Link to="/may-know" className="text-secondary-emphasis">
        <BsSendPlusFill
          style={{ fontSize: "2.5em", left: "84%", bottom: "20px" }}
          className=" position-fixed bg-white rounded-3 p-2 mb-3"
        />
      </Link>
    </div>
  );
};

export default HomeChat;
