import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getProfile, saveProfile } from "./api/queries";
import "./App.css";
import Header from "./components/Header/Header";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";

function App() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile(1).then((res) => {
      console.log(res.rows[0]);
      if (res.rows) setProfile(res.rows[0]);
    });
  }, []);

  function changeProfile(data) {
    setProfile(data);
  }

  function saveLocalProfile() {
    console.log(profile);
    saveProfile(profile).then((res) => {
      document.location.reload(true);
      console.log(res);
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container">
        <Header profile={profile} saveProfile={saveLocalProfile} />
        <div className="container">
          {profile && (
            <Profile profile={profile} changeProfile={changeProfile}></Profile>
          )}
          <MainCanvas></MainCanvas>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
