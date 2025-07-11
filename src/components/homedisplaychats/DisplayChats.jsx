// Whenever there's data ask chat gpt why this code runs.
import "./DisplayChats.css";
import EachTalker from "../eachTalker/EachTalker.jsx";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext.jsx";

const DisplayChats = ({ searched, setSearched, filter, searchMode }) => {
  const userId = localStorage.getItem("userId");
  const api = useContext(ApiContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [usersNames, setUsersNames] = useState([]);
  const [talkersId, setTalkersId] = useState([]);
  const [real, setReal] = useState({});

  const fetchUsersId = async () => {
    try {
      function spokenTo(eachResponse) {
        return eachResponse.data.data[1].participants.includes(userId)
          ? eachResponse.participants.find((id) => id !== userId)
          : false;
      }

      const response = await api.get("/messages");
      console.log(typeof response);
      console.log(response);

      const peopleSpokenTo = [response].map((eachResponse) => {
        return spokenTo(eachResponse);
      });

      const spokenToWithNoRepeat = Array.from(new Set(peopleSpokenTo));

      setTalkersId(spokenToWithNoRepeat);

      function recentMsgToEachPerson(arr, response) {
        const map = {};
        response.map((res) => {
          for (let i = 0; i < arr.length; i++) {
            if (res.participants.includes(arr[i])) {
              map[arr[i]] = res;
            }
          }
        });

        return map;
      }

      setReal(recentMsgToEachPerson(spokenToWithNoRepeat, response));
    } catch (error) {
      const err = new Error("Error getting users Id", error);
      setError(error.message);
      throw err;
    }
  };

  function addNameKey(msgs, names) {
    [msgs].map((msgObj) => {
      for (let i = 0; i < names.length; i++) {
        for (let ids in msgObj) {
          msgObj[ids]["name"] = names[i++];
          setUser((prevMsgs) => [...prevMsgs, msgObj[ids]]);
        }
      }
    });
  }

  const fetchUsers = async () => {
    try {
      for (let i = 0; i < talkersId.length; i++) {
        if (talkersId[i] === false) return;
        const response = await api.get(`/users/${talkersId[i]}`);
        setUsersNames((prevNameRes) => [...prevNameRes, response.data.name]);
      }
    } catch (error) {
      const err = new Error("Error getting users", error.message);
      setError(error.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsersId();
    fetchUsers();
    addNameKey(real, usersNames);
  }, []);

  // changes the array of searched names
  const talk = (filter) => {
    const searching = user.filter((chat) => {
      return chat.toLowerCase().includes(filter.toLowerCase());
    });
    setSearched(searching);
  };

  // allows change of searched on changing input value
  useEffect(() => {
    talk(filter);
  }, [filter]);

  return (
    <div className="display-chats  pb-5 px-0">
      {/* Shows people if searched length is more than 0 */}
      {error && (
        <p
          className="text-center text-white ps-4 pt-3 position-absolute bg-transparent"
          style={{ fontSize: "12px" }}
        >
          <strong className=" text-danger ">{`${error}`}</strong>, Can't connect
          to the Internet.😭😞😖😟
        </p>
      )}
      {searchMode ? (
        searched.length > 0 ? (
          <EachTalker searched={searched} userId={userId} />
        ) : (
          <p className=" text-white pt-5 ms-4 fs-6">
            Sorry, no Search found 🥺🥺😞
          </p>
        )
      ) : (
        <EachTalker searched={searched} userId={userId} />
      )}
    </div>
  );
};

export default DisplayChats;
