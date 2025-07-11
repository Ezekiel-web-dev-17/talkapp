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
  const [searched, setSearched] = useState([]);

  // demoReq.sort(
  //   (a, b) => new Date(b.time).getDate() - new Date(a.time).getDate()
  // );

  return (
    <div className="home-div position-relative">
      <NavBar
        filter={filter}
        setFilter={setFilter}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />

      <DisplayChats
        searched={searched}
        setSearched={setSearched}
        searchMode={searchMode}
        filter={filter}
      />

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
