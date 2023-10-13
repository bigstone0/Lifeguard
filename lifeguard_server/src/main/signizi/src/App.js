import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignageList from "./components/SignageList";
import SignageSetting from "./components/SignageSetting";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalStateProvider } from "./components/res/GlobalState";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div
          className="Background"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signagelist" element={<SignageList />} />
            <Route path="/signagesetting" element={<SignageSetting />} />
          </Routes>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
