import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext.jsx";
import "./ChatDetails.css";
import { BsArrowLeftShort, BsPerson, BsSend } from "react-icons/bs";

const ChatDetails = () => {
  const user = localStorage.getItem("userId");
  const { chatId } = useParams();
  const api = useContext(ApiContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [to, setTo] = useState({});
  const messagesEndRef = useRef(null);
  let conversations = messages[0] ? messages[0] : [];
  const [error, setError] = useState("");

  // Fetch messages for this chatId
  useEffect(() => {
    const getMsgs = new Promise((resolve, reject) => {
      const getMsg = async () => {
        try {
          const res = await api.get("/messages/");
          resolve(res);
        } catch (error) {
          reject(error);
        }
      };

      getMsg();
    })
      .then((res) => {
        setMessages([res.data.data]);
        conversations = res.data.data.filter((msg) =>
          msg.participants.includes(to._id)
        );
      })
      .catch((reject) => {
        setError("Could not fetch Messages");
        console.error("Could not fetch Messages:", reject.message);
      });

    const getUserById = new Promise((resolve, reject) => {
      const getUser = async () => {
        try {
          const res = await api.get(`/users/${chatId.slice(1)}`);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      };

      getUser();
    })
      .then((res) => {
        const { _id, name } = res;
        setTo({ _id, name });
      })
      .catch((reject) => {
        setError("Could not fetch User");
        console.error("Could not fetch user:", reject.message);
      });
  }, []);

  // Autoscroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, setMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage,
      participants: [to._id, user],
    };

    // Post request to Create messages
    try {
      const res = await api.post("/messages/create", messageData);
      setMessages((prevCreatedMsgs) => [...prevCreatedMsgs, messageData]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div>
      <nav className="chat-nav d-flex align-items-center px-3 py-2 position-fixed top-0 w-100 z-1 border-bottom">
        <Link to="/">
          <BsArrowLeftShort className="fs-1 me-2 text-white" />
        </Link>

        <div className="chat bg-transparent border-0 d-flex gap-2 align-items-center">
          <Link to="/">
            <BsPerson
              className="border-1 p-1 border-white border rounded-circle text-white bg-white bg-opacity-50"
              style={{
                minHeight: "25px",
                minWidth: "25px",
              }}
              alt="person img"
            />
          </Link>
          <div className="div1 bg-transparent text-white">
            <h5 className=" fs-6 fw-lighter bg-transparent mb-0">{to.name}</h5>
          </div>
        </div>
      </nav>

      {/* Messages Area */}
      <div
        className="messages-area px-3 mx-3 pt-2  mb-2 pb-5"
        ref={messagesEndRef}
      >
        {conversations.map((msg, i) => {
          const isMine = msg.participants[1] === user;
          return (
            <div className=" ">
              {error && (
                <p className="text-white mx-5 mt-3 fs-6">
                  Please <Link to="/login">login</Link> to view the chat.{error}
                </p>
              )}
              <div
                className="border-1 rounded-pill bg-secondary border-danger px-3 text-white bg-opacity-25"
                style={{ placeSelf: "center", fontSize: "14px" }}
              >
                {/* if Statements for:
                1. if current msg was not created on the same day as previous msg or...
                2. if current msg (second message) was not created on the same day as previous msg(first message) or...
                3. if current msg is the first message show the date in date format "day mm-dd-yyyy" but as "Today" if in same day and as "Yesterday" if current date(msg.createdAt) equals this day's date minus 1 (ONE)
                Else just return an empty string """.
                */}
                {new Date(msg.createdAt).toDateString() !==
                  new Date(
                    conversations[i >= 2 ? i - 1 : i].createdAt
                  ).toDateString() ||
                new Date(conversations[1]?.createdAt).toDateString() !==
                  new Date(conversations[0].createdAt).toDateString() ||
                i === 0 ? (
                  <p className="mt-5 bg-transparent">{`${
                    new Date(msg.createdAt).toDateString() ===
                    new Date(Date()).toDateString()
                      ? "Today"
                      : new Date(msg.createdAt).getDate() ===
                        new Date(Date()).getDate() - 1
                      ? "Yesterday"
                      : new Date(msg.createdAt)
                          .toDateString()
                          .replace(" ", ", ")
                  }.`}</p>
                ) : (
                  ""
                )}
              </div>
              <div
                key={msg._id}
                className={`message-bubble h-25 p-2 rounded ${
                  isMine ? "mine" : "theirs "
                } mb-3`}
              >
                <p className="bg-transparent mb-1">{msg.text}</p>
                <div className="msg-time bg-transparent">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div />
      </div>

      {/* Input Footer */}
      <footer className="text-sender position-fixed bg-transparent ms-1 me-3 w-100">
        <form
          onSubmit={handleSend}
          className="d-flex flex-grow-1 text-form px-3 py-1 rounded-pill"
        >
          <textarea
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            placeholder="Type your message..."
            className="form-control bg-transparent  me-2 text-white placeholder-wave border-0 pe-3 ps-2 py-0 pb-0 rounded-pill w-100"
            maxLength={500}
            style={{ backgroundColor: "#292727" }}
          />
          <button
            type="submit"
            className="btn-send border-0 bg-white rounded-end-circle rounded-start-circle m-1"
          >
            <BsSend className="send text-black bg-white fs-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatDetails;
