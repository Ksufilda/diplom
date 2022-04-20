import "./App.css";
import MainCanvas from "./components/MainCanvas/MainCanvas";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="main-container">
      <div className="container">
        <Profile></Profile>
        <MainCanvas></MainCanvas>
      </div>
    </div>
  );
}

export default App;
