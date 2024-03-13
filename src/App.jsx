import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { nprogress, NavigationProgress } from "@mantine/nprogress";

import Hero from "./routes/Hero";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ErrorPage from "./routes/error-page";
import Home from "./routes/Home";
import Mood from "./routes/Mood";
import Journal from "./routes/Journal";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/tiptap/styles.css";
import "./styles/App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Login state

  let location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.complete();
  }, [location.pathname]);

  return (
    <div className="App">
      <NavigationProgress />
      <Routes>
        {!isLoggedIn && <Route index element={<Hero />} />}
        {isLoggedIn && (
          <Route index element={<Navigate to="/dashboard" replace />} />
        )}
        {isLoggedIn && (
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="mood" element={<Mood />} />
            <Route path="journal" element={<Journal />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        )}
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        {!isLoggedIn && <Route path="register" element={<Register />} />}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
