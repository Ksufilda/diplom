import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  getProfile,
  getMe,
  getMyProfile,
  saveProfile,
  getMyCanvas,
  getCanvas,
} from "./api/queries";
import "./App.css";
import { getCookie } from "./common/getCookie";
import AuthModal from "./components/AuthModal/AuthModal";
import Header from "./components/Header/Header";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";
import Lottie from "react-lottie";
import * as animationData from "./assets/notFoundLottie.json";

function App() {
  // {id:1, name:'', profileImg:'', text1:'', text2:'', text3:''}
  const [profile, setProfile] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [redact, setRedact] = useState(false);
  const [userId, setUserId] = useState();
  const [boxes, setBoxes] = useState({});
  const [notFound, setNotFound] = useState(false);

  function goToBlank() {
    window.location.replace("not_found");
  }

  function goToMain() {
    window.location.replace(window.location.origin);
  }

  function getLoggedInProfile() {
    const randomId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );

    if (!getCookie("timeKey")) return setLoginModalOpened(true);
    setLoggedIn(true);
    setRedact(true);

    getMyProfile(getCookie("timeKey"))
      .then((res) => {
        console.log(res);

        console.log(res?.message);
        if (res?.message === "no_profile") {
          setProfile({
            id: randomId,
            name: "Гость №" + randomId,
            profileImg: "",
            text1: "",
            text2: "",
            text3: "",
          });
        } else {
          setProfile(res.rows[0]);
        }
      })
      .catch((res) => {
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
  }

  function getLoggedInCanvas() {
    getMyCanvas(getCookie("timeKey")).then((res) => {
      setUserId(res.rows[0].userid);
      if (!res.rows[0].id) return;
      setBoxes(
        res.rows.reduce(function (results, row) {
          results[row.id] = {
            top: Number(row.y),
            left: Number(row.x),
            title: "Drag me around",
            type: row.type,
            image: row.image,
            link: row.link,
            text: row.text,
          };
          return results;
        }, {})
      );
    });
  }

  useEffect(() => {
    const location = window.location.pathname.replace("/", "");

    if (location) {
      if (location === "not_found") return setNotFound(true);
      setLoggedIn(false);
      getUserCanvas(location);
      getUserProfile(location);
    } else {
      getLoggedInCanvas();
      getLoggedInProfile();
    }
  }, []);

  function getUserProfile(id) {
    getProfile(id).then((res) => {
      console.log(res);
      if (res.rows.length) setProfile(res.rows[0]);
      else goToBlank();
    });
  }

  function getUserCanvas(id) {
    getCanvas(id).then((res) => {
      setUserId(res.rows[0].userid);
      if (!res.rows[0].id) return;
      setBoxes(
        res.rows.reduce(function (results, row) {
          results[row.id] = {
            top: Number(row.y),
            left: Number(row.x),
            title: "Drag me around",
            type: row.type,
            image: row.image,
            link: row.link,
            text: row.text,
          };
          return results;
        }, {})
      );
    });
  }

  function finishAuth() {
    setLoginModalOpened(false);
    document.location.reload(true);
  }

  function changeView() {
    if (loggedIn) setRedact(!redact);
  }

  function changeProfile(data) {
    setProfile(data);
  }

  function saveLocalProfile() {
    const { id, name, profileImg, text1, text2, text3 } = profile;
    console.log(profile);
    saveProfile({
      id,
      name,
      profileImg,
      text1,
      text2,
      text3,
      timeKey: getCookie("timeKey"),
    }).then((res) => {
      // document.location.reload(true);
    });
  }

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container">
        {loginModalOpened && <AuthModal finishAuth={finishAuth} />}
        {!notFound && (
          <Header
            loggedIn={loggedIn}
            userId={userId}
            redact={redact}
            changeView={changeView}
            profile={profile}
            saveProfile={saveLocalProfile}
          />
        )}
        <div className="container" style={notFound ? { padding: 0 } : null}>
          {profile && (
            <Profile
              redact={redact}
              profile={profile}
              changeProfile={changeProfile}
            ></Profile>
          )}
          <MainCanvas
            setBoxes={setBoxes}
            boxes={boxes}
            userId={userId}
            redact={redact}
          />
          {notFound && (
            <div className="lottie-container">
              <Lottie options={lottieOptions} height={400} width={400} />
              <a onClick={goToMain} className="save-btn get-back-btn">
                Вернуться
              </a>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
