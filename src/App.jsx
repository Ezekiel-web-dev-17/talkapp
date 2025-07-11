import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "./context/ApiContext.jsx";

import HomeChat from "./pages/home/HomeChat.jsx";
import Auth from "./pages/auth/auth.jsx";
import Login from "./pages/login/login.jsx";
import ChatDetails from "./pages/chat/ChatDetails.jsx";
import MayKnow from "./pages/youmay/MayKnow.jsx";
import Error from "./pages/Error/Error.jsx";

function App() {
  // // State to hold the decoded token (or null if not yet)
  // const [decodedToken, setDecodedToken] = useState(null);

  // const tryDecode = async () => {
  //   const token = localStorage.getItem("auth-token");
  //   if (token) {
  //     const mod = await import("jwt-decode");
  //     const jwtDecode = mod.default || mod;
  //     try {
  //       const payload = jwtDecode(token);
  //       setDecodedToken(payload);
  //     } catch (err) {
  //       console.warn("Invalid token, clearing it.");
  //       localStorage.removeItem("auth-token");
  //     }
  //   }
  // };

  // // On mount, try to decode whatever is in localStorage (if any)
  // useEffect(() => {
  //   tryDecode();
  // }, []);

  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeChat />} />
          <Route path="/sign-up" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/may-know" element={<MayKnow />} />
          <Route path="/chat/:chatId" element={<ChatDetails />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
