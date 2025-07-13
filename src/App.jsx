import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "./context/ApiContext.jsx";

import HomeChat from "./pages/home/HomeChat.jsx";
import Auth from "./pages/auth/auth.jsx";
import Login from "./pages/login/login.jsx";
import ChatDetails from "./pages/chat/ChatDetails.jsx";
import MayKnow from "./pages/youmay/MayKnow.jsx";
import Error from "./pages/Error/Error.jsx";
import Signed from "./pages/signed/Signed.jsx";

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeChat />} />
          <Route path="/sign-up" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/may-know" element={<MayKnow />} />
          <Route path="/chat/:chatId" element={<ChatDetails />} />
          <Route path="/not-signed" element={<Signed />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
