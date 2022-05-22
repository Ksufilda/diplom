import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getProfile, getMe, getMyProfile, saveProfile } from "./api/queries";
import "./App.css";
import AuthModal from "./components/AuthModal/AuthModal";
import Header from "./components/Header/Header";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";

function App() {
  // {id:1, name:'', profileImg:'', text1:'', text2:'', text3:''}
  const [profile, setProfile] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [redact, setRedact] = useState(true);

  function finishAuth() {
    setLoginModalOpened(false);
  }

  useEffect(() => {
    getMyProfile(document.cookie)
      .then((res) => {
        console.log("a");
        console.log(res);
      })
      .catch((res) => {
        const randomId = Math.floor(
          Math.random() * Math.floor(Math.random() * Date.now())
        );
        setLoginModalOpened(true);
        setProfile({
          id: randomId,
          name: "Гость №" + randomId,
          profileImg: "",
          text1: "",
          text2: "",
          text3: "",
        });
      });
  }, []);

  function getProfile() {
    getMyProfile().then((res) => {
      console.log(res.rows[0]);
      if (res.rows.length) setProfile(res.rows[0]);
      else
        setProfile({
          id: 1,
          name: "",
          profileImg: "",
          text1: "",
          text2: "",
          text3: "",
        });
    });
  }

  function changeView() {
    setRedact(!redact);
  }

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
        {loginModalOpened && <AuthModal finishAuth={finishAuth} />}
        <Header
          redact={redact}
          changeView={changeView}
          profile={profile}
          saveProfile={saveLocalProfile}
        />
        <div className="container">
          {profile && (
            <Profile
              redact={redact}
              profile={profile}
              changeProfile={changeProfile}
            ></Profile>
          )}
          <MainCanvas redact={redact} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
