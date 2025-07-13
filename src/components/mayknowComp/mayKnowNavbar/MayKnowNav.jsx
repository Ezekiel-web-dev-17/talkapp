import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import "./MayKnowNav.css";
import { Link } from "react-router-dom";

const MayKnowNav = ({ searchMode, setSearched, searched, setSearchMode }) => {
  return (
    <nav
      style={{ top: "0px", zIndex: "2" }}
      className="may-know-nav d-flex gap-4 align-items-center px-4 py-2 position-fixed w-100"
    >
      <Link to="/" className="text-white">
        <BsArrowLeftShort className="fs-3" />
      </Link>
      {/* shows people you may know if search mode is off(false) */}
      {searchMode ? (
        <>
          <input
            className="border-0  px-3 py-1 me-4 w-100 bg-light bg-opacity-25 rounded-pill font-monospace"
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(e) => {
              setSearched(e.target.value);
            }}
            value={searched}
          />
        </>
      ) : (
        <>
          <h5 className="mb-0">People You May Know</h5>
          <BsSearch
            onClick={() => {
              setSearchMode(!searchMode);
            }}
            style={{ marginLeft: "50px", right: "5%" }}
            className="fs-6 position-fixed"
          />
        </>
      )}
    </nav>
  );
};

export default MayKnowNav;
