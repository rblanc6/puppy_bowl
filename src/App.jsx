import { useState } from "react";

import { Provider } from "react-redux";
import store from "./store/store";

import PuppyDetails from "./components/PuppyDetails/PuppyDetails";
import PuppyList from "./components/PuppyList/PuppyList";
import PuppyForm from "./components/PuppyForm/PuppyForm";
import NavBar from "./components/NavBar";

import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/**
 * @component
 * This app shows a list of puppy bowl players from the API.
 * Users can view players in the roster, add a player to the roster,
 * see more details about a specific player, and remove a player from the roster.
 */
export default function App() {
  const [selectedPuppyId, setSelectedPuppyId] = useState();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <h1>Puppy Bowl</h1>
        <Routes>
          <Route path="/players" element={<PuppyForm />} />
          <Route
            path="/"
            element={<PuppyList setSelectedPuppyId={setSelectedPuppyId} />}
          />
          <Route
            path="/players/:id"
            element={
              <PuppyDetails
              // selectedPuppyId={selectedPuppyId}
              // setSelectedPuppyId={setSelectedPuppyId}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      {/* <PuppyForm />
      <main>
        <PuppyList setSelectedPuppyId={setSelectedPuppyId} />
        <PuppyDetails
          selectedPuppyId={selectedPuppyId}
          setSelectedPuppyId={setSelectedPuppyId}
        />
      </main> */}
    </Provider>
  );
}
