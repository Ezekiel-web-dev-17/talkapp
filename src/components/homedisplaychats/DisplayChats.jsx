import "./DisplayChats.css";
import EachTalker from "../eachTalker/EachTalker.jsx";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext.jsx";

const DisplayChats = ({ searched, setSearched, filter, searchMode }) => {
  const userId = localStorage.getItem("userId");
  const api = useContext(ApiContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersId = async () => {
    setLoading(true);
    try {
      const response = await api.get("/messages");

      const peopleSpokenTo = response.data.data
        .filter((msg) => msg.participants.includes(userId))
        .map((msg) => msg.participants.find((id) => id !== userId));

      const spokenToWithNoRepeat = Array.from(new Set(peopleSpokenTo)).filter(
        Boolean
      );

      function recentMsgToEachPerson(arr, response) {
        const mapMessages = {};
        response.data.data.forEach((res) => {
          for (let i = 0; i < arr.length; i++) {
            if (res.participants.includes(arr[i])) {
              mapMessages[arr[i]] = res;
            }
          }
        });
        return mapMessages;
      }

      const nameRequests = await api.post("/users/multi", {
        userIds: spokenToWithNoRepeat,
      });

      const userMap = {};
      nameRequests.data.data.forEach((user) => {
        userMap[user._id] = user.name;
      });

      const recentMsgs = recentMsgToEachPerson(spokenToWithNoRepeat, response);

      const userArray = Object.keys(recentMsgs).map((id) => ({
        ...recentMsgs[id],
        name: userMap[id] || "Unknown User",
      }));

      setUser(userArray);
    } catch (error) {
      console.error(error);
      setError("Error getting users messages: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersId();
  }, []);

  // changes the array of searched names
  const talk = (filter) => {
    const searching = user.filter((chat) =>
      chat.name.toLowerCase().includes(filter.toLowerCase())
    );
    setSearched(searching);
  };

  // allows change of searched on changing input value
  // useEffect(() => {
  //   talk(filter);
  // }, [filter]);
  console.log(user);

  return (
    <div className="display-chats  pb-5 px-0">
      {/* Shows people if searched length is more than 0 */}
      {error && (
        <p
          className="text-center text-white ps-4 pt-3 position-absolute bg-transparent"
          style={{ fontSize: "12px" }}
        >
          <strong className=" text-danger ">{`${error}`}</strong>
        </p>
      )}
      {searchMode ? (
        searched.length > 0 ? (
          loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div
                className="spinner-border text-primary"
                style={{ width: "2.95rem", height: "2.95rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <EachTalker searched={searched} userId={userId} />
          )
        ) : (
          <p className=" text-white pt-5 ms-4 fs-6">
            Sorry, no Search found 🥺🥺😞
          </p>
        )
      ) : loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "2.95rem", height: "2.95rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <EachTalker searched={user} userId={userId} />
      )}
    </div>
  );
};

export default DisplayChats;
