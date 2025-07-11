import React from "react";
import "./NavBar.css";
import {
  BsCamera,
  BsChatDots,
  BsPlusCircleFill,
  BsSearch,
  BsArrowLeftShort,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const NavBar = ({ filter, setFilter, searchMode, setSearchMode }) => {
  return (
    <nav className="nav-nav d-flex gap-4 align-items-center justify-content-between px-2 top-0 z-2 py-2 position-fixed w-100">
      {/* shows people you may know if search mode is off(false) */}
      {searchMode ? (
        <>
          <Link to="/" className="text-white">
            <BsArrowLeftShort
              onClick={() => {
                setSearchMode(false);
                setFilter("");
              }}
              className="fs-1"
            />
          </Link>
          <input
            className="border-0  px-3 py-1 me-4 w-100 bg-light bg-opacity-25 rounded-pill font-monospace form-text"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          />
        </>
      ) : (
        <>
          <div className="logo text-white">
            <BsChatDots />
            <h4 className=" ps-1 mb-0">Talk</h4>
          </div>

          <div className="others text-white">
            <BsCamera style={{ fontSize: "12px" }} />
            <BsSearch
              style={{ fontSize: "12px" }}
              onClick={() => {
                setSearchMode(!searchMode);
              }}
            />
            <Link to="/login" className="text-white">
              <BsPlusCircleFill style={{ fontSize: "12px" }} />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
