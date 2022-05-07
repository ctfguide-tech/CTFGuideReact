import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Create from "./pages/Create";
import Challenge from "./pages/Challenge";
import EditChallenge from "./pages/EditChallenge"
import Learn from "./pages/Learn"

import Leaderboards from "./pages/Leaderboards";
import Ab from "./pages/Ab";

import "./index.css";



// LESSONS!!!
import Ch1_1 from "./pages/content/Ch1_1"
import Ch2_Linux from "./pages/content/Ch2_Linux"
import Ch2_SSH from "./pages/content/Ch2_SSH"
import Ch2_wget from "./pages/content/Ch2_wget"











export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/ambassador-program" element={<Ab />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />

          <Route path="/practice/all" element={<Practice />} />
          <Route path="/practice/easy" element={<Practice type="easy" />} />
          <Route path="/practice/medium" element={<Practice type="medium" />} />
          <Route path="/practice/hard" element={<Practice type="hard" />} />

          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/chapter1/lesson1" element={<Ch1_1 />} />
          <Route path="/learn/chapter2/lesson2" element={<Ch2_Linux />} />
          <Route path="/learn/chapter2/lesson3" element={<Ch2_SSH />} />
          <Route path="/learn/chapter2/lesson4" element={<Ch2_wget />} />
          <Route path="/challenges/:id" element={<Challenge />} />
          <Route path="/challenges/:id/edit" element={<EditChallenge />} />
          <Route path="/leaderboards/:id" element={<Leaderboards />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

