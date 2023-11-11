import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import { PrivateRouter } from "./routes";
import { DashboardModulePage } from "../pages/DashboardModulePage"; 
import DashboardBrowselizePage from "../pages/DashboardBrowselizePage";

const DashboardRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Login />} path="/"></Route>
        <Route
          path="/dashboard"
          element={<PrivateRouter redirectTo="/login" />}
        >
          <Route path="/dashboard" element={<DashboardModulePage/>}></Route>
          <Route element={<DashboardBrowselizePage/>} path=":module"/>
          <Route element={<DashboardBrowselizePage/>} path=":module/:crud"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default DashboardRoutes;
