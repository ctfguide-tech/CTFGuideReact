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
import Settings from "./pages/Settings"
import Leaderboards from "./pages/Leaderboards";
import Ab from "./pages/Ab";
import Classes from "./pages/Classes" 
import ClassView from "./pages/ClassView"
import ClassAdmin from "./pages/ClassAdmin";
import CreateClass from "./pages/CreateClass";
import "./index.css";



import Ch1_1 from "./pages/content/Ch1_1"; // Lesson 1
import Ch1_2 from "./pages/content/Ch1_2"; // Activity 1
import Ch1_3 from "./pages/content/Ch1_3"; // Lesson 2









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
          <Route path="/settings" element={<Settings />} />
          <Route path="/classes" element={<Classes />} />

          <Route path="/classes/admin/:id" element={<ClassAdmin />} />

          <Route path="/classes/:id" element={<ClassView />} />

          <Route path="/create" element={<Create />} />

          <Route path="/create-class" element={<CreateClass />} />

          <Route path="/practice/all" element={<Practice />} />
          <Route path="/practice/easy" element={<Practice type="easy" />} />
          <Route path="/practice/medium" element={<Practice type="medium" />} />
          <Route path="/practice/hard" element={<Practice type="hard" />} />

          <Route path="/learn" element={<Learn />} />

          <Route path="/learn/chapter1/lesson1" element={<Ch1_1 />} />
   
          <Route path="/learn/chapter1/activity1" element={<Ch1_2 />} />
   
          <Route path="/learn/chapter1/lesson2" element={<Ch1_3/>} />

          
          <Route path="/challenges/:id" element={<Challenge />} />
          <Route path="/challenges/:id/edit" element={<EditChallenge />} />
          <Route path="/leaderboards/:id" element={<Leaderboards />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
<React.StrictMode>
  <App /> 
  </React.StrictMode>,  document.getElementById("root"));

