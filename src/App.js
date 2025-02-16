import React, { useState } from "react";
import NavigationBar from "./components/navigationBar";
import Home from "./components/home";
import SearchResult from "./components/searchResult";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/settings";

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={<Home selectedLanguage={selectedLanguage} />}
        />
        <Route
          path="/SearchResult"
          element={<SearchResult selectedLanguage={selectedLanguage} />}
        />
        <Route
          path="/Settings"
          element={
            <Settings
              setSelectedLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
