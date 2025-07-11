import React, { useContext, useEffect, useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./MayKnow.css";
import { ApiContext } from "../../context/ApiContext";
import MayKnowNav from "../../components/mayknowComp/mayKnowNavbar/MayKnowNav.jsx";
import Talkers from "../../components/mayknowComp/mayKnowTalkers/Talkers.jsx";

const MayKnow = () => {
  const api = useContext(ApiContext);
  const userId = localStorage.getItem("userId");
  // to see search input
  const [searchMode, setSearchMode] = useState(false);
  // default search content
  const [searched, setSearched] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [realChatsUsers, setRealChatsUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo chats
  const noOfChat = [
    "Sia",
    "Marshmallow",
    "Alvin",
    "Sebastian",
    "Theophilus",
    "Ben",
    "Francis",
    "Sam",
    "Theresa",
    "Aloysius",
    "Rachel",
    "Joel",
  ];

  // Real Chats from api
  const usersGetter = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/users");
      setLoading(false);
      const data = res.data.data.filter((user) => user._id != userId);

      // const userUsers = data.map((eachUser) => {
      //   return eachUser.name;
      // });
      setRealChatsUsers(data);
    } catch (error) {
      setError(error);
      console.error("Error getting users.");
    }
  };

  // allows change of searched on changing input value
  useEffect(() => {
    // changes the searched array content
    const talk = (searched) => {
      // const searching = noOfChat.filter((chat) => {
      //   return chat.toLowerCase().includes(searched.toLowerCase());
      // });
      const searching = realChatsUsers.filter((user) => {
        if (user.name.toLowerCase() == searched.toLowerCase()) return user;
      });
      setSearchedUsers(searching);
    };
    usersGetter();
    talk(searched);
  }, [searched]);

  return (
    <div className="text-white may-know">
      <MayKnowNav
        searchMode={searchMode}
        setSearched={setSearched}
        searched={searched}
        setSearchMode={setSearchMode}
      />

      <main className="mt-5 ">
        <Link
          to="/sign-up "
          className="  text-secondary-emphasis text-decoration-none"
        >
          <div className="chat pt-1 pb-2 d-flex align-items-center  gap-3 ps-3">
            <BsPersonAdd
              className="bg-white rounded-circle p-2 overflow-visible"
              style={{ fontSize: "35px" }}
            />
            <div className="div1 ps-0 me-3 text-white">
              <h6 className="mb-0">Add New Contact</h6>
            </div>
          </div>
        </Link>

        <p className=" fw-bold ps-3 pt-2 mb-0 text-white-50">
          Talkers You May Know On Talk
        </p>
        <div className=" pb-5">
          {error && (
            <p className=" text-white ps-4 ">
              Couldn't Get People You may Know Due To:{" "}
              <bdo className=" text-danger">{`${error?.message}`}</bdo>
            </p>
          )}
          {/* Shows people if searched length is more than 0 while while search btn is clicked */}
          {loading && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <div
                class="spinner-border text-primary ms-2 "
                role="status"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {searchMode ? (
            searchedUsers.length > 0 ? (
              searchedUsers.map((no, i) => <Talkers no={no} i={i} />)
            ) : (
              <p className=" ms-4 fs-6">Sorry, no Search found 🥺🥺😞</p>
            )
          ) : (
            realChatsUsers.map((each, i) => <Talkers no={each} i={i} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default MayKnow;
